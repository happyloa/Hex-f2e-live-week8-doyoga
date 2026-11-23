import { createContext } from 'svelte';
import { courses, levels, plans } from '#lib/content.ts';
import type { LevelId, PlanId } from '#lib/content.ts';

export type Selection = { plan: PlanId; level: LevelId; course?: string };
export type Receipt = {
  selection: Selection;
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  date: string;
};

export class Booking {
  receipt = $state<Receipt>();
}

export const [getBooking, setBooking] = createContext<Booking>();

export function readSelection(params: Pick<URLSearchParams, 'get'>): Selection | undefined {
  const plan = plans.find((item) => item.id === params.get('plan'));
  if (!plan) return;
  const level = levels.find((item) => item.id === params.get('level')) ?? levels[0];
  const requested = params.get('course');
  const course = courses.find((item) => item.id === requested && item.level === level.id)?.id;
  return {
    plan: plan.id,
    level: level.id,
    course: course ?? (requested === 'aerial' && level.id === 'basic' ? requested : undefined),
  };
}

export function selectionLabel(selection: Selection) {
  const plan = plans.find((item) => item.id === selection.plan);
  const level = levels.find((item) => item.id === selection.level);
  return `${plan?.title}課程-${level?.name}`;
}

export function selectionHref(path: string, selection: Selection) {
  const query = new URLSearchParams({
    plan: selection.plan,
    level: selection.level,
  });
  if (selection.course) query.set('course', selection.course);
  return `${path}?${query}`;
}
