"use client";

import { ReactElement } from "react";
import { useCurrentCounter } from "../../../counter-context";

export default function Counter(): ReactElement {
  const counter = useCurrentCounter();

  return <div>{counter}/50 Waffen auf gold gespielt</div>;
}
