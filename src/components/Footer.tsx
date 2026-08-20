export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-t from-zinc-100/50 to-transparent dark:from-zinc-900/50 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start border-t border-zinc-200 dark:border-zinc-800 pt-8 pb-8 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-4 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                ©Developed By{" "}
                <a
                  href="https://x.com/mohitmehtre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-4 decoration-transparent hover:decoration-current transition-[text-decoration-color]"
                >
                  Mohit
                </a>
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium max-w-60 leading-relaxed">
              Building tools for deep focus and digital well-being.
            </p>
          </div>

          <nav className="flex gap-10">
            <FooterLink
              label="Github"
              href="https://github.com/MohitMehtre/productivity-clock"
            />
            <FooterLink label="X / Twitter" href="https://x.com/mohitmehtre" />
          </nav>
        </div>

        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-900 py-5 gap-4">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700">
            Productivity_Clock
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700 tabular-nums">
            {new Date().getFullYear()} // All_Systems_Nominal
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest
        text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100
        transition-colors"
    >
      <span
        className="underline underline-offset-4 decoration-transparent
          group-hover:decoration-current transition-[text-decoration-color]"
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        ↗
      </span>
    </a>
  );
}
