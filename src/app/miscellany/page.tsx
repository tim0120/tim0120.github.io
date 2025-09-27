import Link from "next/link";

export default function MiscellanyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Miscellany</h1>
      
      <section className="space-y-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Reading</h2>
        <p className="text-md">
          I save some things that I read to{' '}
          <Link href="https://curius.app/timothy-kostolansky" className="underline hover:underline">
            Curius
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Things I Like to Do</h2>
        <p className="text-md">
          I&apos;ve{' '}
          <Link href="https://www.youtube.com/watch?v=GBJPhRF89w4" className="underline hover:underline">played</Link>
          {' '}
          <Link href="https://www.youtube.com/watch?v=We5grgBczjY" className="underline hover:underline">basketball</Link>
          {' '}
          for much of my life.
        </p>
      </section>
    </div>
  );
}