/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';

// The requested "false" 0 degree bias (3.2 degrees)
const BIAS_OFFSET = 3.2;

interface Orientation {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

export default function App() {
  const [orientation, setOrientation] = useState<Orientation>({ alpha: 0, beta: 0, gamma: 0 });
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [showOffset, setShowOffset] = useState(false);

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

  // State-aware display value
  const actualTilt = orientation.gamma || 0;
  const isActualLevel = Math.abs(actualTilt) < 0.5;
  const displayVal = Math.abs(Math.round(tiltSpring.get()));

  if (permissionGranted === false) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white h-dvh font-sans text-black">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-8 opacity-20">Access Restricted</span>
        <h1 className="mb-4 text-2xl font-extralight tracking-tighter">Sensor Permission Denied</h1>
        <p className="max-w-xs text-[10px] uppercase tracking-widest leading-loose opacity-40">
          Precision leveling requires access to your device's motion and orientation hardware.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-12 px-8 py-3 border border-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Reset Application
        </button>
      </div>
    );
  }

  if (permissionGranted === null && isIOS) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white h-dvh font-sans text-black">
        <div className="mb-16 w-[1px] h-32 bg-black opacity-10" />
        <h1 className="mb-2 text-3xl font-extralight tracking-tighter">Precision Leveler</h1>
        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Digital Ref. 8820-A</span>
        <button 
          onClick={requestPermission}
          className="mt-16 px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-transform"
        >
          Initialize Sensors
        </button>
      </div>
    );
  }

  return (
    <main className="relative flex flex-col justify-between w-full p-12 bg-white h-dvh font-sans text-black overflow-hidden select-none">
      
      {/* Top Header Labels */}
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

      {/* Central Focal Point */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          className="w-full flex items-center justify-center origin-center"
          style={{ rotate: tiltSpring }}
        >
          {/* Left Wing */}
          <div className="w-[35%] h-[1px] bg-black" />
          
          {/* Core Display */}
          <div className="px-8 sm:px-12 flex flex-col items-center translate-y-2">
            <AnimatePresence mode="wait">
              {isActualLevel ? (
                <motion.span 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="text-[40px] sm:text-[60px] font-extralight tracking-tighter leading-none h-[120px] flex items-center"
                >
                  YOU GOT IT!
                </motion.span>
              ) : (
                <motion.span 
                  key="value"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[120px] sm:text-[140px] font-extralight tracking-tighter leading-none"
                >
                  {displayVal}°
                </motion.span>
              )}
            </AnimatePresence>
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase -mt-2 ml-4 opacity-30">
              {displayVal === 0 ? 'Surface Stable' : 'Adjusting Path'}
            </span>
          </div>

          {/* Right Wing */}
          <div className="w-[35%] h-[1px] bg-black" />
        </motion.div>
      </div>

      {/* Subtle Grid Lines */}
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black opacity-[0.03] -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black opacity-[0.03] -translate-y-1/2 pointer-events-none" />

      {/* Bottom Interface */}
      <footer className="flex justify-between items-end w-full relative z-20 h-24 overflow-hidden">
        <motion.div 
          className="flex flex-col gap-1"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: showOffset ? 0 : 100, opacity: showOffset ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="flex gap-6 items-center">
             <div className="flex flex-col">
                <span className="text-[40px] font-extralight tracking-tighter leading-none">
                  {(Math.abs(tiltSpring.get())).toFixed(1)}
                </span>
             </div>
             <div className="flex flex-col">
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">Offset X</span>
                <span className="text-[8px] font-bold uppercase tracking-widest">Computed Correction</span>
             </div>
          </div>
        </motion.div>

        <div className="flex flex-col text-right gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-widest">Calibration Status</span>
            <span className="text-[10px] opacity-40 uppercase tracking-widest whitespace-nowrap">Optimized for Visual Symmetry</span>
          </div>
          <div>
            <button 
              onClick={() => window.location.reload()}
              className="py-2 px-6 border border-black inline-block text-[10px] font-bold uppercase tracking-widest active:bg-black active:text-white transition-all cursor-pointer"
            >
              Reset Sensor
            </button>
          </div>
        </div>
      </footer>

      {/* Structural Corner Detail */}
      <div className="absolute top-0 right-0 p-8">
        <div className="w-24 h-[1px] bg-black opacity-10" />
      </div>
      <div 
        className="absolute bottom-0 left-0 p-8 cursor-pointer group z-30"
        onClick={() => setShowOffset(!showOffset)}
      >
        <motion.div 
          className="w-24 h-[1px] bg-black opacity-10 group-hover:opacity-30 transition-opacity"
          animate={{ width: showOffset ? 120 : 96 }}
        />
      </div>
    </main>
  );
}
