<script lang="ts">
  import PageHeading from '#lib/ui/PageHeading.svelte';
  let { current, back, onreset }: { current: 1 | 2 | 3; back?: string; onreset?: () => void } = $props();
  const steps = ['選擇方案', '填寫資料', '完成預約'];
</script>

<div class="shell">
  <PageHeading title="立即預約" class="mb-6 font-normal md:mb-4" />
  <ol class="steps" class:details={current === 2} aria-label="預約進度">
    {#each steps as step, index (step)}
      <li aria-current={index + 1 === current ? 'step' : undefined}>
        {#if index === 0 && back}
          <a href={back}>{step}</a>
        {:else if index === 0 && onreset}
          <button type="button" aria-label="重新選擇方案" onclick={onreset}>{step}</button>
        {:else}
          <span>{step}</span>
        {/if}
      </li>
    {/each}
  </ol>
</div>

<style>
  .steps {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    max-width: 540px;
    margin: 0 auto 32px;
    gap: 16px;
    text-align: center;
    color: var(--color-brand);
  }
  li {
    border-radius: var(--radius-card);
    background: var(--color-sand);
  }
  li[aria-current] {
    background: var(--color-brand);
    color: white;
  }
  a,
  button,
  span {
    display: block;
    border-radius: inherit;
    padding: 12px 4px;
  }
  button {
    width: 100%;
  }
  button:hover {
    background: var(--color-brand-dark);
  }
  a:hover {
    background: var(--color-line);
  }
  @media (min-width: 768px) {
    .steps {
      gap: 30px;
      max-width: 330px;
    }
    .steps.details {
      margin-bottom: 48px;
    }
  }
  @media (min-width: 1024px) {
    .steps {
      max-width: 540px;
    }
  }
</style>
