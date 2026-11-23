<script lang="ts">
  import Button from '#lib/ui/Button.svelte';
  import PageHeading from '#lib/ui/PageHeading.svelte';

  const address = '高雄市苓雅區北信街 23 號 2 樓';
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  let sent = $state(false);

  function send(event: SubmitEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLFormElement).reset();
    sent = true;
  }
</script>

<svelte:head>
  <title>聯絡我們｜DOYOGA</title><meta
    name="description"
    content="查詢 DOYOGA 教室位置、交通資訊，或使用意見回饋表單。"
  />
</svelte:head>

<div class="shell page-space">
  <PageHeading title="聯絡我們" />
  <div class="contact-layout">
    <section aria-labelledby="location-heading" class="text-brand">
      <a
        href={directions}
        target="_blank"
        rel="noreferrer"
        class="map photo-frame block"
        aria-label="在 Google 地圖開啟 DOYOGA 教室位置（另開視窗）"
      >
        <img src="/images/map.webp" width="909" height="547" alt="DOYOGA 教室位置示意地圖" />
      </a>
      <h2 class="mb-2 mt-4 text-2xl" id="location-heading">DOYOGA 教室位置</h2>
      <p>{address}</p>
      <h3 class="mt-2">如何前往：</h3>
      <ol class="list-inside list-decimal space-y-5">
        <li>搭乘捷運：紅線到正義站 3 號出口，沿正義路方向至北信街交叉口即可。</li>
        <li>搭乘公車：搭這些公車都可以抵達正義站<br />24B　25　33　50　76　77　77區　100</li>
        <li>開車前往北信街 32 號，教室旁有專屬停車場可以使用。</li>
      </ol>
    </section>

    <section class="rounded-card bg-sand p-6 text-brand md:p-8" aria-labelledby="feedback-heading">
      <h2 class="mb-5 text-lead" id="feedback-heading">意見回饋＆問題詢問</h2>
      <form
        method="post"
        class="grid gap-4"
        onsubmit={send}
        oninput={() => {
          sent = false;
        }}
      >
        <div class="field">
          <label for="feedback-name">姓名</label><input
            class="control"
            id="feedback-name"
            name="name"
            placeholder="請輸入您的姓名"
            autocomplete="name"
            maxlength="80"
            required
          />
        </div>
        <div class="field">
          <label for="feedback-email">電子信箱</label><input
            class="control"
            id="feedback-email"
            name="email"
            type="email"
            placeholder="email@example.com"
            autocomplete="email"
            maxlength="254"
            required
          />
        </div>
        <div class="field">
          <label for="feedback-phone">手機號碼</label><input
            class="control"
            id="feedback-phone"
            name="phone"
            type="tel"
            placeholder="0912-345-678"
            autocomplete="tel"
          />
        </div>
        <div class="field">
          <label for="feedback-message">意見回饋</label><textarea
            class="control min-h-[214px] resize-y"
            id="feedback-message"
            name="message"
            maxlength="1500"
            required></textarea>
        </div>
        <div class="flex items-center justify-end gap-4">
          {#if sent}<p class="text-sm" role="status">已完成回饋表單示範。</p>{/if}
          <Button type="submit">送出</Button>
        </div>
      </form>
    </section>
  </div>
</div>

<style>
  .contact-layout {
    display: grid;
    gap: 32px;
    align-items: start;
  }
  .map {
    aspect-ratio: 1.76;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .contact-layout {
      max-width: 570px;
      margin-inline: auto;
    }
  }
  @media (min-width: 1024px) {
    .contact-layout {
      grid-template-columns: minmax(0, 635fr) minmax(0, 445fr);
      gap: 30px;
    }
  }
</style>
