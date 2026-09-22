import { a, dim, bold, type Piece } from './segments';

export type PublicationLink = { url: string; label: string };

export type Publication = {
  title: string;
  authors: string;
  publication: string;
  date?: string;
  selected: boolean;
  category: 'paper' | 'post';
  links: PublicationLink[];
};

export const publications: Publication[] = [
  {
    title: 'Post-Training 50x Faster',
    authors: 'Addie Foote, Rudolf Laine, Timothy H. Kostolansky',
    publication: 'Workshop Labs Blog',
    date: 'March 2026',
    selected: true,
    category: 'post',
    links: [{ url: 'https://workshoplabs.ai/blog/post-training-50x-faster', label: 'blog post' }],
  },
  {
    title: 'CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring',
    authors:
      'Benjamin Arnav*, Pablo Bernabeu-Pérez*, Nathan Helm-Burger*, Timothy H. Kostolansky*, Hannes Whittingham*, Mary Phuong',
    publication: 'In Proc. NeurIPS 2025',
    date: 'June 2025',
    selected: true,
    category: 'paper',
    links: [
      { url: 'https://arxiv.org/abs/2505.23575', label: 'arXiv' },
      { url: 'https://neurips.cc/virtual/2025/poster/116053', label: 'poster' },
    ],
  },
  {
    title: 'Inverse Constitutional AI',
    authors: 'Timothy H. Kostolansky',
    publication: "Master's Thesis",
    date: 'May 2024',
    selected: true,
    category: 'paper',
    links: [{ url: 'https://dspace.mit.edu/handle/1721.1/156804', label: 'pdf' }],
  },
  {
    title: 'Iterative Interactive Inverse Constitutional AI (I^3CAI)',
    authors: 'Timothy H. Kostolansky*, Julian Manyika*',
    publication: 'Class Project',
    date: 'May 2024',
    selected: false,
    category: 'post',
    links: [{ url: '/documents/i3cai.pdf', label: 'pdf' }],
  },
  {
    title: 'RL-Augmented Action Spaces in MsPacman',
    authors: 'Timothy H. Kostolansky*, Julian Yocum*',
    publication: 'Class Project',
    date: 'May 2024',
    selected: false,
    category: 'post',
    links: [{ url: '/documents/mspacman.pdf', label: 'pdf' }],
  },
  {
    title: 'The Effect of Activation Functions On Superposition in Toy Models',
    authors: 'Timothy H. Kostolansky*, Vedang Lad*',
    publication: 'Blog Post',
    date: 'December 2023',
    selected: false,
    category: 'post',
    links: [
      {
        url: 'https://deep-learning-mit.github.io/staging/blog/2023/superposition/',
        label: 'blog post',
      },
    ],
  },
];

const ME = /Timothy H\. Kostolansky\*?/g;
const IND = 0; // wrapped lines start flush left

// Author list as dim text with my name bolded (unless I'm the only author).
function authorPieces(authors: string): Piece[] {
  const names = authors.match(ME);
  if (!names || (names.length === 1 && authors.trim() === names[0])) {
    return [dim(authors, { indent: IND })];
  }
  const parts = authors.split(ME);
  const out: Piece[] = [];
  parts.forEach((part, i) => {
    if (part) out.push(dim(part, { indent: IND }));
    if (i < parts.length - 1) out.push(bold(names[i], { dim: true, indent: IND }));
  });
  return out;
}

// One publication as grid text:
//   Title
//   authors
//   link · link · venue, date
export function publicationPieces(p: Publication): Piece[] {
  const out: Piece[] = [p.title, '\n', ...authorPieces(p.authors), '\n'];
  p.links.forEach((l, i) => {
    if (i > 0) out.push(dim(' · '));
    out.push(a(l.label, l.url, { dim: true, indent: IND }));
  });
  const venue = [p.publication, p.date].filter(Boolean).join(', ');
  if (venue) out.push(dim(`${p.links.length ? ' · ' : ''}${venue}`, { indent: IND }));
  out.push('\n');
  return out;
}

export function publicationsPieces(opts: { selectedOnly?: boolean; category?: 'paper' | 'post' } = {}): Piece[] {
  return publications
    .filter((p) => (!opts.selectedOnly || p.selected) && (!opts.category || p.category === opts.category))
    .flatMap((p, i) => (i === 0 ? publicationPieces(p) : ['\n', ...publicationPieces(p)]));
}
