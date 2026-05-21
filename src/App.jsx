import { useState, useEffect } from "react";

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const date = `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  return { time, date };
}

const TICKER_TEXT =
  "Selamat datang di Portal Ujian Digital SMPN 2 Muara Bungo \u2003\u2022\u2003 " +
  "Kejujuran adalah Karakter Utama dalam setiap Ujian \u2003\u2022\u2003 " +
  "Pastikan anda login sesuai peran masing-masing \u2003\u2022\u2003 " +
  "Dilarang keras bekerja sama selama ujian berlangsung \u2003\u2022\u2003 " +
  "Selamat mengerjakan ujian — semoga sukses! \u2003\u2022\u2003 " +
  "Portal Ujian Digital v.2026 — Desain: Herman Saputra, S.Pd., Gr. \u2003\u2003\u2003";

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────

function IconPencil({ size = 40, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconShield({ size = 40, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <circle cx="12" cy="11" r="2" />
      <path d="M12 13v3" />
    </svg>
  );
}

function IconClose({ size = 20, color = "#888" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconEye({ size = 18, color = "#aaa" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff({ size = 18, color = "#aaa" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

// ─── LOGIN MODAL ──────────────────────────────────────────────────────────────

function LoginModal({ role, onClose }) {
  const isSiswa = role === "siswa";

  const accent = isSiswa ? "#1565c0" : "#1b5e20";
  const accentLight = isSiswa ? "#e3f0ff" : "#e8f5e9";
  const accentText = isSiswa ? "#0d47a1" : "#1b5e20";
  const btnColor = isSiswa
    ? "linear-gradient(135deg,#1976d2,#1565c0)"
    : "linear-gradient(135deg,#2e7d32,#1b5e20)";

  const [nis, setNis] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [kelas, setKelas] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (isSiswa) {
      if (!nis.trim() || !password.trim() || !kelas) {
        setError("Harap lengkapi semua kolom!");
        return;
      }
      alert(`✅ Login Siswa Berhasil!\nNIS: ${nis}\nKelas: ${kelas}`);
    } else {
      if (!username.trim() || !password.trim()) {
        setError("Harap isi username dan kata sandi!");
        return;
      }
      alert(`✅ Login Admin Berhasil!\nUsername: ${username}`);
    }
    onClose();
  }

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(10,20,60,0.6)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.18s ease",
      }}
    >
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        width: "100%", maxWidth: "360px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
        overflow: "hidden",
        animation: "popUp 0.22s cubic-bezier(.34,1.56,.64,1)",
      }}>
        {/* Modal Header */}
        <div style={{
          background: isSiswa
            ? "linear-gradient(135deg,#1976d2,#0d47a1)"
            : "linear-gradient(135deg,#388e3c,#1b5e20)",
          padding: "24px 24px 20px",
          position: "relative",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "14px", right: "14px",
              background: "rgba(255,255,255,0.2)", border: "none",
              borderRadius: "50%", width: "32px", height: "32px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
          >
            <IconClose color="#fff" size={16} />
          </button>
          <div style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid rgba(255,255,255,0.4)",
          }}>
            {isSiswa ? <IconPencil size={32} /> : <IconShield size={32} />}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{
              fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px",
              color: "rgba(255,255,255,0.75)", textTransform: "uppercase", marginBottom: "3px",
            }}>
              {isSiswa ? "Portal Ujian" : "Bank Soal"}
            </div>
            <div style={{
              fontSize: "22px", fontWeight: 800, color: "#fff",
              letterSpacing: "1px", fontFamily: "'Segoe UI', sans-serif",
            }}>
              Login {isSiswa ? "Siswa" : "Admin"}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ padding: "22px 24px 24px" }}>
          {isSiswa ? (
            <>
              <Field label="Nomor Induk Siswa (NIS)" accent={accent}>
                <input
                  type="text"
                  value={nis}
                  onChange={e => setNis(e.target.value)}
                  placeholder="Masukkan NIS anda"
                  style={inputStyle(accent)}
                />
              </Field>
              <Field label="Kelas" accent={accent}>
                <select
                  value={kelas}
                  onChange={e => setKelas(e.target.value)}
                  style={inputStyle(accent)}
                >
                  <option value="">— Pilih Kelas —</option>
                  {["VII A","VII B","VII C","VIII A","VIII B","VIII C","IX A","IX B","IX C"]
                    .map(k => <option key={k}>{k}</option>)}
                </select>
              </Field>
            </>
          ) : (
            <Field label="Username Admin" accent={accent}>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Masukkan username"
                style={inputStyle(accent)}
              />
            </Field>
          )}

          <Field label="Kata Sandi" accent={accent}>
            <div style={{ position: "relative" }}>
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                style={{ ...inputStyle(accent), paddingRight: "42px" }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                style={{
                  position: "absolute", right: "12px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", padding: 0,
                }}
              >
                {showPwd ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </Field>

          {error && (
            <div style={{
              background: "#fff3f3", border: "1px solid #ffcdd2",
              borderRadius: "8px", padding: "8px 12px",
              fontSize: "12px", color: "#c62828", marginBottom: "12px",
            }}>
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%", padding: "13px",
              background: btnColor,
              border: "none", borderRadius: "10px",
              color: "#fff", fontSize: "15px", fontWeight: 800,
              letterSpacing: "1.5px", textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: isSiswa
                ? "0 4px 16px rgba(25,118,210,0.4)"
                : "0 4px 16px rgba(46,125,50,0.4)",
              transition: "opacity 0.15s, transform 0.1s",
              marginTop: "4px",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            Masuk →
          </button>

          <div style={{
            textAlign: "center", marginTop: "14px",
            fontSize: "11px", color: "#bbb",
          }}>
            Lupa kata sandi? Hubungi administrator sekolah.
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, accent, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{
        display: "block", fontSize: "11px", fontWeight: 700,
        color: "#666", letterSpacing: "0.5px",
        textTransform: "uppercase", marginBottom: "6px",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function inputStyle(accent) {
  return {
    width: "100%", padding: "10px 14px",
    border: "1.5px solid #dde3ee",
    borderRadius: "9px", fontSize: "14px",
    outline: "none", background: "#f8fafc",
    fontFamily: "inherit",
    transition: "border-color 0.15s, box-shadow 0.15s",
    color: "#333",
  };
}

// ─── PORTAL CARD ─────────────────────────────────────────────────────────────

function PortalCard({ role, onClick }) {
  const isSiswa = role === "siswa";
  const [hovered, setHovered] = useState(false);

  const bg = isSiswa
    ? (hovered ? "linear-gradient(145deg,#1e88e5,#1565c0)" : "linear-gradient(145deg,#2196f3,#1976d2)")
    : (hovered ? "linear-gradient(145deg,#43a047,#2e7d32)" : "linear-gradient(145deg,#4caf50,#388e3c)");

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "200px", minHeight: "170px",
        background: bg,
        border: `3px solid ${isSiswa ? "rgba(144,202,249,0.4)" : "rgba(165,214,167,0.4)"}`,
        borderRadius: "18px",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "10px",
        cursor: "pointer",
        boxShadow: hovered
          ? (isSiswa ? "0 12px 36px rgba(25,118,210,0.45)" : "0 12px 36px rgba(46,125,50,0.45)")
          : (isSiswa ? "0 6px 20px rgba(25,118,210,0.3)" : "0 6px 20px rgba(46,125,50,0.3)"),
        transform: hovered ? "translateY(-6px) scale(1.03)" : "translateY(0) scale(1)",
        transition: "all 0.2s cubic-bezier(.34,1.56,.64,1)",
        padding: "24px 16px",
      }}
    >
      <div style={{
        width: "60px", height: "60px", borderRadius: "50%",
        background: "rgba(255,255,255,0.18)",
        border: "2px solid rgba(255,255,255,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {isSiswa ? <IconPencil size={30} /> : <IconShield size={30} />}
      </div>
      <div>
        <div style={{
          fontSize: "20px", fontWeight: 900, color: "#fff",
          letterSpacing: "3px", textTransform: "uppercase",
          textAlign: "center",
          textShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}>
          {isSiswa ? "Siswa" : "Admin"}
        </div>
        <div style={{
          fontSize: "11px", color: "rgba(255,255,255,0.8)",
          textAlign: "center", marginTop: "2px", letterSpacing: "0.5px",
        }}>
          {isSiswa ? "Portal Ujian" : "Bank Soal"}
        </div>
      </div>
    </button>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const { time, date } = useClock();
  const [modal, setModal] = useState(null); // "siswa" | "admin" | null

  return (
    <>
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700;800;900&family=Barlow+Condensed:wght@700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Barlow', 'Segoe UI', sans-serif; background: #eef2f8; }
        select { appearance: auto; }

        @keyframes fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes popUp {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* ── TICKER BAR ────────────────────────────────────────── */}
        <div style={{
          background: "#0d2570",
          borderBottom: "3px solid #f0c020",
          display: "flex", alignItems: "stretch",
          overflow: "hidden", height: "34px",
        }}>
          <div style={{
            background: "#f0c020",
            color: "#0d2570",
            fontWeight: 800, fontSize: "11px",
            letterSpacing: "1.5px",
            padding: "0 14px",
            display: "flex", alignItems: "center",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            ▶ INFO
          </div>
          <div style={{ overflow: "hidden", flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{
              display: "inline-block",
              whiteSpace: "nowrap",
              animation: "ticker 30s linear infinite",
              color: "#fff",
              fontSize: "12.5px",
              paddingLeft: "20px",
            }}>
              {TICKER_TEXT.repeat(2)}
            </div>
          </div>
        </div>

        {/* ── HEADER ────────────────────────────────────────────── */}
        <div style={{
          background: "linear-gradient(160deg,#1a3a8f 0%,#0a1e5e 100%)",
          padding: "30px 24px 26px",
          position: "relative",
          textAlign: "center",
          borderBottom: "4px solid #f0c020",
        }}>

          {/* Clock */}
          <div style={{
            position: "absolute", top: "16px", right: "20px",
            textAlign: "right",
          }}>
            <div style={{
              fontSize: "30px", fontWeight: 900, color: "#f0c020",
              fontFamily: "'Barlow Condensed', monospace",
              letterSpacing: "3px", lineHeight: 1,
            }}>
              {time}
            </div>
            <div style={{
              fontSize: "11px", color: "rgba(255,255,255,0.65)",
              marginTop: "3px", letterSpacing: "0.3px",
            }}>
              {date}
            </div>
          </div>

          {/* Logo */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "#fff",
            border: "3px solid #f0c020",
            margin: "0 auto 14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}>
            <div style={{
              width: "58px", height: "58px", borderRadius: "50%",
              background: "linear-gradient(135deg,#1a3a8f,#0a1e5e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", fontWeight: 900, color: "#f0c020",
              letterSpacing: "-1px", fontFamily: "'Barlow Condensed', sans-serif",
            }}>
              SMPN2
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Barlow Condensed', 'Barlow', sans-serif",
            fontSize: "clamp(32px, 6vw, 60px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "3px",
            textTransform: "uppercase",
            lineHeight: 1.05,
            textShadow: "0 3px 12px rgba(0,0,0,0.4)",
          }}>
            Ujian Akhir Semester
          </h1>

          <div style={{
            width: "70px", height: "3px",
            background: "#f0c020",
            margin: "10px auto 8px",
            borderRadius: "2px",
          }} />

          <div style={{
            fontSize: "11px", color: "rgba(255,255,255,0.7)",
            letterSpacing: "3px", textTransform: "uppercase",
          }}>
            SMP Negeri 2 Muara Bungo
          </div>
        </div>

        {/* ── CARDS SECTION ─────────────────────────────────────── */}
        <div style={{
          flex: 1,
          background: "#eef2f8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          gap: "16px",
        }}>
          <p style={{
            fontSize: "13px", color: "#8899aa",
            letterSpacing: "1px", textTransform: "uppercase",
            fontWeight: 600, marginBottom: "8px",
          }}>
            Pilih Portal Login
          </p>

          <div style={{
            display: "flex",
            gap: "28px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <PortalCard role="siswa" onClick={() => setModal("siswa")} />
            <PortalCard role="admin" onClick={() => setModal("admin")} />
          </div>
        </div>

        {/* ── FOOTER ────────────────────────────────────────────── */}
        <footer style={{
          background: "#e4eaf4",
          borderTop: "1px solid #ccd5e6",
          padding: "12px 20px",
          textAlign: "center",
          fontSize: "11px",
          color: "#8899b0",
          lineHeight: 1.8,
        }}>
          Aplikasi Portal Ujian Digital v.2026
          <br />
          Pengembang:{" "}
          <span style={{ color: "#1a3a8f", fontWeight: 700 }}>
            Herman Saputra, S.Pd., Gr.
          </span>
        </footer>
      </div>

      {/* ── LOGIN MODAL ───────────────────────────────────────────── */}
      {modal && (
        <LoginModal role={modal} onClose={() => setModal(null)} />
      )}
    </>
  );
}
