import type { Attachment } from 'svelte/attachments';

export const reveal: Attachment<HTMLElement> = (node) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window))
    return;
  if (node.getBoundingClientRect().top < window.innerHeight) return;

  node.dataset.reveal = 'waiting';
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      node.dataset.reveal = 'visible';
      observer.disconnect();
    },
    { rootMargin: '0px 0px -24px' },
  );
  observer.observe(node);

  return () => {
    observer.disconnect();
    delete node.dataset.reveal;
  };
};
