import { Coins } from "lucide-react";
import { ModalNumberField } from "../ModalNumberField/ModalNumberField";
import type { ModalNumberFieldProps } from "../ModalNumberField/ModalNumberField";

export function ModalCoinsField(props: Omit<ModalNumberFieldProps, "icon">) {
  return <ModalNumberField icon={<Coins size={18} />} {...props} />;
}
