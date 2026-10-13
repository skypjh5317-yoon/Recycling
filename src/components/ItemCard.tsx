import React from 'react';
import { WasteItem } from '../data/recyclingData';
import { Bookmark, BookmarkCheck, ChevronRight, AlertTriangle } from 'lucide-react';
import { playPop } from '../utils/audio';

interface ItemCardProps {
  item: WasteItem;
  onSelect: (item: WasteItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <div
      onClick={() => {
        playPop();
        onSelect(item);
      }}
      className="group relative p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top meta row: Clean unboxed metadata with separators (zero-pill discipline) */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
          <div className="flex items-center gap-1.5">
            <span>{item.category}</span>
            <span aria-hidden="true">·</span>
            <span className={item.difficulty === '주의' ? 'text-rose-600 font-semibold' : 'text-slate-600'}>
              난이도 {item.difficulty}
            </span>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              playPop();
              onToggleBookmark(item.id);
            }}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-colors"
            title={isBookmarked ? '북마크 해제' : '북마크 추가'}
            aria-label="북마크"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            ) : (
              <Bookmark className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        {/* Item Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
          {item.name}
          {item.isTricky && (
            <span className="text-2xs font-semibold text-rose-600 flex items-center gap-0.5">
              <AlertTriangle className="w-3 h-3" />
              헷갈림 주의
            </span>
          )}
        </h3>

        {/* Quick summary */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {item.quickGuide}
        </p>
      </div>

      {/* Footer target info */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs">
          <span className="text-slate-600 font-medium mr-1.5">배출처:</span>
          <span className="font-bold text-emerald-800">
            {item.disposalTarget}
          </span>
        </div>

        <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center">
          방법 보기
          <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
        </span>
      </div>
    </div>
  );
};
