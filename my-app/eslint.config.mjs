<<<<<<< HEAD
<<<<<<< HEAD
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> da158c5 (chore: update Prettier and ESLint configurations)
>>>>>>> bd6bb98 (chore: update Prettier and ESLint configurations)
import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
<<<<<<< HEAD
>>>>>>> bf0985a (initial commit)
=======
<<<<<<< HEAD
>>>>>>> bd6bb98 (chore: update Prettier and ESLint configurations)


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
=======
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
=======
>>>>>>> da158c5 (chore: update Prettier and ESLint configurations)

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
<<<<<<< HEAD
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
>>>>>>> 0ee79a9 (initial commit)
=======
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      prettier,
      react,
    },
    rules: {
      // React 관련 규칙 설정
      'react/react-in-jsx-scope': 'off', // Next.js 같은 프로젝트에서 필요 없음
      'react/jsx-uses-react': 'off', // React 17+에서 필요 없음
      'react/prop-types': 'off', // TypeScript를 사용한다면 PropTypes 불필요
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Prettier 관련 규칙 적용
      'prettier/prettier': 'error',
    },
  },

  // JavaScript 기본 추천 규칙 적용
  js.configs.recommended,

  // React 추천 규칙 적용
  react.configs.recommended,

  // Prettier와 충돌하는 ESLint 규칙 비활성화
  prettierConfig,
];
>>>>>>> da158c5 (chore: update Prettier and ESLint configurations)
