import styles from "./TaskModal.module.css";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "../Modal/Modal";
import { ModalTextField } from "../ModalTextField/ModalTextField";
import { ModalDatePickerField } from "../ModalDatePickerField/ModalDatePickerField";
import { ModalCoinsField } from "../ModalCoinsField/ModalCoinsField";
import { ModalSelectField } from "../ModalSelectField/ModalSelectField";
import type { InfiniteSelectOption } from "../Select/InfiniteSelect";
import { ptBR } from "date-fns/locale";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  childrenOptions: InfiniteSelectOption[];
  isLoadingChildren?: boolean;
  hasMoreChildren?: boolean;
  onLoadMoreChildren?: () => void;
}

export function TaskModal({
  isOpen,
  onClose,
  childrenOptions,
  isLoadingChildren = false,
  hasMoreChildren = false,
  onLoadMoreChildren,
}: TaskModalProps) {
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [rewardCoins, setRewardCoins] = useState<number | string>("");
  const [selectedChild, setSelectedChild] = useState<string>("");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Sparkles size={20} />}
      title="Create New Task"
      subtitle="Build a fun challenge and reward it with WorthyCoins."
      actionLabel="Create Task"
      onAction={() => console.log("Create task", { rewardCoins, dueDate, selectedChild })}
    >
      <ModalTextField label="QUEST TITLE" placeholder="e.g. Clean room" />
      <ModalTextField
        label="WHAT NEEDS TO BE DONE"
        placeholder="Tidy up toys, make the bed, vacuum the floor..."
      />
      <div className={styles.centralFields}>
        <div className={styles.centralFieldsFirstRow}>
          <ModalCoinsField
            label="WORTHYCOINS REWARD"
            placeholder="5"
            value={rewardCoins}
            onChange={(e) => setRewardCoins(e.target.value)}
          />
          <ModalSelectField
            label="ASSIGN TO"
            placeholder="Select a child"
            value={selectedChild}
            onValueChange={setSelectedChild}
            options={childrenOptions}
            isLoading={isLoadingChildren}
            hasMore={hasMoreChildren}
            onLoadMore={onLoadMoreChildren}
          />
        </div>
        <div className={styles.centralFieldsSecondRow}>
          <ModalDatePickerField
            label="DUE DATE"
            date={dueDate}
            setDate={setDueDate}
            placeholder="Select a due date"
            locale={ptBR}
          />
        </div>
      </div>
    </Modal>
  );
}
