import dayjs from "dayjs";
import { createClient } from "@/utils/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const response = await supabase.from("envelopes").select("id, eid");
  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { envelopes } = await request.json();

  const { data } = await supabase
    .from("rounds")
    .select("startTime")
    .order("startTime", { ascending: true })
    .limit(1)
    .single();

  const isTimeOut = dayjs().isAfter(dayjs(data?.startTime));
  if (isTimeOut) return NextResponse.json({ success: false, error: "Đã bắt đầu chơi rồi bạn ơi" });

  const { error } = await supabase.from("envelopes").insert(envelopes);
  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null });
}
