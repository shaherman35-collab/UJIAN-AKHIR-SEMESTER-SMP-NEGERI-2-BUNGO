import React, { useState } from "react";

// ============================================================================
// KONFIGURASI SEKOLAH
// ============================================================================

const LOGO_SEKOLAH = "/logo-smpn2-bungo.jpg";

const NAMA_APLIKASI = "UJIAN AKHIR SEKOLAH";
const NAMA_SEKOLAH = "SMP NEGERI 2 BUNGO";

const DAFTAR_KELAS = [
  "7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H", "7I",
  "8A", "8B", "8C", "8D", "8E", "8F", "8G", "8H", "8I"
];

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// ============================================================================
// APP
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
        setPesan("Username atau Password Admin Salah");
      }
    } else {
      if (!namaSiswa) {
        setPesan("Nama siswa wajib diisi");
        return;
      }

      if (!kelasSiswa) {
        setPesan("Silakan pilih kelas");
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

  const logout = () => {
    setHalaman("login");
    setUsername("");
    setPassword("");
    setNamaSiswa("");
    setKelasSiswa("");
    setPesan("");
  };

  // ==========================================================================
  // LOGIN PAGE
  // ==========================================================================

  if (halaman === "login") {
    return (
      <div style={styles.container}>

        {/* RUNNING TEXT */}
        <div style={styles.runningContainer}>
          <marquee scrollamount="7">
            📢 Portal Ujian Digital SMPN 2 Muara Bungo 2026 - 
            Kejujuran Adalah Karakter Utama - 
            Desain: Herman Saputra, S.Pd., Gr.
          </marquee>
        </div>

        <div style={styles.card}>

          {/* LOGO */}
          <img
            src={LOGO_SEKOLAH}
            alt="Logo SMP Negeri 2 Bungo"
            style={styles.logo}
          />

          {/* NAMA */}
          <h1 style={styles.title}>
            {NAMA_APLIKASI}
          </h1>

          <h2 style={styles.subtitle}>
            {NAMA_SEKOLAH}
          </h2>

          {/* TAB LOGIN */}
          <div style={styles.tabContainer}>

            <button
              style={{
                ...styles.tabButton,
                ...(modeLogin === "siswa"
                  ? styles.tabActive
                  : {})
              }}
              onClick={() => {
                setModeLogin("siswa");
                setPesan("");
              }}
            >
              LOGIN SISWA
            </button>

            <button
              style={{
                ...styles.tabButton,
                ...(modeLogin === "admin"
                  ? styles.tabActive
                  : {})
              }}
              onClick={() => {
                setModeLogin("admin");
                setPesan("");
              }}
            >
              LOGIN ADMIN
            </button>

          </div>

          {/* LOGIN SISWA */}
          {modeLogin === "siswa" && (
            <>
              <input
                type="text"
                placeholder="Nama Lengkap Siswa"
                value={namaSiswa}
                onChange={(e) =>
                  setNamaSiswa(e.target.value)
                }
                style={styles.input}
              />

              <select
                value={kelasSiswa}
                onChange={(e) =>
                  setKelasSiswa(e.target.value)
                }
                style={styles.input}
              >
                <option value="">
                  Pilih Kelas
                </option>

                {DAFTAR_KELAS.map((kelas) => (
                  <option key={kelas} value={kelas}>
                    {kelas}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* LOGIN ADMIN */}
          {modeLogin === "admin" && (
            <>
              <input
                type="text"
                placeholder="Username Admin"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                style={styles.input}
              />

              <input
                type="password"
                placeholder="Password Admin"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={styles.input}
              />
            </>
          )}

          {/* PESAN */}
          {pesan && (
            <div style={styles.error}>
              {pesan}
            </div>
          )}

          {/* BUTTON */}
          <button
            style={styles.loginButton}
            onClick={handleLogin}
          >
            MASUK KE SISTEM
          </button>

          {/* WATERMARK */}
          <div style={styles.watermark}>
            Aplikasi Portal Ujian Digital v.2026
            <br />
            Pengembang: Herman Saputra, S.Pd., Gr.
          </div>

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
                DASHBOARD ADMIN
              </h2>

              <p style={styles.headerText}>
                Ujian Akhir Sekolah SMP Negeri 2 Bungo
              </p>
            </div>

          </div>

          <button
            style={styles.logoutButton}
            onClick={logout}
          >
            Logout
          </button>
        </header>

        <main style={styles.main}>

          <h2>
            Selamat Datang Administrator
          </h2>

          <div style={styles.grid}>

            <MenuCard
              title="👨‍🎓 Data Siswa"
              desc="Kelola data siswa"
            />

            <MenuCard
              title="🏫 Data Kelas"
              desc="Kelas 7A - 8I"
            />

            <MenuCard
              title="📝 Bank Soal"
              desc="Input soal ujian"
            />

            <MenuCard
              title="📅 Jadwal Ujian"
              desc="Atur jadwal ujian"
            />

            <MenuCard
              title="📊 Nilai Siswa"
              desc="Lihat hasil ujian"
            />

            <MenuCard
              title="⚙️ Pengaturan"
              desc="Pengaturan sistem"
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
                DASHBOARD SISWA
              </h2>

              <p style={styles.headerText}>
                Ujian Akhir Sekolah SMP Negeri 2 Bungo
              </p>
            </div>

          </div>

          <button
            style={styles.logoutButton}
            onClick={logout}
          >
            Logout
          </button>

        </header>

        <main style={styles.main}>

          <h2>
            Selamat Datang,
            {" "}
            {userAktif?.nama}
          </h2>

          <p>
            Kelas:
            {" "}
            <b>{userAktif?.kelas}</b>
          </p>

          <div style={styles.grid}>

            <MenuCard
              title="📝 Mulai Ujian"
              desc="Kerjakan ujian"
            />

            <MenuCard
              title="📊 Hasil Ujian"
              desc="Lihat nilai"
            />

            <MenuCard
              title="📚 Materi"
              desc="Materi pembelajaran"
            />

            <MenuCard
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
// MENU CARD
// ============================================================================

function MenuCard({ title, desc }) {
  return (
    <div style={styles.menuCard}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

// ============================================================================
// STYLE
// ============================================================================

const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px"
  },

  runningContainer: {
    width: "100%",
    background: "#facc15",
    color: "#000",
    padding: "10px",
    fontWeight: "bold",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 999
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "25px",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.4)",
    textAlign: "center",
    marginTop: "80px"
  },

  logo: {
    width: "140px",
    height: "140px",
    objectFit: "contain",
    marginBottom: "20px"
  },

  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#0f172a"
  },

  subtitle: {
    fontSize: "24px",
    marginBottom: "30px",
    color: "#334155"
  },

  tabContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  tabButton: {
    flex: 1,
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#e2e8f0",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px"
  },

  tabActive: {
    background: "#2563eb",
    color: "#ffffff"
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
    padding: "15px",
    border: "none",
    borderRadius: "12px",
    background: "#16a34a",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px"
  },

  watermark: {
    marginTop: "25px",
    fontSize: "13px",
    color: "#64748b",
    lineHeight: "1.6"
  },

  dashboard: {
    minHeight: "100vh",
    background: "#f1f5f9"
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
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  main: {
    padding: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
    marginTop: "30px"
  },

  menuCard: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "20px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.1)"
  }

};
