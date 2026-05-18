// ============================================================================
// APP.JSX - CBT SMP NEGERI 2 BUNGO
// ============================================================================
// FITUR:
// ✅ Logo SMP Negeri 2 Bungo
// ✅ Login Admin dan Siswa
// ✅ Dashboard Admin
// ✅ Dashboard Siswa
// ✅ Daftar kelas 7A-7I dan 8A-8I
// ✅ Tampilan modern dan responsif
// ============================================================================

import React, { useState } from "react";

// ============================================================================
// KONFIGURASI SEKOLAH
// ============================================================================

// GANTI DENGAN FILE LOGO DI FOLDER /public/logo-smpn2-bungo.jpg
const LOGO_SEKOLAH = "/logo-smpn2-bungo.jpg";

const NAMA_SEKOLAH = "SMP NEGERI 2 BUNGO";
const NAMA_APLIKASI = "CBT Ujian Akhir Sekolah 2026";

const DAFTAR_KELAS = [
  "7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H", "7I",
  "8A", "8B", "8C", "8D", "8E", "8F", "8G", "8H", "8I"
];

// Akun Admin Default
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================

export default function App() {
  const [halaman, setHalaman] = useState("login");
  const [modeLogin, setModeLogin] = useState("siswa");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namaSiswa, setNamaSiswa] = useState("");
  const [kelasSiswa, setKelasSiswa] = useState("");
  const [pesan, setPesan] = useState("");
  const [userAktif, setUserAktif] = useState(null);

  // ==========================================================================
  // LOGIN
  // ==========================================================================

  const handleLogin = () => {
    setPesan("");

    if (modeLogin === "admin") {
      if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
      ) {
        setUserAktif({
          tipe: "admin",
          nama: "Administrator"
        });
        setHalaman("admin");
      } else {
        setPesan("Username atau password admin salah.");
      }
    } else {
      if (!namaSiswa.trim()) {
        setPesan("Nama siswa wajib diisi.");
        return;
      }

      if (!kelasSiswa) {
        setPesan("Silakan pilih kelas.");
        return;
      }

      setUserAktif({
        tipe: "siswa",
        nama: namaSiswa,
        kelas: kelasSiswa
      });

      setHalaman("siswa");
    }
  };

  const handleLogout = () => {
    setHalaman("login");
    setUsername("");
    setPassword("");
    setNamaSiswa("");
    setKelasSiswa("");
    setPesan("");
    setUserAktif(null);
  };

  // ==========================================================================
  // LOGIN PAGE
  // ==========================================================================

  if (halaman === "login") {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <img
            src={LOGO_SEKOLAH}
            alt="Logo SMP Negeri 2 Bungo"
            style={styles.logo}
          />

          <h1 style={styles.title}>{NAMA_APLIKASI}</h1>
          <h2 style={styles.subtitle}>{NAMA_SEKOLAH}</h2>

          {/* Pilihan Login */}
          <div style={styles.tabContainer}>
            <button
              style={{
                ...styles.tabButton,
                ...(modeLogin === "siswa" ? styles.tabActive : {})
              }}
              onClick={() => {
                setModeLogin("siswa");
                setPesan("");
              }}
            >
              Login Siswa
            </button>

            <button
              style={{
                ...styles.tabButton,
                ...(modeLogin === "admin" ? styles.tabActive : {})
              }}
              onClick={() => {
                setModeLogin("admin");
                setPesan("");
              }}
            >
              Login Admin
            </button>
          </div>

          {/* Form Login Siswa */}
          {modeLogin === "siswa" && (
            <>
              <input
                type="text"
                placeholder="Nama Lengkap Siswa"
                value={namaSiswa}
                onChange={(e) => setNamaSiswa(e.target.value)}
                style={styles.input}
              />

              <select
                value={kelasSiswa}
                onChange={(e) => setKelasSiswa(e.target.value)}
                style={styles.input}
              >
                <option value="">Pilih Kelas</option>
                {DAFTAR_KELAS.map((kelas) => (
                  <option key={kelas} value={kelas}>
                    {kelas}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* Form Login Admin */}
          {modeLogin === "admin" && (
            <>
              <input
                type="text"
                placeholder="Username Admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />

              <input
                type="password"
                placeholder="Password Admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </>
          )}

          {pesan && (
            <div style={styles.error}>
              {pesan}
            </div>
          )}

          <button
            onClick={handleLogin}
            style={styles.loginButton}
          >
            Masuk ke Sistem
          </button>

          <p style={styles.footer}>
            © 2026 SMP Negeri 2 Bungo
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // DASHBOARD ADMIN
  // ==========================================================================

  if (halaman === "admin") {
    return (
      <div style={styles.dashboard}>
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <img
              src={LOGO_SEKOLAH}
              alt="Logo"
              style={styles.headerLogo}
            />
            <div>
              <h2 style={styles.headerTitle}>
                Dashboard Admin
              </h2>
              <p style={styles.headerText}>
                {NAMA_SEKOLAH}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </header>

        <main style={styles.main}>
          <h3>Selamat Datang, Administrator</h3>
          <p>
            Kelola ujian, siswa, kelas, dan soal
            melalui dashboard ini.
          </p>

          <div style={styles.grid}>
            <Card
              title="👥 Data Siswa"
              desc="Tambah dan kelola data siswa"
            />
            <Card
              title="🏫 Data Kelas"
              desc="Kelas 7A–7I dan 8A–8I"
            />
            <Card
              title="📝 Bank Soal"
              desc="Input dan edit soal ujian"
            />
            <Card
              title="📅 Jadwal Ujian"
              desc="Atur waktu pelaksanaan ujian"
            />
            <Card
              title="📊 Hasil Ujian"
              desc="Lihat nilai dan ranking"
            />
            <Card
              title="⚙️ Pengaturan"
              desc="Konfigurasi aplikasi CBT"
            />
          </div>
        </main>
      </div>
    );
  }

  // ==========================================================================
  // DASHBOARD SISWA
  // ==========================================================================

  if (halaman === "siswa") {
    return (
      <div style={styles.dashboard}>
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <img
              src={LOGO_SEKOLAH}
              alt="Logo"
              style={styles.headerLogo}
            />
            <div>
              <h2 style={styles.headerTitle}>
                Dashboard Siswa
              </h2>
              <p style={styles.headerText}>
                {NAMA_SEKOLAH}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </header>

        <main style={styles.main}>
          <h3>
            Selamat Datang, {userAktif?.nama}
          </h3>

          <p>
            Kelas: <strong>{userAktif?.kelas}</strong>
          </p>

          <div style={styles.grid}>
            <Card
              title="📝 Mulai Ujian"
              desc="Kerjakan ujian yang tersedia"
            />
            <Card
              title="📘 Materi"
              desc="Lihat materi pembelajaran"
            />
            <Card
              title="📊 Nilai"
              desc="Lihat hasil ujian"
            />
            <Card
              title="👤 Profil"
              desc="Data siswa"
            />
          </div>
        </main>
      </div>
    );
  }

  return null;
}

// ============================================================================
// CARD COMPONENT
// ============================================================================

function Card({ title, desc }) {
  return (
    <div style={styles.cardMenu}>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0ea5e9, #1e3a8a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    background: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    textAlign: "center"
  },

  logo: {
    width: "120px",
    height: "120px",
    objectFit: "contain",
    marginBottom: "20px"
  },

  title: {
    margin: 0,
    fontSize: "28px",
    color: "#0f172a"
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "30px",
    fontSize: "20px",
    color: "#334155"
  },

  tabContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  tabButton: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "#f8fafc",
    cursor: "pointer",
    fontWeight: "bold"
  },

  tabActive: {
    background: "#2563eb",
    color: "#ffffff",
    borderColor: "#2563eb"
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "16px",
    boxSizing: "border-box"
  },

  loginButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#16a34a",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px"
  },

  footer: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#64748b"
  },

  dashboard: {
    minHeight: "100vh",
    background: "#f8fafc"
  },

  header: {
    background: "#1e3a8a",
    color: "#ffffff",
    padding: "20px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  headerLogo: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    background: "#ffffff",
    borderRadius: "50%",
    padding: "5px"
  },

  headerTitle: {
    margin: 0
  },

  headerText: {
    margin: 0,
    opacity: 0.9
  },

  logoutButton: {
    background: "#ef4444",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  main: {
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "25px"
  },

  cardMenu: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  }
};

