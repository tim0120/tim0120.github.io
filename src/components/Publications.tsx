import Link from "next/link"

const publications = [
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

const Publication = ({ title, authors, link, publisher }: { title: string; authors: string; link: string; publisher: string; }) => {
  return (
    <>
      <Link href={link} className="text-md text-blue-500 hover:underline">{title}</Link><br />
      <p className="text-md">{authors}</p>
      {publisher && <p className="text-md">{publisher}</p>}
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