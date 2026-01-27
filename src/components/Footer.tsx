export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden pt-20">
      <div className="absolute inset-0 bg-linear-to-t from-zinc-100/50 to-transparent dark:from-zinc-900/50 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end border-t border-zinc-200 dark:border-zinc-800 pt-8 pb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-1 w-4 bg-zinc-900 dark:bg-zinc-100 rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                ©Developed By Mohit
              </span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium max-w-60 leading-relaxed">
              Building tools for deep focus and digital well-being.
            </p>
          </div>

          <div className="flex gap-10">
            <FooterLink
              label="Github"
              href="https://github.com/MohitMehtre/productivity-clock"
            />
          </div>
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
      className="text-[10px] font-bold uppercase tracking-widest
        text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100
        underline underline-offset-4 decoration-transparent
        hover:decoration-current transition-all"
    >
      {label}
    </a>
  );
}
