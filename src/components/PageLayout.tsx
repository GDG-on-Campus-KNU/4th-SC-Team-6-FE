import  { ReactNode } from 'react';

interface PageLayoutProps {
  title: string; //페이지 상단 제목
  children: ReactNode; // 페이지 내부에 렌더링할 하위 컴포넌트
  padding?: string; // 레이아웃 여백 (Tailwind 클래스 문자열, 기본값: 'p-4')
}

// 공통 페이지 레이아웃 컴포넌트
// - 제목은 상단 중앙 정렬
// - 내용은 children으로 받아서 렌더링

function PageLayout({
  title,
  children,
  padding = 'p-4',
}: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 페이지 콘텐츠 영역 */}
      <main className={`${padding} flex-1`}>
        {/* 페이지 타이틀 */}
        <h1 className="py-8 text-center text-4xl font-bold text-white drop-shadow-lg">
          {title}
        </h1>
        {/* 하위 컴포넌트 렌더링 */}
        {children}
      </main>
    </div>
  );
}

export default PageLayout;
