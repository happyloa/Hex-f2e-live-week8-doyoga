<script lang="ts">
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import { levels } from '#lib/content.ts';
  import type { LevelId } from '#lib/content.ts';
  import CarouselButtons from '#lib/ui/CarouselButtons.svelte';
  let { selected, onchange }: { selected: LevelId; onchange: (id: LevelId) => void } = $props();
  let track: HTMLElement | undefined = $state();
</script>

<section class="level-section bg-brand py-8 text-white" aria-labelledby="level-heading">
  <div class="shell">
    <h2 id="level-heading" class="mb-8 text-center text-section font-medium text-white">
      選擇課程階級
    </h2>
    <fieldset class="level-track" bind:this={track}>
      <legend class="sr-only">課程階級</legend>
      {#each levels as level (level.id)}
        <label class="level-card" class:active={selected === level.id}>
          <input
            type="radio"
            class="sr-only"
            name="level"
            value={level.id}
            checked={selected === level.id}
            onchange={() => onchange(level.id)}
          />
          <span class="flex items-start justify-between gap-1">
            <span class="text-[clamp(1.2rem,2vw,1.75rem)] font-medium">
              {level.name}
              {level.english}
            </span>
            <CircleCheck size={32} class="check shrink-0" aria-hidden="true" />
          </span>
          <span class="mb-3 mt-1 flex flex-wrap items-center gap-2">
            {level.courses}<span class="course-chip bg-brand!">60 min</span>
          </span>
          <span class="flex flex-col gap-1">
            {#each level.points as point (point)}<span>・{point}</span>{/each}
          </span>
        </label>
      {/each}
    </fieldset>
    <div class="mt-2 hidden md:block lg:hidden"><CarouselButtons {track} label="階級" /></div>
  </div>
</section>

<style>
  .level-section {
    overflow: hidden;
  }
  .level-track {
    display: grid;
    min-width: 0;
    gap: 16px;
  }
  .level-card {
    display: block;
    min-width: 0;
    padding: 20px;
    border: 3px solid transparent;
    border-radius: var(--radius-card);
    background: var(--color-rose);
    cursor: pointer;
    box-shadow: var(--shadow-card);
    transition: border-color 200ms;
  }
  .level-card:hover,
  .level-card:has(:focus-visible),
  .level-card.active {
    border-color: white;
  }
  .level-card :global(.check) {
    opacity: 0.45;
  }
  .level-card.active :global(.check) {
    opacity: 1;
  }
  .level-section :global(.icon-button) {
    color: white;
  }
  .level-section :global(.icon-button:hover) {
    color: var(--color-brand-dark);
  }
  @media (min-width: 768px) {
    .level-track {
      display: flex;
      gap: 30px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .level-card {
      flex: 0 0 min(350px, 47%);
      scroll-snap-align: start;
    }
  }
  @media (min-width: 1024px) {
    .level-track {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      overflow: visible;
      padding-inline: 16px;
    }
  }
</style>
