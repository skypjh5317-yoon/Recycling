import React from 'react';
import { WasteCategory, WasteItem } from '../data/recyclingData';
import { MascotAvatar } from './MascotAvatar';
import { X, CheckCircle, XCircle, Lightbulb, ChevronRight } from 'lucide-react';
import { playPop } from '../utils/audio';

interface CategoryDetailModalProps {
  category: WasteCategory | null;
  items: WasteItem[];
  onClose: () => void;
  onSelectItem: (item: WasteItem) => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
  category,
  items,
  onClose,
  onSelectItem,
}) => {
  if (!category) return null;

  const relatedItems = items.filter(it => it.relatedCategory === category.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-emerald-100 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 pb-5 rounded-t-3xl border-b border-slate-100 ${category.color.bg}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <MascotAvatar id={category.mascot.id} size="lg" expression="cheer" />
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  분리배출 가이드 · {category.badge}
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {category.name}
                </h2>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  {category.mascot.greeting}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playPop();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-white/80 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-700 leading-relaxed">
            🌿 {category.summary}
          </div>

          {/* Key Principles Checklist */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              {category.name} 배출 4대 수칙
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {category.principles.map((rule, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-slate-200/80 flex items-start gap-2.5 text-xs font-medium text-slate-700 shadow-2xs"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recyclable vs Non-Recyclable Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recyclable Column */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                재활용 가능 품목 (O)
              </div>
              <ul className="space-y-2">
                {category.recyclableExamples.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs font-medium text-emerald-950 flex items-start gap-2"
                  >
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-Recyclable Column */}
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
                <XCircle className="w-4 h-4 text-rose-600" />
                재활용 불가능 / 종량제 (X)
              </div>
              <ul className="space-y-2">
                {category.nonRecyclableExamples.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs font-medium text-rose-950 flex items-start gap-2"
                  >
                    <span className="text-rose-500 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Tips Box */}
          {category.proTips && category.proTips.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-2">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                {category.mascot.name}의 알짜배기 분리배출 꿀팁
              </div>
              {category.proTips.map((tip, idx) => (
                <p key={idx} className="text-xs text-amber-950 font-medium leading-relaxed">
                  • {tip}
                </p>
              ))}
            </div>
          )}

          {/* Related Items in this Category */}
          {relatedItems.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-700 mb-2.5">
                이 분류의 대표 품목 사전 ({relatedItems.length}개)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {relatedItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playPop();
                      onSelectItem(item);
                    }}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {item.disposalTarget}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 rounded-b-3xl border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-900 text-white transition-colors"
          >
            확인했어요!
          </button>
        </div>
      </div>
    </div>
  );
};
