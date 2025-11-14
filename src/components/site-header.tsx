import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold">Ticketing</Link>
        <nav className="flex items-center gap-2">
          <Link href="/events" className="text-sm">Events</Link>
          <Link href="/queue" className="text-sm">Waiting Room</Link>
          <Link href="/gate" className="text-sm">Gate</Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
