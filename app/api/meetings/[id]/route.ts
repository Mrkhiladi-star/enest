import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Meeting from "@/models/Meeting";
import ActionItem from "@/models/ActionItem";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const meeting = await Meeting.findById(id);
  const actions = await ActionItem.find({
    meetingId: id,
  });

  return NextResponse.json({
    meeting,
    actions,
  });
}