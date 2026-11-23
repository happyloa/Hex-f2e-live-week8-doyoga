<script lang="ts">
  import { navigation } from '#lib/content.ts';
  import SocialLinks from './SocialLinks.svelte';

  let subscribed = $state(false);
  function subscribe(event: SubmitEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLFormElement).reset();
    subscribed = true;
  }
</script>

<footer class="bg-brand text-white">
  <div class="border-b border-white/70">
    <div class="shell signup">
      <h2 class="text-white font-medium text-2xl md:text-section">現在訂閱，獲得課程優惠碼！</h2>
      <form class="signup-form" onsubmit={subscribe}>
        <label class="sr-only" for="newsletter-email">輸入您的電子信箱</label>
        <div class="flex">
          <input
            class="min-w-0 grow rounded-l-control bg-white px-4 py-2 text-lg text-ink placeholder:text-brand"
            id="newsletter-email"
            type="email"
            placeholder="輸入您的電子信箱"
            autocomplete="email"
            oninput={() => {
              subscribed = false;
            }}
            required
          />
          <button
            class="shrink-0 whitespace-nowrap rounded-r-control bg-rose px-4 py-2 text-xl hover:bg-brand-dark"
            type="submit"
          >
            訂閱
          </button>
        </div>
        {#if subscribed}<p class="mt-2 text-sm" role="status">已完成訂閱示範。</p>{/if}
      </form>
    </div>
  </div>
  <div class="shell footer-content">
    <a class="footer-logo" href="/" aria-label="DOYOGA 首頁">
      <img src="/images/shared/logo-white.webp" width="96" height="31" alt="DOYOGA" />
    </a>
    <SocialLinks class="footer-social text-xl" />
    <nav aria-label="頁尾選單" class="footer-nav">
      {#each navigation as item (item.href)}<a href={item.href} class="hover:underline">
          {item.label}
        </a>{/each}
    </nav>
    <p class="copyright">© 2021. All Rights Reserved.</p>
  </div>
</footer>

<style>
  .signup {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-block: 24px;
  }
  .signup-form {
    width: min(100%, 350px);
  }
  .footer-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 8px;
    align-items: start;
    padding-block: 24px 32px;
  }
  .footer-content :global(.footer-social) {
    justify-self: end;
  }
  .footer-nav {
    display: grid;
    gap: 8px;
    grid-column: 1;
  }
  .copyright {
    grid-column: 1 / -1;
  }
  @media (min-width: 768px) {
    .signup {
      padding-block: 32px;
    }
    .footer-content {
      grid-template-columns: 1fr auto 1fr;
      min-height: 192px;
      padding-block: 32px;
    }
    .footer-content :global(.footer-social) {
      grid-column: 3;
    }
    .copyright {
      grid-column: 2;
      align-self: end;
    }
  }
  @media (min-width: 1024px) {
    .signup {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
