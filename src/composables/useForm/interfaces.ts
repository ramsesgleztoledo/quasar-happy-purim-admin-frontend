
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuxForm {
  auxFormFields: AuxFormField[]
}


export interface AuxFormField {
  value: string | number | object | boolean | any[] | null | undefined,
  type?: 'string' | 'number' | 'object' | 'boolean' | 'array',
  validations?: any[]
}
export interface FormField {
  id: string,
  value: string | number | object | boolean,
  type: 'string' | 'number' | 'object' | 'boolean' | 'array',
  validations: any[]
}





