export type ICustomerFilter = {
  searchTerm?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNo?: string | undefined;
  address?: string | undefined;
};

export const customerSearchableFields: string[] = [
  'name',
  'email',
  'address',
  'contactNo',
];
export const customerFilterableFields: string[] = [
  'searchTerm',
  'name',
  'email',
  'address',
  'contactNo',
];
