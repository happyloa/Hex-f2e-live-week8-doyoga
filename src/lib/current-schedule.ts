import type { CourseId } from '#lib/content.ts';

export const scheduleLabels = {
  basic: '基礎 Basic',
  iyengar: '艾揚格 Iyengar',
  hatha: '哈達 Hatha',
  universal: '寰宇 Universal',
  arco: '雙人飛行',
  'yin-yang': '陰陽 Yin Yang',
  aroma: '香氛瑜珈',
} satisfies Partial<Record<CourseId, string>>;

type ScheduleCourse = keyof typeof scheduleLabels;

export const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

export const schedule: {
  time: string;
  sessions?: (ScheduleCourse | null)[];
}[] = [
  {
    time: '0900-1000',
    sessions: ['basic', 'basic', null, null, 'basic', 'basic'],
  },
  {
    time: '1000-1100',
    sessions: ['iyengar', 'hatha', 'universal', 'hatha', 'iyengar', 'arco'],
  },
  {
    time: '1100-1200',
    sessions: ['universal', 'yin-yang', 'iyengar', 'universal', null, 'iyengar'],
  },
  { time: '1200-1400' },
  {
    time: '1400-1500',
    sessions: ['arco', 'basic', 'arco', 'yin-yang', 'arco', 'basic'],
  },
  {
    time: '1500-1600',
    sessions: ['yin-yang', 'yin-yang', 'basic', 'basic', 'hatha', 'aroma'],
  },
  {
    time: '1600-1700',
    sessions: ['hatha', 'arco', 'yin-yang', 'aroma', 'iyengar', 'yin-yang'],
  },
  {
    time: '1700-1800',
    sessions: ['iyengar', null, 'hatha', 'iyengar', 'universal', 'hatha'],
  },
  { time: '1800-2000' },
  {
    time: '2000-2100',
    sessions: [null, null, 'aroma', 'iyengar', 'aroma', 'arco'],
  },
];
