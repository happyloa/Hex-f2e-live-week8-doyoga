export const navigation = [
  { label: '課程介紹', href: '/course' },
  { label: '瑜珈空間', href: '/surroundings' },
  { label: '當月課表', href: '/curriculum' },
];

export const courses = [
  {
    id: 'basic',
    title: '基礎 Basic',
    teacher: 'Carol Tang',
    image: 'basic',
    level: 'basic',
    detail: '從站姿、坐姿與呼吸開始，熟悉瑜珈的基礎動作和身體順位，循序練習柔軟度、穩定度與平衡。',
  },
  {
    id: 'iyengar',
    title: '艾揚格 Iyengar',
    teacher: 'Kanae',
    image: 'iyengar',
    level: 'intermediate',
    detail: '運用瑜珈磚、伸展帶等輔具，練習更穩定的肌肉控制，理解每個體位的正確排列。',
  },
  {
    id: 'hatha',
    title: '哈達 Hatha',
    teacher: 'Kuzuha',
    image: 'hatha',
    level: 'intermediate',
    detail: '配合呼吸進入各式體位，引導身體在力量與放鬆之間保持平衡。',
  },
  {
    id: 'universal',
    title: '寰宇 Universal',
    teacher: 'Kuzuha',
    image: 'universal',
    level: 'intermediate',
    detail: '結合體位、觀想和呼吸，從不同方向伸展身體，專注於動作之間的連接。',
  },
  {
    id: 'arco',
    title: '雙人飛行 Arco Yoga',
    teacher: 'Kuzuha、Kanae',
    image: 'arco',
    level: 'intermediate',
    detail: '以雙人合作練習支撐與平衡，由老師指導安全的進出動作，逐步培養默契。',
  },
  {
    id: 'ashtanga',
    title: '阿斯坦加 Ashtanga',
    teacher: 'Kanae',
    image: 'ashtanga',
    level: 'advanced',
    detail: '以固定的體位序列配合呼吸，從流動的動作訓練專注、耐力與核心穩定。',
  },
  {
    id: 'yin-yang',
    title: '陰陽 Yin Yang',
    teacher: 'Asa Chen',
    image: 'yin-yang',
    level: 'advanced',
    detail: '練習動態的陽瑜珈與靜態的陰瑜珈，在肌力練習後透過停留與呼吸逐步放鬆。',
  },
  {
    id: 'aroma',
    title: '香氛 Aroma Yoga',
    teacher: 'Asa Chen',
    image: 'practice-room',
    level: 'basic',
    detail: '在柔和香氣中配合呼吸緩慢伸展，釋放日常累積的肩頸與背部緊繃。',
  },
] as const;

export type Course = (typeof courses)[number];

export const aerialDescription = [
  '使用掛布懸掛在半空，進行哈達瑜珈體位法練習',
  '藉由地心引力的重力原理',
  '鍛鍊核心肌群，舒緩脊椎壓力',
  '訓練身體協調性，深層放鬆身體',
  '課堂裡老師會視同學狀況安排教導倒立動作',
  '對於不敢嘗試倒立的同學來說',
  '藉由掛布的支持與保護',
  '加上老師細心指導，讓同學能更快掌握',
];

export const courseNotes = [
  '請攜帶適當的瑜珈墊和一條長毛巾配合課程使用。',
  '運動中請穿著有彈性、吸汗、透氣為原則的衣物，盡量穿著較貼身的運動衣，以便教練指導與自我矯正。',
  '運動中切記補充適當的水分、保持腹式呼吸，以鼻吸氣，以口呼氣為原則。',
  '運動中請保持微收小腹的原則，肩膀放鬆、頭頂向上延伸，請跟隨教練指示，配合呼吸一步步的確實練習。',
  '運動過程中若感到任何不適，請馬上停止且與老師商量討論。若懷孕或特殊疾病請先告知。',
];

const ryt = '美國瑜珈聯盟 RYT200 小時師資認證';
const certifications = [ryt, '自然呼吸瑜珈會館開授倒立研習', '簡善琳瑜珈會館開授倒立研習'];

