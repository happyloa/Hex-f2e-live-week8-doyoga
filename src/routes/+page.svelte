<script lang="ts">
  import { plans } from '#lib/content.ts';
  import HomeIntro from '#lib/home/HomeIntro.svelte';
  import HomeReviews from '#lib/home/HomeReviews.svelte';
  import HomeShowcase from '#lib/home/HomeShowcase.svelte';
  import { reveal } from '#lib/motion.ts';
  import PlanCard from '#lib/reservation/PlanCard.svelte';
  import SectionHeading from '#lib/ui/SectionHeading.svelte';
</script>

<svelte:head>
  <title>DOYOGA，做你的瑜珈</title>
  <meta
    name="description"
    content="DOYOGA 瑜珈課程、專業師資與舒適的練習空間。查看本月課表，選擇適合你的體驗方案。"
  />
</svelte:head>

<HomeIntro />
<HomeShowcase />
<section class="shell pt-8 pb-12 md:pt-10 md:pb-14 lg:pb-16" aria-labelledby="home-plans">
  <SectionHeading title="方案選擇" subtitle="DOYOGA 可以帶給你..." id="home-plans" />
  <div
    class="reveal-stagger mt-6 grid gap-4 md:gap-6 lg:mt-8 lg:grid-cols-3 lg:gap-[30px]"
    {@attach reveal}
  >
    {#each plans as plan (plan.id)}<PlanCard {plan} />{/each}
  </div>
</section>
<HomeReviews />
