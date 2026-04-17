import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { processNotes } from "@/lib/ai";
import Meeting from "@/models/Meeting";
import ActionItem from "@/models/ActionItem";

export async function POST(req: Request) {
  try {
    const { notes } = await req.json();

    await connectDB();

    const ai = await processNotes(notes);

    const meeting = await Meeting.create({
      title: `${ai.tag} Meeting`,
      rawNotes: notes,
      summary: ai.summary,
      tag: ai.tag,
      decisions: ai.decisions,
      questions: ai.questions,
      followups: ai.followups,
    });

    if (ai.actionItems.length) {
      await ActionItem.insertMany(
        ai.actionItems.map((x: any) => ({
          ...x,
          meetingId: String(meeting._id),
        }))
      );
    }

    return NextResponse.json({
      success: true,
      id: String(meeting._id),
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, error: "Failed" },
      { status: 500 }
    );
  }
}