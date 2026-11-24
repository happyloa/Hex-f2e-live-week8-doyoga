# DOYOGA 瑜珈官網

六角學院切版直播班第八週作業。依 Adobe XD 實作桌機、平板與手機版的瑜珈官網，使用 SvelteKit、TypeScript 與 Tailwind CSS。

[線上展示](https://hex-f2e-live-week8-doyoga.piafyoyo06.workers.dev/) · [Adobe XD 設計稿](https://xd.adobe.com/view/ddcefee3-3028-48a2-8840-4d3ba00e8807-889d/screen/c0ededf0-68d6-462d-ba14-acf05aaff801/) · [課程素材](https://github.com/hexschool/2022-web-layout-training/tree/main/week8-yoga)

## 本機執行

需要 Node.js 24 以上。

```sh
npm ci
npm run dev
```

`npm run verify` 執行型別檢查與建置。

## 頁面

- 首頁 `/`、課程介紹 `/course`、瑜珈空間 `/surroundings`、當月課表 `/curriculum`、聯絡我們 `/contact`
- 課程詳情由卡片或課表開啟，例如 `/course?course=basic`
- 預約 `/reservation` → 填寫資料 `/reservation/details` → 完成 `/reservation/complete`
- 設計系統 `/design-system`

課表沿用設計稿的 2021 年 7 月資料。預約、訂閱與聯絡表單皆為前端示範，請使用測試資料。預約摘要會在重新整理後清除。
