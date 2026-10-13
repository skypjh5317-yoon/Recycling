import React, { useState, useEffect, useMemo } from 'react';
import {
  RECYCLING_CATEGORIES,
  WASTE_ITEMS,
  WasteItem,
  WasteCategory,
  MASCOTS,
} from './data/recyclingData';
import { MascotAvatar } from './components/MascotAvatar';
import { Header } from './components/Header';
import { ItemCard } from './components/ItemCard';
import { CategoryCard } from './components/CategoryCard';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CategoryDetailModal } from './components/CategoryDetailModal';
import { DiagnosticWizard } from './components/DiagnosticWizard';
import { QuizSection } from './components/QuizSection';
import { FourPrinciples } from './components/FourPrinciples';
import {
  initAudio,
  isAudioMuted,
  toggleAudioMute,
  playPop,
} from './utils/audio';
import {
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  Heart,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

const QUICK_TAGS = [
  '치킨뼈',
  '피자박스',
  '컵라면',
  '샴푸통',
  '우유팩',
  '보조배터리',
  '아이스팩',
  '달걀껍질',
  '깨진유리',
  '물티슈',
  '부탄가스',
  '영수증',
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<
    'all' | 'categories' | 'wizard' | 'quiz' | 'principles'
  >('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<string>('all');
  const [onlyTrickyFilter, setOnlyTrickyFilter] = useState<boolean>(false);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState<boolean>(false);

  // Modals state
  const [selectedItem, setSelectedItem] = useState<WasteItem | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<WasteCategory | null>(null);

  // Bookmarks state with localStorage persistence
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('ecopals_bookmarks');
      return saved ? JSON.parse(saved) : ['w-1', 'w-3', 'w-5', 'w-9'];
    } catch {
      return ['w-1', 'w-3', 'w-5', 'w-9'];
    }
  });

  const [muted, setMuted] = useState<boolean>(false);

  useEffect(() => {
    initAudio();
    setMuted(isAudioMuted());
  }, []);

  const handleToggleMute = () => {
    const isNowMuted = toggleAudioMute();
    setMuted(isNowMuted);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem('ecopals_bookmarks', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return WASTE_ITEMS.filter(item => {
      // 1. Search Query
      if (q) {
        const nameMatch = item.name.toLowerCase().includes(q);
        const aliasMatch = item.aliases.some(alias =>
          alias.toLowerCase().includes(q)
        );
        const targetMatch = item.disposalTarget.toLowerCase().includes(q);
        const categoryMatch = item.category.toLowerCase().includes(q);
        if (!nameMatch && !aliasMatch && !targetMatch && !categoryMatch) {
          return false;
        }
      }

      // 2. Bookmarks filter
      if (showOnlyBookmarks && !bookmarkedIds.includes(item.id)) {
        return false;
      }

      // 3. Tricky items filter
      if (onlyTrickyFilter && !item.isTricky) {
        return false;
      }

      // 4. Category filter
      if (
        selectedCategoryFilter !== 'all' &&
        item.relatedCategory !== selectedCategoryFilter
      ) {
        return false;
      }

      return true;
    });
  }, [
    searchQuery,
    showOnlyBookmarks,
    bookmarkedIds,
    onlyTrickyFilter,
    selectedCategoryFilter,
  ]);

  const handleSelectQuickTag = (tag: string) => {
    playPop();
    setSearchQuery(tag);
    setActiveTab('all');
  };

  const handleSelectCategoryFromDetail = (categoryId: string) => {
    const found = RECYCLING_CATEGORIES.find(c => c.id === categoryId);
    if (found) {
      setSelectedCategory(found);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans flex flex-col selection:bg-emerald-200">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isMuted={muted}
        onToggleMute={handleToggleMute}
        bookmarkCount={bookmarkedIds.length}
        showOnlyBookmarks={showOnlyBookmarks}
        onToggleBookmarksFilter={() => {
          setShowOnlyBookmarks(prev => !prev);
          if (!showOnlyBookmarks) setActiveTab('all');
        }}
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          if (showOnlyBookmarks) setShowOnlyBookmarks(false);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-8 space-y-8">
        {/* Cute Mascot Hero Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-500 via-teal-500 to-sky-500 p-6 md:p-8 text-white shadow-md">
          {/* Background subtle bubbles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5" />
                분리수거가 헷갈릴 땐 망설이지 말고 찾아보세요!
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                어렵고 복잡한 분리수거, <br className="hidden sm:block" />
                깨끗요정들이 아주 쉽게 알려드려요!
              </h1>

              <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-medium">
                치킨 뼈는 어디로? 기름 묻은 피자박스는? 샴푸통 펌프는 재활용될까?
                <br />
                검색창에 단어를 치거나 3초 진단기를 이용하면 바로 해결돼요!
              </p>

              {/* Quick Search Tag Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                <span className="text-2xs font-semibold text-emerald-100 flex items-center mr-1">
                  자주 찾는 쓰레기:
                </span>
                {QUICK_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleSelectQuickTag(tag)}
                    className="px-2.5 py-1 rounded-lg text-2xs font-bold bg-white/15 hover:bg-white text-white hover:text-emerald-900 transition-all cursor-pointer backdrop-blur-2xs"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Mascot Group Display */}
            <div className="flex items-center gap-2 sm:gap-3 bg-white/15 backdrop-blur-md p-4 rounded-3xl border border-white/20 shrink-0">
              <div className="text-center">
                <MascotAvatar id="chorok" size="md" expression="cheer" />
                <div className="text-2xs font-bold text-white mt-1">새롬이</div>
              </div>
              <div className="text-center">
                <MascotAvatar id="peti" size="md" expression="happy" />
                <div className="text-2xs font-bold text-white mt-1">페티</div>
              </div>
              <div className="text-center">
                <MascotAvatar id="jongi" size="md" expression="wink" />
                <div className="text-2xs font-bold text-white mt-1">종이별</div>
              </div>
              <div className="text-center">
                <MascotAvatar id="candi" size="md" expression="happy" />
                <div className="text-2xs font-bold text-white mt-1">캔디</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tab 1: Comprehensive Waste Item Encyclopedia */}
        {activeTab === 'all' && (
          <section className="space-y-6">
            {/* Filter toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
              {/* Category Segmented Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs no-scrollbar">
                <button
                  onClick={() => {
                    playPop();
                    setSelectedCategoryFilter('all');
                  }}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                    selectedCategoryFilter === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  전체 품목 ({WASTE_ITEMS.length})
                </button>

                {RECYCLING_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playPop();
                      setSelectedCategoryFilter(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
                      selectedCategoryFilter === cat.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Tricky items toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    playPop();
                    setOnlyTrickyFilter(prev => !prev);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    onlyTrickyFilter
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <AlertTriangle
                    className={`w-3.5 h-3.5 ${
                      onlyTrickyFilter ? 'text-rose-600' : 'text-slate-400'
                    }`}
                  />
                  헷갈리는 품목만 보기
                </button>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium px-1">
              <div>
                총{' '}
                <span className="font-bold text-slate-900">
                  {filteredItems.length}
                </span>
                개의 품목 안내
                {searchQuery && (
                  <span>
                    {' '}
                    (&ldquo;<span className="text-emerald-700 font-semibold">{searchQuery}</span>&rdquo; 검색 결과)
                  </span>
                )}
                {showOnlyBookmarks && (
                  <span className="text-emerald-700 font-semibold">
                    {' '}
                    (즐겨찾기 품목)
                  </span>
                )}
              </div>

              {(searchQuery ||
                selectedCategoryFilter !== 'all' ||
                onlyTrickyFilter ||
                showOnlyBookmarks) && (
                <button
                  onClick={() => {
                    playPop();
                    setSearchQuery('');
                    setSelectedCategoryFilter('all');
                    setOnlyTrickyFilter(false);
                    setShowOnlyBookmarks(false);
                  }}
                  className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  필터 초기화
                </button>
              )}
            </div>

            {/* Item Card Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onSelect={setSelectedItem}
                    isBookmarked={bookmarkedIds.includes(item.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search State */
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-4">
                <div className="flex justify-center">
                  <MascotAvatar id="chorok" size="lg" expression="thinking" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">
                    &lsquo;{searchQuery}&rsquo;에 해당하는 품목을 찾지 못했어요.
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                    오타가 없는지 확인해보시거나, 3초 진단기를 통해 바로 어떤
                    쓰레기인지 확인해보세요!
                  </p>
                </div>

                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      playPop();
                      setActiveTab('wizard');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    3초 스마트 진단기 열기
                  </button>
                  <button
                    onClick={() => {
                      playPop();
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all"
                  >
                    전체 목록 보기
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Tab 2: Category Deep Dive */}
        {activeTab === 'categories' && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  쓰레기 종류별 상세 분리배출 가이드
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  투명페트병, 플라스틱, 종이, 비닐, 캔, 유리, 음식물까지! 각 요정의
                  전문 가이드를 확인하세요.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RECYCLING_CATEGORIES.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onSelect={setSelectedCategory}
                />
              ))}
            </div>
          </section>
        )}

        {/* Tab 3: 3-Second Diagnostic Wizard */}
        {activeTab === 'wizard' && (
          <section className="space-y-6">
            <DiagnosticWizard />
          </section>
        )}

        {/* Tab 4: Recycling Quiz Challenge */}
        {activeTab === 'quiz' && (
          <section className="space-y-6">
            <QuizSection />
          </section>
        )}

        {/* Tab 5: Four Golden Principles */}
        {activeTab === 'principles' && (
          <section className="space-y-6">
            <FourPrinciples />
          </section>
        )}

        {/* Floating Quick Action Helper: Tricky Trash Spotlight */}
        {activeTab === 'all' && !searchQuery && (
          <section className="p-6 rounded-3xl bg-amber-50/80 border border-amber-200/80 space-y-4">
            <div className="flex items-center gap-3">
              <MascotAvatar id="yamyam" size="sm" expression="wink" />
              <div>
                <h3 className="text-sm font-bold text-amber-900">
                  얌얌이 탐정의 단골 오답 노트!
                </h3>
                <p className="text-xs text-amber-800/90 font-medium">
                  한국인들이 가장 많이 실수하는 음식물 vs 일반쓰레기 5가지!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-rose-700">🍗 치킨·족발 뼈</span>
                <p className="text-slate-600 font-medium">
                  사료 분쇄기 고장의 주원인! 무조건 종량제 일반쓰레기예요.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-rose-700">🥚 달걀·메추리알 껍데기</span>
                <p className="text-slate-600 font-medium">
                  석회질 껍데기는 동물이 소화 못해요. 종량제 봉투에 쏙!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-rose-700">🧅 양파·마늘 껍질</span>
                <p className="text-slate-600 font-medium">
                  질긴 섬유질은 사료화 불가! 대파 뿌리도 일반쓰레기예요.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-rose-700">🍕 기름 밴 피자 박스</span>
                <p className="text-slate-600 font-medium">
                  기름 묻은 바닥은 일반쓰레기, 깨끗한 뚜껑만 종이예요.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-rose-700">🧊 젤 타입 아이스팩</span>
                <p className="text-slate-600 font-medium">
                  싱크대에 뜯어 버리면 미세플라스틱 오염! 통째로 종량제 봉투에!
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-rose-700">🔋 보조배터리 / 충전지</span>
                <p className="text-slate-600 font-medium">
                  압착 시 화재 폭발 위험! 꼭 폐건전지 전용 수거함으로!
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-2 font-medium">
          <MascotAvatar id="chorok" size="sm" expression="happy" />
          <span>깨끗요정의 분리수거 도우미 · 환경부 분리배출 가이드라인 준수</span>
        </div>
        <p className="text-2xs text-slate-400 max-w-md mx-auto">
          올바른 분리배출은 버려지는 쓰레기를 귀중한 자원으로 되돌립니다.
          지역 지자체(시·군·구) 조례에 따라 세부 배출 요일이나 수거 방식은 다를 수 있습니다.
        </p>
      </footer>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isBookmarked={selectedItem ? bookmarkedIds.includes(selectedItem.id) : false}
        onToggleBookmark={handleToggleBookmark}
        onSelectCategory={handleSelectCategoryFromDetail}
      />

      {/* Category Detail Modal */}
      <CategoryDetailModal
        category={selectedCategory}
        items={WASTE_ITEMS}
        onClose={() => setSelectedCategory(null)}
        onSelectItem={item => {
          setSelectedCategory(null);
          setSelectedItem(item);
        }}
      />
    </div>
  );
}
