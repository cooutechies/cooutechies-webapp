"use client";

/**
 * Registrations Pagination Component
 * Client component for handling pagination navigation
 */

import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface RegistrationsPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function RegistrationsPagination({
  currentPage,
  totalPages,
}: RegistrationsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-primary/10 transition-colors"
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => {
          if (typeof pageNum === "string") {
            return (
              <PaginationItem key={`${pageNum}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={createPageURL(pageNum)}
                isActive={pageNum === currentPage}
                className={
                  pageNum === currentPage
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-primary/10 transition-colors"
                }
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages ? createPageURL(currentPage + 1) : "#"
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "hover:bg-primary/10 transition-colors"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
