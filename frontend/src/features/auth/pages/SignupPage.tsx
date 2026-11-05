import { Users } from "lucide-react";
import AuthBrandPanel from "../components/AuthBrandPanel";
import AuthLayout from "../components/AuthLayout";
import SignupForm from "../components/SignupForm";
import WorkspacePreview from "../components/WorkspacePreview";

export default function SignupPage() {
  return (
    <AuthLayout
      aside={
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
      }
    >
      <SignupForm />
    </AuthLayout>
  );
}
