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

// Susun soal untuk siswa. Secara bawaan soal & pilihan TIDAK diacak (urutan sesuai guru).
//  - acakSoal : acak urutan nomor soal
//  - acakOpsi : acak urutan pilihan A–D (soal Benar/Salah 2 pilihan tidak pernah diacak)
function shuffleSoalDanOpsi(soalAsli, acakSoal = false, acakOpsi = false) {
  if (!soalAsli || soalAsli.length === 0) return [];
  const daftar = acakSoal ? shuffleArray(soalAsli) : [...soalAsli];
  return daftar.map(s => {
    if (isIsian(s)) return { ...s, opsi: [] };      // isian: tidak ada opsi untuk diacak
    // Pastikan opsi adalah array yang valid
    let opsi = s.opsi;
    if (!Array.isArray(opsi)) {
      try { opsi = JSON.parse(opsi); } catch { opsi = ["A","B","C","D"]; }
    }
    if (!opsi || opsi.length === 0) opsi = ["A","B","C","D"];

    const kunciAsli = kunciIdx(s).filter(i => i < opsi.length);
    if (kunciAsli.length === 0) kunciAsli.push(0);
    const urutan = (acakOpsi && opsi.length > 2)
      ? shuffleArray(opsi.map((_, i) => i))
      : opsi.map((_, i) => i);
    const kunciBaru = kunciAsli.map(i => urutan.indexOf(i)).sort((a, b) => a - b);
    return {
      ...s, opsi: urutan.map(i => opsi[i]),
      jawaban: kunciBaru[0],
      kunci_ganda: kunciBaru.length > 1 ? kunciBaru.map(i => HURUF_KUNCI[i]).join("") : null,
    };
  });
}

// ============================================================
// BOBOT NILAI PER SOAL
// Guru boleh memberi bobot berbeda (mudah/sedang/sulit). Nilai akhir selalu
// dinormalkan: (jumlah bobot soal benar / total bobot semua soal) x 100,
// sehingga nilai maksimal SELALU 100 berapa pun total bobotnya.
// Bobot kosong = 1 (semua soal sama rata). Koma desimal (2,5) -> titik (2.5).
// ============================================================
const SQL_KOLOM_BOBOT = "alter table soal add column if not exists bobot numeric default 1;\nalter table soal add column if not exists kunci_ganda text;\nalter table soal add column if not exists tipe text default 'pg';\nalter table soal add column if not exists kunci_isian text;\nnotify pgrst, 'reload schema';";

function parseBobot(v) {
  if (v === null || v === undefined) return null;
  const t = String(v).trim().replace(/\s+/g, "").replace(",", ".");
  if (!t) return null;
  const n = Number(t);
  if (!isFinite(n) || n <= 0) return null;
  return Math.min(100, Math.round(n * 100) / 100);
}
const bobotSoal = (s) => { const b = parseBobot(s && s.bobot); return b === null ? 1 : b; };
const bulatkan2 = (n) => Math.round(n * 100) / 100;
const totalBobot = (list) => bulatkan2((list || []).reduce((a, s) => a + bobotSoal(s), 0));
const poinSoal = (s, list) => { const t = totalBobot(list); return t ? bulatkan2((bobotSoal(s) / t) * 100) : 0; };

// ============================================================
// PILIHAN GANDA KOMPLEKS (JAWABAN LEBIH DARI SATU)
// Satu soal boleh punya lebih dari satu jawaban benar. Kunci ditulis huruf
// digabung, mis. "AB" atau "ACD". Disimpan: jawaban = indeks pertama,
// kunci_ganda = "AB" (null bila hanya satu jawaban benar).
// Nama jenis soal: "Pilihan Ganda Kompleks (jawaban lebih dari satu)". Penilaian: poin sebagian (lihat skorSoal).
// ============================================================
const HURUF_KUNCI = ["A", "B", "C", "D"];
function parseKunci(raw) {
  const up = String(raw ?? "").toUpperCase().replace(/\bDAN\b/g, " ");
  const huruf = [...new Set(up.replace(/[^A-D]/g, "").split(""))].sort();
  return { huruf: huruf.join(""), idx: huruf.map(h => HURUF_KUNCI.indexOf(h)) };
}
function kunciIdx(s) {                       // daftar indeks jawaban benar
  if (s && typeof s.kunci_ganda === "string") {
    const k = parseKunci(s.kunci_ganda);
    if (k.idx.length > 1) return k.idx;
  }
  return [s && typeof s.jawaban === "number" ? s.jawaban : 0];
}
const kunciHuruf = (s) => kunciIdx(s).map(i => HURUF_KUNCI[i]).join("");
const soalGanda = (s) => kunciIdx(s).length > 1;
const adaJawaban = (j) => j !== null && j !== undefined &&
  (typeof j === "string" ? j.trim().length > 0 : (!Array.isArray(j) || j.length > 0));

// ============================================================
// ISIAN SINGKAT: siswa mengetik jawaban sendiri.
// Kunci disimpan di kolom kunci_isian; beberapa jawaban yang dianggap benar dipisah "|".
// Pencocokan: huruf besar/kecil & spasi berlebih diabaikan, tanda baca di akhir diabaikan,
// angka 2,5 = 2.5. Benar = bobot penuh, salah = 0 (tidak ada poin sebagian).
// ============================================================
const isIsian = (s) => !!s && s.tipe === "isian";
const daftarKunciIsian = (s) => String((s && s.kunci_isian) ?? "").split(/[|\n]/).map(x => x.trim()).filter(Boolean);
const normIsian = (t) => String(t ?? "").normalize("NFKC").toLowerCase()
  .replace(/[\s\u00a0]+/g, " ").trim().replace(/[.,;:!?]+$/, "").trim();
const angkaIsian = (t) => {
  const x = String(t ?? "").trim().replace(/\s+/g, "");
  if (!/^[-+]?\d+([.,]\d+)?$/.test(x)) return null;
  return Number(x.replace(",", "."));
};
function cocokIsian(s, j) {
  if (typeof j !== "string" || !j.trim()) return false;
  const a = normIsian(j), na = angkaIsian(j);
  return daftarKunciIsian(s).some(k => {
    if (normIsian(k) === a) return true;
    const nk = angkaIsian(k);
    return na !== null && nk !== null && Math.abs(na - nk) < 1e-9;
  });
}
const terpilih = (j, i) => Array.isArray(j) ? j.includes(i) : j === i;
function jawabanBenar(s, j) {                // j: angka (satu pilihan) | array (ganda) | teks (isian) | null
  if (isIsian(s)) return cocokIsian(s, j);
  if (!adaJawaban(j)) return false;
  const arr = (Array.isArray(j) ? [...j] : [j]).sort((a, b) => a - b);
  const k = kunciIdx(s);
  return arr.length === k.length && arr.every((v, i) => v === k[i]);
}
// Skor satu soal, 0..1.
// - Pilihan Ganda biasa: benar = 1, salah = 0.
// - Pilihan Ganda Kompleks (jawaban lebih dari satu): poin SEBAGIAN.
//   skor = (pilihan benar - pilihan salah) / jumlah kunci, minimal 0.
//   Semua kunci terpilih tanpa pilihan salah = 1 (poin utuh).
//   Pilihan salah mengurangi poin, supaya mencentang semua opsi tidak otomatis penuh.
function skorSoal(s, j) {
  if (isIsian(s)) return cocokIsian(s, j) ? 1 : 0;
  if (!adaJawaban(j)) return 0;
  const k = kunciIdx(s);
  if (k.length <= 1) return jawabanBenar(s, j) ? 1 : 0;
  const pilih = [...new Set(Array.isArray(j) ? j : [j])];
  const benar = pilih.filter(i => k.includes(i)).length;
  const salah = pilih.length - benar;
  return Math.max(0, (benar - salah) / k.length);
}
function hitungNilai(soal, jawaban) {
  const total = soal.reduce((a, s) => a + bobotSoal(s), 0);
  if (!total) return 0;
  const dapat = soal.reduce((a, s, i) => a + bobotSoal(s) * skorSoal(s, jawaban[i]), 0);
  return Math.round((dapat / total) * 100);
}
// Simpan soal ke Supabase.
// - kolom "bobot" belum ada  -> simpan tanpa bobot, kembalikan false (guru diberi tahu).
// - kolom "kunci_ganda" belum ada: soal satu-kunci tetap disimpan; soal berkunci ganda DITOLAK
//   (agar kunci tidak tersimpan setengah-setengah / salah).
async function simpanSoalDb(path, method, body) {
  const b = { ...body };
  let lengkap = true;
  for (let t = 0; t < 4; t++) {
    try {
      await supabase(path, { method, body: JSON.stringify(b) });
      return lengkap;
    } catch (e) {
      const msg = e.message || "";
      if (/kunci_ganda/i.test(msg) && "kunci_ganda" in b) {
        if (b.kunci_ganda) throw new Error("Kolom \"kunci_ganda\" belum ada di database, sehingga soal Pilihan Ganda Kompleks belum bisa disimpan.\n\nJalankan di Supabase > SQL Editor:\n\n" + SQL_KOLOM_BOBOT + "\n\nLalu coba lagi.");
        delete b.kunci_ganda;
        continue;
      }
      if (/kunci_isian|\btipe\b/i.test(msg) && ("tipe" in b || "kunci_isian" in b)) {
        if (b.tipe === "isian") throw new Error("Kolom \"tipe\"/\"kunci_isian\" belum ada di database, sehingga soal Isian Singkat belum bisa disimpan.\n\nJalankan di Supabase > SQL Editor:\n\n" + SQL_KOLOM_BOBOT + "\n\nLalu coba lagi.");
        delete b.tipe; delete b.kunci_isian;
        continue;
      }
      if (/bobot/i.test(msg) && "bobot" in b) { delete b.bobot; lengkap = false; continue; }
      throw e;
    }
  }
  throw new Error("Gagal menyimpan soal");
}
const pesanKolomBobot = () => "Soal tersimpan, tetapi BOBOT belum tersimpan karena kolom \"bobot\" belum ada di database.\n\nJalankan di Supabase > SQL Editor:\n\n" + SQL_KOLOM_BOBOT + "\n\nLalu simpan/upload ulang soalnya.";

