export async function processNotes(notes: string) {
  try {
    const prompt = `
You are an AI Meeting Assistant.

Analyze meeting notes and return ONLY valid JSON.

{
  "title":"Specific meeting title based on topic",
  "summary":[
    "bullet point 1",
    "bullet point 2",
    "bullet point 3"
  ],
  "tag":"product | engineering | marketing | hiring | finance | design | sales | general",
  "actionItems":[
    {
      "task":"clear task",
      "owner":"name or Unassigned",
      "deadline":"real deadline or No deadline",
      "priority":"high | medium | low"
    }
  ],
  "decisions":["important decisions"],
  "questions":["open questions"],
  "followups":["next follow-up actions"]
}

Rules:
- Return JSON only
- No markdown
- Generate smart meeting title
- Summary must be short bullet points
- If empty return []

Meeting Notes:
${notes}
`;

    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0.2,
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await res.json();

    let text = data?.choices?.[0]?.message?.content || "{}";

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");

    if (first !== -1 && last !== -1) {
      text = text.slice(first, last + 1);
    }

    const parsed = JSON.parse(text);

    return {
      title: parsed.title || "General Meeting",
      summary: Array.isArray(parsed.summary)
        ? parsed.summary
        : ["Meeting discussion completed."],
      tag: parsed.tag || "general",
      actionItems: parsed.actionItems || [],
      decisions: parsed.decisions || [],
      questions: parsed.questions || [],
      followups: parsed.followups || [],
    };
  } catch (error) {
    console.log(error);

    return {
      title: "General Meeting",
      summary: ["Meeting discussion completed."],
      tag: "general",
      actionItems: [],
      decisions: [],
      questions: [],
      followups: [],
    };
  }
}