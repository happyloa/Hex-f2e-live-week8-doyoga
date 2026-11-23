const basic = '基礎 Basic';
const iyengar = '艾揚格 Iyengar';
const hatha = '哈達 Hatha';
const universal = '寰宇 Universal';
const arco = '雙人飛行';
const yin = '陰陽 Yin Yang';
const aroma = '香氛瑜珈';

export const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

export const schedule = [
  { time: '0900-1000', sessions: [basic, basic, '', '', basic, basic] },
  {
    time: '1000-1100',
    sessions: [iyengar, hatha, universal, hatha, iyengar, arco],
  },
  {
    time: '1100-1200',
    sessions: [universal, yin, iyengar, universal, '', iyengar],
  },
  { time: '1200-1400' },
  { time: '1400-1500', sessions: [arco, basic, arco, yin, arco, basic] },
  { time: '1500-1600', sessions: [yin, yin, basic, basic, hatha, aroma] },
  { time: '1600-1700', sessions: [hatha, arco, yin, aroma, iyengar, yin] },
  {
    time: '1700-1800',
    sessions: [iyengar, '', hatha, iyengar, universal, hatha],
  },
  { time: '1800-2000' },
  { time: '2000-2100', sessions: ['', '', aroma, iyengar, aroma, arco] },
];
