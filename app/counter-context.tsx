"use client";

import Pusher from "pusher-js";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: "eu",
});

const context = createContext<number>(0);

interface CounterContextProps {
  defaultCounter: number;
}

export function CounterContext({
  defaultCounter = 0,
  children,
}: PropsWithChildren<CounterContextProps>) {
  const [counter, setCounter] = useState<number>(defaultCounter);

  useEffect(() => {
    const channel = pusher.subscribe("cod-counter");

    channel.bind("count", (newStatus: { counter: number }) => {
      console.log("New-Counter ::", newStatus);
      setCounter(newStatus.counter);
    });

    return () => {
      pusher.unbind("cod-counter");
    };
  }, []);

  return <context.Provider value={counter}>{children}</context.Provider>;
}

export function useCurrentCounter(): number {
  return useContext(context) || 0;
}
