import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/recyclingData';
import { MascotAvatar } from './MascotAvatar';
import { playPop, playSuccess, playWrong, playFanfare } from '../utils/audio';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Award, Sparkles, ArrowRight } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    playPop();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = currentQ.options[idx].isCorrect;
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSuccess();
    } else {
      playWrong();
    }
  };

  const handleNext = () => {
    playPop();
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      playFanfare();
    }
  };

  const handleRestart = () => {
    playPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const getScoreTitle = (s: number, total: number) => {
    const ratio = s / total;
    if (ratio === 1) return { title: '완벽한 분리수거 명예 대장님!', mascot: 'chorok', desc: '100점 만점! 지구를 지키는 최고의 환경 수호자예요!' };
    if (ratio >= 0.8) return { title: '척척박사 분리수거 전문가!', mascot: 'peti', desc: '대단해요! 헷갈리기 쉬운 품목들도 아주 잘 알고 계시네요!' };
    if (ratio >= 0.6) return { title: '친환경 실천 모범생!', mascot: 'jongi', desc: '훌륭해요! 조금만 더 익히면 분리수거 마스터가 될 수 있어요!' };
    return { title: '무럭무럭 자라는 분리수거 꿈나무!', mascot: 'bini', desc: '괜찮아요! 도우미 사전과 함께 하나씩 배워가면 쉬워져요!' };
  };

  return (
    <div className="rounded-3xl bg-white border border-emerald-100 p-6 md:p-8 shadow-xs">
      {!isFinished ? (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <MascotAvatar
                id={isAnswered ? (currentQ.options[selectedOption!].isCorrect ? 'chorok' : 'yamyam') : 'chorok'}
                size="md"
                expression={isAnswered ? (currentQ.options[selectedOption!].isCorrect ? 'cheer' : 'thinking') : 'happy'}
              />
              <div>
                <div className="text-xs font-bold text-emerald-700 tracking-wide">
                  알쏭달쏭 퀴즈 타임!
                </div>
                <div className="text-sm font-extrabold text-slate-800">
                  문제 {currentIndex + 1} / {QUIZ_QUESTIONS.length}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium">현재 점수</span>
              <div className="text-base font-black text-emerald-600">
                {score * 10}점
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 space-y-2">
            <div className="inline-block text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
              대상 품목: {currentQ.item}
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
            <p className="text-xs text-emerald-800/80 font-medium pt-1">
              {currentQ.characterHint}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'bg-slate-50 hover:bg-slate-100/80 border-slate-200/80 text-slate-700';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                } else {
                  btnStyle = 'opacity-40 bg-slate-50 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{opt.label}</span>
                  </div>

                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box after Answer */}
          {isAnswered && (
            <div className="space-y-4 animate-fade-in">
              <div
                className={`p-4 rounded-2xl border ${
                  currentQ.options[selectedOption!].isCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}
              >
                <div className="text-xs font-bold mb-1 flex items-center gap-1.5">
                  {currentQ.options[selectedOption!].isCorrect ? (
                    <>
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      정답입니다! 짝짝짝!
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      아쉬워요! 아래 설명을 확인해보세요.
                    </>
                  )}
                </div>
                <p className="text-xs font-medium leading-relaxed">
                  {currentQ.options[selectedOption!].explanation}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-200/50 text-2xs text-slate-600">
                  💡 상식 한 스푼: {currentQ.funFact}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
                >
                  {currentIndex + 1 < QUIZ_QUESTIONS.length ? '다음 문제 풀기' : '결과 확인하기'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="text-center py-6 space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <MascotAvatar
              id={getScoreTitle(score, QUIZ_QUESTIONS.length).mascot}
              size="xl"
              expression="cheer"
            />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Award className="w-4 h-4" />
              분리수거 퀴즈 챌린지 수료
            </div>
            <h3 className="text-2xl font-black text-slate-800">
              {getScoreTitle(score, QUIZ_QUESTIONS.length).title}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
              {getScoreTitle(score, QUIZ_QUESTIONS.length).desc}
            </p>
          </div>

          {/* Score card */}
          <div className="max-w-xs mx-auto p-5 rounded-2xl bg-linear-to-b from-emerald-50 to-white border border-emerald-200 space-y-2">
            <div className="text-xs text-slate-500 font-semibold">최종 획득 점수</div>
            <div className="text-4xl font-black text-emerald-600">
              {score * 10} <span className="text-lg font-bold text-slate-600">/ 100점</span>
            </div>
            <div className="text-xs text-slate-600 font-medium">
              총 {QUIZ_QUESTIONS.length}문제 중 {score}문제를 맞혔어요!
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-2 shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              다시 도전하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
