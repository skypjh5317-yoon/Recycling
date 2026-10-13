import React from 'react';
import { MascotAvatar } from './MascotAvatar';
import { Search, Volume2, VolumeX, Bookmark, Sparkles, BookOpen, HelpCircle, CheckSquare } from 'lucide-react';
import { playPop } from '../utils/audio';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  bookmarkCount: number;
  showOnlyBookmarks: boolean;
  onToggleBookmarksFilter: () => void;
  activeTab: 'all' | 'categories' | 'wizard' | 'quiz' | 'principles';
  onTabChange: (tab: 'all' | 'categories' | 'wizard' | 'quiz' | 'principles') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  isMuted,
  onToggleMute,
  bookmarkCount,
  showOnlyBookmarks,
  onToggleBookmarksFilter,
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 py-3">
        {/* Top Branding Row */}
        <div className="flex items-center justify-between gap-3">
          <div
            onClick={() => {
              playPop();
              onTabChange('all');
            }}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <MascotAvatar id="chorok" size="sm" expression="wink" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-800 group-hover:text-emerald-700 transition-colors">
                  깨끗요정의 분리수거 도우미
                </span>
                <span className="hidden sm:inline-block text-2xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  친절 사전
                </span>
              </div>
              <p className="text-2xs text-slate-500 font-medium hidden sm:block">
                어려운 분리배출, 새롬이와 함께 척척 쉽게 해결해요!
              </p>
            </div>
          </div>

          {/* Quick Utility Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Bookmarks toggle */}
            <button
              onClick={() => {
                playPop();
                onToggleBookmarksFilter();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                showOnlyBookmarks
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title="북마크한 품목 모아보기"
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-white' : 'text-slate-500'}`} />
              <span className="hidden xs:inline">즐겨찾기</span>
              <span className="text-2xs px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700">
                {bookmarkCount}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                onToggleMute();
                playPop();
              }}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title={isMuted ? '소리 켜기' : '소리 끄기'}
              aria-label="소리 설정 토글"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-600" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="어떻게 버릴지 헷갈리는 물건을 검색해보세요 (예: 치킨뼈, 피자박스, 보조배터리, 샴푸통...)"
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => {
                playPop();
                onSearchChange('');
              }}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-400 hover:text-slate-600"
            >
              지우기
            </button>
          )}
        </div>

        {/* Navigation Tabs (Filter buttons) */}
        <nav className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => {
              playPop();
              onTabChange('all');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            품목 사전
          </button>

          <button
            onClick={() => {
              playPop();
              onTabChange('categories');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            종류별 상세 가이드
          </button>

          <button
            onClick={() => {
              playPop();
              onTabChange('wizard');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'wizard'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            3초 진단기
          </button>

          <button
            onClick={() => {
              playPop();
              onTabChange('quiz');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            분리수거 퀴즈
          </button>

          <button
            onClick={() => {
              playPop();
              onTabChange('principles');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'principles'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            4대 핵심 원칙
          </button>
        </nav>
      </div>
    </header>
  );
};
