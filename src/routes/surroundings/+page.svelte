<script lang="ts">
  import { courses } from '#lib/content.ts';
  import { reveal } from '#lib/motion.ts';
  import CarouselButtons from '#lib/ui/CarouselButtons.svelte';
  import PageHeading from '#lib/ui/PageHeading.svelte';
  import SectionHeading from '#lib/ui/SectionHeading.svelte';
  import TextLink from '#lib/ui/TextLink.svelte';

  let track: HTMLElement | undefined = $state();
  const rooms = [
    {
      title: 'A、B 團體課教室',
      image: 'group-studio',
      description: '教授課程：A-基礎、艾揚格、哈達、寰宇；B-雙人飛行、阿斯坦加、陰陽、香氛',
    },
    {
      title: 'C、D 個人訓練室',
      image: 'practice-room',
      description: '開放時間：每週一至週五 09:00～17:00',
    },
    { title: '淋浴間', image: 'showers', description: '開放時間：每週一至週日 09:00～21:30' },
    { title: '器材出租', image: 'equipment', description: '有租借需求請至櫃檯登記' },
    { title: '交誼廳', image: 'social-room', description: '開放時間：每週一至週五 09:00～21:30' },
  ];
  const features = [
    '四間教室：A、B 團體課教室、C、D 個人訓練室。',
    '瑜珈墊、輔具：每次課後會進行殺菌清潔，乾淨免擔心。',
    '男女置物櫃、淋浴間：分別設置在館內 A、B 區。',
    '舒適交誼廳，咖啡茶水無限供應，假日提供午間蔬食餐點。',
  ];
</script>

<svelte:head>
  <title>瑜珈空間｜DOYOGA</title><meta
    name="description"
    content="探索 DOYOGA 的團體教室、個人訓練空間和館內設備。"
  />
</svelte:head>

<div class="shell pt-[var(--page-space)] pb-10 lg:pb-16">
  <PageHeading title="瑜珈空間" />
  <div class="studio-layout">
    <div class="room-gallery">
      {#each rooms as room, index (room.image)}
        <figure class="room photo-frame" class:wide={index === 0}>
          <img src="/images/{room.image}.webp" alt="" loading={index === 0 ? 'eager' : 'lazy'} />
          <figcaption>
            <h2 class="text-xl text-white lg:text-section">{room.title}</h2>
            <p>{room.description}</p>
          </figcaption>
        </figure>
      {/each}
    </div>
    <aside class="rounded-card bg-sand p-6 text-brand lg:p-8">
      <h2 class="mb-3 text-lead">DOYOGA 提供：</h2>
      <ul class="mb-4 space-y-1">
        {#each features as feature (feature)}<li>{feature}</li>{/each}
      </ul>
      <TextLink href="/reservation" label="立即預約" />
    </aside>
  </div>
</div>

<section
  class="recommendations section-space bg-sand"
  aria-labelledby="recommended-courses"
  {@attach reveal}
>
  <div class="shell">
    <SectionHeading id="recommended-courses" title="課程推薦" />
    <ul class="recommend-track mt-6 lg:mt-8" bind:this={track}>
      {#each courses as course (course.id)}
        <li>
          <a class="block text-brand hover:text-brand-dark" href="/course?course={course.id}">
            <div class="photo-frame">
              <img
                src="/images/{course.image}.webp"
                alt=""
                loading="lazy"
                style:object-position={course.position}
              />
            </div>
            <h3 class="mt-2 text-lead">{course.title}</h3>
            <p class="mt-1">授課老師：{course.teacher}</p>
          </a>
        </li>
      {/each}
    </ul>
    <CarouselButtons {track} label="推薦課程" />
  </div>
</section>

<style>
  .studio-layout,
  .room-gallery {
    display: grid;
    gap: 16px;
    align-items: start;
  }
  .room {
    position: relative;
    height: 350px;
  }
  .room figcaption {
    position: absolute;
    inset: auto 0 0;
    padding: 44px 24px 24px;
    color: white;
    background: linear-gradient(transparent, rgb(0 0 0 / 66%));
  }
  .recommendations {
    overflow: hidden;
  }
  .recommend-track {
    display: flex;
    gap: 15px;
    width: calc(100% + var(--layout-gutter));
    overflow: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }
  .recommend-track li {
    flex: 0 0 255px;
    scroll-snap-align: start;
  }
  .recommend-track .photo-frame {
    height: 196px;
  }
  @media (min-width: 768px) {
    .studio-layout {
      grid-template-columns: minmax(0, 450fr) minmax(0, 210fr);
      gap: 30px;
    }
    .room-gallery {
      grid-template-columns: 1fr 1fr;
      gap: 16px 30px;
    }
    .room.wide {
      grid-column: span 2;
    }
    .room {
      height: 210px;
    }
    .room figcaption {
      padding-inline: 16px;
    }
    .recommend-track {
      width: 100%;
      gap: 30px;
    }
    .recommend-track li {
      flex-basis: calc((100% - 60px) / 3);
    }
  }
  @media (min-width: 1024px) {
    .studio-layout {
      grid-template-columns: minmax(0, 730fr) minmax(0, 350fr);
    }
    .room-gallery {
      row-gap: 24px;
    }
    .room {
      height: 350px;
    }
    .room figcaption {
      padding-inline: 24px;
    }
    .recommend-track {
      width: calc(100% + max(var(--layout-gutter), (100vw - var(--layout-width)) / 2));
    }
    .recommend-track li {
      flex-basis: 255px;
    }
  }
</style>
