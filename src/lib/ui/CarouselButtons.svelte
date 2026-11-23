<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  let { track, label }: { track: HTMLElement | undefined; label: string } = $props();

  let atStart = $state(true);
  let atEnd = $state(false);
  let pending: number | undefined;

  $effect(() => {
    const element = track;
    if (!element) return;
    let settleTimer: ReturnType<typeof setTimeout>;

    function updateBounds() {
      if (!element) return;
      atStart = element.scrollLeft <= 2;
      atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
    }

    function finish() {
      clearTimeout(settleTimer);
      pending = undefined;
      updateBounds();
    }

    function onScroll() {
      updateBounds();
      clearTimeout(settleTimer);
      settleTimer = setTimeout(finish, 160);
    }

    const observer = new ResizeObserver(finish);
    observer.observe(element);
    element.addEventListener('scroll', onScroll, { passive: true });
    element.addEventListener('scrollend', finish);
    element.addEventListener('pointerdown', finish, { passive: true });
    element.addEventListener('wheel', finish, { passive: true });
    finish();

    return () => {
      observer.disconnect();
      clearTimeout(settleTimer);
      element.removeEventListener('scroll', onScroll);
      element.removeEventListener('scrollend', finish);
      element.removeEventListener('pointerdown', finish);
      element.removeEventListener('wheel', finish);
      pending = undefined;
    };
  });

  function move(direction: -1 | 1) {
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 2) return;

    const origin = track.getBoundingClientRect().left;
    const current = pending ?? track.scrollLeft;
    const positions = [0, max];
    for (const child of track.children) {
      if (child.tagName === 'LEGEND') continue;
      positions.push(
        Math.min(max, Math.max(0, child.getBoundingClientRect().left - origin + track.scrollLeft)),
      );
    }
    positions.sort((a, b) => a - b);
    const next =
      direction === 1
        ? positions.find((position) => position > current + 2)
        : positions.findLast((position) => position < current - 2);
    if (next === undefined) return;

    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    pending = behavior === 'smooth' ? next : undefined;
    track.scrollTo({ left: next, behavior });
  }
</script>

<div class="flex justify-between gap-2">
  <button
    class="icon-button"
    type="button"
    aria-label="上一組{label}"
    aria-disabled={atStart}
    onclick={() => move(-1)}
  >
    <ArrowLeft size={26} />
  </button>
  <button
    class="icon-button"
    type="button"
    aria-label="下一組{label}"
    aria-disabled={atEnd}
    onclick={() => move(1)}
  >
    <ArrowRight size={26} />
  </button>
</div>

<style>
  button[aria-disabled='true'] {
    opacity: 0.45;
    cursor: default;
  }
</style>
