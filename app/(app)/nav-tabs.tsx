"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

const tabs = [
  { name: "Dashboard", href: "/app" },
  { name: "Settings", href: "/app/settings" },
];
export default function NavTabs() {
  const currentSegment = useSelectedLayoutSegments().join("/");
  return (
    <div className="scrollbar-hide -mb-0.5 flex h-12 max-w-full items-center justify-start space-x-2 overflow-x-auto overflow-y-hidden">
      {tabs.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={`border-b-2 p-1 ${
            currentSegment === href.substring(1)
              ? "border-black text-black dark:border-slate-300 dark:text-slate-100"
              : "border-transparent text-gray-600 hover:text-black dark:text-slate-400"
          }`}
        >
          <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-slate-800">
            <p className="text-sm">{name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
