/**
 * ============================================================================
 * DATA KONFIGURASI UTAMA — PT GARIS CERITA KARYA (GCK)
 * ============================================================================
 * File ini dirancang agar mudah di-update secara manual kapan saja.
 * Cukup ubah teks atau tambah item pada `portfolio`, `lab`, `connections`,
 * `team`, `archive`, atau `contact`.
 */

window.STUDIO_DATA = {
  // --------------------------------------------------------------------------
  // 1. PROFIL PERUSAHAAN & EKOSISTEM KONEKSI / VENDOR (ABOUT STUDIO)
  // --------------------------------------------------------------------------
  profile: {
    officialName: "PT Garis Cerita Karya",
    studioName: "Garis Cerita",
    shortName: "GCK",
    tagline: "Architecture, Engineering, Urban & Digital BIM Laboratory",
    established: 2019,
    locationShort: "Jakarta Selatan, Indonesia",
    description:
      "Studio arsitektur dan engineering di Jakarta Selatan yang mengerjakan proyek urban, masterplan, arsitektur, hingga interior—mulai dari skala rumah tinggal, komersial, korporasi, hingga proyek strategis pemerintah.",
    philosophyTitle: "Problem Solving & Values Discovering",
    philosophyQuote:
      "Perencanaan dan perancangan bukan sekadar tugas teknis, melainkan perjalanan mendalam untuk memecahkan masalah dan menemukan nilai intrinsik dari setiap ruang.",
    philosophyBody:
      "Di inti filosofi Garis Cerita (GCK), kami memandang setiap proyek sebagai kanvas tempat kami mengurai solusi atas tantangan spasial, struktural, dan finansial yang kompleks. Kami menggali nilai unik pada setiap tapak untuk menyatukan esensi tujuan (purpose), estetika kontekstual, keberlanjutan lingkungan, serta efisiensi fungsi.",
    vision:
      "Menjadi studio arsitektur, engineering, dan riset teknologi bangunan terdepan di Indonesia yang menjembatani kepekaan desain arsitektural dengan presisi rekayasa digital (BIM & Computational Feasibility).",
    missions: [
      "Menghadirkan solusi desain terintegrasi dari skala makro (Urban & Masterplan) hingga mikro (Arsitektur, Struktur, MEP, & Interior).",
      "Mengembangkan inovasi melalui laboratorium riset internal (GarisLab) mencakup Feasibility Study interaktif, OpenBIM 5D/6D, dan otomasi produksi gambar teknik.",
      "Menjunjung tinggi prinsip arsitektur berkelanjutan (Bangunan Gedung Hijau / Greenship) dan kearifan lokal Nusantara.",
      "Memberikan kepastian teknis, perizinan (STRA/SKA/IPTB/BGH), dan nilai investasi optimal bagi klien swasta maupun pemerintah."
    ],
    stats: [
      { value: "22+", label: "Karya Terkurasi di Portofolio" },
      { value: "13+", label: "Penghargaan Sayembara" },
      { value: "17", label: "Arsitek & Engineer Bersertifikasi" },
      { value: "2019", label: "Tahun Berdiri Resmi (PT GCK)" }
    ],
    services: [
      {
        id: "planning-design",
        title: "Planning & Design",
        items: ["Architecture Design", "Interior Design", "Urban & Masterplanning", "Landscape Architecture"],
        desc: "Eksplorasi konsep kontekstual hingga pengembangan desain terpadu untuk hunian, komersial, hospitality, dan fasilitas publik."
      },
      {
        id: "engineering",
        title: "Engineering Integration",
        items: ["Structure Engineering", "MEP Engineering (Mechanical, Electrical, Plumbing)", "Green Building (BGH / Greenship)"],
        desc: "Rekayasa struktur dan sistem utilitas bangunan yang efisien, aman, dan terkoordinasi penuh di dalam ekosistem BIM."
      },
      {
        id: "project-management",
        title: "Project Management & Supervision",
        items: ["Construction Supervision", "Project Inspection", "Quantity & Cost Control", "DED Production"],
        desc: "Pengawasan berkala dan manajemen mutu di lapangan guna memastikan desain terbangun sesuai presisi gambar kerja."
      },
      {
        id: "permit-license",
        title: "Licensed Team & Permit Advisory",
        items: ["Arsitek Utama IAI (STRA & SKA)", "IPTB DKI Jakarta", "Greenship Professional GBCI", "Sertifikasi BGH & PBG/SLF"],
        desc: "Pendampingan teknis dan pemenuhan standar regulasi bangunan gedung untuk kelancaran perizinan proyek di seluruh Indonesia."
      }
    ],
    workflow: [
      { step: "01", name: "Concept & Feasibility", desc: "Studi kelayakan tapak, regulasi KDB/KLB, program ruang, & gubahan massa." },
      { step: "02", name: "Schematic Design", desc: "Pra-rancangan arsitektur, sistem struktur awal, & simulasi iklim mikro." },
      { step: "03", name: "Design Development", desc: "Koordinasi lintas disiplin (Arsitektur, Struktur, MEP, Interior) berbasis BIM." },
      { step: "04", name: "For Construction (DED)", desc: "Gambar kerja detail konstruksi, spesifikasi material, & RKS." },
      { step: "05", name: "Project Visit & Supervision", desc: "Kunjungan pengawasan berkala & kendali mutu selama tahap konstruksi." }
    ],

    // Koneksi Strategis, Klien & Vendor Teknologi (Update Baru!)
    connections: {
      partners: [
        {
          name: "KSO PT Yodya Karya – PT Arkonin",
          role: "Strategic KSO Partner (Istana IKN)",
          badge: "Proyek Strategis Nasional",
          desc: "Kolaborasi kepemimpinan tim desain arsitektur dan manajemen rekayasa untuk kompleks Istana Negara IKN Nusantara."
        },
        {
          name: "PT Airmas Asri",
          role: "Architecture Collaboration Partner",
          badge: "High-Rise & Hospitality",
          desc: "Kemitraan kolaborasi desain untuk proyek ikonik skala besar: Tunjungan Boulevard Surabaya, Al Marjan Ras Al Khaimah Dubai, & Skybridge AEON Sentul."
        },
        {
          name: "Ketira Engineering",
          role: "Structural Engineering Associate",
          badge: "Struktur Bentang Lebar",
          desc: "Kolaborasi rekayasa struktur khusus untuk jembatan langit (Skybridge) dan bangunan bertingkat tinggi."
        },
        {
          name: "Whai Collaborative",
          role: "Design Studio Network",
          badge: "Sayembara & Riset",
          desc: "Jejaring kolaboratif lintas studio untuk sayembara arsitektur dan pengembangan gagasan urban kontemporer."
        },
        {
          name: "Ikatan Arsitek Indonesia (IAI)",
          role: "Professional Licensing Body",
          badge: "STRA & SKA Utama",
          desc: "Lisensi praktik profesional Arsitek Utama & Madya untuk penandatanganan dokumen perizinan bangunan gedung (PBG/IPTB)."
        },
        {
          name: "PERKINDO & GBCI",
          role: "Association & Green Council",
          badge: "SBU & Greenship",
          desc: "Sertifikasi Badan Usaha Konsultan Konstruksi (PERKINDO) serta akreditasi Bangunan Gedung Hijau (GBCI Greenship Professional)."
        }
      ],
      vendors: [
        {
          name: "Autodesk Revit, Forma & AutoCAD",
          category: "Core BIM & Urban Massing Vendor",
          badge: "BIM Authoring & CDE",
          desc: "Platform utama pemodelan 3D parametrik lintas disiplin (ARC-STR-MEP), analisis angin/matahari tapak, dan produksi gambar DED."
        },
        {
          name: "Trimble SketchUp & OpenBIM (.IFC)",
          category: "Conceptual 3D & Interoperability",
          badge: "ISO 19650 / IFC 4",
          desc: "Eksplorasi cepat gubahan massa arsitektur serta pertukaran model terbuka berbasis standar IFC untuk ekstraksi QTO 5D/6D."
        },
        {
          name: "Rhinoceros 3D & Grasshopper",
          category: "Computational & Parametric Geometry",
          badge: "Algorithmic Design",
          desc: "Pemodelan fasad sekunder kompleks, kurva atap organik Nusantara, serta optimasi modul selubung bangunan."
        },
        {
          name: "Three.js WebGL & GSAP",
          category: "Interactive 3D Web Visualization",
          badge: "Open-Source 3D Engine",
          desc: "Teknologi grafis 3D real-time di browser tanpa instalasi aplikasi berat—mendukung presentasi studio & dashboard interaktif."
        },
        {
          name: "GitHub Pages & GarisLab CI/CD",
          category: "Open-Source Lab & Web Hosting",
          badge: "github.com/garislab",
          desc: "Infrastruktur publikasi riset feasibility study (PSA_LB & PSA_Mblock), otomasi skrip AutoSheet AI, dan repositori alat bantu studio."
        }
      ]
    },

    clients: [
      { name: "Pemprov DKI Jakarta", category: "Pemerintah" },
      { name: "Otorita IKN (via KSO)", category: "Pemerintah" },
      { name: "Sinarmas Land", category: "Developer" },
      { name: "Bank Negara Indonesia (BNI)", category: "BUMN / Perbankan" },
      { name: "Wings Group", category: "Korporasi" },
      { name: "Perumda Sarana Jaya", category: "BUMD DKI" },
      { name: "The East Jakarta", category: "Komersial" },
      { name: "Adhi Karya / Adhi Persada", category: "BUMN Konstruksi" },
      { name: "PT Arkonin", category: "Engineering & Konstruksi" },
      { name: "MAKA Motors", category: "Industri EV" },
      { name: "Sentul City / AEON", category: "Developer" },
      { name: "Ciputra Development", category: "Developer" },
      { name: "Gunasland", category: "Developer" },
      { name: "Damar Langit Resort", category: "Hospitality" }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. RESEARCH & LAB STUDI (KOMPUTER — GARISLAB + LIVE GITHUB API)
  // --------------------------------------------------------------------------
  lab: {
    githubOrgUrl: "https://github.com/garislab",
    githubApiUrl: "https://api.github.com/users/garislab/repos?sort=updated&per_page=20",
    githubOrgName: "@garislab",
    profileScreenshot: "assets/images/lab/garislab-github.jpg",
    intro:
      "Daftar riset & perangkat asli pada akun GitHub resmi Garis Cerita Lab (github.com/garislab): mencakup 4 Web App interaktif yang tayang di GitHub Pages (PSA_Mblock, PSA_LB, 5D_Dashboard_Prototype, Garis-BIM-Simulation-Prototype) serta 4 repositori engine & plugin desktop (Garis-BIM-Simulation, revit_plugin_GCK_dev, skp_plugin_BOQ, skp_plugin_airender).",
    categories: [
      { id: "all", label: "Semua Repo @garislab", count: 8 },
      { id: "feasibility", label: "Feasibility Study", badge: "PSA Live", count: 2 },
      { id: "bim", label: "Katalog BIM", badge: "5D & Simulasi", count: 3 },
      { id: "tools", label: "Katalog Tools & Plugin", count: 3 }
    ],
    items: [
      // === 1. KATALOG FEASIBILITY STUDY (2 LIVE WEB APPS DI GARISLAB) ===
      {
        id: "psa-mblock",
        repoName: "PSA_Mblock",
        title: "PSA_Mblock — Public Space Analysis Blok M",
        code: "FS-01 / PSA_MBLOCK",
        category: "feasibility",
        featured: true,
        hasLivePages: true,
        status: "GitHub Pages Live",
        language: "HTML · JS · 3D Map",
        year: "2026",
        screenshot: "assets/images/lab/psa-mblock.jpg",
        screenshotCaption: "Tampilan live garislab.github.io/PSA_Mblock/ — Place Diagram PPS (71/100) & Kelayakan AHP (70/100) Kawasan Inti Blok M (29 Ha)",
        description:
          "Aplikasi web analisis ruang publik & kelayakan kawasan inti Blok M, Jakarta Selatan (29 Ha: M Bloc Space, Taman Literasi, MRT Blok M BCA, Plaza Blok M, Blok M Square). Menilai kawasan dengan 4 atribut Project for Public Spaces (PPS: Skor 71/100, 21 indikator terukur) yang dibandingkan dengan skor kelayakan AHP (70/100).",
        metrics: [
          { label: "Place Diagram PPS", value: "71 / 100 (Layak)" },
          { label: "Kelayakan AHP", value: "70 / 100 (4 Parameter)" },
          { label: "Kawasan Inti", value: "29 Ha · Blok M" }
        ],
        tags: ["PSA_Mblock", "Feasibility Study", "Place Diagram PPS", "AHP Blok M"],
        liveUrl: "https://garislab.github.io/PSA_Mblock/",
        repoUrl: "https://github.com/garislab/PSA_Mblock"
      },
      {
        id: "psa-lb",
        repoName: "PSA_LB",
        title: "PSA_LB — Public Space Analysis MRT Lebak Bulus",
        code: "FS-02 / PSA_LB",
        category: "feasibility",
        featured: true,
        hasLivePages: true,
        status: "GitHub Pages Live",
        language: "HTML · JS · 3D Map",
        year: "2026",
        screenshot: "assets/images/lab/psa-lb.jpg",
        screenshotCaption: "Tampilan live garislab.github.io/PSA_LB/ — Place Diagram PPS (58/100) & Kelayakan AHP (55/100) Kawasan TOD Lebak Bulus (50 Ha)",
        description:
          "Aplikasi web analisis ruang publik & kelayakan kawasan transit MRT Lebak Bulus, Jakarta Selatan (50 Ha: Stasiun MRT Lebak Bulus, Terminal Pasar Jumat, Rusun Kementerian PUPR). Mengevaluasi 4 atribut PPS (Skor 58/100 dari 18 indikator terukur: Akses 62, Nyaman 39, Guna 71, Sosial 59) dan skor kelayakan AHP (55/100).",
        metrics: [
          { label: "Place Diagram PPS", value: "58 / 100 (18 Indikator)" },
          { label: "Kelayakan AHP", value: "55 / 100 (Layak Bersyarat)" },
          { label: "Kawasan Inti", value: "50 Ha · Lebak Bulus" }
        ],
        tags: ["PSA_LB", "Feasibility Study", "TOD Lebak Bulus", "Spatial Analysis"],
        liveUrl: "https://garislab.github.io/PSA_LB/",
        repoUrl: "https://github.com/garislab/PSA_LB"
      },

      // === 2. KATALOG BIM (3 REPOSITORI ASLI DI GARISLAB) ===
      {
        id: "5d-dashboard-prototype",
        repoName: "5D_Dashboard_Prototype",
        title: "5D_Dashboard_Prototype — 5D Cost, RAB & 3D GLB Viewer",
        code: "BIM-01 / 5D_DASHBOARD",
        category: "bim",
        featured: true,
        hasLivePages: true,
        status: "GitHub Pages Live",
        language: "HTML · Three.js GLB",
        year: "2026",
        screenshot: "assets/images/lab/5d-dashboard-prototype.jpg",
        screenshotCaption: "Tampilan live garislab.github.io/5D_Dashboard_Prototype/ — Ringkasan RAB Rp 984,6 jt & Model 3D GLB (2.526 elemen)",
        description:
          "Prototype dashboard BIM 5D interaktif (Ringkasan, RAB, Render) untuk proyek Fasilitas Toilet Outdoor / Rest Room Tennis Court InterContinental Bali, Nusa Dua. Mengintegrasikan 2.526 elemen mesh 3D GLB dengan kalkulasi 55 item pekerjaan (Total RAB Rp 984,6 Juta; porsi Arsitektur Rp 789,4 Juta / 80,2%) lengkap dengan filter elemen, slider potongan, dan urai (explode).",
        metrics: [
          { label: "Total RAB", value: "Rp 984,6 Jt (55 Item)" },
          { label: "Elemen Model 3D", value: "2.526 Mesh pada GLB" },
          { label: "Kategori Terbesar", value: "Arsitektur (80,2%)" }
        ],
        tags: ["5D BIM", "RAB Interaktif", "GLB 3D Viewer", "Cost Breakdown"],
        liveUrl: "https://garislab.github.io/5D_Dashboard_Prototype/",
        repoUrl: "https://github.com/garislab/5D_Dashboard_Prototype"
      },
      {
        id: "garis-bim-simulation-prototype",
        repoName: "Garis-BIM-Simulation-Prototype",
        title: "Garis-BIM-Simulation-Prototype — ARS Bldg Foodhub Simulator",
        code: "BIM-02 / BIM_SIM_PROTO",
        category: "bim",
        featured: true,
        hasLivePages: true,
        status: "GitHub Pages Live",
        language: "JavaScript · IFC2X3",
        year: "2026",
        screenshot: "assets/images/lab/garis-bim-simulation-prototype.jpg",
        screenshotCaption: "Tampilan live garislab.github.io/Garis-BIM-Simulation-Prototype/ — Simulasi 5 Aspek Fisika Bangunan pada Model IFC2X3",
        description:
          "Prototype interaktif di browser untuk proyek Garis BIM Simulation (ARS Bldg Foodhub · IFC2X3). Membaca model IFC dan mengevaluasi 5 aspek performa terhadap target: Energy, Heat (10.6 h), Daylight (sDA 300 lux: 100% ✓), Airflow (Stagnant area: 30% ✓), dan Noise (73 dB(A)), lengkap dengan simulasi 11 solusi desain pasif & aktif.",
        metrics: [
          { label: "Standar Model", value: "IFC2X3 · 5 Aspek Fisika" },
          { label: "Daylight & Airflow", value: "sDA 100% ✓ · Airflow 30% ✓" },
          { label: "Intervensi", value: "11 Solusi Desain Interaktif" }
        ],
        tags: ["BIM Simulation", "IFC2X3", "Daylight & Airflow", "Thermal Comfort"],
        liveUrl: "https://garislab.github.io/Garis-BIM-Simulation-Prototype/",
        repoUrl: "https://github.com/garislab/Garis-BIM-Simulation-Prototype"
      },
      {
        id: "garis-bim-simulation",
        repoName: "Garis-BIM-Simulation",
        title: "Garis-BIM-Simulation — Web App Simulasi Kinerja Bangunan (IFC)",
        code: "BIM-03 / BIM_SIM_SERVER",
        category: "bim",
        featured: false,
        hasLivePages: false,
        status: "GitHub Repo (FastAPI)",
        language: "JS · Python · CSS · HTML",
        year: "2026",
        screenshot: "assets/images/lab/garis-bim-simulation.jpg",
        screenshotCaption: "Tampilan repositori github.com/garislab/Garis-BIM-Simulation — Full-Stack Server Lokal (Python FastAPI + Web IFC)",
        description:
          "Repositori aplikasi web penuh (server lokal Python FastAPI + frontend web) untuk simulasi kinerja bangunan berbasis model BIM (IFC). Mendukung pemeriksaan model pra-simulasi, jaringan termal RC per zona, raytrace pencahayaan alami, aliran udara Lattice Boltzmann D2Q9, kebisingan sumber garis, panen air hujan, serta evaluasi BGH, Greenship, LEED, & EDGE.",
        metrics: [
          { label: "Arsitektur", value: "Python FastAPI + Web" },
          { label: "Engine Simulasi", value: "Thermal RC · LBM D2Q9" },
          { label: "Sertifikasi Hijau", value: "BGH · Greenship · LEED" }
        ],
        tags: ["OpenBIM IFC", "Python FastAPI", "Green Building BGH", "Building Physics"],
        liveUrl: "https://garislab.github.io/Garis-BIM-Simulation-Prototype/",
        repoUrl: "https://github.com/garislab/Garis-BIM-Simulation"
      },

      // === 3. KATALOG TOOLS & PLUGIN (3 REPOSITORI ASLI DI GARISLAB) ===
      {
        id: "revit-plugin-gck-dev",
        repoName: "revit_plugin_GCK_dev",
        title: "revit_plugin_GCK_dev — Plugin Autodesk Revit GCK",
        code: "TOOL-01 / REVIT_PLUGIN",
        category: "tools",
        featured: false,
        hasLivePages: false,
        status: "GitHub Repo (C# .EXE)",
        language: "C# · Revit API",
        year: "2026",
        screenshot: "assets/images/lab/revit-plugin-gck-dev.jpg",
        screenshotCaption: "Tampilan repositori github.com/garislab/revit_plugin_GCK_dev — Distribusi GCKPlugin_Setup.exe untuk Autodesk Revit",
        description:
          "Repositori pengembangan plugin internal Autodesk Revit oleh Garis Cerita Lab (C#). Menyediakan paket instalasi GCKPlugin_Setup.exe untuk mengotomasi tugas dokumentasi BIM, standarisasi parameter proyek GCK, serta efisiensi produksi gambar kerja di lingkungan Revit.",
        metrics: [
          { label: "Installer", value: "GCKPlugin_Setup.exe" },
          { label: "Bahasa & API", value: "C# · Autodesk Revit API" },
          { label: "Lisensi", value: "MIT License · GarisLab" }
        ],
        tags: ["Revit Plugin", "C# .NET", "BIM Automation", "GCKPlugin_Setup"],
        liveUrl: "https://github.com/garislab/revit_plugin_GCK_dev",
        repoUrl: "https://github.com/garislab/revit_plugin_GCK_dev"
      },
      {
        id: "skp-plugin-boq",
        repoName: "skp_plugin_BOQ",
        title: "skp_plugin_BOQ — Plugin SketchUp Bill of Quantities (GC_BOQ)",
        code: "TOOL-02 / SKP_BOQ",
        category: "tools",
        featured: false,
        hasLivePages: false,
        status: "GitHub Repo (.RBZ)",
        language: "Ruby · HTML Dialog",
        year: "2026",
        screenshot: "assets/images/lab/skp-plugin-boq.jpg",
        screenshotCaption: "Tampilan repositori github.com/garislab/skp_plugin_BOQ — Paket Ekstensi GC_BOQ_v1.0.1.rbz untuk SketchUp",
        description:
          "Plugin ekstensi Trimble SketchUp (GC_BOQ_v1.0.1 / GC_BOQ_v1.0.1.rbz) karya Garis Cerita Lab untuk mengotomasi perhitungan volume elemen 3D dan menyusun laporan Bill of Quantities (BOQ) / estimasi kuantitas material langsung dari model SketchUp.",
        metrics: [
          { label: "Paket Rilis", value: "GC_BOQ_v1.0.1.rbz" },
          { label: "Platform", value: "SketchUp Ruby + HTML UI" },
          { label: "Output", value: "Automated BOQ & Volume" }
        ],
        tags: ["SketchUp Plugin", "BOQ Extractor", "Ruby Extension", "Quantity Take-Off"],
        liveUrl: "https://github.com/garislab/skp_plugin_BOQ",
        repoUrl: "https://github.com/garislab/skp_plugin_BOQ"
      },
      {
        id: "skp-plugin-airender",
        repoName: "skp_plugin_airender",
        title: "skp_plugin_airender — SketchUp AI Scene Renderer (V1)",
        code: "TOOL-03 / SKP_AIRENDER",
        category: "tools",
        featured: false,
        hasLivePages: false,
        status: "GitHub Repo (.RBZ)",
        language: "Ruby · AI Render",
        year: "2026",
        screenshot: "assets/images/lab/skp-plugin-airender.jpg",
        screenshotCaption: "Tampilan repositori github.com/garislab/skp_plugin_airender — Ekstensi GarisCerita_AI_Render V1",
        description:
          "Ekstensi Ruby untuk SketchUp (GarisCerita_AI_Render V1) yang merender tampilan viewport scene aktif menggunakan AI. Mempercepat eksplorasi visualisasi konsep arsitektur dan studi atmosfer material langsung dari jendela kerja 3D SketchUp.",
        metrics: [
          { label: "Paket Rilis", value: "GarisCerita_AI_Render V1" },
          { label: "Platform", value: "SketchUp Ruby Extension" },
          { label: "Lisensi", value: "Apache-2.0 · GarisLab" }
        ],
        tags: ["SketchUp AI Render", "Ruby Extension", "Generative Visualization", "GarisLab"],
        liveUrl: "https://github.com/garislab/skp_plugin_airender",
        repoUrl: "https://github.com/garislab/skp_plugin_airender"
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. DAFTAR PORTOFOLIO DESAIN (22 PROYEK LENGKAP DARI PDF 2026-02)
  // --------------------------------------------------------------------------
  portfolioCategories: [
    { id: "all", label: "Semua Karya (22)" },
    { id: "arsitektur", label: "Arsitektur" },
    { id: "urban", label: "Urban & Masterplan" },
    { id: "komersial", label: "Komersial & Retail" },
    { id: "interior", label: "Interior & Office" },
    { id: "pemerintah", label: "Publik & Pemerintah" },
    { id: "residensial", label: "Residensial & Resort" }
  ],

  portfolio: [
    {
      id: "kota-intan",
      title: "Mixed Use Taman Kota Intan",
      subtitle: "RE-TELL. RE-USE. RE-CONNECT. RE-VIVE.",
      category: ["urban", "pemerintah", "arsitektur"],
      categoryLabel: "Urban, Adaptive Reuse & Pemerintah",
      location: "Kota Tua, Jakarta",
      year: "2024",
      client: "Pemprov DKI Jakarta",
      siteArea: "15.200 m²",
      builtArea: "50.000 m²",
      program: "Apartment, Hotel, Retail, Cultural Public Space & Adaptive Reuse",
      scope: "Architecture Competition (4th Winner)",
      image: "assets/images/projects/kota-intan-mixed-use.jpg",
      secondaryImage: "assets/images/projects/kota-intan-diagram.jpg",
      summary:
        "Revitalisasi kawasan bersejarah Taman Kota Intan di gerbang Sunda Kelapa / Kota Tua Jakarta melalui pendekatan Adaptive Reuse dan Pocket Terrace sebagai ruang temu publik lintas budaya.",
      conceptDetails: [
        "Menghormati jejak bangunan cagar budaya (existing remnants) dengan menyisipkan struktur baja modern dan atap tembaga (copper roof) yang berdialog harmonis dengan fasad kolonial.",
        "Menciptakan 'Pocket Terrace' yang menghubungkan aktivitas tepi sungai bersejarah Jembatan Kota Intan dengan koridor pejalan kaki, UMKM/pedagang lokal, hunian, dan perhotelan.",
        "Mengangkat nilai 'Gotong Royong' dan tradisi tutur masyarakat Nusantara ke dalam ruang-ruang antara (in-between spaces) yang inklusif."
      ]
    },
    {
      id: "jayamandala-apartment",
      title: "Jayamandala Apartment",
      subtitle: "Serene Urban Oasis & Sustainable High-Rise Living",
      category: ["arsitektur", "residensial"],
      categoryLabel: "Arsitektur, Struktur & MEP",
      location: "Jakarta",
      year: "2023",
      client: "Wings Group",
      siteArea: "2.500 m²",
      builtArea: "9.500 m²",
      program: "High-Rise Apartment & Resident Facilities",
      scope: "Architecture (Concept – Design Development), Structure & MEP",
      image: "assets/images/projects/jayamandala-1.jpg",
      secondaryImage: "assets/images/projects/jayamandala-axon.jpg",
      summary:
        "Apartemen vertikal berkonsep oasis urban minimalis di tengah kepadatan Jakarta yang memadukan efisiensi tata ruang, material alami kayu-batu, dan sistem bangunan ramah lingkungan.",
      conceptDetails: [
        "Mengintegrasikan sistem pemanenan air hujan (rainwater harvesting) untuk irigasi lanskap native tahan kering pada roof garden.",
        "Pemanfaatan panel surya untuk pencahayaan area komunal dan stasiun pengisian daya ramah lingkungan di tepi kolam renang.",
        "Desain lobi utama memanfaatkan kisi kayu daur ulang lokal dan pencahayaan alami guna menekan konsumsi energi harian."
      ]
    },
    {
      id: "modern-market-grandcity",
      title: "Modern Market Grandcity 1 ('Huma Market')",
      subtitle: "Borneo Organic Wavy Roofline & Community Lifestyle Plaza",
      category: ["komersial", "arsitektur"],
      categoryLabel: "Arsitektur Komersial",
      location: "Balikpapan, Kalimantan Timur",
      year: "2023",
      client: "Sinarmas Land",
      siteArea: "7.852 m²",
      builtArea: "5.778 m²",
      program: "Fresh Market, Shophouse, Culinary & Community Plaza",
      scope: "Architecture (Concept – Design Development)",
      image: "assets/images/projects/modern-market-grandcity.jpg",
      secondaryImage: "assets/images/projects/modern-market-plaza.jpg",
      summary:
        "'Huma Market' dirancang sebagai magnet gaya hidup dan pasar segar modern yang hangat ('homy'), memadukan ruko komersial, ruang ritel, dan plaza terbuka untuk warga Balikpapan.",
      conceptDetails: [
        "Siluet atap bergelombang dinamis terinspirasi dari kearifan arsitektur kampung tradisional Kalimantan, mendobrak bentuk pasar konvensional yang kaku.",
        "Fasad kulit kedua (secondary skin) memadukan bilah besi hollow dan papan GRC (Glass Reinforced Concrete) untuk mereduksi panas matahari tropis.",
        "Tata massa terbuka memaksimalkan sirkulasi udara silang dan pencahayaan alami di area pasar basah maupun area kafe."
      ]
    },
    {
      id: "foodhub-tanah-abang",
      title: "Foodhub Tanah Abang",
      subtitle: "Hub in Simplicity & Red Solid Spirit",
      category: ["komersial", "pemerintah", "arsitektur"],
      categoryLabel: "Arsitektur, Struktur & MEP (BUMD)",
      location: "Tanah Abang, Jakarta Pusat",
      year: "2024",
      client: "Perumda Pembangunan Sarana Jaya Jakarta",
      siteArea: "2.500 m²",
      builtArea: "250 m²",
      program: "Culinary Market, Retail & Community Hub",
      scope: "Architecture (Concept – Design Development), Structure & MEP",
      image: "assets/images/projects/foodhub-tanah-abang.jpg",
      secondaryImage: "assets/images/projects/foodhub-interior.jpg",
      summary:
        "Transformasi sentra kuliner di jantung Tanah Abang dengan filosofi 'Hub in Simplicity'—menghadirkan fasad polikarbonat translusen yang ringan dengan aksen tangga spiral merah yang ikonik.",
      conceptDetails: [
        "'Red Solid Spirit' melambangkan energi, keberanian, dan semangat kolektif kawasan perdagangan Tanah Abang sebagai denyut nadi ekonomi Jakarta.",
        "Penerapan prinsip fisika bangunan 'Chimney Effect' (efek cerobong): udara panas dialirkan keluar melalui skylight atas, menarik udara sejuk dari bawah secara alami.",
        "Material baja ekspos, perforated metal mesh, dan polikarbonat menciptakan bangunan yang terang di siang hari dan berpendar seperti lentera kota di malam hari."
      ]
    },
    {
      id: "the-east-lobby",
      title: "The East Tower — Elements Gallery Lobby",
      subtitle: "Synergy of Art, Nature & Spatial Harmony",
      category: ["interior", "komersial"],
      categoryLabel: "Arsitektur & Desain Interior",
      location: "Mega Kuningan, Jakarta Selatan",
      year: "2023",
      client: "The East Jakarta",
      siteArea: "2.500 m²",
      builtArea: "9.500 m²",
      program: "Office Tower Main Lobby, Grand Stair Gallery & F&B Arcade",
      scope: "Architecture & Interior (Concept – Design Development)",
      image: "assets/images/projects/the-east-lobby.jpg",
      secondaryImage: "assets/images/projects/the-east-plaza.jpg",
      summary:
        "Redesain lobi utama dan plaza drop-off gedung perkantoran The East menjadi 'The Elements Gallery' yang memadukan instalasi seni, lanskap interior, dan prinsip keseimbangan energi ruang.",
      conceptDetails: [
        "Menghadirkan Grand Stair Gallery bertingkat dari material kayu hangat dan planter hijau sebagai ruang interaksi kasual sekaligus akses menuju area tenant.",
        "Backdrop resepsionis monumental dengan kisi vertikal kayu teriluminasi yang merespons harmoni elemen cahaya dan kayu.",
        "Penataan ulang lanskap teras luar (outdoor plaza) dengan bangku batu granit, dek kayu, dan pepohonan peneduh."
      ]
    },
    {
      id: "villa-ungasan-bali",
      title: "Villa Ungasan",
      subtitle: "Contemporary Balinese Bale & Sloping Terraced Sanctuary",
      category: ["residensial", "arsitektur"],
      categoryLabel: "Arsitektur & Konstruksi",
      location: "Ungasan, Bali",
      year: "2024",
      client: "Private Client",
      siteArea: "1.200 m²",
      builtArea: "1.500 m²",
      program: "Luxury Tropical Villa & Infinity Pool Pavilion",
      scope: "Architecture (Concept – Design Development) & Construction",
      image: "assets/images/projects/villa-ungasan-bali.jpg",
      secondaryImage: "assets/images/projects/villa-ungasan-pool.jpg",
      summary:
        "Merancang ulang identitas arsitektur tropis Bali melalui komposisi atap terasering pada lahan berkontur yang terinspirasi dari tatanan paviliun tradisional (Bale).",
      conceptDetails: [
        "Mengoptimalkan aliran angin laut Ungasan melalui plafon kayu ekspos yang tinggi, bukaan ventilasi strategis, dan tata ruang paviliun terbuka yang menyatu dengan kolam renang.",
        "Kombinasi dinding bertekstur warna tanah (earthy tone), batu alam lokal, dan struktur kayu hangat menjaga keakraban bangunan dengan lanskap alami Bali."
      ]
    },
    {
      id: "al-marjan-dubai",
      title: "Al Marjan Island Resort — Ras Al Khaimah",
      subtitle: "Elevated Hanging Gardens & Waterfront Massing",
      category: ["arsitektur", "urban", "residensial"],
      categoryLabel: "Arsitektur Internasional (Sayembara)",
      location: "Ras Al Khaimah, Dubai — UAE",
      year: "2022",
      client: "Selected International Competition (Associated with Airmas Asri)",
      siteArea: "Waterfront Parcel",
      builtArea: "Multi-Tower Resort",
      program: "Waterfront Hospitality, Beach Club, Serviced Apartments & Ballroom",
      scope: "Selected Competition Design",
      image: "assets/images/projects/al-marjan-dubai.jpg",
      secondaryImage: "assets/images/projects/skybridge-aeon-sentul.jpg",
      summary:
        "Kompleks resor dan hunian tepi laut di Ras Al Khaimah yang memecah gubahan massa masif menjadi klaster menara berundak dengan taman gantung (hanging gardens) dan koridor pandang terbuka ke teluk.",
      conceptDetails: [
        "Pemisahan massa bangunan menciptakan courtyard terbuka di atas podium yang menampung beach club, kolam terasering, dan kafe menghadap laut.",
        "Fasad berbingkai modular dengan kisi peneduh gurun menjaga kenyamanan termal sekaligus membingkai panorama Teluk Arab dari setiap unit."
      ]
    },
    {
      id: "tunjungan-boulevard",
      title: "Tunjungan Boulevard Apartment",
      subtitle: "The Independence Statement on a Heritage Axis",
      category: ["arsitektur", "urban"],
      categoryLabel: "Arsitektur High-Rise & Heritage",
      location: "Jl. Tunjungan, Surabaya",
      year: "2017 – Ongoing",
      client: "Commercial Developer (Associated with Airmas Asri)",
      siteArea: "Heritage District Parcel",
      builtArea: "32.000 m² (52 Lantai)",
      program: "8F Parking Podium, 3F Facility, 37F Apartment, 2F Tilted Penthouse & Heritage Retail",
      scope: "Concept Phase hingga Construction Drawing",
      image: "assets/images/projects/tunjungan-boulevard.jpg",
      secondaryImage: "assets/images/projects/tunjungan-pool.jpg",
      summary:
        "Menara apartemen 52 lantai di koridor bersejarah Jalan Tunjungan Surabaya yang memadukan pelestarian bangunan cagar budaya di lapis jalan dengan menara kaca reflektif modern di atasnya.",
      conceptDetails: [
        "Mengusung gagasan 'Independence Statement' untuk menghormati narasi sejarah Kota Pahlawan sekaligus merepresentasikan kemandirian masa depan.",
        "Podium bawah mempertahankan skala fasad kolonial dan menghidupkan kembali koridor pejalan kaki serta jalur trem wisata Tunjungan."
      ]
    },
    {
      id: "skybridge-aeon-sentul",
      title: "Skybridge AEON Sentul City (Luxury, Art & High-End Peak)",
      subtitle: "Rooftop Sky Lounge, Observation Deck & Fine Dining across Towers",
      category: ["arsitektur", "interior", "komersial"],
      categoryLabel: "Arsitektur, Struktur & Interior",
      location: "Sentul City, Bogor / Jakarta",
      year: "2018",
      client: "Sentul City (Associated with Airmas Asri & Ketira)",
      siteArea: "Rooftop Level 30F – 32F",
      builtArea: "1.335 m² per Zone",
      program: "Sky Bar, Dedicated Observation Deck, Luxury & Art Theme Restaurant",
      scope: "Architecture, Structure & Interior Concept",
      image: "assets/images/projects/skybridge-aeon-sentul.jpg",
      secondaryImage: "assets/images/projects/skybridge-art-peak.jpg",
      summary:
        "Jembatan langit (Skybridge) ikonik di lantai 30–32 yang menghubungkan deretan menara apartemen di atas AEON Sentul City, menyajikan dek observasi 360 derajat dan tiga zona restoran tematik.",
      conceptDetails: [
        "Lantai 30: Casual Dining & Sky Lounge; Lantai 31: Luxury Dining & Observation Deck; Lantai 32: Sky Bar & Pod Dek Kayu Melayang.",
        "Tiga karakter interior puncak: 'Luxury Peak', 'Art Peak' (eklektik kontemporer), dan 'High-End Peak' (hangat dengan material kayu & baja industrial)."
      ]
    },
    {
      id: "cultural-park-bogor",
      title: "Cultural Park Bogor & Creative Hub",
      subtitle: "Where Artisanal Craft, Coffee & Entrepreneurship Coexist",
      category: ["komersial", "arsitektur"],
      categoryLabel: "Arsitektur Komersial & Komunitas",
      location: "Bogor, Jawa Barat",
      year: "2021",
      client: "Private Commercial",
      siteArea: "7.852 m²",
      builtArea: "5.778 m²",
      program: "Creative Hub, Artisanal Coffee Shop, Co-Working & Curated Local Retail",
      scope: "Architecture (Concept – Design Development)",
      image: "assets/images/projects/cultural-park-bogor.jpg",
      secondaryImage: "assets/images/projects/cultural-park-interior.jpg",
      summary:
        "Wadah ekonomi kreatif di Bogor yang menyatukan ruang kolaborasi seniman/wirausaha, kafe terbuka, dan galeri produk kerajinan lokal di bawah naungan atap lebar tropis yang teduh.",
      conceptDetails: [
        "Transisi ruang dalam dan luar yang cair dengan ramp landai ramah pejalan kaki, teras batu alam, dan bukaan kaca penuh ke arah taman."
      ]
    },
    {
      id: "cultural-park-bdd-tangsel",
      title: "Cultural Park BDD Tangerang Selatan",
      subtitle: "Sculptural Concrete & Steel Canopy Creative Destination",
      category: ["komersial", "urban", "arsitektur"],
      categoryLabel: "Sayembara Arsitektur Komersial",
      location: "Tangerang Selatan, Banten",
      year: "2022",
      client: "Commercial Competition",
      siteArea: "7.852 m²",
      builtArea: "5.778 m²",
      program: "Creative Hub, Amphitheater & Lifestyle Retail",
      scope: "Architecture (Competition)",
      image: "assets/images/projects/p53_1.jpg",
      secondaryImage: "assets/images/projects/cultural-park-bogor.jpg",
      summary:
        "Rancangan sayembara pusat komunitas kreatif di Tangerang Selatan dengan jembatan layang pedestrian, dinding beton ekspos bersudut dinamis, dan kanopi kaca reflektif.",
      conceptDetails: [
        "Menghubungkan jalur sirkulasi publik melalui jembatan penghubung antar massa bangunan yang menaungi plaza acara luar ruang."
      ]
    },
    {
      id: "lane-57-mall-kuta",
      title: "Lane 57th Mall Kuta — Interior Atrium",
      subtitle: "Tropical Timber Ribbed Canopy & Dynamic Retail Spine",
      category: ["interior", "komersial"],
      categoryLabel: "Desain Interior Pusat Perbelanjaan",
      location: "Kuta, Bali",
      year: "2022",
      client: "Private Hospitality & Retail",
      siteArea: "5.000 m²",
      builtArea: "4.200 m²",
      program: "Mall Atrium, Restaurant & Spa",
      scope: "Interior (Concept – Design Development)",
      image: "assets/images/projects/p53_2.jpg",
      secondaryImage: "assets/images/projects/the-east-lobby.jpg",
      summary:
        "Desain interior atrium mal di Kuta Bali yang menghadirkan kehangatan bilah-bilah kayu melengkung (timber ribbed ceiling), taman vertikal gantung, dan sirkulasi eskalator yang atraktif.",
      conceptDetails: [
        "Memasukkan cahaya alami skylight ke tengah atrium untuk menumbuhkan pepohonan hidup di dalam area ritel dan restoran."
      ]
    },
    {
      id: "damar-langit-glasshouse",
      title: "Damar Langit Glass House",
      subtitle: "Panoramic Mountain Dining Sanctuary in Puncak",
      category: ["komersial", "arsitektur", "interior"],
      categoryLabel: "Arsitektur & Interior Restoran",
      location: "Cisarua, Puncak — Bogor",
      year: "2021",
      client: "Damar Langit",
      siteArea: "1.000 m²",
      builtArea: "700 m²",
      program: "Mountain Glasshouse Restaurant & Viewing Deck",
      scope: "Architecture (Concept – Design Development)",
      image: "assets/images/projects/damar-langit-glasshouse.jpg",
      secondaryImage: "assets/images/projects/damar-langit-interior.jpg",
      summary:
        "Restoran rumah kaca (Glass House) di lereng pegunungan Puncak Bogor yang merayakan transparansi struktur baja-kayu untuk membingkai lanskap kabut dan hutan pinus.",
      conceptDetails: [
        "Atap pelana kaca berstruktur rangka baja hitam dipadukan dengan kain tenun gantung akustik dan kisi kayu hangat di ruang makan utama."
      ]
    },
    {
      id: "damar-langit-villa-masterplan",
      title: "Damar Langit Villa & Resort Masterplan",
      subtitle: "2-Hectare Highland Eco-Resort & Amenities",
      category: ["urban", "residensial"],
      categoryLabel: "Masterplan Resort & Villa",
      location: "Damar Langit, Puncak — Bogor",
      year: "2021",
      client: "Damar Langit Resort",
      siteArea: "20.000 m²",
      builtArea: "8.000 m²",
      program: "Masterplan Resort, Private Villas & Club Amenities",
      scope: "Architecture (Concept – Working Drawing)",
      image: "assets/images/projects/p55_3.jpg",
      secondaryImage: "assets/images/projects/damar-langit-glasshouse.jpg",
      summary:
        "Masterplan kawasan resor dan vila pegunungan seluas 2 hektar di Puncak yang menata klaster vila, lobi kedatangan berkanopi kayu miring, dan dek pemandangan lembah.",
      conceptDetails: [
        "Mempertahankan kontur perbukitan hijau dengan tata letak unit vila berundak agar setiap kamar memiliki privasi dan panorama bebas."
      ]
    },
    {
      id: "maka-motor-factory",
      title: "KLN | MAKA Motor Factory & R&D Office",
      subtitle: "Next-Generation Electric Vehicle Manufacturing & Workspace",
      category: ["arsitektur", "interior", "komersial"],
      categoryLabel: "Arsitektur Industrial, Struktur, MEP & Interior",
      location: "Bekasi, Jawa Barat",
      year: "2023",
      client: "MAKA Motors",
      siteArea: "10.500 m²",
      builtArea: "9.000 m²",
      program: "EV Assembly Factory Area, Engineering Lab & Corporate Office",
      scope: "Architecture (Concept – Design Development), Structure, MEP & Interior",
      image: "assets/images/projects/maka-motor-factory.jpg",
      secondaryImage: "assets/images/projects/maka-motor-interior.jpg",
      summary:
        "Fasilitas pabrik perakitan sepeda motor listrik dan kantor pusat R&D MAKA Motors di Bekasi yang menggabungkan efisiensi bentang lebar industri dengan ruang kerja kolaboratif futuristik.",
      conceptDetails: [
        "Identitas warna khas toska-metalik diaplikasikan secara berani pada fasad pabrik maupun sirkulasi lengkung mezanin kantor."
      ]
    },
    {
      id: "dwmr-masterplan-bogor",
      title: "DWMR — Desa Wisata Magnet Rejeki Masterplan",
      subtitle: "20-Hectare Integrated Agrotourism & Villa Estate",
      category: ["urban", "residensial"],
      categoryLabel: "Urban & Masterplan Kawasan",
      location: "Kabupaten Bogor, Jawa Barat",
      year: "2023",
      client: "DWMR Development",
      siteArea: "20 Ha (200.000 m²)",
      builtArea: "60.000 m²",
      program: "Agrotourism, Hillside Villas, Facilities & Mosque",
      scope: "Masterplan & Architecture (Concept – Working Drawing · Construction)",
      image: "assets/images/projects/p55_2.jpg",
      secondaryImage: "assets/images/projects/p55_4.jpg",
      summary:
        "Perencanaan induk kawasan agrowisata terpadu seluas 20 hektar di Bogor yang mengintegrasikan klaster vila lereng bukit, fasilitas wisata edukatif, masjid kawasan, dan konservasi kontur hijau.",
      conceptDetails: [
        "Penataan kavling dan jalan lingkungan mengikuti garis kontur alami guna meminimalkan pekerjaan potong-timbun (cut and fill)."
      ]
    },
    {
      id: "paceut-masterplan-bogor",
      title: "Paceut Eco-Hospitality Masterplan",
      subtitle: "Greenhouse, Boutique Hotel & Forest Auditorium",
      category: ["urban", "komersial"],
      categoryLabel: "Masterplan Kawasan & Arsitektur",
      location: "Paceut, Kabupaten Bogor",
      year: "2024",
      client: "Private Agro-Hospitality",
      siteArea: "200.000 m² (20 Ha)",
      builtArea: "60.000 m²",
      program: "Botanical Greenhouse, Boutique Hotel & Auditorium",
      scope: "Architecture (Concept – Working Drawing · Construction)",
      image: "assets/images/projects/p55_4.jpg",
      secondaryImage: "assets/images/projects/p55_2.jpg",
      summary:
        "Masterplan kawasan hijau di Paceut Bogor dengan deretan rumah kaca modular berstruktur ringan, hotel butik di tengah hutan, dan auditorium acara alam terbuka.",
      conceptDetails: [
        "Pengelompokan massa modular greenhouse menjaga kontinuitas koridor pepohonan eksisting dan resapan air hujan."
      ]
    },
    {
      id: "bni-braga-interior",
      title: "BNI Banking Cafe — Braga Bandung",
      subtitle: "Hospitality-Driven Digital Banking Experience",
      category: ["interior", "komersial"],
      categoryLabel: "Desain Interior Perbankan",
      location: "Jl. Braga, Bandung",
      year: "2023",
      client: "PT Bank Negara Indonesia (Persero) Tbk",
      siteArea: "Branch Office Floor",
      builtArea: "Interior Fit-Out",
      program: "Banking Cafe, Coffee Bar, Amphitheater & Digital Lounge",
      scope: "Interior Design (Concept – Design Development)",
      image: "assets/images/projects/p56_1.jpg",
      secondaryImage: "assets/images/projects/p56_2.jpg",
      summary:
        "Transformasi kantor cabang BNI di koridor bersejarah Jalan Braga Bandung menjadi 'Banking Cafe' modern yang hangat, kasual, dan berorientasi pada pengalaman nasabah generasi baru.",
      conceptDetails: [
        "Plafon lengkung berlapis lampu linier dinamis dan amphitheater kayu kasual menciptakan suasana layaknya artisan coffee lounge."
      ]
    },
    {
      id: "bni-pamanukan-interior",
      title: "BNI Smart Branch — Pamanukan",
      subtitle: "Warm Acoustic Timber Lounge & Priority Consultation",
      category: ["interior", "komersial"],
      categoryLabel: "Desain Interior Perbankan",
      location: "Pamanukan, Jawa Barat",
      year: "2023",
      client: "PT Bank Negara Indonesia (Persero) Tbk",
      siteArea: "Branch Office Floor",
      builtArea: "Interior Fit-Out",
      program: "Priority Lounge, Glass Meeting Pod & Customer Care",
      scope: "Interior Design (Concept – Design Development)",
      image: "assets/images/projects/p56_2.jpg",
      secondaryImage: "assets/images/projects/p56_1.jpg",
      summary:
        "Perancangan interior cabang perbankan modern di Pamanukan dengan panel dinding akustik bertekstur gelap, partisi kaca berpola geometris batik kontemporer, dan ruang konsultasi privat.",
      conceptDetails: [
        "Menggabungkan privasi akustik ruang pertemuan kaca dengan keterbukaan visual area layanan nasabah."
      ]
    },
    {
      id: "al-kautsar-mosque",
      title: "Masjid Al-Kautsar Tangerang",
      subtitle: "Monolithic Concrete & Geometric Lattice Sanctuary",
      category: ["arsitektur", "pemerintah"],
      categoryLabel: "Arsitektur Rumah Ibadah",
      location: "Tangerang, Banten",
      year: "2023",
      client: "Yayasan Masjid Al-Kautsar",
      siteArea: "Masjid Kawasan",
      builtArea: "Main Prayer Hall & Minaret",
      program: "Prayer Hall, Wudhu Pavilion, Plaza & Minaret",
      scope: "Architecture (Concept – Design Development)",
      image: "assets/images/projects/p57_1.jpg",
      secondaryImage: "assets/images/projects/p57_2.jpg",
      summary:
        "Masjid kontemporer dengan massa beton monolitik tegas yang dipadukan dengan layar kerawangan bermotif islami untuk menyaring cahaya matahari dan mengalirkan angin alami ke ruang salat.",
      conceptDetails: [
        "Menara minimalis menjulang menjadi penanda visual kawasan sekaligus merayakan kesederhanaan bentuk sakral."
      ]
    },
    {
      id: "khoirur-roziqin-pesantren",
      title: "Pesantren & Masjid Khoirur Roziqin Bogor",
      subtitle: "Sacred Geometry, Passive Ventilation & Educational Farming",
      category: ["arsitektur", "urban"],
      categoryLabel: "Masterplan Pendidikan & Ibadah",
      location: "Bogor, Jawa Barat",
      year: "2020",
      client: "Pondok Pesantren Khoirur Roziqin",
      siteArea: "10.500 m²",
      builtArea: "5.500 m²",
      program: "Mosque, Dormitory, Classroom, Sport Area & Educational Farming",
      scope: "Masterplan & Architecture (Concept – Design Development · Schematic)",
      image: "assets/images/projects/p57_2.jpg",
      secondaryImage: "assets/images/projects/p55_1.jpg",
      summary:
        "Masterplan kawasan pendidikan pesantren modern seluas 1 hektar di Bogor yang memadukan asrama, ruang kelas, masjid bermotif kerawangan baja-bata, lapangan olahraga, dan lahan pertanian edukatif.",
      conceptDetails: [
        "Layar fasad masjid menggunakan roster baja berpola geometris dan bata terakota berlubang untuk penghawaan alami maksimal."
      ]
    },
    {
      id: "kariadi-cilandak-healthcare",
      title: "RSUP Dr. Kariadi Medical Center & Klinik Anak Cilandak",
      subtitle: "Living Void for Healing Spirit & Child-Friendly Sensory Clinic",
      category: ["pemerintah", "arsitektur"],
      categoryLabel: "Arsitektur Kesehatan & Publik",
      location: "Semarang & Cilandak, Jakarta Selatan",
      year: "2017 & 2021",
      client: "RSUP Dr. Kariadi (Sayembara Nasional IAI) & Klinik Anak Cilandak",
      siteArea: "Hospital Wing & Urban Clinic",
      builtArea: "Medical Center & Multi-functional Sensory Classrooms",
      program: "ICU, Emergency, Central Surgery, Heart Unit & Pediatric Development Clinic",
      scope: "Top 5 Finalist National Competition IAI & Schematic Design",
      image: "assets/images/projects/p58_3.jpg",
      secondaryImage: "assets/images/projects/p58_2.jpg",
      summary:
        "Rancangan fasilitas kesehatan yang menempatkan psikologi kesembuhan pasien sebagai pusat desain: 'Living Void' hijau vertikal pada RS Kariadi Semarang dan ruang bermain sensorik pada Klinik Anak Cilandak.",
      conceptDetails: [
        "Void taman vertikal memudahkan orientasi arah (wayfinding) keluarga pasien sekaligus memasukkan cahaya alami ke koridor rumah sakit.",
        "Klinik Anak Cilandak mengolah rumah tinggal eksisting menjadi kelas-kelas multifungsi untuk terapi sensorik dan motorik anak."
      ]
    }
  ],

  // --------------------------------------------------------------------------
  // 4. TIM STUDIO (17 PROFESIONAL DARI PDF PORTOFOLIO)
  // --------------------------------------------------------------------------
  team: [
    {
      name: "Himawan Prakoso, ST, MT, IAI",
      role: "Director",
      division: "Leadership & Principal",
      education: "S2 Arsitektur ITB (2009) · S1 Arsitektur UNDIP (2005)",
      certs: "Arsitek Utama IAI (STRA & SKA) · IPTB DKI · Greenship Professional GBCI · BGH",
      highlight: "Director PT Garis Cerita Karya (2019–sekarang) & Team Leader Istana IKN (KSO Yodya Arkonin, 2022–sekarang).",
      photo: "assets/images/team/p7_3.jpg"
    },
    {
      name: "Edward Pattiselano, ST, IAI",
      role: "Associate Director",
      division: "Leadership & Principal",
      education: "S1 Arsitektur UNDIP Semarang (2006)",
      certs: "Arsitek Madya IAI (SKA: 1.1.101.2.027.09.1949201)",
      highlight: "Pengalaman lebih dari 18 tahun pada manajemen proyek arsitektur, properti, dan pengembangan komersial.",
      photo: "assets/images/team/p7_2.jpg"
    },
    {
      name: "Ar. Muhammad Adriansyah, ST, IAI",
      role: "Associate Senior Architect",
      division: "Leadership & Principal",
      education: "S1 Arsitektur Universitas Brawijaya, Malang (2011)",
      certs: "STRA 2 Ikatan Arsitek Indonesia (No: 2.01.0.0007204)",
      highlight: "Spesialis perancangan konseptual, sayembara arsitektur nasional/internasional, dan high-rise komersial.",
      photo: "assets/images/team/p7_1.jpg"
    },
    {
      name: "Neimah Baidani, ST, IAI",
      role: "Associate Senior Architect",
      division: "Planning & Design",
      education: "Sarjana Arsitektur · Anggota Profesional IAI",
      certs: "Arsitek Berlisensi IAI",
      highlight: "Koordinasi perancangan arsitektur dan pengembangan desain terpadu.",
      photo: "assets/images/team/p7_10.jpg"
    },
    {
      name: "Reza Adhi Wicaksana, ST, IAI",
      role: "Associate Project Architect",
      division: "Planning & Design",
      education: "S1 Arsitektur UNDIP Semarang (2009)",
      certs: "Arsitek Madya IAI (STRA: 2.01.0.0005502)",
      highlight: "Berpengalaman luas sebagai Project Architect & Manager di Ciputra Development dan Gunasland.",
      photo: "assets/images/team/p7_12.jpg"
    },
    {
      name: "Chris Julian Sutandi, ST",
      role: "Lead Structure Engineer",
      division: "Engineering",
      education: "Sarjana Teknik Sipil / Struktur",
      certs: "Structure Engineering Specialist",
      highlight: "Perencanaan dan analisis struktur bangunan bertingkat, bentang lebar, serta rekayasa pondasi.",
      photo: "assets/images/team/p8_2.jpg"
    },
    {
      name: "Ir. Ricky Erasmus Patinama",
      role: "Lead MEP Engineer",
      division: "Engineering",
      education: "Insinyur Teknik Mekanikal & Elektrikal",
      certs: "MEP Engineering Specialist",
      highlight: "Integrasi sistem mekanikal, elektrikal, tata udara (HVAC), plambing, dan efisiensi energi gedung.",
      photo: "assets/images/team/p8_3.jpg"
    },
    {
      name: "Juzla Muti Aulia, S.Ars",
      role: "Architect",
      division: "Planning & Design",
      education: "Sarjana Arsitektur",
      certs: "Architectural Designer",
      highlight: "Eksplorasi desain arsitektur, pemodelan 3D, dan penyusunan materi presentasi konsep.",
      photo: "assets/images/team/p7_6.jpg"
    },
    {
      name: "Muhammad Darari, S.Ars",
      role: "Architect",
      division: "Planning & Design",
      education: "Sarjana Arsitektur",
      certs: "Architectural & BIM Designer",
      highlight: "Pengembangan desain arsitektur, pemodelan BIM, dan visualisasi spasial.",
      photo: "assets/images/team/p7_7.jpg"
    },
    {
      name: "Novianti Mawar Sari, S.Ars",
      role: "Architect",
      division: "Planning & Design",
      education: "Sarjana Arsitektur",
      certs: "Architectural Designer",
      highlight: "Perancangan skematik dan pengembangan detail ruang arsitektural.",
      photo: "assets/images/team/p7_4.jpg"
    },
    {
      name: "Nadia Yuliawati, S.Des",
      role: "Interior Designer",
      division: "Interior & Graphic",
      education: "Sarjana Desain Interior",
      certs: "Interior Design Specialist",
      highlight: "Kurasi material, tata cahaya ruang dalam, dan perancangan interior komersial/korporasi.",
      photo: "assets/images/team/p7_11.jpg"
    },
    {
      name: "Hanifah Intania, S.Ars",
      role: "Interior Designer",
      division: "Interior & Graphic",
      education: "Sarjana Arsitektur",
      certs: "Interior & Spatial Designer",
      highlight: "Pengembangan konsep ruang dalam, furnitur kustom, dan detail pengalaman ruang.",
      photo: "assets/images/team/p7_5.jpg"
    },
    {
      name: "Gusnul Yaqin",
      role: "Head of Drawing Production",
      division: "Production & Supervision",
      education: "Architectural Technical Production",
      certs: "DED & BIM Documentation Lead",
      highlight: "Memimpin standar mutu gambar kerja konstruksi (DED) dan koordinasi dokumen teknis.",
      photo: "assets/images/team/p7_8.jpg"
    },
    {
      name: "Felita Amelinda, S.Ds",
      role: "Graphic Designer",
      division: "Interior & Graphic",
      education: "Sarjana Desain Komunikasi Visual",
      certs: "Environmental Graphic & Branding",
      highlight: "Identitas visual arsitektur, sistem wayfinding/signage ruang, dan publikasi studio.",
      photo: "assets/images/team/p7_9.jpg"
    },
    {
      name: "Satria Helly, S.Ars, M.Ars",
      role: "Associate / Project Supervisor",
      division: "Production & Supervision",
      education: "Magister Arsitektur",
      certs: "Project Inspection & Supervision",
      highlight: "Supervisi konstruksi dan kendali mutu implementasi desain di lapangan.",
      photo: "assets/images/team/p8_6.jpg"
    },
    {
      name: "Muhammad Rizal Krismantor",
      role: "Project Supervisor",
      division: "Production & Supervision",
      education: "Construction Supervision",
      certs: "Site Inspector",
      highlight: "Pengawasan progres harian dan koordinasi teknis kontraktor di lapangan.",
      photo: "assets/images/team/p8_4.jpg"
    },
    {
      name: "Adji Akhmad Fauzi",
      role: "Project Supervisor",
      division: "Production & Supervision",
      education: "Construction Supervision",
      certs: "Site Inspector",
      highlight: "Inspeksi mutu pekerjaan struktur, arsitektur, dan finishing proyek.",
      photo: "assets/images/team/p8_5.jpg"
    }
  ],

  // --------------------------------------------------------------------------
  // 5. RAK DOKUMEN & ARSIP SEJARAH (ARCHIVE / HISTORY)
  // --------------------------------------------------------------------------
  archive: {
    historyNarrative:
      "Perjalanan Garis Cerita berakar dari kolaborasi para arsitek dan praktisi rekayasa yang sejak 2012 aktif memenangkan berbagai sayembara arsitektur nasional maupun internasional. Pada 27 Mei 2019, studio ini resmi berbadan hukum sebagai PT Garis Cerita Karya (GCK) di Jakarta Selatan. Kini, GCK berkembang menjadi biro konsultan arsitektur-engineering penuh (Anggota Penuh PERKINDO, ber-SBU Arsitektur & Interior) yang memadukan kepekaan desain kontekstual dengan inovasi riset digital (GarisLab).",
    milestones: [
      {
        year: "2012 – 2018",
        title: "Masa Inkubasi & Kemenangan Sayembara Nasional-Eropa",
        desc: "Para prinsipal meraih juara pada Sayembara Smart Pedestrian Hub Jakarta (2012), Gedung Expo Solo (1st Winner, 2016), Bandara Sukabumi (1st Winner, 2018), hingga Honorable Mention Kemeri National Park di Latvia, Eropa (2018)."
      },
      {
        year: "2019",
        title: "Pendirian Resmi PT Garis Cerita Karya (GCK)",
        desc: "Resmi berdiri di Jakarta Selatan berdasarkan Akta Pendirian No. 25 (27 Mei 2019) dan SK Menteri Hukum & HAM RI Nomor AHU-0027592.AH.01.01.TAHUN 2019."
      },
      {
        year: "2020 – 2022",
        title: "Ekspansi Proyek Komersial, Masterplan & Sayembara Ikonik",
        desc: "Meraih 2nd Winner LPJK Office Jakarta (2020), 2nd Winner Jogja Planning Gallery (2022), Selected Competition Al Marjan Ras Al Khaimah Dubai (2022), serta merancang Cultural Park Bogor & Damar Langit."
      },
      {
        year: "2022 – 2024",
        title: "Kontribusi Proyek Strategis Nasional & Korporasi Besar",
        desc: "Direktur GCK dipercaya sebagai Team Leader untuk Istana IKN (KSO PT Yodya Arkonin). Studio mengerjakan proyek Sinarmas Land, BNI, Wings Group, Sarana Jaya (Foodhub Tanah Abang), MAKA Motors, dan meraih 4th Winner Kota Intan Mixed Use (2024)."
      },
      {
        year: "2025 – 2026",
        title: "Transformasi R&D Digital: GarisLab, Feasibility Dashboard & OpenBIM",
        desc: "Peluncuran GarisLab (github.com/garislab) yang mengintegrasikan instrumen Feasibility Study interaktif (PSA_Mblock & PSA_LB), automasi produksi gambar AutoSheet AI, dan alur kerja OpenBIM 5D/6D."
      }
    ],
    awards: [
      { year: "2024", rank: "4th Winner", event: "Kota Intan Mixed Use Architecture Competition", location: "Jakarta (Pemprov DKI)" },
      { year: "2022", rank: "2nd Winner", event: "Jogja Planning Gallery Architecture Competition", location: "Yogyakarta" },
      { year: "2022", rank: "Top 20 Nominator", event: "MRT Glodok TOD Competition", location: "Jakarta" },
      { year: "2022", rank: "Selected Entry", event: "Al Marjan Waterfront Resort Competition", location: "Ras Al Khaimah, Dubai" },
      { year: "2020", rank: "2nd Winner", event: "Sayembara Gedung Kantor LPJK", location: "Jakarta" },
      { year: "2019", rank: "Top 8 Finalist", event: "Sayembara Arsitektur Gedung Bank Aceh", location: "Banda Aceh" },
      { year: "2018", rank: "1st Winner", event: "Sayembara Desain Bandara Sukabumi", location: "Jawa Barat" },
      { year: "2018", rank: "Honorable Mention", event: "Kemeri National Park Architecture Competition", location: "Latvia, Eropa" },
      { year: "2017", rank: "Top 5 Finalist", event: "Sayembara Nasional IAI Rumah Sakit Kariadi Medical Center", location: "Semarang" },
      { year: "2017", rank: "3rd Winner", event: "Sayembara Desain Plaza Masjid Bengkulu", location: "Bengkulu" },
      { year: "2016", rank: "1st Winner", event: "Sayembara Desain Gedung Expo Solo", location: "Surakarta" },
      { year: "2015", rank: "3rd Winner", event: "Sayembara ASEAN Secretariat Building", location: "Jakarta" },
      { year: "2012", rank: "2nd Winner", event: "Sayembara Smart Pedestrian Hub", location: "Jakarta" }
    ],
    legalDocs: [
      {
        code: "AKTA & SK AHU",
        title: "Akta Pendirian & SK Kemenkumham RI",
        number: "AHU-0027592.AH.01.01.TAHUN 2019",
        issuer: "Kementerian Hukum dan HAM Republik Indonesia",
        detail: "Pengesahan Badan Hukum Perseroan Terbatas PT Garis Cerita Karya berkedudukan di Jakarta Selatan (30 Mei 2019 & Perubahan 20 Maret 2020)."
      },
      {
        code: "NIB & KBLI",
        title: "Nomor Induk Berusaha (NIB) Berbasis Risiko",
        number: "NIB: 9120006682522",
        issuer: "Pemerintah RI / Kementerian Investasi & Hilirisasi (OSS)",
        detail: "KBLI 71101 (Aktivitas Arsitektur), KBLI 74120 (Aktivitas Desain Interior), KBLI 71102 (Aktivitas Keinsinyuran & Konsultasi Teknis), & KBLI 68120."
      },
      {
        code: "SBU ARSITEKTUR",
        title: "Sertifikat Badan Usaha (SBU) Konstruksi Arsitektur",
        number: "Subklasifikasi AR001 (KBLI 71101)",
        issuer: "Kementerian Pekerjaan Umum / PERKINDO",
        detail: "Jasa Arsitektural Bangunan Gedung Hunian dan Non Hunian (PB-UMKU: 912000668252200070001)."
      },
      {
        code: "SBU INTERIOR",
        title: "Sertifikat Badan Usaha (SBU) Konstruksi Desain Interior",
        number: "Subklasifikasi AR003 (KBLI 74120)",
        issuer: "Kementerian Pekerjaan Umum / PERKINDO",
        detail: "Jasa Desain Interior pada Bangunan Gedung dan Bangunan Sipil (PB-UMKU: 912000668252200080001)."
      },
      {
        code: "KTA PERKINDO",
        title: "Kartu Tanda Anggota Persatuan Konsultan Indonesia",
        number: "No. Anggota: 0711.31.02.2025 (Status: PENUH)",
        issuer: "DPP & DPD PERKINDO Provinsi DKI Jakarta",
        detail: "Keanggotaan penuh asosiasi perusahaan konsultan konstruksi & perencana nasional."
      },
      {
        code: "NPWP KORPORASI",
        title: "Nomor Pokok Wajib Pajak (NPWP) Perusahaan",
        number: "NPWP: 91.665.336.3-061.000",
        issuer: "DJP Kanwil Jakarta Selatan II — KPP Pratama Jakarta Jagakarsa",
        detail: "Kepatuhan perpajakan badan usaha PT Garis Cerita Karya."
      }
    ],
    portfolioPdfPath: "2026-02 GC PORTOFOLIO COMMERCIAL -v2_compressed.pdf"
  },

  // --------------------------------------------------------------------------
  // 6. KONTAK STUDIO (TELEPON MEJA)
  // --------------------------------------------------------------------------
  contact: {
    companyName: "PT Garis Cerita Karya (GCK)",
    addressLine1: "QP Office, Perkantoran Tanjung Mas Raya Blok B1 No. 44",
    addressLine2: "Jl. Tanjung Barat Raya, Kel. Tanjung Barat, Kec. Jagakarsa",
    cityPostal: "Jakarta Selatan, DKI Jakarta 12530",
    phoneMobile: "0817-290-431",
    phoneMobileRaw: "62817290431",
    phoneOffice: "(021) 2787-4648",
    email: "garisceritanya@gmail.com",
    website: "https://www.gariscerita.com",
    instagram: "@garis_cerita",
    instagramUrl: "https://www.instagram.com/garis_cerita",
    githubUrl: "https://github.com/garislab",
    googleMapsQuery:
      "https://www.google.com/maps/search/?api=1&query=QP+Office+Tanjung+Mas+Raya+Blok+B1+No+44+Jagakarsa+Jakarta+Selatan",
    officeHours: "Senin – Jumat · 09.00 – 18.00 WIB"
  },

  // --------------------------------------------------------------------------
  // 7. HOTSPOT 3D STUDIO (POSISI & KAMERA ZOOM DI SCENE THREE.JS)
  // --------------------------------------------------------------------------
  hotspots: [
    {
      id: "about",
      label: "ABOUT STUDIO",
      sublabel: "Profil, Tim & Koneksi GCK",
      icon: "frame",
      position: [-5.55, 2.75, -0.8],
      cameraPos: [-2.35, 2.55, 0.15],
      cameraTarget: [-5.75, 2.55, -0.8],
      miniMapPos: { x: 14, y: 42 }
    },
    {
      id: "portfolio",
      label: "PORTFOLIO",
      sublabel: "22 Karya Desain & Masterplan",
      icon: "board",
      position: [-0.8, 2.75, -4.65],
      cameraPos: [-0.8, 2.52, -1.15],
      cameraTarget: [-0.8, 2.52, -4.8],
      miniMapPos: { x: 44, y: 15 }
    },
    {
      id: "lab",
      label: "RESEARCH & LAB",
      sublabel: "Feasibility Study, BIM & Tools",
      icon: "monitor",
      position: [2.25, 1.98, -2.85],
      cameraPos: [2.18, 1.82, -0.68],
      cameraTarget: [2.25, 1.68, -3.0],
      miniMapPos: { x: 68, y: 32 }
    },
    {
      id: "archive",
      label: "ARCHIVE / HISTORY",
      sublabel: "Sejarah, Sayembara & Legalitas",
      icon: "bookshelf",
      position: [5.32, 2.6, -1.1],
      cameraPos: [2.25, 2.25, -0.45],
      cameraTarget: [5.55, 2.15, -1.1],
      miniMapPos: { x: 88, y: 44 }
    },
    {
      id: "contact",
      label: "CONTACT",
      sublabel: "Efek Dering Telepon & Hubungi",
      icon: "phone",
      position: [-2.15, 1.32, 1.55],
      cameraPos: [-1.85, 1.92, 3.12],
      cameraTarget: [-2.15, 1.05, 1.45],
      miniMapPos: { x: 33, y: 72 }
    }
  ]
};
