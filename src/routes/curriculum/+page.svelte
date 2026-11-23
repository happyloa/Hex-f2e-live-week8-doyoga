<script lang="ts">
  import { scheduleNotes } from '#lib/content.ts';
  import { schedule, weekdays } from '#lib/current-schedule.ts';
  import PageHeading from '#lib/ui/PageHeading.svelte';
  import SectionHeading from '#lib/ui/SectionHeading.svelte';
  import { reveal } from '#lib/motion.ts';
</script>

<svelte:head>
  <title>本月課表｜DOYOGA</title><meta
    name="description"
    content="查看 DOYOGA 瑜珈課程時段及上課須知。"
  />
</svelte:head>

<div class="shell page-space">
  <PageHeading title="本月課表" />
  <section class="timetable" aria-labelledby="schedule-title">
    <h2 id="schedule-title" class="mb-2 text-lead text-white">2021 07 月</h2>
    <p class="sr-only" id="timetable-help">在窄螢幕可水平捲動查看後面的日期。</p>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard scrolling requires a focusable region.) -->
    <div
      class="schedule-scroll"
      role="region"
      aria-label="可捲動課表"
      aria-describedby="timetable-help"
      tabindex="0"
    >
      <table>
        <thead>
          <tr>
            <th scope="col">時間</th>{#each weekdays as day (day)}<th scope="col">{day}</th>{/each}
          </tr>
        </thead>
        <tbody>
          {#each schedule as row (row.time)}
            <tr>
              <th scope="row">{row.time}</th>
              {#if row.sessions}{#each row.sessions as session, index (index)}<td>
                    {session || '　'}
                  </td>{/each}
              {:else}<td colspan="6" class="text-center">休息</td>{/if}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <section class="mt-8" aria-labelledby="class-notes" {@attach reveal}>
    <SectionHeading id="class-notes" title="上課須知" />
    <ol class="notes mt-6">
      {#each scheduleNotes as note, index (note)}
        <li class="flex items-center gap-4 md:gap-6">
          <span class="note-number" aria-hidden="true">{index + 1}.</span><span class="note-copy">
            {note}
          </span>
        </li>
      {/each}
    </ol>
  </section>
</div>

<style>
  .timetable {
    max-width: 920px;
    margin-inline: auto;
    padding: 32px 24px;
    border-radius: var(--radius-card);
    background: var(--color-rose);
  }
  .schedule-scroll {
    max-width: 100%;
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 805px;
    color: var(--color-brand);
    background: white;
  }
  th,
  td {
    border: 1px solid var(--color-rose);
    height: 41px;
    padding: 7px 5px;
    white-space: nowrap;
  }
  th {
    font-weight: 400;
  }
  thead th:first-child,
  tbody th {
    text-align: left;
  }
  th:nth-child(odd),
  td:nth-child(odd):not([colspan]) {
    background: var(--color-sand);
  }
  tbody th {
    background: white !important;
  }
  .notes {
    display: grid;
    gap: 24px;
    max-width: 730px;
    margin-inline: auto;
    color: var(--color-brand);
  }
  .note-number {
    flex: 0 0 auto;
    width: 34px;
    font-weight: 700;
    font-size: 32px;
  }
  .note-copy {
    display: flex;
    align-items: center;
    flex: 1;
    min-height: 56px;
    padding: 12px 16px;
    border: 1px solid var(--color-rose);
    border-radius: var(--radius-card);
  }
  li:nth-child(even) .note-copy {
    color: white;
    background: var(--color-rose);
  }
  @media (min-width: 768px) {
    .timetable {
      padding-inline: 48px 40px;
    }
  }
  @media (min-width: 1024px) {
    .notes li:nth-child(odd) {
      margin-right: 95px;
    }
    .notes li:nth-child(even) {
      margin-left: 95px;
    }
  }
</style>
