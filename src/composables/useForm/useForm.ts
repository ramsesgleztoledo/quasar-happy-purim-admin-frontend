/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Ref } from 'vue';
import { ref } from 'vue';
import type { AuxFormField, FormComposition, FormField, FormValueType } from './interfaces';



const useForm = <T extends Record<string, any>>(form: {
  [K in keyof T]: AuxFormField | AuxFormField[];
}): FormComposition<T> => {


  /**============================================
//* Prepare the initial form
*=============================================**/
  const prepareForm = (): { [K in keyof T]: FormField | FormField[] } => {
    if (!(typeof form === 'object' && !Array.isArray(form)))
      throw new Error(
        `The form: "${JSON.stringify(form)} has an invalid format"`
      );

    const auxForm = {} as { [K in keyof T]: FormField | FormField[] };

    for (const prop in form) {
      if (Array.isArray(form[prop])) {
        auxForm[prop] = [...fillArray(form[prop])];
      } else {
        auxForm[prop] = { ...fillObject(form[prop]) };
      }
    }

    return auxForm;
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
    //* Check if the position/prop exist in the object/array
    *========================================================================**/

  const checkTheProp = (element: any, prop: string | number) => {
    if (Array.isArray(element)) {
      if (typeof prop !== 'number')
        throw new Error(
          `The position "${JSON.stringify(
            prop
          )}" is not a number, the fieldLocation for arrays can be only numbers`
        );

      const arrayLength = element.length;

      if (prop >= arrayLength || prop < 0)
        throw new Error(
          `The position "${JSON.stringify(prop)}" is not contained in the array`
        );
    } else {
      isItAProp(prop, element);
    }
  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
 //* Fixing the values and types
*========================================================================**/
  const fixValueAndType = (element: any) => {
    if (element.value !== undefined && element.value !== null && element.type) {
      let elementType: any = typeof element.value;
      if (Array.isArray(element.value)) elementType = 'array';
      if (elementType !== element.type) {
        throw new Error(
          `The value "${element.value}" is not of type"${element.type}"`
        );
      }
    }
    if (
      element.value !== undefined &&
      element.value !== null &&
      !element.type
    ) {
      let type: any = typeof element.value;
      if (Array.isArray(element.value)) type = 'array';
      element.type = type;
    }
  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
 //* fill the objects in the array with the id, and the rest of the fields
 *========================================================================**/
  const fillObject = (element: any): FormField => {
    let mainElement = element;
    if (typeof mainElement !== 'object') mainElement = { value: mainElement };

    fixValueAndType(mainElement);

    const id: number = Math.random() * Number(Math.pow(10, 18).toString().padStart(18, '0'));
    const value = mainElement.value;

    const nextElement: FormField = {
      type: mainElement.type || 'string',
      validations: mainElement.validations || [],
      id: `${new Date().getTime()}${id}`,
      value
    };


    switch (nextElement.type) {
      case 'string':
        if (!value) nextElement.value = '';
        else {
          if (typeof value === 'string') nextElement.value = value;
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not a string`
            );
        }

        break;
      case 'number':
        if (!value) nextElement.value = '';
        else {
          if (typeof value === 'number') nextElement.value = value;
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not a number`
            );
        }

        break;
      case 'boolean':
        if (!value) nextElement.value = false;
        else {
          if (typeof value === 'boolean') nextElement.value = value;
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not a boolean`
            );
        }

        break;
      case 'array':
        if (!value) nextElement.value = [];
        else {
          if (Array.isArray(value)) nextElement.value = [...value];
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not an array`
            );
        }

        break;

      case 'object':
        if (!value) nextElement.value = {};
        else {
          if (typeof value === 'object') nextElement.value = { ...value };
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not an object`
            );
        }

        break;

      default:
        throw new Error(`The type "${nextElement.type}" is an invalid type`);
    }

    return nextElement;
  };

  /*============================ END OF SECTION ============================*/

  /**============================================
//* fill the array with the rest of the objects or arrays
 *=============================================**/
  const fillArray = (arrayElement: any): any[] => {
    const newArray = [];

    for (let i = 0; i < arrayElement.length; i++) {
      if (!Array.isArray(arrayElement[i])) {
        newArray.push({ ...fillObject(arrayElement[i]) });
      } else {
        newArray.push([...fillArray(arrayElement[i])]);
      }
    }
    return newArray;
  };
  /*============================ END OF SECTION ============================*/

  const realForm = ref(prepareForm()) as Ref<{
    [K in keyof T]: T[K] extends FormField<infer U> ? FormField<U> :
    T[K] extends FormField<infer U>[] ? FormField<U>[] :
    never;
  }>;

  /**========================================================================
//* Get a value from the form
*========================================================================**/
  const getValue = (fieldLocation: (string | number)[]): any => {

    let current: any = realForm.value;
    for (const key of fieldLocation) {
      if (!current) break;
      current = current[key];
    }
    return current;
  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
//* reset a field by empty or with a new value
*========================================================================**/
  const resetField = (fieldLocation: (string | number)[], value?: any) => {
    const auxValue = {
      target: {
        value,
        name: '',
      },
    };

    onFieldChange(auxValue, fieldLocation);
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
 //* Locate a value in the form
 *========================================================================**/
  const locateAfield = (fieldLocation: any[], form = realForm.value) => {
    let auxForm: any = form;

    for (let i = 0; i < fieldLocation.length; i++) {
      if (Array.isArray(auxForm)) {
        if (
          isNaN(fieldLocation[i]) ||
          fieldLocation[i] < 0 ||
          fieldLocation[i] >= auxForm.length
        ) {
          throw new Error(
            `It is impossible to get the position "${JSON.stringify(
              fieldLocation[i]
            )}" in the array: "${JSON.stringify(auxForm)}"`
          );
        } else {
          auxForm = auxForm[fieldLocation[i]];
        }
      } else {
        if (fieldLocation[i] in auxForm) auxForm = auxForm[fieldLocation[i]];
        else
          throw new Error(
            `The prop "${JSON.stringify(
              fieldLocation[i]
            )}" is not in "${JSON.stringify(auxForm)}"`
          );
      }
    }

    return auxForm;
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
//* Add a new field in an array field in the form
*========================================================================**/
  const addField = (fieldLocation: (number | string)[], field: any) => {
    const element = locateAfield(fieldLocation);

    if (!Array.isArray(element))
      throw new Error(
        `The field "${JSON.stringify(element)}" is not a correct field`
      );

    const newField = fillObject(field);

    element.push(newField);
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
  //* itIsAProp, check if there is a prop with the same name as the param
  *========================================================================**/

  const isItAProp = (prop: string | number, defaultForm: {
    [key: string]: any
  }) => {
    if (prop in defaultForm) {
      return true;
    } else {
      throw new Error(
        `The prop "${JSON.stringify(
          prop
        )}" does not exist in the object: "${JSON.stringify(defaultForm)}"`
      );
    }
  };

  /*============================ END OF SECTION ============================*/

  /**========================================================================
   //* findTheField, find the field in the form following the fieldLocation array
  *========================================================================**/
  const findTheField = (auxForm: {
    [x: string]: any[] | FormField;
  }, fieldLocation: (string | number)[], value: any) => {
    let element: any = { ...auxForm };

    for (let i = 0; i < fieldLocation.length; i++) {

      const fieldLoc = fieldLocation[i] as (number | string)
      checkTheProp(element, fieldLoc);
      element = element[fieldLoc];
    }

    if (!('value' in element))
      throw new Error(
        `The field "${JSON.stringify(element)}" is not a valid field`
      );

    fillWithNewValue(element, value);
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
 //* fillWithNewValue, set the new value in the input
 *========================================================================**/
  const fillWithNewValue = (element: FormField, value: any) => {
    const { type } = element;

    switch (type) {
      case 'string':
        if (!value) element.value = '';
        else {
          if (typeof value === 'string') {
            element.value = value;
          } else {
            throw new Error('This field can only receive a string value');
          }
        }
        break;
      case 'boolean':
        if (!value) element.value = true;
        else {
          if (
            value.toLowerCase() === 'true' ||
            value.toLowerCase() === 'false'
          ) {
            element.value = value.toLowerCase() !== 'true';
          } else {
            throw new Error('This field can only receive a boolean value');
          }
        }
        break;
      case 'number':
        if (!value) element.value = '';
        else {
          if (!isNaN(value)) {
            if (!value) element.value = '';
            else element.value = Number(value);
          } else {
            throw new Error('This field can only receive a number value');
          }
        }
        break;
      case 'array':
        if (!value) element.value = [];
        else {
          if (Array.isArray(value)) {
            if (!value) element.value = [];
            else element.value = [...value];
          } else {
            throw new Error('This field can only receive an array value');
          }
        }
        break;

      default:
        if (!value) element.value = {};
        else {
          if (typeof value === 'object') {
            if (!value) element.value = {};
            else element.value = { ...value };
          } else {
            throw new Error('This field can only receive an object value');
          }
        }
        break;
    }
  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
 //* onFieldChange, set the new value to the form
 *========================================================================**/
  const onFieldChange = (
    { target: { value, name } }: { target: { value: any, name: string } },
    fieldLocation: (string | number)[] = [name]
  ) => {
    if (!fieldLocation[0])
      throw new Error('It is impossible to locate the field');

    const auxForm: any = { ...realForm.value };

    if (fieldLocation.length === 1 && isItAProp(fieldLocation[0], auxForm)) {
      if (!('value' in auxForm[fieldLocation[0]]!))
        throw new Error(
          `The field "${JSON.stringify(auxForm)}" is not a valid field`
        );
      fillWithNewValue(auxForm[fieldLocation[0]] as FormField, value);
    } else {
      findTheField(auxForm, fieldLocation, value);
    }

    realForm.value = { ...auxForm };
  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
   //* reset a field/element by empty or with a new value
  *========================================================================**/
  const auxResetField = (field: FormField, value?: any) => {
    const { type } = field;

    switch (type) {
      case 'string':
        if (!value) field.value = '';
        else {
          if (typeof value === 'string') field.value = value;
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not a string`
            );
        }

        break;
      case 'number':
        if (!value) field.value = '';
        else {
          if (typeof value === 'number') field.value = value;
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not a number`
            );
        }

        break;
      case 'boolean':
        if (!value) field.value = false;
        else {
          if (typeof value === 'boolean') field.value = value;
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not a boolean`
            );
        }

        break;
      case 'array':
        if (!value) field.value = [];
        else {
          if (Array.isArray(value)) field.value = [...value];
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not an array`
            );
        }

        break;

      default:
        if (!value) field.value = {};
        else {
          if (typeof value === 'object') field.value = { ...value };
          else
            throw new Error(
              `The value "${JSON.stringify(value)}" is not an object`
            );
        }

        break;
    }
  };

  /*============================ END OF SECTION ============================*/


  /**========================================================================
//* reset the array fields by empty or with a new value
*========================================================================**/
  const resetArrayField = (arrayField: any[], values = []) => {
    for (let i = 0; i < arrayField.length; i++) {
      if (Array.isArray(arrayField[i])) {
        if (values[i]) {
          resetArrayField(arrayField[i], values[i]);
        } else {
          resetArrayField(arrayField[i]);
        }
      } else {
        if (values[i]) {
          auxResetField(arrayField[i], values[i]);
        } else auxResetField(arrayField[i]);
      }
    }
  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
//* reset the form by default if original, otherwise
 //* by empty
*========================================================================**/
  const onResetForm = (original: boolean) => {
    const newForm = { ...prepareForm() };

    if (!original) {
      for (const prop in newForm) {
        if (Array.isArray(newForm[prop])) {
          resetArrayField(newForm[prop] as any[]);
        } else {
          auxResetField(newForm[prop] as FormField);
        }
      }
    }

    return newForm;
  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
//* reset the form with the received values, and the rest
//* of the values are setting by default if original,
//* otherwise are setting by empty
 *========================================================================**/
  const resetForm = (newForm?: { [K in keyof T]?: FormValueType<T[K]> | undefined | null }, options?: {
    original?: boolean,
    omitExtraFields?: boolean
  }) => {
    const auxForm: any = options?.original ? onResetForm(true) : onResetForm(false);

    for (const prop in newForm) {
      if (prop in auxForm) {
        if (Array.isArray(auxForm[prop]))
          resetArrayField(auxForm[prop] as any[], newForm[prop] as any);
        else auxResetField(auxForm[prop] as FormField, newForm[prop]);
      }
      else {

        if (!options?.omitExtraFields)
          throw new Error(
            `The prop "${prop}" is not in "${JSON.stringify(auxForm)}"`
          );
      }
    }
    realForm.value = { ...auxForm };



  };
  /*============================ END OF SECTION ============================*/


  /**========================================================================
//* Get the prop name for the field
*========================================================================**/

  const getFullFieldName = (fieldLocation: (string | number)[]) => {
    if (Array.isArray(fieldLocation) && fieldLocation.length > 0) {
      let name = `${fieldLocation[0]}`;

      for (let i = 1; i < fieldLocation.length; i++) {
        name = `${name}-${fieldLocation[i]}`;
      }
      return name;
    } else {
      throw new Error(
        `It is impossible to get a full field name from: "${JSON.stringify(
          fieldLocation
        )}"`
      );
    }
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
    //* Check if the arrayFields are valid
   *========================================================================**/

  const auxValidFormArray = (arrayField: any[], fieldLocation: (string | number)[], valid: boolean) => {
    let validForm: any = {
      valid,
    };
    for (let i = 0; i < arrayField.length; i++) {
      if (!Array.isArray(arrayField[i])) {
        const fieldValid: any = isValidField([...fieldLocation, i], true);
        validForm[getFullFieldName([...fieldLocation, i])] = {
          ...fieldValid,
        };
        if (!fieldValid.valid) validForm.valid = false;
      } else {
        validForm = {
          ...validForm,
          ...auxValidFormArray(
            arrayField[i],
            [...fieldLocation, i],
            validForm.valid
          ),
        };
      }
    }

    return validForm;
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
  //* Check if the form is valid
 *========================================================================**/

  const isValidForm = (withErrors = false) => {
    const form = { ...realForm.value };
    let validForm: any = {
      valid: true,
    };

    for (const prop in form) {
      const fieldLocation = [`${prop}`];
      if (!Array.isArray(form[prop])) {
        const fieldValid: any = isValidField(fieldLocation, true);
        validForm[getFullFieldName(fieldLocation)] = {
          ...fieldValid,
        };
        if (!fieldValid.valid) validForm.valid = false;
      } else {
        validForm = {
          ...validForm,
          ...auxValidFormArray(form[prop] as any[], fieldLocation, validForm.valid),
        };
      }
    }
    return withErrors ? { ...validForm } : validForm.valid;
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
//* Check if a field is valid
*========================================================================**/

  const isValidField = (fieldLocation: (string | number)[], withErrors = false) => {
    const field = { ...locateAfield(fieldLocation) };
    const { validations } = field;

    let isValid = {
      valid: true,
    };
    for (let i = 0; i < validations.length; i++) {
      if (typeof validations[i] !== 'function')
        throw new Error(
          `A validation can be only a function. Field location: "${JSON.stringify(
            fieldLocation
          )}", validation value: "${JSON.stringify(validations[i])}"`
        );

      const validation = validations[i]({ ...field });

      if (validation) {
        if (typeof validation === 'object' && !Array.isArray(validation)) {
          isValid.valid = false;
          isValid = { ...isValid, ...validation };
        } else {
          throw new Error(
            `A validation can only return an object or null. Returned value: "${JSON.stringify(
              validation
            )}"`
          );
        }
      }
    }

    return withErrors ? { ...isValid } : isValid.valid;
  };
  /*============================ END OF SECTION ============================*/

  /**========================================================================
   //* get array value
   *========================================================================**/
  const getArrayValues = (arrayField: any[]) => {
    const array: any = [];

    arrayField.forEach((element) => {
      if (Array.isArray(element)) {
        array.push(getArrayValues(element));
      } else array.push(element.value);
    });

    return array;
  };

  /*============================ END OF SECTION ============================*/


  /**========================================================================
//* Get form value
*========================================================================**/
  const getFormValue = (): { [K in keyof T]: FormValueType<T[K]> | undefined | null } => {

    const formValue: any = {};

    const auxRealForm = realForm.value


    for (const prop in auxRealForm) {
      if (!Array.isArray(auxRealForm[prop]))
        formValue[prop] = (auxRealForm[prop] as FormField).value;
      else formValue[prop] = getArrayValues([...(auxRealForm[prop] as any[])]);
    }

    return formValue;
  };
  /*============================ END OF SECTION ============================*/


  return {
    realForm,
    onFieldChange,
    resetForm,
    resetField,
    addField,
    getValue,
    isValidForm,
    isValidField,
    getFormValue
  };
};

export default useForm;