// ============================================================
// CONSTANTS
// ============================================================
// Daftar mata pelajaran yang bisa dipilih guru saat membuat ujian.
// Tambah / hapus sesuai kebutuhan sekolah.
const MAPEL = [
  "Matematika","Bahasa Indonesia","Bahasa Inggris","IPA","IPS",
  "PKn","Agama","Informatika","PJOK","Prakarya",
];

// ============================================================
// KKM PER MAPEL — diatur admin di menu "Pengaturan"
// Disimpan di tabel Supabase "kkm" (mapel, nilai). Jika tabel belum dibuat,
// KKM disimpan di perangkat ini saja (cadangan) dan admin diberi tahu.
// ============================================================
const KKM_DEFAULT = 75;
const KKM_CACHE_KEY = "cbt_kkm_map_v1";
const kkmStore = { map: {}, sumber: "default" };   // sumber: db | lokal | default

function getKKM(mapel) {
  const v = Number(kkmStore.map[mapel]);
  return isFinite(v) && v > 0 ? v : KKM_DEFAULT;
}
const lulusKkm = (h) => (Number(h.nilai) || 0) >= getKKM(h.mapel);

async function muatKkm() {
  let lokal = {};
  try { lokal = JSON.parse(localStorage.getItem(KKM_CACHE_KEY) || "{}") || {}; } catch {}
  if (useDemo) { kkmStore.map = lokal; kkmStore.sumber = "lokal"; return; }
  try {
    const rows = await supabase("kkm?select=mapel,nilai");
    const m = {};
    rows.forEach(r => { m[r.mapel] = Number(r.nilai); });
    kkmStore.map = m; kkmStore.sumber = "db";
    try { localStorage.setItem(KKM_CACHE_KEY, JSON.stringify(m)); } catch {}
  } catch {
    kkmStore.map = lokal; kkmStore.sumber = "lokal";
  }
}

// Mengembalikan { sumber: "db" | "lokal", error? }
async function simpanKkm(map) {
  const bersih = {};
  MAPEL.forEach(m => {
    const v = Math.round(Number(map[m]));
    bersih[m] = v >= 1 && v <= 100 ? v : KKM_DEFAULT;
  });
  try { localStorage.setItem(KKM_CACHE_KEY, JSON.stringify(bersih)); } catch {}
  kkmStore.map = bersih;
  if (useDemo) { kkmStore.sumber = "lokal"; return { sumber: "lokal" }; }
  try {
    await supabase("kkm?on_conflict=mapel", {
      method: "POST",
      body: JSON.stringify(MAPEL.map(m => ({ mapel: m, nilai: bersih[m] }))),
      prefer: "resolution=merge-duplicates,return=minimal",
    });
    kkmStore.sumber = "db";
    return { sumber: "db" };
  } catch (e) {
    kkmStore.sumber = "lokal";
    return { sumber: "lokal", error: e.message };
  }
}

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
    { id: 4, pertanyaan: "Manakah bilangan prima? (Pilihan Ganda Kompleks)", opsi: ["2","4","5","9"], jawaban: 0, kunci_ganda: "AC", bobot: 3 },
    { id: 5, pertanyaan: "Ibu kota Indonesia adalah ...", opsi: [], jawaban: 0, tipe: "isian", kunci_isian: "Jakarta | DKI Jakarta", bobot: 2 },
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
  const [, setKkmVer] = useState(0);          // memicu render ulang setelah KKM berubah
  const isAdmin = guru && guru.username === "admin";

  const loadData = useCallback(async () => {
    setLoading(true);
    await muatKkm();                          // KKM per mapel (tidak pernah melempar error)
    setKkmVer(v => v + 1);
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
    ...(isAdmin ? [{ id: "pengaturan", icon: "⚙️", label: "Pengaturan" }] : []),
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
            {page === "pengaturan" && isAdmin && <PengaturanPage onSaved={() => setKkmVer(v => v + 1)} />}
          </>
        )}
      </div>
    </div>
  );
}

// ---- Pengaturan (khusus admin): KKM per mata pelajaran ----
const SQL_TABEL_KKM = `create table if not exists kkm (
  mapel text primary key,
  nilai integer not null default 75
);
alter table kkm enable row level security;
create policy "anon select kkm" on kkm for select to anon using (true);
create policy "anon insert kkm" on kkm for insert to anon with check (true);
create policy "anon update kkm" on kkm for update to anon using (true);`;

