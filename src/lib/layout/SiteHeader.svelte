<script lang="ts">
  import X from '@lucide/svelte/icons/x';
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/state';
  import { navigation } from '#lib/content.ts';
  import Button from '#lib/ui/Button.svelte';

  let open = $state(false);
  let toggle: HTMLButtonElement;
  afterNavigate(() => {
    open = false;
  });

  function closeOnEscape(event: KeyboardEvent) {
    if (event.key !== 'Escape' || !open) return;
    open = false;
    toggle.focus();
  }
</script>

<svelte:window onkeydown={closeOnEscape} />
<header class="relative z-20 bg-sand">
  <div class="shell relative flex h-20 items-center justify-between">
    <a
      href="/"
      aria-label="DOYOGA 首頁"
      onclick={() => {
        open = false;
      }}
    >
      <img src="/images/shared/logo.webp" width="96" height="31" alt="DOYOGA" />
    </a>
    <nav class="desktop-nav font-light" aria-label="主選單">
      {#each navigation as item (item.href)}
        <a href={item.href} aria-current={page.url.pathname === item.href ? 'page' : undefined}>
          {item.label}
        </a>
      {/each}
    </nav>
    <div class="desktop-actions gap-4">
      <Button href="/reservation" variant="outline" class="rounded-full! border-rose! font-[350]">立即預約</Button>
      <Button href="/contact" variant="outline" class="rounded-full! border-rose! font-[350]">聯絡我們</Button>
    </div>
    <button
      class="header-toggle icon-button"
      type="button"
      bind:this={toggle}
      onclick={() => {
        open = !open;
      }}
      aria-label={open ? '關閉主選單' : '開啟主選單'}
      aria-expanded={open}
      aria-controls="mobile-navigation"
    >
      {#if open}<X size={32} />{:else}<span class="menu-icon" aria-hidden="true"></span>{/if}
    </button>
  </div>
  <nav id="mobile-navigation" class="mobile-nav" aria-label="行動版主選單" hidden={!open}>
    <div class="shell flex flex-col gap-2 py-4">
      {#each [...navigation, { href: '/reservation', label: '立即預約' }, { href: '/contact', label: '聯絡我們' }] as item (item.href)}
        <a
          class="rounded px-3 py-2 hover:bg-white"
          href={item.href}
          aria-current={page.url.pathname === item.href ? 'page' : undefined}
          onclick={() => {
            open = false;
          }}
        >
          {item.label}
        </a>
      {/each}
    </div>
  </nav>
</header>

<style>
  .desktop-nav,
  .desktop-actions {
    display: none;
  }
  .mobile-nav {
    position: absolute;
    inset-inline: 0;
    background: var(--color-sand);
    border-top: 1px solid var(--color-line);
    box-shadow: var(--shadow-card);
  }
  .mobile-nav:not([hidden]) {
    animation: menu-enter var(--motion-time) var(--ease-yoga) both;
  }
  @keyframes menu-enter {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .header-toggle {
    margin-right: 3px;
  }
  .menu-icon {
    width: 34px;
    height: 25px;
    background: repeating-linear-gradient(to bottom, currentColor 0 4px, transparent 4px 7px);
  }
  nav a:hover {
    color: var(--color-brand-dark);
    text-decoration: underline;
    text-underline-offset: 6px;
  }
  @media (min-width: 1024px) {
    .desktop-nav {
      display: flex;
      gap: 32px;
      position: absolute;
      left: 50%;
      translate: -50%;
    }
    .desktop-actions {
      display: flex;
    }
    .header-toggle,
    .mobile-nav {
      display: none;
    }
  }
</style>
