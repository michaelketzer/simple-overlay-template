"use client";

import { useRouter } from "next/navigation";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "../../../../components/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { Button, buttonVariants } from "../../../../components/ui/button";
import { updateOverlayId } from "../../../../data/codcounter";
import { cn } from "../../../../lib/utils";
import SettingsBox from "./settings-box";

interface Props {
  overlayId: string | null;
}

export default function OverlayLink({ overlayId }: Props): ReactElement {
  const [link, setLink] = useState("");
  const [host, setHost] = useState("");
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const img = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const dragImg = new Image();
    dragImg.src = "/drag_icon.png";
    img.current = dragImg;
  }, []);

  useEffect(() => {
    setLink(`${location.origin}/overlay/${overlayId}`);
    setHost(location.origin);
  }, [overlayId]);

  const { refresh } = useRouter();
  const generateNewOverlayLink = useCallback(async () => {
    setLoading(true);
    await updateOverlayId();
    refresh();
    setLoading(false);
  }, [refresh]);

  return (
    <SettingsBox
      title={"Overlay link"}
      actions={
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"} isLoading={loading}>
              Regenerate Overlay Link
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Regenerate Overlay Link?</AlertDialogTitle>
              <AlertDialogDescription>
                When you regenerate your overlay link, all previous links become
                invalid. This ensures that all used links will be disabled with
                immediate effect!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant={"destructive"}
                  onClick={generateNewOverlayLink}
                  isLoading={loading}
                >
                  Regenerate
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      }
    >
      <p className="mb-2 text-sm text-slate-700 dark:text-slate-400">
        Create a browser source in your streaming software and paste the link
        below. Make sure the browser source size is set to{" "}
        <span className="font-semibold text-emerald-600 dark:text-emerald-500">
          600x400
        </span>
        .<br />
        If you do not know how to set it properly, please use the drag and drop
        option!
      </p>
      <div className="flex items-center gap-x-2">
        <div className="bg-slate-100 px-3 py-0.5 font-mono text-pink-600 dark:bg-slate-950 dark:text-pink-500">
          <span>{host}/overlay/</span>
          <div className="relative inline overflow-hidden rounded-sm">
            <div className={cn("inline blur-sm", revealed && "blur-none")}>
              {overlayId}
            </div>
            {!revealed && (
              <Tooltip content="Click to reveal">
                <button
                  className="absolute left-0 top-0 z-10 h-full w-full grayscale"
                  onClick={() => setRevealed(true)}
                />
              </Tooltip>
            )}
          </div>
        </div>
        {/**
         @ts-ignore */}
        <CopyToClipboard
          text={link}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          <Button variant={copied ? "create" : "secondary"} size="sm">
            {copied ? "Copied" : "Copy"}
          </Button>
        </CopyToClipboard>
        {link && (
          <>
            <div>or</div>
            <a
              href={`${link.replace(
                "http://localhost:3000",
                "https://cod-counter.mketzer.com"
              )}?layer-name=CoD%20Counter%20Overlay&layer-width=600&layer-height=400`}
              draggable="true"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
              onClick={(e) => e.preventDefault()}
              onDragStart={(e) => {
                if (img.current) {
                  e.dataTransfer.setDragImage(img.current, 30, 30);
                }
                //@ts-ignore
                e.dataTransfer.setData("text/uri-list", e.target.href);
              }}
              onDragEnd={(e) => {
                //@ts-ignore
                e.target?.blur?.();
              }}
            >
              Drag and drop me into your OBS
            </a>
          </>
        )}
      </div>
    </SettingsBox>
  );
}
