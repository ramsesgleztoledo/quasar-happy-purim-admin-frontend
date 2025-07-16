import type { Ref } from "vue";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuxForm {
  auxFormFields: AuxFormField[]
}


export interface AuxFormField<T = string | number | object | boolean> {
  value: T | null | undefined | string,
  type?: 'string' | 'number' | 'object' | 'boolean' | 'array',
  required?: boolean,
  validations?: ValidationFn[]
}
export interface FormField<T = string | number | object | boolean> {
  id: string,
  value: T,
  type: 'string' | 'number' | 'object' | 'boolean' | 'array',
  required?: boolean,
  validations: ValidationFn[]
}


export type ValidationFn = ({ value }: { value: any }) => any | null;


export interface FormComposition<T extends Record<string, any>> {
  realForm: Ref<{
    [K in keyof T]: T[K] extends Array<infer U>
    ? FormField<U>[]
    : FormField<T[K]>;
  }>;

  onFieldChange: (
    { target: { value, name } }: { target: { value: any, name: string } },
    fieldLocation?: (string | number)[]
  ) => void;
  resetForm: (newForm?: { [K in keyof T]?: T[K] | undefined | null }, options?: { original?: boolean, omitExtraFields?: boolean }) => void;

  resetField: (fieldLocation: (string | number)[], value?: any) => void;

  addField: (fieldLocation: (number | string)[], field: any) => void;

  getValue: (fieldLocation: (number | string)[]) => FormField | FormField[] | undefined;

  isValidForm: (withErrors?: boolean) => { valid: boolean;[key: string]: any } | boolean;

  isValidField: (
    fieldLocation: (string | number)[],
    withErrors?: boolean
  ) => { valid: boolean;[key: string]: any } | boolean;

  getFormValue: () => { [K in keyof T]: OptionalIfNotArray<T[K]> };
}

export type FormValueType<F> =
  F extends Array<FormField<infer U>> ? U[] :
  F extends FormField<infer U> ? U :
  never;

export type OptionalIfNotArray<T> = T extends any[]
  ? T | string[]
  : T | null | undefined | string;
