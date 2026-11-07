export default function AuthFooter() {
  return (
    <footer className="flex shrink-0 flex-col items-center gap-3 px-6 py-6 sm:h-22 sm:flex-row sm:justify-between sm:gap-0 sm:px-10 sm:py-0 lg:px-16">
      <p className="text-muted text-xs">
        © 2026 OCTOM. All rights reserved.
      </p>

      <div className="flex items-center gap-6">
        <a
          href="/privacy"
          className="text-muted hover:text-ink text-xs transition"
        >
          Privacy policy
        </a>
        <a
          href="/terms"
          className="text-muted hover:text-ink text-xs transition"
        >
          Terms of service
        </a>
      </div>
    </footer>
  );
}
