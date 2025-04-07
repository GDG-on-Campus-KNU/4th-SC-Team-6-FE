// 주석 처리 위해 파일 확장자 변경(.json -> .cjs)
module.exports = {
    arrowParens: 'always', // 항상 괄호 붙이기: (x) => {} 형태
    bracketSameLine: false, // JSX에서 닫는 괄호를 다음 줄에
    bracketSpacing: true, // 객체 리터럴 중괄호에 공백 삽입: { foo: bar }
    semi: true, // 세미콜론 사용
    singleQuote: true, // 문자열에 작은따옴표 사용
    jsxSingleQuote: false, // JSX에선 큰따옴표 유지
    quoteProps: 'as-needed', // 객체 속성 따옴표는 필요할 때만
    trailingComma: 'es5', // ES5 기준으로 마지막 요소에 콤마 (객체/배열 등)
    singleAttributePerLine: false, // JSX에서 속성을 여러 줄로 나누지 않음
    htmlWhitespaceSensitivity: 'css', // HTML 공백은 CSS 기준에 따름
    proseWrap: 'preserve', // 마크다운에서 자동 줄바꿈 X
    printWidth: 80, // 한 줄 최대 길이
    tabWidth: 2, // 탭 간격
    useTabs: false, // 스페이스로 들여쓰기
    embeddedLanguageFormatting: 'auto', // Markdown 등 내부 언어도 자동 포맷
    plugins: ['prettier-plugin-tailwindcss'], // Tailwind 클래스 정렬 플러그인
};
  