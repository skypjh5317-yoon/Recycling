import React from 'react';
import { WasteCategory } from '../data/recyclingData';
import { MascotAvatar } from './MascotAvatar';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { playPop } from '../utils/audio';

interface CategoryCardProps {
  category: WasteCategory;
  onSelect: (category: WasteCategory) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelect,
}) => {
  return (
    <div
      onClick={() => {
        playPop();
        onSelect(category);
      }}
      className="group relative p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header with Avatar & Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <MascotAvatar id={category.mascot.id} size="md" expression="happy" />
            <div>
              <div className="text-2xs font-bold text-slate-500 uppercase tracking-wide">
                {category.badge}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {category.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4 line-clamp-2">
          {category.summary}
        </p>

        {/* Representative rules checklist preview */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          {category.principles.slice(0, 2).map((p, i) => (
            <div key={i} className="text-xs text-slate-600 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="truncate">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Button link */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">
          {category.mascot.name} 요정
        </span>
        <span className="text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
          상세 가이드 보기
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
