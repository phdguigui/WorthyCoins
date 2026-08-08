import React from "react";
import { Coins } from "lucide-react";
import { ModalNumberField } from "../ModalNumberField/ModalNumberField";
import type { ModalNumberFieldProps } from "../ModalNumberField/ModalNumberField";

function CoinIcon() {
  return (
    <div
      style={{
        backgroundColor: "#f7c646",
        borderRadius: "50%",
        width: 25,
        height: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Coins size={15} color="black" strokeWidth={1.2} />
    </div>
  );
}

export const ModalCoinsField = React.forwardRef<HTMLInputElement, Omit<ModalNumberFieldProps, "icon" | "ref">>(
  (props, ref) => {
    return <ModalNumberField ref={ref} icon={<CoinIcon />} {...props} />;
  }
);

ModalCoinsField.displayName = "ModalCoinsField";
