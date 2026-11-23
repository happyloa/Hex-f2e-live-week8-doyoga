// Image paths and available WebP widths for each photograph.
export const photos = {
  hero: { src: '/images/home/hero.webp', width: 1350, height: 900, widths: [400, 680, 960, 1350] },
  fitness: { src: '/images/home/fitness.webp', width: 1050, height: 699, widths: [400, 680, 1050] },
  relax: { src: '/images/home/relax.webp', width: 1050, height: 699, widths: [400, 680, 1050] },
  sculpt: { src: '/images/home/sculpt.webp', width: 1050, height: 700, widths: [400, 680, 1050] },
  lounge: { src: '/images/home/lounge.webp', width: 560, height: 420, widths: [400, 560] },
  aerial: { src: '/images/course/aerial.webp', width: 668, height: 1001, widths: [400, 668] },
  basic: { src: '/images/course/basic.webp', width: 1050, height: 700, widths: [400, 680, 1050] },
  iyengar: {
    src: '/images/course/iyengar.webp',
    width: 1050,
    height: 700,
    widths: [400, 680, 1050],
  },
  hatha: { src: '/images/course/hatha.webp', width: 1050, height: 701, widths: [400, 680, 1050] },
  universal: {
    src: '/images/course/universal.webp',
    width: 890,
    height: 1335,
    widths: [400, 680, 890],
  },
  arco: { src: '/images/course/arco.webp', width: 890, height: 620, widths: [400, 680, 890] },
  ashtanga: { src: '/images/course/ashtanga.webp', width: 700, height: 700, widths: [400, 700] },
  'yin-yang': { src: '/images/course/yin-yang.webp', width: 700, height: 1050, widths: [400, 700] },
  'group-studio': {
    src: '/images/surroundings/group-studio.webp',
    width: 1280,
    height: 853,
    widths: [400, 680, 960, 1280],
  },
  'practice-room': {
    src: '/images/surroundings/practice-room.webp',
    width: 1050,
    height: 700,
    widths: [400, 680, 1050],
  },
  equipment: {
    src: '/images/surroundings/equipment.webp',
    width: 700,
    height: 1050,
    widths: [400, 700],
  },
  showers: {
    src: '/images/surroundings/showers.webp',
    width: 1050,
    height: 700,
    widths: [400, 680, 1050],
  },
  'social-room': {
    src: '/images/surroundings/social-room.webp',
    width: 1050,
    height: 689,
    widths: [400, 680, 1050],
  },
  'short-plan': {
    src: '/images/reservation/short-plan.webp',
    width: 700,
    height: 560,
    widths: [400, 700],
  },
  'long-plan': {
    src: '/images/reservation/long-plan.webp',
    width: 729,
    height: 486,
    widths: [400, 729],
  },
  map: { src: '/images/contact/map.webp', width: 909, height: 547, widths: [400, 680, 909] },
} as const;

export type PhotoName = keyof typeof photos;
export const heroMobile = '/images/home/hero-mobile.webp';

export function imageSrcset(name: PhotoName) {
  const { src, width, widths } = photos[name];
  return widths
    .map(
      (candidate) =>
        `${candidate === width ? src : src.replace(/\.webp$/, `-${candidate}.webp`)} ${candidate}w`,
    )
    .join(', ');
}
