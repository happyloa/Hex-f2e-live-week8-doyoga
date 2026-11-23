# DOYOGA 瑜珈官網

六角學院切版直播班第八週作業。依 Adobe XD 實作瑜珈課程、場館介紹及三步驟預約，使用 SvelteKit 3、Svelte 5、TypeScript 和 Tailwind CSS 4，部署於 Cloudflare Workers。

[正式網站](https://hex-f2e-live-week8-doyoga.piafyoyo06.workers.dev/) · [Adobe XD 設計稿](https://xd.adobe.com/view/ddcefee3-3028-48a2-8840-4d3ba00e8807-889d/screen/c0ededf0-68d6-462d-ba14-acf05aaff801/) · [六角學院課程素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-yoga)

## XD 畫板與體驗入口

設計稿包含 30 張頁面與互動畫板，以及 1 張 UI Kit。頁面以 1280、768、375 px 的設計稿為基準，支援桌機、平板和手機。

| 畫板                     | 入口                                       |
| ------------------------ | ------------------------------------------ |
| 首頁                     | `/`                                        |
| 課程介紹與詳情彈窗       | `/course`、`/course?course=basic`          |
| 瑜珈空間與課程推薦       | `/surroundings`                            |
| 當月課表與上課須知       | `/curriculum`                              |
| 聯絡我們                 | `/contact`                                 |
| 預約、選擇方案與課程階級 | `/reservation`，選方案後展開階級           |
| 填寫資料                 | `/reservation/details`，由「繼續預約」進入 |
| 預約完成                 | `/reservation/complete`，由表單送出進入    |
| UI Kit 與元件範例        | `/design-system`                           |

課程可按關鍵字和階級篩選。詳情支援直接連結、Esc 與鍵盤焦點返回。輪播與版面動畫會尊重系統的減少動態效果設定。另補上搜尋無結果、預約資料缺漏及 404 頁。

預約、訂閱與聯絡表單都是前端示範，請使用測試資料。預約資訊保存在目前頁面的應用程式記憶體，重新整理會清除。課表沿用設計稿的 2021 年 7 月資料。

## 開發與部署

需要 Node.js 24 或以上。

```sh
npm ci
npm run dev
npm run verify
```

| 指令              | 用途                              |
| ----------------- | --------------------------------- |
| `npm run check`   | 檢查 Svelte 與 TypeScript         |
| `npm run build`   | 產生 Cloudflare Worker 與靜態資產 |
| `npm run preview` | 建置後使用 Wrangler 預覽 Worker   |
| `npm run deploy`  | 建置後使用已登入的 Wrangler 部署  |

## 專案結構

- `src/app.css` 使用 Tailwind `@theme` 定義色彩、字型、圓角和動態參數，並提供共用表單與版面樣式。
- `src/lib/ui` 放按鈕、標題、文字連結與輪播控制。
- `src/lib/layout` 放共用頁首、頁尾與社群連結。
- `src/lib/home`、`src/lib/course`、`src/lib/reservation` 放各功能的元件。
- `src/lib/content.ts`、`src/lib/current-schedule.ts` 放課程、師資、方案和課表資料。
- `static/images` 放六角學院與 Adobe XD 課程素材，照片使用 WebP。

本專案為切版練習。設計稿、圖片與品牌素材屬原作者所有。
