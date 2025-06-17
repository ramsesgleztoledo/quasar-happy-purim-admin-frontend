/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { AuxFormField, FormField, ValidationFn } from './interfaces';

export interface FormComposition<T extends Record<string, any>> {
  realForm: Ref<{
    [K in keyof T]: T[K] extends FormField<infer U> ? FormField<U> :
    T[K] extends FormField<infer U>[] ? FormField<U>[] :
    never;
  }>;
  onFieldChange: (
    e: { target: { value: any; name: keyof T } },
    fieldLocation?: (string | number)[]
  ) => void;
  onFormReset: (newForm?: { [K in keyof T]?: any }, original?: boolean) => void;
  resetField: (fieldLocation: (string | number)[], value?: any) => void;
  addField: (fieldLocation: (number | string)[], field: any) => void;
  getValue: (fieldLocation: (number | string)[]) => any;
  isValidForm: (withErrors?: boolean) => { valid: boolean;[key: string]: any } | boolean;
  isValidField: (
    fieldLocation: (string | number)[],
    withErrors?: boolean
  ) => { valid: boolean;[key: string]: any } | boolean;
  getFormValue: () => { [K in keyof T]: any };
}

const useForm = <T extends Record<string, any>>(form: {
  [K in keyof T]: AuxFormField | AuxFormField[];
}): FormComposition<T> => {
  const prepareForm = (): { [K in keyof T]: FormField | FormField[] } => {
    if (!(typeof form === 'object' && !Array.isArray(form)))
      throw new Error(
        `The form: "${JSON.stringify(form)}" has an invalid format`
      );

    const auxForm = {} as { [K in keyof T]: FormField | FormField[] };

    for (const prop in form) {
      const field = form[prop];
      if (Array.isArray(field)) {
        auxForm[prop] = [...fillArray(field)];
      } else {
        auxForm[prop] = { ...fillObject(field) };
      }
    }

    return auxForm;
  };

  const fixValueAndType = (element: any): void => {
    if (element.value === null || element.value === undefined) {
      element.value = '';
    }

    if (!element.type) {
      switch (typeof element.value) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'object':
          element.type = typeof element.value;
          break;
        default:
          element.type = 'string';
      }
    }
  };

  const fillObject = (element: any): FormField => {
    let mainElement = element;
    if (typeof mainElement !== 'object') mainElement = { value: mainElement };

    fixValueAndType(mainElement);

    const id = `${Date.now()}${Math.floor(Math.random() * 1e18)}`;

    const value = mainElement.value;
    const nextElement: FormField = {
      id,
      type: mainElement.type || 'string',
      validations: mainElement.validations || [],
      value
    };

    switch (nextElement.type) {
      case 'string':
        if (typeof value !== 'string') throw new Error(`Value is not a string`);
        break;
      case 'number':
        if (typeof value !== 'number') throw new Error(`Value is not a number`);
        break;
      case 'boolean':
        if (typeof value !== 'boolean') throw new Error(`Value is not a boolean`);
        break;
    }

    return nextElement;
  };

  const fillArray = (array: AuxFormField[]): FormField[] => {
    return array.map(fillObject);
  };

  const realForm = ref(prepareForm()) as Ref<{
    [K in keyof T]: T[K] extends FormField<infer U> ? FormField<U> :
    T[K] extends FormField<infer U>[] ? FormField<U>[] :
    never;
  }>;

  const getValue = (fieldLocation: (string | number)[]): any => {
    return fieldLocation.reduce((acc: any, key) => {
      if (acc === undefined || acc === null) {
        throw new Error(`Invalid field path: ${fieldLocation.join('.')}`);
      }
      return acc[key];
    }, realForm.value);
  };

  const resetField = (fieldLocation: (string | number)[], value?: any): void => {
    const field = getValue(fieldLocation);
    if (field) field.value = value;
  };

  const addField = (fieldLocation: (number | string)[], field: any): void => {
    const arr = getValue(fieldLocation);
    if (Array.isArray(arr)) arr.push(fillObject(field));
  };

  const onFieldChange = (
    { target: { value, name } }: { target: { value: any; name: keyof T } },
    fieldLocation?: (string | number)[]
  ): void => {
    if (fieldLocation) {
      const field = getValue(fieldLocation);
      if (field) field.value = value;
    } else {
      const field = realForm.value[name];
      if (field && !Array.isArray(field)) field.value = value;
    }
  };

  const onFormReset = (newForm?: Partial<T>, original = false): void => {
    for (const prop in realForm.value) {
      const field = realForm.value[prop];
      if (Array.isArray(field)) {
        field.forEach(f => f.value = '');
      } else {
        field.value = newForm?.[prop as keyof T] ?? (original ? '' : field.value);
      }
    }
  };

  const isValidForm = (withErrors = false): boolean | { valid: boolean;[key: string]: any } => {
    let valid = true;
    const errors: { [key: string]: string[] } = {};

    for (const key in realForm.value) {
      const field = realForm.value[key];
      const fields = Array.isArray(field) ? field : [field];

      for (const f of fields) {
        const fieldErrors = f.validations
          ?.map((v: ValidationFn) => v(f.value))
          .filter((v: any): v is string => typeof v === 'string') ?? [];
        if (fieldErrors.length) {
          valid = false;
          errors[key] = fieldErrors;
        }
      }
    }

    return withErrors ? { valid, ...errors } : valid;
  };

  const isValidField = (
    fieldLocation: (string | number)[],
    withErrors = false
  ): boolean | { valid: boolean;[key: string]: any } => {
    const field = getValue(fieldLocation);
    const errors = field.validations?.map((v: any) => v(field.value)).filter((v: any) => typeof v === 'string') ?? [];
    const valid = errors.length === 0;
    return withErrors ? { valid, errors } : valid;
  };

  const getFormValue = (): { [K in keyof T]: any } => {
    const result = {} as { [K in keyof T]: any };
    for (const key in realForm.value) {
      const field = realForm.value[key];
      result[key] = Array.isArray(field) ? field.map(f => f.value) : field.value;
    }
    return result;
  };

  return {
    realForm,
    onFieldChange,
    onFormReset,
    resetField,
    addField,
    getValue,
    isValidForm,
    isValidField,
    getFormValue
  };
};

export default useForm;
