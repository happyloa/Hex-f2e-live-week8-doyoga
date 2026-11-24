<script lang="ts">
  import { page } from '$app/state';
  let { class: classes = '' }: { class?: string } = $props();
  const origin = 'https://hex-f2e-live-week8-doyoga.piafyoyo06.workers.dev';
  const shareUrl = $derived(encodeURIComponent(`${origin}${page.url.pathname}`));
</script>

<ul class="social-links {classes}" aria-label="社群連結">
  <li>
    <a
      href="https://www.facebook.com/sharer/sharer.php?u={shareUrl}"
      aria-label="分享到 Facebook"
      target="_blank"
      rel="noreferrer"
    >
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path
          d="M12 1a11 11 0 0 0-1.7 21.9v-7.7H7.5V12h2.8V9.6c0-2.8 1.7-4.4 4.2-4.4 1.2 0 2.5.2 2.5.2v2.8h-1.4c-1.4 0-1.9.9-1.9 1.7V12h3.1l-.5 3.2h-2.6v7.7A11 11 0 0 0 12 1Z"
        />
      </svg>
    </a>
  </li>
  <li>
    <a
      href="https://social-plugins.line.me/lineit/share?url={shareUrl}"
      aria-label="分享到 LINE"
      target="_blank"
      rel="noreferrer"
    >
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M6 1h12a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5H6a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5Zm6 4c-4.1 0-7.4 2.7-7.4 6 0 3 2.6 5.5 6.2 5.9.5.1.8.2.7.6l-.2 1c-.1.4.1.7.7.4.8-.4 4.4-2.6 5.9-4.3a5.2 5.2 0 0 0 1.5-3.6c0-3.3-3.3-6-7.4-6Z"
        />
      </svg>
    </a>
  </li>
</ul>

<style>
  ul {
    display: flex;
    gap: 8px;
  }
  a {
    display: grid;
    place-items: center;
    padding: 4px;
    border-radius: 50%;
    transition: scale 180ms;
  }
  a:hover {
    scale: 1.15;
  }
</style>
