<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { aerialDescription, courseNotes, courses, featuredCourse, findCourse, levels } from '#lib/content.ts';
  import CourseCard from '#lib/course/CourseCard.svelte';
  import CourseDialog from '#lib/course/CourseDialog.svelte';
  import Teachers from '#lib/course/Teachers.svelte';
  import { selectionHref } from '#lib/reservation/booking.svelte.ts';
  import Button from '#lib/ui/Button.svelte';
  import PageHeading from '#lib/ui/PageHeading.svelte';
  import Photo from '#lib/ui/Photo.svelte';
  import { reveal } from '#lib/motion.ts';

  let searchInput = $state('');
  let query = $state('');
  let level = $state('');
  let courseId = $state<string | null>(null);
  let opener: HTMLElement | undefined;
  const selected = $derived(findCourse(courseId));
  const unknownCourse = $derived(courseId !== null && !selected);

  const filtered = $derived(
    (query ? [...courses, featuredCourse] : courses).filter(
      (course) =>
        (!level || course.level === level) &&
        `${course.title} ${course.teacher}`.toLocaleLowerCase().includes(query),
    ),
  );

  $effect(() => {
    courseId = page.url.searchParams.get('course');
  });

  function search(event: SubmitEvent) {
    event.preventDefault();
    query = searchInput.trim().toLocaleLowerCase();
  }

  function openCourse(event: MouseEvent) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)
      return;
    event.preventDefault();
    const anchor = event.currentTarget as HTMLAnchorElement;
    opener = anchor;
    void goto(anchor.href, { reset: false });
  }

  function closeCourse() {
    const trigger = opener;
    opener = undefined;
    if (page.url.searchParams.has('course')) {
      if (trigger) history.back();
      else void goto('/course', { reset: false, replace: true });
    }
    trigger?.focus({ preventScroll: true });
  }
</script>

<svelte:head>
  <title>課程介紹｜DOYOGA</title><meta
    name="description"
    content="認識 DOYOGA 的瑜珈課程、授課老師及本月限定的空中瑜珈。"
  />
</svelte:head>

