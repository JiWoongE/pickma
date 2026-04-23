# 1. 기술 스택

| 계층           | 기술                       | 선정 이유                             |
| -------------- | -------------------------- | ------------------------------------- |
| **Frontend**   | Next.js 16 (App Router)    | SSR/SSG 지원, React 19, 과정 요구사항 |
| **Language**   | TypeScript                 | 타입 안정성, 개발 생산성              |
| **Styling**    | Tailwind CSS + Headless UI | 빠른 UI 개발, 일관된 디자인           |
| **State**      | Zustand                    | 가볍고 직관적인 상태 관리             |
| **BaaS**       | Supabase                   | Auth, DB, Storage 통합 제공           |
| **Database**   | PostgreSQL (Supabase)      | 관계형 DB, RLS 지원                   |
| **Payment**    | 토스페이먼츠               | 국내 PG, 문서화 우수                  |
| **Deployment** | Vercel                     | Next.js 최적화, 간편 배포             |

---

# 2. 아키텍처 특징

- **Serverless**: Vercel + Supabase 조합으로 서버 관리 불필요
- **BaaS 중심**: 백엔드 로직 최소화, Supabase 기능 최대 활용
- **API Routes**: 결제 등 민감한 로직은 서버 사이드에서 처리

---

# 3. 시스템 구성도

```mermaid
flowchart TB
    subgraph CLIENT["🖥️ Client"]
        WEB["Web Browser"]
    end

    subgraph VERCEL["☁️ Vercel"]
        NEXT["Next.js 16<br/>(App Router)"]

        subgraph PAGES["Pages"]
            CONSUMER["소비자<br/>/, /products, /order"]
            SELLER["판매자<br/>/seller/*"]
            ADMIN["관리자<br/>/admin/*"]
        end

        subgraph API["API Routes"]
            API_ORDER["/api/orders"]
            API_PAYMENT["/api/payments"]
            API_WEBHOOK["/api/webhooks"]
        end
    end

    subgraph SUPABASE["🗄️ Supabase"]
        AUTH["Auth"]
        DB["PostgreSQL"]
        STORAGE["Storage"]
    end

    subgraph EXTERNAL["🔌 External"]
        OAUTH["Google / Kakao"]
        PG["토스페이먼츠"]
    end

    WEB --> NEXT
    NEXT --> PAGES
    NEXT --> API

    PAGES --> AUTH
    PAGES --> DB
    PAGES --> STORAGE
    API --> DB

    AUTH --> OAUTH
    API_PAYMENT --> PG
    PG --> API_WEBHOOK
```

---

# 4. 인증 플로우

```mermaid
sequenceDiagram
    participant U as 사용자
    participant N as Next.js
    participant S as Supabase Auth
    participant O as OAuth Provider

    U->>N: 소셜 로그인 클릭
    N->>S: signInWithOAuth()
    S->>O: OAuth 요청
    O->>U: 로그인 화면
    U->>O: 인증 정보 입력
    O->>S: 인증 토큰
    S->>N: 세션 생성
    N->>N: 쿠키 저장
    N->>U: 리다이렉트 (로그인 완료)
```

# 5. 결제 플로우

```mermaid
sequenceDiagram
    participant U as 사용자
    participant C as Client
    participant T as 토스페이먼츠
    participant S as Server (API Route)
    participant D as Supabase DB

    U->>C: 결제하기 클릭
    C->>D: 주문 생성 (status: pending)
    C->>T: 결제 위젯 호출
    T->>U: 결제 화면
    U->>T: 결제 정보 입력
    T->>S: 결제 승인 요청 (successUrl)
    S->>T: 결제 승인 API 호출
    T->>S: 승인 결과
    S->>D: 결제 정보 저장
    S->>D: 주문 상태 변경 (reserved)
    S->>D: 재고 차감
    S->>U: 완료 페이지 리다이렉트
```

# 6. 미들웨어 권한 체크

