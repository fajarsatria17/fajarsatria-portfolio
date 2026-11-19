import type { Project } from '@type/content';

export const projects: Project[] = [
  {
    id: 'proj-tims',
    slug: 'tims-inventory-management-system',
    title: 'TIMS – TIE Inventory Management System',
    category: 'web',
    role: {
      en: 'Full-Stack Developer',
      id: 'Full-Stack Developer',
    },
    summary: {
      en: 'Enterprise web-based inventory control system developed for the TIE Division at PT Denso Indonesia to streamline inventory control and digital transformation.',
      id: 'Sistem kontrol inventaris berbasis web enterprise yang dikembangkan untuk Divisi TIE di PT Denso Indonesia guna menyederhanakan manajemen stok dan transformasi digital.',
    },
    description: {
      en: 'Contributed to the development of a web-based inventory control system designed to support the digital transformation of inventory management processes within the TIE Division. Worked across frontend and backend development, database integration, and key operational modules, including inventory management, stock transactions, reservation management, loan and return workflows, engineering support, dashboard monitoring, and role-based access control.',
      id: 'Berkontribusi dalam pengembangan sistem kontrol inventaris berbasis web yang dirancang untuk mendukung transformasi digital proses manajemen inventaris di Divisi TIE. Terlibat dalam pengembangan frontend dan backend, integrasi basis data, serta modul operasional utama, meliputi manajemen inventaris, transaksi stok, manajemen reservasi, alur peminjaman dan pengembalian, dukungan rekayasa (engineering support), pemantauan dasbor, dan kontrol akses berbasis peran (RBAC).',
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'Microsoft SQL Server', 'Tailwind CSS'],
    thumbnailUrl: '/images/projects/tims-dashboard.png',
    authenticScreenshotUrl: '/images/projects/tims-dashboard.png',
    fallbackIllustrationUrl: '/images/projects/tims-preview.svg',
    isAuthenticScreenshot: true,
    expectedScreenshots: [
      'tims-dashboard.png',
      'tims-login.png',
      'tims-inventory.png',
      'tims-stock-management.png',
      'tims-reservation.png',
    ],
    galleryScreenshots: [
      {
        id: 'tims-dash',
        url: '/images/projects/tims-dashboard.png',
        fallbackUrl: '/images/projects/tims-preview.svg',
        title: {
          en: 'Executive Inventory Dashboard',
          id: 'Dasbor Eksekutif Inventaris',
        },
        caption: {
          en: 'High-level telemetry showing asset distribution, daily stock transaction volume, and operational metrics.',
          id: 'Telemetri tingkat tinggi yang menampilkan distribusi aset, volume transaksi stok harian, dan metrik operasional.',
        },
        isAuthentic: true,
      },
      {
        id: 'tims-login',
        url: '/images/projects/tims-login.png',
        fallbackUrl: '/images/projects/tims-preview.svg',
        title: {
          en: 'TIMS Portal Authentication Gateway',
          id: 'Gerbang Autentikasi Portal TIMS',
        },
        caption: {
          en: 'Role-based access gateway for TIE Division staff, operators, and engineering administrators.',
          id: 'Pintu gerbang akses berbasis peran untuk staf, operator, dan administrator rekayasa Divisi TIE.',
        },
        isAuthentic: true,
      },
      {
        id: 'tims-inv',
        url: '/images/projects/tims-inventory.png',
        fallbackUrl: '/images/projects/tims-preview.svg',
        title: {
          en: 'Inventory Catalog & Item Registry',
          id: 'Katalog Inventaris & Registri Barang',
        },
        caption: {
          en: 'Comprehensive inventory indexing with barcode lookup, status tagging, category filtering, and location tracking.',
          id: 'Pengindeksan inventaris komprehensif dengan pencarian barcode, penandaan status, filter kategori, dan pelacakan lokasi.',
        },
        isAuthentic: false,
      },
      {
        id: 'tims-stock',
        url: '/images/projects/tims-stock-management.png',
        fallbackUrl: '/images/projects/tims-preview.svg',
        title: {
          en: 'Stock In / Out Transaction Workflow',
          id: 'Alur Kerja Transaksi Stok Masuk / Keluar',
        },
        caption: {
          en: 'Automated transaction logging supporting batch dispatch, audit trails, and inventory reconciliation.',
          id: 'Pencatatan transaksi otomatis yang mendukung pengiriman batch, jejak audit, dan rekonsiliasi inventaris.',
        },
        isAuthentic: false,
      },
      {
        id: 'tims-reserve',
        url: '/images/projects/tims-reservation.png',
        fallbackUrl: '/images/projects/tims-preview.svg',
        title: {
          en: 'Reservation & Loan/Return Management',
          id: 'Manajemen Reservasi & Peminjaman/Pengembalian',
        },
        caption: {
          en: 'Reservation scheduling module with real-time availability checks, loan tracking, and overdue reminders.',
          id: 'Modul penjadwalan reservasi dengan pengecekan ketersediaan real-time, pelacakan pinjaman, dan pengingat jatuh tempo.',
        },
        isAuthentic: false,
      },
    ],
    details: {
      overview: {
        en: 'TIMS (TIE Inventory Management System) is an enterprise-scale web application developed to modernize and digitize inventory tracking for the TIE Division at PT Denso Indonesia. The platform replaced fragmented recordkeeping with a centralized, role-secured management platform.',
        id: 'TIMS (TIE Inventory Management System) adalah aplikasi web berskala enterprise yang dikembangkan untuk memodernisasi dan mendigitalkan pencatatan inventaris Divisi TIE di PT Denso Indonesia. Platform ini menggantikan sistem manual dengan platform terpusat yang aman berbasis peran.',
      },
      problemStatement: {
        en: 'The previous inventory workflows relied on manual spreadsheets and dispersed records, which led to synchronization delays, difficulty tracking item reservation schedules, prolonged audit processes, and risk of discrepancies during stock reconciliation.',
        id: 'Alur kerja inventaris sebelumnya mengandalkan pencatatan lembar kerja manual yang terpisah, menyebabkan keterlambatan sinkronisasi, kesulitan memantau jadwal reservasi barang, proses audit yang memakan waktu lama, serta risiko selisih saat rekonsiliasi stok.',
      },
      objectives: [
        {
          en: 'Centralize inventory asset records into a high-concurrency Microsoft SQL Server database.',
          id: 'Sentralisasi data aset inventaris ke dalam basis data Microsoft SQL Server berkinerja tinggi.',
        },
        {
          en: 'Streamline stock-in, stock-out, and loan/return workflows with complete audit trails.',
          id: 'Menyederhanakan alur transaksi barang masuk, keluar, dan peminjaman/pengembalian dengan jejak audit lengkap.',
        },
        {
          en: 'Implement strict Role-Based Access Control (RBAC) to ensure operational security across administrative and engineering tiers.',
          id: 'Menerapkan Role-Based Access Control (RBAC) ketat untuk menjamin keamanan operasional antara tim administrator dan teknisi.',
        },
        {
          en: 'Deliver an intuitive responsive dashboard providing real-time inventory telemetry to division stakeholders.',
          id: 'Menyediakan dasbor responsif intuitif yang menyajikan telemetri inventaris real-time kepada pemangku kepentingan divisi.',
        },
      ],
      roleAndContributions: [
        {
          en: 'Engineered responsive frontend user interfaces using React and TypeScript with modular components.',
          id: 'Membangun antarmuka pengguna frontend yang responsif menggunakan React dan TypeScript dengan komponen modular.',
        },
        {
          en: 'Developed Node.js RESTful API endpoints handling complex inventory logic, reservation conflicts, and batch transactions.',
          id: 'Mengembangkan endpoint RESTful API berbasis Node.js yang menangani logika inventaris kompleks, validasi reservasi, dan transaksi batch.',
        },
        {
          en: 'Designed and optimized Microsoft SQL Server relational schemas, stored procedures, and indexing for fast query response.',
          id: 'Merancang dan mengoptimalkan skema relasional Microsoft SQL Server, stored procedures, dan indexing untuk performa kueri cepat.',
        },
        {
          en: 'Implemented role-based permissions and secure authentication workflows protecting sensitive operational data.',
          id: 'Mengimplementasikan hak akses berbasis peran dan alur autentikasi aman untuk melindungi data operasional perusahaan.',
        },
      ],
      keyModules: [
        {
          title: {
            en: 'Inventory Management & Cataloging',
            id: 'Manajemen & Katalogisasi Inventaris',
          },
          description: {
            en: 'Multi-category asset registry with custom tagging, specification metadata, and real-time status indicators.',
            id: 'Registri aset multi-kategori dengan pelabelan kustom, metadata spesifikasi, dan indikator status waktu nyata.',
          },
        },
        {
          title: {
            en: 'Stock Transactions (In / Out)',
            id: 'Transaksi Stok (Masuk / Keluar)',
          },
          description: {
            en: 'Structured transaction recording with automated stock deduction, receiving logs, and historical audit reporting.',
            id: 'Pencatatan transaksi terstruktur dengan pengurangan stok otomatis, log penerimaan, dan pelaporan audit historis.',
          },
        },
        {
          title: {
            en: 'Reservation & Loan/Return Workflow',
            id: 'Alur Reservasi & Peminjaman/Pengembalian',
          },
          description: {
            en: 'Conflict-free equipment booking system with automated status transitions upon checkout and return.',
            id: 'Sistem pemesanan alat tanpa konflik jadwal dengan transisi status otomatis saat pengambilan dan pengembalian.',
          },
        },
        {
          title: {
            en: 'Role-Based Access Control (RBAC)',
            id: 'Kontrol Akses Berbasis Peran (RBAC)',
          },
          description: {
            en: 'Granular authorization matrix isolating viewer, operator, engineer, and administrator capabilities.',
            id: 'Matriks otorisasi terperinci yang memisahkan kapabilitas peran viewer, operator, engineer, dan administrator.',
          },
        },
      ],
      technicalHighlights: [
        {
          en: 'Architected with a clean separation of concerns between React frontend presentation and Node.js business logic.',
          id: 'Dirancang dengan pemisahan arsitektur yang jelas antara presentasi frontend React dan logika bisnis Node.js.',
        },
        {
          en: 'Strict transactional integrity utilizing SQL database transactions to guarantee zero inventory discrepancies.',
          id: 'Integritas transaksi ketat menggunakan database transactions SQL untuk menjamin tidak adanya selisih stok.',
        },
        {
          en: 'Optimized client-side rendering with memoized selectors and debounced search filters for responsive table operations.',
          id: 'Optimasi rendering sisi klien dengan pemilih termemoisasi dan filter pencarian ter-debounce untuk pengoperasian tabel yang responsif.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge: {
            en: 'Preventing double-booking and reservation overlap for high-demand engineering equipment.',
            id: 'Mencegah pemesanan ganda (double-booking) dan tumpang tindih reservasi pada perangkat rekayasa bernilai tinggi.',
          },
          solution: {
            en: 'Engineered an atomic database reservation lock mechanism that verifies date availability ranges prior to commit.',
            id: 'Merancang mekanisme penguncian reservasi database atomik yang memvalidasi rentang tanggal sebelum penyimpanan.',
          },
        },
        {
          challenge: {
            en: 'Handling thousands of inventory records without degrading table scroll performance on low-spec workstations.',
            id: 'Menangani ribuan catatan inventaris tanpa menurunkan performa scroll tabel pada komputer operasional.',
          },
          solution: {
            en: 'Implemented server-side cursor pagination, indexed database queries, and virtualized list rendering.',
            id: 'Menerapkan paginasi kursor sisi server, kueri database terindeks, dan virtualisasi rendering daftar.',
          },
        },
      ],
      outcomes: [
        {
          en: 'Successfully modernized the TIE Division inventory ecosystem, transitioning paper and spreadsheet records into an automated web platform.',
          id: 'Berhasil memodernisasi ekosistem inventaris Divisi TIE, mengalihkan pencatatan kertas dan lembar kerja ke platform web otomatis.',
        },
        {
          en: 'Significantly accelerated inventory lookup and transaction logging turnaround times.',
          id: 'Mempercepat waktu pencarian inventaris dan pencatatan transaksi operasional secara signifikan.',
        },
        {
          en: 'Established transparent accountability and complete audit traceability for equipment loans across teams.',
          id: 'Mewujudkan akuntabilitas transparan dan keterlacakan audit lengkap untuk peminjaman perangkat antar tim.',
        },
      ],
      privacyDisclaimer: {
        en: 'TIMS is proprietary intellectual property of PT Denso Indonesia. All visual representations comply with enterprise confidentiality policies: real inventory records, employee names, NPK identifiers, credentials, and internal network addresses have been sanitized or replaced with conceptual architecture illustrations pending authorized sanitized captures.',
        id: 'TIMS adalah properti intelektual milik PT Denso Indonesia. Seluruh representasi visual mematuhi kebijakan kerahasiaan perusahaan: catatan inventaris nyata, nama karyawan, nomor identifikasi NPK, kredensial, dan alamat jaringan internal telah disanitasi atau digantikan dengan ilustrasi arsitektur konsep.',
      },
    },
    published: true,
    sortOrder: 1,
  },
  {
    id: 'proj-face-attendance',
    slug: 'face-recognition-attendance-system',
    title: 'Real-Time Face Recognition Attendance System',
    category: 'ai',
    role: {
      en: 'Informatics Engineer / Final Year Project',
      id: 'Rekayasa Informatika / Tugas Akhir',
    },
    summary: {
      en: 'Real-time face recognition attendance system featuring anti-spoofing detection using YOLOv8 and ArcFace, published in Jurnal Riset Komputer (SINTA 3).',
      id: 'Sistem presensi pengenalan wajah real-time dengan deteksi anti-spoofing menggunakan YOLOv8 dan ArcFace, dipublikasikan di Jurnal Riset Komputer (SINTA 3).',
    },
    description: {
      en: 'A real-time student attendance system based on facial recognition with anti-spoofing detection using YOLOv8 and ArcFace. Developed real-time face detection, anti-spoofing validation workflows, feature extraction, and identity classification. Integrated the deep learning pipeline into an attendance application and published findings in Jurnal Riset Komputer (SINTA 3, DOI: 10.30865/jurikom.v13i1.9502).',
      id: 'Sistem presensi mahasiswa berbasis pengenalan wajah real-time dengan deteksi anti-spoofing menggunakan YOLOv8 dan ArcFace. Mengembangkan deteksi wajah real-time, alur validasi anti-spoofing, ekstraksi fitur, dan klasifikasi identitas. Mengintegrasikan pipeline deep learning ke dalam aplikasi presensi dan mempublikasikan hasil riset di Jurnal Riset Komputer (SINTA 3, DOI: 10.30865/jurikom.v13i1.9502).',
    },
    technologies: ['Python', 'YOLOv8', 'ArcFace', 'OpenCV', 'PyTorch', 'Computer Vision'],
    thumbnailUrl: '/images/projects/face-detection-result.png',
    authenticScreenshotUrl: '/images/projects/face-detection-result.png',
    fallbackIllustrationUrl: '/images/projects/face-rec-preview.svg',
    isAuthenticScreenshot: true,
    expectedScreenshots: [
      'face-detection-result.png',
      'face-recognition-dashboard.png',
      'anti-spoofing-result.png',
    ],
    galleryScreenshots: [
      {
        id: 'face-detect',
        url: '/images/projects/face-detection-result.png',
        fallbackUrl: '/images/projects/face-rec-preview.svg',
        title: {
          en: 'YOLOv8 Face Detection & Landmark Extraction',
          id: 'Deteksi Wajah YOLOv8 & Ekstraksi Titik Landmark',
        },
        caption: {
          en: 'Sub-second facial localization across varied lighting conditions and head tilt angles with real-time bounding box output.',
          id: 'Lokalisasi wajah sub-detik pada berbagai kondisi pencahayaan dan sudut kemiringan kepala dengan keluaran bounding box real-time.',
        },
        isAuthentic: true,
      },
      {
        id: 'face-dash',
        url: '/images/projects/face-recognition-dashboard.png',
        fallbackUrl: '/images/projects/face-rec-preview.svg',
        title: {
          en: 'Real-Time Biometric Monitoring Console',
          id: 'Konsol Pemantauan Biometrik Real-Time',
        },
        caption: {
          en: 'Live video stream ingestion with instant bounding box overlay, recognition confidence score, and timestamp verification.',
          id: 'Pemrosesan stream video langsung dengan overlay bounding box instan, skor keyakinan pengenalan, dan verifikasi waktu.',
        },
        isAuthentic: false,
      },
      {
        id: 'face-spoof',
        url: '/images/projects/anti-spoofing-result.png',
        fallbackUrl: '/images/projects/face-rec-preview.svg',
        title: {
          en: 'Anti-Spoofing Liveness Verification Layer',
          id: 'Lapisan Verifikasi Liveness Anti-Spoofing',
        },
        caption: {
          en: 'Discrimination pipeline detecting photo printouts, digital screen replays, and artificial face artifacts.',
          id: 'Pipeline diskriminasi yang mendeteksi cetakan foto, tayangan ulang layar digital, dan artefak wajah tiruan.',
        },
        isAuthentic: false,
      },
    ],
    details: {
      overview: {
        en: 'An academic research and engineering implementation of an automated student attendance system using deep learning. The system pairs state-of-the-art YOLOv8 face detection with ArcFace deep metric embeddings and anti-spoofing validation to deliver reliable, tamper-resistant biometric logging.',
        id: 'Penelitian akademis dan implementasi rekayasa sistem presensi mahasiswa otomatis menggunakan deep learning. Sistem ini memadukan deteksi wajah YOLOv8 dengan embedding metrik mendalam ArcFace dan validasi anti-spoofing untuk pencatatan biometrik yang andal.',
      },
      problemStatement: {
        en: 'Conventional barcode and manual attendance logging systems suffer from proxy attendance (titip absen), physical queues, and vulnerability to presentation attacks (holding up a smartphone photo or printed face portrait to deceive automated cameras).',
        id: 'Sistem presensi manual dan barcode konvensional rentan terhadap kecurangan titip absen, antrean fisik yang panjang, serta kerentanan terhadap presentation attacks (menggunakan foto ponsel atau cetakan wajah untuk mengelabui kamera).',
      },
      objectives: [
        {
          en: 'Develop high-speed facial localization pipeline capable of detecting faces in real-time camera feeds.',
          id: 'Mengembangkan alur lokalisasi wajah berkecepatan tinggi yang mampu mendeteksi wajah pada umpan kamera real-time.',
        },
        {
          en: 'Integrate ArcFace margin loss embeddings to achieve robust identity classification across varied angles and lighting.',
          id: 'Mengintegrasikan embedding ArcFace margin loss untuk klasifikasi identitas yang tangguh di berbagai sudut dan pencahayaan.',
        },
        {
          en: 'Implement an anti-spoofing liveness detector to eliminate photo-print and video-screen replay exploits.',
          id: 'Menerapkan detektor liveness anti-spoofing untuk mengeliminasi kecurangan foto cetak dan pemutaran ulang video layar.',
        },
        {
          en: 'Publish empirical research methodology and evaluation metrics in a peer-reviewed accredited scientific journal (SINTA 3).',
          id: 'Mempublikasikan metodologi penelitian empiris dan metrik evaluasi pada jurnal ilmiah terakreditasi nasional (SINTA 3).',
        },
      ],
      roleAndContributions: [
        {
          en: 'Conducted dataset preparation, face alignment preprocessing, and image augmentation pipelines.',
          id: 'Melakukan persiapan dataset, pra-pemrosesan penyelarasan wajah, dan pipeline augmentasi citra.',
        },
        {
          en: 'Trained and tuned the YOLOv8 detection architecture for low-latency facial bounding box inference.',
          id: 'Melatih dan menyetel arsitektur deteksi YOLOv8 untuk inferensi bounding box wajah berlatensi rendah.',
        },
        {
          en: 'Implemented ArcFace 512-dimensional embedding extraction and cosine similarity verification logic.',
          id: 'Mengimplementasikan ekstraksi embedding 512-dimensi ArcFace dan logika verifikasi cosine similarity.',
        },
        {
          en: 'Authored the scientific research paper published in Jurnal Riset Komputer (JURIKOM, SINTA 3, Vol. 13 No. 1, 2026).',
          id: 'Menulis makalah penelitian ilmiah yang diterbitkan di Jurnal Riset Komputer (JURIKOM, SINTA 3, Vol. 13 No. 1, 2026).',
        },
      ],
      keyModules: [
        {
          title: {
            en: 'YOLOv8 Detection Engine',
            id: 'Mesin Deteksi YOLOv8',
          },
          description: {
            en: 'High-throughput one-stage detector localizing faces with high precision across complex backgrounds.',
            id: 'Detektor satu tahap berkecepatan tinggi yang melokalisasi wajah dengan presisi tinggi di latar belakang yang kompleks.',
          },
        },
        {
          title: {
            en: 'Anti-Spoofing Validation Gate',
            id: 'Gerbang Validasi Anti-Spoofing',
          },
          description: {
            en: 'Liveness classifier distinguishing live biological faces from 2D printouts and high-definition screens.',
            id: 'Pengklasifikasi liveness yang membedakan wajah biologis asli dari cetakan 2D dan tampilan layar definisi tinggi.',
          },
        },
        {
          title: {
            en: 'ArcFace Feature Extraction',
            id: 'Ekstraksi Fitur ArcFace',
          },
          description: {
            en: 'Additive angular margin loss embedding projecting facial identities onto a hypersphere for optimal discriminative power.',
            id: 'Embedding additive angular margin loss yang memetakan identitas wajah ke hipersfer untuk daya diskriminasi optimal.',
          },
        },
        {
          title: {
            en: 'Attendance Logging & Database Sync',
            id: 'Pencatatan Presensi & Sinkronisasi Basis Data',
          },
          description: {
            en: 'Automated timestamp recording with verified student ID, confidence threshold checking, and deduplication.',
            id: 'Pencatatan stempel waktu otomatis dengan ID mahasiswa terverifikasi, validasi ambang batas, dan deduplikasi.',
          },
        },
      ],
      technicalHighlights: [
        {
          en: 'Real-time inference pipeline executing comfortably on commodity GPU hardware.',
          id: 'Pipeline inferensi waktu nyata yang berjalan optimal pada perangkat keras GPU standar.',
        },
        {
          en: 'Empirically evaluated against spoofing attack benchmarks, verifying robustness against presentation attacks.',
          id: 'Dievaluasi secara empiris terhadap tolok ukur serangan spoofing, membuktikan ketahanan terhadap presentation attacks.',
        },
        {
          en: 'Formal publication in SINTA 3 national accredited journal (DOI: 10.30865/jurikom.v13i1.9502).',
          id: 'Publikasi formal pada jurnal nasional terakreditasi SINTA 3 (DOI: 10.30865/jurikom.v13i1.9502).',
        },
      ],
      challengesAndSolutions: [
        {
          challenge: {
            en: 'False positives caused by photo print attacks and smartphone screen replays.',
            id: 'Kesalahan positif yang disebabkan oleh serangan foto cetak dan pemutaran ulang layar ponsel.',
          },
          solution: {
            en: 'Introduced an anti-spoofing classification step directly prior to ArcFace vector extraction.',
            id: 'Menerapkan tahapan klasifikasi anti-spoofing tepat sebelum ekstraksi vektor representasi ArcFace.',
          },
        },
        {
          challenge: {
            en: 'Variations in facial angle and ambient room lighting during live classroom entry.',
            id: 'Variasi sudut wajah dan pencahayaan ruangan saat mahasiswa memasuki kelas.',
          },
          solution: {
            en: 'Applied photometric normalization and trained with augmented perspective affine transforms.',
            id: 'Menerapkan normalisasi fotometrik dan pelatihan dengan augmentasi transformasi afinitas perspektif.',
          },
        },
      ],
      outcomes: [
        {
          en: 'Successfully published research in Jurnal Riset Komputer (JURIKOM, SINTA 3).',
          id: 'Berhasil mempublikasikan riset di Jurnal Riset Komputer (JURIKOM, SINTA 3).',
        },
        {
          en: 'Proved the viability of combined YOLOv8 + ArcFace architectures for practical academic attendance automation.',
          id: 'Membuktikan efektivitas kombinasi arsitektur YOLOv8 + ArcFace untuk otomatisasi presensi akademis praktis.',
        },
      ],
      privacyDisclaimer: {
        en: 'Biometric Privacy Notice: In compliance with biometric data protection standards, no unauthorized personal biometric facial data or identifiable student attendance logs are exposed publicly. All demonstration assets utilize authorized synthetic/consented test samples or conceptual computer vision telemetry illustrations.',
        id: 'Pemberitahuan Privasi Biometrik: Sesuai standar perlindungan data biometrik, tidak ada data wajah pribadi atau catatan presensi mahasiswa yang ditampilkan secara publik tanpa izin. Seluruh visual demonstrasi menggunakan sampel uji berizin atau ilustrasi konsep telemetri computer vision.',
      },
    },
    published: true,
    sortOrder: 2,
  },
  {
    id: 'proj-rri-inventory',
    slug: 'rri-inventory-management-application',
    title: 'Web-Based Inventory Management Application',
    category: 'web',
    role: {
      en: 'Informatics Engineer / Project Based',
      id: 'Rekayasa Informatika / Berbasis Proyek',
    },
    summary: {
      en: 'Web-based inventory application developed during internship at LPP RRI Lhokseumawe to modernize office inventory tracking and item reporting.',
      id: 'Aplikasi inventaris berbasis web yang dikembangkan saat magang di LPP RRI Lhokseumawe untuk memodernisasi pencatatan inventaris kantor dan pelaporan barang.',
    },
    description: {
      en: 'A web-based inventory application developed during the internship at LPP Radio Republik Indonesia (RRI) Lhokseumawe (During RRI Internship – 2023). Designed and developed item cataloging, user authentication, reporting, data search features, and optimized the MySQL database schema for inventory operations.',
      id: 'Aplikasi inventaris berbasis web yang dikembangkan selama masa magang di LPP Radio Republik Indonesia (RRI) Lhokseumawe (Masa Magang RRI – 2023). Merancang dan mengembangkan katalog barang, autentikasi pengguna, modul pelaporan, fitur pencarian data, serta mengoptimalkan skema basis data MySQL untuk operasional inventaris.',
    },
    technologies: ['PHP', 'MySQL', 'Web Application Development', 'JavaScript', 'HTML/CSS'],
    thumbnailUrl: '/images/projects/rri-login.png',
    authenticScreenshotUrl: '/images/projects/rri-login.png',
    fallbackIllustrationUrl: '/images/projects/rri-preview.svg',
    isAuthenticScreenshot: true,
    expectedScreenshots: [
      'rri-login.png',
      'rri-dashboard.png',
      'rri-inventory.png',
    ],
    galleryScreenshots: [
      {
        id: 'rri-login',
        url: '/images/projects/rri-login.png',
        fallbackUrl: '/images/projects/rri-preview.svg',
        title: {
          en: 'Administrative Authentication Portal',
          id: 'Portal Autentikasi Administrator',
        },
        caption: {
          en: 'Secure login gateway restricting asset modifications and inventory reports to authorized station operators.',
          id: 'Pintu masuk login aman yang membatasi pengubahan aset dan laporan inventaris hanya kepada staf berwenang.',
        },
        isAuthentic: true,
      },
      {
        id: 'rri-dash',
        url: '/images/projects/rri-dashboard.png',
        fallbackUrl: '/images/projects/rri-preview.svg',
        title: {
          en: 'RRI Asset & Inventory Dashboard',
          id: 'Dasbor Aset & Inventaris RRI',
        },
        caption: {
          en: 'Centralized overview of institutional broadcast equipment, station asset counts, and active condition logs.',
          id: 'Ikhtisar terpusat dari peralatan siaran institusi, jumlah aset stasiun, dan log kondisi aktif.',
        },
        isAuthentic: false,
      },
      {
        id: 'rri-inv',
        url: '/images/projects/rri-inventory.png',
        fallbackUrl: '/images/projects/rri-preview.svg',
        title: {
          en: 'Item Cataloging & Asset Registry',
          id: 'Katalogisasi Barang & Registri Aset',
        },
        caption: {
          en: 'Structured table indexing station hardware with search queries, categorical filters, and exportable reports.',
          id: 'Tabel terstruktur yang mengindeks perangkat keras stasiun dengan kueri pencarian, filter kategori, dan laporan yang dapat diekspor.',
        },
        isAuthentic: false,
      },
    ],
    details: {
      overview: {
        en: 'A web-based inventory application designed and engineered during the practical internship at LPP Radio Republik Indonesia (RRI) Lhokseumawe. The application transformed legacy manual asset logs into a structured database-driven digital system.',
        id: 'Aplikasi inventaris berbasis web yang dirancang dan dibangun selama masa magang di LPP Radio Republik Indonesia (RRI) Lhokseumawe. Aplikasi ini mentransformasikan pencatatan log aset manual ke sistem digital terstruktur berbasis basis data.',
      },
      problemStatement: {
        en: 'Asset tracking across broadcasting studios, transmitter stations, and news reporting units was managed using paper logbooks, resulting in lost records, slow equipment reconciliation, and cumbersome periodic reporting.',
        id: 'Pelacakan aset di studio penyiaran, stasiun pemancar, dan unit peliputan berita dikelola menggunakan buku log fisik, menyebabkan hilangnya catatan, lambatnya rekonsiliasi perangkat, dan sulitnya pembuatan laporan berkala.',
      },
      objectives: [
        {
          en: 'Build a responsive web application to catalog all station assets and broadcasting gear.',
          id: 'Membangun aplikasi web responsif untuk mencatat seluruh aset stasiun dan perangkat penyiaran.',
        },
        {
          en: 'Implement user authentication to restrict inventory edits to authorized administrative staff.',
          id: 'Menerapkan autentikasi pengguna untuk membatasi pengeditan inventaris hanya pada staf berwenang.',
        },
        {
          en: 'Provide rapid search and filtering across asset categories, conditions, and locations.',
          id: 'Menyediakan pencarian cepat dan penyaringan kategori, kondisi, serta lokasi aset.',
        },
        {
          en: 'Generate clean exportable summaries for institutional asset reporting cycles.',
          id: 'Menghasilkan ringkasan laporan yang dapat diekspor untuk siklus pelaporan aset institusi.',
        },
      ],
      roleAndContributions: [
        {
          en: 'Analyzed institutional inventory requirements and documented user workflow needs.',
          id: 'Menganalisis kebutuhan inventaris institusi dan mendokumentasikan alur kerja pengguna.',
        },
        {
          en: 'Designed and normalized the relational MySQL database schema for items, categories, and audit logs.',
          id: 'Merancang dan menormalisasi skema basis data MySQL untuk barang, kategori, dan log audit.',
        },
        {
          en: 'Developed backend CRUD controllers and authentication workflows using PHP.',
          id: 'Mengembangkan controller CRUD backend dan alur autentikasi menggunakan PHP.',
        },
        {
          en: 'Built clean, responsive frontend web forms and interactive asset tables.',
          id: 'Membangun formulir web frontend yang bersih dan tabel aset interaktif yang responsif.',
        },
      ],
      keyModules: [
        {
          title: {
            en: 'Asset Registry & Categorization',
            id: 'Registri Aset & Kategorisasi',
          },
          description: {
            en: 'Comprehensive database of broadcasting equipment, studio gear, and office hardware.',
            id: 'Basis data komprehensif peralatan penyiaran, perangkat studio, dan perlengkapan kantor.',
          },
        },
        {
          title: {
            en: 'Search & Multi-Filter Querying',
            id: 'Pencarian & Penyaringan Multi-Kriteria',
          },
          description: {
            en: 'Real-time filtering by asset condition, location, acquisition year, and serial numbers.',
            id: 'Penyaringan waktu nyata berdasarkan kondisi aset, lokasi, tahun perolehan, dan nomor seri.',
          },
        },
        {
          title: {
            en: 'Authentication & Access Security',
            id: 'Autentikasi & Keamanan Akses',
          },
          description: {
            en: 'Session-based authentication securing asset mutations and report generation.',
            id: 'Autentikasi berbasis sesi untuk mengamankan perubahan data aset dan pembuatan laporan.',
          },
        },
        {
          title: {
            en: 'Reporting & Inventory Export',
            id: 'Pelaporan & Ekspor Inventaris',
          },
          description: {
            en: 'Structured summaries formatted for institutional audits and asset verification.',
            id: 'Ringkasan terstruktur yang diformat untuk audit institusional dan verifikasi aset.',
          },
        },
      ],
      technicalHighlights: [
        {
          en: 'Lightweight PHP architecture ensuring fast load times on local network and shared hosting.',
          id: 'Arsitektur PHP yang ringan memastikan pemuatan cepat pada jaringan lokal dan shared hosting.',
        },
        {
          en: 'Normalized third normal form (3NF) MySQL schema preventing redundant asset attributes.',
          id: 'Skema MySQL ternormalisasi (3NF) untuk mencegah redundansi atribut aset.',
        },
        {
          en: 'Sanitized input queries preventing SQL injection and cross-site scripting vulnerabilities.',
          id: 'Kueri input tersanitasi untuk mencegah kerentanan injeksi SQL dan cross-site scripting.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge: {
            en: 'Migrating non-standardized historical paper log entries into a relational database.',
            id: 'Migrasi catatan log fisik historis yang tidak terstandarisasi ke dalam basis data relasional.',
          },
          solution: {
            en: 'Established unified asset categorization standards and validation rules before database entry.',
            id: 'Menetapkan standar kategorisasi aset dan aturan validasi terpadu sebelum entri data.',
          },
        },
      ],
      outcomes: [
        {
          en: 'Successfully delivered and deployed the application for internal administrative use at LPP RRI Lhokseumawe.',
          id: 'Berhasil menyelesaikan dan mengimplementasikan aplikasi untuk kebutuhan administratif internal di LPP RRI Lhokseumawe.',
        },
        {
          en: 'Replaced manual physical logbooks, streamlining asset tracking across radio production units.',
          id: 'Menggantikan buku log fisik manual dan mempercepat pelacakan aset di seluruh unit produksi siaran.',
        },
      ],
      privacyDisclaimer: {
        en: 'Application representations reflect the public broadcasting administrative project developed during internship. Internal institutional network details or confidential asset serial numbers are omitted in accordance with public sector guidelines.',
        id: 'Representasi aplikasi mencerminkan proyek administratif penyiaran publik yang dikembangkan saat magang. Rincian jaringan institusi internal atau nomor seri aset rahasia tidak dipublikasikan sesuai panduan sektor publik.',
      },
    },
    published: true,
    sortOrder: 3,
  },
];
