"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Registration {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  registeredAt: string;
}

interface EventRegistrationsTableProps {
  registrations: Registration[];
  totalRegistrations: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  pageSize: number;
}

export function EventRegistrationsTable({
  registrations,
  totalRegistrations,
  totalPages,
  currentPage,
  isLoading,
  onPageChange,
  pageSize,
}: EventRegistrationsTableProps) {
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const handleNextPage = () => {
    if (canGoNext) onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (canGoPrev) onPageChange(currentPage - 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) endPage = 4;
      if (currentPage >= totalPages - 1) startPage = totalPages - 3;

      if (startPage > 2) pages.push("ellipsis-start");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("ellipsis-end");
      pages.push(totalPages);
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalRegistrations);

  return (
    <Card className="border border-border">
      <CardHeader className="border-b border-border bg-background/50">
        <CardTitle className="pt-4">
          Registrations ({totalRegistrations})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : totalRegistrations === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No registrations yet
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg) => (
                    <tr
                      key={reg._id}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-medium text-foreground">
                        {reg.firstName} {reg.lastName}
                      </td>
                      <td className="py-3 px-4 text-foreground">{reg.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(reg.registeredAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    Showing {startIndex} to {endIndex} of {totalRegistrations}{" "}
                    registrations
                  </p>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={handlePrevPage}
                          className={
                            !canGoPrev
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {getPageNumbers().map((page, index) => {
                        if (typeof page === "string") {
                          return (
                            <PaginationItem key={`${page}-${index}`}>
                              <span className="px-2 text-muted-foreground">
                                ...
                              </span>
                            </PaginationItem>
                          );
                        }

                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => onPageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={handleNextPage}
                          className={
                            !canGoNext
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