function PengaturanPage({ onSaved }) {
  const awal = () => Object.fromEntries(MAPEL.map(m => [m, String(getKKM(m))]));
  const [nilai, setNilai] = useState(awal);
  const [semua, setSemua] = useState("");
  const [saving, setSaving] = useState(false);
  const [info, setInfo] = useState(null);   // { tipe: "ok" | "lokal", pesan }
  const [salin, setSalin] = useState(false);

  const valid = MAPEL.every(m => { const v = Number(nilai[m]); return Number.isInteger(v) && v >= 1 && v <= 100; });

  const terapkanSemua = () => {
    const v = Number(semua);
    if (!Number.isInteger(v) || v < 1 || v > 100) return alert("Isi angka 1–100.");
    setNilai(Object.fromEntries(MAPEL.map(m => [m, String(v)])));
  };

  const simpan = async () => {
    if (!valid) return alert("Setiap KKM harus berupa angka bulat 1–100.");
    setSaving(true);
    const hasil = await simpanKkm(nilai);
    setSaving(false);
    onSaved && onSaved();
    if (hasil.sumber === "db") setInfo({ tipe: "ok", pesan: "✅ KKM tersimpan di database dan berlaku untuk semua guru." });
    else setInfo({ tipe: "lokal", pesan: "⚠️ KKM baru tersimpan di perangkat ini karena tabel \"kkm\" belum ada di database." + (hasil.error ? ` (${hasil.error})` : "") });
  };

  const salinSql = async () => {
    try { await navigator.clipboard.writeText(SQL_TABEL_KKM); setSalin(true); setTimeout(() => setSalin(false), 2000); } catch { alert(SQL_TABEL_KKM); }
  };

  return (
    <>
      <div className="page-header"><h1>Pengaturan</h1><p>Pengaturan khusus administrator</p></div>

      <div className="card">
        <div className="card-header"><h2>🎯 KKM per Mata Pelajaran</h2></div>
        <p style={{fontSize:"13px", color:"var(--gray)", lineHeight:"1.6", marginBottom:"16px"}}>
          KKM dipakai guru pada <strong>rekap nilai</strong> untuk menentukan status Lulus/Remedi. Siswa tidak melihat KKM maupun nilai.
          Perubahan berlaku untuk seluruh hasil ujian, termasuk yang sudah masuk.
        </p>

        <div style={{display:"flex", gap:"8px", flexWrap:"wrap", alignItems:"center", background:"var(--light)", borderRadius:"var(--radius2)", padding:"10px 14px", marginBottom:"16px"}}>
          <span style={{fontSize:"13px", fontWeight:"600"}}>Samakan semua mapel:</span>
          <input type="number" min="1" max="100" value={semua} onChange={e => setSemua(e.target.value)} placeholder="mis. 75"
            style={{width:"90px", padding:"7px 10px", borderRadius:"var(--radius2)", border:"1.5px solid var(--border)", fontSize:"14px"}} />
          <button type="button" className="btn btn-ghost" style={{padding:"7px 14px", fontSize:"13px"}} onClick={terapkanSemua}>Terapkan</button>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:"12px", marginBottom:"18px"}}>
          {MAPEL.map(m => {
            const v = Number(nilai[m]);
            const salah = !(Number.isInteger(v) && v >= 1 && v <= 100);
            return (
              <label key={m} style={{display:"flex", alignItems:"center", justifyContent:"space-between", gap:"10px", background:"#fff", border:`1.5px solid ${salah ? "var(--red)" : "var(--border)"}`, borderRadius:"var(--radius2)", padding:"10px 14px"}}>
                <span style={{fontSize:"14px", fontWeight:"600"}}>{m}</span>
                <input type="number" min="1" max="100" value={nilai[m]} onChange={e => setNilai(p => ({...p, [m]: e.target.value}))}
                  style={{width:"76px", padding:"7px 10px", borderRadius:"var(--radius2)", border:"1.5px solid var(--border)", fontSize:"15px", fontWeight:"700", textAlign:"center", fontFamily:"var(--mono)"}} />
              </label>
            );
          })}
        </div>

        <div style={{display:"flex", gap:"10px", alignItems:"center", flexWrap:"wrap"}}>
          <button className="btn btn-green" onClick={simpan} disabled={saving || !valid}>{saving ? "Menyimpan..." : "💾 Simpan KKM"}</button>
          <span style={{fontSize:"12px", color:"var(--gray)"}}>
            {kkmStore.sumber === "db" ? "Sumber: database (berlaku di semua perangkat)" : kkmStore.sumber === "lokal" ? "Sumber: perangkat ini saja" : "Sumber: bawaan (75)"}
          </span>
        </div>

        {info && (
          <div style={{marginTop:"14px", borderRadius:"var(--radius2)", padding:"10px 14px", fontSize:"13px", fontWeight:"600",
            background: info.tipe === "ok" ? "var(--green3)" : "var(--red3)", color: info.tipe === "ok" ? "var(--green2)" : "var(--red2)"}}>
            {info.pesan}
          </div>
        )}

        {(kkmStore.sumber === "lokal" || info?.tipe === "lokal") && !useDemo && (
          <div style={{marginTop:"16px", background:"#fffbeb", border:"1px solid #fcd34d", borderRadius:"var(--radius2)", padding:"14px 16px"}}>
            <div style={{fontSize:"13px", fontWeight:"700", color:"#92400e", marginBottom:"6px"}}>Agar KKM tersimpan di database, jalankan sekali di Supabase → SQL Editor:</div>
            <pre style={{margin:"0 0 10px", padding:"10px", background:"#fff", borderRadius:"8px", fontSize:"12px", overflowX:"auto", whiteSpace:"pre"}}>{SQL_TABEL_KKM}</pre>
            <button type="button" className="btn btn-ghost" style={{padding:"6px 14px", fontSize:"12px"}} onClick={salinSql}>{salin ? "✅ Tersalin" : "📋 Salin SQL"}</button>
            <span style={{fontSize:"12px", color:"#92400e", marginLeft:"10px"}}>Setelah itu klik Simpan KKM lagi.</span>
          </div>
        )}
      </div>
    </>
  );
}

