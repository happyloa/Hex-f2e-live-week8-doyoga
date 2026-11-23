<script lang="ts">
  import { teachers } from '#lib/content.ts';
  import { reveal } from '#lib/motion.ts';
  import SectionHeading from '#lib/ui/SectionHeading.svelte';
  import CarouselButtons from '#lib/ui/CarouselButtons.svelte';
  let track: HTMLElement | undefined = $state();
</script>

<section
  class="teacher-section border-t border-rose"
  aria-labelledby="course-teachers"
  {@attach reveal}
>
  <div class="shell">
    <SectionHeading id="course-teachers" title="師資介紹" />
    <ul class="teacher-track" bind:this={track}>
      {#each teachers as teacher, index (teacher.name)}
        <li class="teacher-card {index % 2 ? 'bg-brand' : 'bg-rose'}">
          <img src="/images/{teacher.image}" width="96" height="96" alt="" loading="lazy" />
          <h3 class="text-lead text-white">{teacher.name} 老師</h3>
          <p class="mt-1">教學經歷 {teacher.years} 年</p>
          <blockquote class="my-4 text-left">「{teacher.quote}」</blockquote>
          <ul class="list-disc space-y-1 pl-5 text-left">
            {#each teacher.credentials as credential (credential)}<li>{credential}</li>{/each}
          </ul>
        </li>
      {/each}
    </ul>
    <div class="mt-2 hidden md:block"><CarouselButtons {track} label="老師" /></div>
  </div>
</section>

<style>
  .teacher-section {
    padding-block: 32px 72px;
    overflow: hidden;
  }
  .teacher-track {
    display: grid;
    gap: 64px;
    padding-top: 75px;
  }
  .teacher-card {
    position: relative;
    min-height: 418px;
    border-radius: var(--radius-card);
    padding: 56px 24px 24px;
    text-align: center;
    color: white;
  }
  .teacher-card img {
    position: absolute;
    top: -48px;
    left: 50%;
    translate: -50%;
    border-radius: 50%;
  }
  @media (min-width: 768px) {
    .teacher-track {
      display: flex;
      gap: 30px;
      width: calc(100% + max(var(--layout-gutter), (100vw - var(--layout-width)) / 2));
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .teacher-card {
      flex: 0 0 min(350px, 47%);
      scroll-snap-align: start;
    }
  }
</style>
