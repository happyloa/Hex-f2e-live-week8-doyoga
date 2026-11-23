<script lang="ts">
  import { courses, teachers } from '#lib/content.ts';
  import { reveal } from '#lib/motion.ts';
  import TextLink from '#lib/ui/TextLink.svelte';
  import CarouselButtons from '#lib/ui/CarouselButtons.svelte';
  import Photo from '#lib/ui/Photo.svelte';
  let track: HTMLElement | undefined = $state();
  const homeTeachers = [teachers[0], teachers[1], teachers[3]];
</script>

<section class="section-space teacher-section bg-sand" aria-labelledby="home-teachers" {@attach reveal}>
  <div class="shell split teacher-split">
    <div class="photo-frame hidden lg:block">
      <Photo name="aerial" sizes="540px" alt="老師在瑜珈課中協助學員調整動作" loading="lazy" />
    </div>
    <div>
      <header class="teacher-header">
        <h2 id="home-teachers" class="text-section font-medium">頂尖師資、專業教學</h2>
        <p class="mt-1 text-lead text-brand">
          強力師資，經歷豐富，協會認證。運用引導式教學，針對不同需求的人制定專屬課程。
        </p>
      </header>
      <ul class="teacher-list mt-6 grid gap-4">
        {#each homeTeachers as teacher, index (teacher.name)}
          <li class="teacher-teaser rounded-card bg-white" class:featured={index === 0}>
            <img
              src="/images/shared/{teacher.image}"
              width="94"
              height="94"
              alt=""
              loading="lazy"
            />
            <div>
              <h3 class="text-lead text-ink">{teacher.name} 老師</h3>
              <p class="mt-1">教學經歷 10 年</p>
              {#if index === 0}<p class="mt-1">
                  瑜珈讓我重新認識自己的身體，也讓我有了不一樣的人生。
                </p>{/if}
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<section class="section-space space-section" aria-labelledby="home-space" {@attach reveal}>
  <div class="shell split space-split">
    <div class="space-photos">
      <div class="photo-frame space-main">
        <Photo
          name="practice-room"
          sizes="(min-width: 1024px) 350px, (min-width: 768px) 28vw, 45vw"
          alt="瑜珈教室中的練習"
          loading="lazy"
        />
      </div>
      <div class="photo-frame">
        <Photo
          name="lounge"
          sizes="(min-width: 1024px) 160px, (min-width: 768px) 12vw, 45vw"
          alt="休息區"
          loading="lazy"
        />
      </div>
      <div class="photo-frame space-extra">
        <Photo
          name="equipment"
          sizes="(min-width: 1024px) 160px, 12vw"
          alt="瑜珈器材"
          loading="lazy"
        />
      </div>
    </div>
    <div class="split-copy space-copy">
      <h2 id="home-space" class="text-section font-medium">舒適空間、靜心放鬆</h2>
      <p class="mt-1 mb-6 text-lead text-brand">
        我們都渴望平靜安穩的生活，擁有一處能夠靜心的角落，安撫每天繁雜忙碌的心。
      </p>
      <TextLink href="/surroundings" label="環境介紹" />
    </div>
  </div>
</section>

<section
  class="section-space bg-sand preview-section"
  aria-labelledby="home-courses"
  {@attach reveal}
>
  <div class="shell preview-layout">
    <div class="split-copy">
      <h2 id="home-courses" class="text-section font-medium">精心設計、課程多元</h2>
      <p class="mt-1 mb-6 text-lead text-brand">
        教師帶領多元課程，釋放壓力，與身心常見的緊繃不適溫柔和解。
      </p>
      <TextLink href="/course" label="課程介紹" />
    </div>
    <div class="preview-gallery">
      <ul class="preview-track" bind:this={track}>
        {#each courses.slice(0, 4) as course (course.id)}
          <li>
            <a
              class="photo-frame block"
              href="/course?course={course.id}"
              aria-label={course.title}
            >
              <Photo
                name={course.image}
                sizes="(min-width: 1024px) 445px, (min-width: 768px) 21vw, 45vw"
                alt=""
                loading="lazy"
              />
            </a>
          </li>
        {/each}
      </ul>
      <div class="preview-controls"><CarouselButtons {track} label="課程" /></div>
    </div>
  </div>
</section>

<style>
  .split {
    display: grid;
    gap: 30px;
  }
  .teacher-teaser {
    display: flex;
    align-items: center;
    gap: 20px;
    min-height: 86px;
    padding: 16px;
  }
  .teacher-teaser img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  .teacher-teaser.featured img {
    width: 64px;
    height: 64px;
  }
  .space-photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  .space-photos > div {
    height: 210px;
  }
  .space-extra {
    display: none;
  }
  .space-extra :global(img) {
    object-position: center 56%;
  }
  .preview-layout {
    display: grid;
    gap: 16px;
    align-items: center;
  }
  .preview-track {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 15px;
  }
  .preview-track a {
    aspect-ratio: 1;
  }
  .preview-controls {
    display: none;
  }
  @media (max-width: 767px) {
    .space-main :global(img) {
      object-position: 37% center;
    }
    .teacher-section {
      padding-block: 32px 48px;
    }
    .teacher-header h2 {
      text-align: center;
    }
    .space-section,
    .preview-section {
      padding-block: 48px;
    }
    .space-split,
    .preview-layout {
      gap: 8px;
    }
    .space-copy {
      grid-row: 1;
    }
  }
  @media (min-width: 768px) {
    .teacher-split {
      width: min(450px, calc(100% - 78px));
    }
    .teacher-teaser {
      min-height: 116px;
      padding: 24px;
    }
    .teacher-teaser img {
      width: 68px;
      height: 68px;
    }
    .teacher-teaser.featured img {
      width: 94px;
      height: 94px;
    }
    .space-split,
    .preview-layout {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 30px;
    }
    .space-photos {
      grid-template-columns: 210fr 90fr;
      gap: 30px;
    }
    .space-photos > div {
      height: 117px;
    }
    .space-photos .space-main {
      grid-row: span 2;
      height: 264px;
    }
    .space-extra {
      display: block;
    }
    .preview-track {
      gap: 30px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .teacher-section {
      padding-top: 32px;
    }
    .space-section,
    .preview-section {
      padding-block: 56px;
    }
    .space-photos {
      row-gap: 32px;
    }
    .space-photos .space-main {
      height: 266px;
    }
    .preview-track {
      row-gap: 24px;
    }
    .teacher-header h2 {
      text-align: center;
    }
    .teacher-list {
      width: min(570px, calc(100% + (100vw - 528px) / 2));
    }
    .teacher-teaser.featured {
      min-height: 174px;
      margin-left: -60px;
    }
  }
  @media (min-width: 1024px) {
    .teacher-split {
      width: min(var(--layout-width), calc(100% - 2 * var(--layout-gutter)));
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .teacher-split > .photo-frame {
      height: 628px;
    }
    .teacher-teaser {
      gap: 20px;
      padding-inline: 32px;
    }
    .teacher-teaser.featured {
      margin-left: -95px;
      min-height: 174px;
    }
    .space-photos {
      grid-template-columns: 350fr 160fr;
    }
    .space-photos > div {
      height: 207px;
    }
    .space-photos .space-main {
      height: 444px;
    }
    .preview-section {
      overflow: hidden;
    }
    .preview-layout > .split-copy {
      padding-inline: 17.6% 10%;
    }
    .preview-gallery {
      min-width: 0;
      width: calc(100% + max(var(--layout-gutter), (100vw - var(--layout-width)) / 2));
    }
    .preview-track {
      display: flex;
      gap: 30px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .preview-track li {
      flex: 0 0 min(445px, 76%);
      scroll-snap-align: start;
    }
    .preview-controls {
      display: block;
      width: min(445px, 76%);
      position: relative;
      margin-bottom: -40px;
    }
  }
</style>
