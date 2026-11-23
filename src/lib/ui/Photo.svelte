<script lang="ts">
  import type { HTMLImgAttributes } from 'svelte/elements';
  import { imageSrcset, photos } from '#lib/images.ts';
  import type { PhotoName } from '#lib/images.ts';

  let {
    name,
    alt,
    sizes,
    ...attributes
  }: Omit<HTMLImgAttributes, 'alt' | 'src' | 'srcset' | 'width' | 'height'> & {
    name: PhotoName;
    alt: string;
    sizes: string;
  } = $props();

  const photo = $derived(photos[name]);
</script>

<img
  src={photo.src}
  srcset={imageSrcset(name)}
  {sizes}
  width={photo.width}
  height={photo.height}
  {alt}
  {...attributes}
/>
