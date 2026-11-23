<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  let { href, label }: { href: string; label: string } = $props();
</script>

<a class="text-link" {href}>{label}<ArrowRight size={22} aria-hidden="true" /></a>
