import React, { useState } from 'react';
import { WasteItem, MASCOTS } from '../data/recyclingData';
import { MascotAvatar } from './MascotAvatar';
import { X, Bookmark, BookmarkCheck, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, Share2, Check } from 'lucide-react';
import { playPop } from '../utils/audio';

interface ItemDetailModalProps {
  item: WasteItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onSelectCategory,
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  // Find matching mascot for the item
  let mascotKey = 'chorok';
  if (item.relatedCategory === 'clear-pet' || item.relatedCategory === 'plastic') mascotKey = 'peti';
  else if (item.relatedCategory === 'paper') mascotKey = 'jongi';
  else if (item.relatedCategory === 'vinyl') mascotKey = 'bini';
  else if (item.relatedCategory === 'can-metal') mascotKey = 'candi';
  else if (item.relatedCategory === 'glass') mascotKey = 'glassy';
  else if (item.relatedCategory === 'food-vs-general') mascotKey = 'yamyam';
  else if (item.relatedCategory === 'special-waste') mascotKey = 'special';

  const mascot = MASCOTS[mascotKey] || MASCOTS.chorok;

  const toggleStep = (index: number) => {
    playPop();
    setCompletedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleShare = () => {
    playPop();
    const shareText = `[분리수거 팁] ${item.name} 배출 방법: ${item.disposalTarget}! ${item.quickGuide}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-emerald-100 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header decoration */}
        <div className="relative p-6 pb-4 bg-linear-to-b from-emerald-50/80 to-white border-b border-emerald-100/60 rounded-t-3xl">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <MascotAvatar id={mascot.id} size="md" expression="wink" />
              <div>
                <div className="text-xs font-semibold text-emerald-700 tracking-wide">
                  {mascot.name} ({mascot.role})의 안내
                </div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  {item.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  playPop();
                  onToggleBookmark(item.id);
                }}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
                title={isBookmarked ? '북마크 해제' : '북마크 저장'}
                aria-label="북마크 토글"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                ) : (
                  <Bookmark className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <button
                onClick={() => {
                  playPop();
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Target Banner */}
          <div className="mt-4 p-3.5 rounded-2xl bg-white shadow-xs border border-emerald-200/80 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500 font-medium">배출 장소</div>
            <div className="text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              {item.disposalTarget}
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-5 flex-1">
          {/* Quick summary */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-sm leading-relaxed flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div className="font-medium">{item.quickGuide}</div>
          </div>

          {/* Step-by-step checklist */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                따라하기 쉬운 배출 순서
              </h4>
              <span className="text-xs text-slate-600 font-medium">
                {completedSteps.length} / {item.steps.length} 완료
              </span>
            </div>

            <div className="space-y-2">
              {item.steps.map((step, idx) => {
                const isChecked = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 select-none ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-emerald-900 line-through'
                        : 'bg-slate-50/80 hover:bg-slate-100/80 border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      {isChecked ? '✓' : idx + 1}
                    </div>
                    <span className="text-sm font-medium flex-1">{step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Why? / Science & Recycling reason */}
          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 space-y-1.5">
            <div className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-sky-600" />
              왜 이렇게 버려야 할까요?
            </div>
            <p className="text-xs text-sky-900/90 leading-relaxed font-medium">
              {item.reason}
            </p>
          </div>

          {/* Warning notice if exists */}
          {item.warning && (
            <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-900 font-medium leading-relaxed">
                <span className="font-bold">주의: </span>
                {item.warning}
              </div>
            </div>
          )}

          {/* Pro tip if exists */}
          {item.tip && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 font-medium leading-relaxed">
              💡 <span className="font-bold">알아두면 좋은 꿀팁:</span> {item.tip}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 rounded-b-3xl border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={handleShare}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                복사 완료!
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                팁 공유하기
              </>
            )}
          </button>

          {onSelectCategory && (
            <button
              onClick={() => {
                playPop();
                onSelectCategory(item.relatedCategory);
                onClose();
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
            >
              관련 카테고리 가이드 보기
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
