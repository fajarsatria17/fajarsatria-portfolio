import type { Certification } from '@type/content';

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issueDate: '2023-08',
    credentialUrl: 'https://aws.amazon.com/verification',
    published: true,
    sortOrder: 1,
  },
  {
    id: 'cert-2',
    name: 'Meta Certified Frontend Developer Professional',
    issuer: 'Meta',
    issueDate: '2022-11',
    credentialUrl: 'https://coursera.org/verify/professional-cert',
    published: true,
    sortOrder: 2,
  },
  {
    id: 'cert-3',
    name: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    issueDate: '2022-04',
    credentialUrl: 'https://www.cncf.io/certification/ckad/',
    published: true,
    sortOrder: 3,
  },
];
