<script lang="ts">
  import ArrowRight from '@lucide/svelte/icons/arrow-right';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import Menu from '@lucide/svelte/icons/menu';
  import Star from '@lucide/svelte/icons/star';
  import Button from '#lib/ui/Button.svelte';
  import PageHeading from '#lib/ui/PageHeading.svelte';
  import TextLink from '#lib/ui/TextLink.svelte';

  const colors = [
    { token: 'brand', label: '品牌主色', hex: '#907A7B' },
    { token: 'rose', label: '品牌輔色', hex: '#C0A4A5' },
    { token: 'sand', label: '區塊底色', hex: '#F5F0E7' },
    { token: 'ink', label: '內文', hex: '#707070' },
    { token: 'brand-dark', label: '焦點與互動', hex: '#6A5355' },
  ];
</script>

<svelte:head>
  <title>設計系統｜DOYOGA</title><meta
    name="description"
    content="DOYOGA 設計系統的色彩、字型和共用元件。"
  />
</svelte:head>

<div class="shell page-space max-w-230 space-y-10">
  <PageHeading title="DOYOGA 設計系統" />
  <section aria-labelledby="palette-title">
    <h2 class="mb-4 text-lead font-medium" id="palette-title">色彩</h2>
    <ul class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {#each colors as color (color.token)}
        <li class="overflow-hidden rounded-card border border-line">
          <div class="h-16" style:background-color={`var(--color-${color.token})`}></div>
          <div class="p-3">
            <p>{color.label}</p>
            <code class="text-sm">{color.hex}</code>
          </div>
        </li>
      {/each}
    </ul>
  </section>
  <section aria-labelledby="type-title">
    <h2 class="mb-4 text-lead font-medium" id="type-title">字型</h2>
    <div class="rounded-card bg-sand p-6">
      <p class="text-sm text-brand">Noto Sans TC</p>
      <p class="mt-2 text-4xl text-brand">DOYOGA，做你的瑜珈</p>
      <p class="mt-3 text-section text-brand">感受身心，活在當下</p>
      <p class="mt-3">多給自己一點時間享受靜謐，傾聽內心的聲音。</p>
    </div>
  </section>
  <section aria-labelledby="brand-examples">
    <h2 class="mb-4 text-lead font-medium" id="brand-examples">標誌與圖示</h2>
    <div class="flex flex-wrap items-center gap-4 text-brand">
      <div class="rounded-card bg-sand p-5">
        <img src="/images/logo.png" width="96" height="31" alt="DOYOGA 彩色標誌" />
      </div>
      <div class="rounded-card bg-brand p-5">
        <img src="/images/logo-white.png" width="96" height="31" alt="DOYOGA 白色標誌" />
      </div>
      <div class="flex flex-wrap gap-4" aria-label="選單、下一步、完成與評分圖示" role="img">
        <Menu /><ArrowRight /><CircleCheck /><Star />
      </div>
    </div>
  </section>
  <section aria-labelledby="component-examples">
    <h2 class="mb-4 text-lead font-medium" id="component-examples">共用元件</h2>
    <div class="flex flex-wrap items-center gap-3">
      <Button href="/reservation">立即預約</Button>
      <Button href="/contact" variant="outline">聯絡我們</Button>
      <Button href="/course" variant="light">課程介紹</Button>
      <Button disabled>暫時無法送出</Button>
      <span class="course-chip">60 min</span>
      <TextLink href="/surroundings" label="環境介紹" />
    </div>
    <div class="field mt-5 max-w-87.5">
      <label for="sample-email">電子信箱</label><input
        id="sample-email"
        class="control"
        type="email"
        placeholder="email@example.com"
      />
    </div>
  </section>
</div>
