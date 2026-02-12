export function Footer() {
  return (
    <footer className="relative z-10 border-t border-(--stroke)">
      <div className="mx-auto max-w-280 px-6 py-7 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <span className="text-xs text-(--text-muted)">
          © {new Date().getFullYear()} Sebastian Ballen — bccloudsolutions.dev
        </span>
        <div className="flex gap-5">
          <a
            href="https://github.com/SebastianBC09"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sebastianballencastaneda-softwaredeveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-(--text-muted) hover:text-(--text-primary) transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
