import { createClient } from "@/utils/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const userCookie = request.cookies.get("userId");
  const userId = userCookie?.value || null;
  if (!userId) return NextResponse.json({ success: false, error: null });

  const { data, error } = await supabase
    .from("envelopes")
    .select("eid, value, round")
    .eq("receiver", userId);

  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null, data });
}
