import { useEffect, useState } from "react";
import styles from "./ChildrenPage.module.css";
import { Child } from "../../components/Child/Child";
import { ChildSkeleton } from "../../components/Child/ChildSkeleton";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { Pagination } from "../../components/Pagination/Pagination";
import { HeaderPage } from "../../components/HeaderPage/HeaderPage";
import { ChildModal } from "../../components/ChildModal/ChildModal";
import { DeleteConfirmModal } from "../../components/DeleteConfirmModal/DeleteConfirmModal";
import { type Child as ChildType } from "../../api/types";
import { getTokenData } from "../../utils/auth";
import { getChildrenByParentId, deleteChild } from "../../api/ChildApi";
import toast from "react-hot-toast";
import { ToastContent } from "../../components/Toast/ToastContent";
import { useTranslation } from "react-i18next";

export function ChildrenPage() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childToEdit, setChildToEdit] = useState<ChildType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [childToDelete, setChildToDelete] = useState<ChildType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [children, setChildren] = useState<ChildType[]>([]);
  const [childrenIsLoading, setChildrenIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalChildren, setTotalChildren] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const userInfo = getTokenData();

    if (userInfo?.parentId) {
      setChildrenIsLoading(true);
      getChildrenByParentId(page, pageSize)
        .then((res) => {
          if (res.success && res.data) {
            setChildren(res.data.items);
            setTotalChildren(res.data.totalItems);
          } else {
            setChildren([]);
            setTotalChildren(0);
          }
        })
        .catch(() => {
          toast.error(
            <ToastContent
              title={t("tasks.error")}
              description={t("children.errorLoading")}
            />,
          );
        })
        .finally(() => {
          setChildrenIsLoading(false);
        });
    } else {
      setChildrenIsLoading(false);
    }
  }, [page, pageSize, refreshKey, t]);

  const handleEditChild = (child: ChildType) => {
    setChildToEdit(child);
    setIsModalOpen(true);
  };

  const handleDeleteChild = (child: ChildType) => {
    setChildToDelete(child);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!childToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteChild(childToDelete.id);
      setRefreshKey((prev) => prev + 1);
      setIsDeleteModalOpen(false);
      setChildToDelete(null);
      toast.success(
        <ToastContent
          title={t("tasks.success")}
          description={t("children.successDeleted")}
        />,
      );
    } catch (error) {
      toast.error(
        <ToastContent
          title={t("tasks.error")}
          description={t("children.errorDeleting")}
        />,
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <HeaderPage
        title={t("children.title")}
        description={t("children.description")}
        buttonText={t("children.newChildBtn")}
        buttonAction={() => {
          setChildToEdit(null);
          setIsModalOpen(true);
        }}
      />
      <ChildModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setChildToEdit(null);
        }}
        onChildSaved={() => setRefreshKey((prev) => prev + 1)}
        childToEdit={childToEdit}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setChildToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={t("children.deleteModalTitle")}
        itemName={childToDelete?.name}
        isSubmitting={isDeleting}
      />

      <div className={styles.childrenList}>
        {childrenIsLoading ? (
          Array.from({ length: pageSize }).map((_, index) => (
            <ChildSkeleton key={index} />
          ))
        ) : children && children.length > 0 ? (
          children.map((child) => (
            <Child
              key={child.id}
              child={child}
              onEdit={() => handleEditChild(child)}
              onDelete={() => handleDeleteChild(child)}
            />
          ))
        ) : (
          <div className={styles.emptyStateContainer}>
            <EmptyState
              message={t("children.noChildren")}
              description={t("children.noChildrenDesc")}
            />
          </div>
        )}
      </div>

      {!childrenIsLoading && children && children.length > 0 && (
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          totalItems={totalChildren}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      )}
    </div>
  );
}
