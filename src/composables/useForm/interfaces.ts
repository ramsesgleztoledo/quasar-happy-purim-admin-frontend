
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuxForm {
  auxFormFields: AuxFormField[]
}


export interface AuxFormField {
  value: string | number | object | boolean | any[] | null | undefined,
  type?: 'string' | 'number' | 'object' | 'boolean' | 'array',
  validations?: ValidationFn[]
}
export interface FormField<T = string | number | object | boolean> {
  id: string,
  value: T,
  type: 'string' | 'number' | 'object' | 'boolean' | 'array',
  validations: ValidationFn[]
}


export type ValidationFn = ({ value }: { value: any }) => any | null;


