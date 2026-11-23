<script lang="ts">
  import { plans } from '#lib/content.ts';
  import Button from '#lib/ui/Button.svelte';
  import Photo from '#lib/ui/Photo.svelte';

  let {
    plan,
    booking = false,
    selected = false,
    priority = false,
    onclick,
  }: {
    plan: (typeof plans)[number];
    booking?: boolean;
    selected?: boolean;
    priority?: boolean;
    onclick?: () => void;
  } = $props();
</script>

<article class="plan-card {selected ? 'is-selected' : ''}">
  <div class="plan-photo">
    <Photo
      name={plan.image}
      sizes="(min-width: 1024px) 350px, (min-width: 768px) calc((100vw - 78px) / 2), calc(100vw - 30px)"
      alt=""
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : undefined}
    />
  </div>
  <div class="plan-body">
    <h3 class="text-lead">{plan.title}</h3>
    <p class="mt-1 text-lead text-rose">{plan.price}</p>
    <p class="mt-2 mb-6 text-left text-brand">分基礎、中級、高級可以選擇。{plan.description}</p>
    <Button
      href={booking ? undefined : `/reservation?plan=${plan.id}`}
      {onclick}
      class="mt-auto w-full text-xl"
      variant={booking && !selected ? 'dark' : 'primary'}
    >
      選擇課程
    </Button>
  </div>
</article>

<style>
  .plan-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    outline: 1px solid var(--color-rose);
    outline-offset: -1px;
    border-radius: var(--radius-card);
    min-height: 497px;
  }
  .plan-card.is-selected {
    outline: 3px solid var(--color-rose);
    outline-offset: -3px;
  }
  .plan-photo {
    position: relative;
    height: 243px;
  }
  .plan-photo :global(img) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .plan-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .plan-card {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      min-height: 238px;
    }
    .plan-photo {
      height: auto;
    }
    .plan-body {
      text-align: left;
      padding-block: 22px;
    }
  }
  @media (max-width: 1023px) {
    .plan-body :global(.button-dark) {
      border-color: var(--color-rose);
      background: var(--color-rose);
    }
    .plan-body :global(.button-dark:hover) {
      border-color: var(--color-brand);
      background: var(--color-brand);
    }
  }
</style>