// ---- Dashboard Overview ----
function DashboardPage({ ujianList, hasilList }) {
  const rataRata   = hasilList.length ? Math.round(hasilList.reduce((a,h) => a + (h.nilai||0), 0) / hasilList.length) : 0;
  const ujianAktif = ujianList.filter(u => u.aktif).length;
  const lulus      = hasilList.filter(lulusKkm).length;
  // Rata-rata KKM dari mapel yang ada di data (untuk pewarnaan grafik sebaran nilai)
  const kkmRata    = hasilList.length ? Math.round(hasilList.reduce((a,h) => a + getKKM(h.mapel), 0) / hasilList.length) : KKM_DEFAULT;
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
                const isLulus = b.min >= kkmRata;
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
              <div style={{width:10,height:10,borderRadius:2,background:"#22c55e"}}/>Di atas KKM
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
            <p style={{fontSize:11, color:"#94a3b8", marginBottom:20}}>Persentase siswa mencapai KKM (sesuai KKM tiap mapel)</p>
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
                          <div style={{width:`${Math.min(100,h.nilai||0)}%`, height:"100%", background: lulusKkm(h)?"#22c55e":"#f59e0b"}}/>
                        </div>
                        <strong style={{fontFamily:"var(--mono)"}}>{h.nilai}</strong>
                      </div>
                    </td>
                    <td><span className={`badge ${lulusKkm(h) ? "badge-green" : "badge-red"}`}>{lulusKkm(h) ? "Lulus" : "Remedi"}</span></td>
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
  const [form, setForm] = useState({ mapel: MAPEL[0], kelas: "", durasi: 60, jam_buka: "", jam_tutup: "", acak_soal: false, acak_opsi: false });
  const [saving, setSaving] = useState(false);
  const [confirmHapus, setConfirmHapus] = useState(null); // ujian yang akan dihapus

  // Simpan ujian. Jika kolom acak_soal/acak_opsi belum ada di Supabase, simpan tanpa kolom itu
  // dan beri tahu guru (supaya pembuatan ujian tidak gagal total).
  const simpanUjian = async (path, method, body) => {
    try {
      await supabase(path, { method, body: JSON.stringify(body) });
    } catch (e) {
      if (/acak_/i.test(e.message || "")) {
        const { acak_soal, acak_opsi, ...tanpaAcak } = body;
        await supabase(path, { method, body: JSON.stringify(tanpaAcak) });
        if (acak_soal || acak_opsi) {
          alert("Ujian tersimpan, tetapi pengaturan ACAK belum aktif karena kolomnya belum ada di database.\n\nJalankan di Supabase > SQL Editor:\n\nalter table ujian add column if not exists acak_soal boolean default false, add column if not exists acak_opsi boolean default false;\nnotify pgrst, 'reload schema';");
        }
      } else throw e;
    }
  };

  const resetForm = () => {
    setForm({ mapel: MAPEL[0], kelas: "", durasi: 60, jam_buka: "", jam_tutup: "", acak_soal: false, acak_opsi: false });
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
        await simpanUjian("ujian", "POST", { mapel: form.mapel, kelas: form.kelas, durasi: Number(form.durasi), key: genKey(), aktif: true, jam_buka: form.jam_buka || null, jam_tutup: form.jam_tutup || null, acak_soal: !!form.acak_soal, acak_opsi: !!form.acak_opsi });
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
        if (idx > -1) DEMO_UJIAN[idx] = { ...DEMO_UJIAN[idx], mapel: form.mapel, kelas: form.kelas, durasi: Number(form.durasi), jam_buka: form.jam_buka || null, jam_tutup: form.jam_tutup || null, acak_soal: !!form.acak_soal, acak_opsi: !!form.acak_opsi };
      } else {
        await simpanUjian(`ujian?id=eq.${editUjian.id}`, "PATCH", { mapel: form.mapel, kelas: form.kelas, durasi: Number(form.durasi), jam_buka: form.jam_buka || null, jam_tutup: form.jam_tutup || null, acak_soal: !!form.acak_soal, acak_opsi: !!form.acak_opsi });
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
    setForm({ mapel: ujian.mapel, kelas: ujian.kelas, durasi: ujian.durasi, jam_buka: ujian.jam_buka || "", jam_tutup: ujian.jam_tutup || "", acak_soal: !!ujian.acak_soal, acak_opsi: !!ujian.acak_opsi });
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
            <div style={{background:"#fff", border:"1.5px solid var(--border)", borderRadius:"var(--radius2)", padding:"14px 16px", marginBottom:"16px"}}>
              <div style={{fontSize:"13px", fontWeight:"700", color:"var(--navy3)", marginBottom:"10px"}}>🔀 Pengacakan (opsional)</div>
              <label style={{display:"flex", alignItems:"flex-start", gap:"10px", cursor:"pointer", marginBottom:"12px"}}>
                <input type="checkbox" checked={!!form.acak_soal} onChange={e => setForm(p=>({...p, acak_soal:e.target.checked}))} style={{width:"20px", height:"20px", marginTop:"2px", flexShrink:0}} />
                <span style={{fontSize:"13px", lineHeight:"1.5"}}>
                  <strong>Acak urutan soal</strong><br/>
                  <span style={{color:"var(--gray)", fontSize:"12px"}}>Tiap siswa mendapat urutan nomor yang berbeda. <b>Biarkan tidak dicentang</b> untuk Bahasa Inggris / Bahasa Indonesia atau soal dengan teks bacaan, agar soal tetap berurutan.</span>
                </span>
              </label>
              <label style={{display:"flex", alignItems:"flex-start", gap:"10px", cursor:"pointer"}}>
                <input type="checkbox" checked={!!form.acak_opsi} onChange={e => setForm(p=>({...p, acak_opsi:e.target.checked}))} style={{width:"20px", height:"20px", marginTop:"2px", flexShrink:0}} />
                <span style={{fontSize:"13px", lineHeight:"1.5"}}>
                  <strong>Acak urutan pilihan jawaban (A–D)</strong><br/>
                  <span style={{color:"var(--gray)", fontSize:"12px"}}>Jangan dicentang jika ada pilihan seperti "A dan B benar" atau "semua benar". Soal Benar/Salah tidak pernah diacak.</span>
                </span>
              </label>
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
                <div className="meta">Kelas {u.kelas} • {u.durasi} menit • {(u.soal||[]).length} soal • {u.acak_soal ? "🔀 soal diacak" : "soal berurutan"}</div>
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
// Kolom: No | Soal | A | B | C | D | Kunci Jawaban (A/B/C/D) | Bobot (opsional)
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
  const [form, setForm] = useState({ pertanyaan: "", gambar: "", opsi: ["","","",""], kunci: [0], bobot: "", tipe: "pg", kunciIsian: "" });
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
    setForm({ pertanyaan: "", gambar: "", opsi: ["","","",""], kunci: [0], bobot: "", tipe: "pg", kunciIsian: "" });
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
      const opsiHtml = isIsian(s)
        ? `<div class="opsi">Jawaban: ................................................</div>` +
          (withKunci ? `<div class="opsi benar">Kunci: ${esc(daftarKunciIsian(s).join(" / "))}</div>` : "")
        : s.opsi.map((o, i) => {
        const benar = withKunci && kunciIdx(s).includes(i);
        return `<div class="opsi${benar ? " benar" : ""}">${HRF[i]}. ${esc(o)}${benar ? " &nbsp;<b>(Kunci Jawaban)</b>" : ""}</div>`;
      }).join("");
      const gambarHtml = s.gambar
        ? `<div class="gambar"><img src="${esc(s.gambar)}" alt="Gambar soal" /></div>`
        : "";
      return `
        <div class="soal">
          <div class="pertanyaan"><b>${idx + 1}.</b> ${esc(s.pertanyaan)}${soalGanda(s) ? " <i>(Pilihan Ganda Kompleks: pilih semua jawaban yang benar)</i>" : ""}</div>
          ${gambarHtml}
          <div class="opsi-list">${opsiHtml}</div>
        </div>`;
    }).join("");

    const kunciRingkas = withKunci
      ? `<div class="kunci-box">
           <h3>Kunci Jawaban</h3>
           <div class="kunci-grid">
             ${soalList.map((s, idx) => `<span>${idx + 1}. <b>${isIsian(s) ? esc(daftarKunciIsian(s).join(" / ")) : kunciHuruf(s)}</b></span>`).join("")}
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
    const isianForm = form.tipe === "isian";
    if (isianForm) {
      if (daftarKunciIsian({ kunci_isian: form.kunciIsian }).length === 0) return alert("Kunci jawaban isian harus diisi.");
    } else if (form.opsi.some(o => !o.trim())) return alert("Semua opsi harus diisi.");
    const bobotNum = parseBobot(form.bobot);
    if (String(form.bobot).trim() && bobotNum === null) return alert("Bobot harus berupa angka lebih dari 0 (contoh: 2 atau 2.5).");
    const bobotSimpan = bobotNum === null ? 1 : bobotNum;
    const kunciForm = (form.kunci && form.kunci.length ? [...form.kunci] : [0]).sort((a, b) => a - b);
    const kunciExtra = isianForm
      ? { jawaban: 0, kunci_ganda: null }
      : { jawaban: kunciForm[0], kunci_ganda: kunciForm.length > 1 ? kunciForm.map(i => HURUF_KUNCI[i]).join("") : null };
    // Isian: kirim tipe+kunci_isian. Pilihan ganda: tidak kirim apa-apa (agar DB lama tetap jalan),
    // kecuali soal isian diubah menjadi pilihan ganda -> reset tipe.
    const tipeExtra = isianForm
      ? { tipe: "isian", kunci_isian: form.kunciIsian.trim() }
      : (editSoal && isIsian(editSoal) ? { tipe: "pg", kunci_isian: null } : {});
    const opsiSimpan = isianForm ? [] : [...form.opsi];
    setSaving(true);
    try {
      let bobotTersimpan = true;
      if (editSoal) {
        // MODE EDIT
        if (useDemo) {
          const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
          if (idx > -1) {
            const si = DEMO_UJIAN[idx].soal.findIndex(s => s.id === editSoal.id);
            if (si > -1) DEMO_UJIAN[idx].soal[si] = { ...editSoal, ...form, opsi: opsiSimpan, bobot: bobotSimpan, ...kunciExtra, ...tipeExtra };
          }
        } else {
          bobotTersimpan = await simpanSoalDb(`soal?id=eq.${editSoal.id}`, "PATCH", { pertanyaan: form.pertanyaan, gambar: form.gambar || null, opsi: opsiSimpan, ...kunciExtra, ...tipeExtra, bobot: bobotSimpan });
        }
        await onRefresh();
        setSoalList(prev => prev.map(s => s.id === editSoal.id ? { ...s, ...form, opsi: opsiSimpan, bobot: bobotSimpan, ...kunciExtra, ...tipeExtra } : s));
        resetForm();
        if (!bobotTersimpan) alert(pesanKolomBobot());
      } else {
        // MODE TAMBAH BARU
        const soalBaru = { ...form, opsi: opsiSimpan, bobot: bobotSimpan, ...kunciExtra, ...tipeExtra, id: Date.now() };
        if (useDemo) {
          const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
          if (idx > -1) { DEMO_UJIAN[idx].soal = [...(DEMO_UJIAN[idx].soal||[]), soalBaru]; }
        } else {
          bobotTersimpan = await simpanSoalDb("soal", "POST", { ujian_id: Number(selectedUjian), pertanyaan: form.pertanyaan, gambar: form.gambar || null, opsi: opsiSimpan, ...kunciExtra, ...tipeExtra, bobot: bobotSimpan });
        }
        await onRefresh();
        setSoalList(prev => [...prev, soalBaru]);
        resetForm();
        if (!bobotTersimpan) alert(pesanKolomBobot());
      }
    } catch(e) { alert("Gagal menyimpan: " + e.message); }
    setSaving(false);
  };

  const handleEdit = (s) => {
    setEditSoal(s);
    setForm({ pertanyaan: s.pertanyaan, gambar: s.gambar || "", opsi: isIsian(s) ? ["","","",""] : [...s.opsi], kunci: kunciIdx(s), bobot: s.bobot == null ? "" : String(s.bobot), tipe: isIsian(s) ? "isian" : "pg", kunciIsian: s.kunci_isian ?? "" });
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
    let col = { soal: 0, a: 1, b: 2, c: 3, d: 4, kunci: 5, bobot: -1 }; // format lama (tanpa bobot)
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
        bobot: cari(c => c.includes("bobot")),      // opsional
      };
      const { bobot: _b, ...wajib } = peta;
      if (Object.values(wajib).every(v => v >= 0)) col = peta;
      mulai = hdrIdx + 1;
    }

    for (let i = mulai; i < rows.length; i++) {
      const row = rows[i] || [];
      const get = (k) => (col[k] >= 0 ? String(row[col[k]] ?? "").trim() : "");
      const pertanyaan = get("soal");
      const opsi = [get("a"), get("b"), get("c"), get("d")];
      const pk = parseKunci(get("kunci"));             // "AB" = jawaban ganda

      // Baris kosong (template belum diisi) → lewati tanpa peringatan
      if (!pertanyaan && opsi.every(o => !o)) continue;

      // Soal ISIAN: kolom A-D kosong, jawaban diketik di kolom Kunci Jawaban (pisahkan beberapa jawaban dengan |)
      const kunciMentah = get("kunci");
      if (pertanyaan && opsi.every(o => !o) && kunciMentah) {
        hasil.push({
          id: Date.now() + i, pertanyaan, opsi: [], jawaban: 0, kunci_ganda: null,
          tipe: "isian", kunci_isian: kunciMentah,
          bobot: parseBobot(col.bobot >= 0 ? row[col.bobot] : null) ?? 1,
        });
        continue;
      }

      const jawaban = pk.idx.length ? pk.idx[0] : -1;
      // Buang opsi kosong di belakang: C & D kosong → soal Benar/Salah (hanya A dan B)
      while (opsi.length > 2 && !opsi[opsi.length - 1]) opsi.pop();
      const jumlahOpsi = opsi.filter(Boolean).length;
      if (!pertanyaan || jumlahOpsi < 2 || pk.idx.length === 0 || pk.idx.some(k => !opsi[k])) {
        hasil.dilewati++;
        continue;
      }
      hasil.push({
        id: Date.now() + i,
        pertanyaan,
        opsi: opsi.map(o => o || "-"),   // opsi kosong di tengah (jarang) diberi "-"
        jawaban,
        kunci_ganda: pk.idx.length > 1 ? pk.huruf : null,
        bobot: parseBobot(col.bobot >= 0 ? row[col.bobot] : null) ?? 1,   // koma -> titik, kosong = 1
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
      let bobot = 1;
      let kunciGanda = null;
      for (let i = 1; i < lines.length; i++) {
        const bbtMatch = lines[i].match(/^[Bb]obot\s*:\s*([\d.,]+)/);
        if (bbtMatch) bobot = parseBobot(bbtMatch[1]) ?? 1;
        const match = lines[i].match(/^([A-D])[\.\)]\s*(.+)/i);
        if (match) opsi.push(match[2].trim());
        const jwbMatch = lines[i].match(/^[Jj]awaban\s*:\s*(.+)$/);
        if (jwbMatch) {
          const pk = parseKunci(jwbMatch[1]);
          if (pk.idx.length) { jawaban = pk.idx[0]; kunciGanda = pk.idx.length > 1 ? pk.huruf : null; }
        }
      }
      if (pertanyaan && opsi.length >= 2 && jawaban < opsi.length) {
        hasil.push({ id: Date.now() + hasil.length, pertanyaan, opsi: opsi.slice(0,4), jawaban, kunci_ganda: kunciGanda, bobot });
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
    let bobotTersimpan = true;
    try {
      for (const s of previewSoal) {
        if (useDemo) {
          const idx = DEMO_UJIAN.findIndex(u => String(u.id) === selectedUjian);
          if (idx > -1) DEMO_UJIAN[idx].soal = [...(DEMO_UJIAN[idx].soal||[]), s];
        } else {
          const ok = await simpanSoalDb("soal", "POST", { ujian_id: Number(selectedUjian), pertanyaan: s.pertanyaan, opsi: s.opsi, jawaban: s.jawaban, kunci_ganda: s.kunci_ganda ?? null, bobot: s.bobot ?? 1, ...(isIsian(s) ? { tipe: "isian", kunci_isian: s.kunci_isian } : {}) });
          if (!ok) bobotTersimpan = false;
        }
        berhasil++;
      }
      await onRefresh();
      setPreviewSoal([]);
      setUploadStatus(`🎉 ${berhasil} soal berhasil diimport!`);
      if (!bobotTersimpan) alert(pesanKolomBobot());
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
          Guru dapat mengunduh template, mengisi soal di komputer (kolom <strong>No, Soal, A, B, C, D, Kunci Jawaban, Bobot</strong>),
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
              <div className="form-field">
                <label>🧩 Jenis Soal</label>
                <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
                  <button type="button" className={`btn ${form.tipe !== "isian" ? "btn-blue" : "btn-ghost"}`} style={{padding:"8px 16px", fontSize:"13px"}}
                    onClick={() => setForm(p => ({...p, tipe: "pg"}))}>🔘 Pilihan Ganda</button>
                  <button type="button" className={`btn ${form.tipe === "isian" ? "btn-blue" : "btn-ghost"}`} style={{padding:"8px 16px", fontSize:"13px"}}
                    onClick={() => setForm(p => ({...p, tipe: "isian"}))}>✏️ Isian Singkat (siswa mengetik jawaban)</button>
                </div>
              </div>
              {form.tipe !== "isian" && form.kunci.length > 1 && (
                <div style={{background:"var(--blue3)", color:"var(--blue2)", borderRadius:"var(--radius2)", padding:"8px 12px", fontSize:"12px", fontWeight:600, marginBottom:"12px"}}>
                  ☑️ Pilihan Ganda Kompleks: poin utuh jika semua kunci ({form.kunci.map(i => HURUF_KUNCI[i]).join("")}) dipilih; jika hanya sebagian, poin dibagi sesuai jumlah kunci; tiap pilihan yang salah mengurangi poin.
                </div>
              )}
              <div className="form-field" style={{background:"var(--yellow3)", border:"1.5px solid #fcd34d", borderRadius:"var(--radius2)", padding:"12px 14px"}}>
                <label>⚖️ Bobot Nilai Soal (opsional)</label>
                <div style={{display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap"}}>
                  <input
                    type="text" inputMode="decimal" value={form.bobot}
                    onChange={e => setForm(p => ({...p, bobot: e.target.value.replace(",", ".").replace(/[^0-9.]/g, "")}))}
                    placeholder="contoh: 2 atau 2.5 (kosong = 1)"
                    style={{maxWidth:"220px", fontFamily:"var(--mono)", fontWeight:"700"}}
                  />
                  <span style={{fontSize:"12px", color:"#92400e", lineHeight:"1.5"}}>
                    Soal mudah bobot kecil, soal sulit bobot besar. Pecahan pakai titik. Total bobot saat ini: <strong>{totalBobot(soalList.filter(x => !editSoal || x.id !== editSoal.id)) + (parseBobot(form.bobot) ?? 1)}</strong> — nilai akhir siswa otomatis dinormalkan ke <strong>maksimal 100</strong>.
                  </span>
                </div>
              </div>
              {form.tipe === "isian" ? (
                <div className="form-field" style={{background:"var(--green3)", border:"1.5px solid #86efac", borderRadius:"var(--radius2)", padding:"12px 14px"}}>
                  <label>✏️ Kunci Jawaban Isian</label>
                  <input
                    value={form.kunciIsian}
                    onChange={e => setForm(p => ({...p, kunciIsian: e.target.value}))}
                    placeholder="contoh: Jakarta | DKI Jakarta"
                    style={{fontWeight:"700"}}
                  />
                  <div style={{fontSize:"12px", color:"var(--navy3)", lineHeight:"1.6", marginTop:"8px"}}>
                    Siswa akan mengetik jawabannya sendiri. Jika ada lebih dari satu jawaban yang dianggap benar, pisahkan dengan tanda <strong>|</strong>.
                    Huruf besar/kecil dan spasi berlebih diabaikan; angka <strong>2,5</strong> dan <strong>2.5</strong> dianggap sama. Jawaban harus sama dengan salah satu kunci (tidak ada poin sebagian).
                  </div>
                  {daftarKunciIsian({ kunci_isian: form.kunciIsian }).length > 0 && (
                    <div style={{display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"8px"}}>
                      <span style={{fontSize:"12px", color:"var(--gray)"}}>Jawaban yang diterima:</span>
                      {daftarKunciIsian({ kunci_isian: form.kunciIsian }).map((k, i) => (
                        <span key={i} style={{fontSize:"12px", padding:"2px 10px", borderRadius:"99px", background:"white", border:"1px solid #86efac", color:"var(--green2)", fontWeight:700}}>{k}</span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (<>
              <label style={{fontSize:"13px", fontWeight:"700", color:"var(--navy3)", display:"block", marginBottom:"10px"}}>Pilihan Jawaban <span style={{color:"var(--green)", fontWeight:"600"}}>(✓ = Jawaban Benar{form.kunci.length > 1 ? ` — Pilihan Ganda Kompleks: ${form.kunci.map(i => HURUF_KUNCI[i]).join("")}` : "; klik lebih dari satu ✓ untuk Pilihan Ganda Kompleks"})</span></label>
              <div style={{display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px"}}>
                <button type="button" className={`btn ${form.opsi.length === 4 ? "btn-blue" : "btn-ghost"}`} style={{padding:"7px 14px", fontSize:"13px"}}
                  onClick={() => setForm(p => ({...p, opsi: [...p.opsi, "", "", "", ""].slice(0, 4).map((o, i) => p.opsi[i] ?? "")}))}>
                  Pilihan Ganda (A–D)
                </button>
                <button type="button" className={`btn ${form.opsi.length === 2 ? "btn-blue" : "btn-ghost"}`} style={{padding:"7px 14px", fontSize:"13px"}}
                  onClick={() => setForm(p => { const k = (p.kunci || [0]).filter(x => x < 2); return {...p, opsi: p.opsi.slice(0, 2), kunci: k.length ? k : [0]}; })}>
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
                <div key={i} className={`option-row ${form.kunci.includes(i) ? "correct" : ""}`}>
                  <div className="option-label">{h}</div>
                  <input value={form.opsi[i]} onChange={e => { const o = [...form.opsi]; o[i] = e.target.value; setForm(p=>({...p, opsi:o})); }} placeholder={`Opsi ${h} (boleh pakai shortcut sqrt, 1/2, x^2)`} />
                  <button className={`btn ${form.kunci.includes(i) ? "btn-green" : "btn-ghost"}`} title="Klik lebih dari satu pilihan untuk Pilihan Ganda Kompleks (jawaban lebih dari satu)" onClick={() => setForm(p => { let k = p.kunci.includes(i) ? p.kunci.filter(x => x !== i) : [...p.kunci, i]; if (!k.length) k = [i]; return {...p, kunci: k.sort((a, b) => a - b)}; })}>✓</button>
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
              </>)}
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
                  <strong>Baris 1 (Judul kolom):</strong> No | Soal | A | B | C | D | Kunci Jawaban | Bobot<br/>
                  <strong>Baris 2 dst:</strong> satu baris = satu soal. Kolom A–D diisi pilihan jawaban.<br/>
                  <strong>Kunci Jawaban:</strong> satu huruf A, B, C, atau D (ada dropdown di template). <strong>Pilihan Ganda Kompleks (jawaban lebih dari satu):</strong> tulis hurufnya digabung, mis. <strong>AB</strong> atau <strong>ACD</strong>. Poin diberikan sebagian: utuh jika semua benar, sebagian jika hanya sebagian benar, dan pilihan yang salah mengurangi poin.<br/>
                  <strong>Soal Isian Singkat:</strong> kosongkan kolom A–D, tulis jawaban yang benar di kolom Kunci Jawaban (beberapa jawaban dipisah tanda <strong>|</strong>, mis. Bandung | Kota Bandung).<br/>
                  <strong>Bobot:</strong> bobot tiap soal (mis. mudah 2, sedang 2.5, sulit 3). Pecahan pakai titik (2.5); koma (2,5) otomatis jadi titik. Kosong = 1. Nilai akhir otomatis dinormalkan sehingga <strong>maksimal 100</strong>.<br/>
                <strong>Soal Benar/Salah:</strong> isi hanya kolom A dan B, kosongkan C dan D. Kunci A atau B.
                </div>
                <div style={{marginTop:"10px", fontSize:"12px", background:"white", borderRadius:"6px", padding:"10px", fontFamily:"var(--mono)"}}>
                  <div style={{color:"var(--gray)", borderBottom:"1px solid var(--border)", paddingBottom:"4px", marginBottom:"4px"}}>No | Soal | A | B | C | D | Kunci Jawaban | Bobot</div>
                  <div>1 | Ibu kota Indonesia? | Bandung | Jakarta | Surabaya | Medan | B | 2</div>
                  <div>2 | 2 + 2 = ? | 3 | 5 | 4 | 6 | C | 2.5</div>
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
                  <div style={{fontSize:"14px", fontWeight:"700", marginBottom:"12px"}}>Preview {previewSoal.length} soal • total bobot {totalBobot(previewSoal)} <span style={{fontWeight:500, color:"var(--gray)", fontSize:"12px"}}>(nilai maksimal otomatis 100)</span>:</div>
                  {previewSoal.slice(0,3).map((s,i) => (
                    <div key={i} style={{border:"1px solid var(--border)", borderRadius:"var(--radius2)", padding:"12px", marginBottom:"8px", fontSize:"13px"}}>
                      <div style={{fontWeight:"600", marginBottom:"6px"}}>Soal {i+1}: {s.pertanyaan}</div>
                      <div style={{display:"flex", gap:"6px", flexWrap:"wrap"}}>
                        {isIsian(s) && <span style={{padding:"2px 10px", borderRadius:"99px", background:"var(--green3)", color:"var(--green2)", fontSize:"12px", fontWeight:700}}>✏️ Isian • Kunci: {daftarKunciIsian(s).join("  /  ")}</span>}
                        {s.opsi.map((o,j) => <span key={j} style={{padding:"2px 8px", borderRadius:"99px", background: kunciIdx(s).includes(j)?"var(--green3)":"var(--light)", color: kunciIdx(s).includes(j)?"var(--green2)":"var(--gray)", fontSize:"12px"}}>{HURUF[j]}. {o}</span>)}
                        {soalGanda(s) && <span style={{padding:"2px 8px", borderRadius:"99px", background:"var(--blue3)", color:"var(--blue2)", fontSize:"12px", fontWeight:700}}>☑️ Pilihan Ganda Kompleks: {kunciHuruf(s)}</span>}
                        <span style={{padding:"2px 8px", borderRadius:"99px", background:"var(--yellow3)", color:"#92400e", fontSize:"12px", fontWeight:700}}>⚖️ Bobot {s.bobot ?? 1}</span>
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
                  <strong>Belum punya format?</strong> Download template Word (tabel No | Soal | A | B | C | D | Kunci Jawaban | Bobot), isi soalnya, lalu upload kembali di bawah.
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
                  <div style={{color:"var(--green2)", fontWeight:"700"}}>Jawaban: B  <span style={{color:"var(--gray)", fontWeight:400}}>(Pilihan Ganda Kompleks: tulis mis. Jawaban: AB)</span></div>
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
                  <div style={{fontSize:"14px", fontWeight:"700", marginBottom:"12px"}}>Preview {previewSoal.length} soal • total bobot {totalBobot(previewSoal)} <span style={{fontWeight:500, color:"var(--gray)", fontSize:"12px"}}>(nilai maksimal otomatis 100)</span>:</div>
                  {previewSoal.slice(0,3).map((s,i) => (
                    <div key={i} style={{border:"1px solid var(--border)", borderRadius:"var(--radius2)", padding:"12px", marginBottom:"8px", fontSize:"13px"}}>
                      <div style={{fontWeight:"600", marginBottom:"6px"}}>Soal {i+1}: {s.pertanyaan}</div>
                      <div style={{display:"flex", gap:"6px", flexWrap:"wrap"}}>
                        {isIsian(s) && <span style={{padding:"2px 10px", borderRadius:"99px", background:"var(--green3)", color:"var(--green2)", fontSize:"12px", fontWeight:700}}>✏️ Isian • Kunci: {daftarKunciIsian(s).join("  /  ")}</span>}
                        {s.opsi.map((o,j) => <span key={j} style={{padding:"2px 8px", borderRadius:"99px", background: kunciIdx(s).includes(j)?"var(--green3)":"var(--light)", color: kunciIdx(s).includes(j)?"var(--green2)":"var(--gray)", fontSize:"12px"}}>{HURUF[j]}. {o}</span>)}
                        {soalGanda(s) && <span style={{padding:"2px 8px", borderRadius:"99px", background:"var(--blue3)", color:"var(--blue2)", fontSize:"12px", fontWeight:700}}>☑️ Pilihan Ganda Kompleks: {kunciHuruf(s)}</span>}
                        <span style={{padding:"2px 8px", borderRadius:"99px", background:"var(--yellow3)", color:"#92400e", fontSize:"12px", fontWeight:700}}>⚖️ Bobot {s.bobot ?? 1}</span>
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
                {soalList.length > 0 && <span className="badge badge-yellow" title="Nilai akhir siswa dinormalkan ke maksimal 100">⚖️ Total bobot {totalBobot(soalList)} → maks 100</span>}
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
                      <div style={{fontSize:"12px", fontWeight:"700", color:"var(--blue)", marginBottom:"6px", display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap"}}>
                        <span>SOAL {idx+1} {editSoal?.id === s.id ? "— ✏️ Sedang Diedit" : ""}</span>
                        {isIsian(s) && <span className="badge badge-green" style={{fontSize:"11px"}}>✏️ Isian Singkat</span>}
                        {soalGanda(s) && <span className="badge badge-blue" style={{fontSize:"11px"}}>☑️ Pilihan Ganda Kompleks: {kunciHuruf(s)}</span>}
                        <span className="badge badge-yellow" style={{fontSize:"11px"}}>⚖️ Bobot {bobotSoal(s)} • {poinSoal(s, soalList)} poin</span>
                      </div>
                      {s.gambar && (
                        <div style={{marginBottom:"8px", borderRadius:"6px", overflow:"hidden", border:"1px solid var(--border)", maxHeight:"120px", display:"flex", alignItems:"center", background:"var(--light)"}}>
                          <img src={s.gambar} alt="gambar soal" style={{maxHeight:"120px", objectFit:"contain", width:"100%"}} onError={e => e.target.style.display="none"} />
                        </div>
                      )}
                      <div style={{fontSize:"14px", fontWeight:"500", marginBottom:"10px"}}><MathText text={s.pertanyaan} /></div>
                      <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
                        {isIsian(s) && <span style={{fontSize:"12px", padding:"3px 10px", borderRadius:"99px", background:"var(--green3)", color:"var(--green2)", fontWeight:700}}>✏️ Isian Singkat • Kunci: {daftarKunciIsian(s).join("  /  ")}</span>}
                        {s.opsi.map((o,i) => (
                          <span key={i} style={{fontSize:"12px", padding:"3px 10px", borderRadius:"99px", background: kunciIdx(s).includes(i) ? "var(--green3)" : "var(--light)", color: kunciIdx(s).includes(i) ? "var(--green2)" : "var(--gray)", fontWeight: kunciIdx(s).includes(i) ? "700" : "500"}}>
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
                    <td><strong style={{fontFamily:"var(--mono)", color: lulusKkm(h)?"var(--green2)":"var(--red2)"}}>{h.nilai}</strong></td>
                    <td><span className={`badge ${lulusKkm(h)?"badge-green":"badge-red"}`}>{lulusKkm(h)?"Lulus":"Remedi"}</span></td>
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
  if (!n) return { n: 0, rata: 0, max: 0, min: 0, lulus: 0, remedi: 0, pct: 0, curiga: 0, kkm: KKM_DEFAULT };
  const nil = rows.map(h => Number(h.nilai) || 0);
  const lulus = rows.filter(lulusKkm).length;          // KKM mengikuti mapel tiap baris
  return {
    n,
    rata: Math.round(nil.reduce((a, b) => a + b, 0) / n),
    max: Math.max(...nil),
    min: Math.min(...nil),
    lulus,
    remedi: n - lulus,
    pct: Math.round((lulus / n) * 100),
    curiga: rows.filter(h => h.mencurigakan).length,
    kkm: Math.round(rows.reduce((a, h) => a + getKKM(h.mapel), 0) / n),   // rata-rata KKM (untuk pewarnaan rata-rata)
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

  const warnaNilai = (v, kkm) => v >= kkm ? "var(--green2)" : "var(--red2)";
  const barisSiswa = (list) => list.map((h, i) => [i + 1, h.nama_siswa, kelasLabel(h), h.mapel, h.benar, h.total, h.nilai, getKKM(h.mapel), lulusKkm(h) ? "Lulus" : "Remedi", h.pelanggaran || 0, h.mencurigakan ? "Ya" : "Tidak"]);
  const HEADER_SISWA = ["No", "Nama", "Kelas", "Mata Pelajaran", "Benar", "Total", "Nilai", "KKM", "Status", "Pelanggaran", "Mencurigakan"];

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
          ["No", "Nama", "Kelas", "Mata Pelajaran", "Benar", "Total", "Nilai", "KKM", "Status", "Pelanggaran"],
          ...grup[k].map((h, i) => [i + 1, h.nama_siswa, k, h.mapel, h.benar, h.total, h.nilai, getKKM(h.mapel), lulusKkm(h) ? "Lulus" : "Remedi", h.pelanggaran || 0]),
        ];
        const ws = XLSX.utils.aoa_to_sheet(aoa);
        ws["!cols"] = [{ wch: 5 }, { wch: 32 }, { wch: 9 }, { wch: 22 }, { wch: 7 }, { wch: 7 }, { wch: 7 }, { wch: 7 }, { wch: 9 }, { wch: 12 }];
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

        {fMapel && (
          <div style={{fontSize:"12px", color:"var(--gray)", marginBottom:"12px"}}>
            KKM {fMapel}: <strong>{getKKM(fMapel)}</strong> (diatur admin di menu Pengaturan)
          </div>
        )}

        {/* Ringkasan */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:"10px", marginBottom:"18px"}}>
          {[
            ["Hasil Masuk", ringkas.n, "#1d4ed8", "#dbeafe"],
            ["Rata-rata", ringkas.rata, warnaNilai(ringkas.rata, ringkas.kkm), "#f3e8ff"],
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
                          <td><strong style={{fontFamily:"var(--mono)", color: warnaNilai(r.rata, r.kkm)}}>{r.rata}</strong></td>
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
                        <tr><th>#</th><th>Nama</th><th>Mata Pelajaran</th><th>Benar</th><th>Total</th><th>Nilai</th><th>KKM</th><th>Status</th><th>Pelanggaran</th></tr>
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
                            <td><strong style={{fontFamily:"var(--mono)", color: warnaNilai(h.nilai, getKKM(h.mapel))}}>{h.nilai}</strong></td>
                            <td style={{fontFamily:"var(--mono)", color:"var(--gray)"}}>{getKKM(h.mapel)}</td>
                            <td><span className={`badge ${lulusKkm(h) ? "badge-green" : "badge-red"}`}>{lulusKkm(h) ? "Lulus" : "Remedi"}</span></td>
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
  const [soal] = useState(() => shuffleSoalDanOpsi(ujian.soal, !!ujian.acak_soal, !!ujian.acak_opsi));
  const [current, setCurrent] = useState(0);
  const [jawaban, setJawaban] = useState(Array(soal.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(ujian.durasi * 60);
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
  // ── ATURAN KETAT: 1 pelanggaran = ujian langsung terkunci ────
  // Hanya pengawas (kode kunci) yang bisa membuka kembali.
  const MAX_VIOLATIONS = 1;
  const ABAIKAN_MS = 2500;   // layar gelap/keluar < 2,5 detik = gangguan sistem singkat, hanya dicatat
  const BLUR_MS = 1500;      // jendela kehilangan fokus > 1,5 detik = pelanggaran
  const SPLIT_RATIO = 0.7;   // area jendela < 70% area layar (HP/tablet) = layar terbelah / jendela mengambang
  const pelanggaranAktifRef = useRef(false);   // cegah 1 kejadian terhitung berkali-kali
  useEffect(() => {
    if (!locked && !showWarning) pelanggaranAktifRef.current = false;
  }, [locked, showWarning]);

  // Pencatat pelanggaran terpusat: catat ke log + kunci ujian seketika
  const catatPelanggaran = (jenis, pesan, durasiDetik) => {
    if (submittedRef.current || pelanggaranAktifRef.current) return;
    pelanggaranAktifRef.current = true;
    riwayatPelanggaranRef.current = [
      ...riwayatPelanggaranRef.current,
      { waktu: new Date().toISOString(), level: "pelanggaran", jenis, ...(durasiDetik ? { durasi_detik: durasiDetik } : {}) },
    ];
    setTabViolation(v => v + 1);
    setLocked(true);
    setWarningMsg(`🔒 Ujian dikunci! ${pesan} Hubungi pengawas untuk membuka kunci.`);
    setShowWarning(true);
  };

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
        catatPelanggaran("keluar_fullscreen", "Anda keluar dari layar penuh.");
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
    };
  }, [submitting]);

  // ── Deteksi 1: meninggalkan aplikasi / pindah tab / layar mati ──
  // Berlaku untuk setiap kepergian >= 2,5 detik (tidak ada lagi toleransi 30-90 detik).
  useEffect(() => {
    const onVisibility = () => {
      if (submitting) return;
      if (document.hidden) {
        hiddenSinceRef.current = Date.now();
        setTimerPaused(true);
        return;
      }
      setTimerPaused(false);
      if (!hiddenSinceRef.current) return;
      const durasi = Date.now() - hiddenSinceRef.current;
      const detik = Math.round(durasi / 1000);
      hiddenSinceRef.current = null;
      if (durasi < ABAIKAN_MS) {
        riwayatPelanggaranRef.current = [
          ...riwayatPelanggaranRef.current,
          { waktu: new Date().toISOString(), durasi_detik: detik, level: "warning", jenis: "keluar_singkat" },
        ];
        return;
      }
      catatPelanggaran("tinggalkan_ujian", `Anda terdeteksi meninggalkan halaman ujian (${detik} detik).`, detik);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [submitting]);

  // ── Deteksi 2: jendela kehilangan fokus ─────────────────────
  // Menangkap kasus yang TIDAK memicu "layar gelap": layar terbelah/Slide Over, panel
  // notifikasi atau Control Center di iPhone, jendela mengambang, alt-tab di laptop.
  // Fokus yang pindah ke iframe Google Form dianggap normal.
  useEffect(() => {
    if (submitting) return;
    let t = null;
    const onBlur = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        if (document.hidden) return;                       // ditangani deteksi 1
        const ae = document.activeElement;
        if (ae && ae.tagName === "IFRAME") return;         // fokus di Google Form = normal
        if (document.hasFocus()) return;
        catatPelanggaran("jendela_kehilangan_fokus", "Layar ujian kehilangan fokus (membuka aplikasi/jendela lain, layar terbelah, atau panel notifikasi).");
      }, BLUR_MS);
    };
    const onFocus = () => clearTimeout(t);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      clearTimeout(t);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, [submitting]);

  // ── Deteksi 3: layar terbelah / 2 jendela / jendela mengambang ──
  // Khusus HP & tablet (layar sentuh). Ukuran jendela dibandingkan dengan ukuran layar
  // sebenarnya; saat split-screen jendela ujian mengecil jauh. Dicek saat resize,
  // saat rotasi, dan berkala (3 detik) karena sebagian browser tidak mengirim event resize.
  useEffect(() => {
    if (submitting) return;
    const sentuh = (navigator.maxTouchPoints || 0) > 0 && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    if (!sentuh) return;
    let abaikanSampai = Date.now() + 2500;      // beri waktu layar stabil saat mulai/rotasi
    let t = null;
    const rasio = () => {
      const w = window.screen.width, h = window.screen.height;
      const landscape = window.innerWidth > window.innerHeight;
      const sw = landscape ? Math.max(w, h) : Math.min(w, h);
      const sh = landscape ? Math.min(w, h) : Math.max(w, h);
      return (window.innerWidth * window.innerHeight) / (sw * sh);
    };
    const kecil = () => {
      const ae = document.activeElement;
      if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA")) return false; // keyboard virtual
      return rasio() < SPLIT_RATIO;
    };
    const periksa = () => {
      if (Date.now() < abaikanSampai || document.hidden) return;
      if (kecil()) catatPelanggaran("layar_terbelah", "Terdeteksi layar terbelah / dua jendela / jendela mengambang.");
    };
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(periksa, 1200);             // harus bertahan 1,2 detik (bukan transisi rotasi)
    };
    const onOrientation = () => { abaikanSampai = Date.now() + 2000; };
    const onFocusOut = () => { abaikanSampai = Date.now() + 2500; };   // keyboard virtual (soal isian) menutup
    document.addEventListener("focusout", onFocusOut);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientation);
    const iv = setInterval(periksa, 3000);
    const awal = setTimeout(periksa, 2600);
    return () => {
      clearTimeout(t); clearTimeout(awal); clearInterval(iv);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientation);
      document.removeEventListener("focusout", onFocusOut);
    };
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
        const progress = state.jawaban.filter(adaJawaban).length;
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
    setShowReview(false);

    const benar = soal.filter((s, i) => jawabanBenar(s, jawaban[i])).length;
    const nilai = hitungNilai(soal, jawaban);   // berbobot, maksimal 100
    const hasilData = {
      nama_siswa: siswa.nama, kelas: siswa.kelas, mapel: ujian.mapel,
      benar, total: soal.length, nilai, ujian_id: ujian.id,
      pelanggaran: tabViolation,
      mencurigakan: tabViolation >= 1,
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
  const dijawab = jawaban.filter(adaJawaban).length;
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
              <div key={i} style={{background:"white", borderRadius:"var(--radius2)", padding:"16px", border:`2px solid ${!adaJawaban(jawaban[i]) ? "var(--red)" : "var(--border)"}`, cursor:"pointer"}} onClick={() => { setShowReview(false); setCurrent(i); }}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"12px", fontWeight:"700", color:"var(--blue)", marginBottom:"4px"}}>Soal {i+1}</div>
                    <div style={{fontSize:"14px", color:"var(--navy)", marginBottom:"8px"}}>{s.pertanyaan.length > 80 ? s.pertanyaan.slice(0,80)+"..." : s.pertanyaan}</div>
                    {adaJawaban(jawaban[i]) ? (
                      <span style={{fontSize:"12px", padding:"3px 10px", borderRadius:"99px", background:"var(--blue3)", color:"var(--blue2)", fontWeight:"600"}}>
                        Jawaban: {typeof jawaban[i] === "string" ? jawaban[i] : (Array.isArray(jawaban[i]) ? jawaban[i] : [jawaban[i]]).map(k => `${HURUF[k]}. ${s.opsi[k]}`).join("  •  ")}
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

          {belumDijawab > 0 && (
            <div style={{background:"var(--red3)", color:"var(--red2)", borderRadius:"var(--radius2)", padding:"10px 14px", fontSize:"13px", fontWeight:"600", marginBottom:"12px", textAlign:"center"}}>
              ⚠️ Masih ada {belumDijawab} soal belum dijawab
            </div>
          )}
          <div style={{display:"flex", gap:"12px"}}>
            <button className="btn btn-ghost" style={{flex:1, padding:"14px"}} onClick={() => setShowReview(false)}>← Kembali ke Soal</button>
            <button className="btn btn-green" style={{flex:1, padding:"14px", fontSize:"15px", fontWeight:"700"}} onClick={() => handleSubmit(false)}>
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
                    mencurigakan: tabViolation >= 1,
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
            {soalGanda(soal[current]) && (
              <div style={{background:"var(--blue3)", color:"var(--blue2)", borderRadius:"var(--radius2)", padding:"8px 12px", fontSize:"13px", fontWeight:"700", marginBottom:"12px"}}>
                ☑️ Pilihan Ganda Kompleks: soal ini memiliki lebih dari satu jawaban benar. Pilih semua yang benar. Poin diberikan sebagian, dan pilihan yang salah mengurangi poin.
                <div style={{marginTop:"4px", fontFamily:"var(--mono)"}}>
                  Dipilih: {Array.isArray(jawaban[current]) && jawaban[current].length ? jawaban[current].map(k => HURUF[k]).join(", ") : "belum ada"}
                </div>
              </div>
            )}
            <div className="cbt-options">
              {isIsian(soal[current]) ? (
                <div>
                  <div style={{background:"var(--green3)", color:"var(--green2)", borderRadius:"var(--radius2)", padding:"8px 12px", fontSize:"13px", fontWeight:"700", marginBottom:"10px"}}>
                    ✏️ Soal Isian: ketik jawaban Anda pada kotak di bawah.
                  </div>
                  <textarea
                    value={typeof jawaban[current] === "string" ? jawaban[current] : ""}
                    disabled={locked}
                    onChange={e => {
                      const j = [...jawaban];
                      j[current] = e.target.value.trim() ? e.target.value : null;
                      setJawaban(j);
                    }}
                    rows={3}
                    placeholder="Ketik jawaban di sini..."
                    autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false}
                    style={{width:"100%", padding:"14px 16px", border:"2px solid var(--border)", borderRadius:"var(--radius2)", fontSize:"16px", fontFamily:"inherit", resize:"vertical", outline:"none"}}
                  />
                </div>
              ) : soal[current].opsi.map((o, i) => (
                <div key={i} className={`cbt-option ${terpilih(jawaban[current], i) ? "selected" : ""}`}
                  onClick={() => {
                    if (locked) return;
                    const j = [...jawaban];
                    if (soalGanda(soal[current])) {
                      const cur = Array.isArray(j[current]) ? j[current] : [];
                      const baru = cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i].sort((a, b) => a - b);
                      j[current] = baru.length ? baru : null;
                    } else j[current] = i;
                    setJawaban(j);
                  }}>
                  <div className="cbt-option-label" style={soalGanda(soal[current]) ? {borderRadius:"8px"} : undefined}>
                    {soalGanda(soal[current]) && terpilih(jawaban[current], i) ? "✓" : HURUF[i]}
                  </div>
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
                <button key={i} className={`cbt-num-btn ${adaJawaban(jawaban[i]) ? "answered" : ""} ${current === i ? "current" : ""}`} onClick={() => setCurrent(i)}>{i+1}</button>
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
        </div>
      </div>

    </div>
  );
}



// ============================================================
// RESULT SCREEN
// ============================================================
function ResultScreen({ result, onBack }) {
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
        <div style={{fontSize:"64px", lineHeight:1, marginBottom:"16px"}}>🎉</div>
        <h2 style={{marginBottom:"10px"}}>Selamat!</h2>
        <p style={{fontSize:"16px", lineHeight:1.6, color:"var(--navy3)", marginBottom:"8px"}}>
          Anda telah selesai melaksanakan <strong>Ujian Akhir Semester</strong>.
        </p>
        <p style={{fontSize:"13px", color:"var(--gray)", marginBottom:"24px"}}>{result.nama_siswa} • Kelas {result.kelas}{result.mapel ? ` • ${result.mapel}` : ""}</p>
        {!result.is_google_form && !useDemo && (
          <div style={{
            borderRadius:"var(--radius2)", padding:"10px 14px", marginBottom:"14px", fontSize:"13px", fontWeight:"600", textAlign:"left",
            background: sendStatus === "done" ? "var(--green3)" : sendStatus === "error" ? "var(--red3)" : "var(--blue3)",
            color: sendStatus === "done" ? "var(--green2)" : sendStatus === "error" ? "var(--red2)" : "var(--blue2)",
          }}>
            {sendStatus === "done" && "✅ Jawaban Anda sudah tersimpan."}
            {sendStatus === "sending" && "⏳ Mengirim jawaban... (jangan tutup halaman ini)"}
            {sendStatus === "error" && (
              <>
                ⚠️ Jawaban belum terkirim (koneksi bermasalah). Sistem mencoba lagi otomatis — jangan tutup halaman ini.
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
