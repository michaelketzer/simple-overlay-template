"use server";
import { CoDCounter } from "@prisma/client";
import cuid from "cuid";
import prisma from "../lib/prisma";
import { pusherServer } from "../lib/pusher";

export async function getCodCounter(): Promise<CoDCounter> {
  return (
    (await prisma.coDCounter.findFirst({ where: { id: 1 } })) || {
      id: 1,
      counter: 0,
      target: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
      overlayId: cuid(),
    }
  );
}

export async function updateCounter(counter: number): Promise<void> {
  await prisma.coDCounter.upsert({
    where: { id: 1 },
    update: { counter },
    create: { counter, overlayId: cuid() },
  });
  await pusherServer.trigger("cod-counter", "count", { counter });
}

export async function updateOverlayId(): Promise<void> {
  const overlayId = cuid();
  await prisma.coDCounter.upsert({
    where: { id: 1 },
    create: { overlayId },
    update: { overlayId },
  });
  await pusherServer.trigger("overlay", "invalidate", null);
}
