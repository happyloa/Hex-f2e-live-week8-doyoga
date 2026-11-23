<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import { courses, plans, reservationNotes } from '#lib/content.ts';
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
  const courseTitle = $derived(
    selection?.course === 'aerial'
      ? '空中瑜珈'
      : courses.find((item) => item.id === selection?.course)?.title,
  );

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
    if (selection) void setSelection({ ...selection, level });
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

<div class="page-space">
  <BookingSteps current={1} />
  <section class="shell" aria-labelledby="choose-plan-heading">
    <h2 id="choose-plan-heading" tabindex="-1" class="sr-only" bind:this={chooseHeading}>
      選擇方案
    </h2>
    <div class="grid gap-4 lg:grid-cols-3 lg:gap-[30px]">
      {#each plans as plan (plan.id)}
        <div
          class:hidden={Boolean(selection && selection.plan !== plan.id)}
          class="h-full lg:block! [&>article]:h-full"
        >
          <PlanCard
            {plan}
            booking
            selected={selection?.plan === plan.id}
            onclick={() => choosePlan(plan.id)}
          />
        </div>
      {/each}
    </div>
    {#if selection}
      <div class="my-4 flex justify-center gap-3 text-brand lg:min-h-10">
        <button class="underline underline-offset-4 lg:hidden" type="button" onclick={reset}>
          重新選擇方案
        </button>
        <ChevronDown size={25} aria-hidden="true" />
      </div>
    {/if}
  </section>

  {#if selection}
    <div bind:this={levelBlock} tabindex="-1" class="scroll-mt-4">
      <LevelPicker selected={selection.level} onchange={chooseLevel} />
    </div>
    <div class="shell mt-8 text-center text-brand" aria-live="polite">
      <p>您選擇的是</p>
      <p class="mt-1 text-lead underline underline-offset-4">{selectionLabel(selection)}</p>
      {#if courseTitle}<p class="mt-1 text-sm">{courseTitle}</p>{/if}
    </div>
  {/if}

  <section class="shell mt-8 max-w-[445px] text-brand" aria-labelledby="reservation-notes">
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
