"use client"; 

import { useState } from "react";

type ToggleSwitchProps = {
  value: boolean;
};

export default function ToggleSwitch({ value }: ToggleSwitchProps) {
  const [enabled, setEnabled] = useState(value);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-green-600" : "bg-gray-400"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
