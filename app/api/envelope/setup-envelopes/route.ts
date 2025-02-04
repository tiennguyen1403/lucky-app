import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/server";
import { generateRandomId, generateUUID } from "@/helpers";
import { IEnvelopes } from "@/types/envelope.types";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const userCookie = request.cookies.get("userId");
  const userId = userCookie?.value || null;
  if (!userId) return NextResponse.json({ success: false, error: null });

  const { data, error } = await supabase.from("envelopes").select("value").eq("sender", userId);

  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null, data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const userCookie = request.cookies.get("userId");
  const userId = userCookie?.value || null;
  if (!userId) return NextResponse.json({ success: false, error: null });

  const { envelopes }: { envelopes: IEnvelopes } = await request.json();

  const { data: existingEnvelopes } = await supabase
    .from("envelopes")
    .select("*")
    .eq("sender", userId);

  const payload = envelopes.map(({ value }, index: number) => ({
    value,
    round: null,
    receiver: null,
    sender: userId,
    id: existingEnvelopes?.[index]?.id || generateUUID(),
    eid: existingEnvelopes?.[index]?.eid || generateRandomId(15),
  }));

  const { error } = await supabase.from("envelopes").upsert(payload);

  if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null });
}
