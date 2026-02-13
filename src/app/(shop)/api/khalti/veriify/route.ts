import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, amount } = await req.json();

  const res = await fetch("https://khalti.com/api/v2/payment/verify/", {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, amount }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: 400 });
  }

  // ✅ Save order to DB here
  return NextResponse.json({ success: true, data });
}
