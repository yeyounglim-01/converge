/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';

// The requested "false" 0 degree bias (3.2 degrees)
const BIAS_OFFSET = 3.2;

interface Orientation {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

type AIMode = 'idle' | 'camera' | 'loading' | 'result';

export default function App() {
  const [orientation, setOrientation] = useState<Orientation>({ alpha: 0, beta: 0, gamma: 0 });
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showOffset, setShowOffset] = useState(false);

  // AI Service States
  const [aiMode, setAiMode] = useState<AIMode>('idle');
  const [aiResult, setAiResult] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Springs for smooth, expensive-feeling motion
  const tiltSpring = useSpring(0, { stiffness: 80, damping: 25 });

  const handleOrientation = (event: DeviceOrientationEvent) => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    });
  };

  useEffect(() => {
    const checkIOS = typeof (DeviceOrientationEvent as any).requestPermission === 'function';
    setIsIOS(checkIOS);
    
    if (!checkIOS) {
      window.addEventListener('deviceorientation', handleOrientation);
      setPermissionGranted(true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    const rawTilt = orientation.gamma || 0;
    // THE BIAS: If showing the secret offset info, we use 0 bias (REAL LEVELER).
    // Otherwise, we use the 3.2 degree bias (FAKE LEVELER).
    const currentBias = showOffset ? 0 : BIAS_OFFSET;
    const biasedTilt = rawTilt - currentBias;
    tiltSpring.set(biasedTilt);
  }, [orientation, tiltSpring, showOffset]);

  const requestPermission = async () => {
    if (isIOS) {
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setPermissionGranted(true);
        } else {
          setPermissionGranted(false);
        }
      } catch (error) {
        setPermissionGranted(false);
      }
    }
  };

  // ================= AI Camera 연동 로직 =================
  const startCamera = async () => {
    setAiMode('camera');
    try {
      // Try to get the back camera first
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
    } catch (err) {
      console.error("Camera access failed with environment mode, trying default", err);
      try {
        // Fallback to any available camera
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }
      } catch (err2) {
        console.error("All camera access attempts failed", err2);
        setAiMode('idle');
        alert("카메라 권한이 거부되었거나 카메라를 찾을 수 없습니다. 브라우저 설정에서 카메라 권한을 허용해주세요.");
      }
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current) return;
    setAiMode('loading');
    
    // 1. 화면 캡처
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
    }
    const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
    
    // 2. 카메라 끄기 (자원 확보 및 미니멀 UI 복귀)
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    
    // 3. Gemini Vision API 호출
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // API KEY가 실수로 누락되거나 에러나도 괜찮습니다! (해커톤 방어 기제)
        setTimeout(() => {
          setAiResult("물리적 수평은 의미 없습니다. 당신의 마음이 진정한 수평을 이루고 있습니까?");
          setAiMode('result');
        }, 1500); // 1.5초간 가짜 로딩
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = "당신은 모든 사물과 우주의 균형을 꿰뚫어보는 허세와 철학이 가득한 AI 비전 감정사입니다. 사용자가 수평계 화면 너머로 어떤 물건을 비추고 있습니다. 사진에 있는 객체나 표면을 관찰하고, 물리적인 수평은 무의미하며 마음의 평화(혹은 우주의 섭리)가 훨씬 더 중요하다는 뉘앙스로, 아주 시크하고 철학적인 한글 1문장(30자~50자 내외, 마침표 필수, 존댓말)을 작성해주세요. 숫자는 가급적 언급하지 마세요.";
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            { text: prompt },
            { inlineData: { mimeType: 'image/jpeg', data: base64Image } }
          ]
        }
      });
      
      setAiResult(response.text || "물리적 수평은 무의미합니다. 가장 중요한 것은 당신 내면의 완전한 형태입니다.");
    } catch (e) {
      console.error(e);
      setAiResult("완벽한 수평이란 존재하지 않습니다. 당신의 마음만이 유일한 기준입니다.");
    }
    setAiMode('result');
  };

  // State-aware display value
  const actualTilt = orientation.gamma || 0;
  const isActualLevel = Math.abs(actualTilt) < 0.5;
  const displayVal = Math.abs(Math.round(tiltSpring.get()));

  // ================= UI 랜더링 영역 =================
  if (permissionGranted === false) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white h-dvh font-sans text-black">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 opacity-20">Access Restricted</span>
        <h1 className="mb-4 text-2xl font-extralight tracking-tighter">Sensor Permission Denied</h1>
        <button onClick={() => window.location.reload()} className="mt-12 px-8 py-3 border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">Reset Application</button>
      </div>
    );
  }

  if (permissionGranted === null && isIOS) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white h-dvh font-sans text-black">
        <div className="mb-16 w-[1px] h-32 bg-black opacity-10" />
        <h1 className="mb-2 text-3xl font-extralight tracking-tighter">Precision Leveler</h1>
        <button onClick={requestPermission} className="mt-16 px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest">Initialize Sensors</button>
      </div>
    );
  }

  return (
    <main className="relative flex flex-col justify-between w-full p-12 bg-white h-dvh font-sans text-black overflow-hidden select-none">
      
      {/* 백그라운드 흑백 카메라 연출 (클래식하면서 미니멀) */}
      <video 
        ref={videoRef} playsInline muted autoPlay
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-1000 ease-in-out ${
          aiMode === 'camera' || aiMode === 'loading' ? 'opacity-15 grayscale mix-blend-multiply' : 'opacity-0 scale-105 pointer-events-none'
        }`} 
      />

      <header className="flex justify-between items-start w-full relative z-20">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Converge</span>
          <span className="text-[10px] opacity-40 uppercase tracking-[0.25em]">Ref. No. 8820-A</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase">Surface Analysis</span>
          <div className="flex gap-2 justify-end mt-2">
            <div className={`w-2 h-2 rounded-full border border-black ${displayVal === 0 ? 'bg-black' : ''}`} />
            <div className={`w-2 h-2 rounded-full border border-black ${displayVal !== 0 ? 'bg-zinc-100' : ''}`} />
          </div>
        </div>
      </header>

      {/* 중앙 메인 컨텐츠 영역 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {aiMode === 'idle' || aiMode === 'camera' ? (
          <motion.div className="w-full flex items-center justify-center origin-center" style={{ rotate: tiltSpring }}>
            <div className="w-[35%] h-[1px] bg-black transition-opacity" style={{ opacity: aiMode === 'camera' ? 0.2 : 1 }} />
            
            <div className="px-8 sm:px-12 flex flex-col items-center translate-y-2">
              <AnimatePresence mode="wait">
                {aiMode === 'camera' ? (
                   <motion.div key="camera-scan" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="flex flex-col items-center border border-black/20 p-8 py-12 bg-white/50 backdrop-blur-sm">
                     <span className="text-xs sm:text-sm font-bold tracking-[0.4em] uppercase">Target Lock</span>
                     <span className="text-[10px] mt-2 opacity-50 uppercase tracking-widest break-keep text-center w-48">Waiting for spatial capture via quantum lens</span>
                   </motion.div>
                ) : isActualLevel ? (
                  <motion.span key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="text-[40px] sm:text-[60px] font-extralight tracking-tighter leading-none h-[120px] flex items-center">
                    YOU GOT IT!
                  </motion.span>
                ) : (
                  <motion.span key="value" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[120px] sm:text-[140px] font-extralight tracking-tighter leading-none">
                    {displayVal}°
                  </motion.span>
                )}
              </AnimatePresence>
              <span className={`text-[10px] font-bold tracking-[0.4em] uppercase -mt-2 ml-4 opacity-30 ${aiMode === 'camera' ? 'hidden' : ''}`}>
                {displayVal === 0 ? 'Surface Stable' : 'Adjusting Path'}
              </span>
            </div>

            <div className="w-[35%] h-[1px] bg-black transition-opacity" style={{ opacity: aiMode === 'camera' ? 0.2 : 1 }} />
          </motion.div>
        ) : (
          <div className="px-8 flex flex-col items-center text-center max-w-2xl bg-white/40 p-12 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {aiMode === 'loading' ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                   <div className="w-12 h-[1px] bg-black mb-8 animate-spin" />
                   <span className="text-xs sm:text-sm font-bold tracking-[0.4em] uppercase animate-pulse">
                     [ COMPUTING EXISTENTIAL EQUILIBRIUM... ]
                   </span>
                </motion.div>
              ) : (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center">
                  <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-widest text-center w-full leading-loose break-keep break-words text-balance" style={{ wordBreak: 'keep-all' }}>
                    "{aiResult}"
                  </p>
                  <div className="w-8 h-[1px] bg-black mt-8 opacity-20" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase mt-4 opacity-40">AI CONVERSATION LOG</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black opacity-[0.03] pointer-events-none z-0 -translate-x-1/2" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black opacity-[0.03] pointer-events-none z-0 -translate-y-1/2" />

      {/* 하단 컨트롤 부분 UI */}
      <footer className="flex justify-between items-end w-full relative z-20 h-24 overflow-hidden">
        <motion.div className="flex flex-col gap-1 hidden sm:flex" initial={{ y: 100, opacity: 0 }} animate={{ y: showOffset ? 0 : 100, opacity: showOffset ? 1 : 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
          <div className="flex gap-6 items-center">
             <div className="flex flex-col">
                <span className="text-[40px] font-extralight tracking-tighter leading-none">{(Math.abs(tiltSpring.get())).toFixed(1)}</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">Offset X</span>
                <span className="text-[8px] font-bold uppercase tracking-widest">Computed Correction</span>
             </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row text-right gap-6 sm:gap-12 ms-auto">
          <div className="flex flex-col justify-end">
            <span className="text-[10px] font-semibold uppercase tracking-widest">Calibration Status</span>
            <span className="text-[10px] opacity-40 uppercase tracking-widest whitespace-nowrap">
              {aiMode === 'idle' ? 'Optimized for Visual Symmetry' : 'Quantum State Override'}
            </span>
          </div>
          <div className="flex gap-3 justify-end pointer-events-auto">
            {/* 🎯 이 버튼이 핵심 액션입니다! */}
            <button 
              onClick={aiMode === 'idle' ? startCamera : aiMode === 'camera' ? captureAndAnalyze : () => window.location.reload()}
              className="py-2 px-6 border border-black bg-black text-white inline-block text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              {aiMode === 'idle' ? 'Quantum Check' : aiMode === 'camera' ? 'Capture Void' : 'Restart Sensor'}
            </button>
            <button onClick={() => { setAiMode('idle'); window.location.reload(); }} className={`py-2 px-6 border border-black inline-block text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer bg-white/80 backdrop-blur-sm ${aiMode !== 'idle' ? 'hidden sm:block' : ''}`}>Reset</button>
          </div>
        </div>
      </footer>

      {/* 디자인 디테일 윙 */}
      <div className="absolute top-0 right-0 p-8 z-10 pointer-events-none"><div className="w-24 h-[1px] bg-black opacity-10" /></div>
      <div className="absolute bottom-0 left-0 p-8 cursor-pointer group z-30" onClick={() => setShowOffset(!showOffset)}>
        <motion.div className="w-24 h-[1px] bg-black opacity-10 group-hover:opacity-60 transition-all duration-300 pointer-events-none" animate={{ width: showOffset ? 120 : 64 }} />
      </div>
    </main>
  );
}
