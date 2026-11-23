<script lang="ts">
  import { plans } from '#lib/content.ts';
  import Button from '#lib/ui/Button.svelte';

  let {
    plan,
    booking = false,
    selected = false,
    onclick,
  }: {
    plan: (typeof plans)[number];
    booking?: boolean;
    selected?: boolean;
    onclick?: () => void;
  } = $props();
</script>

<article class="plan-card {selected ? 'is-selected' : ''}">
  <img src="/images/{plan.image}.webp" class="plan-photo" alt="" loading="lazy" />
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
    border: 1px solid var(--color-rose);
    border-radius: var(--radius-card);
  }
  .plan-card.is-selected {
    outline: 3px solid var(--color-rose);
    outline-offset: -3px;
  }
  .plan-photo {
    width: 100%;
    height: 243px;
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
      flex-direction: row;
    }
    .plan-photo {
      width: 50%;
      min-height: 238px;
      height: auto;
    }
    .plan-body {
      text-align: left;
    }
  }
</style>
