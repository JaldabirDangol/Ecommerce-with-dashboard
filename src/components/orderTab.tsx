"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useEffect, useState } from "react";

const OrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package size={18} /> My Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Loading orders...</p>
        </CardContent>
      </Card>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package size={18} /> My Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">You have no orders yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <Card key={order.id} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package size={18} /> Order #{order.id.slice(0, 6)}
              <span
                className={`ml-auto font-medium ${
                  order.status === "DELIVERED"
                    ? "text-green-600"
                    : order.status === "SHIPPED"
                    ? "text-yellow-600"
                    : "text-gray-500"
                }`}
              >
                {order.status}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {order.items?.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.product?.name}</span>
                  <span>
                    ${item.priceAtPurchase.toFixed(2)} x {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <hr className="my-2 border-t border-gray-200" />
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>
                $
                {order.items
                  ?.reduce((acc, i) => acc + i.priceAtPurchase * i.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default OrderTab;
