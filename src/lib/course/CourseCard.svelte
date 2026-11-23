<script lang="ts">
  import type { Course } from '#lib/content.ts';
  let { course, onclick }: { course: Course; onclick: (event: MouseEvent) => void } = $props();
</script>

<article class="relative">
  <a
    class="course-card photo-frame block"
    href="/course?course={course.id}"
    {onclick}
    aria-label="查看{course.title}課程詳情"
  >
    <img
      src="/images/{course.image}.webp"
      alt=""
      loading="lazy"
      style:object-position={course.position}
    />
    <div class="course-label">
      <h3 class="text-2xl font-medium text-white lg:text-section">{course.title}</h3>
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
  .course-card img {
    border-radius: var(--radius-card);
    transition: filter 260ms;
  }
  .course-card:hover img {
    transform: none;
    filter: brightness(0.88);
  }
  .course-label {
    position: absolute;
    inset: auto 0 0;
    padding: 40px 24px 22px;
    color: white;
    background: linear-gradient(transparent, rgb(0 0 0 / 64%));
    border-radius: 0 0 var(--radius-card) var(--radius-card);
  }
</style>
