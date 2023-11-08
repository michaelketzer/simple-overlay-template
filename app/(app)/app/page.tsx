import { getCodCounter } from "../../../data/codcounter";
import { CounterContext } from "../../counter-context";
import CodCounterActions from "./cod-counter-actions";

export const revalidate = 0;

export default async function App() {
  const codCounter = await getCodCounter();
  return (
    <CounterContext defaultCounter={codCounter.counter}>
      <div className="max-w-lg mx-auto flex items-center justify-center gap-x-6 text-5xl py-20">
        <CodCounterActions />
        <div>/</div>
        <div>{codCounter.target}</div>
      </div>
    </CounterContext>
  );
}
