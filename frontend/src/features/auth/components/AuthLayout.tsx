import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  aside: ReactNode;
};

export default function AuthLayout({ children, aside }: AuthLayoutProps) {
  return (
    <main className="bg-canvas min-h-dvh px-4 py-10 lg:px-30">
      <div className="border-subtle bg-card mx-auto flex w-full max-w-300 flex-col overflow-hidden rounded-2xl border lg:min-h-205 lg:flex-row">
        <aside className="bg-neutral-sidebar-light dark:bg-neutral-surface-dark hidden w-130 shrink-0 p-12 lg:flex lg:flex-col lg:gap-8">
          {aside}
        </aside>

        <section className="flex flex-1 flex-col justify-center gap-7.5 px-6 py-10 sm:px-12 lg:px-18 lg:py-14">
          {children}
        </section>
      </div>
    </main>
  );
}
