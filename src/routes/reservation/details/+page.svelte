<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '#lib/ui/Button.svelte';
  import BookingSteps from '#lib/reservation/BookingSteps.svelte';
  import { getBooking, selectionHref, selectionLabel } from '#lib/reservation/booking.svelte.ts';
  import type { PageProps } from './$types';

  const booking = getBooking();
  const improvements = [
    '肌耐力不足',
    '柔軟度不佳',
    '壓力大',
    '姿勢不正',
    '睡眠品質差',
    '注意力不足',
  ];
  const exercise = ['150 分鐘以上', '75～150 分鐘', '30～75 分鐘', '30 分鐘以下'];
  let { data }: PageProps = $props();
  const selection = $derived(data.selection);
  let phoneError = $state('');
  let nameError = $state('');
  let phoneInput = $state<HTMLInputElement>();
  let nameInput = $state<HTMLInputElement>();
  let submitting = $state(false);

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (!selection || submitting) return;
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const read = (field: string) => String(form.get(field) ?? '').trim();
    const name = read('name');
    const phone = read('phone').replace(/[\s-]/g, '');
    if (!name) {
      nameError = '請輸入您的姓名。';
      nameInput?.focus();
      return;
    }
    if (!/^09\d{8}$/.test(phone)) {
      phoneError = '請輸入有效的台灣手機號碼，例如 0912-345-678。';
      phoneInput?.focus();
      return;
    }
    booking.receipt = {
      selection,
      name,
      age: read('age'),
      gender: read('gender'),
      email: read('email'),
      phone: `${phone.slice(0, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`,
      date: read('date'),
    };
    submitting = true;
    try {
      await goto('/reservation/complete');
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:head><title>填寫預約資料｜DOYOGA</title></svelte:head>

<div class="details-page page-space">
  <BookingSteps
    current={2}
    back={selection ? selectionHref('/reservation', selection) : '/reservation'}
  />
  {#if selection}
    <p class="shell -mt-2 text-center text-brand">
      您選擇的是 <strong class="ml-2 text-lead font-normal text-rose">
        {selectionLabel(selection)}
      </strong>
    </p>
    <form
      class="booking-form shell mt-6 max-w-87.5 space-y-8 text-brand md:mt-2 md:max-w-[330px] lg:mt-6 lg:max-w-87.5"
      method="post"
      onsubmit={submit}
    >
      <fieldset>
        <legend class="mb-4">1. 是否接觸過瑜珈?</legend>
        <div class="flex gap-7">
          {#each ['是', '否'] as item (item)}
            <label class="flex cursor-pointer items-center gap-1">
              <input type="radio" name="experience" value={item} required />{item}
            </label>
          {/each}
        </div>
      </fieldset>
      <fieldset>
        <legend class="mb-4">2. 想改善的生活問題?</legend>
        <div class="grid grid-cols-3 gap-y-4 gap-x-1">
          {#each improvements as item (item)}
            <label class="flex cursor-pointer items-center gap-1">
              <input type="checkbox" name="improvement" value={item} />{item}
            </label>
          {/each}
        </div>
      </fieldset>
      <fieldset>
        <legend class="mb-4">3. 每週累積運動量約為多少？</legend>
        <div class="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-y-1">
          {#each exercise as item (item)}
            <label class="flex cursor-pointer items-center gap-1">
              <input type="radio" name="exercise" value={item} required />{item}
            </label>
          {/each}
        </div>
      </fieldset>
      <div class="field">
        <label for="booking-date">4. 上課預約報到日</label>
        <p id="date-help" class="text-sm">
          若還沒有確定的日期，可以等待專員與您聯絡時再做詳細的諮詢哦！
        </p>
        <input
          id="booking-date"
          name="date"
          class="control w-fit!"
          type="date"
          aria-describedby="date-help"
        />
      </div>
      <fieldset class="space-y-4">
        <legend class="mb-4">5. 填寫基本資料，完成預約後會寄送通知至電子信箱</legend>
        <div class="grid grid-cols-2 gap-2">
          <div class="field">
            <label for="booking-name">姓名</label><input
              bind:this={nameInput}
              class="control"
              id="booking-name"
              name="name"
              placeholder="請輸入您的姓名"
              maxlength="80"
              autocomplete="name"
              required
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? 'name-error' : undefined}
              oninput={() => {
                nameError = '';
              }}
            />{#if nameError}<p class="field-error" id="name-error" role="alert">
                {nameError}
              </p>{/if}
          </div>
          <div class="field">
            <label for="booking-age">年齡</label><input
              class="control"
              id="booking-age"
              name="age"
              type="number"
              inputmode="numeric"
              min="1"
              max="120"
              placeholder="請輸入您的年齡"
              required
            />
          </div>
        </div>
        <div class="field">
          <label for="booking-gender">性別</label><select
            class="control w-fit!"
            id="booking-gender"
            name="gender"
          >
            <option>女</option><option>男</option><option>其他</option><option>不提供</option>
          </select>
        </div>
        <div class="field">
          <label for="booking-email">電子信箱</label><input
            class="control"
            id="booking-email"
            name="email"
            type="email"
            placeholder="email@example.com"
            autocomplete="email"
            maxlength="254"
            required
          />
        </div>
        <div class="field">
          <label for="booking-phone">手機號碼</label><input
            bind:this={phoneInput}
            class="control"
            id="booking-phone"
            name="phone"
            type="tel"
            placeholder="0912-345-678"
            autocomplete="tel"
            required
            aria-invalid={Boolean(phoneError)}
            aria-describedby={phoneError ? 'phone-error' : undefined}
            oninput={() => {
              phoneError = '';
            }}
          />{#if phoneError}<p class="field-error" id="phone-error" role="alert">
              {phoneError}
            </p>{/if}
        </div>
      </fieldset>
      <Button type="submit" class="w-full text-xl" disabled={submitting}>送出</Button>
      <p class="-mt-6 text-sm">此表單供作業示範，請使用測試資料。</p>
    </form>
  {:else}
    <div class="shell mt-8 max-w-87.5 rounded-card bg-sand p-6 text-center text-brand">
      <p class="mb-4">請先選擇方案與課程階級。</p>
      <Button href="/reservation" variant="dark">選擇方案</Button>
    </div>
  {/if}
</div>

<style>
  .details-page {
    padding-bottom: 56px;
  }
  .booking-form .control {
    min-height: 36px;
    padding-block: 5px;
    line-height: 24px;
  }
  @media (min-width: 768px) {
    .details-page {
      padding-bottom: 52px;
    }
  }
  @media (min-width: 1024px) {
    .details-page {
      padding-bottom: 76px;
    }
  }
  input[type='radio'],
  input[type='checkbox'] {
    accent-color: var(--color-brand);
    margin: 0;
    flex: 0 0 auto;
  }
</style>
