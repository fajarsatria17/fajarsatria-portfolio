import type { Experience } from '@type/content';

export const experience: Experience[] = [
  {
    id: 'exp-denso',
    organization: 'PT Denso Indonesia',
    team: 'Digital Transformation (DX) Team',
    division: 'TIE – Factory Engineering',
    role: {
      en: 'Nasional Internship / Digital Transformation Contributor',
      id: 'Magang Nasional / Kontributor Transformasi Digital',
    },
    startDate: '2026-08',
    endDate: null,
    isCurrent: true,
    description: {
      en: 'Contributed to digital transformation initiatives through the development of digital solutions, including TIMS (TIE Inventory Management System), a web-based inventory control system developed to support inventory management processes within the TIE Division.',
      id: 'Berkontribusi dalam inisiatif transformasi digital melalui pengembangan solusi digital, termasuk TIMS (TIE Inventory Management System), sistem kontrol inventaris berbasis web yang dikembangkan untuk mendukung proses manajemen inventaris di Divisi TIE.',
    },
    technologies: ['React', 'TypeScript', 'Node.js', 'Microsoft SQL Server'],
    sortOrder: 1,
    published: true,
  },
  {
    id: 'exp-rri',
    organization: 'LPP Radio Republik Indonesia (RRI), Lhokseumawe, Aceh',
    department: 'Teknik Studio dan Media Baru',
    role: {
      en: 'Intern / Informatics Engineer',
      id: 'Praktikan Magang / Rekayasa Informatika',
    },
    startDate: '2023-10',
    endDate: '2023-12',
    isCurrent: false,
    description: {
      en: 'Managed and updated operational data using Microsoft Excel and internal information systems, assisted document digitization and operational reporting, collaborated on requirements analysis, and designed and developed a web-based inventory application.',
      id: 'Mengelola dan memperbarui data operasional menggunakan Microsoft Excel dan sistem informasi internal, membantu proses digitalisasi dokumen dan pelaporan operasional, berkolaborasi dalam analisis kebutuhan, serta merancang dan mengembangkan aplikasi inventaris berbasis web.',
    },
    technologies: ['PHP', 'MySQL', 'Web Application Development', 'Microsoft Excel'],
    sortOrder: 2,
    published: true,
  },
];
