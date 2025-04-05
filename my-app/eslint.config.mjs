import tseslint from 'typescript-eslint'; // TypeScript용 ESLint 플러그인과 파서
import globals from 'globals'; // 브라우저나 Node.js 환경의 전역 변수 정의
import js from '@eslint/js'; // ESLint의 JS 기본 추천 설정
import react from 'eslint-plugin-react'; // React 관련 규칙
import prettier from 'eslint-plugin-prettier'; // Prettier 포맷팅을 ESLint 룰로 적용
import prettierConfig from 'eslint-config-prettier'; // Prettier와 충돌하는 ESLint 규칙 비활성화

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended, // 기본 JS 추천 규칙 적용
  react.configs.recommended, // React 추천 규칙 적용
  prettierConfig, // Prettier와 충돌하는 규칙 제거 (ex: max-len 등)

  {
    // JS/TS/React 파일 전체에 적용될 공통 설정
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],

    languageOptions: {
      ecmaVersion: 'latest', // 최신 ECMAScript 문법 허용
      sourceType: 'module', // ES 모듈 사용
      globals: {
        ...globals.browser, // 브라우저 전역 변수 사용 가능 (window, document 등)
      },
    },

    plugins: {
      prettier, // Prettier 플러그인 활성화
      react, // React 플러그인 활성화
    },

    rules: {
      // React 17+에서는 JSX 사용할 때 import React 필요 없음
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // ypeScript 환경에서는 PropTypes를 안 써도 되니까 끔
      'react/prop-types': 'off',

      // React Hook 관련 규칙 (오류, 경고)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier 포맷이 맞지 않으면 ESLint 오류로 표시
      'prettier/prettier': 'error',
    },
  },

  // TypeScript 전용 설정
  {
    files: ['**/*.{ts,tsx}'], // ts, tsx 파일에만 적용

    languageOptions: {
      parser: tseslint.parser, // TypeScript용 파서 설정
      parserOptions: {
        project: './tsconfig.json', // tsconfig 위치 지정 (경로가 다르면 수정 필요)
      },
    },

    plugins: {
      '@typescript-eslint': tseslint.plugin, // TypeScript 플러그인 활성화
    },

    rules: {
      // 필요 시 여기에 @typescript-eslint 룰을 추가 가능
    },
  },

  // TypeScript 추천 룰 적용 (Strict 아님, 기본 recommended)
  ...tseslint.configs.recommended,
];
