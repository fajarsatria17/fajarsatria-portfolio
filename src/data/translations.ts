export interface TranslationSchema {
  nav: {
    about: string;
    skills: string;
    experience: string;
    education: string;
    projects: string;
    certifications: string;
    contact: string;
    resume: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    viewProjects: string;
    contactMe: string;
    availableForWork: string;
  };
  about: {
    downloadCv: string;
    cvUponRequest: string;
    gpa: string;
    gpaLabel: string;
    publication: string;
    publicationLabel: string;
    graduationYear: string;
    graduationYearLabel: string;
    focus: string;
    focusLabel: string;
    keyStrengths: string;
    locationLabel: string;
  };
  skills: {
    languages: string;
    webDev: string;
    aiMl: string;
    databaseEngineering: string;
    devTools: string;
    softSkills: string;
  };
  experience: {
    present: string;
  };
  education: {
    empty: string;
    thesisLabel: string;
    publicationLabel: string;
    courseworkLabel: string;
    viewDoi: string;
  };
  sections: {
    aboutTitle: string;
    aboutSubtitle: string;
    skillsTitle: string;
    skillsSubtitle: string;
    experienceTitle: string;
    experienceSubtitle: string;
    educationTitle: string;
    educationSubtitle: string;
    projectsTitle: string;
    projectsSubtitle: string;
    certificationsTitle: string;
    certificationsSubtitle: string;
    contactTitle: string;
    contactSubtitle: string;
  };
  projects: {
    all: string;
    web: string;
    mobile: string;
    system: string;
    ai: string;
    liveDemo: string;
    sourceCode: string;
    viewDetails: string;
    backToProjects: string;
    empty: string;
    problem: string;
    solution: string;
    role: string;
    techStack: string;
    overview: string;
    problemStatement: string;
    objectives: string;
    myRole: string;
    keyModules: string;
    screenshotsTitle: string;
    screenshotsSubtitle: string;
    technicalHighlights: string;
    challengesSolutions: string;
    outcomes: string;
    privacyNotice: string;
    authenticScreenshotBadge: string;
    conceptIllustrationBadge: string;
    screenshotPending: string;
    screenshotPendingDesc: string;
    clickToZoom: string;
    closeLightbox: string;
  };
  contact: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    send: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    errorTitle: string;
    errorDesc: string;
    privacyNote: string;
    emailDirect: string;
    socialProfiles: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    skipLink: string;
  };
  notFound: {
    title: string;
    desc: string;
    backHome: string;
  };
}

