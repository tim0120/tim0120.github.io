import Link from "next/link"

const publications = [
  {
    title: "CoT Red-Handed: Stress Testing Chain-of-Thought Monitoring",
    authors: "Benjamin Arnav*, Pablo Bernabeu-Pérez*, Nathan Helm-Burger*, Timothy Kostolansky*, Hannes Whittingham*, Mary Phuong",
    link: "https://arxiv.org/abs/2505.23575",
    publisher: "Pre-print"
  },
  {
    title: "Inverse Constitutional AI",
    authors: "Timothy Kostolansky",
    link: "https://dspace.mit.edu/handle/1721.1/156804",
    publisher: "Master's Thesis"
  },
  {
    title: "The Effect of Activation Functions On Superposition in Toy Models",
    authors: "Timothy Kostolansky*, Vedang Lad*",
    link: "https://deep-learning-mit.github.io/staging/blog/2023/superposition/",
    publisher: "Blog Post"
  },
  {
    title: "Iterative Interactive Inverse Constitutional AI (I^3CAI)",
    authors: "Timothy Kostolansky*, Julian Manyika*",
    link: "/documents/i3cai.pdf",
    publisher: "Class Project"
  },
  {
    title: "RL-Augmented Action Spaces in MsPacman",
    authors: "Timothy Kostolansky*, Julian Yocum*",
    link: "/documents/mspacman.pdf",
    publisher: "Class Project"
  }
]

function underlineMyName(authors: string) {
  const regex = /Timothy Kostolansky\*?/g;
  const matches = authors.match(regex);
  if (
    matches &&
    matches.length === 1 &&
    authors.trim() === matches[0]
  ) {
    return authors;
  }
  return authors.split(regex).reduce((acc, part, idx, arr) => {
    acc.push(part);
    if (idx < arr.length - 1) {
      acc.push(
        <span key={idx} className="underline">
          {matches && matches[idx] ? matches[idx] : "Timothy Kostolansky"}
        </span>
      );
    }
    return acc;
  }, [] as React.ReactNode[]);
}

const Publication = ({ title, authors, link, publisher }: { title: string; authors: string; link: string; publisher: string; }) => {
  return (
    <>
      <Link href={link} className="text-md text-blue-500 hover:underline">{title}</Link><br />
      <p className="text-md">{underlineMyName(authors)}</p>
      {publisher && <p className="text-md italic">{publisher}</p>}
    </>
  );
}

export default function Publications() {
  return (
    <div>
      {publications.map((publication, index) => (
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