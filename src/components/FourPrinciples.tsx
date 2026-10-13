import React, { useState } from 'react';
import { FOUR_PRINCIPLES } from '../data/recyclingData';
import { MascotAvatar } from './MascotAvatar';
import { Check, Sparkles, Heart } from 'lucide-react';
import { playPop, playSuccess } from '../utils/audio';

export const FourPrinciples: React.FC = () => {
  const [pledged, setPledged] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handlePledge = () => {
    playSuccess();
    setPledged(true);
  };

  return (
    <div className="rounded-3xl bg-linear-to-b from-emerald-50/70 to-white border border-emerald-100 p-6 md:p-8 shadow-xs">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          환경부 공인 분리배출 핵심 4계명
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          이 4가지만 기억하면 분리수거 끝!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          어떤 쓰레기라도 &ldquo;비우고, 헹구고, 분리하고, 섞지 않는다&rdquo; 4단계를 거치면 깨끗한 자원으로 다시 태어나요.
        </p>
      </div>

      {/* Grid of 4 Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FOUR_PRINCIPLES.map((principle, index) => {
          const isSelected = activeCard === index;
          return (
            <div
              key={principle.number}
              onClick={() => {
                playPop();
                setActiveCard(isSelected ? null : index);
              }}
              className={`p-5 rounded-3xl bg-white border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-400 shadow-md ring-2 ring-emerald-100'
                  : 'border-slate-200/80 hover:border-emerald-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold text-emerald-600 font-mono">
                    {principle.number}
                  </span>
                  <MascotAvatar id={principle.mascot} size="sm" expression={isSelected ? 'cheer' : 'happy'} />
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  {principle.title}
                </h3>
                <div className="text-2xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  {principle.sub}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {principle.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-2xs text-emerald-800 bg-emerald-50/60 p-2.5 rounded-xl font-medium">
                💡 {principle.tip}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pledge banner */}
      <div className="mt-8 max-w-xl mx-auto p-5 rounded-3xl bg-white border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <MascotAvatar id="chorok" size="md" expression={pledged ? 'cheer' : 'wink'} />
          <div>
            <div className="text-sm font-bold text-slate-900">
              {pledged ? '🎉 오늘부터 멋진 환경 지킴이 약속 완료!' : '나도 오늘부터 올바르게 분리수거하기!'}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              {pledged ? '새롬이와 친구들이 항상 응원할게요!' : '작은 실천 하나가 깨끗한 지구를 만듭니다.'}
            </div>
          </div>
        </div>

        <button
          onClick={handlePledge}
          disabled={pledged}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
            pledged
              ? 'bg-emerald-100 text-emerald-800 cursor-default'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
          }`}
        >
          {pledged ? (
            <>
              <Check className="w-4 h-4" />
              약속했어요!
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 fill-white" />
              나도 동참 약속하기
            </>
          )}
        </button>
      </div>
    </div>
  );
};
