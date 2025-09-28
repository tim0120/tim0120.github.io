import Link from "next/link"

type PublicationLink = {
  url: string;
  label?: string;
};

type PublicationEntry = {
  title: string;
  authors: string;
  publication: string;
  date?: string;
  selected: boolean;
  links: PublicationLink[];
};

const publications: PublicationEntry[] = [
  {
    title: "CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring",
    authors: "Benjamin Arnav*, Pablo Bernabeu-Pérez*, Nathan Helm-Burger*, Timothy H. Kostolansky*, Hannes Whittingham*, Mary Phuong",
    publication: "In Proc. NeurIPS 2025",
    date: "June 2025",
    selected: true,
    links: [
      { url: "https://arxiv.org/abs/2505.23575", label: "arXiv" },
      { url: "https://neurips.cc/virtual/2025/poster/116053", label: "poster" }
    ]
  },
  {
    title: "Inverse Constitutional AI",
    authors: "Timothy H. Kostolansky",
    publication: "Master's Thesis",
    date: "May 2024",
    selected: true,
    links: [
      { url: "https://dspace.mit.edu/handle/1721.1/156804", label: "pdf" }
    ]
  },
  {
    title: "Iterative Interactive Inverse Constitutional AI (I^3CAI)",
    authors: "Timothy H. Kostolansky*, Julian Manyika*",
    publication: "Class Project",
    date: "May 2024",
    selected: false,
    links: [
      { url: "/documents/i3cai.pdf", label: "pdf" }
    ]
  },
  {
    title: "RL-Augmented Action Spaces in MsPacman",
    authors: "Timothy H. Kostolansky*, Julian Yocum*",
    publication: "Class Project",
    date: "May 2024",
    selected: false,
    links: [
      { url: "/documents/mspacman.pdf", label: "pdf" }
    ]
  },
  {
    title: "The Effect of Activation Functions On Superposition in Toy Models",
    authors: "Timothy H. Kostolansky*, Vedang Lad*",
    publication: "Blog Post",
    date: "December 2023",
    selected: false,
    links: [
      { url: "https://deep-learning-mit.github.io/staging/blog/2023/superposition/", label: "blog post" }
    ]
  }
];

// Underline "Timothy H. Kostolansky" (with or without asterisk) in the author list
function underlineMyName(authors: string) {
  // Match "Timothy H. Kostolansky" with or without asterisk, optionally surrounded by whitespace
  const regex = /Timothy H\. Kostolansky?/g;
  const matches = authors.match(regex);

  // If I am the only author (possibly with asterisk), do NOT underline
  if (
    matches &&
    matches.length === 1 &&
    authors.trim() === matches[0]
  ) {
    return authors;
  }

  // Otherwise, underline all occurrences of my name (with or without asterisk)
  return authors.split(regex).reduce((acc, part, idx, arr) => {
    acc.push(part);
    if (idx < arr.length - 1) {
      acc.push(
        <span key={idx} className="underline">
          {matches && matches[idx] ? matches[idx] : "Timothy H. Kostolansky"}
        </span>
      );
    }
    return acc;
  }, [] as React.ReactNode[]);
}

function getLinkLabel(link: PublicationLink) {
  if (link.label) {
    return link.label;
  }
  if (link.url.endsWith(".pdf")) {
    return "pdf";
  }
  if (link.url.includes("arxiv.org")) {
    return "arXiv";
  }
  return "link";
}

const Publication = ({ title, authors, links, publication, date }: PublicationEntry) => {
  return (
    <>
      <div className="font-medium">{title}</div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{underlineMyName(authors)}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {links.map((link, index) => (
          <span key={link.url}>
            {index > 0 ? ", " : ""}
            <Link
              href={link.url}
              className="text-blue-600 dark:text-blue-300 underline hover:underline"
              rel="noopener noreferrer"
            >
              {getLinkLabel(link)}
            </Link>
          </span>
        ))}
        {(links.length > 0 && (publication || date)) ? ", " : ""}
        {publication || date ? (
          <>
            {publication ? <span className="italic">{publication}</span> : null}
            {publication && date ? ", " : null}
            {date ? <span>{date}</span> : null}
          </>
        ) : ""}
      </p>
    </>
  );
}

export default function Publications({ selectedOnly = false }: { selectedOnly?: boolean }) {
  const list = selectedOnly ? publications.filter(p => p.selected) : publications;
  return (
    <div>
      {list.map((publication, index) => (
        <div key={index} className="mb-4">
          <Publication {...publication} />
        </div>
      ))}
    </div>
  );
}