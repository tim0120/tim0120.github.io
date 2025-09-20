const Copyright = () => (
  <div className="text-center w-full flex justify-center py-2">
    <p className="text-xs">
      &copy; {new Date().getFullYear()} Timothy H. Kostolansky · Content licensed under{' '}
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:underline"
      >
        CC BY 4.0
      </a>
    </p>
  </div>
)

export default Copyright