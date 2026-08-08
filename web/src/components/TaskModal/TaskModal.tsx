import styles from "./TaskModal.module.css";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Modal } from "../Modal/Modal";
import { ModalTextField } from "../ModalTextField/ModalTextField";
import { ModalDatePickerField } from "../ModalDatePickerField/ModalDatePickerField";
import { ModalCoinsField } from "../ModalCoinsField/ModalCoinsField";
import { ModalSelectField } from "../ModalSelectField/ModalSelectField";
import type { InfiniteSelectOption } from "../Select/InfiniteSelect";
import { ptBR } from "date-fns/locale";
import { TaskIconPicker } from "./TaskIconPicker";
import { createUserTask, updateUserTask } from "../../api/TaskPageApi";
import type { UserTask } from "../../api/types";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  childrenOptions: InfiniteSelectOption[];
  isLoadingChildren?: boolean;
  hasMoreChildren?: boolean;
  onLoadMoreChildren?: () => void;
  onTaskCreated?: () => void;
  taskToEdit?: UserTask | null;
}

export function TaskModal({
  isOpen,
  onClose,
  childrenOptions,
  isLoadingChildren = false,
  hasMoreChildren = false,
  onLoadMoreChildren,
  onTaskCreated,
  taskToEdit = null,
}: TaskModalProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [rewardCoins, setRewardCoins] = useState<number | string>("0");
  const [selectedChild, setSelectedChild] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("Sparkles");
  const [selectedColor, setSelectedColor] = useState<string>("#10b981");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate(undefined);
    setRewardCoins("0");
    setSelectedChild("");
    setSelectedIcon("Sparkles");
    setSelectedColor("#10b981");
  };

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || "");
        setDueDate(taskToEdit.dueDate ? new Date(taskToEdit.dueDate) : undefined);
        setRewardCoins(taskToEdit.rewardAmount);
        setSelectedChild(String(taskToEdit.assignedChildId));
        setSelectedIcon(taskToEdit.icon);
        setSelectedColor(taskToEdit.color);
      } else {
        resetForm();
      }
    }
  }, [taskToEdit, isOpen]);

  const handleSaveTask = async () => {
    if (isSubmitting) return;
    if (!title.trim()) {
      alert("Please enter a quest title.");
      return;
    }
    if (!selectedChild) {
      alert("Please select a child to assign the quest to.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (taskToEdit) {
        await updateUserTask({
          userTaskId: taskToEdit.id,
          title: title.trim(),
          description: description.trim() || null,
          dueDate: dueDate || null,
          assignedChildId: Number(selectedChild),
          rewardAmount: Number(rewardCoins),
          icon: selectedIcon,
          color: selectedColor,
        });
      } else {
        await createUserTask({
          title: title.trim(),
          description: description.trim() || null,
          dueDate: dueDate || null,
          assignedChildId: Number(selectedChild),
          rewardAmount: Number(rewardCoins),
          icon: selectedIcon,
          color: selectedColor,
        });
      }
      resetForm();
      onTaskCreated?.();
      onClose();
    } catch (error) {
      console.error("Failed to save task", error);
      alert("An error occurred while saving the quest.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      icon={<Sparkles size={20} />}
      title={taskToEdit ? "Edit Quest" : "Create New Task"}
      subtitle={taskToEdit ? "Modify this quest's details and reward." : "Build a fun challenge and reward it with WorthyCoins."}
      actionLabel={isSubmitting ? (taskToEdit ? "Saving..." : "Creating...") : (taskToEdit ? "Save Changes" : "Create Task")}
      onAction={handleSaveTask}
    >
      <ModalTextField
        label="QUEST TITLE"
        placeholder="e.g. Clean room"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ModalTextField
        label="WHAT NEEDS TO BE DONE"
        placeholder="Tidy up toys, make the bed, vacuum the floor..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className={styles.centralFields}>
        <div className={styles.centralFieldsFirstRow}>
          <ModalCoinsField
            label="WORTHYCOINS REWARD"
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
      <TaskIconPicker
        value={selectedIcon}
        onChange={setSelectedIcon}
        color={selectedColor}
        onChangeColor={setSelectedColor}
      />
    </Modal>
  );
}
