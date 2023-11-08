import { PropsWithChildren, ReactElement } from "react";
import { cn } from "../../../../lib/utils";

interface Props {
  title: string;
  className?: string;
  titleClassName?: string;
  actions?: ReactElement;
}

export default function SettingsBox({
  actions,
  children,
  className,
  title,
  titleClassName,
}: PropsWithChildren<Props>): ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch rounded-lg border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900",
        className
      )}
    >
      <div className="flex w-full items-center justify-between gap-x-2 px-6 py-4 ">
        <div
          className={cn(
            "text-lg font-medium text-emerald-600 dark:text-emerald-500",
            titleClassName
          )}
        >
          {title}
        </div>
      </div>
      <div className="dark:border-t-600 w-full border-t border-t-slate-200 px-6 py-6 dark:border-slate-700">
        {children}
      </div>
      {actions && (
        <div className="flex w-full justify-end rounded-b-lg border-t border-t-slate-200 bg-slate-50 px-6 py-3 dark:border-slate-700 dark:bg-slate-900">
          {actions}
        </div>
      )}
    </div>
  );
}
