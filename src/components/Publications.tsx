import Link from "next/link"

const publications = [
  {
    title: "CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring",
    authors: "Benjamin Arnav*, Pablo Bernabeu-Pérez*, Nathan Helm-Burger*, Timothy H. Kostolansky*, Hannes Whittingham*, Mary Phuong",
    link: "https://arxiv.org/abs/2505.23575",
    publisher: "In Proc. NeurIPS 2025",
    selected: true
  },
  {
    title: "Inverse Constitutional AI",
    authors: "Timothy H. Kostolansky",
    link: "https://dspace.mit.edu/handle/1721.1/156804",
    publisher: "Master's Thesis",
    selected: true
  },
  {
    title: "The Effect of Activation Functions On Superposition in Toy Models",
    authors: "Timothy H. Kostolansky*, Vedang Lad*",
    link: "https://deep-learning-mit.github.io/staging/blog/2023/superposition/",
    publisher: "Blog Post",
    selected: false
  },
  {
    title: "Iterative Interactive Inverse Constitutional AI (I^3CAI)",
    authors: "Timothy H. Kostolansky*, Julian Manyika*",
    link: "/documents/i3cai.pdf",
    publisher: "Class Project",
    selected: false
  },
  {
    title: "RL-Augmented Action Spaces in MsPacman",
    authors: "Timothy H. Kostolansky*, Julian Yocum*",
    link: "/documents/mspacman.pdf",
    publisher: "Class Project",
    selected: false
  }
]

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

function getLinkLabel(link: string, publisher: string) {
  if (publisher && publisher.toLowerCase().includes("blog")) {
    return "blog post";
  }
  if (link.endsWith(".pdf")) {
    return "pdf";
  }
  if (link.includes("arxiv.org")) {
    return "pdf";
  }
  if (link.includes("dspace.mit.edu")) {
    return "pdf";
  }
  return "link";
}

const Publication = ({ title, authors, link, publisher }: { title: string; authors: string; link: string; publisher: string; }) => {
  const linkLabel = getLinkLabel(link, publisher);
  return (
    <>
      <div className="font-medium">{title}</div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{underlineMyName(authors)}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        <Link
          href={link}
          className="text-blue-600 dark:text-blue-300 underline hover:underline"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </Link>
        {publisher ? (
          <>
            {", "}
            <span className="italic">{publisher}</span>
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
          <Publication
            title={publication.title}
            authors={publication.authors}
            link={publication.link}
            publisher={publication.publisher}
          />
        </div>
      ))}
    </div>
  );
}