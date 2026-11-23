<script lang="ts">
  import { reveal } from '#lib/motion.ts';
  import { heroMobile, imageSrcset, photos } from '#lib/images.ts';
  import Button from '#lib/ui/Button.svelte';
  import Photo from '#lib/ui/Photo.svelte';
  import SectionHeading from '#lib/ui/SectionHeading.svelte';

  const benefits = [
    {
      title: '整體健身',
      photo: 'fitness',
      text: '每一個動作，都融入運動解剖學的觀點，強調以身體的中心線為出發點。',
    },
    {
      title: '減壓放鬆',
      photo: 'relax',
      text: '調節全身系統、改善血液循環、減壓養心、釋放身心，達到修心養性的目的。',
    },
    {
      title: '局部雕塑',
      photo: 'sculpt',
      text: '幫助強化背部與腹部的核心肌群，增進我們身體穩定度以及保持良好體態。',
    },
  ] as const;
</script>

<section class="hero" aria-labelledby="hero-heading">
  <picture class="hero-media">
    <source media="(max-width: 560px)" srcset={heroMobile} />
    <img
      src={photos.hero.src}
      srcset={imageSrcset('hero')}
      sizes="(max-width: 767px) 840px, (max-width: 1023px) 873px, 100vw"
      width={photos.hero.width}
      height={photos.hero.height}
      alt=""
      fetchpriority="high"
    />
  </picture>
  <div class="shell hero-inner">
    <div class="hero-copy">
      <p>健身輕時尚</p>
      <h1 id="hero-heading" class="font-medium">DOYOGA，做你的瑜珈</h1>
      <p class="hero-caption">多給自己一點時間享受靜謐，傾聽內心的聲音。</p>
      <div class="mt-4 flex flex-wrap gap-2 text-xl">
        <Button href="/reservation" variant="light">立即預約</Button>
        <Button href="/course">課程介紹</Button>
      </div>
    </div>
  </div>
</section>

<section
  class="shell pt-8 pb-12 lg:pt-10 lg:pb-16"
  aria-labelledby="benefits-heading"
  {@attach reveal}
>
  <SectionHeading
    id="benefits-heading"
    title="感受身心，活在當下"
    subtitle="DOYOGA 可以帶給你..."
  />
  <ul class="mt-6 grid gap-4 md:grid-cols-3 md:gap-[30px] lg:mt-8">
    {#each benefits as benefit (benefit.photo)}
      <li class="benefit photo-frame">
        <Photo
          name={benefit.photo}
          sizes="(min-width: 1024px) 350px, (min-width: 768px) 30vw, calc(100vw - 30px)"
          alt=""
          loading="lazy"
        />
        <div class="benefit-copy">
          <h3 class="text-lead text-white">{benefit.title}</h3>
          <p class="mt-1">{benefit.text}</p>
        </div>
      </li>
    {/each}
  </ul>
</section>

<style>
  .hero {
    position: relative;
    isolation: isolate;
    background: #dedde1;
    color: var(--color-ink);
  }
  .hero-media {
    position: absolute;
    z-index: -2;
    inset: 0;
  }
  .hero-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 48.5% center;
  }
  .hero-inner {
    display: flex;
    align-items: center;
    min-height: 560px;
  }
  .hero-copy {
    position: relative;
    max-width: 445px;
    animation: enter 600ms var(--ease-yoga) both;
  }
  .hero-copy h1 {
    color: inherit;
    font-size: 28px;
    line-height: 1.5;
  }
  .hero-caption {
    font-size: 20px;
    line-height: 1.5;
  }
  .benefit {
    position: relative;
    height: 420px;
    color: white;
    background: #444;
  }
  .benefit-copy {
    position: absolute;
    inset: auto 0 0;
    padding: 24px;
    padding-top: 54px;
    background: linear-gradient(transparent, rgb(0 0 0 / 68%));
  }
  @keyframes enter {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (min-width: 768px) {
    .hero-inner {
      min-height: 582px;
    }
    .hero-media img {
      object-position: center;
    }
    .hero-copy h1 {
      font-size: 36px;
    }
    .hero-caption {
      font-size: 24px;
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .benefit {
      height: 252px;
    }
    .benefit-copy {
      padding: 36px 16px 16px;
    }
  }
  @media (min-width: 1024px) {
    .hero-media img {
      object-position: center 98.5%;
    }
    .hero-copy {
      margin-left: calc((100% + 30px) / 12);
    }
  }
  @media (max-width: 767px) {
    .hero-copy > div {
      margin-top: 38px;
    }
  }
</style>
