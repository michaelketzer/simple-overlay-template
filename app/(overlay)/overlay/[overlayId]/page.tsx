import { notFound } from "next/navigation";
import { getCodCounter } from "../../../../data/codcounter";
import { CounterContext } from "../../../counter-context";
import { OverlayUpdater } from "../../overlay-updater";
import Counter from "./counter";

export const revalidate = 0;

export default async function OverlayPage({
  params,
}: {
  params: { overlayId: string };
}) {
  const codCounter = await getCodCounter();

  if (codCounter.overlayId !== params.overlayId) {
    notFound();
  }

  return (
    <>
      <OverlayUpdater />
      <CounterContext defaultCounter={codCounter.counter}>
        <Counter />
      </CounterContext>
    </>
  );
}
