import { CalendarDays, Check } from "lucide-react";

type PreviewTask = {
  title: string;
  meta: string;
  done?: boolean;
  dot?: "primary" | "cyan";
};

type WorkspacePreviewProps = {
  title?: string;
  subtitle?: string;
  progressLabel?: string;
  progressValue?: string;
  progress?: number;
  tasks?: PreviewTask[];
};

const defaultTasks: PreviewTask[] = [
  {
    title: "Plan the next big idea",
    meta: "Project discovery · Complete",
    done: true,
    dot: "primary",
  },
  {
    title: "Bring the team together",
    meta: "Team check-in · Complete",
    done: true,
    dot: "primary",
  },
  {
    title: "Make room for great work",
    meta: "Your next chapter · Up next",
    done: false,
    dot: "cyan",
  },
];

export default function WorkspacePreview({
  title = "My workspace",
  subtitle = "A little progress, every day.",
  progressLabel = "Today's progress",
  progressValue = "2 of 3 tasks",
  progress = 2 / 3,
  tasks = defaultTasks,
}: WorkspacePreviewProps) {
  return (
    <div className="border-subtle bg-card flex flex-col gap-5 rounded-2xl border p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-ink text-base font-bold">{title}</p>
          <p className="text-muted text-xs">{subtitle}</p>
        </div>
        <div className="bg-accent-cyan-tint rounded-10 flex size-9 items-center justify-center">
          <CalendarDays className="text-neutral-ink size-4.5" />
        </div>
      </div>

      <div className="bg-nav rounded-10 flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <p className="text-ink text-[13px] font-medium">{progressLabel}</p>
          <p className="text-action text-[13px] font-bold">{progressValue}</p>
        </div>
        <div className="bg-brand-tint h-1.5 rounded-md">
          <div
            className="bg-action h-full rounded-md"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        {tasks.map((task) => (
          <div key={task.title} className="flex items-center gap-3 py-3">
            <div
              className={
                task.done
                  ? "border-action bg-action flex size-6.5 items-center justify-center rounded-lg border"
                  : "border-subtle bg-card flex size-6.5 items-center justify-center rounded-lg border"
              }
            >
              {task.done ? (
                <Check className="size-4 text-white" strokeWidth={2.5} />
              ) : null}
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <p className="text-ink text-sm font-medium">{task.title}</p>
              <p className="text-muted text-xs">{task.meta}</p>
            </div>

            <span
              className={
                task.dot === "cyan"
                  ? "bg-accent-cyan size-1.75 rounded-full"
                  : "bg-action size-1.75 rounded-full"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
