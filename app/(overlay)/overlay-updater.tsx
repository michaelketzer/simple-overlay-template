"use client";

import Pusher from "pusher-js";
import { useEffect } from "react";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
  cluster: "eu",
});

export function OverlayUpdater() {
  useEffect(() => {
    const channel = pusher.subscribe("overlay");

    channel.bind("invalidate", () => {
      location.reload();
    });

    return () => {
      pusher.unsubscribe("overlay");
    };
  }, []);

  return <></>;
}
