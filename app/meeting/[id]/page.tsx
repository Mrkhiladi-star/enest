import Navbar from "@/components/Navbar";

async function getData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/meetings/${id}`,
    { cache: "no-store" }
  );

  return res.json();
}

function badge(priority: string) {
  if (priority === "high")
    return "bg-red-100 text-red-700";

  if (priority === "medium")
    return "bg-yellow-100 text-yellow-700";

  return "bg-green-100 text-green-700";
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getData(id);

  const m = data.meeting;
  const actions = data.actions;

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-8 space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold capitalize">
          {m.title}
        </h1>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-3">
            Summary
          </h2>

          <div className="space-y-2">
            {(m.summary || []).map(
              (x: string, i: number) => (
                <p key={i}>• {x}</p>
              )
            )}
          </div>
        </div>

        {/* Decisions + Questions */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-3">
              Decisions
            </h2>

            {(m.decisions || []).length > 0 ? (
              (m.decisions || []).map(
                (x: string, i: number) => (
                  <p key={i}>• {x}</p>
                )
              )
            ) : (
              <p className="text-gray-400">
                No decisions found
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-3">
              Questions
            </h2>

            {(m.questions || []).length > 0 ? (
              (m.questions || []).map(
                (x: string, i: number) => (
                  <p key={i}>• {x}</p>
                )
              )
            ) : (
              <p className="text-gray-400">
                No open questions
              </p>
            )}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">
            Action Items
          </h2>

          <div className="space-y-3">
            {actions.length > 0 ? (
              actions.map((a: any) => (
                <div
                  key={a._id}
                  className="border rounded-xl p-4 flex flex-col md:flex-row md:justify-between gap-4"
                >
                  {/* Left */}
                  <div>
                    <p
                      className={`font-medium ${
                        a.status === "done"
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {a.task}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Owner: {a.owner || "Unassigned"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Deadline: {a.deadline || "Not set"}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex flex-wrap gap-2 items-start">
                    {a.status !== "done" && (
                      <a
                        href={`/api/actions/done/${a._id}`}
                        className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm"
                      >
                        Done
                      </a>
                    )}

                    <a
                      href={`/api/actions/delete/${a._id}`}
                      className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm"
                    >
                      Delete
                    </a>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${badge(
                        a.priority
                      )}`}
                    >
                      {a.priority}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No action items found
              </p>
            )}
          </div>
        </div>

        {/* Followups */}
        {m.followups?.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-3">
              Follow-ups
            </h2>

            <div className="space-y-2">
              {m.followups.map(
                (x: string, i: number) => (
                  <p key={i}>• {x}</p>
                )
              )}
            </div>
          </div>
        )}

        {/* Share */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-3">
            Share Meeting
          </h2>

          <a
            href={`/share/${m._id}`}
            className="text-blue-600 underline break-all"
          >
            Public Shareable Link
          </a>
        </div>
      </main>
    </>
  );
}