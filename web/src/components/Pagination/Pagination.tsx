import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../Select/Select";
import styles from "./Pagination.module.css";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export function Pagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const { t } = useTranslation();

  // Safeguard: if page is out of bounds
  React.useEffect(() => {
    if (currentPage > totalPages) {
      onPageChange(totalPages);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPages = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include page 1
      pages.push(1);

      // Calculate start and end for middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we are near the boundaries
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always include last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPages();

  // Information showing range
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <span>
          {t("pagination.showing")} <strong>{startItem}</strong> {t("pagination.to")}{" "}
          <strong>{endItem}</strong> {t("pagination.of")} <strong>{totalItems}</strong>{" "}
          {t("pagination.items")}
        </span>
      </div>

      <div className={styles.centerSection}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={styles.chevronButton}
          aria-label={t("pagination.previous")}
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`${styles.pageButton} ${
                isCurrent ? styles.activePage : ""
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={styles.chevronButton}
          aria-label={t("pagination.next")}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className={styles.rightSection}>
        <span className={styles.pageSizeLabel}>{t("pagination.itemsPerPage")}</span>
        <div className={styles.pageSizeSelect}>
          <Select
            value={String(pageSize)}
            onValueChange={(val) => onPageSizeChange(Number(val))}
          >
            <SelectTrigger className={styles.pageSizeTrigger}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
