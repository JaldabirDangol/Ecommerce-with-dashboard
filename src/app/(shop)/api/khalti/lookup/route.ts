import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pidx } = await req.json();

    if (!pidx) {
      return NextResponse.json(
        { message: "pidx is required" },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pidx }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: 400 });
    }

    // ✅ ONLY Completed is success
    if (data.status === "Completed") {
      // TODO: Save order to DB here
      // TODO: Mark payment as PAID
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Khalti lookup failed" },
      { status: 500 }
    );
  }
}
