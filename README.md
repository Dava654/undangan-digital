# Undangan Pernikahan Digital Khas Melayu

Struktur berkas proyek yang bersih, modular, dan siap pakai:

```
undangan-pernikahan/
├── index.html        # Halaman web utama
├── server.js         # Server Node.js lokal & API buku tamu (/api/wishes)
├── package.json      # Konfigurasi proyek & script server
├── README.md         # Dokumentasi petunjuk penggunaan
├── assets/           # Media & gambar aktif
│   ├── bride_white.jpg     # Foto mempelai wanita (HD)
│   ├── groom_white.jpg     # Foto mempelai pria (HD)
│   ├── cover_couple.jpg    # Foto latar sampul (Gate)
│   ├── monogram_ad.png     # Logo inisial monogram
│   ├── photo_couple_1.jpg  # Background slide 1
│   ├── photo_couple_2.jpg  # Background slide 2
│   └── photo_couple_3.jpg  # Background slide 3
├── css/
│   └── style.css     # Gaya visual, tipografi, & tema Melayu
├── data/
│   └── wishes.json   # Penyimpanan data ucapan & doa restu publik
└── js/
    └── script.js     # Logika interaktif, audio, countdown, RSVP, & CONFIG
```

---

## Cara Menjalankan Server Lokal

Jalankan perintah berikut di terminal:
```bash
npm start
```
Akses undangan pernikahan di browser: `http://localhost:3000`

---

## Cara Mengubah Data Pernikahan

Buka file [js/script.js](file:///c:/Users/dava/Documents/undangan-pernikahan/js/script.js), lalu sesuaikan bagian objek **`CONFIG`** paling atas:

- **Nama Mempelai**: `groom` dan `bride` (nama panggilan, nama lengkap, nama orang tua, foto, alamat).
- **Kutipan / Ayat Al-Qur'an**: `quote` (teks Arab lengkap dengan harakat, terjemahan, dan referensi).
- **Daftar Acara**: `events` (Akad, Resepsi, tanggal ISO, waktu, lokasi, dan link Google Maps).
- **Target Hitung Mundur**: `countdownTarget` (format ISO: `YYYY-MM-DDTHH:mm:ss+07:00`).
- **Cerita Cinta (Love Story)**: daftar judul dan kisah pada `story`.
- **Rekening Hadiah / Amplop Digital**: `gifts` (nama bank, nomor rekening, dan nama pemilik).

---

## Fitur URL Nama Tamu Undangan

Untuk menampilkan nama tamu otomatis pada sampul depan (Gate), tambahkan parameter `?to=Nama+Tamu` di akhir URL undangan:

```
http://localhost:3000/?to=Budi+Santoso
```

