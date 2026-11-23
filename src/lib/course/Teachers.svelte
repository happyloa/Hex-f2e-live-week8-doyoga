<script lang="ts">
  import { teachers } from '#lib/content.ts';
  import { reveal } from '#lib/motion.ts';
  import CarouselButtons from '#lib/ui/CarouselButtons.svelte';
  let track: HTMLElement | undefined = $state();
</script>

<section
  class="teacher-section border-t border-rose"
  aria-labelledby="course-teachers"
  {@attach reveal}
>
  <div class="shell">
    <h2 id="course-teachers" class="text-center text-section">師資介紹</h2>
    <ul class="teacher-track" bind:this={track}>
      {#each teachers as teacher, index (teacher.name)}
        <li class="teacher-card {index % 2 ? 'bg-brand' : 'bg-rose'}">
          <img src="/images/shared/{teacher.image}" width="96" height="96" alt="" loading="lazy" />
          <h3 class="text-lead text-white">{teacher.name} 老師</h3>
          <p class="mt-1">教學經歷 {teacher.years} 年</p>
          <blockquote class="my-4 text-left font-light whitespace-pre-line">“{teacher.quote}”</blockquote>
          <ul class="space-y-1 text-left" role="list">
            {#each teacher.credentials as credential (credential)}<li><span aria-hidden="true">・</span>{credential}</li>{/each}
          </ul>
        </li>
      {/each}
    </ul>
    <div class="mt-2 hidden md:block"><CarouselButtons {track} label="老師" /></div>
  </div>
</section>

<style>
  .teacher-section {
    padding-block: 32px 88px;
    overflow: hidden;
  }
  .teacher-track {
    display: grid;
    gap: 71px;
    padding-top: 71px;
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
      padding-top: 72px;
    }
    .teacher-card {
      flex: 0 0 min(350px, 47%);
      scroll-snap-align: start;
    }
  }
  @media (min-width: 1024px) {
    .teacher-section {
      padding-bottom: 65px;
    }
    .teacher-track {
      padding-top: 79px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .teacher-section {
      padding-bottom: 32px;
    }
    .teacher-card {
      flex-basis: calc((100% - var(--layout-gutter) - 30px) / 2);
    }
  }
</style>
