<script lang="ts">
  import ChevronDown from '@lucide/svelte/icons/chevron-down';
  import CircleCheck from '@lucide/svelte/icons/circle-check';
  import { getBooking, selectionHref, selectionLabel } from '#lib/reservation/booking.svelte.ts';
  import BookingSteps from '#lib/reservation/BookingSteps.svelte';
  import Button from '#lib/ui/Button.svelte';
  const booking = getBooking();
  const receipt = $derived(booking.receipt);
</script>

<svelte:head><title>預約完成｜DOYOGA</title></svelte:head>

<div class="pt-[var(--page-space)] pb-22 md:pb-20 lg:pb-26">
  <BookingSteps
    current={3}
    back={receipt ? selectionHref('/reservation', receipt.selection) : '/reservation'}
  />
  {#if receipt}
    <div class="shell text-brand md:max-w-[450px] md:max-lg:-mt-2 lg:max-w-142.5">
      <div class="mb-8 text-center" role="status">
        <CircleCheck size={42} class="mx-auto mb-[22px]" aria-hidden="true" />
        <p class="text-lead">已完成預約，以下是您的預約資訊:</p>
      </div>
      <details class="receipt rounded-control outline outline-rose -outline-offset-1" open>
        <summary
          class="flex list-none items-center justify-between gap-2 rounded-t-control bg-brand px-5 py-4 text-white"
        >
          預約資訊<ChevronDown size={20} aria-hidden="true" />
        </summary>
        <div class="grid gap-2 px-5 py-4 break-words">
          <p class="mb-2">
            您預約的是 <span class="text-lead text-rose">{selectionLabel(receipt.selection)}</span>
          </p>
          <p>上課預約報到日：{receipt.date ? receipt.date.replaceAll('-', '/') : '待確認'}</p>
          <p>預約人：{receipt.name}</p>
          <p>年齡：{receipt.age} 歲</p>
          <p>性別：{receipt.gender}</p>
          <p>電子信箱：{receipt.email}</p>
          <p>手機號碼：{receipt.phone}</p>
        </div>
      </details>
      <div class="mx-auto mt-6 max-w-87.5 md:max-w-[330px] lg:max-w-87.5">
        <h2 class="text-center text-lead">上課注意事項</h2>
        <p class="mt-2">
          第一次上課請提前 10-15 分鐘至櫃檯報到，請攜帶毛巾、水，穿著運動服、乾淨室內運動鞋。<br
          />如欲更改體驗時間請提前通知我們喔！
        </p>
        <Button href="/" class="mt-8 w-full text-xl">返回首頁</Button>
      </div>
    </div>
  {:else}
    <div class="shell max-w-87.5 rounded-card bg-sand p-6 text-center text-brand">
      <p class="mb-4">目前沒有可顯示的預約資訊。</p>
      <Button href="/reservation" variant="dark">返回預約</Button>
    </div>
  {/if}
</div>

<style>
  details:not([open]) summary :global(svg) {
    rotate: -90deg;
  }
  summary :global(svg) {
    transition: rotate var(--motion-time);
  }
  summary::-webkit-details-marker {
    display: none;
  }
</style>
