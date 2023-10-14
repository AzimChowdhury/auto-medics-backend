export type IServiceFilter = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  price?: string | undefined;
};

export const ServiceSearchableFields: string[] = ['name', 'price'];
export const ServiceFilterableFields: string[] = [
  'searchTerm',
  'name',
  'price',
];
