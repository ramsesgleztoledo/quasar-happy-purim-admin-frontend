//* this is only prepared for quasar lazy rules

import validations from "./validations";


export const lazyRules = {
  required: (msg?: string) => (value: string) => !validations.required({ value }) || (msg ? msg : 'This field is required'),

  isEmail: (msg?: string) => (value: string) => !validations.isEmail({ value }) || (msg ? msg : 'Invalid email'),

  isGoodPassword: (msg?: string) => (value: string) => !validations.isGoodPassword({ value }) || (msg ? msg : 'Password is too weak, please use numbers, Capital letters and special characters'),

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  checkOnlyIfValue: (validationFunction: Function, msg?: string) => (value: string) => !value || !validationFunction({ value }) || (msg ? msg : 'incorrect field'),

  maxCharacters: (max: number, msg?: string) => (value: string) => !validations.maxCharacters(max)({ value }) || (msg ? msg : `Max characters (${max})`),

  minCharacters: (min: number, msg?: string) => (value: string) => !validations.minCharacters(min)({ value }) || (msg ? msg : `Min characters (${min})`),

  greaterThan: (number: number, equal: boolean, msg?: string) => (value: number) => !validations.greaterThan(number, equal)({ value }) || (msg ? msg : `This field needs to be greater ${equal ? 'or equal' : ''} than ${number}`),

  lowerThan: (number: number, equal: boolean, msg?: string) => (value: number) => !validations.lowerThan(number, equal)({ value }) || (msg ? msg : `This field needs to be lower ${equal ? 'or equal' : ''} than ${number}`),
}
