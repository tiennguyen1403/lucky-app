import dayjs from "dayjs";

import { createClient } from "@/utils/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("rounds")
    .select("value")
    .gte("startTime", dayjs().toISOString())
    .lte("startTime", dayjs().toISOString())
    .single();

  if (error) return NextResponse.json({ success: false, error: error.message });

  return NextResponse.json({ success: true, error: null, data });
}
