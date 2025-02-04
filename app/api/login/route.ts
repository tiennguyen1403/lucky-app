import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { error } = await supabase.auth.signInWithPassword(body);

  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null });
}
