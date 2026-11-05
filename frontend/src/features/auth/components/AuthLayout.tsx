import AuthFooter from "./AuthFooter";
import AuthHeader from "./AuthHeader";
import { Outlet } from "react-router";
import AuthBrandPanel from "./AuthBrandPanel";
import WorkspacePreview from "./WorkspacePreview";
import { Users } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="bg-canvas flex min-h-dvh flex-col">
      <AuthHeader />

      <main className="flex flex-1 justify-center px-4 py-10 lg:px-30">
        <div className="border-subtle bg-card mx-auto flex w-full max-w-300 flex-col overflow-hidden rounded-2xl border lg:min-h-205 xl:flex-row">
          <aside className="bg-nav hidden w-130 shrink-0 p-12 xl:flex xl:flex-col xl:gap-8">
            <AuthBrandPanel
              eyebrow="A BETTER WAY TO WORK"
              title={
                <>
                  A little more focus.
                  <br />A lot more done.
                </>
              }
              description="Bring your tasks, projects and people together in one organized workspace."
              preview={<WorkspacePreview />}
              benefit={{
                icon: Users,
                title: "Less switching. More doing.",
                description: "Everything you need to move work forward.",
              }}
            />
          </aside>

          <section className="flex flex-1 flex-col justify-center gap-7.5 px-6 py-10 sm:px-12 lg:px-18 lg:py-14">
            <Outlet />
          </section>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