export const teachers = [
  {
    name: 'Carol Tang',
    years: 10,
    image: 'teacher-1.webp',
    quote:
      '因為瑜珈讓我重新認識自己的身體，也讓我有了不一樣的人生。\n我希望能跟學生們分享瑜珈的好，讓大家能藉由瑜珈看見自己的內在與潛能，並將瑜珈自然的融入自己的生活中。',
    credentials: [
      '協會認證艾揚格瑜珈老師',
      '2010 年完成四年的艾揚格師資培訓',
      '2020 取得艾揚格瑜珈高階認證',
    ],
  },
  {
    name: 'Kanae',
    years: 3,
    image: 'teacher-2.webp',
    quote:
      '希望每個人透過觀察，感受在進入動作，連接陰與陽，內和外，呼和吸的方式來更了解瑜珈練習的觀點。每個動作都帶著呼吸和順位，在平衡心理和生理的狀況下以安全和簡化的技巧進入瑜珈姿勢，帶著放鬆的心情，享受瑜珈和生命的喜悅，並樂在其中。',
    credentials: certifications,
  },
  {
    name: 'Kuzuha',
    years: 3,
    image: 'teacher-3.webp',
    quote: '瑜珈是一種生活態度，學習平衡不強求，堅持不放棄，修煉心靈活在當下。',
    credentials: certifications,
  },
  {
    name: 'Asa Ifrit',
    years: 5,
    image: 'teacher-4.webp',
    quote:
      '帶著懵懂和好奇開始了瑜珈的探索。\n追隨印度瑜珈大師 Atui Shri 學習呼吸控制和冥想以及完成瑜珈大師宋光明師資培訓。',
    credentials: [ryt, 'AshtangsTTC50小時認證'],
  },
];

export const plans = [
  {
    id: 'first',
    title: '首次體驗',
    price: 'NT $450 / 次',
    image: 'universal',
    description: '初次至 DOYOGA 上課建議選擇此方案。',
  },
  {
    id: 'short',
    title: '短期體驗',
    price: 'NT $1800 / 月',
    image: 'short-plan',
    description: '想試著培養瑜珈習慣者可以選擇此方案。',
  },
  {
    id: 'long',
    title: '長期體驗',
    price: 'NT $5600 / 季',
    image: 'long-plan',
    description: '有長期習慣做瑜伽者建議選擇此方案。',
  },
] as const;

export type PlanId = (typeof plans)[number]['id'];

export const levels = [
  {
    id: 'basic',
    name: '基礎',
    english: 'Basic',
    courses: '基礎課程',
    points: ['入門體位法動作解說', '瑜珈基礎動作、順位', '適合任何階段練習者'],
  },
  {
    id: 'intermediate',
    name: '中階',
    english: 'Intermediate',
    courses: '艾揚格、哈達、寰宇',
    points: ['刺激身體七個層次為核心', '結合流暢體位法練習、呼吸、觀想', '適合半年以上練習者'],
  },
  {
    id: 'advanced',
    name: '高階',
    english: 'Advanced',
    courses: '阿斯坦加、陰陽',
    points: ['充分打開身體每個部位', '顯著提升力量與柔軟度', '適合一年以上練習者'],
  },
] as const;

export type LevelId = (typeof levels)[number]['id'];

export const reservationNotes = [
  '如果有特殊體質、特殊狀況，請主動告知。',
  '取消預約或時間異動請於預約日前一天晚間 21:00 前告知，預約當日請勿異動或取消，以免影響您日後再預約的個人信用及難度。',
  '為維護上課品質，請遵守 DOYOGA 各項參觀規定，未遵守規定者，本公司保留謝絕入館之權利。',
  'DOYOGA 保留修改預約須知之權利，修改後的條款將公佈於本網站上，不另外個別通知。如果您繼續在本網站進行參觀預約，就表示您已經了解、並同意遵守修改後的約定條款。',
];

export const scheduleNotes = [
  '空中瑜珈、香氛開放 2 天前電話預約上課。',
  '如果有特殊體質、特殊狀況，請主動告知該堂教師。',
  '取消預約或時間異動請於預約日前一天晚間 21:00 前告知。',
  '運動過程中若感到任何不適，請馬上停止且與老師商量討論。',
];

export const testimonials = [
  ['Joanne', '服務很好、設備優良！', 'user-1.webp'],
  ['穎旻', '上課後身體健康很多', 'user-2.webp'],
  ['子琪', '上課很有趣！', 'user-3.webp'],
  ['葉子', '老師的教學很專業', 'user-4.webp'],
  ['Ray', '很舒壓', 'user-5.webp'],
  ['俊儀', '讚的！', 'user-6.webp'],
] as const;
