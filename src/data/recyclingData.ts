export interface MascotInfo {
  id: string;
  name: string;
  role: string;
  greeting: string;
  color: string;
  bgColor: string;
  accentColor: string;
  borderColor: string;
  description: string;
}

export interface WasteCategory {
  id: string;
  name: string;
  badge: string;
  icon: string;
  summary: string;
  mascot: MascotInfo;
  color: {
    bg: string;
    light: string;
    text: string;
    border: string;
    gradient: string;
  };
  principles: string[];
  recyclableExamples: string[];
  nonRecyclableExamples: string[];
  proTips: string[];
}

export interface WasteItem {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  disposalTarget: string;
  targetBadgeColor: string;
  difficulty: '쉬움' | '보통' | '주의';
  isTricky: boolean;
  quickGuide: string;
  steps: string[];
  reason: string;
  warning?: string;
  tip?: string;
  relatedCategory: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  item: string;
  options: {
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  characterHint: string;
  funFact: string;
}

export const MASCOTS: Record<string, MascotInfo> = {
  chorok: {
    id: 'chorok',
    name: '새롬이',
    role: '분리배출 총괄 요정',
    greeting: '지구를 깨끗하게 만드는 작은 실천, 제가 쉽게 알려드릴게요!',
    color: '#10b981',
    bgColor: '#ecfdf5',
    accentColor: '#059669',
    borderColor: '#a7f3d0',
    description: '작은 새싹 모자를 쓰고 있는 상냥하고 똑똑한 분리수거 대장 요정',
  },
  peti: {
    id: 'peti',
    name: '페티',
    role: '투명페트 & 플라스틱 요정',
    greeting: '라벨 떼고 퐁퐁 씻어서 꼬옥 밟아주면 최고예요!',
    color: '#0284c7',
    bgColor: '#f0f9ff',
    accentColor: '#0369a1',
    borderColor: '#bae6fd',
    description: '투명하고 반짝이는 물방울 날개를 가진 페트병 수호 요정',
  },
  jongi: {
    id: 'jongi',
    name: '종이별',
    role: '종이 & 종이팩 요정',
    greeting: '테이프는 떼고, 우유팩은 씻어서 쫙 펼쳐주세요!',
    color: '#d97706',
    bgColor: '#fffbeb',
    accentColor: '#b45309',
    borderColor: '#fde68a',
    description: '접힌 귀여운 모서리와 종이비행기를 탄 학구파 요정',
  },
  candi: {
    id: 'candi',
    name: '캔디',
    role: '캔 & 고철 요정',
    greeting: '부탄가스는 꼭 콕 구멍 뚫어 배출! 찌그러뜨리면 부피가 쏙!',
    color: '#7c3aed',
    bgColor: '#faf5ff',
    accentColor: '#6d28d9',
    borderColor: '#ddd6fe',
    description: '반짝반짝 은빛 왕관을 쓰고 안전을 지키는 씩씩한 요정',
  },
  bini: {
    id: 'bini',
    name: '비니',
    role: '비닐 & 필름 요정',
    greeting: '음식물 묻은 비닐은 씻고, 안 지워지면 일반쓰레기로 보내줘요!',
    color: '#0d9488',
    bgColor: '#f0fdfa',
    accentColor: '#0f766e',
    borderColor: '#99f6e4',
    description: '바람에 살랑살랑 떠다니는 솜사탕 같은 비닐 요정',
  },
  glassy: {
    id: 'glassy',
    name: '유리링',
    role: '유리병 요정',
    greeting: '깨진 유리는 신문지에 싸서 종량제! 빈병 보증금도 꼭 챙겨요!',
    color: '#059669',
    bgColor: '#f0fdf4',
    accentColor: '#047857',
    borderColor: '#bbf7d0',
    description: '안전안경을 쓰고 조심조심 다니는 맑고 투명한 요정',
  },
  yamyam: {
    id: 'yamyam',
    name: '얌얌이',
    role: '음식물 판별 탐정',
    greeting: '핵심은 하나! "동물이 먹을 수 있는 사료가 될까?" 생각해보세요!',
    color: '#ea580c',
    bgColor: '#fff7ed',
    accentColor: '#c2410c',
    borderColor: '#fed7aa',
    description: '돋보기를 들고 일반쓰레기와 음식물을 날카롭게 가려내는 탐정 요정',
  },
  special: {
    id: 'special',
    name: '특공이',
    role: '유해 & 특수폐기물 수호신',
    greeting: '배터리는 화재 위험! 전용수거함에 안전하게 쏙 넣어주세요!',
    color: '#e11d48',
    bgColor: '#fff1f2',
    accentColor: '#be123c',
    borderColor: '#fecdd3',
    description: '안전모를 쓰고 환경오염을 철통 방어하는 든든한 가디언 요정',
  },
};

export const RECYCLING_CATEGORIES: WasteCategory[] = [
  {
    id: 'clear-pet',
    name: '투명 페트병',
    badge: '별도 분리배출 의무화',
    icon: 'Sparkles',
    summary: '음료·생수용 무색투명 페트병은 고품질 재생원료가 되므로 일반 플라스틱과 반드시 따로 모아요!',
    mascot: MASCOTS.peti,
    color: {
      bg: 'bg-sky-50',
      light: '#f0f9ff',
      text: 'text-sky-800',
      border: 'border-sky-200',
      gradient: 'from-sky-400 to-blue-500',
    },
    principles: [
      '내용물을 물로 깨끗이 비우고 헹구기',
      '비닐 라벨은 절취선을 뜯어 비닐류로 따로 버리기',
      '발로 밟아 납작하게 압착하기',
      '뚜껑을 닫아서 투명 페트병 전용 수거함에 배출하기 (뚜껑 재질이 달라도 선별장에서 쉽게 분리됩니다)',
    ],
    recyclableExamples: [
      '생수 투명 페트병',
      '투명 탄산음료 / 이온음료 페트병',
      '투명 주스 페트병 (내용물 씻은 것)',
    ],
    nonRecyclableExamples: [
      '유색 페트병 (초록 사이다병, 갈색 맥주병 등 -> 일반 플라스틱)',
      '불투명한 막걸리병, 우유병 (일반 플라스틱)',
      '간장병, 양념통 (색상이 있거나 기름기가 안 빠지면 일반 플라스틱 또는 종량제)',
      '일회용 테이크아웃 플라스틱 컵 (인쇄 및 재질 차이로 일반 플라스틱)',
    ],
    proTips: [
      '뚜껑 고리(링)는 손으로 억지로 뜯지 않아도 괜찮아요. 선별장 비중 분리 공정에서 자동으로 걸러집니다.',
      '라벨이 붙은 채로 버리면 재활용 등급이 낮아져 옷이나 가방을 만드는 고품질 섬유로 쓰이지 못해요!',
    ],
  },
  {
    id: 'plastic',
    name: '일반 플라스틱류',
    badge: 'PP / PE / PS / OTHER',
    icon: 'Box',
    summary: '단단한 플라스틱 용기들! 다른 재질(스티커, 스프링)을 제거하고 깨끗이 씻어 배출해요.',
    mascot: MASCOTS.peti,
    color: {
      bg: 'bg-teal-50',
      light: '#f0fdfa',
      text: 'text-teal-800',
      border: 'border-teal-200',
      gradient: 'from-teal-400 to-emerald-500',
    },
    principles: [
      '음식물이나 이물질을 물로 깨끗이 씻어내기',
      '부착 상표, 스티커, 테이프 등 다른 재질은 제거하기',
      '펌프 용기는 분해하여 금속 스프링이 든 펌프는 일반쓰레기로 분리',
    ],
    recyclableExamples: [
      '샴푸통, 린스통, 바디워시통 (본체)',
      '세제통, 섬유유연제 용기',
      '배달음식 플라스틱 용기 (기름때/양념을 깨끗이 씻어낸 것)',
      '플라스틱 밀폐용기 (고무 패킹 분리)',
      '유색 페트병 (갈색 맥주병, 초록색 사이다병)',
    ],
    nonRecyclableExamples: [
      '칫솔 (모와 손잡이 복합 재질 -> 일반쓰레기)',
      '볼펜, 샤프 등 문구류 (복합 재질 -> 일반쓰레기)',
      '고무장갑, 슬리퍼 (고무/EVA 소재 -> 일반쓰레기)',
      '빨간 고추기름이 씻기지 않은 배달용기 (오염품 -> 일반쓰레기)',
      '알약 포장재 (비닐+알루미늄 복합재질 -> 일반쓰레기)',
      'CD/DVD, 카세트테이프 (일반쓰레기)',
    ],
    proTips: [
      '배달용기에 붉은 고추기름이 뱄을 때는 주방세제와 따뜻한 물로 씻은 뒤 햇빛에 반나절 말리면 고추색소가 분해되어 하얗게 변해요!',
    ],
  },
  {
    id: 'paper',
    name: '종이류 & 종이팩',
    badge: '종이와 종이팩은 별도!',
    icon: 'FileText',
    summary: '택배박스는 테이프를 떼고 접어서! 우유팩·주스팩은 일반 종이가 아니니 전용함에 모아요.',
    mascot: MASCOTS.jongi,
    color: {
      bg: 'bg-amber-50',
      light: '#fffbeb',
      text: 'text-amber-800',
      border: 'border-amber-200',
      gradient: 'from-amber-400 to-orange-400',
    },
    principles: [
      '택배 상자의 테이프, 운송장 스티커, 철핀 완벽히 제거하기',
      '종이 상자는 납작하게 펼쳐서 묶어 배출하기',
      '우유팩, 두유팩(종이팩)은 안을 헹구고 펼쳐서 말린 뒤 일반 종이와 섞지 않기',
    ],
    recyclableExamples: [
      '택배 박스, 골판지 상자 (테이프/송장 뗀 것)',
      '신문지, 잡지, 책 (비닐 코팅 표지 및 스프링 제거)',
      '복사지, 이면지, 서류 종이',
      '우유팩, 주스팩 (종이팩 전용 수거함 배출)',
    ],
    nonRecyclableExamples: [
      '영수증 (감열지 화학약품 코팅 -> 일반쓰레기)',
      '기름 묻은 피자 박스 바닥 (기름 오염 -> 일반쓰레기)',
      '종이컵 (내부 폴리에틸렌 방수 코팅, 씻은 종이컵 전용함 없으면 종량제)',
      '스티커, 테이프, 포스트잇 (접착제 부착 -> 일반쓰레기)',
      '금은박 코팅지, 비닐 코팅된 화려한 쇼핑백 (일반쓰레기)',
      '벽지, 부직포, 오염된 종이기저귀 (일반쓰레기)',
    ],
    proTips: [
      '종이팩(우유팩, 두유팩)은 천연 고급 펄프로 만들어져 최고급 화장지가 됩니다. 주민센터에 일정 수량을 모아가면 종량제 봉투나 롤휴지로 교환해 주는 지자체가 많아요!',
    ],
  },
  {
    id: 'vinyl',
    name: '비닐류 (필름포장재)',
    badge: '깨끗하면 모두 재활용',
    icon: 'Layers',
    summary: '과자봉지, 라면봉지, 뽁뽁이(에어캡)! 음식물과 이물질만 없다면 흩날리지 않게 모아 배출해요.',
    mascot: MASCOTS.bini,
    color: {
      bg: 'bg-emerald-50',
      light: '#f0fdf4',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      gradient: 'from-emerald-400 to-teal-500',
    },
    principles: [
      '내용물을 비우고 오염 물질을 물로 헹구기',
      '투명 비닐봉투 안에 차곡차곡 모아 담아서 묶기',
      '딱지 모양으로 접지 말고 넓게 펴서 배출하기 (선별장 바람 선별 시 인식이 안 돼요)',
    ],
    recyclableExamples: [
      '라면 봉지, 과자 봉지 (은박 코팅된 봉지도 비닐류!)',
      '택배 완충재 뽁뽁이 (에어캡)',
      '마트 비닐봉지, 위생팩, 지퍼백 (깨끗한 것)',
      '빵 봉지, 세탁소 비닐 커버',
    ],
    nonRecyclableExamples: [
      '양념이나 기름기가 지워지지 않는 비닐 (일반쓰레기)',
      '테이프가 덕지덕지 붙어 떼어지지 않는 비닐 (일반쓰레기)',
      '음식물이 묻은 배달 랩 (일반쓰레기)',
      '고무장갑, 은박 보온 돗자리 (일반쓰레기)',
    ],
    proTips: [
      '비닐을 딱지로 작게 접어서 버리면 선별장에서 쓰레기로 분류되거나 기계에 끼어버려요. 차곡차곡 펴서 큰 투명비닐봉투에 모아 담아주세요!',
    ],
  },
  {
    id: 'can-metal',
    name: '캔류 & 고철류',
    badge: '재활용 가치 최고!',
    icon: 'Shield',
    summary: '철캔, 알루미늄캔, 냄비, 프라이팬! 재활용률이 매우 높아요. 가스류 캔은 구멍 뚫기 필수!',
    mascot: MASCOTS.candi,
    color: {
      bg: 'bg-purple-50',
      light: '#faf5ff',
      text: 'text-purple-800',
      border: 'border-purple-200',
      gradient: 'from-purple-400 to-indigo-500',
    },
    principles: [
      '음료, 통조림 캔 속 내용물 깨끗이 씻어내기',
      '플라스틱 뚜껑(예: 스팸 뚜껑, 참치캔 플라스틱 캡)은 분리하기',
      '부탄가스나 살충제 캔은 환기 잘 되는 실외에서 바닥에 구멍 뚫어 잔여가스 배출 후 버리기',
      '부피를 줄이기 위해 발로 밟아 납작하게 만들기',
    ],
    recyclableExamples: [
      '음료수 캔, 맥주 캔 (철/알루미늄)',
      '참치캔, 골뱅이캔, 옥수수 통조림 캔',
      '가스 뺀 부탄가스, 헤어스프레이 캔, 살충제 캔',
      '못, 철사, 냄비, 프라이팬, 주전자 (고철류)',
    ],
    nonRecyclableExamples: [
      '페인트통, 엔진오일통 등 유해물질 묻은 통 (특수 규격 폐기물)',
      '우산 (뼈대는 고철, 천/비닐은 일반쓰레기 또는 비닐 분리)',
      '알약 포장재 PTP 은박 (일반쓰레기)',
    ],
    proTips: [
      '부탄가스를 그냥 버리면 쓰레기 수거차 압착 과정에서 폭발 및 대형 화재 사고가 발생해요! 통풍이 잘 되는 야외에서 뾰족한 도구나 전용 가스제거기로 꼭 구멍을 뚫어주세요.',
    ],
  },
  {
    id: 'glass',
    name: '유리병류',
    badge: '깨진 유리는 재활용 불가',
    icon: 'Wine',
    summary: '음료수병, 와인병, 잼병! 깨끗이 씻어서 배출하고 빈용기보증금 대상 병은 마트에 환급받아요.',
    mascot: MASCOTS.glassy,
    color: {
      bg: 'bg-emerald-50',
      light: '#f0fdf4',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      gradient: 'from-emerald-400 to-teal-600',
    },
    principles: [
      '병 속 담배꽁초나 이물질을 절대 넣지 말고 물로 헹구기',
      '병뚜껑이 금속이나 플라스틱이면 분리해서 배출하기',
      '깨지지 않은 온전한 상태로 배출하기',
    ],
    recyclableExamples: [
      '맥주병, 소주병, 청량음료병 (빈용기 보증금 환급 가능)',
      '와인병, 위스키병, 주스병',
      '유리 잼병, 유리 소스병 (내용물 세척 필수)',
    ],
    nonRecyclableExamples: [
      '깨진 유리병 (위험하므로 신문지에 두껍게 싸서 종량제 봉투)',
      '거울, 전구, 형광등 (일반 유리병과 융점이 달라 재활용 불가)',
      '도자기, 사기그릇, 뚝배기 (불연성 특수 마대)',
      '내열 식기 (락앤락 내열유리, 글라스락 등은 일반유리와 녹는점이 달라 재활용 불가 -> 불연성 마대 or 종량제)',
      '크리스탈 유리잔, 어항, 창문 유리 (불연성 마대)',
    ],
    proTips: [
      '소주병(100원), 맥주병(130원) 라벨에 보증금 환급 표시가 있는 병은 대형마트나 편의점에 가져가면 현금으로 돌려받을 수 있어요!',
    ],
  },
  {
    id: 'food-vs-general',
    name: '음식물 vs 일반쓰레기',
    badge: '가장 많이 헷갈리는 분류!',
    icon: 'UtensilsCrossed',
    summary: '동물이 먹을 수 있는 사료나 퇴비가 될 수 있는지만 생각하면 쉬워요!',
    mascot: MASCOTS.yamyam,
    color: {
      bg: 'bg-orange-50',
      light: '#fff7ed',
      text: 'text-orange-800',
      border: 'border-orange-200',
      gradient: 'from-orange-400 to-rose-500',
    },
    principles: [
      '수분은 최대한 꽉 짜서 배출하기',
      '이물질(이쑤시개, 비닐, 플라스틱 포크 등) 철저히 제거하기',
      '딱딱한 껍질, 뼈, 뿌리, 찌꺼기는 무조건 일반쓰레기(종량제)로!',
    ],
    recyclableExamples: [
      '사과, 배, 바나나, 귤, 수박 등 부드러운 과일 껍질 (음식물)',
      '채소 자투리 (흙이나 질긴 껍질이 아닌 순수 채소 (음식물))',
      '상한 찌개 건더기 (국물은 하수구로 따라내고 건더기만 헹궈서 음식물)',
      '남은 밥, 면, 부드러운 빵 (음식물)',
    ],
    nonRecyclableExamples: [
      '소, 돼지, 닭 등 동물 뼈 및 생선 뼈 (일반쓰레기)',
      '조개, 굴, 전복, 소라, 꽃게 등 어패류·갑각류 껍데기 (일반쓰레기)',
      '달걀, 오리알, 메추리알 껍데기 (일반쓰레기)',
      '양파 껍질, 마늘 껍질, 옥수수 수염/껍질 (일반쓰레기 - 질긴 섬유질)',
      '파뿌리, 미나리뿌리 등 채소 뿌리 (일반쓰레기)',
      '호두, 밤, 땅콩 등 견과류 껍데기 & 복숭아/살구/감 등 딱딱한 씨앗 (일반쓰레기)',
      '고추장, 된장, 쌈장 등 염분이 매우 높은 장류 (일반쓰레기)',
      '녹차, 홍차 티백, 커피 찌꺼기, 한약재 찌꺼기 (일반쓰레기)',
    ],
    proTips: [
      '음식물 쓰레기 처리장에서는 기계로 분쇄 후 가축 사료나 퇴비를 만듭니다. 딱딱한 뼈나 껍데기는 기계를 고장 내고, 염분이 높은 장류는 동물이 먹을 수 없기 때문에 일반쓰레기로 분류돼요!',
    ],
  },
  {
    id: 'special-waste',
    name: '특수 & 유해 폐기물',
    badge: '환경과 안전을 위한 전용 배출',
    icon: 'AlertTriangle',
    summary: '건전지, 형광등, 보조배터리, 약품! 무심코 일반쓰레기에 버리면 큰 화재나 환경오염이 발생해요.',
    mascot: MASCOTS.special,
    color: {
      bg: 'bg-rose-50',
      light: '#fff1f2',
      text: 'text-rose-800',
      border: 'border-rose-200',
      gradient: 'from-rose-400 to-red-600',
    },
    principles: [
      '종량제 봉투에 절대 혼합 배출하지 않기',
      '전용 수거함 위치 확인 후 배출 (아파트 단지, 동 주민센터, 대형마트)',
      '폐의약품은 약국이나 보건소, 주민센터 수거함에 반납하기',
    ],
    recyclableExamples: [
      '폐건전지, 충전식 배터리, 스마트폰 배터리 -> 폐건전지 전용함',
      '폐형광등, 삼파장 램프 (깨지지 않게) -> 폐형광등 전용함',
      '폐의약품, 알약, 물약, 시럽 -> 약국/보건소/주민센터 폐의약품함',
      '아이스팩 (젤 형태) -> 전용수거함 or 종량제 봉투',
      '소형 가전제품 (전자레인지, 드라이기 등 5개 이상 무상방문수거 또는 주민센터 전용함)',
    ],
    nonRecyclableExamples: [
      'LED 조명 (형광물질이 없으므로 대부분 재활용 불가 -> 종량제 또는 지자체 기준)',
      '깨진 형광등 (수은 유출 주의! 신문지 싸서 종량제 배출)',
      '변기에 약 버리기 (생태계 파괴 호르몬 교란 교란 유발 -> 절대 금지!)',
    ],
    proTips: [
      '리튬 보조배터리를 쓰레기봉투에 버리면 수거차에서 압착될 때 스파크가 튀어 화재가 발생합니다. 꼭 건전지 수거함에 넣어주세요!',
    ],
  },
];

export const WASTE_ITEMS: WasteItem[] = [
  {
    id: 'w-1',
    name: '치킨 뼈 / 족발 뼈 / 갈비 뼈',
    aliases: ['닭뼈', '치킨뼈', '돼지뼈', '소뼈', '뼈다귀', '사골뼈', '생선가시'],
    category: '음식물 vs 일반쓰레기',
    disposalTarget: '종량제 일반쓰레기',
    targetBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '뼈에 붙은 살코기는 최대한 떼어내고, 뼈 자체는 일반쓰레기 종량제 봉투에 버려주세요.',
    steps: [
      '뼈에 붙어있는 부드러운 살점은 음식물 쓰레기로 분리',
      '단단한 뼈는 종량제 일반쓰레기 봉투에 담아 배출',
    ],
    reason: '사료 분쇄기를 고장 내고 가축이 소화할 수 없기 때문에 음식물 쓰레기가 아닌 일반쓰레기입니다.',
    warning: '음식물 봉투에 뼈를 넣으면 수거 거부 및 과태료 대상이 될 수 있습니다.',
    tip: '생선 뼈 역시 가시가 억세므로 일반쓰레기로 버리는 것이 안전합니다.',
    relatedCategory: 'food-vs-general',
  },
  {
    id: 'w-2',
    name: '달걀 / 메추리알 껍데기',
    aliases: ['계란껍질', '달걀껍질', '계란껍데기', '알껍질', '오리알껍데기'],
    category: '음식물 vs 일반쓰레기',
    disposalTarget: '종량제 일반쓰레기',
    targetBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '달걀 껍데기는 석회질 성분이라 동물의 사료로 쓸 수 없어요. 종량제 봉투로 쏙!',
    steps: [
      '달걀 껍데기 안에 남은 내용물 확인',
      '종량제 일반쓰레기 봉투에 버리기',
    ],
    reason: '석회질로 이루어져 영양가 있는 퇴비나 사료가 되지 못합니다.',
    tip: '조개 껍데기, 굴 껍데기, 게 껍데기 같은 갑각류 껍질도 모두 일반쓰레기입니다.',
    relatedCategory: 'food-vs-general',
  },
  {
    id: 'w-3',
    name: '기름 묻은 피자 박스 / 치킨 박스',
    aliases: ['피자박스', '치킨박스', '기름종이', '배달박스'],
    category: '종이류',
    disposalTarget: '오염 부위는 일반쓰레기 / 깨끗한 뚜껑은 종이류',
    targetBadgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '기름과 양념이 듬뿍 밴 박스 바닥은 종량제! 기름 안 묻은 깨끗한 뚜껑만 찢어서 종이로 배출해요.',
    steps: [
      '피자 고정 핀(삼발이)은 플라스틱으로 분리',
      '기름이나 음식물이 묻은 종이 박스 밑판은 찢어서 일반쓰레기',
      '기름이 전혀 묻지 않은 깨끗한 뚜껑 부위만 종이류로 배출',
    ],
    reason: '종이 재생 공정에서 물에 풀 때 기름 성분이 섞이면 재생종이 전체를 망치게 됩니다.',
    warning: '통째로 종이 분리수거함에 넣으면 오염 물질로 폐기 처분됩니다.',
    relatedCategory: 'paper',
  },
  {
    id: 'w-4',
    name: '빨간 양념 밴 컵라면 용기',
    aliases: ['라면용기', '컵라면', '사발면', '스티로폼용기'],
    category: '플라스틱/스티로폼 vs 일반',
    disposalTarget: '씻어도 빨간색이 남으면 일반쓰레기',
    targetBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '물로 씻어도 붉은 국물 자국이 남아있다면 재활용이 되지 않으니 종량제로 버려주세요.',
    steps: [
      '국물과 면 찌꺼기를 깨끗이 비우고 헹구기',
      '햇빛에 반나절 말려 붉은색이 사라지고 하얗게 되면 스티로폼/플라스틱 배출 가능',
      '붉은 얼룩이 빠지지 않으면 일반쓰레기(종량제) 봉투에 배출',
    ],
    reason: '고추기름의 붉은 색소와 유분이 플라스틱 재질 속에 침투하여 재활용 순도를 떨어뜨립니다.',
    tip: '주방세제 한 방울 묻힌 물로 헹군 뒤 베란다 창가 햇빛에 두면 자외선에 카로티노이드 색소가 분해돼요!',
    relatedCategory: 'styrofoam',
  },
  {
    id: 'w-5',
    name: '투명 생수병 / 음료 페트병',
    aliases: ['생수병', '페트병', '음료수병', '투명페트', '플라스틱물병'],
    category: '투명 페트병',
    disposalTarget: '투명 페트병 전용 수거함',
    targetBadgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    difficulty: '쉬움',
    isTricky: true,
    quickGuide: '내용물 비우고 헹군 뒤, 비닐 라벨을 뜯고 밟아서 뚜껑 닫고 전용함에 쏙!',
    steps: [
      '물로 안쪽을 깨끗하게 헹구기',
      '겉면에 붙은 비닐 라벨을 점선 따라 뜯어서 비닐류로 분리',
      '발로 밟아서 납작하게 압착하기',
      '뚜껑을 닫아서 투명 페트병 전용 수거함에 배출',
    ],
    reason: '투명 페트병은 고품질 장섬유로 가공되어 기능성 옷, 가방, 신발의 재생 원사로 활용됩니다.',
    warning: '색깔이 있는 페트병(초록색 맥주병, 갈색 막걸리병 등)은 일반 플라스틱에 버려야 합니다.',
    relatedCategory: 'clear-pet',
  },
  {
    id: 'w-6',
    name: '샴푸통 / 린스통 / 폼클렌징 펌프',
    aliases: ['샴푸펌프', '디스펜서', '펌프헤드', '물비누펌프', '로션통'],
    category: '플라스틱류',
    disposalTarget: '본체는 플라스틱 / 펌프는 일반쓰레기',
    targetBadgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '누르는 펌프 뚜껑 속에는 작은 쇠 스프링이 숨어있어요! 펌프는 일반쓰레기, 몸체는 플라스틱!',
    steps: [
      '샴푸통 본체 속 비눗기를 깨끗이 물로 헹구기',
      '누르는 펌프 헤드를 돌려 분리하기',
      '펌프 헤드 내부 스프링 분리가 어려우므로 펌프는 일반쓰레기 종량제 봉투로 배출',
      '깨끗한 플라스틱 본체만 플라스틱류로 배출',
    ],
    reason: '펌프 헤드는 플라스틱과 금속 스프링, 고무 패킹이 융합된 복합소재라 재활용이 불가합니다.',
    relatedCategory: 'plastic',
  },
  {
    id: 'w-7',
    name: '우유팩 / 멸균 두유팩 (종이팩)',
    aliases: ['우유팩', '두유팩', '쥬스팩', '테트라팩', '살균팩', '멸균팩'],
    category: '종이팩류',
    disposalTarget: '종이팩 전용 수거함 (일반 종이와 분리)',
    targetBadgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    difficulty: '보통',
    isTricky: true,
    quickGuide: '물로 헹군 뒤 가위로 잘라 펼쳐 말려요. 일반 종이박스와 섞으면 안 되고 전용함에 모아야 해요.',
    steps: [
      '우유나 주스를 다 마신 뒤 물로 깨끗하게 헹구기',
      '가위나 칼로 모서리를 잘라 활짝 펼치기',
      '햇볕이나 건조대에 바짝 말리기',
      '종이팩 전용 수거함에 배출 (주민센터 휴지 교환 사업 활용 추천)',
    ],
    reason: '종이팩은 양면에 폴리에틸렌 방수 코팅이 되어 있어 일반 종이류와 녹는 속도가 달라 섞이면 재활용이 안 됩니다.',
    tip: '우유팩을 차곡차곡 모아 가까운 주민센터(동사무소)에 가져가면 종량제 봉투나 롤휴지로 교환해 줍니다!',
    relatedCategory: 'paper',
  },
  {
    id: 'w-8',
    name: '양파 껍질 / 마늘 껍질 / 대파 뿌리',
    aliases: ['양파껍질', '마늘껍질', '파뿌리', '생강껍질', '옥수수껍질'],
    category: '음식물 vs 일반쓰레기',
    disposalTarget: '종량제 일반쓰레기',
    targetBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '채소지만 영양분이 없고 질긴 섬유질이라 분쇄되지 않아요. 종량제 봉투로 버려주세요.',
    steps: [
      '흙이나 이물질을 털어내기',
      '일반쓰레기(종량제) 봉투에 담아 배출',
    ],
    reason: '질긴 섬유질은 동물 사료 기계에 엉켜 고장을 내고 동물이 소화하지 못합니다.',
    relatedCategory: 'food-vs-general',
  },
  {
    id: 'w-9',
    name: '젤 아이스팩 (고흡수성 수지)',
    aliases: ['아이스팩', '보냉팩', '젤아이스팩', '냉매제'],
    category: '특수 폐기물',
    disposalTarget: '뜯지 말고 종량제 봉투 (또는 주민센터 전용수거함)',
    targetBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '절대 뜯어서 싱크대에 버리지 마세요! 통째로 종량제 봉투에 넣거나 지자체 전용수거함에 넣어요.',
    steps: [
      '아이스팩 겉면의 내용물 표기 확인 (물 vs 고흡수성 폴리머)',
      '100% 물인 경우: 가위로 잘라 물은 싱크대에 버리고 겉비닐은 비닐류 배출',
      '젤 형태인 경우: 뜯지 말고 겉봉투째 종량제 일반쓰레기 배출 (아파트/주민센터 전용수거함 있으면 재사용 배출)',
    ],
    reason: '젤 타입 고흡수성 폴리머는 미세 플라스틱으로, 싱크대나 변기에 버리면 하수관을 막고 해양 생태계를 오염시킵니다.',
    warning: '변기나 세면대에 젤을 부으면 부풀어 올라 배관 역류의 원인이 됩니다.',
    relatedCategory: 'special-waste',
  },
  {
    id: 'w-10',
    name: '보조배터리 / 리튬 배터리 / 충전지',
    aliases: ['보조배터리', '휴대폰배터리', '충전식배터리', '리튬이온', '알카라인건전지'],
    category: '특수 폐기물',
    disposalTarget: '폐건전지 전용 수거함',
    targetBadgeColor: 'bg-red-100 text-red-800 border-red-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '일반쓰레기에 버리면 압착 시 폭발·화재 위험! 아파트나 동주민센터 폐건전지함에 쏙 넣어요.',
    steps: [
      '손상되거나 부풀어 오른 곳이 없는지 확인',
      '동 주민센터, 편의점, 아파트 분리수거장의 폐건전지 전용 수거함에 배출',
    ],
    reason: '쓰레기 수거차 압착기나 소각로에서 충격을 받으면 강력한 스파크와 폭발 화재를 일으킵니다.',
    warning: '종량제 봉투에 절대 혼합 배출하지 마세요.',
    relatedCategory: 'special-waste',
  },
  {
    id: 'w-11',
    name: '택배 완충재 뽁뽁이 (에어캡)',
    aliases: ['뽁뽁이', '에어캡', '버블랩', '포장뽁뽁이'],
    category: '비닐류',
    disposalTarget: '비닐류 분리배출',
    targetBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    difficulty: '쉬움',
    isTricky: false,
    quickGuide: '바람을 빼지 않아도 비닐류로 분리배출할 수 있어요! 테이프만 떼어내주세요.',
    steps: [
      '에어캡에 붙어있는 박스테이프나 송장 스티커 떼어내기',
      '비닐류 분리수거함에 넣기',
    ],
    reason: '단일 LDPE 비닐 소재로 우수한 비닐 재활용 자원입니다.',
    relatedCategory: 'vinyl',
  },
  {
    id: 'w-12',
    name: '유통기한 지난 약 / 영양제 / 물약',
    aliases: ['감기약', '폐의약품', '알약', '항생제', '시럽약', '연고'],
    category: '특수 폐기물',
    disposalTarget: '약국 / 보건소 / 주민센터 폐의약품 수거함',
    targetBadgeColor: 'bg-red-100 text-red-800 border-red-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '변기나 세면대에 버리면 수질 오염! 포장재를 제거하고 알약만 모아 약국이나 주민센터에 반납해요.',
    steps: [
      '알약은 PTP 포장재를 뜯어 알약끼리 비닐봉지에 모으기',
      '가루약은 뜯지 말고 봉지째 모으기',
      '물약/시럽은 한 병에 모으거나 밀봉',
      '약국, 보건소, 주민센터에 비치된 폐의약품 전용 수거함에 배출',
    ],
    reason: '하수구에 버리면 정수 시설에서 걸러지지 않고 하천과 생태계로 흘러가 슈퍼박테리아와 호르몬 교란을 초래합니다.',
    relatedCategory: 'special-waste',
  },
  {
    id: 'w-13',
    name: '깨진 유리그릇 / 깨진 거울 / 도자기',
    aliases: ['깨진유리', '거울', '도자기', '화분', '사기그릇', '머그컵'],
    category: '유리병 vs 불연성마대',
    disposalTarget: '소량: 신문지 싸서 종량제 / 대량: 불연성 특수 규격 마대',
    targetBadgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '일반 유리병 수거함에 넣으면 절대 안 돼요! 신문지에 두껍게 싸서 종량제 봉투에 넣고 표시해요.',
    steps: [
      '깨진 파편을 신문지나 두꺼운 종이로 여러 겹 감싸기',
      '테이프로 단단히 밀봉 후 매직으로 "깨진 유리 주의" 표시',
      '적은 양은 종량제 봉투 안쪽에 넣고, 양이 많으면 철물점/주민센터의 불연성 마대(특수마대) 구입 배출',
    ],
    reason: '일반 유리병과 녹는 온도가 달라 재활용 공정에서 섞이면 전체를 망치며, 환경미화원의 손을 크게 다치게 합니다.',
    warning: '재활용 유리병 분리함에 절대 넣지 마세요!',
    relatedCategory: 'glass',
  },
  {
    id: 'w-14',
    name: '영수증 / 주차권 / 복권',
    aliases: ['영수증', '주차권', '복권', '순번대기표', '감열지'],
    category: '종이류 vs 일반쓰레기',
    disposalTarget: '종량제 일반쓰레기',
    targetBadgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    difficulty: '보통',
    isTricky: true,
    quickGuide: '영수증은 열에 반응하는 화학약품(감열지)이 코팅되어 있어 종이 재활용이 안 돼요.',
    steps: [
      '개인정보가 적힌 경우 찢어서 일반쓰레기(종량제) 봉투에 배출',
    ],
    reason: '표면에 염료와 현색제 등 화학물질이 코팅되어 있어 종이 펄프로 재가공할 수 없습니다.',
    relatedCategory: 'paper',
  },
  {
    id: 'w-15',
    name: '물티슈 / 사용한 휴지 / 키친타월',
    aliases: ['물티슈', '휴지', '화장지', '키친타월', '각티슈'],
    category: '일반쓰레기',
    disposalTarget: '종량제 일반쓰레기',
    targetBadgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    difficulty: '쉬움',
    isTricky: false,
    quickGuide: '물티슈는 종이가 아니라 플라스틱(폴리에스터) 섬유예요! 모두 종량제 봉투로 버려주세요.',
    steps: [
      '일반쓰레기(종량제) 봉투에 담아 배출',
    ],
    reason: '물티슈는 플라스틱 합성수지로 물에 녹지 않으며 변기를 막히게 합니다. 휴지도 오염 및 섬유질 손상으로 재활용 불가.',
    warning: '물티슈를 변기에 넣으면 배관 막힘 및 정수장 펌프 고장의 주원인이 됩니다.',
    relatedCategory: 'plastic',
  },
  {
    id: 'w-16',
    name: '통조림 캔 / 스팸 캔 / 음료수 캔',
    aliases: ['참치캔', '스팸캔', '통조림', '맥주캔', '콜라캔', '알루미늄캔'],
    category: '캔류 & 고철류',
    disposalTarget: '캔류 분리수거함',
    targetBadgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    difficulty: '쉬움',
    isTricky: false,
    quickGuide: '기름기와 찌꺼기를 물로 헹구고, 플라스틱 뚜껑은 따로 떼어내어 버려요.',
    steps: [
      '캔 안의 기름이나 국물을 물로 깨끗하게 세척',
      '스팸 캔 등의 노란 플라스틱 뚜껑은 분리하여 플라스틱류로 배출',
      '가능하면 발로 밟아 납작하게 압착',
      '캔류 수거함에 배출',
    ],
    reason: '알루미늄과 철은 100% 무한 재활용이 가능한 소중한 자원입니다.',
    relatedCategory: 'can-metal',
  },
  {
    id: 'w-17',
    name: '부탄가스 / 스프레이 살충제 캔',
    aliases: ['부탄가스', '모기약캔', '에어로졸', '헤어스프레이', '먼지제거제'],
    category: '캔류',
    disposalTarget: '구멍 뚫어 잔여가스 배출 후 캔류',
    targetBadgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '통풍 잘 되는 야외에서 가스를 완전히 빼고, 캔 바닥에 구멍을 뚫어 캔류에 버려요.',
    steps: [
      '통풍이 잘 되는 야외(베란다, 실외)로 이동',
      '노즐을 눌러 치- 소리가 안 날 때까지 가스 방출',
      '전용 가스 펀치나 못/송곳으로 캔 바닥 쪽에 구멍 1~2개 뚫기',
      '캔류 수거함에 안전하게 배출',
    ],
    reason: '가스가 남아있는 상태로 청소차에 실리면 압착 도중 마찰열로 폭발 화재 사고가 일어납니다.',
    warning: '밀폐된 실내에서 가스를 빼면 질식 및 인화 위험이 있으니 반드시 야외에서 작업하세요.',
    relatedCategory: 'can-metal',
  },
  {
    id: 'w-18',
    name: '일회용 테이크아웃 플라스틱 컵',
    aliases: ['아이스컵', '커피컵', '테이크아웃컵', '투명컵', '플라스틱컵'],
    category: '플라스틱류',
    disposalTarget: '일반 플라스틱류 (투명 페트병 전용함 X)',
    targetBadgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    difficulty: '보통',
    isTricky: true,
    quickGuide: '얼음과 음료를 비우고 헹군 뒤 일반 플라스틱에 버려요. 투명하지만 생수 페트병함에는 넣지 마세요!',
    steps: [
      '남은 얼음과 음료수를 싱크대에 비우기',
      '빨대는 일반쓰레기로 분리',
      '컵 겉면의 종이 홀더는 종이류로 분리',
      '물로 헹군 뒤 일반 플라스틱류로 배출',
    ],
    reason: '생수 페트병(PET)과 달리 인쇄 잉크 및 재질 배합이 달라 투명 페트병 전용 재활용 라인에 섞이면 안 됩니다.',
    tip: '빨대는 크기가 너무 작아 선별기 틈새로 빠지므로 플라스틱이 아닌 일반쓰레기입니다.',
    relatedCategory: 'plastic',
  },
  {
    id: 'w-19',
    name: '우산 (고장 난 우산)',
    aliases: ['비우산', '양산', '장우산', '접이식우산'],
    category: '복합 재질',
    disposalTarget: '분리 가능 시 천은 일반/뼈대는 고철 / 분리 불가 시 종량제',
    targetBadgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    difficulty: '보통',
    isTricky: true,
    quickGuide: '가위로 우산 천을 오려내고 철 뼈대만 고철류로 버려요. 분리가 어렵다면 종량제 봉투에 쏙!',
    steps: [
      '가위나 칼로 우산살과 천/비닐 연결 실을 끊기',
      '방수 천이나 비닐은 일반쓰레기(종량제)로 배출',
      '남은 쇠 뼈대는 묶어서 고철류로 배출',
      '분리가 불가능할 만큼 엉킨 경우 종량제 봉투에 완전히 넣어 배출 (튀어나오면 안 됨)',
    ],
    reason: '우산살(철)과 천(폴리에스터)이 묶여있으면 선별 기계가 분리할 수 없습니다.',
    relatedCategory: 'can-metal',
  },
  {
    id: 'w-20',
    name: '프라이팬 / 냄비 (코팅 팬)',
    aliases: ['후라이팬', '냄비', '웍', '조리도구', '스테인리스냄비'],
    category: '고철류',
    disposalTarget: '고철류 분리배출',
    targetBadgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    difficulty: '쉬움',
    isTricky: false,
    quickGuide: '코팅이 벗겨진 프라이팬이나 냄비는 손잡이가 플라스틱이어도 통째로 고철류로 배출 가능해요.',
    steps: [
      '음식물 찌꺼기와 기름기를 깨끗이 닦아내기',
      '고철류 수거함에 배출',
      '손잡이 나사가 쉽게 풀리면 플라스틱 손잡이는 떼어내 일반쓰레기 배출 권장',
    ],
    reason: '몸통 대부분이 알루미늄이나 스테인리스 고철이므로 용해로에서 손잡이 플라스틱은 기화되고 금속만 회수됩니다.',
    relatedCategory: 'can-metal',
  },
  {
    id: 'w-21',
    name: '화장품 유리병 / 매니큐어병',
    aliases: ['스킨병', '로션병', '에센스병', '향수병', '매니큐어'],
    category: '유리병 vs 일반쓰레기',
    disposalTarget: '깨끗이 씻은 유리병은 유리류 / 안 씻기면 일반쓰레기',
    targetBadgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    difficulty: '보통',
    isTricky: true,
    quickGuide: '내용물이 말끔히 씻기면 유리병! 매니큐어나 오일처럼 기름기가 안 지워지면 일반쓰레기로 버려요.',
    steps: [
      '남은 화장품을 휴지에 닦아 일반쓰레기로 배출',
      '따뜻한 물로 병 안쪽을 헹구기',
      '플라스틱 뚜껑이나 스포이트는 분리',
      '깨끗해진 유리병만 유리병류로 배출',
    ],
    reason: '화장품 기름기와 색소가 남아있으면 유리 재활용 유리의 투명도와 품질을 해칩니다.',
    relatedCategory: 'glass',
  },
  {
    id: 'w-22',
    name: '스티로폼 박스 / 과일 완충재',
    aliases: ['스티로폼', '택배스티로폼', '신선식품박스', '과일포장재'],
    category: '스티로폼류',
    disposalTarget: '흰색 스티로폼 전용 분리배출',
    targetBadgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
    difficulty: '보통',
    isTricky: true,
    quickGuide: '테이프와 송장을 완벽히 떼어낸 깨끗한 순백색 스티로폼만 재활용돼요. 무늬나 색상은 일반쓰레기!',
    steps: [
      '박스 겉면의 박스테이프와 운송장 스티커를 깨끗이 떼어내기',
      '생선이나 고기 핏물, 냄새를 물로 깨끗하게 세척',
      '흰색 스티로폼 수거함에 배출',
    ],
    reason: '스티로폼은 녹여서 액자 틀이나 건자재로 재생되는데, 테이프 접착제나 색소는 기계를 손상시킵니다.',
    warning: '색깔이 들어간 과일 그물망(배, 사과 감싼 스폰지망)은 대부분 재활용 불가 일반쓰레기입니다.',
    relatedCategory: 'styrofoam',
  },
  {
    id: 'w-23',
    name: '폐형광등 / 삼파장 램프',
    aliases: ['형광등', '삼파장전구', '램프', '직관형광등'],
    category: '특수 폐기물',
    disposalTarget: '폐형광등 전용 수거함',
    targetBadgeColor: 'bg-red-100 text-red-800 border-red-300',
    difficulty: '주의',
    isTricky: true,
    quickGuide: '절대 깨뜨리지 마세요! 수은 증기가 들어있어 아파트 단지나 주민센터 전용함에 안전하게 넣어요.',
    steps: [
      '교체한 형광등을 새 형광등 종이 케이스에 넣거나 조심스럽게 운반',
      '아파트 관리사무소 앞이나 동 주민센터 폐형광등 전용함에 배출',
      '만약 깨졌다면 환기를 충분히 하고 신문지로 싸서 종량제 배출',
    ],
    reason: '형광등 하나에 인체에 치명적인 수은 가스가 약 10~25mg 포함되어 있어 유출 시 신경계를 손상시킵니다.',
    relatedCategory: 'special-waste',
  },
  {
    id: 'w-24',
    name: '소형 가전제품 (헤어드라이어, 마우스, 토스터기 등)',
    aliases: ['드라이기', '마우스', '키보드', '토스터', '선풍기', '전자레인지', '다리미', '고데기'],
    category: '소형 폐가전',
    disposalTarget: '주민센터 전용함 (또는 폐가전 무상수거)',
    targetBadgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    difficulty: '쉬움',
    isTricky: false,
    quickGuide: '아파트나 주민센터의 소형 가전 전용함에 무료 배출 가능해요. 5개 이상이면 방문수거도 무료!',
    steps: [
      '전원선과 함께 아파트 내 소형가전 수거함에 넣기',
      '5개 이상 모았을 땐 "폐가전무상방문수거(1599-0903)" 예약 시 기사가 집 앞까지 방문하여 무료 수거',
    ],
    reason: '가전 내부의 구리, 금, 희토류 등 귀중한 금속 자원을 분해하여 추출합니다.',
    relatedCategory: 'special-waste',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '치킨을 맛있게 먹고 남은 닭 뼈다귀! 어디로 분리배출해야 할까요?',
    item: '치킨 뼈 / 갈비 뼈',
    characterHint: '새롬이의 힌트: 동물이 먹을 수 있는 영양가 있는 사료가 될 수 있는지 생각해보세요!',
    funFact: '뼈는 단단해서 사료 분쇄기를 고장 내고 동물에게 위험해요.',
    options: [
      {
        label: '음식물 쓰레기 봉투에 버린다',
        isCorrect: false,
        explanation: '땡! 닭 뼈는 딱딱해서 동물이 먹을 수 없고 기계를 망가뜨려요.',
      },
      {
        label: '종량제 일반쓰레기 봉투에 버린다',
        isCorrect: true,
        explanation: '정답이에요! 뼈다귀, 가시, 조개껍데기는 모두 일반쓰레기(종량제)로 버려야 합니다.',
      },
      {
        label: '고철류 분리수거함에 버린다',
        isCorrect: false,
        explanation: '앗, 뼈는 쇠나 금속이 아니에요!',
      },
    ],
  },
  {
    id: 2,
    question: '기름기와 빨간 양념이 듬뿍 묻은 피자 박스의 밑바닥은 어떻게 버려야 할까요?',
    item: '기름 묻은 피자 상자',
    characterHint: '종이별이의 힌트: 종이를 물에 녹여 새 종이로 만들 때 기름이 섞이면 어떻게 될까요?',
    funFact: '깨끗한 뚜껑 부위는 찢어서 종이로 재활용할 수 있어요!',
    options: [
      {
        label: '종이류 상자함에 통째로 버린다',
        isCorrect: false,
        explanation: '오답! 기름때가 묻은 종이는 재생 공정에서 펄프를 오염시켜 재활용이 불가능해요.',
      },
      {
        label: '오염된 바닥은 일반쓰레기, 깨끗한 뚜껑만 종이류로 버린다',
        isCorrect: true,
        explanation: '완벽한 정답! 음식물 기름이 밴 종이는 일반쓰레기, 깨끗한 부분만 찢어서 종이로 분리해요.',
      },
      {
        label: '물로 박스를 씻은 뒤 종이류로 버린다',
        isCorrect: false,
        explanation: '종이 박스는 물에 젖으면 훼손되어 종이 재활용이 안 돼요.',
      },
    ],
  },
  {
    id: 3,
    question: '투명 페트병을 올바르게 분리배출하는 4단계 순서로 가장 정확한 것은?',
    item: '투명 생수 페트병',
    characterHint: '페티의 힌트: 비우고, 떼고, 밟고, 닫아서 투명페트함으로!',
    funFact: '투명 페트병 15병이면 멋진 티셔츠 1벌을 만들 수 있어요!',
    options: [
      {
        label: '물로 헹군 뒤 라벨을 떼고 납작하게 밟아서 뚜껑을 닫아 배출한다',
        isCorrect: true,
        explanation: '딩동댕! 라벨 제거와 부피 줄이기, 뚜껑 닫기(선별장에서 자동분리됨)가 정석이에요.',
      },
      {
        label: '라벨이 붙은 채로 일반 플라스틱함에 던져 넣는다',
        isCorrect: false,
        explanation: '라벨이 붙어있으면 고품질 섬유로 재활용할 수 없어요!',
      },
      {
        label: '가위로 잘게 잘라서 비닐류에 넣는다',
        isCorrect: false,
        explanation: '페트병은 비닐류가 아니며 잘게 자르면 선별 공정에서 날아가버려요.',
      },
    ],
  },
  {
    id: 4,
    question: '샴푸통이나 폼클렌징의 "누르는 펌프 뚜껑"은 어디로 배출해야 할까요?',
    item: '샴푸통 펌프 헤드',
    characterHint: '플라미의 힌트: 펌프 헤드 안쪽을 분해해보면 스프링이 숨어있답니다!',
    funFact: '겉모습은 플라스틱 같아도 금속 스프링이 융합된 복합소재예요.',
    options: [
      {
        label: '플라스틱류로 배출한다',
        isCorrect: false,
        explanation: '땡! 펌프 안쪽에 작은 쇠 스프링이 단단히 결합되어 있어 플라스틱 재활용이 불가해요.',
      },
      {
        label: '일반쓰레기(종량제 봉투)로 배출한다',
        isCorrect: true,
        explanation: '정답! 펌프는 일반쓰레기로 버리고, 깨끗이 헹군 샴푸통 본체만 플라스틱으로 버려야 해요.',
      },
      {
        label: '고철류로 배출한다',
        isCorrect: false,
        explanation: '펌프 외관 대부분은 플라스틱이라 고철류로도 들어갈 수 없어요.',
      },
    ],
  },
  {
    id: 5,
    question: '집에서 사용하는 "물티슈"는 다 쓰고 난 뒤 어디에 버려야 할까요?',
    item: '물티슈',
    characterHint: '새롬이의 힌트: 물티슈는 천연 종이가 아니라 플라스틱 합성 섬유랍니다!',
    funFact: '물티슈를 변기에 버리면 절대 녹지 않아 배관이 터져요!',
    options: [
      {
        label: '종이류 분리수거함에 버린다',
        isCorrect: false,
        explanation: '물티슈는 종이가 아닌 폴리에스터 플라스틱 섬유로 만들어졌어요.',
      },
      {
        label: '변기에 넣고 물을 내린다',
        isCorrect: false,
        explanation: '절대 금지! 물에 안 녹아서 변기와 하수관을 막고 펌프를 망가뜨려요.',
      },
      {
        label: '일반쓰레기 종량제 봉투에 버린다',
        isCorrect: true,
        explanation: '정답입니다! 물티슈는 사용 후 반드시 일반쓰레기 종량제 봉투로 버려주세요.',
      },
    ],
  },
  {
    id: 6,
    question: '다 마신 우유팩(종이팩)은 어떻게 배출해야 올바를까요?',
    item: '우유팩 / 멸균팩',
    characterHint: '종이별이의 힌트: 우유팩은 고급 천연 펄프라 화장지가 되지만 일반 종이와 섞이면 곤란해요!',
    funFact: '주민센터에 우유팩을 모아가면 롤휴지나 종량제 봉투로 바꿔줘요!',
    options: [
      {
        label: '씻지 않고 구겨서 택배 박스 속에 넣어 버린다',
        isCorrect: false,
        explanation: '우유 찌꺼기가 썩어 악취가 나고 다른 종이 상자까지 곰팡이로 오염시켜요.',
      },
      {
        label: '물로 헹구고 펼쳐서 말린 뒤 종이팩 전용함에 배출한다',
        isCorrect: true,
        explanation: '정답! 방수 코팅된 종이팩은 일반 종이와 공정이 달라 종이팩 전용함에 따로 모아야 해요.',
      },
      {
        label: '비닐 코팅이 있으므로 비닐류에 버린다',
        isCorrect: false,
        explanation: '종이팩의 80% 이상은 최고급 펄프입니다. 비닐류가 아니에요.',
      },
    ],
  },
  {
    id: 7,
    question: '다 쓴 리튬 보조배터리는 어디에 버려야 가장 안전할까요?',
    item: '보조배터리',
    characterHint: '특공이의 힌트: 쓰레기차에서 압착되면 큰 불이 날 수 있어요!',
    funFact: '폐건전지 수거함에 모인 배터리는 안전하게 유가금속을 추출해요.',
    options: [
      {
        label: '종량제 일반쓰레기 봉투에 묶어 버린다',
        isCorrect: false,
        explanation: '위험해요! 쓰레기 수거차 압착 과정에서 폭발하여 큰 화재를 일으킵니다.',
      },
      {
        label: '폐건전지 전용 수거함에 안전하게 넣는다',
        isCorrect: true,
        explanation: '정답! 주민센터나 아파트 단지의 폐건전지 전용함에 배출해야 안전합니다.',
      },
      {
        label: '소형 가전이므로 고철류에 버린다',
        isCorrect: false,
        explanation: '배터리는 충격을 받으면 폭발하므로 고철함에 넣으면 안 돼요.',
      },
    ],
  },
  {
    id: 8,
    question: '설거지하다 깨진 유리그릇이나 머그컵은 어디에 버려야 할까요?',
    item: '깨진 그릇 / 머그컵',
    characterHint: '유리링의 힌트: 일반 재활용 유리병과 녹는 온도가 달라서 섞일 수 없어요!',
    funFact: '환경미화원분들이 손을 베이지 않도록 신문지로 꼭 감싸주세요.',
    options: [
      {
        label: '재활용 유리병 분리수거함에 쏙 넣는다',
        isCorrect: false,
        explanation: '틀렸어요! 깨진 유리나 도자기는 재활용 유리병과 녹는점이 달라 재활용이 안 돼요.',
      },
      {
        label: '신문지로 두껍게 싸서 일반쓰레기(또는 불연성 마대)에 버린다',
        isCorrect: true,
        explanation: '정답! 수거하시는 분이 다치지 않게 신문지로 여러 겹 싸서 종량제(많으면 불연성마대)로 배출해요.',
      },
      {
        label: '하수구에 망치로 부숴서 흘려보낸다',
        isCorrect: false,
        explanation: '하수구가 막히고 배관이 파손될 수 있어요!',
      },
    ],
  },
  {
    id: 9,
    question: '젤이 들어있는 신선식품 보냉 아이스팩, 가장 올바른 처리는?',
    item: '젤 아이스팩',
    characterHint: '특공이의 힌트: 가위로 뜯어 싱크대에 젤을 부으면 하수관이 막히고 미세플라스틱이 돼요!',
    funFact: '요즘은 환경을 위해 100% 물로 채운 착한 아이스팩이 늘고 있어요.',
    options: [
      {
        label: '가위로 잘라 싱크대에 젤을 흘려보낸다',
        isCorrect: false,
        explanation: '절대 안 돼요! 미세플라스틱이 하수관을 막고 강과 바다로 흘러가 물고기를 오염시켜요.',
      },
      {
        label: '뜯지 말고 통째로 종량제 봉투에 버리거나 전용수거함에 넣는다',
        isCorrect: true,
        explanation: '정답! 젤 형태는 뜯지 않고 종량제 봉투에 배출하거나 지자체 전용 재사용함에 넣어요.',
      },
      {
        label: '겉포장이 비닐이니 내용물 채로 비닐류에 넣는다',
        isCorrect: false,
        explanation: '내부 젤 때문에 비닐 재활용이 전혀 불가능해요.',
      },
    ],
  },
  {
    id: 10,
    question: '부탄가스나 모기약 스프레이 캔을 버릴 때 반드시 해야 하는 일은?',
    item: '부탄가스 캔',
    characterHint: '캔디의 힌트: 잔여 가스가 남아있으면 펑! 폭발사고가 발생해요.',
    funFact: '통풍이 잘되는 야외에서 작업해야 가스 흡입 위험이 없어요.',
    options: [
      {
        label: '뚜껑만 닫아서 바로 일반쓰레기에 버린다',
        isCorrect: false,
        explanation: '소각장에서 폭발 사고가 일어나 작업자분들이 크게 다칠 수 있어요.',
      },
      {
        label: '야외에서 가스를 완전히 빼고 바닥에 구멍을 뚫어 캔류에 버린다',
        isCorrect: true,
        explanation: '정답! 실외에서 잔여 가스를 치- 다 빼고 바닥에 구멍을 뚫어 캔류로 배출해야 안전해요.',
      },
      {
        label: '물 속에 담가두었다가 종이류에 버린다',
        isCorrect: false,
        explanation: '캔은 금속이므로 종이류가 될 수 없어요.',
      },
    ],
  },
];

export const FOUR_PRINCIPLES = [
  {
    number: '01',
    title: '비운다',
    sub: 'Empty Cleanly',
    mascot: 'yamyam',
    description: '용기 안의 음식물, 액체, 잔여물을 남김없이 싹 비워내요.',
    tip: '내용물이 조금이라도 남아있으면 악취가 나고 다른 재활용품까지 곰팡이로 오염돼요.',
  },
  {
    number: '02',
    title: '헹군다',
    sub: 'Rinse with Water',
    mascot: 'peti',
    description: '물로 깨끗하게 헹궈서 찌꺼기와 기름기를 씻어내요.',
    tip: '물로 씻어도 지워지지 않는 기름때나 고추기름은 일반쓰레기(종량제)로 보내주세요.',
  },
  {
    number: '03',
    title: '분리한다',
    sub: 'Separate Materials',
    mascot: 'jongi',
    description: '라벨 스티커, 테이프, 뚜껑, 스프링 등 재질이 다른 부분을 똑 떼어내요.',
    tip: '택배박스는 테이프와 송장을 떼고, 페트병은 비닐 라벨을 뜯는 것이 핵심이에요.',
  },
  {
    number: '04',
    title: '섞지 않는다',
    sub: "Don't Mix Types",
    mascot: 'chorok',
    description: '종이, 플라스틱, 캔, 비닐, 유리 등 종류별로 제자리에 쏙쏙 넣어요.',
    tip: '특히 투명 페트병과 일반 플라스틱, 종이팩과 일반 종이는 꼭 구분해서 모아주세요.',
  },
];
