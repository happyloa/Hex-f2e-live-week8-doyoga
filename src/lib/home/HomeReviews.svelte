<script lang="ts">
  import Star from '@lucide/svelte/icons/star';
  import { testimonials } from '#lib/content.ts';
  import { reveal } from '#lib/motion.ts';
  import CarouselButtons from '#lib/ui/CarouselButtons.svelte';
  import SectionHeading from '#lib/ui/SectionHeading.svelte';
  let track: HTMLElement | undefined = $state();
</script>

<section class="bg-sand pt-8 pb-12 md:pt-10 md:pb-4 lg:pb-16" aria-labelledby="reviews-title" {@attach reveal}>
  <div class="shell">
    <SectionHeading title="聽聽他們怎麼說" id="reviews-title" />
    <ul class="review-track mt-6 md:mt-8" bind:this={track}>
      {#each testimonials as [name, quote, avatar] (name)}
        <li class="flex items-center gap-5 rounded-card bg-white p-4 text-brand">
          <img src="/images/home/{avatar}" width="60" height="60" alt="" loading="lazy" />
          <div>
            <div class="flex flex-wrap items-baseline gap-x-2">
              <h3>{name}</h3>
              <time class="text-sm" datetime="2020-10-17">Oct 17 2020</time>
            </div>
            <p class="my-2 flex gap-1 text-rose" aria-label="5 顆星">
              {#each Array(5) as _, index (index)}<Star
                  size={16}
                  fill="currentColor"
                  aria-hidden="true"
                />{/each}
            </p>
            <p>{quote}</p>
          </div>
        </li>
      {/each}
    </ul>
    <div class="mt-2 min-[1024px]:hidden"><CarouselButtons {track} label="心得" /></div>
  </div>
</section>

<style>
  .review-track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    grid-template-rows: repeat(3, auto);
    gap: 8px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }
  li {
    min-height: 116px;
    scroll-snap-align: start;
  }
  @media (min-width: 768px) {
    .review-track {
      grid-template-rows: repeat(2, auto);
      grid-auto-columns: calc((100% - 30px) / 2);
      gap: 16px 30px;
    }
    li:nth-child(2) {
      grid-row: 1;
      grid-column: 2;
    }
    li:nth-child(3) {
      grid-row: 1;
      grid-column: 3;
    }
    li:nth-child(4) {
      grid-row: 2;
      grid-column: 1;
    }
    li:nth-child(5) {
      grid-row: 2;
      grid-column: 2;
    }
    li:nth-child(6) {
      grid-row: 2;
      grid-column: 3;
    }
  }
  @media (min-width: 1024px) {
    .review-track {
      grid-auto-columns: calc((100% - 60px) / 3);
    }
  }
</style>
