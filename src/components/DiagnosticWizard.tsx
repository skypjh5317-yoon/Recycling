import React, { useState } from 'react';
import { MascotAvatar } from './MascotAvatar';
import { playPop, playSuccess } from '../utils/audio';
import { ArrowLeft, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface DiagnosticResult {
  title: string;
  target: string;
  targetColor: string;
  mascot: string;
  explanation: string;
  ruleList: string[];
}

export const DiagnosticWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [wasteType, setWasteType] = useState<string>('');
  const [subType, setSubType] = useState<string>('');
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleStep1 = (type: string) => {
    playPop();
    setWasteType(type);
    setStep(2);
  };

  const handleStep2 = (sub: string) => {
    playPop();
    setSubType(sub);
    calculateResult(wasteType, sub);
    setStep(3);
    playSuccess();
  };

  const calculateResult = (t: string, s: string) => {
    if (t === 'food') {
      if (s === 'edible') {
        setResult({
          title: '가축의 사료로 재가공 가능해요!',
          target: '음식물 쓰레기',
          targetColor: 'bg-orange-100 text-orange-800 border-orange-300',
          mascot: 'yamyam',
          explanation: '수분을 최대한 꽉 짜고, 이물질(비닐, 이쑤시개)을 제거한 후 음식물 전용 봉투/수거용기에 배출해주세요.',
          ruleList: [
            '물기는 최대한 꼭 짜서 버리기',
            '비닐봉지나 이쑤시개는 함께 넣지 않기',
            '과일 껍질(사과, 바나나, 귤, 수박 등 부드러운 것)은 음식물 가능',
          ],
        });
      } else {
        setResult({
          title: '동물이 먹을 수 없어 사료 불가!',
          target: '종량제 일반쓰레기',
          targetColor: 'bg-rose-100 text-rose-800 border-rose-300',
          mascot: 'chorok',
          explanation: '동물 뼈, 어패류 껍데기, 양파/마늘껍질, 고추장/된장, 딱딱한 씨앗 등은 모두 종량제 일반쓰레기로 버려야 합니다.',
          ruleList: [
            '치킨/갈비 뼈다귀는 일반쓰레기',
            '달걀 껍데기, 조개 껍데기는 일반쓰레기',
            '염분이 매우 높은 장류나 커피 찌꺼기도 일반쓰레기',
          ],
        });
      }
    } else if (t === 'container') {
      if (s === 'clean_pet') {
        setResult({
          title: '최고급 재생 원료가 되는 보물!',
          target: '투명 페트병 전용 수거함',
          targetColor: 'bg-sky-100 text-sky-800 border-sky-300',
          mascot: 'peti',
          explanation: '색이 없는 깨끗한 생수/음료 페트병은 라벨을 떼고 찌그러뜨린 뒤 뚜껑을 닫아 전용함에 쏙 넣어요!',
          ruleList: [
            '물로 안쪽 헹구기',
            '비닐 라벨은 뜯어서 비닐류로 따로 배출',
            '발로 밟아 납작하게 압착 후 뚜껑 닫기',
          ],
        });
      } else if (s === 'clean_plastic') {
        setResult({
          title: '깨끗이 세척된 플라스틱!',
          target: '플라스틱류 분리배출',
          targetColor: 'bg-teal-100 text-teal-800 border-teal-300',
          mascot: 'peti',
          explanation: '음식물이나 이물질이 깨끗이 씻긴 플라스틱 용기는 플라스틱으로 분리수거해요.',
          ruleList: [
            '뚜껑 속 금속 스프링(펌프)은 일반쓰레기 분리',
            '다른 재질 부착 상표 스티커 떼기',
          ],
        });
      } else if (s === 'clean_paper') {
        setResult({
          title: '종이 재활용 펄프 자원!',
          target: '종이류 (상자는 테이프 제거 후 접어서)',
          targetColor: 'bg-amber-100 text-amber-800 border-amber-300',
          mascot: 'jongi',
          explanation: '물기나 기름기가 없는 깨끗한 종이는 상자의 송장/테이프를 떼고 납작하게 접어 배출해요.',
          ruleList: [
            '택배 박스 테이프와 운송장 완벽 제거',
            '우유팩/두유팩은 일반 종이가 아닌 종이팩 전용함 배출',
          ],
        });
      } else if (s === 'dirty') {
        setResult({
          title: '오염 물질이 지워지지 않아요!',
          target: '종량제 일반쓰레기',
          targetColor: 'bg-rose-100 text-rose-800 border-rose-300',
          mascot: 'chorok',
          explanation: '기름때나 붉은 고추양념이 물든 용기/비닐/종이는 재활용되지 못하고 전체 재활용품을 오염시키므로 일반쓰레기로 버립니다.',
          ruleList: [
            '기름 밴 피자 박스 바닥은 일반쓰레기',
            '물로 씻어도 붉은 컵라면 용기는 일반쓰레기',
            '양념 묻은 비닐랩은 일반쓰레기',
          ],
        });
      }
    } else if (t === 'daily') {
      setResult({
        title: '복합 재질이거나 소형 소모품!',
        target: '종량제 일반쓰레기',
        targetColor: 'bg-slate-100 text-slate-800 border-slate-300',
        mascot: 'chorok',
        explanation: '칫솔, 볼펜, 물티슈, 영수증, 고무장갑, 사용한 휴지 등은 크기가 너무 작거나 복합 재질이라 재활용되지 않아요.',
        ruleList: [
          '물티슈는 플라스틱 섬유지만 변기/재활용 불가 -> 종량제',
          '영수증은 감열지 화학 코팅 -> 종량제',
          '칫솔, 고무장갑 -> 종량제',
        ],
      });
    } else if (t === 'special') {
      if (s === 'battery') {
        setResult({
          title: '화재 폭발 위험! 절대 일반쓰레기 금지',
          target: '폐건전지 전용 수거함',
          targetColor: 'bg-red-100 text-red-800 border-red-300',
          mascot: 'special',
          explanation: '배터리류는 쓰레기 수거차 압착 시 화재를 일으킵니다. 주민센터나 아파트 폐건전지함에 배출하세요.',
          ruleList: [
            '보조배터리, 충전지, 리튬전지 모두 해당',
            '절대 종량제 봉투에 넣지 말기',
          ],
        });
      } else if (s === 'medicine') {
        setResult({
          title: '수질 생태계 파괴 방지!',
          target: '약국 / 보건소 / 주민센터 폐의약품함',
          targetColor: 'bg-red-100 text-red-800 border-red-300',
          mascot: 'special',
          explanation: '변기에 약을 버리면 하천 생태계가 파괴됩니다. 포장재를 뺀 알약/가루약을 모아 약국이나 주민센터에 반납하세요.',
          ruleList: [
            '변기나 싱크대에 절대 약물 흘려보내지 않기',
            '알약은 PTP 포장 뜯어서 알맹이만 비닐에 모아 배출',
          ],
        });
      } else if (s === 'broken_glass') {
        setResult({
          title: '수거원 안전 필수 & 융점 다름',
          target: '신문지 두껍게 싸서 종량제 (대량: 불연성 마대)',
          targetColor: 'bg-slate-100 text-slate-800 border-slate-300',
          mascot: 'glassy',
          explanation: '깨진 유리, 거울, 도자기, 락앤락 내열유리는 재활용 유리병과 성분이 달라 재활용이 불가합니다. 신문지로 감싸 안전하게 배출하세요.',
          ruleList: [
            '재활용 유리병 수거함에 절대 넣지 않기',
            '신문지로 여러 겹 감싸고 "깨진 유리" 표기',
          ],
        });
      } else {
        setResult({
          title: '안전 전용 수거 대상!',
          target: '지자체 전용 수거함 또는 무상 방문수거',
          targetColor: 'bg-blue-100 text-blue-800 border-blue-300',
          mascot: 'special',
          explanation: '형광등은 깨지지 않게 형광등 수거함에, 소형 가전제품은 5개 이상 무료방문수거(1599-0903)를 이용해보세요.',
          ruleList: [
            '형광등은 수은 가스 누출 방지를 위해 깨지지 않게 보관',
            '소형 가전은 주민센터 수거함에 무료 배출 가능',
          ],
        });
      }
    }
  };

  const handleReset = () => {
    playPop();
    setStep(1);
    setWasteType('');
    setSubType('');
    setResult(null);
  };

  return (
    <div className="rounded-3xl bg-white border border-emerald-100 p-6 md:p-8 shadow-xs">
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <MascotAvatar id={result ? result.mascot : 'chorok'} size="md" expression={step === 3 ? 'cheer' : 'thinking'} />
          <div>
            <h3 className="text-lg font-bold text-slate-800">
              3초 스마트 쓰레기 진단기
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              이름을 잘 모르겠거나 애매한 쓰레기도 2번만 터치하면 바로 해결!
            </p>
          </div>
        </div>

        {step > 1 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            다시 진단
          </button>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`flex-1 h-2 rounded-full transition-all ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-100'}`} />
        <div className={`flex-1 h-2 rounded-full transition-all ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-100'}`} />
        <div className={`flex-1 h-2 rounded-full transition-all ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-100'}`} />
      </div>

      {/* Step 1: Broad Category */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="text-sm font-bold text-slate-700">
            Q1. 버리려는 쓰레기는 어떤 종류에 가장 가까운가요?
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => handleStep1('food')}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all flex items-start gap-3 group"
            >
              <span className="text-2xl p-2 rounded-xl bg-orange-50">🍎</span>
              <div>
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  음식물이나 식재료 찌꺼기
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  과일 껍질, 뼈, 채소 다듬은 것, 남은 밥/찌개 등
                </div>
              </div>
            </button>

            <button
              onClick={() => handleStep1('container')}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all flex items-start gap-3 group"
            >
              <span className="text-2xl p-2 rounded-xl bg-sky-50">📦</span>
              <div>
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  용기 / 포장재 / 박스 / 병
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  페트병, 배달용기, 택배박스, 비닐, 통조림캔 등
                </div>
              </div>
            </button>

            <button
              onClick={() => handleStep1('daily')}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all flex items-start gap-3 group"
            >
              <span className="text-2xl p-2 rounded-xl bg-purple-50">🪥</span>
              <div>
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  일상 소모품 / 문구 / 위생용품
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  물티슈, 휴지, 칫솔, 영수증, 고무장갑, 볼펜 등
                </div>
              </div>
            </button>

            <button
              onClick={() => handleStep1('special')}
              className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all flex items-start gap-3 group"
            >
              <span className="text-2xl p-2 rounded-xl bg-rose-50">🔋</span>
              <div>
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  위험물 / 약품 / 깨진 물건 / 가전
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  보조배터리, 남은 약, 깨진 유리, 형광등, 드라이기 등
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Specific Attributes */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setStep(1)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="text-sm font-bold text-slate-700">
              Q2. 상태나 세부 특징을 골라주세요!
            </div>
          </div>

          {/* Condition sets based on wasteType */}
          {wasteType === 'food' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleStep2('edible')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  부드러운 과일 껍질 / 남은 밥 / 식은 반찬
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  사과, 바나나, 수박 껍질 등 동물이 먹을 수 있는 부드러운 상태
                </div>
              </button>

              <button
                onClick={() => handleStep2('hard_bone')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  단단한 뼈 / 껍데기 / 양파껍질 / 뿌리
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  치킨뼈, 조개껍데기, 달걀껍질, 대파뿌리, 씨앗 등
                </div>
              </button>
            </div>
          )}

          {wasteType === 'container' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleStep2('clean_pet')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  색이 없는 투명한 생수병 / 음료 페트병
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  무색 투명하고 물로 헹굴 수 있는 음료용 페트병
                </div>
              </button>

              <button
                onClick={() => handleStep2('clean_plastic')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  깨끗한 플라스틱 용기 (샴푸통, 배달용기 세척완료)
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  기름기와 음식물 얼룩 없이 물로 깨끗하게 씻은 용기
                </div>
              </button>

              <button
                onClick={() => handleStep2('clean_paper')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  깨끗한 택배 상자 / 신문지 / 서류 종이
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  물에 젖지 않고 기름이 묻지 않은 순수 종이
                </div>
              </button>

              <button
                onClick={() => handleStep2('dirty')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  빨간 고추기름 / 음식물이 지워지지 않는 용기/박스
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  기름 묻은 피자박스, 빨갛게 물든 컵라면 용기 등
                </div>
              </button>
            </div>
          )}

          {wasteType === 'special' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleStep2('battery')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  보조배터리 / 일반 건전지 / 충전지
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  충격 시 스파크 및 폭발 위험이 있는 배터리 제품
                </div>
              </button>

              <button
                onClick={() => handleStep2('medicine')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  유통기한 지난 알약 / 물약 / 연고
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  하수구에 버리면 안 되는 폐의약품
                </div>
              </button>

              <button
                onClick={() => handleStep2('broken_glass')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  깨진 유리 / 거울 / 도자기 그릇
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  재활용 유리병과 성분이 다른 위험 파편
                </div>
              </button>

              <button
                onClick={() => handleStep2('appliance')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-left transition-all group"
              >
                <div className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                  형광등 / 소형 가전 (드라이기, 선풍기 등)
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  전용 수거함이나 무상 수거 지원 품목
                </div>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Result Card */}
      {step === 3 && result && (
        <div className="space-y-5 animate-fade-in">
          <div className="p-6 rounded-3xl bg-linear-to-br from-emerald-50/90 to-sky-50/60 border border-emerald-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              진단 완료! 이렇게 배출하세요
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-3">
              <h4 className="text-xl font-extrabold text-slate-900">
                {result.title}
              </h4>
              <div className={`inline-flex px-4 py-1.5 rounded-2xl font-bold text-sm border ${result.targetColor}`}>
                {result.target}
              </div>
            </div>

            <p className="text-sm text-slate-700 font-medium leading-relaxed mt-2">
              {result.explanation}
            </p>

            <div className="mt-4 pt-4 border-t border-emerald-200/60 space-y-2">
              <div className="text-xs font-bold text-slate-700">
                핵심 체크포인트:
              </div>
              {result.ruleList.map((r, i) => (
                <div key={i} className="text-xs text-slate-600 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              다른 쓰레기도 진단해보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
