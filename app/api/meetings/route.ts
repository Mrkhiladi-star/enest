import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Meeting from "@/models/Meeting";
import ActionItem from "@/models/ActionItem";

export async function GET() {
  await connectDB();

  const meetings = await Meeting.find().sort({
    createdAt: -1,
  });

  const final = [];

  for (const m of meetings) {
    const actions = await ActionItem.find({
      meetingId: String(m._id),
    });

    final.push({
      ...m.toObject(),
      actions,
    });
  }

  return NextResponse.json(final);
}