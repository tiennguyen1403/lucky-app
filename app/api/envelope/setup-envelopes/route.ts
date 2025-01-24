import { NextRequest, NextResponse } from "next/server";

import { generateRandomId } from "@/helpers";
import { createClient } from "@/utils/server";

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

  const { envelopes } = await request.json();

  const { data: existingEnvelopes } = await supabase
    .from("envelopes")
    .select("*")
    .eq("sender", userId);

  console.log("existingEnvelopes :>> ", existingEnvelopes);

  // if(firstSetup) {
  //   payload = envelopes.map(({ value }: any) => ({
  //     value,
  //     round: null,
  //     receiver: null,
  //     sender: userId,
  //     eid: generateRandomId(15),
  //   }))
  // } else {
  //   payload = envelopes.map(({value}: any) => ({
  //     value,
  //   }))
  // }

  // const { data, error } = await supabase
  //   .from("envelopes")
  //   .select("sender, value")
  //   .eq("sender", userId);

  // if (error) return NextResponse.json({ success: false, error: error.message });
  return NextResponse.json({ success: true, error: null });
}
