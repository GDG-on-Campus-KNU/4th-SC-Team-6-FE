import { defineConfig } from 'eslint/config'; // Flat config용 import
import js from '@eslint/js'; // ESLint 기본 JavaScript 룰셋
import tseslint from 'typescript-eslint'; // TypeScript용 ESLint 설정 & 파서
import pluginReact from 'eslint-plugin-react'; // React 관련 룰 (JSX, 컴포넌트 등)
import pluginReactHooks from 'eslint-plugin-react-hooks'; // React Hooks 관련 룰 (useEffect, useState 등)
import globals from 'globals'; // 전역 변수 정의 (window, document, etc.)
import pluginReactRefresh from 'eslint-plugin-react-refresh'; // HMR 안정성 관련 플러그인
// import pluginPrettier from 'eslint-plugin-prettier'; // Prettier 연동용 플러그인 (ESLint 안에서 Prettier 룰 적용)
// 2024년 이후 eslint-plugin-prettier 사용 지양

export default defineConfig([
  // ignore 설정(Flat Config 기반: .eslintignore 대신 eslint.config.js 내에서 ignores 필드 사용)
  // ignore 설정은 배열 안의 최상단에
  {
    ignores: [
      'node_modules/**', // 의존성
      'dist/**', // Vite 빌드 결과
      'build/**', // 타입스크립트 빌드 결과 (tsc outDir)
      'coverage/**', // 테스트 커버리지
      'public/**', // 정적 파일
      '.vscode/**', // 에디터 설정
      '.idea/**', // WebStorm 설정
      '*.log', // 로그 파일 전부
      '.DS_Store', // macOS 특수 파일
      '.prettierrc.cjs',
      'eslint.config.js',
      'vite.config.ts',
    ],
  },

  // JS/TS/React 룰 적용
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], // lint 대상 확장자
    languageOptions: {
      ecmaVersion: 'latest', // 최신 JS 문법 지원
      sourceType: 'module', // ES 모듈 (import/export)
      globals: {
        ...globals.browser, // window, document 등 브라우저 전역 객체 사용 가능
        ...globals.es2021, // 최신 ES 전역 객체들도 포함
      },
      parser: tseslint.parser, // TypeScript 전용 파서 지정
      parserOptions: {
        // 타입 체크를 위한 tsconfig 위치 -> ./tsconfig.json에 경로가 없어 ./tsconfig.app.json로 경로 변경
        // 파일 안에 include: ["src"] 등 실제 코드 포함 경로가 있어야 함함
        project: './tsconfig.app.json',
      },
    },
    plugins: {
      react: pluginReact, // React 규칙
      'react-hooks': pluginReactHooks, // Hooks 규칙
      'react-refresh': pluginReactRefresh, // Vite에서 Fast Refresh 안정성을 위한 규칙
      // prettier: pluginPrettier, // Prettier 통합
    },
    rules: {
      ...js.configs.recommended.rules, // JS 기본 룰셋 적용
      ...pluginReact.configs.recommended.rules, // React 기본 룰셋 적용
      ...pluginReactHooks.configs.recommended.rules, // Hooks 관련 룰셋 적용 (ex. useEffect dependency 배열 검사 등)
      'react-refresh/only-export-components': 'warn', // HMR 관련 안정성 권장 룰: Fast Refresh (Vite)
      'react/react-in-jsx-scope': 'off', // React 17+에선 JSX 사용 시 React import가 필요 없으므로 해당 룰 비활성화
      // 'prettier/prettier': 'error', // Prettier 룰 강제 적용 (코드 스타일 에러도 ESLint에서 보여줌)
      // 여기에 팀 규칙 추가
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지
      },
    },
  },

  // TypeScript 고급 룰셋 (타입 검사 기반 룰들, `tsconfig.json` 필수)
  ...tseslint.configs.recommendedTypeChecked,
]);
