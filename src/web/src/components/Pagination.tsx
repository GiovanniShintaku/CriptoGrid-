import React, { useMemo, useState } from "react";

type PaginationProps<T> = {
    // modo completo (items) 
    items?: T[]; // lista completa (opcional)
    itemsPerPage?: number; // usado se items for fornecido

    renderItems?: (items: T[]) => React.ReactNode; // obrigatório se items for fornecido

    // modo controlado (apenas controles) 
    currentPage?: number; // se definido, modo controlado
    totalPages?: number; // obrigatório no modo controlado
    onPageChange?: (page: number) => void; // obrigatório no modo controlado

    //isso aqui ficou meio complicado mas vou explicando em comentarios

    className?: string;
};

export default function Pagination<T>({
    items,
    itemsPerPage = 6,
    renderItems,
    currentPage,
    totalPages,
    onPageChange,
    className = "",
}: PaginationProps<T>) {
    const isControlled =
        typeof currentPage === "number" &&
        typeof totalPages === "number" &&
        typeof onPageChange === "function";

    // se não estiver em modo controlado, usa estado interno
    const [internalPage, setInternalPage] = useState<number>(1);
    const page = isControlled ? (currentPage as number) : internalPage;

    // se items estiver presente, podemos calcular totalPages aqui
    const computedTotalPages = useMemo(() => {
        if (items && items.length > 0) {
            return Math.max(1, Math.ceil(items.length / itemsPerPage));
        }
        // se items não estiver presente, usa o totalPages vindo das props (modo controlado)
        return typeof totalPages === "number" ? totalPages : 0;
    }, [items, itemsPerPage, totalPages]);

    const visibleItems = useMemo(() => {
        if (!items) return [];
        const start = (page - 1) * itemsPerPage;
        return items.slice(start, start + itemsPerPage);
    }, [items, page, itemsPerPage]);

    const handlePageChange = (p: number) => {
        if (p < 1 || p > computedTotalPages) return;
        if (isControlled) {
            onPageChange!(p);
        } else {
            setInternalPage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className={`w-full ${className}`}>
            {/* se temos items + renderItems -> renderiza a lista */}
            {items && renderItems ? <div>{renderItems(visibleItems)}</div> : null}

            {/* controles de paginação (mostra só se houver mais de 1 página) */}
            {computedTotalPages > 1 && (
                <div className="pagination flex justify-center gap-2 mt-6">
                    <button
                        className="px-3 py-1 rounded bg-[var(--panel)] hover:bg-[var(--accent-pink)] disabled:opacity-50"
                        disabled={page === 1}
                        onClick={() => handlePageChange(page - 1)}
                    >
                        ◀
                    </button>

                    {Array.from({ length: computedTotalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            className={`px-3 py-1 rounded ${page === i + 1
                                    ? "bg-[var(--accent-pink)] text-white"
                                    : "bg-[var(--panel)] text-gray-300 hover:bg-[var(--accent-pink)] hover:text-white"
                                }`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1 rounded bg-[var(--panel)] hover:bg-[var(--accent-pink)] disabled:opacity-50"
                        disabled={page === computedTotalPages}
                        onClick={() => handlePageChange(page + 1)}
                    >
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
}