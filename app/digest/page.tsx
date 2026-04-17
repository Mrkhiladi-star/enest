import Navbar from "@/components/Navbar";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/meetings`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function Page() {
  const meetings = await getData();

  const grouped: any = {};

  meetings.forEach((m: any) => {
    (m.actions || []).forEach((a: any) => {
      if (!grouped[a.owner]) grouped[a.owner] = [];
      grouped[a.owner].push(a.task);
    });
  });

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Weekly Digest
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.keys(grouped).map((owner) => (
          <div
            key={owner}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="font-semibold mb-3">{owner}</h2>

            {grouped[owner].map((task: string, i: number) => (
              <p key={i}>• {task}</p>
            ))}
          </div>
        ))}
      </div>
    </main>
      </>
  );
}