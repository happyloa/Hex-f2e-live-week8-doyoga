<script lang="ts">
  import '../app.css';
  import SiteHeader from '#lib/layout/SiteHeader.svelte';
  import SiteFooter from '#lib/layout/SiteFooter.svelte';
  import SocialLinks from '#lib/layout/SocialLinks.svelte';
  let { children } = $props();
</script>

<a class="skip-link" href="#main-content">跳至主要內容</a>
<SiteHeader />
<main id="main-content" tabindex="-1">{@render children()}</main>
<SiteFooter />
<div class="fixed top-1/2 right-4 z-10 hidden -translate-y-1/2 text-[2.5rem] text-brand xl:block">
  <SocialLinks class="flex-col" />
</div>
