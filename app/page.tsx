"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/meetings")
      .then((res) => res.json())
      .then((data) => setMeetings(data));
  }, []);

  const filtered = meetings.filter((m: any) => {
    const q = search.toLowerCase();

    return (
      m.title?.toLowerCase().includes(q) ||
      (Array.isArray(m.summary)
        ? m.summary.join(" ").toLowerCase().includes(q)
        : String(m.summary).toLowerCase().includes(q)) ||
      m.tag?.toLowerCase().includes(q)
    );
  });

  const open = meetings.reduce(
    (sum: number, m: any) => sum + (m.actions?.length || 0),
    0
  );

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-5xl font-bold">Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4">
          <Card title="Meetings" value={meetings.length} />
          <Card title="Open Tasks" value={open} />
          <Card title="Overdue" value="2" />
          <Card title="Automation" value="Active" />
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, summary, tag..."
          className="w-full border p-4 rounded-xl"
        />

        <div className="space-y-4">
          {filtered.map((m: any) => (
            <Link
              key={m._id}
              href={`/meeting/${m._id}`}
              className="block bg-white shadow rounded-2xl p-6 hover:shadow-lg transition"
            >
              <h2 className="font-bold text-2xl capitalize">
                {m.title}
              </h2>

              <div className="mt-3 text-gray-600 space-y-1">
                {Array.isArray(m.summary)
                  ? m.summary.slice(0, 3).map((x: string, i: number) => (
                      <p key={i}>• {x}</p>
                    ))
                  : <p>{m.summary}</p>}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p>{title}</p>
      <h2 className="text-4xl font-bold mt-2">{value}</h2>
    </div>
  );
}