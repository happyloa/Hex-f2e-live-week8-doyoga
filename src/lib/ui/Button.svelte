<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    href,
    variant = 'primary',
    type = 'button',
    class: classes = '',
    onclick,
    disabled,
    children,
  }: {
    href?: string;
    variant?: 'primary' | 'outline' | 'light' | 'dark';
    type?: 'button' | 'submit';
    class?: string;
    onclick?: (event: MouseEvent) => void;
    disabled?: boolean;
    children: Snippet;
  } = $props();
</script>

{#if href}
  <a {href} class="button button-{variant} {classes}" {onclick}>{@render children()}</a>
{:else}
  <button {type} {disabled} {onclick} class="button button-{variant} {classes}">
    {@render children()}
  </button>
{/if}
