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
const TINGKAT_KELAS = ["7", "8", "9"];
const ROMBEL_KELAS  = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
const DAFTAR_KELAS = Object.fromEntries(
  TINGKAT_KELAS.map(t => ["Kelas " + t, ROMBEL_KELAS.map(r => t + r)])
);

// Helper kelas: "7A" → tingkat "7", rombel "A". Data lama ("7", "8", "9") tetap terbaca.
function normalKelas(k) { return String(k || "").trim().toUpperCase().replace(/\s+/g, ""); }
function tingkatDari(k) { const m = normalKelas(k).match(/^(\d+)/); return m ? m[1] : ""; }
function urutKelas(a, b) {
  const ta = Number(tingkatDari(a)) || 99, tb = Number(tingkatDari(b)) || 99;
  if (ta !== tb) return ta - tb;
  return normalKelas(a).localeCompare(normalKelas(b));
}


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
// KIRIM HASIL UJIAN (instan di layar, kirim di latar belakang)
// - Siswa langsung melihat hasil begitu klik "Kumpulkan".
// - Nilai disimpan dulu di localStorage (kotak keluar), lalu dikirim ke
//   Supabase di latar belakang dengan timeout + retry otomatis.
// - Jika internet putus / tab ditutup, nilai tetap terkirim otomatis saat
//   siswa membuka aplikasi lagi atau internet kembali normal.
// ============================================================
const OUTBOX_KEY = "cbt_hasil_outbox_v1";
const kirimHasil = {
  status: "idle",            // idle | sending | done | error
  flushing: false,
  retryTimer: null,
  retryCount: 0,
  listeners: new Set(),

  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); },
  setStatus(s) { this.status = s; this.listeners.forEach(fn => { try { fn(s); } catch {} }); },
  readBox() { try { return JSON.parse(localStorage.getItem(OUTBOX_KEY) || "[]"); } catch { return []; } },
  writeBox(arr) { try { localStorage.setItem(OUTBOX_KEY, JSON.stringify(arr)); } catch {} },
  pending() { return this.readBox().length; },

  enqueue(hasil, pesertaId) {
    const box = this.readBox();
    box.push({ uid: Date.now() + "_" + Math.random().toString(36).slice(2, 8), hasil, pesertaId: pesertaId || null });
    this.writeBox(box);
    this.retryCount = 0;
    this.setStatus("sending");
    this.flush();
  },

  async flush() {
    if (this.flushing) return;
    if (this.readBox().length === 0) { if (this.status !== "idle") this.setStatus("done"); return; }
    this.flushing = true;
    clearTimeout(this.retryTimer);
    this.setStatus("sending");
    let gagal = false;
    try {
      let box = this.readBox();
      while (box.length > 0) {
        const item = box[0];
        try {
          const ctrl = new AbortController();
          const to = setTimeout(() => ctrl.abort(), 15000);
          try {
            await supabase("hasil", { method: "POST", body: JSON.stringify(item.hasil), prefer: "return=minimal", signal: ctrl.signal });
          } finally { clearTimeout(to); }
        } catch (e) {
          console.warn("Kirim hasil gagal, akan dicoba lagi:", e);
          gagal = true;
          break;
        }
        // Tandai peserta_aktif = selesai (best-effort, tidak menghambat)
        if (item.pesertaId) {
          supabase(`peserta_aktif?id=eq.${item.pesertaId}`, {
            method: "PATCH",
            body: JSON.stringify({ status: "selesai", pelanggaran: item.hasil.pelanggaran || 0 }),
            prefer: "return=minimal",
          }).catch(() => {});
        }
        box = this.readBox().filter(x => x.uid !== item.uid);
        this.writeBox(box);
      }
    } finally {
      this.flushing = false;
    }
    if (gagal) {
      this.setStatus("error");
      // coba lagi otomatis: 3 dtk, 6 dtk, 12 dtk, lalu tiap 30 dtk
      const delay = Math.min(3000 * Math.pow(2, this.retryCount), 30000);
      this.retryCount++;
      this.retryTimer = setTimeout(() => this.flush(), delay);
    } else {
      this.retryCount = 0;
      this.setStatus("done");
    }
  },
};
if (typeof window !== "undefined") {
  window.addEventListener("online", () => kirimHasil.flush());
}

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

    const jawabanIdx = typeof s.jawaban === 'number' && s.jawaban < opsi.length ? s.jawaban : 0;
    // Soal Benar/Salah (2 pilihan) dibiarkan berurutan; soal lain diacak lewat indeks
    const urutan = opsi.length <= 2
      ? opsi.map((_, i) => i)
      : shuffleArray(opsi.map((_, i) => i));
    return { ...s, opsi: urutan.map(i => opsi[i]), jawaban: urutan.indexOf(jawabanIdx) };
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
  @keyframes timerPulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.35; transform:scale(1.1); } }
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

  // Kirim ulang nilai yang belum sempat terkirim (mis. internet putus saat submit)
  useEffect(() => { if (!useDemo) kirimHasil.flush(); }, []);

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
// CIRCULAR TIMER COMPONENT
// ============================================================
function CircularTimer({ timeLeft, totalTime, paused }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, timeLeft / totalTime);
  const offset = circumference * (1 - pct);
  const isWarn   = timeLeft <= 600 && timeLeft > 300;
  const isDanger = timeLeft <= 300;
  const color = paused ? "#fcd34d" : isDanger ? "#ef4444" : isWarn ? "#f59e0b" : "#34d399";
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  return (
    <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
      <svg width={72} height={72} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={36} cy={36} r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={5} />
        <circle
          cx={36} cy={36} r={radius} fill="none"
          stroke={color} strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        lineHeight: 1,
      }}>
        {paused ? (
          <span style={{ fontSize: 18, lineHeight: 1 }}>⏸</span>
        ) : (
          <>
            <span style={{ fontSize: 13, fontWeight: 800, color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.5px" }}>{mm}:{ss}</span>
            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>menit</span>
          </>
        )}
      </div>
      {isDanger && !paused && (
        <div style={{
          position: "absolute", inset: -3, borderRadius: "50%",
          border: "2px solid #ef4444",
          animation: "timerPulse 1s infinite",
          pointerEvents: "none",
        }} />
      )}
    </div>
  );
}

// ============================================================
// NOTIFIKASI LIVE — HOOK + TOAST + SUPABASE REALTIME POLLING
// ============================================================

const NOTIF_LAST_KEY = "cbt_notif_last_id";   // id pengumuman terakhir yang sudah ditampilkan
const NOTIF_POLL_MS  = 8000;                  // cek pengumuman baru tiap 8 detik

function useNotifikasi() {
  const [notifs, setNotifs] = useState([]);
  // Pakai ref (bukan state) supaya nilai terbaru selalu terbaca oleh polling.
  // Sebelumnya nilai lastId "basi" (selalu 0) sehingga 5 pesan terakhir muncul
  // berulang tiap 4 detik, termasuk pesan yang sudah ditutup siswa.
  const lastIdRef = useRef(0);
  const seenRef   = useRef(new Set());

  useEffect(() => {
    let bc = null;
    let interval = null;
    let stop = false;
    try { lastIdRef.current = Number(localStorage.getItem(NOTIF_LAST_KEY)) || 0; } catch {}

    const tambah = (list) => {
      const baru = list.filter(n => !seenRef.current.has(n.id));
      if (baru.length === 0) return;
      baru.forEach(n => seenRef.current.add(n.id));
      baru.sort((a, b) => b.id - a.id); // terbaru di depan (yang tampil di layar)
      setNotifs(prev => [...baru, ...prev].slice(0, 10));
    };

    if (useDemo) {
      try {
        bc = new BroadcastChannel("pengumuman_channel");
        bc.onmessage = (e) => tambah([{ ...e.data, id: Date.now() + Math.random() }]);
      } catch {}
    } else {
      const poll = async () => {
        if (stop || document.hidden) return;
        try {
          const pertamaKali = lastIdRef.current === 0;
          const rows = await supabase(
            pertamaKali
              ? "pengumuman?order=id.desc&limit=1"                                  // belum pernah: ambil yang terbaru saja
              : `pengumuman?order=id.asc&limit=20&id=gt.${lastIdRef.current}`        // hanya yang BARU
          );
          if (!rows || rows.length === 0) return;
          const maxId = Math.max(...rows.map(r => Number(r.id) || 0));
          lastIdRef.current = Math.max(lastIdRef.current, maxId);
          try { localStorage.setItem(NOTIF_LAST_KEY, String(lastIdRef.current)); } catch {}

          let tampil = rows;
          if (pertamaKali) {
            // Pesan lama (> 30 menit) tidak perlu dimunculkan lagi ke siswa yang baru buka aplikasi
            tampil = rows.filter(r => {
              const t = new Date(r.created_at).getTime();
              return isFinite(t) && Date.now() - t < 30 * 60 * 1000;
            });
          }
          tambah(tampil.slice().sort((a, b) => a.id - b.id).map(r => ({
            id: r.id, pesan: r.pesan, tipe: r.tipe || "info", waktu: r.created_at,
          })));
        } catch {}
      };
      poll();
      interval = setInterval(poll, NOTIF_POLL_MS);
    }

    return () => {
      stop = true;
      if (bc) bc.close();
      if (interval) clearInterval(interval);
    };
  }, []); // eslint-disable-line

  const hapus = (id) => setNotifs(prev => prev.filter(n => n.id !== id));
  return { notifs, hapus };
}

