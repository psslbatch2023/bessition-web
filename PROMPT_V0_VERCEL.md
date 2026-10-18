# Prompt untuk v0 (Vercel) — BESSition Interactive

> **Penting:** Upload lampiran visual poster dan komponen dari proyek sebelum mengirim prompt. Kalau membangun dari kode yang telah tersedia, **lebih efisien deploy proyek React/Vite yang ada langsung ke Vercel via GitHub**. v0 ditujukan untuk eksplorasi/desain ulang berbasis AI.

## Salin prompt ini ke https://v0.app/

Buat website edukasi interaktif premium bertajuk **“BESSition — Menyimpan Energi, Menggerakkan Transisi”**, berdasarkan poster infografis dan ilustrasi isometrik Battery Energy Storage System (BESS) yang saya lampirkan. Pengguna menargetkan deployment di Vercel dan ingin kesamaan visual yang tinggi dengan aset referensi.

**IDENTITAS VISUAL**
- Warna utama hijau gelap `#067A4C`, hijau muda `#14A36D`, biru langit `#46B7EC`, biru elektrik `#1597DF`, putih `#FFFFFF`, aksen oranye `#FF8D27`. Gradient biru langit lembut dan hijau; sedikit awan, tetapi tetap bersih dan profesional.
- Tipografi utama **Inter** via Google Fonts; gunakan hirarki tipografi jelas, tingkat kontras WCAG yang baik, jangan gunakan font dekoratif berlebihan.
- Gaya visual: modern energy-tech dashboard/landing page, namun **tetap mempertahankan ilustrasi isometrik BESS original** sebagai pusat perhatian. Jangan mengganti dengan stok/ilustrasi generik atau membuat ilustrasi pengganti AI. Tampilkan gambar original yang diunggah sesuai rasio aslinya.
- Ikon lucide, komponen rounded, border hijau tipis, white cards, soft shadows, animasi halus dan reduced-motion support.

**HALAMAN DAN NAVIGASI**
- Website satu halaman responsif (desktop, tablet, mobile), navigasi sticky: Beranda, Tantangan EBT, Eksplorasi BESS, Roadmap RUPTL, Implementasi, Referensi.
- Hero: wordmark BESSition (BESS hijau, ition biru), headline “Menyimpan Energi. Menggerakkan Transisi.”, subjudul “Peran Battery Energy Storage System dalam Mendukung Integrasi Energi Terbarukan Indonesia Menuju Net-Zero Emission 2060.”, ilustrasi user sebagai visual besar, CTA “Jelajahi Teknologi” dan “Lihat Roadmap”.
- Bagian problem: produksi PLTS/PLTB bergantung cuaca dan waktu, beban listrik berubah; visualisasi konseptual yang jelas bedakan dari data pengukuran.
- Eksplorasi BESS: tabs/card interaktif Battery Bank, PCS, BMS, EMS, dan proteksi, masing-masing memiliki penjelasan singkat. Jika hanya ada satu asset gabungan, gunakan crop/overlay secara hati-hati dan jangan mengklaim ada layer objek terpisah.
- “Simulasi” EDUKATIF pagi/siang/sore/malam untuk aliran energi PV↔BESS↔beban dengan label jelas *ilustrasi konseptual, bukan simulasi power flow atau data real*.
- Roadmap RUPTL: tunjukkan 10,3 GW rencana storage; 6,0 GW/27 GWh BESS dan 4,3 GW pumped storage; 2025–2029 3,0 GW, 2030–2034 7,3 GW. Tulis bahwa semuanya rencana, bukan kapasitas terpasang/realiasi. Pastikan data dari sumber resmi terverifikasi sebelum publikasi.
- Implementasi Indonesia: estimasi kebutuhan investasi USD 5 miliar periode 2026–2034 menurut IEA; PLN USD 3 miliar, swasta USD 2 miliar; tantangan regulasi BESS standalone, kepastian kontrak remunerasi, dan bankability.
- Penutup Net-Zero Emission 2060 yang menghubungkan fleksibilitas sistem dengan peningkatan pemanfaatan energi rendah karbon, tanpa mengklaim BESS otomatis mengurangi emisi.
- Referensi: link ke ESDM/PLN/IEA dan akses PDF referensi jika berkas disediakan.

**UX DAN AKSESIBILITAS**
- Semua navigasi berfungsi; sticky navbar, smooth scrolling, tombol menu mobile, tabs interaktif; animasi informatif (tidak berlebihan).
- Hindari layout pecah di 360px; kartu data terbaca, teks tetap kontras pada latar.
- Gunakan responsive images, lazy load, alt text, semantic headings, keyboard focus styles.
- Jangan tampilkan angka palsu, jangan buat sumber/link referensi fiktif, jangan ganti data yang tidak ada dengan tebakan.

**TEKNIS**
- Buat codebase siap-deploy Vercel. Boleh memakai stack yang paling kompatibel dengan v0 (mis. Next.js), asalkan responsive, bisa di-build, dan tidak perlu database. Bila saya memberikan repository React/Vite existing, utamakan menjaga stack dan aset original tanpa penulisan ulang yang tidak perlu.
- Sertakan README deployment dan pengaturan environment variable (jika ada).
- Uji build dan perbaiki error sebelum publish; jangan menyatakan live sebelum deployment sukses.
- Tujuannya website edukasi interaktif BESSition yang setia pada poster, bukan template umum SaaS.

**CATATAN KOMPETISI**
Website ini adalah demonstrasi terpisah dari poster lomba. Penggunaan AI generatif dalam karya INFOGREEN 2026 perlu diperiksa terhadap aturan panitia.
