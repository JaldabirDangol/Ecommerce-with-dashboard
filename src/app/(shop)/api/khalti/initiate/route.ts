import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      amount,
      purchaseOrderId,
      purchaseOrderName,
    } = await req.json();

    if (!amount || !purchaseOrderId || !purchaseOrderName) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Khalti requires amount as integer in paisa, minimum 1000 (Rs. 10)
    const amountInt = Math.round(Number(amount));
    if (isNaN(amountInt) || amountInt < 1000) {
      return NextResponse.json(
        { message: "Amount must be at least 1000 paisa (Rs. 10)" },
        { status: 400 }
      );
    }

    const payload = {
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/khalti`,
      website_url: process.env.NEXT_PUBLIC_BASE_URL,
      amount: amountInt,
      purchase_order_id: purchaseOrderId,
      purchase_order_name: purchaseOrderName,
    };

    const res = await fetch(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Khalti initiate error:", data);
      return NextResponse.json(
        { message: "Khalti initiate failed", detail: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Khalti initiate exception:", error);
    return NextResponse.json(
      { message: "Khalti initiate failed" },
      { status: 500 }
    );
  }
}
