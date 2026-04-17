"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function New() {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function submit() {
    if (!notes.trim()) {
      alert("Please paste meeting notes.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await res.json();

      if (!data.success || !data.id) {
        alert("Failed to process notes");
        return;
      }

      router.push(`/meeting/${data.id}`);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">
          Paste Meeting Notes
        </h1>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-80 p-4 rounded-2xl border"
          placeholder="Paste transcript here..."
        />

        <button
          onClick={submit}
          disabled={loading}
          className="mt-4 bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : "Process Notes"}
        </button>
      </main>
    </>
  );
}