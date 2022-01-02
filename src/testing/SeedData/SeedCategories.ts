import { Category } from "../../types";

export const SeedCategories: Category[] = ((): Category[] => {
    return [
        { id: 1, name: "Contemporary" }, 
        { id: 2, name: "Modern" }, 
        { id: 3, name: "Renaissance" }, 
        { id: 4, name: "Renaissance to Neoclassicism" }, 
        { id: 5, name: "Romanticism" }, 
        { id: 6, name: "Romanticism to Modern" }
    ];
})();
