import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("envelopes")
    .select("eid, receiver")
    .is("round", null)
    .is("receiver", null)
    .not("sender", "is", null);

  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null, data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { eid, currentRound } = await request.json();
  const userCookie = request.cookies.get("userId");
  const userId = userCookie?.value || null;
  if (!userId) return NextResponse.json({ success: false, error: null });

  const { data } = await supabase.from("envelopes").select("eid, receiver").eq("eid", eid).single();

  if (data?.receiver) {
    return NextResponse.json({ success: false, error: "Bao này đã được chọn rồi." });
  }

  const { error } = await supabase
    .from("envelopes")
    .update({ receiver: userId, round: currentRound })
    .eq("eid", eid);

  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null });
}
