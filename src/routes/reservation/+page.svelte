<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { findCourse, plans, reservationNotes } from '#lib/content.ts';
  import type { LevelId, PlanId } from '#lib/content.ts';
  import Button from '#lib/ui/Button.svelte';
  import BookingSteps from '#lib/reservation/BookingSteps.svelte';
  import LevelPicker from '#lib/reservation/LevelPicker.svelte';
  import PlanCard from '#lib/reservation/PlanCard.svelte';
  import { readSelection, selectionHref, selectionLabel } from '#lib/reservation/booking.svelte.ts';
  import type { Selection } from '#lib/reservation/booking.svelte.ts';

  let selection = $state<Selection>();
  let levelBlock = $state<HTMLDivElement>();
  let chooseHeading: HTMLHeadingElement;
  const course = $derived(findCourse(selection?.course));

  $effect(() => {
    selection = readSelection(page.url.searchParams);
  });

  function setSelection(next: Selection) {
    return goto(selectionHref('/reservation', next), { reset: false, replace: true });
  }

  async function choosePlan(plan: PlanId) {
    await setSelection({ plan, level: selection?.level ?? 'basic', course: selection?.course });
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    levelBlock?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    levelBlock?.focus({ preventScroll: true });
  }

  function chooseLevel(level: LevelId) {
    if (selection) {
      void setSelection({ ...selection, level, course: course?.level === level ? course.id : undefined });
    }
  }

  async function reset() {
    await goto('/reservation', { reset: false, replace: true });
    chooseHeading.focus();
    chooseHeading.scrollIntoView({ block: 'center' });
  }
</script>

<svelte:head>
  <title>立即預約｜DOYOGA</title><meta
    name="description"
    content="選擇 DOYOGA 的體驗方案及課程階級，開始瑜珈預約。"
  />
</svelte:head>

<div class="pt-[var(--page-space)] pb-22 md:pb-20 lg:pb-26">
  <BookingSteps current={1} onreset={selection ? reset : undefined} />
  <section class="shell" aria-labelledby="choose-plan-heading">
    <h2 id="choose-plan-heading" tabindex="-1" class="sr-only" bind:this={chooseHeading}>
      選擇方案
    </h2>
    <div class="grid gap-4 md:gap-6 lg:grid-cols-3 lg:gap-[30px]">
      {#each plans as plan (plan.id)}
        <div
          class:hidden={Boolean(selection && selection.plan !== plan.id)}
          class="h-full lg:block! [&>article]:h-full"
        >
          <PlanCard
            {plan}
            booking
            selected={selection?.plan === plan.id}
            priority={plan.id === (selection?.plan ?? plans[0].id)}
            onclick={() => choosePlan(plan.id)}
          />
        </div>
      {/each}
    </div>
    {#if selection}
      <div
        class="my-6 flex justify-center gap-3 text-brand lg:my-4 lg:grid lg:min-h-10 lg:grid-cols-3 lg:gap-[30px]"
      >
        <ChevronDown
          size={24}
          class="lg:justify-self-center"
          style={`grid-column: ${plans.findIndex((plan) => plan.id === selection?.plan) + 1}`}
          aria-hidden="true"
        />
      </div>
    {/if}
  </section>

  {#if selection}
    <div bind:this={levelBlock} tabindex="-1" class="scroll-mt-4">
      <LevelPicker selected={selection.level} onchange={chooseLevel} />
    </div>
    <div class="shell mt-10 text-center text-brand md:max-lg:mt-8" aria-live="polite">
      <p>您選擇的是</p>
      <p class="mt-1 text-lead underline underline-offset-4">{selectionLabel(selection)}</p>
      {#if course}<p class="mt-1 text-sm">課程：{course.title}</p>{/if}
      <button type="button" class="mt-2 underline underline-offset-4 lg:hidden" onclick={reset}>
        更改方案
      </button>
    </div>
  {/if}

  <section
    class="reservation-notes shell max-w-[445px] text-brand"
    class:has-selection={Boolean(selection)}
    aria-labelledby="reservation-notes"
  >
    <h2 id="reservation-notes" class="mb-4 text-center text-section font-medium">預約須知</h2>
    <ol class="list-inside list-decimal space-y-1">
      {#each reservationNotes as note (note)}<li>{note}</li>{/each}
    </ol>
    {#if selection}<Button
        href={selectionHref('/reservation/details', selection)}
        class="mx-auto mt-8 flex! w-full max-w-87.5 text-xl"
      >
        繼續預約
      </Button>{/if}
  </section>
</div>

<style>
  .reservation-notes {
    margin-top: 40px;
  }
  .reservation-notes.has-selection {
    margin-top: 32px;
  }
  @media (min-width: 768px) {
    .reservation-notes {
      margin-top: 48px;
    }
    .reservation-notes.has-selection {
      margin-top: 40px;
    }
  }
  @media (min-width: 1024px) {
    .reservation-notes:not(.has-selection) {
      margin-top: 32px;
    }
  }
</style>
