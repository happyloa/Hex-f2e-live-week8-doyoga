<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  let { track, label }: { track: HTMLElement | undefined; label: string } = $props();

  function move(direction: number) {
    if (!track) return;
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    if (direction === 1 && atEnd) track.scrollTo({ left: 0, behavior });
    else if (direction === -1 && track.scrollLeft < 2)
      track.scrollTo({ left: track.scrollWidth, behavior });
    else track.scrollBy({ left: direction * track.clientWidth * 0.92, behavior });
  }
</script>

<div class="flex justify-between gap-2">
  <button class="icon-button" type="button" aria-label="上一組{label}" onclick={() => move(-1)}>
    <ArrowLeft size={26} />
  </button>
  <button class="icon-button" type="button" aria-label="下一組{label}" onclick={() => move(1)}>
    <ArrowRight size={26} />
  </button>
</div>