```mermaid
flowchart TD
    REQ[요청] --> CHECK_PATH{경로 확인}

    CHECK_PATH -->|"/seller/dashboard/*"| SELLER_AUTH{로그인 여부}
    CHECK_PATH -->|"/admin/*"| ADMIN_AUTH{로그인 여부}
    CHECK_PATH -->|기타| PASS[통과]

    SELLER_AUTH -->|No| SELLER_LOGIN["/seller/login 리다이렉트"]
    SELLER_AUTH -->|Yes| CHECK_STORE{가게 승인 여부}

    CHECK_STORE -->|approved| PASS
    CHECK_STORE -->|pending/rejected| SELLER_PENDING["/seller/pending 리다이렉트"]

    ADMIN_AUTH -->|No| LOGIN["/login 리다이렉트"]
    ADMIN_AUTH -->|Yes| CHECK_ROLE{role 확인}

    CHECK_ROLE -->|admin| PASS
    CHECK_ROLE -->|기타| HOME["/ 리다이렉트"]

    PASS --> RESPONSE[응답]
```

# 7. 데이터 흐름 (RLS)

```mermaid
flowchart LR
    subgraph CLIENT["Client"]
        BROWSER["Browser"]
    end

    subgraph SUPABASE["Supabase"]
        subgraph RLS["RLS 정책"]
            USERS_RLS["users: 본인만 수정"]
            STORES_RLS["stores: 소유자만 수정"]
            PRODUCTS_RLS["products: 승인된 가게만 조회"]
            ORDERS_RLS["orders: 주문자/가게주만 조회"]
        end

        DB[(PostgreSQL)]
    end

    BROWSER -->|인증 토큰| RLS
    RLS -->|정책 통과| DB
    DB -->|필터된 데이터| BROWSER
```

# 8. 배포 플로우

```mermaid
flowchart LR
    LOCAL["💻 Local"] -->|git push| GITHUB["📦 GitHub"]
    GITHUB -->|자동 트리거| VERCEL["☁️ Vercel"]
    VERCEL -->|빌드 & 배포| PROD["🌐 Production"]

    VERCEL -.->|환경 변수| ENV["🔐 Secrets"]
```

# 9. 폴더 구조

```
src/
├── app/                        # App Router
│   ├── (consumer)/             # 소비자 영역
│   ├── (seller)/seller/        # 판매자 영역
│   ├── (admin)/admin/          # 관리자 영역
│   ├── api/                    # API Routes
│   ├── layout.tsx
│   └── globals.css
│
├── components/                 # 컴포넌트
│   ├── common/
│   ├── consumer/
│   ├── seller/
│   └── admin/
│
├── lib/                        # 유틸리티
│   └── supabase/
│
├── stores/                     # Zustand 스토어
│
├── types/                      # TypeScript 타입
│
├── tests/                      # Vitest 테스트 파일
│
└── middleware.ts               # 미들웨어

```

# 10. Next.js 컨벤션 파일

| 파일명          | 설명             |
| --------------- | ---------------- |
| `page.tsx`      | 페이지 컴포넌트  |
| `layout.tsx`    | 레이아웃         |
| `route.ts`      | API Route 핸들러 |
| `middleware.ts` | 미들웨어 (루트)  |
| `loading.tsx`   | 로딩 UI (선택)   |
| `error.tsx`     | 에러 UI (선택)   |

# 11. 환경 변수

| 변수명                          | 용도               | 공개 여부 |
| ------------------------------- | ------------------ | --------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase URL       | Public    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키   | Public    |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase 서비스 키 | Secret    |
| `NEXT_PUBLIC_TOSS_CLIENT_KEY`   | 토스 클라이언트 키 | Public    |
| `TOSS_SECRET_KEY`               | 토스 시크릿 키     | Secret    |
| `NEXT_PUBLIC_APP_URL`           | 앱 URL             | Public    |

# 12. 보안 고려사항

| 항목            | 대응 방안                              |
| --------------- | -------------------------------------- |
| **인증**        | Supabase Auth + 미들웨어 권한 체크     |
| **데이터 접근** | RLS 정책으로 행 단위 접근 제어         |
| **API 보안**    | 서버 사이드에서 민감한 로직 처리       |
| **결제 보안**   | PG사 위젯 사용, 서버에서 결제 승인     |
| **환경 변수**   | 민감 정보는 서버 전용 환경 변수로 관리 |

# 13. 심화 프로젝트 확장 포인트

| 기능                | 확장 방안                 |
| ------------------- | ------------------------- |
| **지도**            | Kakao Maps API 연동       |
| **실시간 알림**     | Supabase Realtime 구독    |
| **AI 추천**         | OpenAI API 연동           |
| **낙관적 업데이트** | TanStack Query 도입       |
| **E2E 테스트**      | Playwright 설정           |
| **CI/CD**           | GitHub Actions 워크플로우 |
