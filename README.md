# BESSition — React/Vite untuk Vercel

Website interaktif BESSition siap di-deploy pada **Vercel**. Font: Inter. Aset visual bersumber dari berkas poster pengguna.

## Cara A — Tanpa coding (GitHub → Vercel)

1. Ekstrak file `BESSition_Vercel_Ready.zip`.
2. Masuk ke https://github.com/new dan buat repository baru, misalnya `bessition-web`.
3. Di repository kosong, gunakan **uploading an existing file** / **Add file → Upload files**. Unggah **seluruh isi folder hasil ekstrak** (bukan folder induknya saja), termasuk `package.json`, `index.html`, `vite.config.js`, `vercel.json`, `src/`, dan `public/`. Commit.
4. Buka https://vercel.com/new dan **Import Git Repository**; hubungkan GitHub bila diminta. Pilih repository tadi.
5. **Framework Preset:** Vite (atau autodetect). **Root Directory:** `./`. **Build Command:** `npm run build`. **Output Directory:** `dist`. Install Command: `npm install` (default).
6. Klik **Deploy**. Setelah sukses, buka URL `*.vercel.app` yang diberikan.
7. Untuk memperbarui, edit dan commit ke branch utama. Vercel otomatis membuat deployment baru.

Catatan: jangan upload file ZIP sebagai satu berkas ke root repository. Ekstrak terlebih dahulu agar `package.json` berada di root.

## Cara B — Vercel CLI (dari komputer dengan Node.js)

```bash
npm install
npm run build
npx vercel
npx vercel --prod
```

Perintah `npx vercel` meminta login dan pilihan project saat pertama kali dijalankan. Proyek ini static front-end; tidak memerlukan database/server backend.

## Cara C — v0 untuk membuat dan mengembangkan UI dari prompt

Buka https://v0.app/ lalu gunakan isi `PROMPT_V0_VERCEL.md` disertai gambar `public/assets/bess-components.webp` dan `public/assets/poster-reference.webp`. v0 adalah AI website builder terpisah dari proses deploy Vite. Hasil v0 dapat memakai stack yang berbeda dari React/Vite dan mungkin perlu adaptasi. Publish dari v0 akan membuat deployment Vercel.

## Struktur

- `src/App.jsx`: halaman, komponen, dan interaktivitas
- `src/styles.css`: warna, layout, responsivitas, animasi
- `public/assets/bess-components.webp`: aset ilustrasi komponen utama
- `public/assets/poster-reference.webp`: referensi desain poster
- `public/assets/sumber-poster-infogreen-2026.pdf`: PDF sumber yang disediakan
- `vercel.json`: build settings Vercel
- `PROMPT_V0_VERCEL.md`: prompt untuk versi AI builder v0

## Sebelum publikasi

- Audit semua angka di halaman dengan dokumen RUPTL/IEA terbaru dan perbaiki perbedaan di materi sumber bila ada.
- Pastikan izin dan atribusi aset visual, termasuk aset pihak ketiga.
- Jika website akan diajukan sebagai bagian kompetisi, periksa ketentuan panitia tentang AI generatif.

## Jika deployment gagal

- Pastikan `package.json` di root repository, bukan di dalam dua tingkat folder.
- Pastikan preset Vite, output `dist`, dan build `npm run build`.
- Lihat log error di bagian Deployments → View Build Logs.
- Jika Vercel tidak otomatis mengambil `vercel.json`, masukkan settings di **Project Settings → Build and Deployment**.
