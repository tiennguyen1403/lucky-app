import { NextResponse } from "next/server";

import { createClient } from "@/utils/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("rounds").select("*");
  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null, data });
}
