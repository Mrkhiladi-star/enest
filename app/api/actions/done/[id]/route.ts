import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import ActionItem from "@/models/ActionItem";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  await ActionItem.findByIdAndUpdate(id, {
    status: "done",
  });

  return NextResponse.redirect(
    new URL("/", req.url)
  );
}