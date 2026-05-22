import React, { useState, useEffect, useCallback, useRef } from "react";

// ════════════════════════════════════════════════════════════
// 🎨  KONFIGURASI SEKOLAH  —  EDIT BAGIAN INI SAJA
// ────────────────────────────────────────────────────────────
// Untuk memakai aplikasi ini di sekolah lain, cukup ubah nilai
// di bawah. Tidak perlu menyentuh kode lain di file ini.
// ════════════════════════════════════════════════════════════

// --- LOGO SEKOLAH ---------------------------------------------------------
// Cara mengganti logo (pilih SALAH SATU):
//   (A) MUDAH: ganti seluruh string di bawah dengan alamat gambar, contoh:
//       const LOGO_SEKOLAH = "data:image/jpeg;base64,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";
//   (B) base64: buka https://www.base64-image.de , upload logo,
//       salin hasilnya (diawali "data:image/...") dan tempel di bawah.
// Logo sebaiknya berbentuk persegi (mis. 256x256 px) agar tidak gepeng.
const LOGO_SEKOLAH = "data:image/jpeg;base64,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";

// --- IDENTITAS SEKOLAH ----------------------------------------------------
const CONFIG = {
  // Nama lengkap sekolah (tampil di JUDUL halaman login).
  namaSekolah: "SMP NEGERI 2 BUNGO",
  // Nama singkat (tampil di SIDEBAR dashboard guru, baris atas).
  namaSekolahSingkat: "SMPN 2 BUNGO",
  // Lokasi / keterangan (tampil di SIDEBAR, baris bawah).
  lokasiSekolah: "Bungo, Jambi",
  // Teks kecil di bawah judul halaman login.
  subtitle: "UJIAN AKHIR SEKOLAH",
  // Logo (jangan diubah — ambil dari LOGO_SEKOLAH di atas).
  logoUrl: LOGO_SEKOLAH,
};

// --- DAFTAR KELAS ---------------------------------------------------------
// Sesuaikan dengan kelas di sekolah Anda. Format: "Label Grup": ["kelas", ...]
// Boleh menambah/menghapus grup maupun kelas.
const DAFTAR_KELAS = {
  "Kelas 7": ["7"],
  "Kelas 8": ["8"],
  "Kelas 9": ["9"],
};


// ============================================================
// KATEX LOADER & RENDERER
// Load KaTeX dari CDN untuk render rumus matematika
// Format yang dipakai:
//   $...$        → inline math (di dalam paragraf)
//   $$...$$      → display math (rumus besar, terpusat)
// Contoh: "Akar dari $\sqrt{25}$ adalah 5"
// ============================================================
const KATEX_VERSION = "0.16.11";
const KATEX_CSS_URL = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.css`;
const KATEX_JS_URL = `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`;

let katexReady = false;
let katexPromise = null;

function loadKatex() {
  if (katexReady) return Promise.resolve();
  if (katexPromise) return katexPromise;

  katexPromise = new Promise((resolve, reject) => {
    // Load CSS
    if (!document.querySelector(`link[href="${KATEX_CSS_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = KATEX_CSS_URL;
      document.head.appendChild(link);
    }

    // Load JS
    if (window.katex) {
      katexReady = true;
      return resolve();
    }
    const script = document.createElement("script");
    script.src = KATEX_JS_URL;
    script.defer = true;
    script.onload = () => { katexReady = true; resolve(); };
    script.onerror = () => {
      // Reset supaya percobaan berikutnya bisa coba load lagi
      katexPromise = null;
      script.remove();
      reject(new Error("Gagal memuat KaTeX"));
    };
    document.head.appendChild(script);
  });
  return katexPromise;
}

// React component untuk render teks dengan rumus matematika
// Cara pakai: <MathText text="Hasil $\sqrt{25}$ adalah 5" />
function MathText({ text, displayMode = false }) {
  const ref = useRef(null);
  // state `ready` dipakai sebagai dependency useEffect render,
  // supaya teks dirender ulang begitu KaTeX selesai dimuat.
  const [ready, setReady] = useState(katexReady);

  useEffect(() => {
    let aktif = true;
    loadKatex()
      .then(() => { if (aktif) setReady(true); })
      .catch(err => {
        console.error(err);
        // Walau KaTeX gagal dimuat, tetap set ready supaya
        // teks ditampilkan apa adanya (tidak kosong).
        if (aktif) setReady(true);
      });
    return () => { aktif = false; };
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const isiText = text == null ? "" : String(text);
    container.innerHTML = ""; // clear

    // Helper: render teks biasa (mendukung \n)
    const tulisTeksBiasa = (target, str) => {
      str.split("\n").forEach((line, i, arr) => {
        target.appendChild(document.createTextNode(line));
        if (i < arr.length - 1) target.appendChild(document.createElement("br"));
      });
    };

    // FALLBACK: kalau KaTeX belum siap, tampilkan teks apa adanya dulu.
    // Begitu KaTeX siap, `ready` berubah → effect ini jalan lagi → dirender ulang dengan rumus.
    if (!window.katex) {
      tulisTeksBiasa(container, isiText);
      return;
    }

    if (!isiText) return;

    // Split text by $$...$$ (display) dan $...$ (inline)
    const regex = /(\$\$[^$]+\$\$|\$[^$\n]+\$)/g;
    const parts = isiText.split(regex);

    parts.forEach(part => {
      if (!part) return;
      const isDisplay = part.startsWith("$$") && part.endsWith("$$");
      const isInline = !isDisplay && part.startsWith("$") && part.endsWith("$");

      if (isDisplay || isInline) {
        const latex = part.slice(isDisplay ? 2 : 1, isDisplay ? -2 : -1);
        const span = document.createElement("span");
        try {
          window.katex.render(latex, span, {
            displayMode: isDisplay,
            throwOnError: false,
            errorColor: "#dc2626",
          });
        } catch (e) {
          span.textContent = part;
          span.style.color = "#dc2626";
          span.title = "Error LaTeX: " + e.message;
        }
        container.appendChild(span);
      } else {
        tulisTeksBiasa(container, part);
      }
    });
  }, [text, ready]); // ← `ready` ditambahkan: render ulang saat KaTeX siap

  return <span ref={ref} style={{ display: displayMode ? "block" : "inline" }} />;
}

// Function konversi shortcut sederhana ke LaTeX
// Cara pakai: convertToLatex("Hasil dari sqrt(25) + 1/2")
// Returns: "Hasil dari $\sqrt{25}$ + $\frac{1}{2}$"
function convertToLatex(text) {
  if (!text) return text;
  let result = text;

  // Skip teks yang sudah dalam blok $...$ — jangan double convert
  // Strategy: tokenize dulu jadi [plain, math, plain, math, ...] lalu convert hanya bagian plain
  const tokens = [];
  const regex = /(\$[^$]+\$)/g;
  let lastIdx = 0;
  let m;
  while ((m = regex.exec(result)) !== null) {
    if (m.index > lastIdx) tokens.push({ type: "plain", text: result.slice(lastIdx, m.index) });
    tokens.push({ type: "math", text: m[0] });
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < result.length) tokens.push({ type: "plain", text: result.slice(lastIdx) });

  // Convert tiap bagian plain
  const convertPlain = (s) => {
    let out = s;
    // sqrt(x) -> $\sqrt{x}$
    out = out.replace(/sqrt\(([^()]+)\)/g, "$\\sqrt{$1}$");
    // cbrt(x) -> $\sqrt[3]{x}$  (akar pangkat 3)
    out = out.replace(/cbrt\(([^()]+)\)/g, "$\\sqrt[3]{$1}$");
    // a^b atau a^{...} -> $a^{b}$ (mendukung pangkat dengan angka/huruf tunggal atau {grup})
    out = out.replace(/([a-zA-Z0-9])\^(\{[^}]+\}|[a-zA-Z0-9])/g, (match, base, exp) => {
      const cleanExp = exp.startsWith("{") ? exp.slice(1, -1) : exp;
      return `$${base}^{${cleanExp}}$`;
    });
    // Pecahan: angka/angka -> $\frac{a}{b}$  (hanya pecahan murni angka, hindari "ke-1/2" dll)
    // Pakai lookbehind & lookahead untuk pastikan benar-benar pecahan standalone
    out = out.replace(/(?<![a-zA-Z0-9])(\d+)\/(\d+)(?![a-zA-Z0-9])/g, "$\\frac{$1}{$2}$");
    // pi -> $\pi$  (tapi hindari kata "pipi", "spider", dll dengan word boundary)
    out = out.replace(/\bpi\b/g, "$\\pi$");
    // Operator: x atau * jadi kali (hanya antara angka dan/atau var)
    out = out.replace(/(\d)\s*\*\s*(\d|[a-zA-Z])/g, "$1 \\times $2");
    // Tidak sama dengan: !=
    out = out.replace(/!=/g, "\\neq");
    // Kurang dari sama dengan: <=
    out = out.replace(/<=/g, "\\leq");
    // Lebih dari sama dengan: >=
    out = out.replace(/>=/g, "\\geq");
    // Plus minus: +-
    out = out.replace(/\+\/-/g, "\\pm");
    // Derajat: 90deg, 180deg
    out = out.replace(/(\d+)deg\b/g, "$1^\\circ");
    // Infinity: inf
    out = out.replace(/\binf\b/g, "$\\infty$");

    // Gabung adjacent $...$ jadi satu blok jika terpisah hanya oleh operator/spasi sederhana
    // Contoh: $\frac{1}{2}$ + $\frac{3}{4}$ tetap, tapi bisa jadi 1 blok jika diinginkan
    // Skip ini untuk sederhana

    return out;
  };

  return tokens.map(t => t.type === "plain" ? convertPlain(t.text) : t.text).join("");
}

// Komponen helper untuk menampilkan cheat sheet LaTeX
function LatexHelp() {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("shortcut"); // 'shortcut' atau 'latex'

  const shortcutExamples = [
    { label: "Pangkat", input: "x^2", preview: "$x^{2}$" },
    { label: "Pangkat 12", input: "x^{12}", preview: "$x^{12}$" },
    { label: "Akar kuadrat", input: "sqrt(25)", preview: "$\\sqrt{25}$" },
    { label: "Akar pangkat 3", input: "cbrt(27)", preview: "$\\sqrt[3]{27}$" },
    { label: "Akar bentuk", input: "sqrt(x+1)", preview: "$\\sqrt{x+1}$" },
    { label: "Pecahan", input: "1/2", preview: "$\\frac{1}{2}$" },
    { label: "Pecahan besar", input: "22/7", preview: "$\\frac{22}{7}$" },
    { label: "Kali", input: "3*4", preview: "$3 \\times 4$" },
    { label: "Pi", input: "pi", preview: "$\\pi$" },
    { label: "Pi r²", input: "pi*r^2", preview: "$\\pi \\cdot r^{2}$" },
    { label: "Derajat", input: "90deg", preview: "$90^\\circ$" },
    { label: "Tidak sama", input: "a != b", preview: "$a \\neq b$" },
    { label: "≤", input: "a <= b", preview: "$a \\leq b$" },
    { label: "≥", input: "a >= b", preview: "$a \\geq b$" },
    { label: "± (plus minus)", input: "+/-5", preview: "$\\pm 5$" },
    { label: "Tak hingga", input: "inf", preview: "$\\infty$" },
  ];

  const latexExamples = [
    { label: "Pangkat", code: "x^2", display: "x^2" },
    { label: "Pangkat (lebih dari 1 angka)", code: "x^{12}", display: "x^{12}" },
    { label: "Akar kuadrat", code: "\\sqrt{25}", display: "\\sqrt{25}" },
    { label: "Akar pangkat n", code: "\\sqrt[3]{8}", display: "\\sqrt[3]{8}" },
    { label: "Pecahan", code: "\\frac{a}{b}", display: "\\frac{a}{b}" },
    { label: "Pecahan campuran", code: "2\\frac{1}{3}", display: "2\\frac{1}{3}" },
    { label: "Kali", code: "3 \\times 4", display: "3 \\times 4" },
    { label: "Bagi", code: "10 \\div 2", display: "10 \\div 2" },
    { label: "Tidak sama", code: "a \\neq b", display: "a \\neq b" },
    { label: "Kurang dari/sama", code: "a \\leq b", display: "a \\leq b" },
    { label: "Lebih dari/sama", code: "a \\geq b", display: "a \\geq b" },
    { label: "Plus minus", code: "\\pm 5", display: "\\pm 5" },
    { label: "Pi", code: "\\pi r^2", display: "\\pi r^2" },
    { label: "Tak hingga", code: "\\infty", display: "\\infty" },
    { label: "Derajat", code: "90^\\circ", display: "90^\\circ" },
    { label: "Sigma (jumlah)", code: "\\sum_{i=1}^{n} i", display: "\\sum_{i=1}^{n} i" },
  ];

  return (
    <div style={{marginTop:"8px"}}>
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        style={{background:"transparent", border:"1px dashed var(--border)", borderRadius:"var(--radius2)", padding:"6px 12px", fontSize:"12px", color:"var(--blue)", cursor:"pointer", fontWeight:"600"}}
      >
        {show ? "▲ Tutup Cheat Sheet" : "📐 Lihat Cheat Sheet Rumus Matematika"}
      </button>
      {show && (
        <div style={{marginTop:"8px", padding:"12px", background:"#fef3c7", border:"1px solid #fcd34d", borderRadius:"var(--radius2)", fontSize:"12px"}}>
          {/* Tab pilihan mode */}
          <div style={{display:"flex", gap:"6px", marginBottom:"10px"}}>
            <button
              type="button"
              onClick={() => setMode("shortcut")}
              style={{padding:"6px 12px", fontSize:"11px", fontWeight:"700", border:"none", borderRadius:"6px", cursor:"pointer",
                background: mode === "shortcut" ? "#15803d" : "white",
                color: mode === "shortcut" ? "white" : "#78350f"}}
            >🎯 SHORTCUT (Direkomendasikan)</button>
            <button
              type="button"
              onClick={() => setMode("latex")}
              style={{padding:"6px 12px", fontSize:"11px", fontWeight:"700", border:"none", borderRadius:"6px", cursor:"pointer",
                background: mode === "latex" ? "#7c3aed" : "white",
                color: mode === "latex" ? "white" : "#78350f"}}
            >🎓 LATEX (Untuk yang Mahir)</button>
          </div>

          {mode === "shortcut" ? (
            <>
              <p style={{marginBottom:"8px", color:"#78350f"}}>
                <strong>Cara mudah:</strong> Ketik pakai shortcut di bawah, lalu klik tombol <strong>🔄 Convert ke Rumus</strong>. Contoh: ketik <code style={{background:"#fff",padding:"2px 6px",borderRadius:"3px"}}>Hasil sqrt(25) + 1/2 adalah?</code> → otomatis jadi rumus cantik.
              </p>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))", gap:"8px"}}>
                {shortcutExamples.map((ex, i) => (
                  <div key={i} style={{padding:"8px", background:"white", border:"1px solid #fbbf24", borderRadius:"6px"}}>
                    <div style={{fontSize:"10px", color:"#92400e", fontWeight:"700", marginBottom:"4px"}}>{ex.label}</div>
                    <div style={{fontFamily:"var(--mono)", fontSize:"11px", color:"#78350f", marginBottom:"4px", wordBreak:"break-all"}}>Ketik: <strong>{ex.input}</strong></div>
                    <div style={{fontSize:"14px"}}>Jadi: <MathText text={ex.preview} /></div>
                  </div>
                ))}
              </div>
              <p style={{marginTop:"10px", fontSize:"11px", color:"#78350f"}}>
                <strong>💡 Tips:</strong> Bisa pakai shortcut ini juga di Excel/Word saat bikin soal, lalu import ke sistem.
              </p>
            </>
          ) : (
            <>
              <p style={{marginBottom:"8px", color:"#78350f"}}>
                <strong>Cara LaTeX:</strong> Tulis rumus di antara tanda <code style={{background:"#fff",padding:"2px 4px",borderRadius:"3px"}}>$...$</code>. Contoh: <code style={{background:"#fff",padding:"2px 4px",borderRadius:"3px"}}>Hasil dari $\sqrt{"{25}"}$ adalah 5</code>
              </p>
              <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))", gap:"8px"}}>
                {latexExamples.map((ex, i) => (
                  <div key={i} style={{padding:"8px", background:"white", border:"1px solid #fbbf24", borderRadius:"6px"}}>
                    <div style={{fontSize:"10px", color:"#92400e", fontWeight:"700", marginBottom:"4px"}}>{ex.label}</div>
                    <div style={{fontFamily:"var(--mono)", fontSize:"11px", color:"#78350f", marginBottom:"4px", wordBreak:"break-all"}}>${ex.code}$</div>
                    <div style={{fontSize:"14px"}}><MathText text={`$${ex.display}$`} /></div>
                  </div>
                ))}
              </div>
              <p style={{marginTop:"10px", fontSize:"11px", color:"#78350f"}}>
                <strong>💡 Tips:</strong> Untuk rumus yang lebih besar dan terpusat, pakai <code style={{background:"#fff",padding:"2px 4px",borderRadius:"3px"}}>$$...$$</code> (dua tanda dolar).
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// SUPABASE CONFIG — Ganti dengan kredensial Supabase Anda
// ============================================================
const SUPABASE_URL = "https://wdmzabkbxtnywpbzjyvc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_-2d_xQR8GdhKLRzkLFR1Zg_l1KnrDyK";

async function supabase(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Supabase error");
  }
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

// ============================================================
// UPLOAD GAMBAR KE SUPABASE STORAGE
// Nama bucket: "gambar-soal" (harus dibuat dulu di Supabase, lihat panduan)
// ============================================================
const STORAGE_BUCKET = "gambar-soal";

async function uploadGambar(file, onProgress) {
  if (!file) throw new Error("Tidak ada file dipilih");

  // Validasi tipe file
  const tipeValid = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!tipeValid.includes(file.type)) {
    throw new Error("File harus berupa gambar (JPG, PNG, GIF, atau WEBP)");
  }

  // Validasi ukuran (maks 5 MB)
  const maksUkuran = 5 * 1024 * 1024;
  if (file.size > maksUkuran) {
    throw new Error(`Ukuran gambar terlalu besar (${(file.size/1024/1024).toFixed(1)} MB). Maksimal 5 MB.`);
  }

  // Buat nama file unik: timestamp + random + ekstensi
  const ext = file.name.split(".").pop().toLowerCase();
  const namaFile = `soal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;

  // Upload pakai XMLHttpRequest agar bisa lacak progress
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const url = `${SUPABASE_URL}/storage/v1/object/${STORAGE_BUCKET}/${namaFile}`;

    xhr.open("POST", url);
    xhr.setRequestHeader("apikey", SUPABASE_ANON_KEY);
    xhr.setRequestHeader("Authorization", `Bearer ${SUPABASE_ANON_KEY}`);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.setRequestHeader("x-upsert", "true");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // URL publik gambar
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/${namaFile}`;
        resolve(publicUrl);
      } else {
        let pesan = "Gagal upload gambar";
        try {
          const err = JSON.parse(xhr.responseText);
          if (err.message) pesan = err.message;
          if (err.error === "Bucket not found") {
            pesan = "Bucket 'gambar-soal' belum dibuat di Supabase. Lihat panduan setup.";
          }
        } catch {}
        reject(new Error(pesan));
      }
    };

    xhr.onerror = () => reject(new Error("Koneksi gagal saat upload gambar"));
    xhr.send(file);
  });
}

// ============================================================
// SUBMIT QUEUE SYSTEM
// Antrian submit untuk mencegah overload saat banyak siswa
// submit bersamaan
// ============================================================
const submitQueue = {
  queue: [],
  running: false,
  maxRetry: 5,
  baseDelay: 500, // ms

  add(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject, retries: 0 });
      this.process();
    });
  },

  async process() {
    if (this.running || this.queue.length === 0) return;
    this.running = true;
    const item = this.queue.shift();
    try {
      const result = await this.runWithRetry(item);
      item.resolve(result);
    } catch (err) {
      item.reject(err);
    }
    this.running = false;
    // Jeda antar submit untuk hindari burst ke Supabase
    await new Promise(r => setTimeout(r, 200));
    this.process();
  },

  async runWithRetry(item) {
    for (let attempt = 0; attempt <= this.maxRetry; attempt++) {
      try {
        return await item.fn();
      } catch (err) {
        if (attempt === this.maxRetry) throw err;
        // Exponential backoff: 500ms, 1s, 2s, 4s, 8s
        const delay = this.baseDelay * Math.pow(2, attempt);
        const jitter = Math.random() * 300; // acak sedikit agar tidak semua retry bersamaan
        await new Promise(r => setTimeout(r, delay + jitter));
      }
    }
  }
};

// ============================================================
// SHUFFLE UTILS
// ============================================================
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Acak soal DAN opsi jawaban, kembalikan soal dengan mapping jawaban benar
function shuffleSoalDanOpsi(soalAsli) {
  if (!soalAsli || soalAsli.length === 0) return [];
  const soalAcak = shuffleArray(soalAsli);
  return soalAcak.map(s => {
    // Pastikan opsi adalah array yang valid
    let opsi = s.opsi;
    if (!Array.isArray(opsi)) {
      try { opsi = JSON.parse(opsi); } catch { opsi = ["A","B","C","D"]; }
    }
    if (!opsi || opsi.length === 0) opsi = ["A","B","C","D"];

    const jawabanIdx = typeof s.jawaban === 'number' ? s.jawaban : 0;
    const jawabanAsli = opsi[jawabanIdx] ?? opsi[0];
    const opsiAcak = shuffleArray([...opsi]);
    const jawabanBaru = opsiAcak.indexOf(jawabanAsli);
    return { ...s, opsi: opsiAcak, jawaban: jawabanBaru < 0 ? 0 : jawabanBaru };
  });
}

// ============================================================
// CONSTANTS
// ============================================================
// Daftar mata pelajaran yang bisa dipilih guru saat membuat ujian.
// Tambah / hapus sesuai kebutuhan sekolah.
const MAPEL = [
  "Matematika","Bahasa Indonesia","Bahasa Inggris","IPA","IPS",
  "PKn","Agama","Informatika","PJOK","Prakarya",
];