<div class="shell pt-[var(--page-space)] pb-12 md:pb-18 lg:pb-16">
  <PageHeading title="課程介紹" class="font-normal max-lg:mb-6" />
  {#if unknownCourse}
    <div class="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-card bg-sand px-4 py-3 text-brand">
      <p role="status">找不到這堂課程，可以從下方查看其他課程。</p>
      <a href="/course" class="underline underline-offset-4">查看全部課程</a>
    </div>
  {/if}
  <section class="featured" aria-labelledby="featured-course">
    <div class="photo-frame">
      <Photo
        name={featuredCourse.image}
        sizes="(min-width: 1024px) 540px, (min-width: 768px) calc((100vw - 108px) / 2), calc(100vw - 30px)"
        alt="老師在空中瑜珈課協助學員"
        fetchpriority="high"
      />
    </div>
    <div class="featured-copy">
      <h2 id="featured-course" class="text-section font-medium">
        本月限定課程 - {featuredCourse.title}
      </h2>
      <div class="mt-1 flex flex-wrap items-center gap-2 text-brand">
        <p>授課老師：{featuredCourse.teacher}</p>
        <span class="course-chip">60 min</span>
      </div>
      <p class="featured-description mt-[13px] mb-4 text-brand">
        {#each aerialDescription as line (line)}{line}<br />{/each}
      </p>
      <Button
        href={selectionHref('/reservation', {
          plan: 'first',
          level: featuredCourse.level,
          course: featuredCourse.id,
        })}
        class="text-xl"
      >
        立即預約
      </Button>
    </div>
  </section>
</div>

<div class="bg-rose py-5">
  <form class="shell search-form" role="search" onsubmit={search}>
    <label for="search-course" class="sr-only">搜尋課程</label>
    <div class="flex min-w-0">
      <input
        id="search-course"
        class="control min-w-0 rounded-r-none! border-white!"
        type="search"
        placeholder="請輸入要搜尋的課程"
        bind:value={searchInput}
        oninput={() => {
          if (!searchInput) query = '';
        }}
      />
      <button
        class="shrink-0 rounded-r bg-brand px-2 text-white hover:bg-brand-dark sm:px-3"
        type="submit"
      >
        搜尋
      </button>
    </div>
    <label for="filter-course" class="sr-only">課程類型</label>
    <select class="control filter" id="filter-course" bind:value={level}>
      <option value="">全部課程</option>
      {#each levels as item (item.id)}<option value={item.id}>{item.name}課程</option>{/each}
    </select>
  </form>
</div>

<section class="shell catalog pt-[46px] pb-12 md:pt-[54px]" aria-label="課程列表">
  <div>
    <p class="sr-only" aria-live="polite">找到 {filtered.length} 堂課程</p>
    {#if filtered.length}
      <div class="course-grid">
        {#each filtered as course (course.id)}<CourseCard {course} onclick={openCourse} />{/each}
      </div>
    {:else}
      <div class="rounded-card bg-sand p-8 text-center text-brand">
        <p class="text-lead">找不到符合條件的課程</p>
        <p class="mb-4 mt-1">試試其他關鍵字，或查看全部課程。</p>
        <Button
          variant="outline"
          onclick={() => {
            searchInput = '';
            query = '';
            level = '';
          }}
        >
          清除篩選
        </Button>
      </div>
    {/if}
  </div>
  <aside class="course-notes text-brand" {@attach reveal}>
    <h2 class="mb-2 text-lead">DOYOGA 上課須知：</h2>
    <ul class="space-y-1">
      {#each courseNotes as note (note)}<li>{note}</li>{/each}
    </ul>
  </aside>
</section>

<Teachers />
<CourseDialog course={selected} onclose={closeCourse} />

<style>
  .featured {
    display: grid;
    gap: 8px;
  }
  .featured > .photo-frame {
    height: 218px;
  }
  .search-form {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 106px;
    gap: 8px;
  }
  .search-form .control {
    height: 36px;
    min-height: 36px;
    padding-block: 4px;
    line-height: 24px;
  }
  .filter {
    width: auto;
  }
  .catalog {
    display: grid;
    gap: 32px;
  }
  .course-grid {
    display: grid;
    gap: 30px;
  }
  @media (min-width: 768px) {
    .featured {
      grid-template-columns: 1fr 1fr;
      gap: 30px;
    }
    .featured > .photo-frame {
      height: 341px;
    }
    .search-form {
      grid-template-columns: 270px 106px;
      justify-content: start;
    }
    .course-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .course-notes {
      max-width: 330px;
      margin-inline: auto;
    }
  }
  @media (min-width: 1024px) {
    .course-notes {
      padding-top: 2px;
    }
    .search-form {
      grid-template-columns: 350px 106px;
    }
    .featured {
      width: min(920px, 100%);
      margin-inline: auto;
      grid-template-columns: 540fr 350fr;
    }
    .catalog {
      grid-template-columns: minmax(0, 825fr) minmax(0, 255fr);
      gap: 30px;
      padding-bottom: 72px;
    }
    .course-grid {
      grid-template-columns: minmax(0, 350fr) minmax(0, 65fr) minmax(0, 350fr);
    }
    .course-grid > :global(:nth-child(4n + 1)) {
      grid-column: 1 / 3;
    }
    .course-grid > :global(:nth-child(4n + 2)) {
      grid-column: 3;
    }
    .course-grid > :global(:nth-child(4n + 3)) {
      grid-column: 1;
    }
    .course-grid > :global(:nth-child(4n + 4)) {
      grid-column: 2 / 4;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .featured-description {
      width: calc(100% + 20px);
      max-width: 350px;
    }
    .course-grid {
      row-gap: 44px;
    }
    .catalog {
      row-gap: 40px;
      padding-bottom: 72px;
    }
  }
</style>
