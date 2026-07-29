import * as React from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Select";
import styles from "./Select.module.css";

export interface InfiniteSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface InfiniteSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  options: InfiniteSelectOption[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  disabled?: boolean;
  className?: string;
}

export const InfiniteSelect: React.FC<InfiniteSelectProps> = ({
  value,
  onValueChange,
  placeholder,
  options,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  disabled = false,
  className = "",
}) => {
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const sentinelRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      // Disconnect previous observer if any
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || !hasMore || isLoading || !onLoadMore) return;

      const scrollContainer = node.closest("[data-radix-select-viewport]") || node.parentElement;
      if (!scrollContainer) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onLoadMore();
          }
        },
        {
          root: scrollContainer,
          rootMargin: "40px", // Trigger 40px before reaching the bottom
          threshold: 0,
        },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    [hasMore, isLoading, onLoadMore, options],
  );

  // Disconnect observer on unmount
  React.useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}

        {/* Sentinel element to detect when we reach the end of the scroll */}
        {hasMore && <div ref={sentinelRef} style={{ height: "1px" }} />}

        {isLoading && (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={18} />
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

InfiniteSelect.displayName = "InfiniteSelect";
