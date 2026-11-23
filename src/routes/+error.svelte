<script lang="ts">
  import { page } from '$app/state';
  import Button from '#lib/ui/Button.svelte';

  const heading = $derived(page.status === 404 ? '找不到這個頁面' : '頁面暫時無法載入');
</script>

<svelte:head><title>{heading}｜DOYOGA</title></svelte:head>

<section class="shell page-space max-w-145 text-center" aria-labelledby="error-heading">
  <p class="mb-2 text-brand" aria-hidden="true">{page.status}</p>
  <h1 id="error-heading" class="text-section font-medium">{heading}</h1>
  <p class="mb-6 mt-2">你可以回到首頁，或繼續瀏覽瑜珈課程。</p>
  <div class="flex flex-wrap justify-center gap-2">
    <Button href="/" variant="outline">返回首頁</Button><Button href="/course" variant="dark">
      課程介紹
    </Button>
  </div>
</section>
