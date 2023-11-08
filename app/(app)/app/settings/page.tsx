import { getCodCounter } from "../../../../data/codcounter";
import OverlayLink from "./overlay-link";

export default async function Settings() {
  const codCounter = await getCodCounter();
  return (
    <div>
      <div className="flex h-24 items-center border-b border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-950">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20 lg:max-w-screen-xl flex items-center justify-between">
          <h1 className="text-2xl text-gray-600 dark:text-slate-400">
            Settings
          </h1>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 py-8 flex flex-col gap-y-4">
        <OverlayLink overlayId={codCounter.overlayId} />
      </div>
    </div>
  );
}
