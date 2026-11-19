import type { Education } from '@type/content';

export const education: Education[] = [
  {
    id: 'edu-unimal',
    institution: 'Universitas Malikussaleh',
    program: {
      en: 'Bachelor of Informatics Engineering',
      id: 'Sarjana Teknik Informatika',
    },
    startDate: '2021-09',
    endDate: '2026-02',
    gpa: '3.70 / 4.00',
    thesis: {
      en: 'Student Attendance System Based on Real-Time Face Recognition with Anti-Spoofing Detection Using YOLOv8 and ArcFace',
      id: 'Sistem Presensi Mahasiswa Berbasis Pengenalan Wajah Real-Time dengan Deteksi Anti-Spoofing Menggunakan YOLOv8 dan ArcFace',
    },
    publication: {
      title: 'Sistem Presensi Mahasiswa Berbasis Pengenalan Wajah Real-Time dengan Deteksi Anti-Spoofing Menggunakan YOLOv8 dan ArcFace',
      journal: 'Jurnal Riset Komputer (JURIKOM)',
      issue: 'Vol. 13, No. 1, Februari 2026 (SINTA 3 Accredited)',
      doi: 'https://doi.org/10.30865/jurikom.v13i1.9502',
    },
    coursework: [
      { en: 'Data Structures & Algorithms', id: 'Struktur Data & Algoritma' },
      { en: 'Database Systems', id: 'Sistem Basis Data' },
      { en: 'Web & Mobile Programming', id: 'Pemrograman Web & Mobile' },
      { en: 'Artificial Intelligence', id: 'Kecerdasan Buatan' },
      { en: 'Machine Learning', id: 'Pembelajaran Mesin' },
      { en: 'Software Engineering', id: 'Rekayasa Perangkat Lunak' },
    ],
    description: {
      en: 'Graduated with GPA 3.70 / 4.00. Published research in Jurnal Riset Komputer (SINTA 3). Focused on Artificial Intelligence, Machine Learning, and Full-Stack Web Development.',
      id: 'Lulus dengan IPK 3.70 / 4.00. Mempublikasikan penelitian di Jurnal Riset Komputer (Terakreditasi SINTA 3). Berfokus pada Artificial Intelligence, Machine Learning, dan Full-Stack Web Development.',
    },
    sortOrder: 1,
    published: true,
  },
];
