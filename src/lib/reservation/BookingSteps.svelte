<script lang="ts">
  import PageHeading from '#lib/ui/PageHeading.svelte';
  let { current, back }: { current: 1 | 2 | 3; back?: string } = $props();
  const steps = ['選擇方案', '填寫資料', '完成預約'];
</script>

<div class="shell">
  <PageHeading title="立即預約" />
  <ol class="steps" aria-label="預約進度">
    {#each steps as step, index (step)}
      <li aria-current={index + 1 === current ? 'step' : undefined}>
        {#if index === 0 && back}<a href={back}>{step}</a>{:else}<span>{step}</span>{/if}
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
    gap: 8px;
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
  span {
    display: block;
    border-radius: inherit;
    padding: 12px 4px;
  }
  a:hover {
    background: var(--color-line);
  }
  @media (min-width: 768px) {
    .steps {
      gap: 30px;
    }
  }
</style>
