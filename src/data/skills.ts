import type { Skill } from '@type/content';

export const skills: Skill[] = [
  // Programming Languages
  { id: 'python', name: 'Python', category: 'languages', sortOrder: 1 },
  { id: 'php', name: 'PHP', category: 'languages', sortOrder: 2 },
  { id: 'ts', name: 'TypeScript', category: 'languages', sortOrder: 3 },
  { id: 'js', name: 'JavaScript', category: 'languages', sortOrder: 4 },

  // Web & Application Development
  { id: 'react', name: 'React', category: 'webDev', sortOrder: 1 },
  { id: 'node', name: 'Node.js', category: 'webDev', sortOrder: 2 },
  { id: 'web-php', name: 'PHP', category: 'webDev', sortOrder: 3 },
  { id: 'web-app-dev', name: 'Web Application Development', category: 'webDev', sortOrder: 4 },
  { id: 'frontend', name: 'Frontend Development', category: 'webDev', sortOrder: 5 },
  { id: 'backend', name: 'Backend Development', category: 'webDev', sortOrder: 6 },

  // AI & Machine Learning
  { id: 'ai', name: 'Artificial Intelligence', category: 'aiMl', sortOrder: 1 },
  { id: 'ml', name: 'Machine Learning', category: 'aiMl', sortOrder: 2 },
  { id: 'yolov8', name: 'YOLOv8', category: 'aiMl', sortOrder: 3 },
  { id: 'arcface', name: 'ArcFace', category: 'aiMl', sortOrder: 4 },
  { id: 'face-rec', name: 'Face Recognition', category: 'aiMl', sortOrder: 5 },
  { id: 'anti-spoofing', name: 'Anti-Spoofing Detection', category: 'aiMl', sortOrder: 6 },

  // Database & Engineering
  { id: 'mssql', name: 'Microsoft SQL Server', category: 'databaseEngineering', sortOrder: 1 },
  { id: 'mysql', name: 'MySQL', category: 'databaseEngineering', sortOrder: 2 },
  { id: 'db-mgmt', name: 'Database Management', category: 'databaseEngineering', sortOrder: 3 },
  { id: 'sys-analysis', name: 'System Analysis', category: 'databaseEngineering', sortOrder: 4 },
  { id: 'debugging', name: 'Debugging & Testing', category: 'databaseEngineering', sortOrder: 5 },
  { id: 'it-pm', name: 'IT Project Management', category: 'databaseEngineering', sortOrder: 6 },

  // Development Tools
  { id: 'vscode', name: 'Visual Studio Code', category: 'devTools', sortOrder: 1 },
  { id: 'android-studio', name: 'Android Studio', category: 'devTools', sortOrder: 2 },
  { id: 'pycharm', name: 'PyCharm', category: 'devTools', sortOrder: 3 },
  { id: 'excel', name: 'Microsoft Excel', category: 'devTools', sortOrder: 4 },
  { id: 'word', name: 'Microsoft Word', category: 'devTools', sortOrder: 5 },
  { id: 'canva', name: 'Canva', category: 'devTools', sortOrder: 6 },

  // Soft Skills
  { id: 'analytical', name: 'Analytical Thinking', category: 'softSkills', sortOrder: 1 },
  { id: 'problem-solving', name: 'Problem Solving', category: 'softSkills', sortOrder: 2 },
  { id: 'teamwork', name: 'Teamwork', category: 'softSkills', sortOrder: 3 },
  { id: 'comm-collab', name: 'Communication & Collaboration', category: 'softSkills', sortOrder: 4 },
  { id: 'time-mgmt', name: 'Time Management', category: 'softSkills', sortOrder: 5 },
  { id: 'adaptability', name: 'Adaptability', category: 'softSkills', sortOrder: 6 },
];
