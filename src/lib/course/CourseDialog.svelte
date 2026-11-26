<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { onMount } from 'svelte';
  import type { Course } from '#lib/content.ts';
  import { selectionHref } from '#lib/reservation/booking.svelte.ts';
  import Button from '#lib/ui/Button.svelte';
  import Photo from '#lib/ui/Photo.svelte';

  let { course, onclose }: { course: Course | undefined; onclose: () => void } = $props();
  let dialog: HTMLDialogElement;
  const isBasic = $derived(course?.id === 'basic');
  const basicDetail = [
    '使用掛布懸掛在半空，進行哈達瑜珈體位法練習',
    '藉由地心引力的重力原理，鍛鍊核心肌群，舒緩脊椎壓力。',
    '訓練身體協調性，深層放鬆身體。',
    '課堂裡老師會視同學狀況安排教導倒立動作，對於不敢嘗試倒立的同學來說，藉由掛布的支持與保護，加上老師細心指導，讓同學能更快掌握。',
  ];

  $effect(() => {
    if (course && !dialog.open) dialog.showModal();
    if (!course && dialog.open) dialog.close();
  });

  onMount(() => {
    if ('closedBy' in HTMLDialogElement.prototype) return;

    const element = dialog;
    function dismissOnBackdrop(event: MouseEvent) {
      if (event.target !== element) return;

      const { top, right, bottom, left } = element.getBoundingClientRect();
      const { clientX, clientY } = event;
      if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
        element.close();
      }
    }

    element.addEventListener('click', dismissOnBackdrop);
    return () => element.removeEventListener('click', dismissOnBackdrop);
  });
</script>

<dialog
  bind:this={dialog}
  class:basic={isBasic}
  aria-labelledby="course-dialog-title"
  closedby="any"
  onclose={() => {
    if (course) onclose();
  }}
>
  {#if course}
    <div class="dialog-body">
      <form method="dialog" class="absolute right-3 top-3">
        <button
          type="submit"
          class="close-course icon-button text-white! hover:bg-brand!"
          aria-label="關閉課程詳情"
        >
          <X size={24} />
        </button>
      </form>
      <div class="photo-frame dialog-photo">
        <Photo
          name={isBasic ? 'aerial' : course.image}
          sizes="(min-width: 1024px) 418px, (min-width: 768px) 264px, 165px"
          alt=""
        />
      </div>
      <div class="dialog-copy">
        <h2 class="text-section font-medium text-white" id="course-dialog-title">{course.title}</h2>
        <div class="my-1 flex flex-wrap items-center gap-2">
          <p>授課老師：{course.teacher}</p>
          <span class="course-chip bg-brand!">60 min</span>
        </div>
        <p class="dialog-description mb-4">
          {#if isBasic}
            {basicDetail[0]}<br class="hidden md:block" /><span class="md:hidden">，</span>{basicDetail[1]}<br />
            {basicDetail[2]}<br />
            {basicDetail[3]}
          {:else}
            {course.detail}
          {/if}
        </p>
        <Button
          href={selectionHref('/reservation', { plan: 'first', level: course.level, course: course.id })}
          variant="light"
          class="text-xl"
        >
          立即預約
        </Button>
      </div>
    </div>
  {/if}
</dialog>

<style>
  dialog {
    margin: auto;
    max-height: min(100dvh - 30px, 760px);
    width: min(920px, 100% - 30px);
    max-width: none;
    border-radius: var(--radius-card);
    background: var(--color-rose);
    color: white;
  }
  dialog::backdrop {
    background: var(--color-paper);
  }
  .dialog-body {
    position: relative;
    display: grid;
    gap: 16px;
    align-content: start;
    padding: 32px 16px 24px;
  }
  .dialog-photo {
    width: min(165px, 70%);
    aspect-ratio: 1;
    margin-inline: auto;
  }
  .dialog-description {
    margin-top: 9px;
  }
  .basic .dialog-body {
    min-height: 582px;
  }
  .basic .close-course {
    opacity: 0;
  }
  .basic .close-course:focus-visible,
  .basic .close-course:hover {
    opacity: 1;
  }
  @media (prefers-reduced-motion: no-preference) {
    dialog[open] {
      animation: appear 300ms ease-out both;
    }
  }
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (min-width: 768px) {
    dialog {
      width: min(920px, 100% - 78px);
    }
    dialog::backdrop {
      background: rgb(142 123 123 / 30%);
    }
    .dialog-description {
      margin-top: 13px;
    }
    .dialog-body {
      grid-template-columns: minmax(0, 264fr) minmax(0, 358fr);
      align-items: center;
      gap: 20px;
      padding: 64px 24px;
    }
    .basic .dialog-body {
      min-height: 546px;
    }
    .dialog-photo {
      width: 100%;
      height: 418px;
      aspect-ratio: auto;
    }
  }
  @media (min-width: 1024px) {
    dialog::backdrop {
      background: transparent;
    }
    .dialog-body {
      grid-template-columns: minmax(0, 418fr) minmax(0, 350fr);
      padding: 64px 56px;
      gap: 40px;
    }
    .basic .dialog-copy {
      align-self: start;
      margin-top: 50px;
    }
  }
</style>
