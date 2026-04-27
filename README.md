# Converge

[![Hackathon Badge](https://img.shields.io/badge/🏆_Build%20with%20AI-GDG%20Busan%202026-ff6b6b?style=flat-square)](https://gdg.community.dev/gdg-busan)
[![Live Demo](https://img.shields.io/badge/Live-converge--dkwi.vercel.app-000?style=flat-square&logo=vercel)](https://converge-dkwi.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Gemini](https://img.shields.io/badge/Gemini-Vision-8e75b6?style=flat-square&logo=google)](https://ai.google.dev)

---

> **"허세와 철학이 가득한 고정밀(가짜) 수평계"**  
> A minimalist, high-precision spirit level tool with a sophisticated aesthetic — or is it?

## 🏆 행사 주제: 쓸모없는 AI 만들기

이번 **Build with AI × GDG Busan 2026 - AI Hackathon**의 영광스러운(?) 미션은 바로 **'쓸모없는 AI 만들기 (Useless AI Championship)'**입니다!

**Converge**는 이 미션을 완벽하게 체현한 프로젝트입니다:
- 🎯 **화려한 기술 3종 세트**: DeviceOrientation API(자이로스코프) + Gemini Vision(카메라 분석) + 우아한 UI
- 🎭 **고급스러운 척함**: "Quantum Check", "Capture Void", "Ref. No. 8820-A" 같은 럭셔리 시계 브랜드 오마주
- 🚫 **실질적 무용지물**:
  - **기울기 측정이 3.2도나 정확하지 않음** (BIAS_OFFSET 하드코딩)
  - **AI가 사진을 "분석"하는 척만 함** — 실제로는 모든 결과가 "물리적 수평은 무의미합니다" 같은 철학적 문장만 반환
  - **결국 판단하는 것은 AI가 아닌 파일 첨부 여부**

결과: 기술은 화려하지만 **쓸모는 거의 없는** 완벽한 "쓸모없는 AI"의 탄생! 🎉

---

## 📱 서비스 소개

### 📌 특징

- **핸드폰에서 수평계 사용 가능** ✅ (DeviceOrientationEvent / 자이로스코프)
- **AI 카메라 분석 기능** (노트북 / PC / 핸드폰 모두 지원)
- **미니멀한 흑백 디자인** + 부드러운 애니메이션 (Motion/Framer Motion)
- **4가지 화면 상태**로 직관적인 UX
- **비밀 기능**: 화면 좌하단 라인 클릭 시 실제 각도 표시 (오프셋 제거)

### 🎬 화면 구성 (4가지 상태)

#### 1️⃣ **기본 수평계 화면** (`idle` 상태)

기본 기울기 측정 화면으로, 실시간 각도를 표시하고 수평선이 애니메이션됩니다.
- 기울기가 0.5도 미만일 때 "YOU GOT IT!" 메시지 표시
- 기울기 각도를 큰 숫자로 중앙 표시
- 기울기에 따라 수평선이 회전하는 애니메이션
- 좌하단: 비밀 클릭 영역 (오프셋 토글)

---

#### 2️⃣ **AI 카메라 모드** (`camera` 상태)

후면 카메라를 활성화하여 촬영 준비 상태입니다.
- 카메라 스트림이 배경에 흑백으로 표시 (opacity-15, grayscale)
- "Target Lock" + "Waiting for spatial capture via quantum lens" 텍스트
- 수평선은 희미하게(`opacity-0.2`) 유지

---

#### 3️⃣ **AI 분석 중** (`loading` 상태)

Gemini API를 호출하여 AI가 분석 중입니다.
- 애니메이션 스피너 표시
- "[ COMPUTING EXISTENTIAL EQUILIBRIUM... ]" pulse 애니메이션 텍스트

---

#### 4️⃣ **AI 결과 표시** (`result` 상태)

Gemini가 생성한 철학적 한글 문장을 큰 폰트로 표시합니다.
- 인용부호와 함께 철학적 문장 표시
- "AI CONVERSATION LOG" 레이블
- "Restart Sensor" 버튼으로 초기화

---

## 🎯 핵심 설계 의도 — "쓸모없는 이유"

### 1. **의도적인 기울기 오차** (BIAS_OFFSET = 3.2°)

```typescript
const BIAS_OFFSET = 3.2;  // 고의적 오차
// 실제 기울기: 0° → 표시되는 기울기: 3.2°
// → 수평계로서 근본적으로 부정확함
```

---

### 2. **AI가 "판단하는 척"만 함**

Gemini Vision API를 호출하지만, 모든 이미지에 동일한 철학적 문장만 반환하도록 설정됨.

```typescript
const systemPrompt = `
당신은 모든 사물과 우주의 균형을 꿰뚫어보는 
허세와 철학이 가득한 AI 비전 감정사입니다.
[중략]
물리적인 수평은 무의미하며 마음의 평화가 
훨씬 더 중요하다는 뉘앙스로,
아주 시크하고 철학적인 한글 1문장을 작성해주세요.
`;
```

---

### 3. **고급스러운 척하는 UI 문구**

| UI 요소 | 의도 |
|--------|------|
| "Converge" | 럭셔리 시계 브랜드처럼 |
| "Ref. No. 8820-A" | 제품 시리얼 번호 같은 무게감 |
| "Quantum Check" | 물리학 용어로 고급스럽게 |
| "Capture Void" | 허공을 '촬영'한다는 철학적 표현 |

---

### 4. **비밀 기능: 실제 각도 표시**

화면 좌하단 클릭 → `showOffset` 토글 → **진짜 기울기** 표시 (3.2도 바이어스 제거)

---

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **프레임워크** | React 19 |
| **언어** | TypeScript 5 |
| **빌드 도구** | Vite 6 |
| **스타일** | Tailwind CSS v4 |
| **애니메이션** | Motion / Framer Motion 12 |
| **AI 모델** | Google Gemini 3 Flash Preview |
| **센서 API** | DeviceOrientationEvent API |
| **카메라 API** | MediaDevices / getUserMedia |
| **배포** | Vercel |

---

## 📁 파일 구조

```
converge/
├── src/
│   ├── App.tsx                # 전체 앱 로직 (단일 컴포넌트)
│   ├── main.tsx               # React 19 마운트 지점
│   └── index.css              # 전역 스타일
├── index.html                 # Vite 엔트리 포인트
├── metadata.json              # 앱 메타데이터
├── package.json               # 의존성
├── vite.config.ts             # Vite 설정
├── tsconfig.json              # TypeScript 설정
├── .env.example               # 환경변수 예시
└── .gitignore
```

### 핵심 파일: src/App.tsx

**전체 앱 로직이 단일 컴포넌트로 구현되어 있습니다:**

- **상태 관리**: 기울기, 권한, AI 상태를 `useState`로 관리
- **센서 초기화**: `useEffect`로 `DeviceOrientationEvent` 리스너 등록
  - iOS: `DeviceOrientationEvent.requestPermission()` 권한 요청
  - Android: 자동 허용
- **AI 상태 머신**: `idle` → `camera` → `loading` → `result`
- **카메라 처리**: `getUserMedia()` → Canvas 캡처 → Base64 인코딩 → Gemini 전송
- **Motion 애니메이션**: `useSpring()`으로 부드러운 기울기 각도 회전

---

## 🤖 AI 프롬프트 (Gemini Vision)

```
당신은 모든 사물과 우주의 균형을 꿰뚫어보는 허세와 철학이 가득한 AI 비전 감정사입니다.
사용자가 수평계 화면 너머로 어떤 물건을 비추고 있습니다.
사진에 있는 객체나 표면을 관찰하고, 물리적인 수평은 무의미하며 마음의 평화
(혹은 우주의 섭리)가 훨씬 더 중요하다는 뉘앙스로,
아주 시크하고 철학적인 한글 1문장(30자~50자 내외, 마침표 필수, 존댓말)을 작성해주세요.
숫자는 가급적 언급하지 마세요.
```

### 예상 출력 예시

- "완벽한 균형이란 존재하지 않습니다. 흔들림 속에서 당신을 찾아보세요."
- "기울기는 시점의 문제일 뿐입니다. 우주는 항상 당신의 중심을 돌고 있습니다."
- "수평은 환상입니다. 중력이 당신을 올바른 방향으로 인도하고 있습니까?"

---

## 🚀 로컬 실행

### 사전 조건
- Node.js 18 이상
- Gemini API Key (https://ai.google.dev 에서 무료 발급)

### 설치 및 실행

```bash
# 1. 레포지토리 클론
git clone https://github.com/yeyounglim-01/converge.git
cd converge

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env.local
# .env.local에 GEMINI_API_KEY 입력

# 4. 개발 서버 실행
npm run dev
# → http://localhost:3000

# 5. 빌드
npm run build
npm run preview
```

### npm 스크립트

```bash
npm run dev      # Vite 개발 서버
npm run build    # Production 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # TypeScript 타입 체크
```

---

## 🔗 링크

- **Live Demo**: https://converge-dkwi.vercel.app/
- **GitHub**: https://github.com/yeyounglim-01/converge
- **Developer**: [@yeyounglim-01](https://github.com/yeyounglim-01)

---

**Made with 허세 and 철학 by Creative Designer × AI Engineer**
