<script lang="ts">
  let {
    title,
    subtitle,
    class: classes = '',
    id,
  }: {
    title: string;
    subtitle?: string;
    class?: string;
    id?: string;
  } = $props();
</script>

<header class="text-center {classes}">
  <h2 {id} class="text-section font-medium">{title}</h2>
  {#if subtitle}<p class="mt-1 text-lead text-muted">{subtitle}</p>{/if}
</header>
