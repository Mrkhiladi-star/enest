async function getData(id:string){
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/meetings/${id}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function Page({
  params,
}:{
  params: Promise<{id:string}>
}) {
  const { id } = await params;
  const data = await getData(id);

  const m = data.meeting;
  const actions = data.actions || [];

  return (
    <main className="max-w-5xl mx-auto p-8 space-y-6">
      <h1 className="text-4xl font-bold">{m.title}</h1>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Summary</h2>
        <p>{m.summary}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Decisions</h2>
          {(m.decisions || []).map((x:string,i:number)=>(
            <p key={i}>• {x}</p>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Questions</h2>
          {(m.questions || []).map((x:string,i:number)=>(
            <p key={i}>• {x}</p>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Action Items</h2>
        {actions.map((a:any)=>(
          <div key={a._id} className="border-b py-2">
            {a.task} | {a.owner} | {a.deadline} | {a.priority}
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Follow-ups</h2>
        {(m.followups || []).map((x:string,i:number)=>(
          <p key={i}>• {x}</p>
        ))}
      </div>
    </main>
  );
}