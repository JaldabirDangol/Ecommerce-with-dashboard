"use client";

import { useState } from "react";

export default function ProductDescription({
  description,
  maxLength = 150,
}: {
  description: string;
  maxLength?: number;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  const isLong = description.length > maxLength;
  const text = expanded
    ? description
    : description.slice(0, maxLength) + (isLong ? "...   " : "");

  return (
    <div >
      <p className="text-gray-700 text-base leading-relaxed ">{text} 
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 font-medium hover:underline mt-2 hover:cursor-pointer"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
      </p>
    </div>
  );
}