export const translations: Record<'en' | 'id', TranslationSchema> = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      certifications: 'Certifications',
      contact: 'Contact',
      resume: 'Resume',
      openMenu: 'Open main menu',
      closeMenu: 'Close main menu',
    },
    hero: {
      viewProjects: 'View Projects',
      contactMe: 'Contact Me',
      availableForWork: 'Available for Opportunities',
    },
    about: {
      downloadCv: 'Download Resume',
      cvUponRequest: 'CV Available Upon Request',
      gpa: '3.70 / 4.00',
      gpaLabel: 'Cumulative GPA',
      publication: 'SINTA 3',
      publicationLabel: 'Journal Publication (JURIKOM)',
      graduationYear: '2026',
      graduationYearLabel: 'Graduation Year',
      focus: 'AI & Web',
      focusLabel: 'Core Specialization',
      keyStrengths: 'Engineering Focus & Strengths',
      locationLabel: 'Base Location',
    },
    skills: {
      languages: 'Programming Languages',
      webDev: 'Web & Application Development',
      aiMl: 'AI & Machine Learning',
      databaseEngineering: 'Database & Engineering',
      devTools: 'Development Tools',
      softSkills: 'Soft Skills',
    },
    experience: {
      present: 'Present',
    },
    education: {
      empty: 'No education entries currently published.',
      thesisLabel: 'Undergraduate Thesis',
      publicationLabel: 'Scientific Publication',
      courseworkLabel: 'Relevant Coursework',
      viewDoi: 'View Paper via DOI',
    },
    sections: {
      aboutTitle: 'About Me',
      aboutSubtitle: 'Informatics Engineering graduate specializing in AI, Machine Learning, and Full-Stack Development',
      skillsTitle: 'Skills & Capabilities',
      skillsSubtitle: 'Core technical proficiencies, development frameworks, and engineering tools',
      experienceTitle: 'Work & Professional Experience',
      experienceSubtitle: 'Contributions to digital transformation initiatives and professional projects',
      educationTitle: 'Education & Research',
      educationSubtitle: 'Academic background, degree program, and scientific publications',
      projectsTitle: 'Featured Projects',
      projectsSubtitle: 'Selected software systems, web applications, and artificial intelligence solutions',
      certificationsTitle: 'Certifications & Credentials',
      certificationsSubtitle: 'Verified achievements and professional credentials',
      contactTitle: 'Get In Touch',
      contactSubtitle: 'Interested in collaborating or discussing technical opportunities? Reach out below.',
    },
    projects: {
      all: 'All',
      web: 'Web Apps',
      mobile: 'Mobile',
      system: 'Systems',
      ai: 'AI & Data',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      viewDetails: 'View Details',
      backToProjects: '← Back to Projects',
      empty: 'No projects found in this category.',
      problem: 'Problem & Context',
      solution: 'Solution & Architecture',
      role: 'My Role & Contributions',
      techStack: 'Technologies Used',
      overview: 'Project Overview',
      problemStatement: 'Problem Statement',
      objectives: 'Core Objectives',
      myRole: 'My Role & Contributions',
      keyModules: 'Key Modules & Functionality',
      screenshotsTitle: 'Application Screenshots & Visual Interface',
      screenshotsSubtitle: 'Visual walkthrough of operational interfaces, system workflows, and user experiences',
      technicalHighlights: 'Technical Implementation Highlights',
      challengesSolutions: 'Challenges & Engineering Solutions',
      outcomes: 'Project Outcomes & Impact',
      privacyNotice: 'Privacy & Confidentiality Notice',
      authenticScreenshotBadge: 'Authentic Screenshot',
      conceptIllustrationBadge: 'Concept Illustration',
      screenshotPending: 'Screenshots Awaiting Owner Upload',
      screenshotPendingDesc: 'Displaying illustrative architecture visuals while authentic production screenshots are prepared and sanitized.',
      clickToZoom: 'Click to expand image',
      closeLightbox: 'Close lightbox modal',
    },
    contact: {
      name: 'Your Name',
      namePlaceholder: 'Fajar Satria',
      email: 'Email Address',
      emailPlaceholder: 'fajarsatria1945@gmail.com',
      subject: 'Subject (Optional)',
      subjectPlaceholder: 'Project Collaboration / Inquiry',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project, timeline, and goals...',
      send: 'Send Message',
      sending: 'Sending...',
      successTitle: 'Message Received!',
      successDesc: 'Thank you for reaching out. I will get back to you as soon as possible.',
      errorTitle: 'Failed to Send',
      errorDesc: 'Something went wrong while sending your message. Please try again or email directly.',
      privacyNote: 'Your information is only used to respond to your inquiry and is never shared.',
      emailDirect: 'Direct Email',
      socialProfiles: 'Professional Channels',
    },
    footer: {
      rights: 'All rights reserved.',
      builtWith: 'Designed & developed with modern web standards.',
      skipLink: 'Skip to main content',
    },
    notFound: {
      title: 'Page Not Found',
      desc: 'The page you are looking for does not exist or has been moved.',
      backHome: 'Return to Homepage',
    },
  },
  id: {
    nav: {
      about: 'Tentang',
      skills: 'Keahlian',
      experience: 'Pengalaman',
      education: 'Pendidikan',
      projects: 'Proyek',
      certifications: 'Sertifikasi',
      contact: 'Kontak',
      resume: 'Unduh CV',
      openMenu: 'Buka menu utama',
      closeMenu: 'Tutup menu utama',
    },
    hero: {
      viewProjects: 'Lihat Proyek',
      contactMe: 'Hubungi Saya',
      availableForWork: 'Terbuka untuk Peluang Baru',
    },
    about: {
      downloadCv: 'Unduh Resume / CV',
      cvUponRequest: 'CV Tersedia Berdasarkan Permintaan',
      gpa: '3.70 / 4.00',
      gpaLabel: 'Indeks Prestasi Kumulatif (IPK)',
      publication: 'SINTA 3',
      publicationLabel: 'Publikasi Jurnal (JURIKOM)',
      graduationYear: '2026',
      graduationYearLabel: 'Tahun Kelulusan',
      focus: 'AI & Web',
      focusLabel: 'Fokus Spesialisasi',
      keyStrengths: 'Fokus & Kompetensi Rekayasa',
      locationLabel: 'Lokasi',
    },
    skills: {
      languages: 'Bahasa Pemrograman',
      webDev: 'Pengembangan Web & Aplikasi',
      aiMl: 'AI & Machine Learning',
      databaseEngineering: 'Basis Data & Rekayasa',
      devTools: 'Alat Pengembangan',
      softSkills: 'Soft Skills',
    },
    experience: {
      present: 'Sekarang',
    },
    education: {
      empty: 'Belum ada data pendidikan yang dipublikasikan.',
      thesisLabel: 'Skripsi Sarjana',
      publicationLabel: 'Publikasi Ilmiah',
      courseworkLabel: 'Mata Kuliah Terkait',
      viewDoi: 'Lihat Paper via DOI',
    },
    sections: {
      aboutTitle: 'Tentang Saya',
      aboutSubtitle: 'Lulusan Teknik Informatika dengan spesialisasi pada AI, Machine Learning, dan Full-Stack Development',
      skillsTitle: 'Keahlian & Kompetensi',
      skillsSubtitle: 'Kemampuan teknis utama, framework pengembangan, dan perangkat rekayasa perangkat lunak',
      experienceTitle: 'Pengalaman Kerja & Profesional',
      experienceSubtitle: 'Kontribusi dalam inisiatif transformasi digital dan proyek profesional',
      educationTitle: 'Pendidikan & Riset',
      educationSubtitle: 'Latar belakang akademis, program studi, dan publikasi ilmiah',
      projectsTitle: 'Proyek Pilihan',
      projectsSubtitle: 'Kumpulan sistem perangkat lunak, aplikasi web, dan solusi kecerdasan buatan',
      certificationsTitle: 'Sertifikasi & Kredensial',
      certificationsSubtitle: 'Pencapaian terverifikasi dan kredensial profesional',
      contactTitle: 'Hubungi Saya',
      contactSubtitle: 'Tertarik untuk berkolaborasi atau berdiskusi mengenai peluang teknis? Silakan hubungi saya.',
    },
    projects: {
      all: 'Semua',
      web: 'Aplikasi Web',
      mobile: 'Mobile',
      system: 'Sistem',
      ai: 'AI & Data',
      liveDemo: 'Demo Langsung',
      sourceCode: 'Kode Sumber',
      viewDetails: 'Lihat Detail',
      backToProjects: '← Kembali ke Daftar Proyek',
      empty: 'Tidak ada proyek dalam kategori ini.',
      problem: 'Masalah & Konteks',
      solution: 'Solusi & Arsitektur',
      role: 'Peran & Kontribusi',
      techStack: 'Teknologi yang Digunakan',
      overview: 'Ringkasan Proyek',
      problemStatement: 'Pernyataan Masalah',
      objectives: 'Tujuan Utama',
      myRole: 'Peran & Kontribusi Saya',
      keyModules: 'Modul & Fungsionalitas Utama',
      screenshotsTitle: 'Tangkapan Layar Aplikasi & Antarmuka Visual',
      screenshotsSubtitle: 'Panduan visual antarmuka operasional, alur kerja sistem, dan pengalaman pengguna',
      technicalHighlights: 'Sorotan Implementasi Teknis',
      challengesSolutions: 'Tantangan & Solusi Rekayasa',
      outcomes: 'Hasil Proyek & Dampak',
      privacyNotice: 'Pemberitahuan Privasi & Kerahasiaan',
      authenticScreenshotBadge: 'Tangkapan Layar Asli',
      conceptIllustrationBadge: 'Ilustrasi Konsep',
      screenshotPending: 'Tangkapan Layar Menunggu Pengunggahan Pemilik',
      screenshotPendingDesc: 'Menampilkan visual arsitektur ilustratif sementara tangkapan layar produksi asli sedang disiapkan dan disanitasi.',
      clickToZoom: 'Klik untuk memperbesar gambar',
      closeLightbox: 'Tutup modal lightbox',
    },
    contact: {
      name: 'Nama Lengkap',
      namePlaceholder: 'Fajar Satria',
      email: 'Alamat Email',
      emailPlaceholder: 'fajarsatria1945@gmail.com',
      subject: 'Subjek (Opsional)',
      subjectPlaceholder: 'Kolaborasi Proyek / Diskusi',
      message: 'Pesan',
      messagePlaceholder: 'Ceritakan tentang kebutuhan proyek, estimasi waktu, atau tujuan Anda...',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
      successTitle: 'Pesan Berhasil Terkirim!',
      successDesc: 'Terima kasih telah menghubungi. Saya akan membalas pesan Anda secepatnya.',
      errorTitle: 'Gagal Mengirim Pesan',
      errorDesc: 'Terjadi kendala saat mengirim pesan. Silakan coba lagi atau hubungi via email langsung.',
      privacyNote: 'Informasi Anda hanya digunakan untuk membalas komunikasi ini dan tidak akan disebarkan.',
      emailDirect: 'Email Langsung',
      socialProfiles: 'Kanal Profesional',
    },
    footer: {
      rights: 'Hak cipta dilindungi.',
      builtWith: 'Dirancang & dibangun menggunakan standar web modern.',
      skipLink: 'Lewati ke konten utama',
    },
    notFound: {
      title: 'Halaman Tidak Ditemukan',
      desc: 'Halaman yang Anda tuju tidak tersedia atau telah dipindahkan.',
      backHome: 'Kembali ke Beranda',
    },
  },
};

export type TranslationKeys = TranslationSchema;
