<script lang="ts">
  import type { Course } from '#lib/content.ts';
  import Photo from '#lib/ui/Photo.svelte';
  let { course, onclick }: { course: Course; onclick: (event: MouseEvent) => void } = $props();
</script>

<article class="relative" data-course={course.id}>
  <a
    class="course-card photo-frame block"
    href="/course?course={course.id}"
    {onclick}
    aria-label="查看{course.title}課程詳情"
  >
    <Photo
      name={course.image}
      sizes="(min-width: 1206px) 445px, (min-width: 1024px) 39vw, (min-width: 768px) calc((100vw - 108px) / 2), calc(100vw - 30px)"
      alt=""
      loading="lazy"
    />
    <div class="course-label">
      <h3 class="text-section font-medium text-white">{course.title}</h3>
      <p>授課老師：{course.teacher}</p>
    </div>
    <span class="course-chip absolute top-[-10px] left-6">60 min</span>
  </a>
</article>

<style>
  .course-card {
    height: 196px;
    overflow: visible;
  }
  .course-card :global(img) {
    border-radius: var(--radius-card);
    transition: filter 260ms;
  }
  .course-card:hover :global(img) {
    transform: none;
    filter: brightness(0.88);
  }
  .course-label {
    position: absolute;
    inset: auto 0 0;
    padding: 40px 24px 24px;
    color: white;
    text-shadow: 0 1px 2px rgb(0 0 0 / 35%);
    border-radius: 0 0 var(--radius-card) var(--radius-card);
  }
  [data-course='yin-yang'] :global(img) {
    object-position: center 37%;
  }
  @media (max-width: 767px) {
    [data-course='basic'] :global(img),
    [data-course='hatha'] :global(img) {
      object-position: center 94%;
    }
  }
  @media (min-width: 1024px) {
    [data-course='basic'] :global(img) {
      object-position: center 69%;
    }
    [data-course='hatha'] :global(img) {
      object-position: center 89%;
    }
    [data-course='arco'] :global(img) {
      object-position: center 84%;
    }
  }
</style>
