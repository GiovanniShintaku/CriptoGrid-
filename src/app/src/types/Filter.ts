export interface Filters {
    name: string;
    minPrice: string;
    maxPrice: string;
    min24h?: string;
    max24h?: string;
    sortOrder: "asc" | "desc";
}