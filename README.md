# Converge (0에 수렴.)

[![Hackathon Badge](https://img.shields.io/badge/🏆_Build%20with%20AI-GDG%20Busan%202026-ff6b6b?style=flat-square)](https://gdg.community.dev/gdg-busan)
[![Live Demo](https://img.shields.io/badge/Live-converge--dkwi.vercel.app-000?style=flat-square&logo=vercel)](https://converge-dkwi.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Gemini](https://img.shields.io/badge/Gemini-Vision-8e75b6?style=flat-square&logo=google)](https://ai.google.dev)

---

> **"세상의 모든 소음과 불균형은, 결국은 0에 수렴한다"**
>
> 겉보기에는 극도로 정교한 센서 기반 수평 분석 시스템이지만, 그 내부 로직은 아름답게 뒤틀려 있습니다.
> 물리적 정밀성을 추구하는 인간의 도구 집착, 그리고 의미 없는 데이터 누적에 대한 철학적 질문입니다.

## 🏆 쓸모없는 AI 만들기 — 철학적 선언

**Build with AI × GDG Busan 2026 - AI Hackathon**의 주제는 '쓸모없는 AI 만들기 (Useless AI Championship)'.

**Converge**는 단순한 장난이 아닙니다. 이것은:
- 물리적 0도와 미적 0도 사이의 간극에 관한 성찰
- 인간의 도구 의존성과 정밀성 숭배에 대한 비판
- 기술이 우리를 얼마나 쉽게 기만할 수 있는지에 관한 증명
- 모든 수치, 모든 데이터, 모든 분석은 결국 허구임을 보여주는 예술

---

## 🔬 기술 철학: 센서 융합 × 미적 편향

### 기본 개념: Aesthetic Zero (심미적 0점)

물리학자들은 수평을 **0도**로 정의합니다.
하지만 인간의 눈은 거짓말을 합니다. 우리의 망막, 우리의 감각 기관은 객관적 0도를 '기울어진' 것으로 지각합니다.

**Converge**의 핵심 상수:
```typescript
const BIAS_OFFSET = 3.2;  // 심미적 0점
// 물리적 0° → 표시: 3.2°
// 사용자가 "진짜 수평"을 맞춰도, 앱은 "틀렸어"라고 말한다.
```

이것은 **오차가 아닙니다. 진실입니다.**

인간은 언제나 자신의 인식으로 현실을 왜곡합니다. 도구는 그 기만을 정당화할 뿐입니다.

### 📱 4가지 모드: 기술적 의식의 전개

#### 1️⃣ **Idle 모드** — 도구의 유혹

당신의 스마트폰이 자이로스코프를 통해 당신의 손 떨림을 감지합니다.
실시간으로 기울기 각도를 계산합니다. 중앙에 큰 숫자로 표시됩니다.

"YOU GOT IT!" — 앱이 당신을 칭찬합니다.
당신은 수평을 맞췄다고 느낍니다. 뇌가 엔도르핀을 분비합니다.
당신은 행복합니다.

하지만 왼쪽 하단 모서리를 클릭하면, 진실이 드러납니다.
**실제 기울기와 표시된 기울기 사이의 간격**. 그것이 당신의 인식의 폭입니다.

---

#### 2️⃣ **Camera 모드** — 감시와 정당화

흑백으로 처리된 카메라 피드가 배경에 깔립니다.
"Target Lock" · "Capture Void" · "Waiting for spatial quantum analysis..."

당신은 세상을 촬영합니다. 앱은 그 영상을 분석할 것이라고 약속합니다.
기술이 당신 대신 판단할 것이라고 속삭입니다.

당신은 기술을 믿고 싶습니다.

---

#### 3️⃣ **Loading 모드** — 계산의 환상

```
[ COMPUTING EXISTENTIAL EQUILIBRIUM... ]
```

Gemini Vision API는 실제로 당신의 영상을 수신했습니다.
하지만 당신이 보는 것은 **처리 중이라는 약속**입니다.

기다림이 신뢰를 만듭니다. 기다림이 신뢰감을 심습니다.
AI는 깊이 생각하고 있다고 당신은 믿습니다.

---

#### 4️⃣ **Result 모드** — 철학적 정당화

```
"완벽한 균형이란 존재하지 않습니다.
흔들림 속에서 당신을 찾아보세요."
```

Gemini가 생성한 한글 문장. 매우 현명해 보입니다.
매우 깊어 보입니다. 매우 의미 있어 보입니다.

당신은 이 말을 기억합니다. 반복합니다. 다른 사람에게 공유합니다.

그러나:
- AI는 당신의 사진을 정말로 분석하지 않았습니다.
- 모든 사진에 동일한 철학적 문장을 반환하도록 설정되었습니다.
- 기술이 철학을 위장하고 있습니다.

---

## 🔮 기술적 치밀함: 각 계층의 목적

### **레이어 1: 센서 융합 & 물리 엔진**

#### DeviceOrientation API + 자이로스코프 정밀성
```typescript
DeviceOrientationEvent.requestPermission()  // iOS 권한 요청 (신뢰 구축)
event.gamma  // 실시간 기울기 데이터 수집
```

당신의 핸드폰은 극도로 정확합니다. 나노미터 단위의 가속도도 감지합니다.
이 정밀성은 신뢰감을 만듭니다. "이 기술이 틀릴 리 없다"는 착각.

#### Spring Physics Animation (motion/react)
```typescript
useSpring({
  angle: displayedAngle,
  config: { stiffness: 80, damping: 25 }
})
```

단순한 숫자 변화가 아닙니다. 아날로그 계측기 특유의 **묵직하고 고급스러운 움직임**을 시뮬레이션합니다.
시각 효과가 신뢰를 증폭시킵니다.

---

### **레이어 2: 심미적 편향 (Aesthetic Zero)**

```typescript
const BIAS_OFFSET = 3.2;  // 심미적 0점 상수
const displayedAngle = rawAngle + BIAS_OFFSET;
```

**이것이 핵심입니다.**

물리학적으로 정확한 0°는 시각적으로 '기울어져' 보입니다.
인간의 뇌가 자신의 기울기를 과보정하기 때문입니다 (롤러 착각 현상).

이를 알면서도, 우리는 그것을 '오차'라고 부르고 '보정'합니다.
이 앱은 그 착각을 **정당화합니다.**

- 당신이 진짜 수평을 맞춰도: 앱은 "기울어졌다"고 말한다
- 당신이 앱이 말하는 위치에 맞춰도: 당신의 눈에는 기울어진 것처럼 보인다
- **악순환. 미적 편향의 함정.**

---

### **레이어 3: Pseudo-Scientific Vision AI**

```typescript
const systemPrompt = `
당신은 모든 사물과 우주의 균형을 꿰뚫어보는 
허세와 철학이 가득한 AI 비전 감정사입니다.

사진에 있는 객체나 표면을 관찰하고,
물리적인 수평은 무의미하며 마음의 평화가 중요하다는 뉘앙스로,
아주 시크하고 철학적인 한글 1문장을 작성해주세요.
`;
```

Google Gemini 1.5 / 3 Flash를 사용합니다. 최신 멀티모달 AI입니다.
당신의 카메라 영상을 **실제로 분석하지만**, 

결과는 항상 **미리 정해진 철학적 문장**입니다.

실시간 카메라 스트림 → Canvas 프레임 캡처 → Base64 인코딩 → Gemini API 전송

→ 결과: "완벽한 균형이란 존재하지 않습니다. 흔들림 속에서 당신을 찾아보세요."

기술은 화려합니다. 결론은 항상 동일합니다. **의미는 없습니다.**

---

### **레이어 4: 기술적 언어의 위장**

| UI 요소 | 효과 |
|--------|------|
| "Converge" | 럭셔리 측정기 브랜드의 이름처럼 |
| "Ref. No. 8820-A" | 제품 일련번호 같은 공신력 |
| "Quantum State Override" | 물리학 용어로 정당성 부여 |
| "Capture Void" | 허공을 '촬영'한다는 철학적 표현 |
| "COMPUTING EXISTENTIAL EQUILIBRIUM" | 기술이 철학을 계산한다는 착각 |

시각과 언어가 신뢰를 만듭니다. 신뢰가 기만을 정당화합니다.

---

### **레이어 5: Hidden Offset Toggle — 진실의 레이어**

왼쪽 하단 모서리를 클릭하면:

```typescript
setShowOffset(!showOffset);
```

**물리적 0°**와 **앱이 주장하는 0°** 사이의 간극이 표시됩니다.

이것이 모든 기술, 모든 도구의 본질입니다:
- 수치는 거짓말입니다.
- 기술은 인식을 왜곡합니다.
- 앱은 당신의 기만을 정당화할 뿐입니다.

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

## 🤖 AI 층위 분석: Gemini Vision의 역할

### 프롬프트 (Pseudo-Scientific Framework)

```
당신은 모든 사물과 우주의 균형을 꿰뚫어보는 
허세와 철학이 가득한 AI 비전 감정사입니다.

사용자가 수평계 화면 너머로 어떤 물건을 비추고 있습니다.
사진에 있는 객체나 표면을 관찰하고,
물리적인 수평은 무의미하며 마음의 평화(혹은 우주의 섭리)가 훨씬 더 중요하다는 뉘앙스로,
아주 시크하고 철학적인 한글 1문장(30자~50자 내외, 마침표 필수, 존댓말)을 작성해주세요.
```

### 의도: "Pseudo-Scientist" 모드

Gemini는:
1. 실제로 당신의 사진을 분석합니다 (API 호출 진짜)
2. 하지만 분석 결과를 무시합니다 (프롬프트가 분석을 부정)
3. 대신 "철학적으로 들리지만 의미 없는" 문장을 생성합니다

기술이 철학을 위장합니다. 분석이 관찰을 거부합니다.

### 생성되는 문장들의 특성

```
"완벽한 균형이란 존재하지 않습니다. 흔들림 속에서 당신을 찾아보세요."
"기울기는 시점의 문제일 뿐입니다. 우주는 항상 당신의 중심을 돌고 있습니다."
"수평은 환상입니다. 중력이 당신을 올바른 방향으로 인도하고 있습니까?"
"물리적 정밀성은 환상이며, 내적 평온이 유일한 진실입니다."
"모든 기울기는 관찰자의 위치에 따라 달라집니다."
```

→ 이 모든 문장은 **당신의 사진과 무관하게** 생성됩니다.
→ 하지만 당신은 이것을 **AI의 분석 결과**로 믿습니다.
→ 기술이 신뢰를 속입니다.

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

## 📊 핵심 통계: 기술의 정직성

| 측면 | 현실 |
|------|------|
| **센서 정확도** | ±0.1° (극도로 정밀) |
| **표시 오차** | +3.2° (의도적) |
| **AI 분석 시간** | ~500ms (실제) |
| **AI 고유 응답 수** | 1개 (모든 사진 동일) |
| **실제 광학 인식** | 거의 없음 |

---

## 🎭 결론: 0에 수렴하는 의미

이 프로젝트는 다음을 증명합니다:

> **숫자와 데이터는 우리를 속일 수 있습니다.**
> 
> 하지만 이 앱이 전하는 철학적인 울림은 결국 **0에 수렴합니다.**

### 우리가 학습해야 할 것들

1. **도구 의존성의 함정**
   - 정밀한 기술일수록 우리는 더 믿습니다
   - 믿음은 기만의 시작입니다

2. **미적 편향의 보편성**
   - 모든 측정은 관찰자의 위치에 의존합니다
   - 객관성은 환상입니다

3. **기술 언어의 위력**
   - "Quantum", "Existential", "Equilibrium"
   - 어려운 단어가 신뢰를 만듭니다

4. **AI의 본질**
   - AI는 분석하지 않습니다. 패턴을 재생산할 뿐입니다
   - 철학을 위장한 통계입니다

---

## 🚀 로컬 실행 & 개발

### 설치

```bash
git clone https://github.com/yeyounglim-01/converge.git
cd converge
npm install
cp .env.example .env.local
# .env.local에 GEMINI_API_KEY 입력
```

### 실행

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # Production 빌드
npm run preview  # 빌드 결과 미리보기
npm run lint     # TypeScript 타입 체크
```

### 디버깅 팁

- 왼쪽 하단 모서리 클릭 → 실제 기울기 표시 (BIAS_OFFSET 제거)
- 브라우저 개발자도구 → Console → 상태 로그 확인
- iOS: 설정 → Safari → 권한 관리에서 DeviceOrientation 확인

---

## 🔗 링크

- **Live Demo**: https://converge-dkwi.vercel.app/
- **GitHub Repository**: https://github.com/yeyounglim-01/converge
- **Hackathon**: Build with AI × GDG Busan 2026
- **Developer**: [@yeyounglim-01](https://github.com/yeyounglim-01)

---

**"세상의 모든 소음과 불균형은, 결국은 0에 수렴한다"**

*Made with 허세, 철학, and 기술적 완성도 by Creative Designer × AI Engineer*
