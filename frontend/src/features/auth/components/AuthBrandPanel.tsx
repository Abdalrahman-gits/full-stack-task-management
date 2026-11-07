import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type AuthBrandPanelProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  preview?: ReactNode;
  benefit?: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
};

export default function AuthBrandPanel({
  eyebrow,
  title,
  description,
  preview,
  benefit,
}: AuthBrandPanelProps) {
  const BenefitIcon = benefit?.icon;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-accent-cyan h-[3px] w-5 rounded-full" />
          <span className="text-action text-xs font-bold">{eyebrow}</span>
        </div>

        <h1 className="text-ink text-3xl font-bold">{title}</h1>

        {description && <p className="text-muted text-base">{description}</p>}
      </div>

      {preview}

      {benefit && BenefitIcon ? (
        <div className="flex items-center gap-3">
          <div className="bg-brand-tint flex size-9 items-center justify-center rounded-[10px]">
            <BenefitIcon className="text-action size-[18px]" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-ink text-[13px] font-bold">{benefit.title}</p>
            <p className="text-muted text-[13px]">{benefit.description}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