// Akun login untuk guru / admin.
// PENTING: ganti username & password di bawah sebelum dipakai sungguhan!
// Bisa menambah akun guru sebanyak yang dibutuhkan.
const GURU_ACCOUNTS = [
  { username: "admin", password: "admin123", nama: "Administrator" },
  { username: "guru1", password: "guru123", nama: "Guru Mapel" },
];

// ============================================================
// STYLES
// ============================================================
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0f172a; --navy2: #1e293b; --navy3: #334155;
    --blue: #3b82f6; --blue2: #2563eb; --blue3: #dbeafe;
    --green: #22c55e; --green2: #16a34a; --green3: #dcfce7;
    --red: #ef4444; --red2: #dc2626; --red3: #fee2e2;
    --yellow: #f59e0b; --yellow3: #fef3c7;
    --white: #ffffff; --gray: #64748b; --gray2: #94a3b8;
    --light: #f1f5f9; --border: #e2e8f0;
    --font: 'Plus Jakarta Sans', sans-serif;
    --mono: 'JetBrains Mono', monospace;
    --radius: 12px; --radius2: 8px;
    --shadow: 0 4px 24px rgba(15,23,42,0.08);
    --shadow2: 0 1px 4px rgba(15,23,42,0.06);
  }
  body { font-family: var(--font); background: var(--light); color: var(--navy); }
  button { font-family: var(--font); cursor: pointer; border: none; outline: none; }
  input, select, textarea { font-family: var(--font); outline: none; }
  .app { min-height: 100vh; }

  /* LOGIN */
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%); padding: 20px; position: relative; overflow: hidden; }
  .login-wrap::before { content: ''; position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%); top: -200px; right: -200px; }
  .login-wrap::after { content: ''; position: absolute; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%); bottom: -100px; left: -100px; }
  .login-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 48px; width: 100%; max-width: 420px; position: relative; z-index: 1; }
  .login-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
  .login-logo-icon { width: 56px; height: 56px; border-radius: 50%; overflow: hidden; flex-shrink: 0; }
  .login-logo-icon img { width: 100%; height: 100%; object-fit: cover; }
  .login-logo h1 { font-size: 22px; font-weight: 800; color: white; }
  .login-logo span { color: var(--blue); }
  .login-subtitle { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 32px; }
  .login-tab { display: flex; background: rgba(255,255,255,0.05); border-radius: var(--radius2); padding: 4px; margin-bottom: 28px; }
  .login-tab button { flex: 1; padding: 10px; border-radius: 6px; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.5); background: transparent; transition: all .2s; }
  .login-tab button.active { background: var(--blue); color: white; }
  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); margin-bottom: 8px; }
  .field input, .field select { width: 100%; padding: 12px 16px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius2); color: white; font-size: 14px; transition: border .2s; }
  .field input::placeholder { color: rgba(255,255,255,0.3); }
  .field input:focus, .field select:focus { border-color: var(--blue); background: rgba(59,130,246,0.08); }
  .field select option { background: var(--navy); }
  .btn-primary { width: 100%; padding: 14px; background: linear-gradient(135deg, var(--blue2), var(--blue)); color: white; border-radius: var(--radius2); font-size: 15px; font-weight: 700; transition: all .2s; margin-top: 4px; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(59,130,246,0.4); }
  .btn-primary:active { transform: translateY(0); }
  .error-msg { background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5; padding: 10px 14px; border-radius: var(--radius2); font-size: 13px; margin-bottom: 16px; }

  /* DASHBOARD GURU */
  .dashboard { display: flex; min-height: 100vh; }
  .sidebar { width: 260px; background: var(--navy); min-height: 100vh; padding: 24px 0; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; z-index: 100; }
  .sidebar-logo { padding: 0 24px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 16px; }
  .sidebar-logo h2 { font-size: 18px; font-weight: 800; color: white; }
  .sidebar-logo span { color: var(--blue); }
  .sidebar-logo p { color: var(--gray2); font-size: 12px; margin-top: 4px; }
  .sidebar-menu { flex: 1; padding: 0 12px; }
  .sidebar-menu button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: var(--radius2); color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 500; background: transparent; transition: all .2s; margin-bottom: 4px; text-align: left; }
  .sidebar-menu button:hover { background: rgba(255,255,255,0.06); color: white; }
  .sidebar-menu button.active { background: rgba(59,130,246,0.2); color: var(--blue); }
  .sidebar-bottom { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08); }
  .sidebar-bottom button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: var(--radius2); color: rgba(255,255,255,0.5); font-size: 14px; background: transparent; transition: all .2s; }
  .sidebar-bottom button:hover { color: var(--red); background: rgba(239,68,68,0.1); }
  .main { margin-left: 260px; flex: 1; padding: 32px; }
  .page-header { margin-bottom: 28px; }
  .page-header h1 { font-size: 24px; font-weight: 800; color: var(--navy); }
  .page-header p { color: var(--gray); font-size: 14px; margin-top: 4px; }

  /* CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
  .stat-card { background: white; border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow2); border: 1px solid var(--border); }
  .stat-card .stat-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 12px; }
  .stat-card .stat-val { font-size: 28px; font-weight: 800; color: var(--navy); font-family: var(--mono); }
  .stat-card .stat-label { font-size: 13px; color: var(--gray); margin-top: 2px; }

  .card { background: white; border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow2); border: 1px solid var(--border); margin-bottom: 20px; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .card-header h2 { font-size: 16px; font-weight: 700; }

  /* FORM SOAL */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-field { margin-bottom: 16px; }
  .form-field label { display: block; font-size: 13px; font-weight: 600; color: var(--navy3); margin-bottom: 6px; }
  .form-field input, .form-field select, .form-field textarea { width: 100%; padding: 10px 14px; border: 1.5px solid var(--border); border-radius: var(--radius2); font-size: 14px; color: var(--navy); transition: border .2s; background: white; }
  .form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: var(--blue); }
  .form-field textarea { resize: vertical; min-height: 80px; }
  .option-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .option-label { width: 28px; height: 28px; border-radius: 50%; background: var(--blue3); color: var(--blue2); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
  .option-row input { flex: 1; }
  .option-row.correct .option-label { background: var(--green3); color: var(--green2); }

  /* BUTTONS */
  .btn { padding: 8px 16px; border-radius: var(--radius2); font-size: 13px; font-weight: 600; transition: all .2s; display: inline-flex; align-items: center; gap: 6px; }
  .btn-blue { background: var(--blue); color: white; }
  .btn-blue:hover { background: var(--blue2); }
  .btn-green { background: var(--green); color: white; }
  .btn-green:hover { background: var(--green2); }
  .btn-red { background: var(--red3); color: var(--red2); }
  .btn-red:hover { background: var(--red); color: white; }
  .btn-ghost { background: var(--light); color: var(--navy3); }
  .btn-ghost:hover { background: var(--border); }

  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  th { background: var(--light); padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 700; color: var(--gray); text-transform: uppercase; letter-spacing: .05em; }
  td { padding: 12px 14px; border-bottom: 1px solid var(--border); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #fafbff; }
  .badge { display: inline-flex; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 600; }
  .badge-blue { background: var(--blue3); color: var(--blue2); }
  .badge-green { background: var(--green3); color: var(--green2); }
  .badge-red { background: var(--red3); color: var(--red2); }
  .badge-yellow { background: var(--yellow3); color: #92400e; }

  /* UJIAN KEY MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 200; padding: 20px; }
  .modal { background: white; border-radius: 20px; padding: 32px; max-width: 480px; width: 100%; box-shadow: 0 24px 64px rgba(15,23,42,0.2); }
  .modal h2 { font-size: 20px; font-weight: 800; margin-bottom: 8px; }
  .modal p { color: var(--gray); font-size: 14px; margin-bottom: 24px; }
  .exam-key-display { background: var(--light); border: 2px dashed var(--blue); border-radius: var(--radius); padding: 20px; text-align: center; margin-bottom: 20px; }
  .exam-key-display .key { font-family: var(--mono); font-size: 36px; font-weight: 700; color: var(--blue2); letter-spacing: 6px; }
  .exam-key-display p { font-size: 12px; color: var(--gray); margin-top: 4px; margin-bottom: 0; }

  /* CBT STUDENT */
  .cbt-wrap { min-height: 100vh; background: #f8faff; }
  .cbt-header { background: var(--navy); padding: 0 24px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
  .cbt-header h2 { color: white; font-size: 15px; font-weight: 700; }
  .cbt-header-info { display: flex; align-items: center; gap: 16px; }
  .cbt-timer { background: rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 14px; color: white; font-family: var(--mono); font-weight: 700; font-size: 16px; }
  .cbt-timer.danger { background: rgba(239,68,68,0.3); color: #fca5a5; animation: pulse 1s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .7; } }
  .cbt-student-info { color: rgba(255,255,255,0.7); font-size: 13px; }
  .cbt-body { display: flex; gap: 20px; padding: 20px; max-width: 1100px; margin: 0 auto; }
  .cbt-main { flex: 1; }
  .cbt-sidebar { width: 220px; flex-shrink: 0; }
  .cbt-question-card { background: white; border-radius: var(--radius); padding: 28px; box-shadow: var(--shadow2); border: 1px solid var(--border); }
  .cbt-q-num { font-size: 12px; font-weight: 700; color: var(--blue); text-transform: uppercase; letter-spacing: .05em; margin-bottom: 12px; }
  .cbt-q-text { font-size: 16px; line-height: 1.7; color: var(--navy); margin-bottom: 24px; font-weight: 500; }
  .cbt-options { display: flex; flex-direction: column; gap: 10px; }
  .cbt-option { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border: 2px solid var(--border); border-radius: var(--radius2); cursor: pointer; transition: all .15s; }
  .cbt-option:hover { border-color: var(--blue); background: var(--blue3); }
  .cbt-option.selected { border-color: var(--blue2); background: var(--blue3); }
  .cbt-option-label { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--border); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: var(--gray); flex-shrink: 0; transition: all .15s; }
  .cbt-option.selected .cbt-option-label { border-color: var(--blue2); background: var(--blue2); color: white; }
  .cbt-option-text { font-size: 15px; color: var(--navy); }
  .cbt-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; }
  .cbt-sidebar-card { background: white; border-radius: var(--radius); padding: 16px; box-shadow: var(--shadow2); border: 1px solid var(--border); margin-bottom: 12px; }
  .cbt-sidebar-card h3 { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 12px; }
  .cbt-num-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
  .cbt-num-btn { aspect-ratio: 1; border-radius: 6px; font-size: 12px; font-weight: 700; border: 1.5px solid var(--border); background: white; color: var(--navy3); transition: all .15s; }
  .cbt-num-btn.answered { background: var(--blue2); color: white; border-color: var(--blue2); }
  .cbt-num-btn.current { border-color: var(--blue); color: var(--blue); }
  .cbt-legend { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--gray); }
  .cbt-legend span { display: flex; align-items: center; gap: 6px; }
  .cbt-legend-dot { width: 12px; height: 12px; border-radius: 3px; border: 1.5px solid var(--border); }
  .cbt-legend-dot.answered { background: var(--blue2); border-color: var(--blue2); }

  /* RESULT */
  .result-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #0f172a, #1e3a5f); padding: 20px; }
  .result-card { background: white; border-radius: 24px; padding: 48px; max-width: 500px; width: 100%; text-align: center; box-shadow: 0 32px 80px rgba(15,23,42,0.3); }
  .result-score-ring { width: 140px; height: 140px; border-radius: 50%; border: 8px solid var(--border); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; position: relative; }
  .result-score-ring.lulus { border-color: var(--green); }
  .result-score-ring.gagal { border-color: var(--red); }
  .result-score-val { font-size: 42px; font-weight: 800; font-family: var(--mono); }
  .result-score-val.lulus { color: var(--green2); }
  .result-score-val.gagal { color: var(--red2); }
  .result-emoji { font-size: 32px; margin-bottom: 12px; }
  .result-card h2 { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
  .result-card p { color: var(--gray); font-size: 14px; }
  .result-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin: 24px 0; }
  .result-stat { background: var(--light); border-radius: var(--radius2); padding: 14px; }
  .result-stat .val { font-size: 22px; font-weight: 800; font-family: var(--mono); color: var(--navy); }
  .result-stat .lbl { font-size: 11px; color: var(--gray); margin-top: 2px; }

  /* UJIAN MANAGEMENT */
  .ujian-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .ujian-card { background: white; border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow2); }
  .ujian-card h3 { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
  .ujian-card .meta { font-size: 13px; color: var(--gray); margin-bottom: 16px; }
  .ujian-card .actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .key-badge { font-family: var(--mono); font-size: 18px; font-weight: 700; color: var(--blue2); background: var(--blue3); padding: 6px 12px; border-radius: var(--radius2); letter-spacing: 3px; display: inline-block; margin-bottom: 12px; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-100%); transition: transform .3s; }
    .main { margin-left: 0; padding: 16px; }
    .cbt-body { flex-direction: column; }
    .cbt-sidebar { width: 100%; }
    .form-grid { grid-template-columns: 1fr; }
  }
  .empty-state { text-align: center; padding: 48px; color: var(--gray); }
  .empty-state .icon { font-size: 48px; margin-bottom: 12px; }
  .divider { height: 1px; background: var(--border); margin: 20px 0; }
  .loading { display: flex; align-items: center; justify-content: center; padding: 48px; color: var(--gray); gap: 10px; }
`;

// ============================================================
// UTILS
// ============================================================
function genKey() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}
function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

// ============================================================
// PESERTA AKTIF HELPERS
// Cek apakah ada peserta yang sedang ujian (heartbeat < 30 detik)
// Digunakan untuk pengaman hapus ujian/soal
// ============================================================
async function cekPesertaAktif(ujianId = null) {
  if (useDemo) return []; // mode demo tidak ada tracking live
  try {
    // Heartbeat dianggap masih hidup jika < 30 detik
    const cutoff = new Date(Date.now() - 30 * 1000).toISOString();
    let path = `peserta_aktif?status=eq.aktif&last_heartbeat=gte.${cutoff}`;
    if (ujianId !== null) path += `&ujian_id=eq.${ujianId}`;
    return await supabase(path);
  } catch (e) {
    console.error("cekPesertaAktif error:", e);
    return [];
  }
}

// ============================================================
// DEMO DATA (dipakai jika Supabase belum dikonfigurasi)
// ============================================================
let DEMO_UJIAN = [
  { id: 1, mapel: "Matematika", kelas: "X", durasi: 60, key: "MTK001", aktif: true, soal: [
    { id: 1, pertanyaan: "Berapakah hasil dari 2³ + 5²?", opsi: ["30","31","32","33"], jawaban: 2 },
    { id: 2, pertanyaan: "Jika x + 5 = 12, maka x = ?", opsi: ["5","6","7","8"], jawaban: 2 },
    { id: 3, pertanyaan: "Luas lingkaran dengan r = 7 (π=22/7) adalah?", opsi: ["144","150","154","160"], jawaban: 2 },
  ]},
  { id: 2, mapel: "Bahasa Indonesia", kelas: "X", durasi: 90, key: "BIN001", aktif: true, soal: [
    { id: 1, pertanyaan: "Kata baku dari 'foto copy' adalah?", opsi: ["fotokopi","foto kopi","Fotokopi","Photo Copy"], jawaban: 0 },
  ]},
];
let DEMO_HASIL = [];
let useDemo = SUPABASE_URL.includes("YOUR_PROJECT");

// ============================================================
// MAIN APP
// ============================================================
// ============================================================
// ERROR BOUNDARY — Tangkap error blank putih
// ============================================================
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0f172a",padding:"20px"}}>
          <div style={{background:"white",borderRadius:"16px",padding:"32px",maxWidth:"480px",width:"100%",textAlign:"center"}}>
            <div style={{fontSize:"48px",marginBottom:"12px"}}>⚠️</div>
            <h2 style={{fontSize:"18px",fontWeight:"800",marginBottom:"8px",color:"#0f172a"}}>Terjadi Kesalahan</h2>
            <p style={{color:"#64748b",fontSize:"14px",marginBottom:"16px"}}>
              {this.state.error?.message || "Error tidak diketahui"}
            </p>
            <div style={{background:"#f1f5f9",borderRadius:"8px",padding:"12px",fontSize:"12px",color:"#64748b",marginBottom:"20px",textAlign:"left",fontFamily:"monospace"}}>
              {String(this.state.error)}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{background:"#2563eb",color:"white",border:"none",borderRadius:"8px",padding:"12px 24px",fontSize:"14px",fontWeight:"700",cursor:"pointer",width:"100%"}}
            >
              🔄 Kembali ke Halaman Login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Pulihkan login guru dari localStorage (jika ada)
  // Login guru ter-persist supaya refresh tidak logout.
  // Catatan: student-exam SENGAJA tidak di-persist demi keamanan ujian.
  const [screen, setScreen] = useState(() => {
    try {
      const saved = localStorage.getItem("guru_login");
      return saved ? "guru-dashboard" : "login";
    } catch { return "login"; }
  });
  const [guru, setGuru] = useState(() => {
    try {
      const saved = localStorage.getItem("guru_login");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [studentData, setStudentData] = useState(null);
  const [examResult, setExamResult] = useState(null);

  // Helper: login guru + simpan ke localStorage
  const loginGuru = (g) => {
    try { localStorage.setItem("guru_login", JSON.stringify(g)); } catch {}
    setGuru(g);
    setScreen("guru-dashboard");
  };

  // Helper: logout guru + hapus dari localStorage
  const logoutGuru = () => {
    try { localStorage.removeItem("guru_login"); } catch {}
    setGuru(null);
    setScreen("login");
  };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {screen === "login" && (
          <LoginScreen
            onGuruLogin={loginGuru}
            onStudentJoin={(d) => { setStudentData(d); setScreen("student-exam"); }}
          />
        )}
        {screen === "guru-dashboard" && (
          <GuruDashboard guru={guru} onLogout={logoutGuru} />
        )}
        {screen === "student-exam" && (
          <ErrorBoundary>
            <StudentExam
              data={studentData}
              onFinish={(result) => { setExamResult(result); setScreen("result"); }}
            />
          </ErrorBoundary>
        )}
        {screen === "result" && (
          <ResultScreen result={examResult} onBack={() => setScreen("login")} />
        )}
      </div>
    </>
  );
}

// ============================================================
// LOGIN SCREEN — HELPERS
// ============================================================
const _DAYS   = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
const _MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const _TICKER =
  "Selamat datang di Portal Ujian Digital SMPN 2 Muara Bungo \u2003\u2022\u2003 " +
  "Kejujuran adalah Karakter Utama dalam setiap Ujian \u2003\u2022\u2003 " +
  "Pastikan anda login sesuai peran masing-masing \u2003\u2022\u2003 " +
  "Dilarang keras bekerja sama selama ujian berlangsung \u2003\u2022\u2003 " +
  "Selamat mengerjakan — semoga sukses! \u2003\u2022\u2003 " +
  "Portal Ujian Digital v.2026 — Desain: Herman Saputra, S.Pd., Gr. \u2003\u2003";

function _pad(n) { return String(n).padStart(2, "0"); }

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  return {
    time: `${_pad(now.getHours())}:${_pad(now.getMinutes())}:${_pad(now.getSeconds())}`,
    date: `${_DAYS[now.getDay()]}, ${now.getDate()} ${_MONTHS[now.getMonth()]} ${now.getFullYear()}`,
  };
}

function _IconPencil({ size = 32, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function _IconShield({ size = 32, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v3" />
    </svg>
  );
}
function _IconClose({ size = 16, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function _IconEye({ size = 18, color = "#aaa" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function _IconEyeOff({ size = 18, color = "#aaa" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function _PortalCard({ role, onClick }) {
  const isSiswa = role === "siswa";
  const [hov, setHov] = useState(false);
  const bg = isSiswa
    ? (hov ? "linear-gradient(145deg,#1e88e5,#1565c0)" : "linear-gradient(145deg,#2196f3,#1976d2)")
    : (hov ? "linear-gradient(145deg,#43a047,#2e7d32)" : "linear-gradient(145deg,#4caf50,#388e3c)");
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "200px", minHeight: "170px",
        background: bg,
        border: `3px solid ${isSiswa ? "rgba(144,202,249,0.4)" : "rgba(165,214,167,0.4)"}`,
        borderRadius: "18px",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px",
        cursor: "pointer",
        boxShadow: hov
          ? (isSiswa ? "0 12px 36px rgba(25,118,210,0.45)" : "0 12px 36px rgba(46,125,50,0.45)")
          : (isSiswa ? "0 6px 20px rgba(25,118,210,0.3)"  : "0 6px 20px rgba(46,125,50,0.3)"),
        transform: hov ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "all 0.2s cubic-bezier(.34,1.56,.64,1)",
        padding: "24px 16px",
      }}
    >
      <div style={{width:"60px",height:"60px",borderRadius:"50%",background:"rgba(255,255,255,0.18)",border:"2px solid rgba(255,255,255,0.35)",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {isSiswa ? <_IconPencil /> : <_IconShield />}
      </div>
      <div>
        <div style={{fontSize:"20px",fontWeight:900,color:"#fff",letterSpacing:"3px",textTransform:"uppercase",textAlign:"center",textShadow:"0 2px 6px rgba(0,0,0,0.2)"}}>
          {isSiswa ? "Siswa" : "Admin"}
        </div>
        <div style={{fontSize:"11px",color:"rgba(255,255,255,0.8)",textAlign:"center",marginTop:"2px",letterSpacing:"0.5px"}}>
          {isSiswa ? "Portal Ujian" : "Bank Soal"}
        </div>
      </div>
    </button>
  );
}

// ============================================================
// LOGIN SCREEN
// ============================================================
function LoginScreen({ onGuruLogin, onStudentJoin }) {
  const [form, setForm] = useState({ username: "", password: "", nama: "", kelas: "", examKey: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleGuru = async () => {
    setError("");
    const acc = GURU_ACCOUNTS.find(a => a.username === form.username && a.password === form.password);
    if (!acc) return setError("Username atau password salah.");
    onGuruLogin(acc);
  };

  const handleSiswa = async () => {
    setError("");
    if (!form.nama.trim()) return setError("Nama tidak boleh kosong.");
    if (!form.kelas.trim()) return setError("Silakan pilih kelas Anda.");
    if (!form.examKey.trim()) return setError("Kode ujian tidak boleh kosong.");
    setLoading(true);
    try {
      let ujian;
      if (useDemo) {
        ujian = DEMO_UJIAN.find(u => u.key.toUpperCase() === form.examKey.toUpperCase() && u.aktif);
      } else {
        const data = await supabase(`ujian?key=eq.${form.examKey.toUpperCase()}&aktif=eq.true`);
        if (data.length > 0) {
          const soalRaw = await supabase(`soal?ujian_id=eq.${data[0].id}&order=id.asc`);
          // Parse opsi — bisa berupa array atau JSON string
          const soalParsed = soalRaw.map(s => ({
            ...s,
            opsi: Array.isArray(s.opsi)
              ? s.opsi
              : typeof s.opsi === 'string'
                ? (() => { try { return JSON.parse(s.opsi); } catch { return []; } })()
                : [],
          }));
          ujian = { ...data[0], soal: soalParsed };
        }
      }
      if (!ujian) {
        setError("Kode ujian tidak ditemukan atau ujian tidak aktif.");
      } else if (!ujian.google_form_url && (!ujian.soal || ujian.soal.length === 0)) {
        setError("Kode ujian ditemukan, tetapi belum ada soal yang ditambahkan. Hubungi guru.");
      } else {
        // Cek jadwal jam buka/tutup
        if (ujian.jam_buka || ujian.jam_tutup) {
          const now = new Date();
          const toDate = (t) => { const [h,m] = t.split(":"); const d = new Date(); d.setHours(Number(h), Number(m), 0); return d; };
          if (ujian.jam_buka && now < toDate(ujian.jam_buka)) {
            setLoading(false);
            return setError(`⏰ Ujian belum dibuka. Ujian dibuka pukul ${ujian.jam_buka}.`);
          }
          if (ujian.jam_tutup && now > toDate(ujian.jam_tutup)) {
            setLoading(false);
            return setError(`⏰ Waktu ujian sudah berakhir pukul ${ujian.jam_tutup}.`);
          }
        }
        onStudentJoin({ ujian, siswa: { nama: form.nama, kelas: form.kelas } });
      }
    } catch (e) {
      console.error("Error login siswa:", e);
      setError("Gagal terhubung. Periksa koneksi internet. Detail: " + e.message);
    }
    setLoading(false);
  };

  const { time, date } = useClock();
  const [modal, setModal] = useState(null); // "siswa" | "admin" | null

  // style helpers
  const fldLabel = { display:"block", fontSize:"11px", fontWeight:700, color:"#555", letterSpacing:"0.5px", textTransform:"uppercase", marginBottom:"6px" };
  const fldInput = (focus) => ({
    width:"100%", padding:"10px 14px",
    border: focus ? "1.5px solid #2176d2" : "1.5px solid #dde3ee",
    borderRadius:"9px", fontSize:"14px", outline:"none",
    background: focus ? "#fff" : "#f8fafc",
    fontFamily:"inherit", color:"#333",
    transition:"border-color 0.15s",
  });

  return (
    <>
      {/* ── Global ticker animation ── */}
      <style>{`
        @keyframes _ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes _fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes _popUp  { from{transform:scale(0.87);opacity:0} to{transform:scale(1);opacity:1} }
      `}</style>

      <div style={{minHeight:"100vh", display:"flex", flexDirection:"column", background:"#eef2f8"}}>

        {/* ── TICKER BAR ───────────────────────────────────────────── */}
        <div style={{background:"#0d2570", borderBottom:"3px solid #f0c020", display:"flex", alignItems:"stretch", overflow:"hidden", height:"34px", flexShrink:0}}>
          <div style={{background:"#f0c020", color:"#0d2570", fontWeight:800, fontSize:"11px", letterSpacing:"1.5px", padding:"0 14px", display:"flex", alignItems:"center", whiteSpace:"nowrap", flexShrink:0}}>
            ▶ INFO
          </div>
          <div style={{overflow:"hidden", flex:1, display:"flex", alignItems:"center"}}>
            <div style={{display:"inline-block", whiteSpace:"nowrap", animation:"_ticker 30s linear infinite", color:"#fff", fontSize:"12.5px", paddingLeft:"20px"}}>
              {(_TICKER + _TICKER)}
            </div>
          </div>
        </div>

        {/* ── HEADER ───────────────────────────────────────────────── */}
        <div style={{background:"linear-gradient(160deg,#1a3a8f 0%,#0a1e5e 100%)", padding:"28px 24px 24px", position:"relative", textAlign:"center", borderBottom:"4px solid #f0c020", flexShrink:0}}>
          {/* Clock */}
          <div style={{position:"absolute", top:"16px", right:"20px", textAlign:"right"}}>
            <div style={{fontSize:"28px", fontWeight:900, color:"#f0c020", letterSpacing:"3px", lineHeight:1, fontVariantNumeric:"tabular-nums"}}>{time}</div>
            <div style={{fontSize:"11px", color:"rgba(255,255,255,0.65)", marginTop:"3px"}}>{date}</div>
          </div>

          {/* Logo */}
          <div style={{width:"72px", height:"72px", borderRadius:"50%", background:"#fff", border:"3px solid #f0c020", margin:"0 auto 14px", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(0,0,0,0.3)", overflow:"hidden"}}>
            <img src={CONFIG.logoUrl} alt={"Logo " + CONFIG.namaSekolah} style={{width:"68px", height:"68px", borderRadius:"50%", objectFit:"cover"}} />
          </div>

          {/* Title */}
          <h1 style={{fontSize:"clamp(28px,5.5vw,54px)", fontWeight:900, color:"#fff", letterSpacing:"3px", textTransform:"uppercase", lineHeight:1.05, textShadow:"0 3px 12px rgba(0,0,0,0.4)", margin:0}}>
            Ujian Akhir Semester
          </h1>
          <div style={{width:"70px", height:"3px", background:"#f0c020", margin:"10px auto 8px", borderRadius:"2px"}} />
          <div style={{fontSize:"11px", color:"rgba(255,255,255,0.7)", letterSpacing:"3px", textTransform:"uppercase"}}>{CONFIG.namaSekolah}</div>
        </div>

        {/* ── CARDS SECTION ────────────────────────────────────────── */}
        <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"36px 20px", gap:"14px"}}>
          <p style={{fontSize:"12px", color:"#8899aa", letterSpacing:"1px", textTransform:"uppercase", fontWeight:600, margin:"0 0 6px"}}>Pilih Portal Login</p>
          <div style={{display:"flex", gap:"28px", flexWrap:"wrap", justifyContent:"center"}}>
            <_PortalCard role="siswa" onClick={() => { setModal("siswa"); setError(""); }} />
            <_PortalCard role="admin" onClick={() => { setModal("admin"); setError(""); }} />
          </div>
        </div>

        {/* ── FOOTER ───────────────────────────────────────────────── */}
        <footer style={{background:"#e4eaf4", borderTop:"1px solid #ccd5e6", padding:"10px 20px", textAlign:"center", fontSize:"11px", color:"#8899b0", lineHeight:1.8, flexShrink:0}}>
          Aplikasi Portal Ujian Digital v.2026 &nbsp;|&nbsp; Pengembang: <span style={{color:"#1a3a8f", fontWeight:700}}>Herman Saputra, S.Pd., Gr.</span>
        </footer>
      </div>

      {/* ── MODAL OVERLAY ────────────────────────────────────────────── */}
      {modal && (
        <div
          onClick={e => e.target === e.currentTarget && setModal(null)}
          style={{position:"fixed", inset:0, zIndex:9999, background:"rgba(10,20,60,0.62)", display:"flex", alignItems:"center", justifyContent:"center", padding:"16px", animation:"_fadeIn 0.18s ease"}}
        >
          <div style={{background:"#fff", borderRadius:"20px", width:"100%", maxWidth:"360px", boxShadow:"0 24px 64px rgba(0,0,0,0.3)", overflow:"hidden", animation:"_popUp 0.22s cubic-bezier(.34,1.56,.64,1)"}}>

            {/* Modal header */}
            <div style={{
              background: modal === "siswa" ? "linear-gradient(135deg,#1976d2,#0d47a1)" : "linear-gradient(135deg,#388e3c,#1b5e20)",
              padding:"22px 24px 18px", position:"relative", display:"flex", flexDirection:"column", alignItems:"center", gap:"10px",
            }}>
              <button
                onClick={() => setModal(null)}
                style={{position:"absolute", top:"12px", right:"12px", background:"rgba(255,255,255,0.2)", border:"none", borderRadius:"50%", width:"30px", height:"30px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}
              ><_IconClose /></button>
              <div style={{width:"58px", height:"58px", borderRadius:"50%", background:"rgba(255,255,255,0.2)", border:"2px solid rgba(255,255,255,0.4)", display:"flex", alignItems:"center", justifyContent:"center"}}>
                {modal === "siswa" ? <_IconPencil /> : <_IconShield />}
              </div>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:"9px", fontWeight:700, letterSpacing:"2.5px", color:"rgba(255,255,255,0.7)", textTransform:"uppercase", marginBottom:"3px"}}>
                  {modal === "siswa" ? "Portal Ujian" : "Bank Soal"}
                </div>
                <div style={{fontSize:"21px", fontWeight:800, color:"#fff", letterSpacing:"1px"}}>
                  Login {modal === "siswa" ? "Siswa" : "Admin"}
                </div>
              </div>
            </div>

            {/* Modal body */}
            <div style={{padding:"20px 24px 22px"}}>
              {error && (
                <div style={{background:"#fff3f3", border:"1px solid #ffcdd2", borderRadius:"8px", padding:"8px 12px", fontSize:"12px", color:"#c62828", marginBottom:"14px"}}>
                  ⚠️ {error}
                </div>
              )}

              {modal === "siswa" ? (
                <>
                  <div style={{marginBottom:"12px"}}>
                    <label style={fldLabel}>Nama Lengkap</label>
                    <input style={fldInput(false)} placeholder="Nama lengkap Anda" value={form.nama} onChange={e => setForm(p => ({...p, nama: e.target.value}))} />
                  </div>
                  <div style={{marginBottom:"12px"}}>
                    <label style={fldLabel}>Kelas</label>
                    <select style={fldInput(false)} value={form.kelas} onChange={e => setForm(p => ({...p, kelas: e.target.value}))}>
                      <option value="">— Pilih Kelas —</option>
                      {Object.entries(DAFTAR_KELAS).map(([grup, kelasList]) => (
                        <optgroup key={grup} label={grup}>
                          {kelasList.map(k => <option key={k} value={k}>{k}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div style={{marginBottom:"14px"}}>
                    <label style={fldLabel}>Kode Ujian</label>
                    <input style={{...fldInput(false), letterSpacing:"3px", fontWeight:700}} placeholder="Kode dari guru" value={form.examKey} onChange={e => setForm(p => ({...p, examKey: e.target.value.toUpperCase()}))} />
                  </div>
                  <button
                    onClick={handleSiswa} disabled={loading}
                    style={{width:"100%", padding:"12px", background:"linear-gradient(135deg,#1976d2,#1565c0)", border:"none", borderRadius:"9px", color:"#fff", fontSize:"15px", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", cursor:"pointer", boxShadow:"0 4px 16px rgba(25,118,210,0.4)"}}
                  >{loading ? "Memuat..." : "🚀 Mulai Ujian"}</button>
                  {useDemo && <p style={{color:"#999", fontSize:"11px", textAlign:"center", marginTop:"10px"}}>Demo: kode <strong style={{color:"#1976d2"}}>MTK001</strong> atau <strong style={{color:"#388e3c"}}>BIN001</strong></p>}
                </>
              ) : (
                <>
                  <div style={{marginBottom:"12px"}}>
                    <label style={fldLabel}>Username Admin</label>
                    <input style={fldInput(false)} placeholder="Masukkan username" value={form.username} onChange={e => setForm(p => ({...p, username: e.target.value}))} />
                  </div>
                  <div style={{marginBottom:"14px"}}>
                    <label style={fldLabel}>Kata Sandi</label>
                    <div style={{position:"relative"}}>
                      <input
                        type={showPass ? "text" : "password"}
                        style={{...fldInput(false), paddingRight:"42px"}}
                        placeholder="Masukkan kata sandi"
                        value={form.password}
                        onChange={e => setForm(p => ({...p, password: e.target.value}))}
                      />
                      <button onClick={() => setShowPass(v => !v)} style={{position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center"}}>
                        {showPass ? <_IconEyeOff /> : <_IconEye />}
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleGuru}
                    style={{width:"100%", padding:"12px", background:"linear-gradient(135deg,#388e3c,#1b5e20)", border:"none", borderRadius:"9px", color:"#fff", fontSize:"15px", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", cursor:"pointer", boxShadow:"0 4px 16px rgba(46,125,50,0.4)"}}
                  >🔐 Login Admin</button>
                  {useDemo && <p style={{color:"#999", fontSize:"11px", textAlign:"center", marginTop:"10px"}}>Demo: <strong style={{color:"#388e3c"}}>admin / admin123</strong></p>}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================
// GURU DASHBOARD
// ============================================================
function GuruDashboard({ guru, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [ujianList, setUjianList] = useState([]);
  const [hasilList, setHasilList] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (useDemo) {
        setUjianList([...DEMO_UJIAN]);
        setHasilList([...DEMO_HASIL]);
      } else {
        // Load ujian, soal, dan hasil sekaligus
        const [ujianRaw, soalRaw, hasilRaw] = await Promise.all([
          supabase("ujian?order=id.desc"),
          supabase("soal?order=ujian_id.asc,id.asc"),
          supabase("hasil?order=id.desc"),
        ]);
        // Gabungkan soal ke masing-masing ujian
        const ujianDenganSoal = ujianRaw.map(u => ({
          ...u,
          soal: soalRaw.filter(s => s.ujian_id === u.id).map(s => ({
            ...s,
            opsi: Array.isArray(s.opsi) ? s.opsi : (typeof s.opsi === 'string' ? JSON.parse(s.opsi) : []),
          }))
        }));
        setUjianList(ujianDenganSoal);
        setHasilList(hasilRaw);
      }
    } catch(e) {
      console.error("Gagal load data:", e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const menuItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "ujian", icon: "📋", label: "Kelola Ujian" },
    { id: "soal", icon: "✏️", label: "Buat Soal" },
    { id: "monitor", icon: "🖥️", label: "Monitor Ujian" },
    { id: "hasil", icon: "📈", label: "Hasil Ujian" },
  ];

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-logo">
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
            <img src={CONFIG.logoUrl} alt={"Logo " + CONFIG.namaSekolahSingkat} style={{width:"40px",height:"40px",borderRadius:"50%",objectFit:"cover"}} />
            <div>
              <h2 style={{fontSize:"13px",lineHeight:"1.2"}}>UAS <span style={{color:"var(--blue)"}}>{CONFIG.namaSekolahSingkat}</span></h2>
              <p style={{fontSize:"10px",marginTop:"2px"}}>{CONFIG.lokasiSekolah}</p>
            </div>
          </div>
          <p style={{fontSize:"12px",color:"var(--gray2)"}}>Halo, {guru.nama}</p>
        </div>
        <div className="sidebar-menu">
          {menuItems.map(m => (
            <button key={m.id} className={page === m.id ? "active" : ""} onClick={() => setPage(m.id)}>
              {m.icon} {m.label}
            </button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <button onClick={onLogout}>🚪 Keluar</button>
        </div>
      </div>
      <div className="main">
        {loading ? (
          <div className="loading">⏳ Memuat data...</div>
        ) : (
          <>
            {page === "dashboard" && <DashboardPage ujianList={ujianList} hasilList={hasilList} />}
            {page === "ujian" && <UjianPage ujianList={ujianList} onRefresh={loadData} />}
            {page === "soal" && <SoalPage ujianList={ujianList} onRefresh={loadData} />}
            {page === "monitor" && <MonitorPage ujianList={ujianList} />}
            {page === "hasil" && <HasilPage hasilList={hasilList} ujianList={ujianList} />}
          </>
        )}
      </div>
    </div>
  );
}

// ---- Dashboard Overview ----
function DashboardPage({ ujianList, hasilList }) {
  const rataRata = hasilList.length ? Math.round(hasilList.reduce((a,h) => a + (h.nilai||0), 0) / hasilList.length) : 0;
  return (
    <>
      <div className="page-header"><h1>Dashboard</h1><p>Ringkasan aktivitas ujian sekolah</p></div>
      <div className="stats-grid">
        {[
          { icon: "📋", label: "Total Ujian", val: ujianList.length, bg: "#dbeafe", color: "#2563eb" },
          { icon: "✅", label: "Ujian Aktif", val: ujianList.filter(u=>u.aktif).length, bg: "#dcfce7", color: "#16a34a" },
          { icon: "👥", label: "Peserta", val: hasilList.length, bg: "#fef3c7", color: "#92400e" },
          { icon: "⭐", label: "Rata-rata Nilai", val: rataRata, bg: "#f3e8ff", color: "#7c3aed" },
        ].map((s,i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{background:s.bg}}>{s.icon}</div>
            <div className="stat-val" style={{color:s.color}}>{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-header"><h2>📊 Hasil Terbaru</h2></div>
        {hasilList.length === 0 ? (
          <div className="empty-state"><div className="icon">📭</div><p>Belum ada hasil ujian</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Nama</th><th>Kelas</th><th>Mata Pelajaran</th><th>Nilai</th><th>Status</th></tr></thead>
              <tbody>
                {hasilList.slice(0,10).map((h,i) => (
                  <tr key={i}>
                    <td><strong>{h.nama_siswa}</strong></td>
                    <td>{h.kelas}</td>
                    <td>{h.mapel}</td>
                    <td><strong style={{fontFamily:"var(--mono)"}}>{h.nilai}</strong></td>
                    <td><span className={`badge ${h.nilai >= 75 ? "badge-green" : "badge-red"}`}>{h.nilai >= 75 ? "Lulus" : "Remedi"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// ---- Kelola Ujian ----
function UjianPage({ ujianList, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [showKey, setShowKey] = useState(null);
  const [editUjian, setEditUjian] = useState(null); // ujian yang sedang diedit
  const [form, setForm] = useState({ mapel: MAPEL[0], kelas: "", durasi: 60, jam_buka: "", jam_tutup: "" });
  const [saving, setSaving] = useState(false);
  const [confirmHapus, setConfirmHapus] = useState(null); // ujian yang akan dihapus

  const resetForm = () => {
    setForm({ mapel: MAPEL[0], kelas: "", durasi: 60, jam_buka: "", jam_tutup: "" });
    setEditUjian(null);
    setShowForm(false);
  };

  const handleCreate = async () => {
    if (!form.kelas.trim()) return alert("Kelas tidak boleh kosong.");
    setSaving(true);
    try {
      if (useDemo) {
        DEMO_UJIAN.push({ ...form, durasi: Number(form.durasi), key: genKey(), aktif: true, soal: [], id: Date.now() });
      } else {
        await supabase("ujian", { method: "POST", body: JSON.stringify({ mapel: form.mapel, kelas: form.kelas, durasi: Number(form.durasi), key: genKey(), aktif: true, jam_buka: form.jam_buka || null, jam_tutup: form.jam_tutup || null }) });
      }
      await onRefresh();
      resetForm();
    } catch(e) { alert("Gagal membuat ujian: " + e.message); }
    setSaving(false);
  };

  const handleEdit = async () => {
    if (!form.kelas.trim()) return alert("Kelas tidak boleh kosong.");
    setSaving(true);
    try {
      if (useDemo) {
        const idx = DEMO_UJIAN.findIndex(u => u.id === editUjian.id);
        if (idx > -1) DEMO_UJIAN[idx] = { ...DEMO_UJIAN[idx], mapel: form.mapel, kelas: form.kelas, durasi: Number(form.durasi), jam_buka: form.jam_buka || null, jam_tutup: form.jam_tutup || null };
      } else {
        await supabase(`ujian?id=eq.${editUjian.id}`, { method: "PATCH", body: JSON.stringify({ mapel: form.mapel, kelas: form.kelas, durasi: Number(form.durasi), jam_buka: form.jam_buka || null, jam_tutup: form.jam_tutup || null }) });
      }
      await onRefresh();
      resetForm();
    } catch(e) { alert("Gagal edit ujian: " + e.message); }
    setSaving(false);
  };

  const handleHapus = async (ujian) => {
    setSaving(true);
    try {
      // ── PENGAMAN 1: Cek apakah ada peserta yang sedang ujian ──
      if (!useDemo) {
        const pesertaAktif = await cekPesertaAktif(ujian.id);
        if (pesertaAktif.length > 0) {
          const daftar = pesertaAktif.map(p => `• ${p.nama_siswa} (${p.kelas})`).join("\n");
          alert(
            `❌ Tidak bisa menghapus ujian ini.\n\n` +
            `Ada ${pesertaAktif.length} peserta yang sedang mengerjakan ujian:\n${daftar}\n\n` +
            `Tunggu sampai semua peserta selesai, atau matikan saklar "Aktif" ujian terlebih dahulu.`
          );
          setSaving(false);
          setConfirmHapus(null);
          return;
        }

        // ── PENGAMAN 2: Cek apakah sudah ada hasil ujian tersimpan ──
        const hasil = await supabase(`hasil?ujian_id=eq.${ujian.id}&select=id`);
        if (hasil.length > 0) {
          const lanjut = window.confirm(
            `⚠️ Ujian ini sudah memiliki ${hasil.length} hasil siswa yang tersimpan.\n\n` +
            `Jika ujian dihapus, SEMUA hasil siswa untuk ujian ini akan ikut terhapus.\n\n` +
            `Yakin tetap mau menghapus?\n` +
            `(Klik OK untuk hapus semua, atau Cancel untuk batal)`
          );
          if (!lanjut) {
            setSaving(false);
            setConfirmHapus(null);
            return;
          }
        }
      }

      if (useDemo) {
        const idx = DEMO_UJIAN.findIndex(u => u.id === ujian.id);
        if (idx > -1) DEMO_UJIAN.splice(idx, 1);
      } else {
        // Hapus berurutan dengan error handling per-step
        try {
          await supabase(`soal?ujian_id=eq.${ujian.id}`, { method: "DELETE" });
        } catch (err) {
          throw new Error("Gagal hapus soal: " + err.message);
        }
        try {
          await supabase(`hasil?ujian_id=eq.${ujian.id}`, { method: "DELETE" });
        } catch (err) {
          throw new Error("Gagal hapus hasil: " + err.message);
        }
        try {
          await supabase(`peserta_aktif?ujian_id=eq.${ujian.id}`, { method: "DELETE" });
        } catch (err) {
          throw new Error("Gagal hapus peserta_aktif: " + err.message);
        }
        try {
          await supabase(`ujian?id=eq.${ujian.id}`, { method: "DELETE" });
        } catch (err) {
          throw new Error("Gagal hapus ujian: " + err.message);
        }

        // Verifikasi: pastikan ujian benar-benar terhapus
        const cek = await supabase(`ujian?id=eq.${ujian.id}&select=id`);
        if (cek.length > 0) {
          throw new Error(
            "Ujian masih ada di database setelah dihapus. " +
            "Kemungkinan ada constraint database yang mencegah penghapusan. " +
            "Coba refresh halaman dan ulangi."
          );
        }
      }
      await onRefresh();
      setConfirmHapus(null);
    } catch(e) {
      console.error("handleHapus error:", e);
      alert("Gagal hapus: " + e.message);
    }
    setSaving(false);
  };

  const toggleAktif = async (ujian) => {
    try {
      if (useDemo) {
        const idx = DEMO_UJIAN.findIndex(u => u.id === ujian.id);
        if (idx > -1) DEMO_UJIAN[idx].aktif = !DEMO_UJIAN[idx].aktif;
      } else {
        await supabase(`ujian?id=eq.${ujian.id}`, { method: "PATCH", body: JSON.stringify({ aktif: !ujian.aktif }) });
      }
      await onRefresh();
    } catch(e) { alert("Gagal update: " + e.message); }
  };

  const bukaFormEdit = (ujian) => {
    setEditUjian(ujian);
    setForm({ mapel: ujian.mapel, kelas: ujian.kelas, durasi: ujian.durasi, jam_buka: ujian.jam_buka || "", jam_tutup: ujian.jam_tutup || "" });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const getJadwalStatus = (u) => {
    if (!u.jam_buka && !u.jam_tutup) return null;
    const now = new Date();
    const pad = (t) => { const [h,m] = t.split(":"); const d = new Date(); d.setHours(h,m,0); return d; };
    if (u.jam_buka && now < pad(u.jam_buka)) return { label: `Buka ${u.jam_buka}`, color: "badge-yellow" };
    if (u.jam_tutup && now > pad(u.jam_tutup)) return { label: `Tutup ${u.jam_tutup}`, color: "badge-red" };
    return { label: `Buka s/d ${u.jam_tutup||"∞"}`, color: "badge-green" };
  };

  return (
    <>
      <div className="page-header"><h1>Kelola Ujian</h1><p>Buat, edit, dan atur sesi ujian</p></div>
      <div className="card">
        <div className="card-header">
          <h2>Daftar Ujian ({ujianList.length})</h2>
          <button className="btn btn-blue" onClick={() => { resetForm(); setShowForm(true); }}>+ Buat Ujian</button>
        </div>

        {/* Form Buat / Edit Ujian */}
        {showForm && (
          <div style={{background: editUjian ? "var(--yellow3)" : "var(--light)", borderRadius:"var(--radius)", padding:"20px", marginBottom:"20px", border: editUjian ? "1.5px solid var(--yellow)" : "none"}}>
            <h3 style={{marginBottom:"16px", fontSize:"15px", fontWeight:"700"}}>
              {editUjian ? `✏️ Edit Ujian: ${editUjian.mapel} — ${editUjian.kelas}` : "Ujian Baru"}
            </h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Mata Pelajaran</label>
                <select value={form.mapel} onChange={e => setForm(p=>({...p, mapel:e.target.value}))}>
                  {MAPEL.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div className="form-field">
                <label>Kelas</label>
                <select value={form.kelas} onChange={e => setForm(p=>({...p, kelas: e.target.value}))}>
                  <option value="">-- Pilih Kelas --</option>
                  <optgroup label="Kelas 7">
                    <option value="7">7</option>
                  </optgroup>
                  <optgroup label="Kelas 8">
                    <option value="8">8</option>
                  </optgroup>
                  <optgroup label="Kelas 9">
                    <option value="9">9</option>
                  </optgroup>
                </select>
              </div>
              <div className="form-field"><label>Durasi (menit)</label><input type="number" value={form.durasi} onChange={e => setForm(p=>({...p, durasi:e.target.value}))} /></div>
              <div className="form-field"><label>⏰ Jam Buka (opsional)</label><input type="time" value={form.jam_buka} onChange={e => setForm(p=>({...p, jam_buka:e.target.value}))} /></div>
              <div className="form-field"><label>⏰ Jam Tutup (opsional)</label><input type="time" value={form.jam_tutup} onChange={e => setForm(p=>({...p, jam_tutup:e.target.value}))} /></div>
            </div>
            <div style={{background:"rgba(255,255,255,0.7)", borderRadius:"8px", padding:"10px 14px", fontSize:"12px", marginBottom:"16px", color:"#92400e"}}>
              💡 Jam Buka/Tutup opsional. Kosongkan jika tidak perlu jadwal otomatis.
            </div>
            <div style={{display:"flex", gap:"8px"}}>
              <button className="btn btn-green" onClick={editUjian ? handleEdit : handleCreate} disabled={saving}>
                {saving ? "Menyimpan..." : editUjian ? "💾 Simpan Perubahan" : "✅ Buat Ujian"}
              </button>
              <button className="btn btn-ghost" onClick={resetForm}>Batal</button>
            </div>
          </div>
        )}

        <div className="ujian-grid">
          {ujianList.map(u => {
            const jadwal = getJadwalStatus(u);
            return (
              <div key={u.id} className="ujian-card">
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"6px"}}>
                  <h3 style={{margin:0}}>{u.mapel}</h3>
                  <span className={`badge ${u.aktif ? "badge-green" : "badge-red"}`}>{u.aktif ? "Aktif" : "Nonaktif"}</span>
                </div>
                <div className="meta">Kelas {u.kelas} • {u.durasi} menit • {(u.soal||[]).length} soal</div>
                {u.jam_buka && <div style={{fontSize:"12px", color:"var(--gray)", marginBottom:"4px"}}>⏰ {u.jam_buka} – {u.jam_tutup||"∞"}</div>}
                {jadwal && <span className={`badge ${jadwal.color}`} style={{marginBottom:"8px", display:"inline-block"}}>{jadwal.label}</span>}
                <div className="key-badge">{u.key}</div>
                <div className="actions" style={{marginTop:"12px"}}>
                  <button className="btn btn-blue" onClick={() => setShowKey(u)}>🔑 Kode</button>
                  <button className="btn btn-ghost" onClick={() => bukaFormEdit(u)}>✏️ Edit</button>
                  <button className={`btn ${u.aktif ? "btn-red" : "btn-green"}`} onClick={() => toggleAktif(u)}>
                    {u.aktif ? "⏸ Nonaktif" : "▶ Aktif"}
                  </button>
                  <button className="btn btn-red" onClick={() => setConfirmHapus(u)}>🗑️ Hapus</button>
                </div>
              </div>
            );
          })}
          {ujianList.length === 0 && <div className="empty-state"><div className="icon">📋</div><p>Belum ada ujian.</p></div>}
        </div>
      </div>

      {/* Modal Kode Ujian */}
      {showKey && (
        <div className="modal-overlay" onClick={() => setShowKey(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>🔑 Kode Ujian</h2>
            <p>Bagikan kode ini kepada siswa untuk ujian {showKey.mapel}</p>
            <div className="exam-key-display">
              <div className="key">{showKey.key}</div>
              <p>Kelas {showKey.kelas} • {showKey.durasi} menit</p>
            </div>
            <button className="btn btn-blue" style={{width:"100%"}} onClick={() => { navigator.clipboard?.writeText(showKey.key); alert("Kode disalin!"); }}>📋 Salin Kode</button>
            <div style={{height:"8px"}}/>
            <button className="btn btn-ghost" style={{width:"100%"}} onClick={() => setShowKey(null)}>Tutup</button>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {confirmHapus && (
        <div className="modal-overlay" onClick={() => setConfirmHapus(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{fontSize:"48px", textAlign:"center", marginBottom:"12px"}}>⚠️</div>
            <h2 style={{textAlign:"center"}}>Hapus Ujian?</h2>
            <p style={{textAlign:"center", color:"var(--gray)"}}>
              Anda akan menghapus ujian <strong>{confirmHapus.mapel} — Kelas {confirmHapus.kelas}</strong> beserta seluruh soal dan hasil nilainya.
            </p>
            <div style={{background:"var(--red3)", borderRadius:"var(--radius2)", padding:"12px", margin:"16px 0", fontSize:"13px", color:"var(--red2)", fontWeight:"600", textAlign:"center"}}>
              ❌ Tindakan ini tidak bisa dibatalkan!
            </div>
            <div style={{display:"flex", gap:"8px"}}>
              <button className="btn btn-red" style={{flex:1, padding:"12px"}} onClick={() => handleHapus(confirmHapus)} disabled={saving}>
                {saving ? "Menghapus..." : "🗑️ Ya, Hapus"}
              </button>
              <button className="btn btn-ghost" style={{flex:1, padding:"12px"}} onClick={() => setConfirmHapus(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---- Buat Soal ----
function SoalPage({ ujianList, onRefresh }) {
  const [selectedUjian, setSelectedUjian] = useState("");
  const [soalList, setSoalList] = useState([]);
  const [form, setForm] = useState({ pertanyaan: "", gambar: "", opsi: ["","","",""], jawaban: 0 });
  const [editSoal, setEditSoal] = useState(null); // soal yang sedang diedit
  const [saving, setSaving] = useState(false);
  const [uploadMode, setUploadMode] = useState("manual");
  const [uploadStatus, setUploadStatus] = useState("");
  const [googleFormUrl, setGoogleFormUrl] = useState("");
  const [googleFormSaved, setGoogleFormSaved] = useState(false);
  const [previewSoal, setPreviewSoal] = useState([]);
  const [importing, setImporting] = useState(false);
  const [hapusSemua, setHapusSemua] = useState(false);
  const [uploadingGambar, setUploadingGambar] = useState(false);
  const [progressGambar, setProgressGambar] = useState(0);
  const [errorGambar, setErrorGambar] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedUjian) {
      const u = ujianList.find(u => String(u.id) === selectedUjian);
      setSoalList(u?.soal || []);
      // Sync Google Form URL dari ujian yang dipilih
      setGoogleFormUrl(u?.google_form_url || "");
      setGoogleFormSaved(!!(u?.google_form_url));
    }
  }, [selectedUjian, ujianList]);

  const resetForm = () => {
    setForm({ pertanyaan: "", gambar: "", opsi: ["","","",""], jawaban: 0 });
    setEditSoal(null);
    setErrorGambar("");
    setProgressGambar(0);
  };

  // Handler saat guru pilih file gambar
  const handlePilihGambar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorGambar("");
    setUploadingGambar(true);
    setProgressGambar(0);
    try {
      const url = await uploadGambar(file, (p) => setProgressGambar(p));
      setForm(p => ({ ...p, gambar: url }));
    } catch (err) {
      setErrorGambar(err.message);
    }
    setUploadingGambar(false);
    // Reset input supaya bisa pilih file yang sama lagi
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── EXPORT SOAL: helper buat HTML dokumen soal ──
  // withKunci = true → sertakan kunci jawaban (untuk arsip pengawas)
  const buatHtmlSoal = (withKunci) => {
    const u = ujianList.find(uj => String(uj.id) === selectedUjian);
    const namaMapel = u ? u.mapel : "-";
    const namaKelas = u ? u.kelas : "-";
    const durasi = u ? u.durasi : "-";
    const HRF = ["A", "B", "C", "D"];

    // Escape HTML supaya aman
    const esc = (t) => String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const soalHtml = soalList.map((s, idx) => {
      const opsiHtml = s.opsi.map((o, i) => {
        const benar = withKunci && i === s.jawaban;
        return `<div class="opsi${benar ? " benar" : ""}">${HRF[i]}. ${esc(o)}${benar ? " &nbsp;<b>(Kunci Jawaban)</b>" : ""}</div>`;
      }).join("");
      const gambarHtml = s.gambar
        ? `<div class="gambar"><img src="${esc(s.gambar)}" alt="Gambar soal" /></div>`
        : "";
      return `
        <div class="soal">
          <div class="pertanyaan"><b>${idx + 1}.</b> ${esc(s.pertanyaan)}</div>
          ${gambarHtml}
          <div class="opsi-list">${opsiHtml}</div>
        </div>`;
    }).join("");

    const kunciRingkas = withKunci
      ? `<div class="kunci-box">
           <h3>Kunci Jawaban</h3>
           <div class="kunci-grid">
             ${soalList.map((s, idx) => `<span>${idx + 1}. <b>${HRF[s.jawaban]}</b></span>`).join("")}
           </div>
         </div>`
      : "";

    return `<!DOCTYPE html>
<html lang="id"><head><meta charset="UTF-8">
<title>Soal ${esc(namaMapel)} - Kelas ${esc(namaKelas)}</title>
<style>
  body { font-family: 'Times New Roman', serif; font-size: 12pt; color: #000; margin: 0; padding: 30px; }
  .kop { text-align: center; border-bottom: 3px double #000; padding-bottom: 10px; margin-bottom: 20px; }
  .kop h1 { font-size: 14pt; margin: 0 0 4px; }
  .kop h2 { font-size: 13pt; margin: 0; }
  .info { margin-bottom: 16px; font-size: 11pt; }
  .info table { width: 100%; }
  .info td { padding: 2px 0; }
  .soal { margin-bottom: 16px; page-break-inside: avoid; }
  .pertanyaan { margin-bottom: 6px; }
  .opsi-list { padding-left: 24px; }
  .opsi { margin-bottom: 3px; }
  .opsi.benar { background: #fff3cd; font-weight: bold; }
  .gambar { margin: 8px 0 8px 24px; }
  .gambar img { max-width: 380px; max-height: 260px; }
  .kunci-box { margin-top: 30px; border: 2px solid #000; padding: 12px 16px; page-break-inside: avoid; }
  .kunci-box h3 { margin: 0 0 8px; font-size: 12pt; }
  .kunci-grid { display: flex; flex-wrap: wrap; gap: 6px 18px; }
  .ttd { margin-top: 40px; width: 100%; }
  .ttd td { width: 50%; text-align: center; vertical-align: top; font-size: 11pt; }
  .ttd .nama { margin-top: 60px; font-weight: bold; text-decoration: underline; }
</style></head><body>
  <div class="kop">
    <h1>SOAL UJIAN ${esc(namaMapel).toUpperCase()}</h1>
    <h2>Kelas ${esc(namaKelas)}</h2>
  </div>
  <div class="info">
    <table>
      <tr><td>Mata Pelajaran</td><td>: ${esc(namaMapel)}</td>
          <td>Jumlah Soal</td><td>: ${soalList.length} butir</td></tr>
      <tr><td>Kelas</td><td>: ${esc(namaKelas)}</td>
          <td>Alokasi Waktu</td><td>: ${esc(durasi)} menit</td></tr>
      <tr><td>Nama</td><td>: ...........................</td>
          <td>Nilai</td><td>: ...........................</td></tr>
    </table>
  </div>
  <hr/>
  <p><b>Petunjuk:</b> Pilihlah jawaban yang paling tepat dengan memberi tanda silang (X) pada huruf A, B, C, atau D.</p>
  ${soalHtml}
  ${kunciRingkas}
  ${withKunci ? `
  <table class="ttd">
    <tr><td>Mengetahui,<br/>Kepala Sekolah<div class="nama">..........................</div></td>
        <td>Guru Mata Pelajaran<div class="nama">..........................</div></td></tr>
  </table>` : ""}
</body></html>`;
  };

  // Cetak / Simpan sebagai PDF (pakai dialog print browser)
  const handleCetakPDF = (withKunci) => {
    if (soalList.length === 0) return alert("Belum ada soal untuk dicetak.");
    const win = window.open("", "_blank");
    if (!win) return alert("Popup diblokir. Izinkan popup untuk situs ini, lalu coba lagi.");
    win.document.write(buatHtmlSoal(withKunci));
    win.document.close();
    // Beri jeda agar gambar sempat dimuat sebelum dialog print
    win.onload = () => setTimeout(() => win.print(), 600);
  };

  // Download sebagai file Word (.doc)
  const handleDownloadWord = (withKunci) => {
    if (soalList.length === 0) return alert("Belum ada soal untuk diunduh.");
    const u = ujianList.find(uj => String(uj.id) === selectedUjian);
    const html = buatHtmlSoal(withKunci);
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Soal_${u ? u.mapel : "Ujian"}_Kelas_${u ? u.kelas : ""}${withKunci ? "_dengan_Kunci" : ""}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = async () => {
    if (!selectedUjian) return alert("Pilih ujian terlebih dahulu.");
    if (!form.pertanyaan.trim()) return alert("Pertanyaan tidak boleh kosong.");
    if (form.opsi.some(o => !o.trim())) return alert("Semua opsi harus diisi.");
    setSaving(true);
    try {
      if (editSoal) {
        // MODE EDIT
        if (useDemo) {
          const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
          if (idx > -1) {
            const si = DEMO_UJIAN[idx].soal.findIndex(s => s.id === editSoal.id);
            if (si > -1) DEMO_UJIAN[idx].soal[si] = { ...editSoal, ...form, opsi: [...form.opsi] };
          }
        } else {
          await supabase(`soal?id=eq.${editSoal.id}`, { method: "PATCH", body: JSON.stringify({ pertanyaan: form.pertanyaan, gambar: form.gambar || null, opsi: form.opsi, jawaban: form.jawaban }) });
        }
        await onRefresh();
        setSoalList(prev => prev.map(s => s.id === editSoal.id ? { ...s, ...form, opsi: [...form.opsi] } : s));
        resetForm();
      } else {
        // MODE TAMBAH BARU
        const soalBaru = { ...form, opsi: [...form.opsi], id: Date.now() };
        if (useDemo) {
          const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
          if (idx > -1) { DEMO_UJIAN[idx].soal = [...(DEMO_UJIAN[idx].soal||[]), soalBaru]; }
        } else {
          await supabase("soal", { method: "POST", body: JSON.stringify({ ujian_id: Number(selectedUjian), pertanyaan: form.pertanyaan, gambar: form.gambar || null, opsi: form.opsi, jawaban: form.jawaban }) });
        }
        await onRefresh();
        setSoalList(prev => [...prev, soalBaru]);
        resetForm();
      }
    } catch(e) { alert("Gagal menyimpan: " + e.message); }
    setSaving(false);
  };

  const handleEdit = (s) => {
    setEditSoal(s);
    setForm({ pertanyaan: s.pertanyaan, gambar: s.gambar || "", opsi: [...s.opsi], jawaban: s.jawaban });
    setUploadMode("manual");
    window.scrollTo(0, 400);
  };

  const handleDelete = async (soalId) => {
    if (!confirm("Hapus soal ini?")) return;
    try {
      // ── PENGAMAN: Cek peserta aktif untuk ujian ini ──
      if (!useDemo && selectedUjian) {
        const pesertaAktif = await cekPesertaAktif(Number(selectedUjian));
        if (pesertaAktif.length > 0) {
          alert(
            `❌ Tidak bisa menghapus soal.\n\n` +
            `Ada ${pesertaAktif.length} peserta yang sedang mengerjakan ujian ini. ` +
            `Soal yang sudah ter-load di browser mereka akan kacau jika dihapus sekarang.\n\n` +
            `Tunggu sampai semua peserta selesai.`
          );
          return;
        }
      }

      if (useDemo) {
        const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
        if (idx > -1) DEMO_UJIAN[idx].soal = DEMO_UJIAN[idx].soal.filter(s => s.id !== soalId);
      } else {
        await supabase(`soal?id=eq.${soalId}`, { method: "DELETE" });
      }
      await onRefresh();
      setSoalList(prev => prev.filter(s => s.id !== soalId));
      if (editSoal?.id === soalId) resetForm();
    } catch(e) { alert("Gagal hapus: " + e.message); }
  };

  const handleHapusSemua = async () => {
    setSaving(true);
    try {
      // ── PENGAMAN: Cek peserta aktif untuk ujian ini ──
      if (!useDemo && selectedUjian) {
        const pesertaAktif = await cekPesertaAktif(Number(selectedUjian));
        if (pesertaAktif.length > 0) {
          const daftar = pesertaAktif.map(p => `• ${p.nama_siswa} (${p.kelas})`).join("\n");
          alert(
            `❌ Tidak bisa menghapus semua soal.\n\n` +
            `Ada ${pesertaAktif.length} peserta yang sedang mengerjakan:\n${daftar}\n\n` +
            `Tunggu sampai mereka selesai dulu.`
          );
          setSaving(false);
          setHapusSemua(false);
          return;
        }
      }

      if (useDemo) {
        const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
        if (idx > -1) DEMO_UJIAN[idx].soal = [];
      } else {
        await supabase(`soal?ujian_id=eq.${selectedUjian}`, { method: "DELETE" });
      }
      await onRefresh();
      setSoalList([]);
      setHapusSemua(false);
      resetForm();
    } catch(e) { alert("Gagal hapus: " + e.message); }
    setSaving(false);
  };

  // ── EXCEL PARSER ──────────────────────────────────────────
  const parseExcel = (file) => {
    setUploadStatus("⏳ Membaca file Excel...");
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        // Manual CSV-like parsing for simple xlsx (read as binary)
        // We use SheetJS via CDN loaded dynamically
        if (window.XLSX) {
          const wb = window.XLSX.read(data, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: "" });
          const parsed = parseRowsToSoal(rows);
          if (parsed.length === 0) {
            setUploadStatus("❌ Tidak ada soal yang terbaca. Pastikan format sesuai template.");
          } else {
            setPreviewSoal(parsed);
            setUploadStatus(`✅ Berhasil membaca ${parsed.length} soal. Cek preview lalu klik Import.`);
          }
        } else {
          setUploadStatus("❌ Library Excel belum siap. Refresh halaman dan coba lagi.");
        }
      } catch(err) {
        setUploadStatus("❌ Gagal membaca file: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // ── WORD PARSER ───────────────────────────────────────────
  const parseWord = (file) => {
    setUploadStatus("⏳ Membaca file Word...");
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (window.mammoth) {
          window.mammoth.extractRawText({ arrayBuffer: e.target.result })
            .then(result => {
              const text = result.value;
              const parsed = parseTextToSoal(text);
              if (parsed.length === 0) {
                setUploadStatus("❌ Tidak ada soal yang terbaca. Pastikan format sesuai template.");
              } else {
                setPreviewSoal(parsed);
                setUploadStatus(`✅ Berhasil membaca ${parsed.length} soal. Cek preview lalu klik Import.`);
              }
            });
        } else {
          setUploadStatus("❌ Library Word belum siap. Refresh halaman dan coba lagi.");
        }
      } catch(err) {
        setUploadStatus("❌ Gagal membaca file: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Parse baris Excel → array soal
  // Format: Kolom A=Pertanyaan, B=Opsi A, C=Opsi B, D=Opsi C, E=Opsi D, F=Jawaban Benar (A/B/C/D)
  const parseRowsToSoal = (rows) => {
    const hasil = [];
    for (let i = 1; i < rows.length; i++) { // skip header baris 0
      const row = rows[i];
      const pertanyaan = String(row[0] || "").trim();
      const opsiA = String(row[1] || "").trim();
      const opsiB = String(row[2] || "").trim();
      const opsiC = String(row[3] || "").trim();
      const opsiD = String(row[4] || "").trim();
      const jwbRaw = String(row[5] || "").trim().toUpperCase();
      if (!pertanyaan || !opsiA) continue;
      const jwbMap = { "A":0, "B":1, "C":2, "D":3 };
      const jawaban = jwbMap[jwbRaw] ?? 0;
      hasil.push({ id: Date.now() + i, pertanyaan, opsi: [opsiA, opsiB, opsiC, opsiD], jawaban });
    }
    return hasil;
  };

  // Parse teks Word → array soal
  // Format: 1. Pertanyaan\nA. Opsi A\nB. Opsi B\nC. Opsi C\nD. Opsi D\nJawaban: A
  const parseTextToSoal = (text) => {
    const hasil = [];
    const blocks = text.split(/\n(?=\d+[\.\)])/);
    for (const block of blocks) {
      const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
      if (lines.length < 5) continue;
      const pertanyaan = lines[0].replace(/^\d+[\.\)]\s*/, "").trim();
      const opsi = [];
      let jawaban = 0;
      for (let i = 1; i < lines.length; i++) {
        const match = lines[i].match(/^([A-D])[\.\)]\s*(.+)/i);
        if (match) opsi.push(match[2].trim());
        const jwbMatch = lines[i].match(/^[Jj]awaban\s*:\s*([A-D])/i);
        if (jwbMatch) jawaban = ["A","B","C","D"].indexOf(jwbMatch[1].toUpperCase());
      }
      if (pertanyaan && opsi.length >= 2) {
        while (opsi.length < 4) opsi.push("-");
        hasil.push({ id: Date.now() + hasil.length, pertanyaan, opsi: opsi.slice(0,4), jawaban });
      }
    }
    return hasil;
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewSoal([]);
    setUploadStatus("");
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "xlsx" || ext === "xls") parseExcel(file);
    else if (ext === "docx") parseWord(file);
    else setUploadStatus("❌ Format tidak didukung. Gunakan .xlsx atau .docx");
    e.target.value = "";
  };

  const handleImport = async () => {
    if (!selectedUjian) return alert("Pilih ujian terlebih dahulu.");
    if (previewSoal.length === 0) return;
    setImporting(true);
    let berhasil = 0;
    try {
      for (const s of previewSoal) {
        if (useDemo) {
          const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
          if (idx > -1) DEMO_UJIAN[idx].soal = [...(DEMO_UJIAN[idx].soal||[]), s];
        } else {
          await supabase("soal", { method: "POST", body: JSON.stringify({ ujian_id: Number(selectedUjian), pertanyaan: s.pertanyaan, opsi: s.opsi, jawaban: s.jawaban }) });
        }
        berhasil++;
      }
      await onRefresh();
      setPreviewSoal([]);
      setUploadStatus(`🎉 ${berhasil} soal berhasil diimport!`);
    } catch(e) {
      setUploadStatus(`❌ Gagal import soal ke-${berhasil+1}: ${e.message}`);
    }
    setImporting(false);
  };

  // Load libraries dynamically
  useEffect(() => {
    if (!window.XLSX) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      document.head.appendChild(s);
    }
    if (!window.mammoth) {
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
      document.head.appendChild(s);
    }
  }, []);

  const HURUF = ["A","B","C","D"];

  return (
    <>
      <div className="page-header"><h1>Buat Soal</h1><p>Tambahkan soal ke ujian yang sudah dibuat</p></div>
      <div className="card">
        <div className="card-header"><h2>Pilih Ujian</h2></div>
        <div className="form-field" style={{maxWidth:"360px"}}>
          <select value={selectedUjian} onChange={e => setSelectedUjian(e.target.value)}>
            <option value="">-- Pilih Ujian --</option>
            {ujianList.map(u => <option key={u.id} value={u.id}>{u.mapel} - Kelas {u.kelas}</option>)}
          </select>
        </div>
      </div>

      {selectedUjian && (
        <>
          {/* Tab pilih mode input */}
          <div className="card" style={{padding:"16px"}}>
            <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
              {[["manual","✏️ Input Manual"],["excel","📊 Upload Excel"],["word","📄 Upload Word"],["googleform","🔗 Upload Link Google Form"]].map(([m,l]) => (
                <button key={m} className={`btn ${uploadMode===m?"btn-blue":"btn-ghost"}`} onClick={() => { setUploadMode(m); setPreviewSoal([]); setUploadStatus(""); }}>{l}</button>
              ))}
            </div>
          </div>

          {/* MODE: MANUAL */}
          {uploadMode === "manual" && (
            <div className="card" style={{border: editSoal ? "2px solid var(--yellow)" : "1px solid var(--border)"}}>
              <div className="card-header">
                <h2>{editSoal ? "✏️ Edit Soal" : "✏️ Tambah Soal Manual"}</h2>
                <div style={{display:"flex", gap:"8px", alignItems:"center"}}>
                  <span className="badge badge-blue">{soalList.length} soal</span>
                  {editSoal && <button className="btn btn-ghost" style={{fontSize:"12px"}} onClick={resetForm}>✕ Batal Edit</button>}
                </div>
              </div>
              {editSoal && (
                <div style={{background:"var(--yellow3)", borderRadius:"var(--radius2)", padding:"10px 14px", marginBottom:"16px", fontSize:"13px", color:"#92400e", fontWeight:"600"}}>
                  ✏️ Mode Edit — Anda sedang mengedit Soal {soalList.findIndex(s => s.id === editSoal.id) + 1}
                </div>
              )}
              <div className="form-field">
                <label>Pertanyaan</label>
                <textarea value={form.pertanyaan} onChange={e => setForm(p=>({...p, pertanyaan:e.target.value}))} placeholder="Tulis pertanyaan. Bisa pakai shortcut: sqrt(25), 1/2, x^2, pi, lalu klik tombol Convert" rows={3} />
                {/* Tombol convert shortcut */}
                <div style={{display:"flex", gap:"8px", marginTop:"6px", alignItems:"center", flexWrap:"wrap"}}>
                  <button
                    type="button"
                    onClick={() => setForm(p => ({...p, pertanyaan: convertToLatex(p.pertanyaan)}))}
                    style={{background:"#dbeafe", border:"1px solid #93c5fd", borderRadius:"var(--radius2)", padding:"6px 12px", fontSize:"12px", color:"#1e40af", cursor:"pointer", fontWeight:"600"}}
                    title="Convert shortcut (sqrt, 1/2, x^2, dll) ke rumus LaTeX"
                  >🔄 Convert ke Rumus</button>
                  <span style={{fontSize:"11px", color:"var(--gray)"}}>Ketik dengan shortcut, lalu klik convert</span>
                </div>
                {/* Live preview rumus */}
                {form.pertanyaan && form.pertanyaan.includes("$") && (
                  <div style={{marginTop:"8px", padding:"10px 12px", background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:"var(--radius2)", fontSize:"13px"}}>
                    <div style={{fontSize:"11px", color:"#0369a1", fontWeight:"700", marginBottom:"4px"}}>👁️ PREVIEW</div>
                    <div><MathText text={form.pertanyaan} /></div>
                  </div>
                )}
                <LatexHelp />
              </div>
              <div className="form-field">
                <label>🖼️ Gambar Soal (opsional)</label>

                {/* Input file tersembunyi */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handlePilihGambar}
                  style={{display:"none"}}
                />

                {/* Tombol pilih gambar */}
                {!form.gambar && !uploadingGambar && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      width:"100%", padding:"16px", border:"2px dashed var(--border)",
                      borderRadius:"var(--radius2)", background:"var(--light)",
                      cursor:"pointer", fontSize:"14px", color:"var(--blue)", fontWeight:"600",
                      display:"flex", alignItems:"center", justifyContent:"center", gap:"8px"
                    }}
                  >
                    📁 Pilih Gambar dari Komputer / HP
                  </button>
                )}

                {/* Progress upload */}
                {uploadingGambar && (
                  <div style={{padding:"16px", border:"1px solid var(--border)", borderRadius:"var(--radius2)", background:"var(--light)"}}>
                    <div style={{fontSize:"13px", color:"var(--navy3)", fontWeight:"600", marginBottom:"8px"}}>
                      ⏳ Mengupload gambar... {progressGambar}%
                    </div>
                    <div style={{height:"8px", background:"var(--border)", borderRadius:"99px", overflow:"hidden"}}>
                      <div style={{height:"100%", width:`${progressGambar}%`, background:"var(--blue)", transition:"width 0.2s"}} />
                    </div>
                  </div>
                )}

                {/* Pesan error */}
                {errorGambar && (
                  <div style={{marginTop:"8px", padding:"10px 12px", background:"var(--red3)", border:"1px solid var(--red)", borderRadius:"var(--radius2)", fontSize:"12px", color:"var(--red2)"}}>
                    ⚠️ {errorGambar}
                  </div>
                )}

                {/* Preview gambar yang sudah ke-upload */}
                {form.gambar && !uploadingGambar && (
                  <div>
                    <div style={{marginTop:"8px", borderRadius:"var(--radius2)", overflow:"hidden", border:"1px solid var(--border)", maxHeight:"220px", textAlign:"center", background:"var(--light)"}}>
                      <img src={form.gambar} alt="Preview" style={{maxWidth:"100%", objectFit:"contain", maxHeight:"220px"}}
                        onError={e => { e.target.style.display="none"; }}
                      />
                    </div>
                    <div style={{display:"flex", gap:"8px", marginTop:"8px"}}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{flex:1, padding:"8px", border:"1px solid var(--border)", borderRadius:"var(--radius2)", background:"white", cursor:"pointer", fontSize:"12px", color:"var(--blue)", fontWeight:"600"}}
                      >
                        🔄 Ganti Gambar
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm(p => ({...p, gambar:""}))}
                        style={{flex:1, padding:"8px", border:"1px solid var(--red)", borderRadius:"var(--radius2)", background:"white", cursor:"pointer", fontSize:"12px", color:"var(--red2)", fontWeight:"600"}}
                      >
                        🗑️ Hapus Gambar
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <label style={{fontSize:"13px", fontWeight:"700", color:"var(--navy3)", display:"block", marginBottom:"10px"}}>Pilihan Jawaban <span style={{color:"var(--green)", fontWeight:"600"}}>(✓ = Jawaban Benar)</span></label>
              {HURUF.map((h,i) => (
                <div key={i} className={`option-row ${form.jawaban === i ? "correct" : ""}`}>
                  <div className="option-label">{h}</div>
                  <input value={form.opsi[i]} onChange={e => { const o = [...form.opsi]; o[i] = e.target.value; setForm(p=>({...p, opsi:o})); }} placeholder={`Opsi ${h} (boleh pakai shortcut sqrt, 1/2, x^2)`} />
                  <button className={`btn ${form.jawaban === i ? "btn-green" : "btn-ghost"}`} onClick={() => setForm(p=>({...p, jawaban:i}))}>✓</button>
                </div>
              ))}
              {/* Tombol convert untuk semua opsi sekaligus */}
              <div style={{marginTop:"6px", marginBottom:"6px"}}>
                <button
                  type="button"
                  onClick={() => setForm(p => ({...p, opsi: p.opsi.map(o => convertToLatex(o))}))}
                  style={{background:"#dbeafe", border:"1px solid #93c5fd", borderRadius:"var(--radius2)", padding:"6px 12px", fontSize:"12px", color:"#1e40af", cursor:"pointer", fontWeight:"600"}}
                  title="Convert shortcut di semua opsi A, B, C, D"
                >🔄 Convert Semua Opsi ke Rumus</button>
                <span style={{fontSize:"11px", color:"var(--gray)", marginLeft:"8px"}}>Convert semua 4 opsi sekaligus</span>
              </div>
              {/* Preview opsi yang ada rumusnya */}
              {form.opsi.some(o => o && o.includes("$")) && (
                <div style={{marginTop:"8px", padding:"10px 12px", background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:"var(--radius2)", fontSize:"13px"}}>
                  <div style={{fontSize:"11px", color:"#0369a1", fontWeight:"700", marginBottom:"6px"}}>👁️ PREVIEW OPSI</div>
                  {form.opsi.map((o, i) => o && (
                    <div key={i} style={{marginBottom:"4px"}}>
                      <strong>{HURUF[i]}.</strong> <MathText text={o} />
                    </div>
                  ))}
                </div>
              )}
              <div style={{marginTop:"16px", display:"flex", gap:"8px"}}>
                <button className="btn btn-blue" onClick={handleSave} disabled={saving}>
                  {saving ? "Menyimpan..." : editSoal ? "💾 Simpan Perubahan" : "💾 Simpan Soal"}
                </button>
                {editSoal && <button className="btn btn-ghost" onClick={resetForm}>✕ Batal</button>}
              </div>
            </div>
          )}

          {/* MODE: EXCEL */}
          {uploadMode === "excel" && (
            <div className="card">
              <div className="card-header"><h2>📊 Upload Soal dari Excel</h2></div>
              {/* Panduan format */}
              <div style={{background:"var(--blue3)", borderRadius:"var(--radius2)", padding:"16px", marginBottom:"20px"}}>
                <div style={{fontSize:"13px", fontWeight:"700", color:"var(--blue2)", marginBottom:"8px"}}>📋 Format Excel yang Harus Digunakan:</div>
                <div style={{fontSize:"12px", color:"var(--navy3)", lineHeight:"1.8"}}>
                  <strong>Baris 1 (Header):</strong> Pertanyaan | Opsi A | Opsi B | Opsi C | Opsi D | Jawaban<br/>
                  <strong>Baris 2 dst (Soal):</strong> Isi pertanyaan | Opsi A | Opsi B | Opsi C | Opsi D | A/B/C/D<br/>
                  <strong>Kolom Jawaban:</strong> isi huruf A, B, C, atau D (huruf kapital)
                </div>
                <div style={{marginTop:"10px", fontSize:"12px", background:"white", borderRadius:"6px", padding:"10px", fontFamily:"var(--mono)"}}>
                  <div style={{color:"var(--gray)", borderBottom:"1px solid var(--border)", paddingBottom:"4px", marginBottom:"4px"}}>Pertanyaan | Opsi A | Opsi B | Opsi C | Opsi D | Jawaban</div>
                  <div>Ibu kota Indonesia? | Jakarta | Bandung | Surabaya | Medan | A</div>
                  <div>2 + 2 = ? | 3 | 4 | 5 | 6 | B</div>
                </div>
              </div>
              <div style={{border:"2px dashed var(--blue)", borderRadius:"var(--radius)", padding:"32px", textAlign:"center"}}>
                <div style={{fontSize:"36px", marginBottom:"8px"}}>📊</div>
                <div style={{fontSize:"14px", fontWeight:"600", marginBottom:"4px"}}>Pilih file Excel (.xlsx)</div>
                <div style={{fontSize:"12px", color:"var(--gray)", marginBottom:"16px"}}>Format .xlsx atau .xls</div>
                <label className="btn btn-blue" style={{cursor:"pointer"}}>
                  📂 Pilih File Excel
                  <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} style={{display:"none"}} />
                </label>
              </div>
              {uploadStatus && (
                <div style={{marginTop:"12px", padding:"12px 16px", borderRadius:"var(--radius2)", background: uploadStatus.startsWith("✅")||uploadStatus.startsWith("🎉") ? "var(--green3)" : uploadStatus.startsWith("⏳") ? "var(--yellow3)" : "var(--red3)", fontSize:"14px", fontWeight:"500"}}>
                  {uploadStatus}
                </div>
              )}
              {previewSoal.length > 0 && (
                <div style={{marginTop:"16px"}}>
                  <div style={{fontSize:"14px", fontWeight:"700", marginBottom:"12px"}}>Preview {previewSoal.length} soal:</div>
                  {previewSoal.slice(0,3).map((s,i) => (
                    <div key={i} style={{border:"1px solid var(--border)", borderRadius:"var(--radius2)", padding:"12px", marginBottom:"8px", fontSize:"13px"}}>
                      <div style={{fontWeight:"600", marginBottom:"6px"}}>Soal {i+1}: {s.pertanyaan}</div>
                      <div style={{display:"flex", gap:"6px", flexWrap:"wrap"}}>
                        {s.opsi.map((o,j) => <span key={j} style={{padding:"2px 8px", borderRadius:"99px", background: j===s.jawaban?"var(--green3)":"var(--light)", color: j===s.jawaban?"var(--green2)":"var(--gray)", fontSize:"12px"}}>{HURUF[j]}. {o}</span>)}
                      </div>
                    </div>
                  ))}
                  {previewSoal.length > 3 && <div style={{fontSize:"12px", color:"var(--gray)", textAlign:"center", marginBottom:"12px"}}>...dan {previewSoal.length-3} soal lainnya</div>}
                  <button className="btn btn-green" style={{width:"100%", padding:"12px"}} onClick={handleImport} disabled={importing}>
                    {importing ? "⏳ Mengimport..." : `🚀 Import ${previewSoal.length} Soal ke Ujian`}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE: WORD */}
          {uploadMode === "word" && (
            <div className="card">
              <div className="card-header"><h2>📄 Upload Soal dari Word</h2></div>
              {/* Panduan format */}
              <div style={{background:"var(--blue3)", borderRadius:"var(--radius2)", padding:"16px", marginBottom:"20px"}}>
                <div style={{fontSize:"13px", fontWeight:"700", color:"var(--blue2)", marginBottom:"8px"}}>📋 Format Word yang Harus Digunakan:</div>
                <div style={{fontSize:"12px", color:"var(--navy3)", lineHeight:"1.8", marginBottom:"10px"}}>
                  Tulis soal dengan format berikut, satu soal per blok:
                </div>
                <div style={{fontSize:"12px", background:"white", borderRadius:"6px", padding:"12px", fontFamily:"var(--mono)", lineHeight:"1.8"}}>
                  <div>1. Ibu kota Indonesia adalah?</div>
                  <div>A. Bandung</div>
                  <div>B. Jakarta</div>
                  <div>C. Surabaya</div>
                  <div>D. Medan</div>
                  <div style={{color:"var(--green2)", fontWeight:"700"}}>Jawaban: B</div>
                  <div style={{color:"var(--gray)", margin:"4px 0"}}>---</div>
                  <div>2. 2 + 2 sama dengan?</div>
                  <div>A. 3</div>
                  <div>B. 5</div>
                  <div>C. 4</div>
                  <div>D. 6</div>
                  <div style={{color:"var(--green2)", fontWeight:"700"}}>Jawaban: C</div>
                </div>
              </div>
              <div style={{border:"2px dashed var(--green)", borderRadius:"var(--radius)", padding:"32px", textAlign:"center"}}>
                <div style={{fontSize:"36px", marginBottom:"8px"}}>📄</div>
                <div style={{fontSize:"14px", fontWeight:"600", marginBottom:"4px"}}>Pilih file Word (.docx)</div>
                <div style={{fontSize:"12px", color:"var(--gray)", marginBottom:"16px"}}>Format .docx (Microsoft Word 2007+)</div>
                <label className="btn btn-green" style={{cursor:"pointer"}}>
                  📂 Pilih File Word
                  <input type="file" accept=".docx" onChange={handleFileUpload} style={{display:"none"}} />
                </label>
              </div>
              {uploadStatus && (
                <div style={{marginTop:"12px", padding:"12px 16px", borderRadius:"var(--radius2)", background: uploadStatus.startsWith("✅")||uploadStatus.startsWith("🎉") ? "var(--green3)" : uploadStatus.startsWith("⏳") ? "var(--yellow3)" : "var(--red3)", fontSize:"14px", fontWeight:"500"}}>
                  {uploadStatus}
                </div>
              )}
              {previewSoal.length > 0 && (
                <div style={{marginTop:"16px"}}>
                  <div style={{fontSize:"14px", fontWeight:"700", marginBottom:"12px"}}>Preview {previewSoal.length} soal:</div>
                  {previewSoal.slice(0,3).map((s,i) => (
                    <div key={i} style={{border:"1px solid var(--border)", borderRadius:"var(--radius2)", padding:"12px", marginBottom:"8px", fontSize:"13px"}}>
                      <div style={{fontWeight:"600", marginBottom:"6px"}}>Soal {i+1}: {s.pertanyaan}</div>
                      <div style={{display:"flex", gap:"6px", flexWrap:"wrap"}}>
                        {s.opsi.map((o,j) => <span key={j} style={{padding:"2px 8px", borderRadius:"99px", background: j===s.jawaban?"var(--green3)":"var(--light)", color: j===s.jawaban?"var(--green2)":"var(--gray)", fontSize:"12px"}}>{HURUF[j]}. {o}</span>)}
                      </div>
                    </div>
                  ))}
                  {previewSoal.length > 3 && <div style={{fontSize:"12px", color:"var(--gray)", textAlign:"center", marginBottom:"12px"}}>...dan {previewSoal.length-3} soal lainnya</div>}
                  <button className="btn btn-green" style={{width:"100%", padding:"12px"}} onClick={handleImport} disabled={importing}>
                    {importing ? "⏳ Mengimport..." : `🚀 Import ${previewSoal.length} Soal ke Ujian`}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE: GOOGLE FORM */}
          {uploadMode === "googleform" && (
            <div className="card">
              <div className="card-header"><h2>🔗 Upload Link Google Form</h2></div>
              <div style={{background:"var(--blue3)", borderRadius:"var(--radius2)", padding:"16px", marginBottom:"20px"}}>
                <div style={{fontSize:"13px", fontWeight:"700", color:"var(--blue2)", marginBottom:"8px"}}>📋 Cara Menggunakan Google Form sebagai Ujian:</div>
                <div style={{fontSize:"12px", color:"var(--navy3)", lineHeight:"1.8"}}>
                  1. Buat soal ujian di Google Form<br/>
                  2. Klik tombol <strong>Kirim</strong> → salin link Google Form<br/>
                  3. Tempel link di kotak di bawah ini<br/>
                  4. Siswa akan mengerjakan ujian langsung dalam aplikasi ini (tidak bisa keluar)
                </div>
              </div>
              <div className="form-field">
                <label>🔗 Link Google Form</label>
                <input
                  value={googleFormUrl}
                  onChange={e => { setGoogleFormUrl(e.target.value); setGoogleFormSaved(false); }}
                  placeholder="https://docs.google.com/forms/d/e/..."
                  style={{fontFamily:"var(--mono)", fontSize:"12px"}}
                />
                <div style={{fontSize:"11px", color:"var(--gray)", marginTop:"4px"}}>
                  Pastikan Google Form sudah diset sebagai <strong>Publik</strong> (tidak perlu login Google)
                </div>
              </div>
              {googleFormUrl && (
                <div style={{marginTop:"8px"}}>
                  <div style={{fontSize:"13px", fontWeight:"700", marginBottom:"8px", color:"var(--navy3)"}}>👁️ Preview Google Form:</div>
                  <div style={{border:"2px solid var(--border)", borderRadius:"var(--radius2)", overflow:"hidden", height:"400px", position:"relative"}}>
                    <iframe
                      src={googleFormUrl.includes("viewform") ? googleFormUrl : googleFormUrl.replace(/\/edit.*$/, "/viewform")}
                      width="100%" height="100%"
                      frameBorder="0"
                      style={{border:"none"}}
                      title="Preview Google Form"
                    />
                  </div>
                </div>
              )}
              <div style={{display:"flex", gap:"8px", marginTop:"16px"}}>
                <button
                  className="btn btn-green"
                  onClick={() => {
                    if (!googleFormUrl.trim()) return alert("Masukkan link Google Form terlebih dahulu.");
                    if (!selectedUjian) return alert("Pilih ujian terlebih dahulu.");
                    const u = ujianList.find(u => String(u.id) === selectedUjian);
                    if (useDemo) {
                      const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
                      if (idx > -1) DEMO_UJIAN[idx].google_form_url = googleFormUrl;
                      setGoogleFormSaved(true);
                      setTimeout(() => onRefresh(), 500);
                      alert("✅ Link Google Form berhasil disimpan ke ujian ini!");
                    } else {
                      supabase("ujian?id=eq." + selectedUjian, {
                        method: "PATCH",
                        body: JSON.stringify({ google_form_url: googleFormUrl })
                      }).then(() => {
                        setGoogleFormSaved(true);
                        onRefresh();
                        alert("✅ Link Google Form berhasil disimpan ke ujian ini!");
                      }).catch(e => {
                        if (e.message && e.message.includes("google_form_url")) {
                          alert(
                            "❌ Kolom 'google_form_url' belum ada di database Supabase.\n\n" +
                            "Silakan jalankan SQL berikut di Supabase Dashboard → SQL Editor:\n\n" +
                            "ALTER TABLE ujian ADD COLUMN IF NOT EXISTS google_form_url TEXT;\n\n" +
                            "Setelah dijalankan, coba simpan lagi."
                          );
                        } else {
                          alert("Gagal simpan: " + e.message);
                        }
                      });
                    }
                  }}
                >
                  💾 Simpan Link ke Ujian
                </button>
                {googleFormSaved && (
                  <div style={{padding:"8px 16px", background:"var(--green3)", borderRadius:"var(--radius2)", fontSize:"13px", color:"var(--green2)", fontWeight:"600", display:"flex", alignItems:"center"}}>
                    ✅ Tersimpan!
                  </div>
                )}
              </div>
              <div style={{marginTop:"12px", padding:"12px 16px", background:"var(--yellow3)", borderRadius:"var(--radius2)", fontSize:"12px", color:"#92400e"}}>
                <strong>⚠️ Penting:</strong> Saat siswa mengerjakan Google Form, ujian akan ditampilkan <strong>fullscreen dalam aplikasi ini</strong>. Siswa tidak bisa membuka tab lain atau keluar dari ujian. Deteksi kecurangan tetap aktif.
              </div>
              <div style={{marginTop:"12px", padding:"14px 16px", background:"#1e1e2e", borderRadius:"var(--radius2)", fontSize:"12px", color:"#cdd6f4"}}>
                <div style={{fontWeight:"700", marginBottom:"8px", color:"#89b4fa"}}>🛠️ Jika muncul error "Could not find google_form_url column" — jalankan SQL ini di Supabase:</div>
                <div style={{fontFamily:"monospace", background:"#11111b", padding:"10px 12px", borderRadius:"6px", color:"#a6e3a1", fontSize:"11px", userSelect:"all", cursor:"text", lineHeight:"1.8"}}>
                  ALTER TABLE ujian ADD COLUMN IF NOT EXISTS google_form_url TEXT;
                </div>
                <div style={{marginTop:"8px", color:"#a6adc8", fontSize:"11px"}}>
                  Cara: Buka Supabase Dashboard → klik <strong style={{color:"#cba6f7"}}>SQL Editor</strong> → tempel perintah di atas → klik <strong style={{color:"#a6e3a1"}}>Run</strong>. Setelah itu coba simpan lagi.
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <h2>📝 Daftar Soal</h2>
              <div style={{display:"flex", gap:"8px", alignItems:"center"}}>
                <span className="badge badge-blue">{soalList.length} soal</span>
                {soalList.length > 0 && (
                  <button className="btn btn-red" style={{fontSize:"12px"}} onClick={() => setHapusSemua(true)}>🗑️ Hapus Semua</button>
                )}
              </div>
            </div>

            {/* Panel Export Soal — untuk arsip pengawas */}
            {soalList.length > 0 && (
              <div style={{background:"var(--light)", border:"1px solid var(--border)", borderRadius:"var(--radius2)", padding:"14px", marginBottom:"16px"}}>
                <div style={{fontSize:"13px", fontWeight:"700", color:"var(--navy3)", marginBottom:"4px"}}>
                  📄 Cetak / Simpan Soal
                </div>
                <div style={{fontSize:"12px", color:"var(--gray)", marginBottom:"10px"}}>
                  Untuk dikumpulkan ke pengawas atau diarsipkan.
                </div>
                <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
                  <button className="btn btn-blue" style={{fontSize:"12px"}} onClick={() => handleCetakPDF(false)}>
                    🖨️ Cetak / PDF (Soal Saja)
                  </button>
                  <button className="btn btn-blue" style={{fontSize:"12px"}} onClick={() => handleCetakPDF(true)}>
                    🖨️ Cetak / PDF (+ Kunci Jawaban)
                  </button>
                  <button className="btn btn-ghost" style={{fontSize:"12px"}} onClick={() => handleDownloadWord(false)}>
                    📝 Download Word (Soal Saja)
                  </button>
                  <button className="btn btn-ghost" style={{fontSize:"12px"}} onClick={() => handleDownloadWord(true)}>
                    📝 Download Word (+ Kunci Jawaban)
                  </button>
                </div>
                <div style={{fontSize:"11px", color:"var(--gray)", marginTop:"8px"}}>
                  💡 Untuk simpan PDF: pilih "Cetak", lalu di tujuan printer pilih <b>"Save as PDF"</b>.
                </div>
              </div>
            )}

            {/* Info card Google Form sudah ditambahkan */}
            {soalList.length === 0 && (() => { const u = ujianList.find(u => String(u.id) === selectedUjian); return u?.google_form_url; })() && (
              <div style={{background:"linear-gradient(135deg,#d1fae5 0%,#a7f3d0 100%)", border:"2px solid #6ee7b7", borderRadius:"var(--radius2)", padding:"20px", marginBottom:"8px", display:"flex", flexDirection:"column", alignItems:"center", gap:"10px", textAlign:"center"}}>
                <div style={{fontSize:"48px"}}>✅</div>
                <div style={{fontSize:"16px", fontWeight:"800", color:"#065f46"}}>Link Google Form Telah Ditambahkan!</div>
                <div style={{fontSize:"13px", color:"#047857", fontWeight:"500", maxWidth:"400px", lineHeight:"1.6"}}>
                  Soal ujian menggunakan Google Form. Siswa akan mengerjakan ujian langsung dari Google Form yang telah Anda atur.
                </div>
                <div style={{background:"white", borderRadius:"8px", padding:"10px 18px", fontSize:"12px", color:"#065f46", fontFamily:"monospace", wordBreak:"break-all", border:"1px solid #6ee7b7", maxWidth:"100%"}}>
                  🔗 {(() => { const u = ujianList.find(u => String(u.id) === selectedUjian); return u?.google_form_url || ""; })()}
                </div>
                <div style={{fontSize:"12px", color:"#6b7280", marginTop:"4px"}}>
                  Untuk mengganti link, buka tab <strong>🔗 Upload Link Google Form</strong> dan simpan link baru.
                </div>
              </div>
            )}

            {soalList.length === 0 && !(() => { const u = ujianList.find(u => String(u.id) === selectedUjian); return u?.google_form_url; })() ? (
              <div className="empty-state"><div className="icon">✏️</div><p>Belum ada soal. Tambahkan soal di atas.</p></div>
            ) : soalList.length > 0 ? (
              soalList.map((s, idx) => (
                <div key={s.id} style={{border:`2px solid ${editSoal?.id === s.id ? "var(--yellow)" : "var(--border)"}`, borderRadius:"var(--radius2)", padding:"16px", marginBottom:"12px", background: editSoal?.id === s.id ? "var(--yellow3)" : "white"}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"12px", fontWeight:"700", color:"var(--blue)", marginBottom:"6px"}}>SOAL {idx+1} {editSoal?.id === s.id ? "— ✏️ Sedang Diedit" : ""}</div>
                      {s.gambar && (
                        <div style={{marginBottom:"8px", borderRadius:"6px", overflow:"hidden", border:"1px solid var(--border)", maxHeight:"120px", display:"flex", alignItems:"center", background:"var(--light)"}}>
                          <img src={s.gambar} alt="gambar soal" style={{maxHeight:"120px", objectFit:"contain", width:"100%"}} onError={e => e.target.style.display="none"} />
                        </div>
                      )}
                      <div style={{fontSize:"14px", fontWeight:"500", marginBottom:"10px"}}><MathText text={s.pertanyaan} /></div>
                      <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
                        {s.opsi.map((o,i) => (
                          <span key={i} style={{fontSize:"12px", padding:"3px 10px", borderRadius:"99px", background: i === s.jawaban ? "var(--green3)" : "var(--light)", color: i === s.jawaban ? "var(--green2)" : "var(--gray)", fontWeight: i === s.jawaban ? "700" : "500"}}>
                            {HURUF[i]}. <MathText text={o} />
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", gap:"6px", marginLeft:"12px"}}>
                      <button className="btn btn-ghost" style={{fontSize:"12px"}} onClick={() => handleEdit(s)}>✏️ Edit</button>
                      <button className="btn btn-red" style={{fontSize:"12px"}} onClick={() => handleDelete(s.id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>

          {/* Modal Konfirmasi Hapus Semua */}
          {hapusSemua && (
            <div className="modal-overlay">
              <div className="modal">
                <div style={{fontSize:"48px", textAlign:"center", marginBottom:"12px"}}>⚠️</div>
                <h2 style={{textAlign:"center"}}>Hapus Semua Soal?</h2>
                <p style={{textAlign:"center", color:"var(--gray)"}}>Semua <strong>{soalList.length} soal</strong> pada ujian ini akan dihapus permanen.</p>
                <div style={{background:"var(--red3)", borderRadius:"var(--radius2)", padding:"10px", margin:"16px 0", fontSize:"13px", color:"var(--red2)", fontWeight:"600", textAlign:"center"}}>
                  ❌ Tindakan ini tidak bisa dibatalkan!
                </div>
                <div style={{display:"flex", gap:"8px"}}>
                  <button className="btn btn-red" style={{flex:1, padding:"12px"}} onClick={handleHapusSemua} disabled={saving}>
                    {saving ? "Menghapus..." : "🗑️ Ya, Hapus Semua"}
                  </button>
                  <button className="btn btn-ghost" style={{flex:1, padding:"12px"}} onClick={() => setHapusSemua(false)}>Batal</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

// ---- Monitor Ujian & Buka Kunci ----
function MonitorPage({ ujianList }) {
  const [hasilLive, setHasilLive] = useState([]);
  const [pesertaLive, setPesertaLive] = useState([]); // peserta sedang ujian
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [filterUjian, setFilterUjian] = useState("all"); // filter ujian untuk live
  const [unlockedSiswa, setUnlockedSiswa] = useState(() => {
    try { return JSON.parse(localStorage.getItem("unlocked_siswa") || "[]"); } catch { return []; }
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (!useDemo) {
        // Ambil hasil submit
        const dataHasil = await supabase("hasil?order=id.desc");
        setHasilLive(dataHasil);
        // Ambil peserta yang sedang aktif ujian
        // Hanya ambil yang heartbeat < 60 detik (yang lebih lama dianggap putus)
        const cutoff = new Date(Date.now() - 60 * 1000).toISOString();
        const dataPeserta = await supabase(
          `peserta_aktif?status=eq.aktif&last_heartbeat=gte.${cutoff}&order=started_at.desc`
        );
        setPesertaLive(dataPeserta);
      } else {
        setHasilLive([...DEMO_HASIL]);
        setPesertaLive([]);
      }
      setLastRefresh(new Date());
    } catch(e) { console.error(e); }
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Auto-refresh setiap 3 detik (untuk monitoring real-time)
  useEffect(() => {
    if (!autoRefresh) return;
    const t = setInterval(loadData, 3000);
    return () => clearInterval(t);
  }, [autoRefresh, loadData]);

  const saveUnlocked = (list) => {
    setUnlockedSiswa(list);
    localStorage.setItem("unlocked_siswa", JSON.stringify(list));
  };

  const bukaKunci = (nama, kelas) => {
    const key = `${nama}_${kelas}`;
    saveUnlocked([...unlockedSiswa.filter(k => k !== key), key]);
    alert(`✅ Kunci ujian ${nama} (${kelas}) berhasil dibuka!\nMinta siswa refresh browser dan masuk ulang.`);
  };

  // Hitung status koneksi peserta berdasarkan last_heartbeat
  const getKoneksiStatus = (lastHeartbeat) => {
    const diff = (Date.now() - new Date(lastHeartbeat).getTime()) / 1000; // detik
    if (diff < 10) return { label: "Online", color: "var(--green2)", bg: "var(--green3)", icon: "🟢" };
    if (diff < 30) return { label: "Lag", color: "#b45309", bg: "var(--yellow3)", icon: "🟡" };
    return { label: "Putus", color: "var(--red2)", bg: "var(--red3)", icon: "🔴" };
  };

  // Filter peserta live by ujian
  const pesertaFiltered = filterUjian === "all"
    ? pesertaLive
    : pesertaLive.filter(p => String(p.ujian_id) === String(filterUjian));

  // Statistik hasil submit
  const totalSiswa = hasilLive.length;
  const sudahSelesai = hasilLive.length;
  const curiga = hasilLive.filter(h => h.mencurigakan).length;
  const rataRata = totalSiswa > 0 ? Math.round(hasilLive.reduce((a,h) => a + (h.nilai||0), 0) / totalSiswa) : 0;

  // Statistik live
  const totalAktif = pesertaLive.length;
  const pelanggaranAktif = pesertaLive.filter(p => (p.pelanggaran||0) > 0).length;

  return (
    <>
      <div className="page-header">
        <h1>🖥️ Monitor Ujian Live</h1>
        <p>Pantau aktivitas siswa secara real-time (update tiap 3 detik)</p>
      </div>

      {/* Status bar */}
      <div style={{display:"flex", gap:"12px", marginBottom:"20px", flexWrap:"wrap"}}>
        {[
          { icon:"🟢", label:"Sedang Ujian", val:totalAktif, bg:"var(--green3)", color:"var(--green2)" },
          { icon:"✅", label:"Sudah Submit", val:sudahSelesai, bg:"var(--blue3)", color:"var(--blue2)" },
          { icon:"🚨", label:"Mencurigakan", val:curiga, bg:"var(--red3)", color:"var(--red2)" },
          { icon:"⭐", label:"Rata-rata Nilai", val:rataRata, bg:"var(--yellow3)", color:"#b45309" },
        ].map((s,i) => (
          <div key={i} style={{background:s.bg, borderRadius:"var(--radius)", padding:"16px 20px", flex:"1", minWidth:"140px"}}>
            <div style={{fontSize:"22px", fontWeight:"800", color:s.color, fontFamily:"var(--mono)"}}>{s.icon} {s.val}</div>
            <div style={{fontSize:"12px", color:s.color, marginTop:"4px"}}>{s.label}</div>
          </div>
        ))}
        <div style={{background:"white", border:"1px solid var(--border)", borderRadius:"var(--radius)", padding:"16px 20px", flex:"1", minWidth:"160px", display:"flex", flexDirection:"column", gap:"8px"}}>
          <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
            <div style={{width:"8px", height:"8px", borderRadius:"50%", background: autoRefresh ? "var(--green)" : "var(--gray)", animation: autoRefresh ? "pulse 1.5s infinite" : "none"}}></div>
            <span style={{fontSize:"13px", fontWeight:"600"}}>{autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"}</span>
          </div>
          <div style={{fontSize:"11px", color:"var(--gray)"}}>Update: {lastRefresh.toLocaleTimeString('id-ID')}</div>
          <div style={{display:"flex", gap:"6px"}}>
            <button className="btn btn-blue" style={{fontSize:"11px", padding:"4px 10px"}} onClick={loadData} disabled={loading}>
              {loading ? "..." : "🔄 Refresh"}
            </button>
            <button className={`btn ${autoRefresh ? "btn-red" : "btn-green"}`} style={{fontSize:"11px", padding:"4px 10px"}} onClick={() => setAutoRefresh(v => !v)}>
              {autoRefresh ? "⏸ Pause" : "▶ Auto"}
            </button>
          </div>
        </div>
      </div>

      {/* Alert pelanggaran live */}
      {pelanggaranAktif > 0 && (
        <div style={{background:"var(--yellow3)", border:"1px solid var(--yellow)", borderRadius:"var(--radius)", padding:"14px 18px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"12px"}}>
          <div style={{fontSize:"20px"}}>⚠️</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:"700", color:"#b45309"}}>{pelanggaranAktif} peserta sedang ujian dengan pelanggaran!</div>
            <div style={{fontSize:"12px", color:"#b45309", opacity:0.8}}>Lihat detail di tabel "Sedang Ujian (Live)" — kolom Pelanggaran.</div>
          </div>
        </div>
      )}

      {/* Alert mencurigakan (sudah submit) */}
      {curiga > 0 && (
        <div style={{background:"var(--red3)", border:"1px solid var(--red)", borderRadius:"var(--radius)", padding:"14px 18px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"12px"}}>
          <div style={{fontSize:"20px"}}>🚨</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:"700", color:"var(--red2)"}}>Terdeteksi {curiga} siswa mencurigakan (sudah submit)!</div>
            <div style={{fontSize:"12px", color:"var(--red2)", opacity:0.8}}>Lihat detail di tabel Rekap Siswa.</div>
          </div>
        </div>
      )}

      {/* ═════════ TABEL PESERTA SEDANG UJIAN (LIVE) ═════════ */}
      <div className="card">
        <div className="card-header" style={{flexWrap:"wrap", gap:"12px"}}>
          <h2>🟢 Sedang Ujian Live ({pesertaFiltered.length})</h2>
          <select
            value={filterUjian}
            onChange={e => setFilterUjian(e.target.value)}
            style={{padding:"6px 12px", border:"1.5px solid var(--border)", borderRadius:"var(--radius2)", fontSize:"13px", background:"white"}}
          >
            <option value="all">Semua Ujian</option>
            {ujianList.map(u => (
              <option key={u.id} value={u.id}>{u.mapel} — Kelas {u.kelas}</option>
            ))}
          </select>
        </div>
        {pesertaFiltered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">😴</div>
            <p>Belum ada peserta yang sedang ujian.</p>
            <p style={{fontSize:"12px", marginTop:"6px"}}>Halaman ini akan auto-update saat ada siswa mulai ujian.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Mapel</th>
                  <th>Progress</th>
                  <th>Koneksi</th>
                  <th>Pelanggaran</th>
                  <th>Mulai</th>
                </tr>
              </thead>
              <tbody>
                {pesertaFiltered.map((p, i) => {
                  const koneksi = getKoneksiStatus(p.last_heartbeat);
                  const persen = p.total_soal > 0 ? Math.round((p.progress_jawaban / p.total_soal) * 100) : 0;
                  const mulai = new Date(p.started_at).toLocaleTimeString('id-ID', {hour:'2-digit', minute:'2-digit'});
                  const isWarning = (p.pelanggaran||0) > 0;
                  return (
                    <tr key={p.id} style={{background: isWarning ? "#fff7ed" : ""}}>
                      <td style={{color:"var(--gray)", fontSize:"12px"}}>{i+1}</td>
                      <td><strong>{p.nama_siswa}</strong></td>
                      <td>{p.kelas}</td>
                      <td>{p.mapel || "-"}</td>
                      <td style={{minWidth:"140px"}}>
                        <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                          <div style={{flex:1, height:"8px", background:"var(--border)", borderRadius:"4px", overflow:"hidden"}}>
                            <div style={{
                              height:"100%",
                              width: `${persen}%`,
                              background: persen >= 80 ? "var(--green)" : persen >= 50 ? "var(--blue)" : "var(--yellow)",
                              transition: "width .3s"
                            }}></div>
                          </div>
                          <span style={{fontSize:"11px", fontFamily:"var(--mono)", fontWeight:"700", color:"var(--navy)", minWidth:"40px"}}>
                            {p.progress_jawaban}/{p.total_soal}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span style={{
                          fontSize:"11px",
                          fontWeight:"700",
                          color: koneksi.color,
                          background: koneksi.bg,
                          padding:"3px 8px",
                          borderRadius:"99px",
                          display:"inline-flex",
                          alignItems:"center",
                          gap:"4px"
                        }}>
                          {koneksi.icon} {koneksi.label}
                        </span>
                      </td>
                      <td>
                        {(() => {
                          const riwayat = Array.isArray(p.riwayat_pelanggaran) ? p.riwayat_pelanggaran : [];
                          const pelanggaranCount = p.pelanggaran || 0;
                          const warningCount = riwayat.filter(r => r.level === "warning").length;

                          // Format tooltip detail
                          const tooltip = riwayat.length > 0
                            ? riwayat.map(r => {
                                const jam = new Date(r.waktu).toLocaleTimeString('id-ID');
                                const dur = r.durasi_detik ? ` (${r.durasi_detik}dtk)` : '';
                                const label = r.level === "warning" ? "⚠️ WARN" : "🔴 PELANGGARAN";
                                return `${jam} ${label} - ${r.jenis}${dur}`;
                              }).join('\n')
                            : '';

                          if (pelanggaranCount === 0 && warningCount === 0) {
                            return <span style={{color:"var(--green2)", fontSize:"12px"}}>✅ Bersih</span>;
                          }

                          return (
                            <div style={{display:"flex", flexDirection:"column", gap:"3px"}} title={tooltip}>
                              {pelanggaranCount > 0 && (
                                <span style={{color:"var(--red2)", fontSize:"12px", fontWeight:"700"}}>
                                  🔴 {pelanggaranCount}x pelanggaran
                                </span>
                              )}
                              {warningCount > 0 && (
                                <span style={{color:"#b45309", fontSize:"11px", fontWeight:"600"}}>
                                  ⚠️ {warningCount}x warning
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </td>
                      <td style={{fontSize:"12px", color:"var(--gray)", fontFamily:"var(--mono)"}}>{mulai}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ═════════ TABEL HASIL SUBMIT ═════════ */}
      <div className="card">
        <div className="card-header">
          <h2>📊 Rekap Siswa Sudah Submit ({totalSiswa})</h2>
        </div>
        {hasilLive.length === 0 ? (
          <div className="empty-state">
            <div className="icon">⏳</div>
            <p>Belum ada siswa yang submit.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>#</th><th>Nama</th><th>Kelas</th><th>Mapel</th><th>Nilai</th><th>Status</th><th>Pelanggaran</th></tr>
              </thead>
              <tbody>
                {hasilLive.map((h, i) => (
                  <tr key={i} style={{background: h.mencurigakan ? "#fff5f5" : ""}}>
                    <td style={{color:"var(--gray)", fontSize:"12px"}}>{i+1}</td>
                    <td>
                      <strong>{h.nama_siswa}</strong>
                      {h.mencurigakan && <span style={{marginLeft:"6px", fontSize:"10px", color:"var(--red2)", fontWeight:"700", background:"var(--red3)", padding:"1px 6px", borderRadius:"99px"}}>⚠️ Curiga</span>}
                    </td>
                    <td>{h.kelas}</td>
                    <td>{h.mapel}</td>
                    <td><strong style={{fontFamily:"var(--mono)", color: h.nilai>=75?"var(--green2)":"var(--red2)"}}>{h.nilai}</strong></td>
                    <td><span className={`badge ${h.nilai>=75?"badge-green":"badge-red"}`}>{h.nilai>=75?"Lulus":"Remedi"}</span></td>
                    <td>
                      {(h.pelanggaran||0) === 0
                        ? <span style={{color:"var(--green2)", fontSize:"12px"}}>✅ Bersih</span>
                        : <span style={{color:"var(--red2)", fontSize:"12px", fontWeight:"700"}}>⚠️ {h.pelanggaran}x</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Buka Kunci */}
      <div className="card">
        <div className="card-header"><h2>🔓 Buka Kunci Siswa</h2></div>
        <div style={{background:"var(--blue3)", borderRadius:"var(--radius2)", padding:"12px 16px", marginBottom:"16px", fontSize:"13px", color:"var(--navy3)"}}>
          ℹ️ Jika ada siswa yang ujiannya terkunci (3x pelanggaran), isi nama dan kelas di bawah lalu klik Buka Kunci. Minta siswa refresh browser dan masuk ulang.
        </div>
        <BukaKunciManual onBukaKunci={bukaKunci} />
        {unlockedSiswa.length > 0 && (
          <div style={{marginTop:"16px"}}>
            <div style={{fontSize:"13px", fontWeight:"700", marginBottom:"8px"}}>Riwayat Buka Kunci:</div>
            <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
              {unlockedSiswa.map((key, i) => {
                const [nama, kelas] = key.split("_");
                return (
                  <div key={i} style={{background:"var(--green3)", padding:"4px 12px", borderRadius:"99px", fontSize:"12px", color:"var(--green2)", fontWeight:"600"}}>
                    ✅ {nama} ({kelas})
                  </div>
                );
              })}
            </div>
            <button className="btn btn-ghost" style={{fontSize:"12px", marginTop:"8px"}} onClick={() => saveUnlocked([])}>Hapus Riwayat</button>
          </div>
        )}
      </div>
    </>
  );
}

function BukaKunciManual({ onBukaKunci }) {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [success, setSuccess] = useState(false);

  const handleBuka = () => {
    if (!nama.trim()) return alert("Isi nama siswa terlebih dahulu.");
    if (!kelas.trim()) return alert("Isi kelas siswa terlebih dahulu.");
    onBukaKunci(nama.trim(), kelas.trim());
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setNama(""); setKelas("");
  };

  return (
    <div style={{background:"var(--light)", borderRadius:"var(--radius)", padding:"20px"}}>
      <div style={{display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"flex-end"}}>
        <div className="form-field" style={{flex:"1", minWidth:"160px", marginBottom:0}}>
          <label>Nama Siswa</label>
          <input value={nama} onChange={e => setNama(e.target.value)} placeholder="Nama lengkap siswa" />
        </div>
        <div className="form-field" style={{flex:"1", minWidth:"120px", marginBottom:0}}>
          <label>Kelas</label>
          <input value={kelas} onChange={e => setKelas(e.target.value)} placeholder="Contoh: VII A" />
        </div>
        <button className="btn btn-green" style={{padding:"10px 20px", height:"42px"}} onClick={handleBuka}>🔓 Buka Kunci</button>
      </div>
      {success && (
        <div style={{marginTop:"12px", padding:"10px 14px", background:"var(--green3)", borderRadius:"var(--radius2)", fontSize:"13px", color:"var(--green2)", fontWeight:"600"}}>
          ✅ Kunci berhasil dibuka! Minta siswa refresh browser dan masuk ulang.
        </div>
      )}
    </div>
  );
}

// ---- Hasil Ujian ----
function HasilPage({ hasilList, ujianList }) {
  const [filter, setFilter] = useState("");
  const [tabView, setTabView] = useState("semua"); // semua | curiga
  const filtered = hasilList.filter(h => {
    const matchMapel = filter ? h.mapel === filter : true;
    const matchTab = tabView === "curiga" ? h.mencurigakan : true;
    return matchMapel && matchTab;
  });
  const curigaCount = hasilList.filter(h => h.mencurigakan).length;

  const exportCSV = () => {
    const rows = [
      ["No","Nama","Kelas","Mata Pelajaran","Benar","Total","Nilai","Status","Pelanggaran","Mencurigakan"],
      ...filtered.map((h,i) => [i+1, h.nama_siswa, h.kelas, h.mapel, h.benar, h.total, h.nilai, h.nilai>=75?"Lulus":"Remedi", h.pelanggaran||0, h.mencurigakan?"Ya":"Tidak"])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `hasil-ujian-${filter||"semua"}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="page-header"><h1>Hasil Ujian</h1><p>Rekap nilai & deteksi kecurangan peserta</p></div>

      {curigaCount > 0 && (
        <div style={{background:"var(--red3)", border:"1px solid var(--red)", borderRadius:"var(--radius)", padding:"16px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"12px"}}>
          <div style={{fontSize:"24px"}}>🚨</div>
          <div>
            <div style={{fontWeight:"700", color:"var(--red2)"}}>Terdeteksi {curigaCount} siswa mencurigakan!</div>
            <div style={{fontSize:"13px", color:"var(--red2)", opacity:0.8}}>Siswa ini terdeteksi berpindah tab atau keluar fullscreen lebih dari 1 kali.</div>
          </div>
          <button className="btn btn-red" style={{marginLeft:"auto"}} onClick={() => setTabView("curiga")}>Lihat Detail</button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div style={{display:"flex", gap:"8px"}}>
            <button className={`btn ${tabView==="semua"?"btn-blue":"btn-ghost"}`} onClick={() => setTabView("semua")}>📊 Semua ({hasilList.length})</button>
            <button className={`btn ${tabView==="curiga"?"btn-red":"btn-ghost"}`} onClick={() => setTabView("curiga")}>🚨 Mencurigakan ({curigaCount})</button>
          </div>
          <div style={{display:"flex", gap:"8px"}}>
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{padding:"8px 12px", borderRadius:"var(--radius2)", border:"1.5px solid var(--border)", fontSize:"13px"}}>
              <option value="">Semua Mapel</option>
              {MAPEL.map(m => <option key={m}>{m}</option>)}
            </select>
            <button className="btn btn-green" onClick={exportCSV}>⬇️ Export CSV</button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state"><div className="icon">📊</div><p>{tabView==="curiga" ? "Tidak ada siswa mencurigakan 🎉" : "Belum ada data hasil ujian"}</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Nama</th><th>Kelas</th><th>Mata Pelajaran</th>
                  <th>Benar</th><th>Total</th><th>Nilai</th><th>Status</th>
                  <th>Pelanggaran</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((h,i) => (
                  <tr key={i} style={{background: h.mencurigakan ? "#fff5f5" : ""}}>
                    <td style={{color:"var(--gray)", fontSize:"12px"}}>{i+1}</td>
                    <td>
                      <strong>{h.nama_siswa}</strong>
                      {h.mencurigakan && <span style={{marginLeft:"6px", fontSize:"11px", color:"var(--red2)", fontWeight:"700"}}>⚠️ Curiga</span>}
                    </td>
                    <td>{h.kelas}</td>
                    <td>{h.mapel}</td>
                    <td style={{fontFamily:"var(--mono)"}}>{h.benar}</td>
                    <td style={{fontFamily:"var(--mono)"}}>{h.total}</td>
                    <td><strong style={{fontFamily:"var(--mono)", color: h.nilai >= 75 ? "var(--green2)" : "var(--red2)"}}>{h.nilai}</strong></td>
                    <td><span className={`badge ${h.nilai >= 75 ? "badge-green" : "badge-red"}`}>{h.nilai >= 75 ? "Lulus" : "Remedi"}</span></td>
                    <td>
                      {(h.pelanggaran||0) === 0
                        ? <span style={{color:"var(--green2)", fontSize:"12px", fontWeight:"600"}}>✅ Bersih</span>
                        : <span style={{color:"var(--red2)", fontSize:"12px", fontWeight:"700"}}>⚠️ {h.pelanggaran}x</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================
// STUDENT EXAM (CBT)
// ============================================================
function StudentExam({ data, onFinish }) {
  const { ujian, siswa } = data;
  // Acak soal dan opsi saat komponen pertama kali dimuat
  const [soal] = useState(() => shuffleSoalDanOpsi(ujian.soal));
  const [current, setCurrent] = useState(0);
  const [jawaban, setJawaban] = useState(Array(soal.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(ujian.durasi * 60);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tabViolation, setTabViolation] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [locked, setLocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [queuePos, setQueuePos] = useState(null);
  const [timerPaused, setTimerPaused] = useState(false); // pause saat layar mati
  const hiddenSinceRef = useRef(null); // waktu layar mulai gelap
  const pesertaAktifIdRef = useRef(null); // ID record di tabel peserta_aktif
  const riwayatPelanggaranRef = useRef([]); // log pelanggaran untuk dikirim ke monitor
  const wakeLockRef = useRef(null); // Wake Lock sentinel untuk paksa layar tetap nyala
  const [wakeLockAktif, setWakeLockAktif] = useState(false); // status wake lock untuk UI
  // Threshold bertingkat untuk membedakan screen timeout HP vs cheating
  const ABAIKAN_MS = 30000;        // < 30 detik = diabaikan (screen timeout normal)
  const WARNING_MS = 90000;        // 30-90 detik = warning (log saja, tidak hitung pelanggaran)
                                   // > 90 detik = pelanggaran (hitung +1)
  const MAX_VIOLATIONS = 3;

  // ── Fullscreen ──────────────────────────────────────────────
  const enterFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    setIsFullscreen(true);
  };

  // ── Wake Lock: paksa layar HP tetap menyala selama ujian ────
  // Mencegah screen timeout otomatis yang akan ter-trigger sebagai pelanggaran
  // Didukung: Chrome Android 84+, Edge, Safari iOS 16.4+
  useEffect(() => {
    if (locked || submitting) return;

    const acquireWakeLock = async () => {
      if (!('wakeLock' in navigator)) {
        // Browser tidak support — biarkan saja, threshold longgar akan toleran
        return;
      }
      try {
        const sentinel = await navigator.wakeLock.request('screen');
        wakeLockRef.current = sentinel;
        setWakeLockAktif(true);
        // Wake lock bisa di-release otomatis oleh browser (mis. tab hidden)
        sentinel.addEventListener('release', () => {
          wakeLockRef.current = null;
          setWakeLockAktif(false);
        });
      } catch (e) {
        // User mungkin reject, battery saver, dll. Silent fail.
        console.warn("Wake Lock tidak tersedia:", e.message);
      }
    };

    acquireWakeLock();

    // Re-acquire saat tab kembali visible (wake lock auto-release saat hidden)
    const onVisibilityForWakeLock = () => {
      if (!document.hidden && !wakeLockRef.current) {
        acquireWakeLock();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityForWakeLock);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityForWakeLock);
      if (wakeLockRef.current) {
        wakeLockRef.current.release().catch(() => {});
        wakeLockRef.current = null;
      }
    };
  }, [locked, submitting]);

  useEffect(() => {
    enterFullscreen();
    const onFsChange = () => {
      const fs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(fs);
      if (!fs && !submitting) {
        // Catat di riwayat detail
        riwayatPelanggaranRef.current = [
          ...riwayatPelanggaranRef.current,
          {
            waktu: new Date().toISOString(),
            level: "pelanggaran",
            jenis: "keluar_fullscreen",
          },
        ];
        setTabViolation(v => {
          const nv = v + 1;
          if (nv >= MAX_VIOLATIONS) {
            setLocked(true);
            setWarningMsg(`🔒 Ujian dikunci! Anda keluar layar penuh ${nv}x. Hubungi pengawas.`);
          } else {
            setWarningMsg(`⚠️ PERINGATAN ${nv}/${MAX_VIOLATIONS}: Anda keluar dari layar penuh!`);
          }
          setShowWarning(true);
          return nv;
        });
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, [submitting]);

  // ── Deteksi pindah tab vs layar mati (THRESHOLD BERTINGKAT) ─
  // < 30 detik  → diabaikan (screen timeout normal HP, siswa berpikir)
  // 30-90 detik → warning (dicatat di log, tidak hitung pelanggaran)
  // > 90 detik  → pelanggaran (hitung +1, kunci kalau sudah 3x)
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && !submitting) {
        // Layar mulai gelap / tab disembunyikan
        hiddenSinceRef.current = Date.now();
        setTimerPaused(true); // pause timer dulu
      } else if (!document.hidden && !submitting) {
        // Layar menyala kembali / kembali ke tab
        setTimerPaused(false); // lanjutkan timer
        if (hiddenSinceRef.current) {
          const durasi = Date.now() - hiddenSinceRef.current;
          const durasiDetik = Math.round(durasi / 1000);
          hiddenSinceRef.current = null;

          if (durasi < ABAIKAN_MS) {
            // < 30 detik: kemungkinan besar screen timeout / siswa berpikir
            // Tidak dicatat sama sekali — terlalu sering kalau dicatat
            return;
          }

          if (durasi < WARNING_MS) {
            // 30-90 detik: WARNING — dicatat di log untuk dilihat guru,
            // tapi tidak menambah counter pelanggaran
            riwayatPelanggaranRef.current = [
              ...riwayatPelanggaranRef.current,
              {
                waktu: new Date().toISOString(),
                durasi_detik: durasiDetik,
                level: "warning",
                jenis: "layar_gelap",
              },
            ];
            return;
          }

          // > 90 detik: PELANGGARAN sungguhan
          riwayatPelanggaranRef.current = [
            ...riwayatPelanggaranRef.current,
            {
              waktu: new Date().toISOString(),
              durasi_detik: durasiDetik,
              level: "pelanggaran",
              jenis: "tinggalkan_ujian",
            },
          ];
          setTabViolation(v => {
            const nv = v + 1;
            if (nv >= MAX_VIOLATIONS) {
              setLocked(true);
              setWarningMsg(`🔒 Ujian dikunci! Anda terdeteksi meninggalkan ujian ${nv}x. Hubungi pengawas.`);
            } else {
              setWarningMsg(`⚠️ PERINGATAN ${nv}/${MAX_VIOLATIONS}: Anda meninggalkan halaman ujian selama ${durasiDetik} detik!`);
            }
            setShowWarning(true);
            return nv;
          });
        }
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [submitting]);

  // ── Blokir klik kanan & shortcut ───────────────────────────
  useEffect(() => {
    const block = e => e.preventDefault();
    const blockKeys = e => {
      if (e.ctrlKey && ["c","v","u","s","a","p"].includes(e.key.toLowerCase())) e.preventDefault();
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) e.preventDefault();
      if (e.key === "PrintScreen") e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", blockKeys);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  // ── Timer (pause saat layar mati) ──────────────────────────
  useEffect(() => {
    if (locked || submitting || timerPaused) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); handleSubmit(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [locked, submitting, timerPaused]);

  // ── HEARTBEAT: Daftarkan peserta saat mulai & update tiap 5 detik ──
  // Memungkinkan guru memantau peserta secara live di MonitorPage
  useEffect(() => {
    if (useDemo) return; // mode demo tidak track ke server
    let mounted = true;

    // 1) INSERT saat mount — daftarkan peserta sebagai "aktif"
    (async () => {
      try {
        const result = await supabase("peserta_aktif", {
          method: "POST",
          body: JSON.stringify({
            ujian_id: ujian.id,
            nama_siswa: siswa.nama,
            kelas: siswa.kelas,
            mapel: ujian.mapel,
            progress_jawaban: 0,
            total_soal: soal.length,
            pelanggaran: 0,
            riwayat_pelanggaran: [],
            status: "aktif",
          }),
        });
        if (mounted && result && result[0]) {
          pesertaAktifIdRef.current = result[0].id;
        }
      } catch (e) {
        console.warn("Gagal daftar peserta aktif:", e);
      }
    })();

    // 2) Cleanup saat komponen di-unmount paksa (siswa close tab tanpa submit)
    // Browser akan tetap update last_heartbeat saat polling berikutnya gagal,
    // dan guru akan lihat status offline setelah 30 detik.
    return () => {
      mounted = false;
      // Best-effort: tandai status sebagai "terputus" jika tab ditutup
      // Gunakan sendBeacon agar request tetap terkirim walau halaman ditutup
      if (pesertaAktifIdRef.current && !useDemo) {
        try {
          const payload = JSON.stringify({ status: "terputus" });
          const url = `${SUPABASE_URL}/rest/v1/peserta_aktif?id=eq.${pesertaAktifIdRef.current}`;
          // sendBeacon tidak bisa set header custom, jadi pakai fetch dengan keepalive
          fetch(url, {
            method: "PATCH",
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: payload,
            keepalive: true,
          }).catch(() => {});
        } catch {}
      }
    };
  }, [ujian.id, siswa.nama, siswa.kelas, ujian.mapel, soal.length]);

  // 3) Heartbeat tiap 5 detik — update progress, pelanggaran, last_heartbeat
  // Pakai ref untuk hindari re-create interval setiap kali jawaban/violation berubah
  const heartbeatStateRef = useRef({ jawaban, tabViolation, locked, submitting });
  useEffect(() => {
    heartbeatStateRef.current = { jawaban, tabViolation, locked, submitting };
  }, [jawaban, tabViolation, locked, submitting]);

  useEffect(() => {
    if (useDemo) return;

    const tick = async () => {
      const state = heartbeatStateRef.current;
      if (state.locked || state.submitting) return; // skip kalau terkunci/submitting
      if (!pesertaAktifIdRef.current) return; // belum berhasil INSERT
      try {
        const progress = state.jawaban.filter(j => j !== null).length;
        await supabase(`peserta_aktif?id=eq.${pesertaAktifIdRef.current}`, {
          method: "PATCH",
          body: JSON.stringify({
            progress_jawaban: progress,
            pelanggaran: state.tabViolation,
            riwayat_pelanggaran: riwayatPelanggaranRef.current,
            last_heartbeat: new Date().toISOString(),
          }),
          prefer: "return=minimal",
        });
      } catch (e) {
        // Diam saja — jangan ganggu ujian siswa kalau heartbeat gagal
        console.warn("Heartbeat gagal:", e.message);
      }
    };

    // Tunggu 1 detik agar INSERT awal sempat selesai dulu, baru mulai heartbeat
    const startupDelay = setTimeout(() => {
      tick(); // kirim segera
    }, 1000);
    const t = setInterval(tick, 5000);
    return () => {
      clearTimeout(startupDelay);
      clearInterval(t);
    };
  }, []); // empty deps — interval dibuat sekali saja

  // ── Submit dengan Antrian ───────────────────────────────────
  const handleSubmit = useCallback(async (auto = false) => {
    if (submitting) return;
    setSubmitting(true);
    setShowConfirm(false);
    setShowReview(false);

    const benar = soal.filter((s, i) => jawaban[i] === s.jawaban).length;
    const nilai = Math.round((benar / soal.length) * 100);
    const hasilData = {
      nama_siswa: siswa.nama, kelas: siswa.kelas, mapel: ujian.mapel,
      benar, total: soal.length, nilai, ujian_id: ujian.id,
      pelanggaran: tabViolation,
      mencurigakan: tabViolation >= 2,
    };

    try {
      if (useDemo) {
        setSubmitStatus("saving");
        await new Promise(r => setTimeout(r, 800));
        hasilData.id = Date.now();
        DEMO_HASIL.push(hasilData);
        setSubmitStatus("done");
      } else {
        setSubmitStatus("queued");
        // Masukkan ke antrian — otomatis retry jika gagal
        await submitQueue.add(async () => {
          setSubmitStatus("saving");
          await supabase("hasil", {
            method: "POST",
            body: JSON.stringify(hasilData),
          });
        });
        setSubmitStatus("done");
      }
    } catch(e) {
      setSubmitStatus("error");
      console.error("Gagal simpan hasil:", e);
    }

    // Tandai peserta_aktif sebagai SELESAI (best-effort, tidak blocking)
    if (!useDemo && pesertaAktifIdRef.current) {
      try {
        await supabase(`peserta_aktif?id=eq.${pesertaAktifIdRef.current}`, {
          method: "PATCH",
          body: JSON.stringify({
            status: "selesai",
            progress_jawaban: jawaban.filter(j => j !== null).length,
            pelanggaran: tabViolation,
          }),
          prefer: "return=minimal",
        });
      } catch (e) {
        console.warn("Gagal update status peserta_aktif:", e);
      }
    }

    if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
    onFinish({ ...hasilData });
  }, [jawaban, soal, siswa, ujian, onFinish, tabViolation, submitting]);

  const HURUF = ["A","B","C","D"];
  const isDanger = timeLeft <= 300;
  const dijawab = jawaban.filter(j => j !== null).length;
  const belumDijawab = soal.length - dijawab;

  // ── LOADING SCREEN saat submit ──────────────────────────────
  if (submitting) {
    return (
      <div style={{minHeight:"100vh", background:"var(--navy)", display:"flex", alignItems:"center", justifyContent:"center"}}>
        <div style={{textAlign:"center", color:"white", padding:"32px"}}>
          <div style={{fontSize:"48px", marginBottom:"16px"}}>
            {submitStatus === "queued" && "⏳"}
            {submitStatus === "saving" && "💾"}
            {submitStatus === "done" && "✅"}
            {submitStatus === "error" && "❌"}
          </div>
          <h2 style={{fontSize:"20px", fontWeight:"800", marginBottom:"8px"}}>
            {submitStatus === "queued" && "Menunggu antrian..."}
            {submitStatus === "saving" && "Menyimpan jawaban..."}
            {submitStatus === "done" && "Jawaban tersimpan!"}
            {submitStatus === "error" && "Gagal menyimpan"}
          </h2>
          <p style={{color:"rgba(255,255,255,0.6)", fontSize:"14px"}}>
            {submitStatus === "queued" && "Sedang banyak siswa submit. Harap tunggu, jawaban Anda aman."}
            {submitStatus === "saving" && "Sedang mengirim ke server..."}
            {submitStatus === "done" && "Menampilkan hasil..."}
            {submitStatus === "error" && "Jawaban tetap tercatat. Menampilkan hasil..."}
          </p>
          {submitStatus === "queued" && (
            <div style={{marginTop:"20px", background:"rgba(255,255,255,0.1)", borderRadius:"8px", padding:"12px", fontSize:"13px", color:"rgba(255,255,255,0.7)"}}>
              💡 Server sedang memproses banyak pengiriman secara bersamaan. Sistem antrian memastikan jawaban Anda tidak hilang.
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── REVIEW SCREEN ───────────────────────────────────────────
  if (showReview) {
    return (
      <div style={{minHeight:"100vh", background:"var(--light)", padding:"20px"}}>
        <div style={{maxWidth:"800px", margin:"0 auto"}}>
          <div style={{background:"var(--navy)", borderRadius:"var(--radius)", padding:"20px", marginBottom:"20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <div>
              <h2 style={{color:"white", fontSize:"18px", fontWeight:"800"}}>📋 Review Jawaban</h2>
              <p style={{color:"rgba(255,255,255,0.6)", fontSize:"13px"}}>Periksa kembali sebelum dikumpulkan</p>
            </div>
            <div className={`cbt-timer ${isDanger ? "danger" : ""}`}>⏱ {formatTime(timeLeft)}</div>
          </div>

          {belumDijawab > 0 && (
            <div style={{background:"var(--yellow3)", borderRadius:"var(--radius)", padding:"14px 18px", marginBottom:"16px", fontSize:"14px", color:"#92400e", fontWeight:"600"}}>
              ⚠️ Masih ada {belumDijawab} soal yang belum dijawab!
            </div>
          )}

          <div style={{display:"grid", gap:"10px", marginBottom:"20px"}}>
            {soal.map((s, i) => (
              <div key={i} style={{background:"white", borderRadius:"var(--radius2)", padding:"16px", border:`2px solid ${jawaban[i]===null ? "var(--red)" : "var(--border)"}`, cursor:"pointer"}} onClick={() => { setShowReview(false); setCurrent(i); }}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"12px", fontWeight:"700", color:"var(--blue)", marginBottom:"4px"}}>Soal {i+1}</div>
                    <div style={{fontSize:"14px", color:"var(--navy)", marginBottom:"8px"}}>{s.pertanyaan.length > 80 ? s.pertanyaan.slice(0,80)+"..." : s.pertanyaan}</div>
                    {jawaban[i] !== null ? (
                      <span style={{fontSize:"12px", padding:"3px 10px", borderRadius:"99px", background:"var(--blue3)", color:"var(--blue2)", fontWeight:"600"}}>
                        Jawaban: {HURUF[jawaban[i]]}. {s.opsi[jawaban[i]]}
                      </span>
                    ) : (
                      <span style={{fontSize:"12px", padding:"3px 10px", borderRadius:"99px", background:"var(--red3)", color:"var(--red2)", fontWeight:"600"}}>Belum dijawab</span>
                    )}
                  </div>
                  <div style={{fontSize:"12px", color:"var(--gray)", flexShrink:0}}>Klik untuk edit</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{display:"flex", gap:"12px"}}>
            <button className="btn btn-ghost" style={{flex:1, padding:"14px"}} onClick={() => setShowReview(false)}>← Kembali ke Soal</button>
            <button className="btn btn-green" style={{flex:1, padding:"14px", fontSize:"15px", fontWeight:"700"}} onClick={() => setShowConfirm(true)}>
              ✅ Kumpulkan Ujian
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Google Form mode - if ujian has google_form_url, show embedded form
  const isGoogleForm = !!(ujian.google_form_url);

  if (isGoogleForm && !submitting) {
    const formUrl = ujian.google_form_url.includes("viewform")
      ? ujian.google_form_url
      : ujian.google_form_url.replace(/\/edit.*$/, "/viewform");

    return (
      <div className="cbt-wrap" style={{userSelect:"none"}}>
        {/* Warning overlay tetap aktif */}
        {showWarning && (
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
            <div style={{background:"white",borderRadius:"16px",padding:"32px",maxWidth:"420px",textAlign:"center"}}>
              <div style={{fontSize:"48px",marginBottom:"12px"}}>{locked ? "🔒" : "⚠️"}</div>
              <h2 style={{fontSize:"18px",fontWeight:"800",marginBottom:"12px",color:locked?"var(--red2)":"var(--yellow)"}}>{locked ? "Ujian Dikunci" : "Peringatan"}</h2>
              <p style={{fontSize:"14px",color:"var(--gray)",marginBottom:"20px",lineHeight:"1.6"}}>{warningMsg}</p>
              {!locked && (
                <button className="btn btn-blue" style={{width:"100%",padding:"12px"}} onClick={() => { setShowWarning(false); enterFullscreen(); }}>
                  🔄 Kembali ke Ujian
                </button>
              )}
              {locked && <p style={{fontSize:"12px",color:"var(--red2)",fontWeight:"600"}}>Panggil pengawas untuk membuka kunci.</p>}
            </div>
          </div>
        )}
        <div className="cbt-header">
          <h2>📝 {ujian.mapel} — Kelas {ujian.kelas} (Google Form)</h2>
          <div className="cbt-header-info">
            <div className="cbt-student-info">👤 {siswa.nama} ({siswa.kelas})</div>
            {tabViolation > 0 && (
              <div style={{background:"rgba(239,68,68,0.3)",borderRadius:"8px",padding:"4px 10px",fontSize:"12px",color:"#fca5a5",fontWeight:"700"}}>⚠️ {tabViolation}/{MAX_VIOLATIONS}</div>
            )}
            <div
              style={{background:isFullscreen?"rgba(34,197,94,0.2)":"rgba(239,68,68,0.2)",borderRadius:"8px",padding:"4px 10px",fontSize:"12px",color:isFullscreen?"#86efac":"#fca5a5",cursor:"pointer"}}
              onClick={enterFullscreen}
            >
              {isFullscreen ? "🔒 Fullscreen" : "⚠️ Klik Fullscreen"}
            </div>
            <div className={`cbt-timer ${isDanger && !timerPaused ? "danger" : ""}`}
              style={timerPaused ? {background:"rgba(251,191,36,0.3)",color:"#fcd34d"} : {}}
            >
              {timerPaused ? "⏸ Timer Dijeda" : `⏱ ${formatTime(timeLeft)}`}
            </div>
          </div>
        </div>
        {/* Google Form embedded - full height */}
        <div style={{height:"calc(100vh - 56px)", position:"relative"}}>
          <iframe
            src={formUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{border:"none", display:"block"}}
            title="Ujian Google Form"
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
          />
          {/* Overlay transparan untuk deteksi klik keluar - halang interaction minimal */}
          {/* Informasi selesai ujian */}
          <div style={{
            position:"absolute", bottom:0, left:0, right:0,
            background:"rgba(15,23,42,0.9)", padding:"12px 20px",
            display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px"
          }}>
            <span style={{color:"rgba(255,255,255,0.8)", fontSize:"13px"}}>
              🔒 Setelah selesai mengisi Google Form, klik tombol ini untuk keluar
            </span>
            <button
              className="btn btn-green"
              style={{padding:"8px 20px", flexShrink:0}}
              onClick={() => {
                if (window.confirm("Apakah Anda sudah selesai mengerjakan ujian di Google Form?")) {
                  // Untuk Google Form, kita hanya bisa catat waktu selesai & pelanggaran
                  // Nilai tidak bisa diambil otomatis dari Google Form
                  const hasilData = {
                    nama_siswa: siswa.nama,
                    kelas: siswa.kelas,
                    mapel: ujian.mapel,
                    benar: 0,
                    total: 0,
                    nilai: 0,
                    ujian_id: ujian.id,
                    pelanggaran: tabViolation,
                    mencurigakan: tabViolation >= 2,
                    is_google_form: true,
                  };
                  if (document.exitFullscreen) document.exitFullscreen().catch(()=>{});
                  onFinish(hasilData);
                }
              }}
            >
              ✅ Selesai Ujian
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cbt-wrap" style={{userSelect:"none"}}>
      {/* Warning overlay */}
      {showWarning && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
          <div style={{background:"white",borderRadius:"16px",padding:"32px",maxWidth:"420px",textAlign:"center"}}>
            <div style={{fontSize:"48px",marginBottom:"12px"}}>{locked ? "🔒" : "⚠️"}</div>
            <h2 style={{fontSize:"18px",fontWeight:"800",marginBottom:"12px",color:locked?"var(--red2)":"var(--yellow)"}}>
              {locked ? "Ujian Dikunci" : "Peringatan"}
            </h2>
            <p style={{fontSize:"14px",color:"var(--gray)",marginBottom:"20px",lineHeight:"1.6"}}>{warningMsg}</p>
            {!locked && (
              <button className="btn btn-blue" style={{width:"100%",padding:"12px"}} onClick={() => { setShowWarning(false); enterFullscreen(); }}>
                🔄 Kembali ke Ujian
              </button>
            )}
            {locked && <p style={{fontSize:"12px",color:"var(--red2)",fontWeight:"600"}}>Panggil pengawas untuk membuka kunci.</p>}
          </div>
        </div>
      )}

      <div className="cbt-header">
        <h2>📝 {ujian.mapel} — Kelas {ujian.kelas}</h2>
        <div className="cbt-header-info">
          <div className="cbt-student-info">👤 {siswa.nama} ({siswa.kelas})</div>
          {tabViolation > 0 && (
            <div style={{background:"rgba(239,68,68,0.3)",borderRadius:"8px",padding:"4px 10px",fontSize:"12px",color:"#fca5a5",fontWeight:"700"}}>⚠️ {tabViolation}/{MAX_VIOLATIONS}</div>
          )}
          <div style={{background:isFullscreen?"rgba(34,197,94,0.2)":"rgba(239,68,68,0.2)",borderRadius:"8px",padding:"4px 10px",fontSize:"12px",color:isFullscreen?"#86efac":"#fca5a5",cursor:"pointer"}} onClick={enterFullscreen}>
            {isFullscreen ? "🔒 Fullscreen" : "⚠️ Klik Fullscreen"}
          </div>
          {wakeLockAktif && (
            <div title="Layar HP dipaksa tetap menyala selama ujian" style={{background:"rgba(59,130,246,0.2)",borderRadius:"8px",padding:"4px 10px",fontSize:"12px",color:"#93c5fd"}}>
              🔆 Layar Aktif
            </div>
          )}
          <div className={`cbt-timer ${isDanger && !timerPaused ? "danger" : ""}`}
            style={timerPaused ? {background:"rgba(251,191,36,0.3)",color:"#fcd34d"} : {}}>
            {timerPaused ? "⏸ Timer Dijeda" : `⏱ ${formatTime(timeLeft)}`}
          </div>
        </div>
      </div>

      <div className="cbt-body">
        <div className="cbt-main">
          <div className="cbt-question-card">
            <div className="cbt-q-num">Soal {current + 1} dari {soal.length}</div>
            <div className="cbt-q-text"><MathText text={soal[current].pertanyaan} /></div>
            {soal[current].gambar && (
              <div style={{margin:"12px 0 20px", borderRadius:"var(--radius2)", overflow:"hidden", border:"1px solid var(--border)", textAlign:"center", background:"var(--light)"}}>
                <img src={soal[current].gambar} alt="Gambar soal" style={{maxWidth:"100%", maxHeight:"300px", objectFit:"contain"}}
                  onError={e => e.target.style.display="none"}
                />
              </div>
            )}
            <div className="cbt-options">
              {soal[current].opsi.map((o, i) => (
                <div key={i} className={`cbt-option ${jawaban[current] === i ? "selected" : ""}`}
                  onClick={() => { if(locked) return; const j = [...jawaban]; j[current] = i; setJawaban(j); }}>
                  <div className="cbt-option-label">{HURUF[i]}</div>
                  <div className="cbt-option-text"><MathText text={o} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="cbt-nav">
            <button className="btn btn-ghost" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}>← Sebelumnya</button>
            <span style={{fontSize:"13px", color:"var(--gray)"}}>Dijawab: {dijawab}/{soal.length}</span>
            {current < soal.length - 1
              ? <button className="btn btn-blue" onClick={() => setCurrent(current + 1)}>Selanjutnya →</button>
              : <button className="btn btn-green" onClick={() => setShowReview(true)}>📋 Review & Kumpulkan</button>
            }
          </div>
        </div>

        <div className="cbt-sidebar">
          <div className="cbt-sidebar-card">
            <h3>Navigasi Soal</h3>
            <div className="cbt-num-grid">
              {soal.map((_, i) => (
                <button key={i} className={`cbt-num-btn ${jawaban[i] !== null ? "answered" : ""} ${current === i ? "current" : ""}`} onClick={() => setCurrent(i)}>{i+1}</button>
              ))}
            </div>
          </div>
          <div className="cbt-sidebar-card">
            <div className="cbt-legend">
              <span><div className="cbt-legend-dot answered"></div>Sudah dijawab</span>
              <span><div className="cbt-legend-dot"></div>Belum dijawab</span>
            </div>
          </div>
          <button className="btn btn-green" style={{width:"100%", marginBottom:"8px"}} onClick={() => setShowReview(true)} disabled={locked}>📋 Review Jawaban</button>
          <button className="btn btn-ghost" style={{width:"100%", fontSize:"12px"}} onClick={() => setShowConfirm(true)} disabled={locked}>Langsung Kumpulkan</button>
        </div>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Kumpulkan Ujian?</h2>
            <p>Dijawab: <strong>{dijawab}</strong> dari <strong>{soal.length}</strong> soal.</p>
            {belumDijawab > 0 && <p style={{color:"var(--red2)", fontSize:"13px", marginTop:"6px"}}>⚠️ {belumDijawab} soal belum dijawab — akan dianggap salah.</p>}
            {tabViolation > 0 && <p style={{color:"var(--red2)", fontSize:"13px", marginTop:"6px"}}>📋 Tercatat {tabViolation} pelanggaran.</p>}
            <div style={{display:"flex", gap:"8px", marginTop:"20px"}}>
              <button className="btn btn-green" style={{flex:1}} onClick={() => handleSubmit(false)}>✅ Ya, Kumpulkan</button>
              <button className="btn btn-ghost" style={{flex:1}} onClick={() => setShowConfirm(false)}>Kembali</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



// ============================================================
// RESULT SCREEN
// ============================================================
function ResultScreen({ result, onBack }) {
  const lulus = result.nilai >= 75;
  return (
    <div className="result-wrap">
      <div className="result-card">
        <div className="result-emoji">{lulus ? "🎉" : "💪"}</div>
        {result.is_google_form ? (
          <>
            <div style={{width:"140px",height:"140px",borderRadius:"50%",border:"8px solid var(--blue)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:"48px"}}>
              📝
            </div>
            <h2>Ujian Selesai!</h2>
            <p>{result.nama_siswa} • Kelas {result.kelas} • {result.mapel}</p>
            <div style={{background:"var(--blue3)", borderRadius:"var(--radius2)", padding:"14px", marginBottom:"20px", fontSize:"14px", color:"var(--blue2)", fontWeight:"600", textAlign:"left"}}>
              ✅ Anda telah menyelesaikan ujian via Google Form.<br/>
              <span style={{fontSize:"12px", fontWeight:"500", color:"var(--navy3)"}}>Nilai Anda akan direkap langsung oleh guru dari Google Form.</span>
            </div>
            {result.pelanggaran > 0 && (
              <div style={{background:"var(--red3)", borderRadius:"var(--radius2)", padding:"12px", marginBottom:"20px", fontSize:"13px", color:"var(--red2)", fontWeight:"600"}}>
                ⚠️ Tercatat {result.pelanggaran} pelanggaran selama ujian
              </div>
            )}
          </>
        ) : (
          <>
            <div className={`result-score-ring ${lulus ? "lulus" : "gagal"}`}>
              <div className={`result-score-val ${lulus ? "lulus" : "gagal"}`}>{result.nilai}</div>
            </div>
            <h2>{lulus ? "Selamat, Anda Lulus!" : "Tetap Semangat!"}</h2>
            <p>{result.nama_siswa} • Kelas {result.kelas} • {result.mapel}</p>
            <div className="result-stats">
              <div className="result-stat"><div className="val" style={{color:"var(--green2)"}}>{result.benar}</div><div className="lbl">Benar</div></div>
              <div className="result-stat"><div className="val" style={{color:"var(--red2)"}}>{result.total - result.benar}</div><div className="lbl">Salah</div></div>
              <div className="result-stat"><div className="val">{result.total}</div><div className="lbl">Total Soal</div></div>
            </div>
            <div style={{background: lulus ? "var(--green3)" : "var(--red3)", borderRadius:"var(--radius2)", padding:"12px", marginBottom:"20px", fontSize:"14px", color: lulus ? "var(--green2)" : "var(--red2)", fontWeight:"600"}}>
              {lulus ? "✅ Nilai Anda memenuhi KKM (75)" : "❌ Nilai belum memenuhi KKM (75) — Perlu remedi"}
            </div>
          </>
        )}
        <button className="btn btn-blue" style={{width:"100%", padding:"12px"}} onClick={onBack}>🏠 Kembali ke Halaman Utama</button>
      </div>
    </div>
  );
}
