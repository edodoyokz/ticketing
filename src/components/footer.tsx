import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between text-sm">
        <p>© {new Date().getFullYear()} Ticketing</p>
        <nav className="flex items-center gap-4">
          <Link href="/events">Events</Link>
          <Link href="/queue">Waiting Room</Link>
          <Link href="/gate">Gate</Link>
        </nav>
      </div>
    </footer>
  );
}
