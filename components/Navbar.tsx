'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow mb-8 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="font-bold text-xl"
        >
          AI Meeting Notes
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 font-medium">
          <Link href="/">Dashboard</Link>
          <Link href="/new">New Meeting</Link>
          <Link href="/digest">Weekly Digest</Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 font-medium bg-white border-t">
          <Link href="/" onClick={() => setOpen(false)}>
            Dashboard
          </Link>

          <Link href="/new" onClick={() => setOpen(false)}>
            New Meeting
          </Link>

          <Link href="/digest" onClick={() => setOpen(false)}>
            Weekly Digest
          </Link>
        </div>
      )}
    </nav>
  );
}