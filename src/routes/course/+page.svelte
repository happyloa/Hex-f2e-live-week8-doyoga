<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { courseNotes, courses, aerialDescription, levels } from '#lib/content.ts';
  import CourseCard from '#lib/course/CourseCard.svelte';
  import CourseDialog from '#lib/course/CourseDialog.svelte';
  import Teachers from '#lib/course/Teachers.svelte';
  import Button from '#lib/ui/Button.svelte';
  import PageHeading from '#lib/ui/PageHeading.svelte';
  import { reveal } from '#lib/motion.ts';

  let searchInput = $state('');
  let query = $state('');
  let level = $state('');
  let selected = $state<(typeof courses)[number]>();
  let opener: HTMLElement | undefined;

  const filtered = $derived(
    courses.filter(
      (course) =>
        (!level || course.level === level) &&
        `${course.title} ${course.teacher}`.toLocaleLowerCase().includes(query),
    ),
  );

  $effect(() => {
    const id = page.url.searchParams.get('course');
    selected = courses.find((course) => course.id === id);
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

<div class="shell pt-[var(--page-space)] pb-12 lg:pb-16">
  <PageHeading title="課程介紹" />
  <section class="featured" aria-labelledby="featured-course">
    <div class="photo-frame">
      <img src="/images/aerial.webp" alt="老師在空中瑜珈課協助學員" fetchpriority="high" />
    </div>
    <div class="featured-copy">
      <h2 id="featured-course" class="text-2xl font-medium lg:text-section">
        本月限定課程 - 空中瑜珈
      </h2>
      <div class="mt-1 flex flex-wrap items-center gap-2 text-brand">
        <p>授課老師：Carol Tang</p>
        <span class="course-chip">60 min</span>
      </div>
      <p class="my-4 text-brand">
        {#each aerialDescription as line (line)}{line}<br />{/each}
      </p>
      <Button href="/reservation?plan=first&level=basic&course=aerial" class="text-xl">
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

<section class="shell catalog py-12 lg:py-[54px]" aria-label="課程列表">
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
    <ul class="space-y-2">
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
    grid-template-columns: minmax(0, 1fr) minmax(101px, auto);
    gap: 8px;
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
      grid-template-columns: minmax(260px, 348px) auto;
      justify-content: start;
    }
    .course-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .course-notes {
      max-width: 400px;
      margin-inline: auto;
    }
  }
  @media (min-width: 1024px) {
    .featured {
      width: min(920px, 100%);
      margin-inline: auto;
      grid-template-columns: 540fr 350fr;
    }
    .catalog {
      grid-template-columns: minmax(0, 825fr) minmax(0, 255fr);
      gap: 30px;
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
</style>