// ── Toast notif untuk siswa saat mengerjakan ujian ──
// (tidak diubah — latar ujian sudah gelap, warna sudah oke)
function NotifToast({ notifs, hapus }) {
  if (!notifs.length) return null;
  const tipeStyle = {
    info:    { bg: "#1e40af", border: "#3b82f6", icon: "📢" },
    warning: { bg: "#92400e", border: "#f59e0b", icon: "⚠️" },
    success: { bg: "#14532d", border: "#22c55e", icon: "✅" },
    token:   { bg: "#4c1d95", border: "#a855f7", icon: "🔑" },
  };
  // Hanya SATU pesan (yang terbaru) yang tampil; sisanya antre di belakang.
  const n = notifs[0];
  const sisa = notifs.length - 1;
  const s = tipeStyle[n.tipe] || tipeStyle.info;
  return (
    <div style={{
      position: "fixed", top: "calc(env(safe-area-inset-top, 0px) + 64px)", left: 12, right: 12,
      zIndex: 9998, display: "flex", justifyContent: "center", pointerEvents: "none",
    }}>
      <div key={n.id} style={{
        pointerEvents: "all", width: "100%", maxWidth: 420,
        background: s.bg, border: `1.5px solid ${s.border}`,
        borderRadius: 12, padding: "12px 12px 12px 14px",
        display: "flex", alignItems: "flex-start", gap: 10,
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        animation: "_fadeIn 0.25s ease", color: "#fff",
      }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
        <div style={{ flex: 1, minWidth: 0, fontSize: 13, lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, fontSize: 11, opacity: 0.7, marginBottom: 2, letterSpacing: 1, textTransform: "uppercase" }}>
            Pengumuman Admin
          </div>
          <div style={{ wordBreak: "break-word" }}>{n.pesan}</div>
          {sisa > 0 && <div style={{ fontSize: 11, opacity: 0.75, marginTop: 6 }}>+{sisa} pengumuman lain menunggu</div>}
        </div>
        <button
          onClick={() => hapus(n.id)}
          aria-label="Tutup pengumuman"
          title="Tutup"
          style={{
            background: "#ef4444", border: "2px solid #fff", color: "#fff", cursor: "pointer",
            width: 32, height: 32, borderRadius: "50%", fontSize: 16, fontWeight: 800, lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0,
          }}
        >✕</button>
      </div>
    </div>
  );
}

// ── Live Chat Widget Pengumuman — pojok kanan bawah profesional ──
function NotifBanner({ notifs, hapus }) {
  const [open, setOpen] = React.useState(false);
  const [newCount, setNewCount] = React.useState(0);
  const [prevLen, setPrevLen] = React.useState(notifs.length);
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    if (notifs.length > prevLen) {
      setNewCount(c => c + (notifs.length - prevLen));
      if (open && bodyRef.current) setTimeout(() => { if(bodyRef.current) bodyRef.current.scrollTop = 0; }, 80);
    }
    setPrevLen(notifs.length);
  }, [notifs.length]); // eslint-disable-line

  const tipeConfig = {
    info:    { bg: "#eff6ff", border: "#93c5fd", accent: "#1d4ed8", label: "Pengumuman", icon: "📢", dot: "#3b82f6" },
    warning: { bg: "#fffbeb", border: "#fcd34d", accent: "#b45309", label: "Peringatan", icon: "⚠️", dot: "#f59e0b" },
    success: { bg: "#f0fdf4", border: "#86efac", accent: "#15803d", label: "Info Penting", icon: "✅", dot: "#22c55e" },
    token:   { bg: "#faf5ff", border: "#d8b4fe", accent: "#7e22ce", label: "Token Ujian", icon: "🔑", dot: "#a855f7" },
  };

  return (
    <>
      <style>{`
        @keyframes _chatSlideIn { from{opacity:0;transform:translateY(14px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes _msgIn { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes _badgePop { 0%{transform:scale(1)} 45%{transform:scale(1.45)} 100%{transform:scale(1)} }
        .nc-fab:hover { transform:scale(1.08) !important; box-shadow:0 8px 30px rgba(30,58,138,0.42) !important; }
        .nc-fab:active { transform:scale(0.95) !important; }
        .nc-x { opacity:1; }
      `}</style>
      <div style={{ position:"fixed", bottom:16, right:16, zIndex:9990, display:"flex", flexDirection:"column", alignItems:"flex-end", gap:10, pointerEvents:"none" }}>
        {open && (
          <div style={{
            pointerEvents:"all", width:"min(340px, calc(100vw - 32px))", background:"#fff", borderRadius:20,
            boxShadow:"0 12px 52px rgba(15,23,42,0.22), 0 2px 8px rgba(15,23,42,0.07)",
            border:"1px solid #e2e8f0", display:"flex", flexDirection:"column",
            overflow:"hidden", animation:"_chatSlideIn 0.26s cubic-bezier(.34,1.4,.64,1)", maxHeight:460,
          }}>
            <div style={{ background:"linear-gradient(135deg,#1e40af 0%,#1e3a8a 100%)", padding:"13px 16px", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
              <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0, border:"2px solid rgba(255,255,255,0.28)" }}>📡</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ color:"#fff", fontWeight:800, fontSize:14, lineHeight:1.2 }}>Pengumuman Admin</div>
                <div style={{ color:"rgba(255,255,255,0.6)", fontSize:11, marginTop:2, display:"flex", alignItems:"center", gap:5 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/>
                  {notifs.length > 0 ? `${notifs.length} pesan` : "Belum ada pesan"}
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{ background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", cursor:"pointer", width:30, height:30, borderRadius:"50%", fontSize:15, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.28)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}>✕</button>
            </div>
            <div ref={bodyRef} style={{ flex:1, overflowY:"auto", padding:"10px 12px", display:"flex", flexDirection:"column", gap:8, minHeight:80, scrollbarWidth:"thin", scrollbarColor:"#cbd5e1 transparent" }}>
              {notifs.length === 0 ? (
                <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"28px 0", color:"#94a3b8" }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
                  <div style={{ fontSize:13, fontWeight:600 }}>Belum ada pengumuman</div>
                  <div style={{ fontSize:11, marginTop:4, color:"#cbd5e1" }}>Pesan baru muncul otomatis</div>
                </div>
              ) : (
                notifs.map((n, idx) => {
                  const s = tipeConfig[n.tipe] || tipeConfig.info;
                  return (
                    <div key={n.id} className="nc-msg" style={{ background:s.bg, border:`1.5px solid ${s.border}`, borderRadius:12, padding:"10px 12px", display:"flex", gap:9, alignItems:"flex-start", animation:`_msgIn 0.2s ease ${Math.min(idx,3)*0.04}s both` }}>
                      <div style={{ width:28, height:28, borderRadius:"50%", background:`${s.dot}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0, marginTop:1, border:`1px solid ${s.border}` }}>{s.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:9, fontWeight:800, color:s.accent, letterSpacing:1.2, textTransform:"uppercase", marginBottom:3 }}>{s.label}</div>
                        <div style={{ fontSize:12.5, color:"#1e293b", fontWeight:600, lineHeight:1.5, wordBreak:"break-word" }}>{n.pesan}</div>
                        {n.waktu && <div style={{ fontSize:10, color:"#94a3b8", marginTop:5, display:"flex", alignItems:"center", gap:4 }}><span>🕐</span>{new Date(n.waktu).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}</div>}
                      </div>
                      <button className="nc-x" onClick={() => hapus(n.id)} aria-label="Hapus pesan" title="Hapus" style={{ background:"#ef4444", border:"none", color:"#fff", cursor:"pointer", width:26, height:26, borderRadius:"50%", fontSize:13, fontWeight:800, padding:0, lineHeight:1, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
                    </div>
                  );
                })
              )}
            </div>
            <div style={{ borderTop:"1px solid #f1f5f9", padding:"8px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <div style={{ fontSize:10, color:"#94a3b8", display:"flex", alignItems:"center", gap:4 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/>
                Live · pesan baru muncul otomatis
              </div>
              {notifs.length > 0 && <button onClick={() => notifs.forEach(n => hapus(n.id))} style={{ fontSize:10, color:"#94a3b8", background:"none", border:"none", cursor:"pointer", fontWeight:700, padding:0 }} onMouseEnter={e=>e.currentTarget.style.color="#ef4444"} onMouseLeave={e=>e.currentTarget.style.color="#94a3b8"}>Hapus semua</button>}
            </div>
          </div>
        )}
        <button className="nc-fab" onClick={() => { setOpen(v => !v); if(!open) setNewCount(0); }} style={{ pointerEvents:"all", width:54, height:54, borderRadius:"50%", background:"linear-gradient(135deg,#1e40af,#1e3a8a)", border:"none", cursor:"pointer", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 20px rgba(30,58,138,0.42)", position:"relative", flexShrink:0, transition:"all 0.22s cubic-bezier(.34,1.4,.64,1)", fontSize:22 }} title={open ? "Tutup pengumuman" : "Pengumuman Admin"}>
          {open ? "✕" : "📡"}
          {!open && newCount > 0 && <span style={{ position:"absolute", top:-3, right:-3, background:"#ef4444", color:"#fff", borderRadius:"50%", width:20, height:20, fontSize:10, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", border:"2.5px solid #fff", animation:"_badgePop 0.35s ease" }}>{newCount > 9 ? "9+" : newCount}</span>}
        </button>
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
  const { notifs: loginNotifs, hapus: hapusLoginNotif } = useNotifikasi();

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
          {/* Notifikasi dari admin */}
          {loginNotifs.length > 0 && (
            <div style={{ width: "100%", maxWidth: 440, marginTop: 8 }}>
              <NotifBanner notifs={loginNotifs} hapus={hapusLoginNotif} />
            </div>
          )}
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
    { id: "dashboard",    icon: "📊", label: "Dashboard" },
    { id: "ujian",        icon: "📋", label: "Kelola Ujian" },
    { id: "soal",         icon: "✏️", label: "Buat Soal" },
    { id: "monitor",      icon: "🖥️", label: "Monitor Ujian" },
    { id: "hasil",        icon: "📈", label: "Hasil Ujian" },
    { id: "pengumuman",   icon: "📡", label: "Pengumuman" },
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
            {page === "dashboard"  && <DashboardPage ujianList={ujianList} hasilList={hasilList} />}
            {page === "ujian"      && <UjianPage ujianList={ujianList} onRefresh={loadData} />}
            {page === "soal"       && <SoalPage ujianList={ujianList} onRefresh={loadData} />}
            {page === "monitor"    && <MonitorPage ujianList={ujianList} />}
            {page === "hasil"      && <HasilPage hasilList={hasilList} ujianList={ujianList} />}
            {page === "pengumuman" && <NotifikasiPage />}
          </>
        )}
      </div>
    </div>
  );
}

// ---- Dashboard Overview ----
function DashboardPage({ ujianList, hasilList }) {
  const rataRata   = hasilList.length ? Math.round(hasilList.reduce((a,h) => a + (h.nilai||0), 0) / hasilList.length) : 0;
  const ujianAktif = ujianList.filter(u => u.aktif).length;
  const lulus      = hasilList.filter(h => h.nilai >= 75).length;
  const pctLulus   = hasilList.length ? Math.round((lulus / hasilList.length) * 100) : 0;

  // Distribusi nilai: 0-49, 50-59, 60-69, 70-79, 80-89, 90-100
  const buckets = [
    { label:"0–49",  min:0,  max:49  },
    { label:"50–59", min:50, max:59  },
    { label:"60–69", min:60, max:69  },
    { label:"70–79", min:70, max:79  },
    { label:"80–89", min:80, max:89  },
    { label:"90–100",min:90, max:100 },
  ].map(b => ({
    ...b,
    count: hasilList.filter(h => (h.nilai||0) >= b.min && (h.nilai||0) <= b.max).length,
  }));
  const maxCount = Math.max(1, ...buckets.map(b => b.count));

  const stats = [
    { icon:"📋", label:"Total Ujian",    val: ujianList.length, bg:"#dbeafe", color:"#1d4ed8", sub:`${ujianAktif} aktif sekarang` },
    { icon:"✅", label:"Ujian Aktif",    val: ujianAktif,       bg:"#dcfce7", color:"#15803d", sub:"sedang berlangsung" },
    { icon:"👥", label:"Total Peserta",  val: hasilList.length, bg:"#fef3c7", color:"#b45309", sub:`${lulus} siswa lulus` },
    { icon:"⭐", label:"Rata-rata Nilai", val: rataRata,        bg:"#f3e8ff", color:"#6d28d9", sub:`${pctLulus}% di atas KKM` },
  ];

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Ringkasan aktivitas ujian — {new Date().toLocaleDateString("id-ID",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:24}}>
        {stats.map((s,i) => (
          <div key={i} style={{background:"#fff", borderRadius:16, padding:"20px 20px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0", display:"flex", flexDirection:"column", gap:6}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
              <div style={{width:44, height:44, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22}}>{s.icon}</div>
              <div style={{fontSize:28, fontWeight:900, color:s.color, fontVariantNumeric:"tabular-nums"}}>{s.val}</div>
            </div>
            <div style={{fontSize:13, fontWeight:700, color:"#1e293b", marginTop:4}}>{s.label}</div>
            <div style={{fontSize:11, color:"#94a3b8"}}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24}}>
        {/* ── Bar Chart Distribusi Nilai ── */}
        <div style={{background:"#fff", borderRadius:16, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0"}}>
          <h3 style={{fontSize:14, fontWeight:700, color:"#1e293b", marginBottom:4}}>📊 Distribusi Nilai</h3>
          <p style={{fontSize:11, color:"#94a3b8", marginBottom:16}}>Sebaran nilai semua ujian</p>
          {hasilList.length === 0 ? (
            <div style={{textAlign:"center", padding:"24px 0", color:"#cbd5e1", fontSize:13}}>Belum ada data</div>
          ) : (
            <div style={{display:"flex", alignItems:"flex-end", gap:8, height:120}}>
              {buckets.map((b,i) => {
                const h = Math.max(4, Math.round((b.count / maxCount) * 100));
                const isLulus = b.min >= 75;
                return (
                  <div key={i} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4}}>
                    <div style={{fontSize:10, fontWeight:700, color: b.count > 0 ? (isLulus?"#15803d":"#b45309") : "#cbd5e1"}}>{b.count}</div>
                    <div style={{
                      width:"100%", height:`${h}%`,
                      background: isLulus ? "linear-gradient(180deg,#22c55e,#15803d)" : "linear-gradient(180deg,#f59e0b,#b45309)",
                      borderRadius:"6px 6px 3px 3px",
                      transition:"height 0.5s ease",
                      minHeight: 4,
                    }} />
                    <div style={{fontSize:9, color:"#94a3b8", textAlign:"center", lineHeight:1.2}}>{b.label}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{display:"flex", gap:12, marginTop:12}}>
            <div style={{display:"flex", alignItems:"center", gap:4, fontSize:10, color:"#64748b"}}>
              <div style={{width:10,height:10,borderRadius:2,background:"#22c55e"}}/>Lulus (≥75)
            </div>
            <div style={{display:"flex", alignItems:"center", gap:4, fontSize:10, color:"#64748b"}}>
              <div style={{width:10,height:10,borderRadius:2,background:"#f59e0b"}}/>Remedi
            </div>
          </div>
        </div>

        {/* ── Progress Lulus ── */}
        <div style={{background:"#fff", borderRadius:16, padding:20, boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
          <div>
            <h3 style={{fontSize:14, fontWeight:700, color:"#1e293b", marginBottom:4}}>🎯 Tingkat Kelulusan</h3>
            <p style={{fontSize:11, color:"#94a3b8", marginBottom:20}}>Persentase siswa melampaui KKM (75)</p>
          </div>
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <div style={{position:"relative", width:110, height:110}}>
              <svg width={110} height={110} style={{transform:"rotate(-90deg)"}}>
                <circle cx={55} cy={55} r={44} fill="none" stroke="#f1f5f9" strokeWidth={10}/>
                <circle cx={55} cy={55} r={44} fill="none"
                  stroke={pctLulus >= 70 ? "#22c55e" : pctLulus >= 50 ? "#f59e0b" : "#ef4444"}
                  strokeWidth={10} strokeLinecap="round"
                  strokeDasharray={2*Math.PI*44}
                  strokeDashoffset={2*Math.PI*44*(1-pctLulus/100)}
                  style={{transition:"stroke-dashoffset 1s ease"}}
                />
              </svg>
              <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:24,fontWeight:900,color:"#1e293b"}}>{pctLulus}%</span>
                <span style={{fontSize:10,color:"#94a3b8"}}>Lulus</span>
              </div>
            </div>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:16}}>
            <div style={{background:"#f0fdf4", borderRadius:10, padding:"10px 12px", textAlign:"center"}}>
              <div style={{fontSize:18, fontWeight:800, color:"#15803d"}}>{lulus}</div>
              <div style={{fontSize:10, color:"#64748b"}}>Lulus</div>
            </div>
            <div style={{background:"#fff7ed", borderRadius:10, padding:"10px 12px", textAlign:"center"}}>
              <div style={{fontSize:18, fontWeight:800, color:"#b45309"}}>{hasilList.length - lulus}</div>
              <div style={{fontSize:10, color:"#64748b"}}>Remedi</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hasil Terbaru ── */}
      <div className="card">
        <div className="card-header"><h2>📝 Hasil Ujian Terbaru</h2></div>
        {hasilList.length === 0 ? (
          <div className="empty-state"><div className="icon">📭</div><p>Belum ada hasil ujian</p></div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Nama</th><th>Kelas</th><th>Mata Pelajaran</th><th>Nilai</th><th>Status</th></tr></thead>
              <tbody>
                {hasilList.slice(0,10).map((h,i) => (
                  <tr key={i} style={{background: i%2===0?"#fff":"#f8fafc"}}>
                    <td style={{color:"#94a3b8",fontSize:12}}>{i+1}</td>
                    <td><strong>{h.nama_siswa}</strong></td>
                    <td>{h.kelas}</td>
                    <td>{h.mapel}</td>
                    <td>
                      <div style={{display:"flex", alignItems:"center", gap:6}}>
                        <div style={{width:36, height:6, borderRadius:3, background:"#f1f5f9", overflow:"hidden"}}>
                          <div style={{width:`${Math.min(100,h.nilai||0)}%`, height:"100%", background: (h.nilai||0)>=75?"#22c55e":"#f59e0b"}}/>
                        </div>
                        <strong style={{fontFamily:"var(--mono)"}}>{h.nilai}</strong>
                      </div>
                    </td>
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

// ---- Kirim Notifikasi (Admin → Siswa) ----
function NotifikasiPage() {
  const [pesan, setPesan] = useState("");
  const [tipe, setTipe] = useState("info");
  const [riwayat, setRiwayat] = useState([]);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmHapusSemua, setConfirmHapusSemua] = useState(false);
  const [hapusSuaLoading, setHapusSuaLoading] = useState(false);

  useEffect(() => {
    if (!useDemo) {
      supabase("pengumuman?order=id.desc&limit=20")
        .then(rows => setRiwayat(rows || []))
        .catch(() => {});
    }
  }, [sent]);

  const handleKirim = async () => {
    if (!pesan.trim()) return;
    setSending(true);
    const newMsg = { id: Date.now(), pesan: pesan.trim(), tipe, created_at: new Date().toISOString() };
    if (useDemo) {
      try {
        const bc = new BroadcastChannel("pengumuman_channel");
        bc.postMessage(newMsg);
        bc.close();
      } catch {}
      setRiwayat(prev => [newMsg, ...prev]);
    } else {
      try {
        await supabase("pengumuman", {
          method: "POST",
          body: JSON.stringify({ pesan: pesan.trim(), tipe }),
        });
        setSent(v => !v);
      } catch (e) {
        alert("Gagal kirim: " + e.message);
      }
    }
    setPesan("");
    setSending(false);
  };

  const handleHapus = async (id) => {
    setDeletingId(id);
    if (useDemo) {
      setRiwayat(prev => prev.filter(r => r.id !== id));
    } else {
      try {
        await supabase(`pengumuman?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" });
        setRiwayat(prev => prev.filter(r => r.id !== id));
      } catch (e) {
        alert("Gagal hapus: " + e.message);
      }
    }
    setDeletingId(null);
  };

  const handleHapusSemua = async () => {
    setHapusSuaLoading(true);
    if (useDemo) {
      setRiwayat([]);
    } else {
      try {
        // Hapus semua pengumuman yang ada di riwayat saat ini
        const ids = riwayat.map(r => r.id);
        await supabase(`pengumuman?id=in.(${ids.join(",")})`, { method: "DELETE", prefer: "return=minimal" });
        setRiwayat([]);
      } catch (e) {
        alert("Gagal hapus semua: " + e.message);
      }
    }
    setHapusSuaLoading(false);
    setConfirmHapusSemua(false);
  };

  const tipeOpts = [
    { val:"info",    label:"📢 Info",      desc:"Pengumuman umum" },
    { val:"token",   label:"🔑 Token",     desc:"Kode/token ujian" },
    { val:"warning", label:"⚠️ Peringatan", desc:"Peringatan penting" },
    { val:"success", label:"✅ Sukses",     desc:"Pemberitahuan positif" },
  ];
  const tipeColor = { info:"#3b82f6", warning:"#f59e0b", success:"#22c55e", token:"#a855f7" };
  const tipeIcon  = { info:"📢", warning:"⚠️", success:"✅", token:"🔑" };

  return (
    <>
      <div className="page-header">
        <h1>📡 Kirim Pengumuman</h1>
        <p>Pesan akan muncul otomatis di layar semua siswa dalam hitungan detik</p>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, alignItems:"start"}}>
        {/* Form kirim */}
        <div style={{background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0"}}>
          <h3 style={{fontSize:15, fontWeight:700, marginBottom:16, color:"#1e293b"}}>✉️ Pesan Baru</h3>

          <div style={{marginBottom:14}}>
            <label style={{display:"block", fontSize:11, fontWeight:700, color:"#64748b", letterSpacing:1, textTransform:"uppercase", marginBottom:8}}>Jenis Pesan</label>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
              {tipeOpts.map(t => (
                <button key={t.val} onClick={() => setTipe(t.val)} style={{
                  padding:"10px 12px", borderRadius:10, border:`2px solid ${tipe===t.val ? tipeColor[t.val] : "#e2e8f0"}`,
                  background: tipe===t.val ? `${tipeColor[t.val]}18` : "#f8fafc",
                  cursor:"pointer", textAlign:"left", transition:"all 0.15s",
                }}>
                  <div style={{fontSize:13, fontWeight:700, color: tipe===t.val ? tipeColor[t.val] : "#475569"}}>{t.label}</div>
                  <div style={{fontSize:10, color:"#94a3b8", marginTop:2}}>{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{display:"block", fontSize:11, fontWeight:700, color:"#64748b", letterSpacing:1, textTransform:"uppercase", marginBottom:8}}>Isi Pesan</label>
            <textarea
              value={pesan}
              onChange={e => setPesan(e.target.value)}
              placeholder={tipe==="token" ? "Contoh: Token ujian IPA: XYZ123" : "Ketik pengumuman untuk siswa..."}
              rows={4}
              style={{width:"100%", padding:"10px 14px", border:"1.5px solid #e2e8f0", borderRadius:10, fontSize:14, outline:"none", resize:"vertical", fontFamily:"inherit", color:"#1e293b", boxSizing:"border-box"}}
            />
          </div>

          {/* Preview */}
          {pesan.trim() && (
            <div style={{
              background: `${tipeColor[tipe]}15`, border:`1.5px solid ${tipeColor[tipe]}`,
              borderRadius:10, padding:"10px 14px", marginBottom:16,
              display:"flex", alignItems:"center", gap:8, fontSize:13,
            }}>
              <span style={{fontSize:18}}>{tipeIcon[tipe]}</span>
              <div>
                <div style={{fontSize:9, fontWeight:700, color:tipeColor[tipe], textTransform:"uppercase", letterSpacing:1}}>Preview — tampilan di layar siswa</div>
                <div style={{color:"#1e293b", marginTop:2}}>{pesan}</div>
              </div>
            </div>
          )}

          <button
            onClick={handleKirim}
            disabled={sending || !pesan.trim()}
            style={{
              width:"100%", padding:"12px", borderRadius:10,
              background: pesan.trim() ? `linear-gradient(135deg,${tipeColor[tipe]},${tipeColor[tipe]}cc)` : "#e2e8f0",
              border:"none", color: pesan.trim() ? "#fff" : "#94a3b8",
              fontSize:14, fontWeight:700, cursor: pesan.trim() ? "pointer" : "not-allowed",
              transition:"all 0.15s", letterSpacing:0.5,
            }}
          >
            {sending ? "⏳ Mengirim..." : `📡 Kirim ke Semua Siswa`}
          </button>
          <p style={{fontSize:11, color:"#94a3b8", textAlign:"center", marginTop:10}}>
            Pesan akan muncul otomatis di layar login dan layar ujian siswa
          </p>
        </div>

        {/* Riwayat */}
        <div style={{background:"#fff", borderRadius:16, padding:24, boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0"}}>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16}}>
            <h3 style={{fontSize:15, fontWeight:700, color:"#1e293b", margin:0}}>🕓 Riwayat Pengumuman</h3>
            {riwayat.length > 0 && (
              <button
                onClick={() => setConfirmHapusSemua(true)}
                style={{
                  padding:"5px 12px", borderRadius:8, border:"1.5px solid #fca5a5",
                  background:"#fff1f2", color:"#ef4444", fontSize:12, fontWeight:700,
                  cursor:"pointer", display:"flex", alignItems:"center", gap:5,
                }}
              >
                🗑️ Hapus Semua
              </button>
            )}
          </div>

          {/* Konfirmasi hapus semua */}
          {confirmHapusSemua && (
            <div style={{background:"#fff1f2", border:"1.5px solid #fca5a5", borderRadius:10, padding:"12px 14px", marginBottom:14}}>
              <p style={{fontSize:13, color:"#991b1b", fontWeight:600, margin:"0 0 10px"}}>
                ⚠️ Hapus semua {riwayat.length} riwayat pengumuman? Tindakan ini tidak bisa dibatalkan.
              </p>
              <div style={{display:"flex", gap:8}}>
                <button
                  onClick={handleHapusSemua}
                  disabled={hapusSuaLoading}
                  style={{padding:"7px 16px", borderRadius:8, border:"none", background:"#ef4444", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer"}}
                >
                  {hapusSuaLoading ? "Menghapus..." : "Ya, Hapus Semua"}
                </button>
                <button
                  onClick={() => setConfirmHapusSemua(false)}
                  style={{padding:"7px 16px", borderRadius:8, border:"1.5px solid #e2e8f0", background:"#fff", color:"#475569", fontSize:13, fontWeight:700, cursor:"pointer"}}
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          {riwayat.length === 0 ? (
            <div style={{textAlign:"center", padding:"32px 0", color:"#cbd5e1"}}>
              <div style={{fontSize:32, marginBottom:8}}>📭</div>
              <div style={{fontSize:13}}>Belum ada pengumuman dikirim</div>
            </div>
          ) : (
            <div style={{display:"flex", flexDirection:"column", gap:8, maxHeight:420, overflowY:"auto"}}>
              {riwayat.map((r,i) => (
                <div key={i} style={{
                  padding:"10px 14px", borderRadius:10, border:"1px solid #f1f5f9",
                  background:"#f8fafc", display:"flex", gap:10, alignItems:"flex-start",
                  opacity: deletingId === r.id ? 0.5 : 1, transition:"opacity 0.2s",
                }}>
                  <span style={{fontSize:18, flexShrink:0}}>{tipeIcon[r.tipe] || "📢"}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, color:"#1e293b", fontWeight:500}}>{r.pesan}</div>
                    <div style={{fontSize:10, color:"#94a3b8", marginTop:4}}>
                      {new Date(r.created_at).toLocaleString("id-ID",{hour:"2-digit",minute:"2-digit",day:"numeric",month:"short"})}
                    </div>
                  </div>
                  <div style={{display:"flex", alignItems:"center", gap:8, flexShrink:0}}>
                    <span style={{
                      fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:99,
                      background:`${tipeColor[r.tipe]||tipeColor.info}20`,
                      color: tipeColor[r.tipe] || tipeColor.info,
                      textTransform:"uppercase", letterSpacing:0.5,
                    }}>{r.tipe}</span>
                    <button
                      onClick={() => handleHapus(r.id)}
                      disabled={deletingId === r.id}
                      title="Hapus pengumuman ini"
                      style={{
                        width:26, height:26, borderRadius:6, border:"1.5px solid #fca5a5",
                        background:"#fff1f2", color:"#ef4444", fontSize:13, fontWeight:700,
                        cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                        flexShrink:0, lineHeight:1,
                      }}
                    >
                      {deletingId === r.id ? "…" : "✕"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Info setup Supabase */}
      {!useDemo && (
        <div style={{background:"#f0f9ff", border:"1.5px solid #bae6fd", borderRadius:12, padding:"14px 18px", marginTop:20, fontSize:13, color:"#0369a1"}}>
          💡 <strong>Setup Supabase:</strong> Buat tabel <code style={{background:"#e0f2fe", padding:"1px 6px", borderRadius:4}}>pengumuman</code> dengan kolom: <code>id</code> (serial), <code>pesan</code> (text), <code>tipe</code> (text, default: info), <code>created_at</code> (timestamptz, default: now()). Aktifkan Row Level Security → Allow All untuk anon.
        </div>
      )}
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

// ============================================================
// TEMPLATE SOAL (Excel & Word) — file .xlsx/.docx disimpan sebagai base64
// Kolom: No | Soal | A | B | C | D | Kunci Jawaban (A/B/C/D)
// ============================================================
const TEMPLATE_XLSX_B64 = "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";
const TEMPLATE_DOCX_B64 = "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";

function downloadTemplateSoal(jenis) {
  const isXlsx = jenis === "xlsx";
  const b64 = isXlsx ? TEMPLATE_XLSX_B64 : TEMPLATE_DOCX_B64;
  const mime = isXlsx
    ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([bytes], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "Template_Soal_Ujian." + (isXlsx ? "xlsx" : "docx");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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
            setUploadStatus("❌ Tidak ada soal yang terbaca. Pastikan memakai template dan kolom Kunci Jawaban diisi A/B/C/D." + (parsed.dilewati ? ` (${parsed.dilewati} baris dilewati karena kunci/opsi tidak lengkap)` : ""));
          } else {
            setPreviewSoal(parsed);
            setUploadStatus(`✅ Berhasil membaca ${parsed.length} soal.${parsed.dilewati ? ` (${parsed.dilewati} baris dilewati: kunci jawaban/opsi tidak lengkap)` : ""} Cek preview lalu klik Import.`);
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
  // Prioritas: baca TABEL (template No | Soal | A | B | C | D | Kunci).
  // Cadangan: format teks lama "1. Soal / A. / B. / C. / D. / Jawaban: B".
  const parseWord = (file) => {
    setUploadStatus("⏳ Membaca file Word...");
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (!window.mammoth) {
          setUploadStatus("❌ Library Word belum siap. Refresh halaman dan coba lagi.");
          return;
        }
        const selesai = (parsed) => {
          if (parsed.length === 0) {
            setUploadStatus("❌ Tidak ada soal yang terbaca. Pastikan memakai template (tabel) dan kolom Kunci Jawaban diisi A/B/C/D.");
          } else {
            setPreviewSoal(parsed);
            setUploadStatus(`✅ Berhasil membaca ${parsed.length} soal.${parsed.dilewati ? ` (${parsed.dilewati} baris dilewati: kunci jawaban/opsi tidak lengkap)` : ""} Cek preview lalu klik Import.`);
          }
        };
        const buf = e.target.result;
        window.mammoth.convertToHtml({ arrayBuffer: buf })
          .then(res => {
            const doc = new DOMParser().parseFromString(res.value, "text/html");
            const rows = [];
            doc.querySelectorAll("table tr").forEach(tr => {
              rows.push(Array.from(tr.querySelectorAll("th,td")).map(td => {
                const ps = Array.from(td.querySelectorAll("p")).map(p => p.textContent.trim()).filter(Boolean);
                return ps.length ? ps.join(" ") : td.textContent.trim();
              }));
            });
            const dariTabel = rows.length ? parseRowsToSoal(rows) : [];
            if (dariTabel.length > 0 || dariTabel.dilewati > 0) {
              selesai(dariTabel);
            } else {
              // cadangan: format teks lama
              return window.mammoth.extractRawText({ arrayBuffer: buf })
                .then(r => selesai(parseTextToSoal(r.value)));
            }
          })
          .catch(err => setUploadStatus("❌ Gagal membaca file: " + err.message));
      } catch(err) {
        setUploadStatus("❌ Gagal membaca file: " + err.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Parse baris (Excel / tabel Word) → array soal
  // Format template: No | Soal | A | B | C | D | Kunci Jawaban (A/B/C/D)
  // Kolom dikenali dari judulnya. Format lama (tanpa kolom No) tetap didukung:
  //   Pertanyaan | Opsi A | Opsi B | Opsi C | Opsi D | Jawaban
  const parseRowsToSoal = (rows) => {
    const hasil = [];
    hasil.dilewati = 0;
    const norm = (v) => String(v ?? "").trim().toLowerCase();

    // Cari baris judul (maks. 5 baris pertama)
    let hdrIdx = -1;
    for (let i = 0; i < Math.min(rows.length, 5); i++) {
      const cells = (rows[i] || []).map(norm);
      const adaSoal = cells.some(c => c === "soal" || c === "pertanyaan");
      const adaKunci = cells.some(c => c.includes("kunci") || c === "jawaban");
      if (adaSoal && adaKunci) { hdrIdx = i; break; }
    }

    // Peta kolom
    let col = { soal: 0, a: 1, b: 2, c: 3, d: 4, kunci: 5 }; // format lama
    let mulai = 1;
    if (hdrIdx >= 0) {
      const h = (rows[hdrIdx] || []).map(norm);
      const cari = (fn) => h.findIndex(fn);
      const peta = {
        soal:  cari(c => c === "soal" || c === "pertanyaan"),
        a:     cari(c => c === "a" || c === "opsi a" || c === "pilihan a"),
        b:     cari(c => c === "b" || c === "opsi b" || c === "pilihan b"),
        c:     cari(c => c === "c" || c === "opsi c" || c === "pilihan c"),
        d:     cari(c => c === "d" || c === "opsi d" || c === "pilihan d"),
        kunci: cari(c => c.includes("kunci") || c === "jawaban"),
      };
      if (Object.values(peta).every(v => v >= 0)) col = peta;
      mulai = hdrIdx + 1;
    }

    for (let i = mulai; i < rows.length; i++) {
      const row = rows[i] || [];
      const get = (k) => String(row[col[k]] ?? "").trim();
      const pertanyaan = get("soal");
      const opsi = [get("a"), get("b"), get("c"), get("d")];
      const jwbRaw = get("kunci").toUpperCase().replace(/[^A-D]/g, "").charAt(0);

      // Baris kosong (template belum diisi) → lewati tanpa peringatan
      if (!pertanyaan && opsi.every(o => !o)) continue;

      const jawaban = ["A","B","C","D"].indexOf(jwbRaw);
      // Buang opsi kosong di belakang: C & D kosong → soal Benar/Salah (hanya A dan B)
      while (opsi.length > 2 && !opsi[opsi.length - 1]) opsi.pop();
      const jumlahOpsi = opsi.filter(Boolean).length;
      if (!pertanyaan || jumlahOpsi < 2 || jawaban < 0 || !opsi[jawaban]) {
        hasil.dilewati++;
        continue;
      }
      hasil.push({
        id: Date.now() + i,
        pertanyaan,
        opsi: opsi.map(o => o || "-"),   // opsi kosong di tengah (jarang) diberi "-"
        jawaban,
      });
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
      if (lines.length < 3) continue;
      const pertanyaan = lines[0].replace(/^\d+[\.\)]\s*/, "").trim();
      const opsi = [];
      let jawaban = 0;
      for (let i = 1; i < lines.length; i++) {
        const match = lines[i].match(/^([A-D])[\.\)]\s*(.+)/i);
        if (match) opsi.push(match[2].trim());
        const jwbMatch = lines[i].match(/^[Jj]awaban\s*:\s*([A-D])/i);
        if (jwbMatch) jawaban = ["A","B","C","D"].indexOf(jwbMatch[1].toUpperCase());
      }
      if (pertanyaan && opsi.length >= 2 && jawaban < opsi.length) {
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

      {/* ── DOWNLOAD TEMPLATE: selalu tampil, tidak perlu pilih ujian dulu ── */}
      <div className="card" style={{borderLeft:"4px solid var(--green)"}}>
        <div className="card-header"><h2>📥 Download Template Soal</h2></div>
        <div style={{fontSize:"13px", color:"var(--gray)", lineHeight:"1.6", marginBottom:"14px"}}>
          Guru dapat mengunduh template, mengisi soal di komputer (kolom <strong>No, Soal, A, B, C, D, Kunci Jawaban</strong>),
          lalu mengupload kembali lewat tab <strong>Upload Excel</strong> atau <strong>Upload Word</strong> setelah memilih ujian.
        </div>
        <div style={{display:"flex", gap:"10px", flexWrap:"wrap"}}>
          <button type="button" className="btn btn-green" onClick={() => downloadTemplateSoal("xlsx")}>📊 Download Template Excel (.xlsx)</button>
          <button type="button" className="btn btn-blue" onClick={() => downloadTemplateSoal("docx")}>📄 Download Template Word (.docx)</button>
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
              <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px"}}>
                <button type="button" className={`btn ${form.opsi.length === 4 ? "btn-blue" : "btn-ghost"}`} style={{padding:"7px 14px", fontSize:"13px"}}
                  onClick={() => setForm(p => ({...p, opsi: [...p.opsi, "", "", "", ""].slice(0, 4).map((o, i) => p.opsi[i] ?? "")}))}>
                  Pilihan Ganda (A–D)
                </button>
                <button type="button" className={`btn ${form.opsi.length === 2 ? "btn-blue" : "btn-ghost"}`} style={{padding:"7px 14px", fontSize:"13px"}}
                  onClick={() => setForm(p => ({...p, opsi: p.opsi.slice(0, 2), jawaban: p.jawaban > 1 ? 0 : p.jawaban}))}>
                  Benar / Salah (A–B saja)
                </button>
                {form.opsi.length === 2 && (
                  <button type="button" className="btn btn-ghost" style={{padding:"7px 14px", fontSize:"13px"}}
                    onClick={() => setForm(p => ({...p, opsi: ["Benar", "Salah"]}))}>
                    Isi otomatis "Benar" & "Salah"
                  </button>
                )}
              </div>
              {form.opsi.map((_, i) => { const h = HURUF[i]; return (
                <div key={i} className={`option-row ${form.jawaban === i ? "correct" : ""}`}>
                  <div className="option-label">{h}</div>
                  <input value={form.opsi[i]} onChange={e => { const o = [...form.opsi]; o[i] = e.target.value; setForm(p=>({...p, opsi:o})); }} placeholder={`Opsi ${h} (boleh pakai shortcut sqrt, 1/2, x^2)`} />
                  <button className={`btn ${form.jawaban === i ? "btn-green" : "btn-ghost"}`} onClick={() => setForm(p=>({...p, jawaban:i}))}>✓</button>
                </div>
              ); })}
              {/* Tombol convert untuk semua opsi sekaligus */}
              <div style={{marginTop:"6px", marginBottom:"6px"}}>
                <button
                  type="button"
                  onClick={() => setForm(p => ({...p, opsi: p.opsi.map(o => convertToLatex(o))}))}
                  style={{background:"#dbeafe", border:"1px solid #93c5fd", borderRadius:"var(--radius2)", padding:"6px 12px", fontSize:"12px", color:"#1e40af", cursor:"pointer", fontWeight:"600"}}
                  title="Convert shortcut di semua opsi"
                >🔄 Convert Semua Opsi ke Rumus</button>
                <span style={{fontSize:"11px", color:"var(--gray)", marginLeft:"8px"}}>Convert semua opsi sekaligus</span>
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
              <div style={{display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap", background:"var(--green3)", borderRadius:"var(--radius2)", padding:"14px 16px", marginBottom:"16px"}}>
                <div style={{flex:"1 1 220px", fontSize:"13px", color:"var(--navy3)", lineHeight:"1.6"}}>
                  <strong>Belum punya format?</strong> Download template Excel, isi soalnya, lalu upload kembali di bawah.
                </div>
                <button type="button" className="btn btn-green" onClick={() => downloadTemplateSoal("xlsx")}>⬇️ Download Template Excel</button>
              </div>
              {/* Panduan format */}
              <div style={{background:"var(--blue3)", borderRadius:"var(--radius2)", padding:"16px", marginBottom:"20px"}}>
                <div style={{fontSize:"13px", fontWeight:"700", color:"var(--blue2)", marginBottom:"8px"}}>📋 Format Excel yang Harus Digunakan:</div>
                <div style={{fontSize:"12px", color:"var(--navy3)", lineHeight:"1.8"}}>
                  <strong>Baris 1 (Judul kolom):</strong> No | Soal | A | B | C | D | Kunci Jawaban<br/>
                  <strong>Baris 2 dst:</strong> satu baris = satu soal. Kolom A–D diisi pilihan jawaban.<br/>
                  <strong>Kunci Jawaban:</strong> cukup satu huruf A, B, C, atau D (ada pilihan dropdown di template)<br/>
                <strong>Soal Benar/Salah:</strong> isi hanya kolom A dan B, kosongkan C dan D. Kunci A atau B.
                </div>
                <div style={{marginTop:"10px", fontSize:"12px", background:"white", borderRadius:"6px", padding:"10px", fontFamily:"var(--mono)"}}>
                  <div style={{color:"var(--gray)", borderBottom:"1px solid var(--border)", paddingBottom:"4px", marginBottom:"4px"}}>No | Soal | A | B | C | D | Kunci Jawaban</div>
                  <div>1 | Ibu kota Indonesia? | Bandung | Jakarta | Surabaya | Medan | B</div>
                  <div>2 | 2 + 2 = ? | 3 | 5 | 4 | 6 | C</div>
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
              <div style={{display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap", background:"var(--green3)", borderRadius:"var(--radius2)", padding:"14px 16px", marginBottom:"16px"}}>
                <div style={{flex:"1 1 220px", fontSize:"13px", color:"var(--navy3)", lineHeight:"1.6"}}>
                  <strong>Belum punya format?</strong> Download template Word (tabel No | Soal | A | B | C | D | Kunci Jawaban), isi soalnya, lalu upload kembali di bawah.
                </div>
                <button type="button" className="btn btn-green" onClick={() => downloadTemplateSoal("docx")}>⬇️ Download Template Word</button>
              </div>
              {/* Panduan format */}
              <div style={{background:"var(--blue3)", borderRadius:"var(--radius2)", padding:"16px", marginBottom:"20px"}}>
                <div style={{fontSize:"13px", fontWeight:"700", color:"var(--blue2)", marginBottom:"8px"}}>📋 Format Word yang Harus Digunakan:</div>
                <div style={{fontSize:"12px", color:"var(--navy3)", lineHeight:"1.8", marginBottom:"10px"}}>
                  Cara termudah: pakai template tabel di atas. Format teks berikut juga masih bisa dipakai (satu soal per blok):
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
    alert(`✅ Kunci ujian ${nama} (${kelas}) berhasil dicatat!\nMinta pengawas masukkan kode 2026 di layar kunci siswa.`);
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
          ℹ️ Jika ada siswa yang ujiannya terkunci (3x pelanggaran), minta pengawas mendatangi siswa dan memasukkan kode <strong>2026</strong> di layar kunci yang muncul di browser siswa. Siswa tidak perlu refresh!
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
          ✅ Tercatat! Minta pengawas masukkan kode <strong>2026</strong> di layar kunci siswa tersebut.
        </div>
      )}
    </div>
  );
}

// ---- Hasil Ujian ----
const KKM_HASIL = 75;

function muatXLSX() {
  return new Promise((resolve, reject) => {
    if (window.XLSX) return resolve(window.XLSX);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => resolve(window.XLSX);
    s.onerror = () => reject(new Error("Gagal memuat library Excel. Periksa koneksi internet."));
    document.head.appendChild(s);
  });
}

function hitungStatKelas(rows) {
  const n = rows.length;
  if (!n) return { n: 0, rata: 0, max: 0, min: 0, lulus: 0, remedi: 0, pct: 0, curiga: 0 };
  const nil = rows.map(h => Number(h.nilai) || 0);
  const lulus = nil.filter(v => v >= KKM_HASIL).length;
  return {
    n,
    rata: Math.round(nil.reduce((a, b) => a + b, 0) / n),
    max: Math.max(...nil),
    min: Math.min(...nil),
    lulus,
    remedi: n - lulus,
    pct: Math.round((lulus / n) * 100),
    curiga: rows.filter(h => h.mencurigakan).length,
  };
}

function HasilPage({ hasilList, ujianList }) {
  const [tabView, setTabView] = useState("kelas"); // kelas | siswa | curiga
  const [fTingkat, setFTingkat] = useState("");
  const [fKelas, setFKelas] = useState("");
  const [fMapel, setFMapel] = useState("");
  const [cari, setCari] = useState("");
  const [exporting, setExporting] = useState(false);

  const kelasLabel = (h) => normalKelas(h.kelas) || "TANPA KELAS";
  const inTingkat = (k) => !fTingkat || tingkatDari(k) === fTingkat;
  const byNama = (a, b) => String(a.nama_siswa || "").localeCompare(String(b.nama_siswa || ""), "id") || String(a.mapel || "").localeCompare(String(b.mapel || ""));

  // Data dasar: filter mapel & pencarian nama
  const base = hasilList.filter(h =>
    (!fMapel || h.mapel === fMapel) &&
    (!cari.trim() || String(h.nama_siswa || "").toLowerCase().includes(cari.trim().toLowerCase()))
  );
  // Data tampil: + filter tingkat, kelas, dan tab "mencurigakan"
  const filtered = base.filter(h =>
    inTingkat(h.kelas) &&
    (!fKelas || kelasLabel(h) === fKelas) &&
    (tabView !== "curiga" || h.mencurigakan)
  );
  const curigaCount = hasilList.filter(h => h.mencurigakan).length;

  // Daftar kelas: semua kelas standar (7A–9I) + kelas lain yang ada di data (mis. data lama "7")
  const kelasStandar = TINGKAT_KELAS.filter(t => !fTingkat || t === fTingkat).flatMap(t => ROMBEL_KELAS.map(r => t + r));
  const kelasLain = [...new Set(base.filter(h => inTingkat(h.kelas)).map(kelasLabel))].filter(k => !kelasStandar.includes(k));
  const semuaKelas = [...kelasStandar, ...kelasLain].sort(urutKelas);

  const rekap = semuaKelas.map(k => ({ kelas: k, ...hitungStatKelas(base.filter(h => kelasLabel(h) === k)) }));
  const kelasSudahUjian = rekap.filter(r => r.n > 0).length;
  const ringkas = hitungStatKelas(tabView === "kelas" ? base.filter(h => inTingkat(h.kelas)) : filtered);

  // Pengelompokan siswa per kelas
  const grup = {};
  filtered.forEach(h => { const k = kelasLabel(h); if (!grup[k]) grup[k] = []; grup[k].push(h); });
  const grupKeys = Object.keys(grup).sort(urutKelas);
  grupKeys.forEach(k => grup[k].sort(byNama));

  const pilihTingkat = (t) => {
    setFTingkat(t);
    if (fKelas && t && tingkatDari(fKelas) !== t) setFKelas("");
  };
  const lihatSiswaKelas = (k) => { setFKelas(k); setTabView("siswa"); };

  const warnaNilai = (v) => v >= KKM_HASIL ? "var(--green2)" : "var(--red2)";
  const barisSiswa = (list) => list.map((h, i) => [i + 1, h.nama_siswa, kelasLabel(h), h.mapel, h.benar, h.total, h.nilai, h.nilai >= KKM_HASIL ? "Lulus" : "Remedi", h.pelanggaran || 0, h.mencurigakan ? "Ya" : "Tidak"]);
  const HEADER_SISWA = ["No", "Nama", "Kelas", "Mata Pelajaran", "Benar", "Total", "Nilai", "Status", "Pelanggaran", "Mencurigakan"];

  const exportCSV = () => {
    if (filtered.length === 0) return alert("Belum ada data untuk diexport.");
    const urut = [...filtered].sort((a, b) => urutKelas(kelasLabel(a), kelasLabel(b)) || byNama(a, b));
    const esc = (v) => '"' + String(v ?? "").replace(/"/g, '""') + '"';
    const csv = "\uFEFF" + [HEADER_SISWA, ...barisSiswa(urut)].map(r => r.map(esc).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = `hasil-ujian-${fKelas || (fTingkat ? "kelas" + fTingkat : "semua")}-${fMapel || "semua-mapel"}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // Excel: sheet "Rekap Kelas" + satu sheet per kelas berisi nilai siswa
  const exportExcel = async () => {
    if (filtered.length === 0) return alert("Belum ada data untuk diexport.");
    setExporting(true);
    try {
      const XLSX = await muatXLSX();
      const wb = XLSX.utils.book_new();
      const aoaRekap = [
        ["Kelas", "Peserta", "Rata-rata", "Tertinggi", "Terendah", "Lulus", "Remedi", "% Lulus"],
        ...rekap.filter(r => r.n > 0).map(r => [r.kelas, r.n, r.rata, r.max, r.min, r.lulus, r.remedi, r.pct + "%"]),
      ];
      const wsRekap = XLSX.utils.aoa_to_sheet(aoaRekap);
      wsRekap["!cols"] = [{ wch: 12 }, { wch: 9 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 8 }, { wch: 8 }, { wch: 9 }];
      XLSX.utils.book_append_sheet(wb, wsRekap, "Rekap Kelas");
      grupKeys.forEach(k => {
        const aoa = [
          ["No", "Nama", "Kelas", "Mata Pelajaran", "Benar", "Total", "Nilai", "Status", "Pelanggaran"],
          ...grup[k].map((h, i) => [i + 1, h.nama_siswa, k, h.mapel, h.benar, h.total, h.nilai, h.nilai >= KKM_HASIL ? "Lulus" : "Remedi", h.pelanggaran || 0]),
        ];
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        ws["!cols"] = [{ wch: 5 }, { wch: 32 }, { wch: 9 }, { wch: 22 }, { wch: 7 }, { wch: 7 }, { wch: 7 }, { wch: 9 }, { wch: 12 }];
        XLSX.utils.book_append_sheet(wb, ws, k.replace(/[\\\/\?\*\[\]:]/g, "-").slice(0, 31));
      });
      XLSX.writeFile(wb, `Rekap-Nilai-${fKelas || (fTingkat ? "Kelas" + fTingkat : "Semua-Kelas")}-${fMapel || "Semua-Mapel"}.xlsx`);
    } catch (e) {
      alert("Gagal membuat file Excel: " + e.message);
    }
    setExporting(false);
  };

  const selectStyle = { padding: "8px 12px", borderRadius: "var(--radius2)", border: "1.5px solid var(--border)", fontSize: "13px" };

  return (
    <>
      <div className="page-header"><h1>Hasil Ujian</h1><p>Rekap nilai per kelas & per siswa, serta deteksi kecurangan peserta</p></div>

      {curigaCount > 0 && (
        <div style={{background:"var(--red3)", border:"1px solid var(--red)", borderRadius:"var(--radius)", padding:"16px 20px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap"}}>
          <div style={{fontSize:"24px"}}>🚨</div>
          <div>
            <div style={{fontWeight:"700", color:"var(--red2)"}}>Terdeteksi {curigaCount} siswa mencurigakan!</div>
            <div style={{fontSize:"13px", color:"var(--red2)", opacity:0.8}}>Siswa ini terdeteksi berpindah tab atau keluar fullscreen lebih dari 1 kali.</div>
          </div>
          <button className="btn btn-red" style={{marginLeft:"auto"}} onClick={() => setTabView("curiga")}>Lihat Detail</button>
        </div>
      )}

      <div className="card">
        {/* Tab tampilan */}
        <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"14px"}}>
          <button className={`btn ${tabView==="kelas"?"btn-blue":"btn-ghost"}`} onClick={() => { setTabView("kelas"); setFKelas(""); }}>🏫 Rekap per Kelas</button>
          <button className={`btn ${tabView==="siswa"?"btn-blue":"btn-ghost"}`} onClick={() => setTabView("siswa")}>👥 Nilai per Siswa</button>
          <button className={`btn ${tabView==="curiga"?"btn-red":"btn-ghost"}`} onClick={() => setTabView("curiga")}>🚨 Mencurigakan ({curigaCount})</button>
        </div>

        {/* Filter */}
        <div style={{display:"flex", gap:"8px", flexWrap:"wrap", alignItems:"center", marginBottom:"16px"}}>
          <div style={{display:"flex", gap:"4px"}}>
            {[["", "Semua"], ["7", "Kelas 7"], ["8", "Kelas 8"], ["9", "Kelas 9"]].map(([v, lbl]) => (
              <button key={v} className={`btn ${fTingkat===v?"btn-blue":"btn-ghost"}`} style={{padding:"7px 12px", fontSize:"13px"}} onClick={() => pilihTingkat(v)}>{lbl}</button>
            ))}
          </div>
          <select value={fKelas} onChange={e => setFKelas(e.target.value)} style={selectStyle}>
            <option value="">Semua Kelas{fTingkat ? ` ${fTingkat}` : ""}</option>
            {semuaKelas.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
          <select value={fMapel} onChange={e => setFMapel(e.target.value)} style={selectStyle}>
            <option value="">Semua Mapel</option>
            {MAPEL.map(m => <option key={m}>{m}</option>)}
          </select>
          <input value={cari} onChange={e => setCari(e.target.value)} placeholder="🔍 Cari nama siswa..." style={{...selectStyle, minWidth:"180px"}} />
          <div style={{marginLeft:"auto", display:"flex", gap:"8px", flexWrap:"wrap"}}>
            <button className="btn btn-green" onClick={exportExcel} disabled={exporting}>{exporting ? "⏳ Membuat..." : "⬇️ Export Excel (per kelas)"}</button>
            <button className="btn btn-ghost" onClick={exportCSV}>⬇️ CSV</button>
          </div>
        </div>

        {/* Ringkasan */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:"10px", marginBottom:"18px"}}>
          {[
            ["Hasil Masuk", ringkas.n, "#1d4ed8", "#dbeafe"],
            ["Rata-rata", ringkas.rata, warnaNilai(ringkas.rata), "#f3e8ff"],
            ["Lulus", `${ringkas.lulus} (${ringkas.pct}%)`, "#15803d", "#dcfce7"],
            ["Remedi", ringkas.remedi, "#b91c1c", "#fee2e2"],
            ...(tabView === "kelas" ? [["Kelas Sudah Ujian", `${kelasSudahUjian}/${semuaKelas.length}`, "#b45309", "#fef3c7"]] : []),
          ].map(([lbl, val, color, bg]) => (
            <div key={lbl} style={{background:bg, borderRadius:"var(--radius2)", padding:"10px 14px"}}>
              <div style={{fontSize:"11px", fontWeight:700, color:"#555", textTransform:"uppercase", letterSpacing:"0.4px"}}>{lbl}</div>
              <div style={{fontSize:"20px", fontWeight:800, color, fontFamily:"var(--mono)"}}>{val}</div>
            </div>
          ))}
        </div>

        {/* ── REKAP PER KELAS ── */}
        {tabView === "kelas" && (
          rekap.length === 0 ? (
            <div className="empty-state"><div className="icon">🏫</div><p>Belum ada data kelas</p></div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Kelas</th><th>Peserta</th><th>Rata-rata</th><th>Tertinggi</th><th>Terendah</th>
                    <th>Lulus</th><th>Remedi</th><th>% Lulus</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {rekap.map(r => (
                    <tr key={r.kelas} style={{opacity: r.n === 0 ? 0.5 : 1}}>
                      <td><strong>{r.kelas}</strong></td>
                      {r.n === 0 ? (
                        <td colSpan={7} style={{color:"var(--gray)", fontSize:"12px"}}>Belum ada hasil ujian</td>
                      ) : (
                        <>
                          <td style={{fontFamily:"var(--mono)"}}>{r.n}</td>
                          <td><strong style={{fontFamily:"var(--mono)", color: warnaNilai(r.rata)}}>{r.rata}</strong></td>
                          <td style={{fontFamily:"var(--mono)"}}>{r.max}</td>
                          <td style={{fontFamily:"var(--mono)"}}>{r.min}</td>
                          <td style={{fontFamily:"var(--mono)", color:"var(--green2)"}}>{r.lulus}</td>
                          <td style={{fontFamily:"var(--mono)", color: r.remedi ? "var(--red2)" : "var(--gray)"}}>{r.remedi}</td>
                          <td><span className={`badge ${r.pct >= 75 ? "badge-green" : "badge-red"}`}>{r.pct}%</span></td>
                        </>
                      )}
                      <td style={{textAlign:"right"}}>
                        {r.n > 0 && <button className="btn btn-ghost" style={{padding:"5px 12px", fontSize:"12px"}} onClick={() => lihatSiswaKelas(r.kelas)}>Lihat Siswa →</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* ── NILAI PER SISWA (dikelompokkan per kelas) ── */}
        {tabView !== "kelas" && (
          grupKeys.length === 0 ? (
            <div className="empty-state"><div className="icon">📊</div><p>{tabView==="curiga" ? "Tidak ada siswa mencurigakan 🎉" : "Belum ada data hasil ujian untuk filter ini"}</p></div>
          ) : (
            grupKeys.map(k => {
              const st = hitungStatKelas(grup[k]);
              return (
                <div key={k} style={{marginBottom:"22px"}}>
                  <div style={{display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", background:"var(--navy)", color:"#fff", borderRadius:"var(--radius2) var(--radius2) 0 0", padding:"10px 16px"}}>
                    <strong style={{fontSize:"15px"}}>Kelas {k}</strong>
                    <span style={{fontSize:"12px", opacity:0.8}}>{st.n} hasil • rata-rata {st.rata} • lulus {st.lulus} • remedi {st.remedi}</span>
                  </div>
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr><th>#</th><th>Nama</th><th>Mata Pelajaran</th><th>Benar</th><th>Total</th><th>Nilai</th><th>Status</th><th>Pelanggaran</th></tr>
                      </thead>
                      <tbody>
                        {grup[k].map((h, i) => (
                          <tr key={(h.id || "") + "_" + i} style={{background: h.mencurigakan ? "#fff5f5" : ""}}>
                            <td style={{color:"var(--gray)", fontSize:"12px"}}>{i + 1}</td>
                            <td>
                              <strong>{h.nama_siswa}</strong>
                              {h.mencurigakan && <span style={{marginLeft:"6px", fontSize:"11px", color:"var(--red2)", fontWeight:"700"}}>⚠️ Curiga</span>}
                            </td>
                            <td>{h.mapel}</td>
                            <td style={{fontFamily:"var(--mono)"}}>{h.benar}</td>
                            <td style={{fontFamily:"var(--mono)"}}>{h.total}</td>
                            <td><strong style={{fontFamily:"var(--mono)", color: warnaNilai(h.nilai)}}>{h.nilai}</strong></td>
                            <td><span className={`badge ${h.nilai >= KKM_HASIL ? "badge-green" : "badge-red"}`}>{h.nilai >= KKM_HASIL ? "Lulus" : "Remedi"}</span></td>
                            <td>
                              {(h.pelanggaran||0) === 0
                                ? <span style={{color:"var(--green2)", fontSize:"12px", fontWeight:"600"}}>✅ Bersih</span>
                                : <span style={{color:"var(--red2)", fontSize:"12px", fontWeight:"700"}}>⚠️ {h.pelanggaran}x</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )
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
  const [unlockInput, setUnlockInput] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submittedRef = useRef(false);
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

  // Penanda sudah submit (dipakai handleSubmit, cleanup heartbeat, dll.)
  // ── Timer (pause saat layar mati) ──────────────────────────
  useEffect(() => {
    if (locked || submitting || timerPaused) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); setTimeout(() => handleSubmitRef.current && handleSubmitRef.current(true), 0); return 0; }
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
      if (pesertaAktifIdRef.current && !useDemo && !submittedRef.current) {
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

  // ── Submit INSTAN ───────────────────────────────────────────
  // Layar hasil langsung tampil; pengiriman ke server berjalan di latar
  // belakang (lihat kirimHasil) dengan retry otomatis & cadangan offline.
  const handleSubmit = useCallback((auto = false) => {
    if (submittedRef.current) return;      // cegah klik ganda / timer + klik bersamaan
    submittedRef.current = true;
    setSubmitting(true);
    setShowConfirm(false);
    setShowReview(false);

    const benar = soal.filter((s, i) => jawaban[i] === s.jawaban).length;
    const nilai = soal.length ? Math.round((benar / soal.length) * 100) : 0;
    const hasilData = {
      nama_siswa: siswa.nama, kelas: siswa.kelas, mapel: ujian.mapel,
      benar, total: soal.length, nilai, ujian_id: ujian.id,
      pelanggaran: tabViolation,
      mencurigakan: tabViolation >= 2,
    };

    if (useDemo) {
      hasilData.id = Date.now();
      DEMO_HASIL.push(hasilData);
    } else {
      kirimHasil.enqueue(hasilData, pesertaAktifIdRef.current);
    }

    onFinish({ ...hasilData });
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {});
  }, [jawaban, soal, siswa, ujian, onFinish, tabViolation]);

  // Ref agar timer selalu memakai versi handleSubmit TERBARU (jawaban terbaru)
  const handleSubmitRef = useRef(null);
  handleSubmitRef.current = handleSubmit;

  const HURUF = ["A","B","C","D"];
  const isDanger = timeLeft <= 300;
  const dijawab = jawaban.filter(j => j !== null).length;
  const belumDijawab = soal.length - dijawab;
  const totalDurasi = ujian.durasi * 60;

  // Notifikasi live di dalam ujian
  const { notifs: examNotifs, hapus: hapusExamNotif } = useNotifikasi();

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
            <div style={{background:"white",borderRadius:"16px",padding:"32px",maxWidth:"420px",textAlign:"center",width:"100%"}}>
              <div style={{fontSize:"48px",marginBottom:"12px"}}>{locked ? "🔒" : "⚠️"}</div>
              <h2 style={{fontSize:"18px",fontWeight:"800",marginBottom:"12px",color:locked?"var(--red2)":"var(--yellow)"}}>{locked ? "Ujian Dikunci" : "Peringatan"}</h2>
              <p style={{fontSize:"14px",color:"var(--gray)",marginBottom:"20px",lineHeight:"1.6"}}>{warningMsg}</p>
              {!locked && (
                <button className="btn btn-blue" style={{width:"100%",padding:"12px"}} onClick={() => { setShowWarning(false); enterFullscreen(); }}>
                  🔄 Kembali ke Ujian
                </button>
              )}
              {locked && (
                <div>
                  <div style={{background:"var(--red3)",borderRadius:"var(--radius2)",padding:"10px 14px",marginBottom:"16px",fontSize:"13px",color:"var(--red2)",fontWeight:"600"}}>
                    🔒 Hubungi pengawas/admin untuk memasukkan kode kunci.
                  </div>
                  <input
                    type="password"
                    value={unlockInput}
                    onChange={e => { setUnlockInput(e.target.value); setUnlockError(""); }}
                    placeholder="Masukkan kode kunci pengawas"
                    style={{width:"100%",padding:"12px 16px",border:`1.5px solid ${unlockError?"var(--red)":"var(--border)"}`,borderRadius:"var(--radius2)",fontSize:"15px",marginBottom:"8px",textAlign:"center",letterSpacing:"4px",outline:"none"}}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        if (unlockInput === "2026") {
                          setLocked(false); setShowWarning(false); setUnlockInput(""); setUnlockError(""); enterFullscreen();
                        } else { setUnlockError("Kode salah. Hubungi pengawas."); setUnlockInput(""); }
                      }
                    }}
                    autoComplete="off"
                  />
                  {unlockError && <div style={{fontSize:"12px",color:"var(--red2)",fontWeight:"600",marginBottom:"10px"}}>❌ {unlockError}</div>}
                  <button
                    className="btn btn-green"
                    style={{width:"100%",padding:"12px",fontSize:"15px",fontWeight:"700"}}
                    onClick={() => {
                      if (unlockInput === "2026") {
                        setLocked(false); setShowWarning(false); setUnlockInput(""); setUnlockError(""); enterFullscreen();
                      } else { setUnlockError("Kode salah. Hubungi pengawas."); setUnlockInput(""); }
                    }}
                  >🔓 Buka Kunci</button>
                </div>
              )}
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
                  submittedRef.current = true;
                  if (!useDemo && pesertaAktifIdRef.current) {
                    supabase(`peserta_aktif?id=eq.${pesertaAktifIdRef.current}`, {
                      method: "PATCH",
                      body: JSON.stringify({ status: "selesai", pelanggaran: tabViolation }),
                      prefer: "return=minimal",
                    }).catch(() => {});
                  }
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
          <div style={{background:"white",borderRadius:"16px",padding:"32px",maxWidth:"420px",textAlign:"center",width:"100%"}}>
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
            {locked && (
              <div>
                <div style={{background:"var(--red3)",borderRadius:"var(--radius2)",padding:"10px 14px",marginBottom:"16px",fontSize:"13px",color:"var(--red2)",fontWeight:"600"}}>
                  🔒 Hubungi pengawas/admin untuk memasukkan kode kunci.
                </div>
                <input
                  type="password"
                  value={unlockInput}
                  onChange={e => { setUnlockInput(e.target.value); setUnlockError(""); }}
                  placeholder="Masukkan kode kunci pengawas"
                  style={{width:"100%",padding:"12px 16px",border:`1.5px solid ${unlockError?"var(--red)":"var(--border)"}`,borderRadius:"var(--radius2)",fontSize:"15px",marginBottom:"8px",textAlign:"center",letterSpacing:"4px",outline:"none"}}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      if (unlockInput === "2026") {
                        setLocked(false); setShowWarning(false); setUnlockInput(""); setUnlockError(""); enterFullscreen();
                      } else { setUnlockError("Kode salah. Hubungi pengawas."); setUnlockInput(""); }
                    }
                  }}
                  autoComplete="off"
                />
                {unlockError && <div style={{fontSize:"12px",color:"var(--red2)",fontWeight:"600",marginBottom:"10px"}}>❌ {unlockError}</div>}
                <button
                  className="btn btn-green"
                  style={{width:"100%",padding:"12px",fontSize:"15px",fontWeight:"700"}}
                  onClick={() => {
                    if (unlockInput === "2026") {
                      setLocked(false); setShowWarning(false); setUnlockInput(""); setUnlockError(""); enterFullscreen();
                    } else { setUnlockError("Kode salah. Hubungi pengawas."); setUnlockInput(""); }
                  }}
                >🔓 Buka Kunci</button>
              </div>
            )}
          </div>
        </div>
      )}

      <NotifToast notifs={examNotifs} hapus={hapusExamNotif} />
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
          <CircularTimer timeLeft={timeLeft} totalTime={totalDurasi} paused={timerPaused} />
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
  const [sendStatus, setSendStatus] = useState(() => result.is_google_form || useDemo ? "done" : kirimHasil.status);
  useEffect(() => {
    if (result.is_google_form || useDemo) return;
    setSendStatus(kirimHasil.pending() === 0 && kirimHasil.status === "idle" ? "done" : kirimHasil.status);
    return kirimHasil.subscribe(setSendStatus);
  }, []);
  // Peringatan jika siswa menutup tab sebelum nilai terkirim
  useEffect(() => {
    if (sendStatus === "done") return;
    const warn = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [sendStatus]);
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
        {!result.is_google_form && !useDemo && (
          <div style={{
            borderRadius:"var(--radius2)", padding:"10px 14px", marginBottom:"14px", fontSize:"13px", fontWeight:"600", textAlign:"left",
            background: sendStatus === "done" ? "var(--green3)" : sendStatus === "error" ? "var(--red3)" : "var(--blue3)",
            color: sendStatus === "done" ? "var(--green2)" : sendStatus === "error" ? "var(--red2)" : "var(--blue2)",
          }}>
            {sendStatus === "done" && "✅ Nilai sudah tersimpan di server."}
            {sendStatus === "sending" && "⏳ Mengirim nilai ke server... (jangan tutup halaman ini)"}
            {sendStatus === "error" && (
              <>
                ⚠️ Nilai belum terkirim (koneksi bermasalah). Sistem mencoba lagi otomatis — jangan tutup halaman ini.
                <button className="btn btn-red" style={{display:"block", marginTop:"8px", padding:"6px 14px", fontSize:"12px"}} onClick={() => kirimHasil.flush()}>🔄 Kirim Ulang Sekarang</button>
              </>
            )}
          </div>
        )}
        <button className="btn btn-blue" style={{width:"100%", padding:"12px"}} onClick={onBack}>🏠 Kembali ke Halaman Utama</button>
      </div>
    </div>
  );
}
