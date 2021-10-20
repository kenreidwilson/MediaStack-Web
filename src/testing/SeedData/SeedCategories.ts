import Category from '../../types/Category';

export const SeedCategories: Category[] = ((): Category[] => {
    return [
        { id: 1, name: 'category1' },
        { id: 2, name: 'category2' },
        { id: 3, name: 'category3' }
    ];
})();
