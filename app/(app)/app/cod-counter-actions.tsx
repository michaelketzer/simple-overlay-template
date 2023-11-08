"use client";

import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactElement, useCallback, useState } from "react";
import { Button } from "../../../components/ui/button";
import { updateCounter } from "../../../data/codcounter";
import { useCurrentCounter } from "../../counter-context";

export default function CodCounterActions(): ReactElement {
  const counter = useCurrentCounter();
  const [loading, setLoading] = useState(false);
  const { refresh } = useRouter();
  const onChangeCounter = useCallback(
    async (change: number) => {
      setLoading(true);
      await updateCounter(Math.min(50, Math.max(0, counter + change)));
      refresh();
      setLoading(false);
    },
    [counter, refresh]
  );

  return (
    <div className="flex items-center gap-x-2">
      <Button
        size={"icon"}
        onClick={() => onChangeCounter(-1)}
        disabled={loading || counter <= 0}
        variant={"destructive"}
      >
        <Minus className="h-7 w-7" />
      </Button>
      <div className="text-5xl font-medium font-mono min-w-[60px] text-center">
        {counter}
      </div>
      <Button
        size={"icon"}
        onClick={() => onChangeCounter(1)}
        disabled={loading || counter >= 50}
        variant={"create"}
      >
        <Plus className="h-7 w-7" />
      </Button>
    </div>
  );
}
