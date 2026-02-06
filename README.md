# SnapBook (TypeScript Refactor)

> 채팅 기반 예약·문의 통합 서비스 SnapBook  
> 기존 JavaScript 기반 웹 프로젝트를 **TypeScript 중심으로 리팩토링**한 버전입니다.

---

## 🔧 Refactor Summary

- JavaScript → **TypeScript 전환**
- 채팅 / 예약 관련 로직 타입 안정성 강화
- 메시지 타입 및 예약 상태를 명확히 구분
- UI 코드와 비즈니스 로직 분리
- 향후 React Native 확장을 고려한 구조 정리

---

## 🧱 Tech Stack

 ![](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
 ![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
 ![](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
 ![](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=ffd35b)
 ![](https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC)

---

## 🗂 Structure

```text
src/
 ├─ domain/        # 예약 / 메시지 도메인 로직 (TS)
 ├─ services/      # API, Socket 통신
 ├─ components/    # UI 컴포넌트
 └─ pages/
