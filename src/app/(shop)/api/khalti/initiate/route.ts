import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      amount,
      purchaseOrderId,
      purchaseOrderName,
      customer,
    } = await req.json();

    if (!amount || !purchaseOrderId || !purchaseOrderName) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const res = await fetch(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/khalti`,
          website_url: process.env.NEXT_PUBLIC_BASE_URL,
          amount, // paisa
          purchase_order_id: purchaseOrderId,
          purchase_order_name: purchaseOrderName,
          customer_info: customer,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Khalti initiate failed" },
      { status: 500 }
    );
  }
}
