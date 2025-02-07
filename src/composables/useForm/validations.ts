
export default {
  //* required
  required: ({ value }: { value: string }) => {
    if (value) {
      return null;
    } else {
      return { required: `${value}` };
    }
  },
  //* minCharacters
  minCharacters:
    (min: number) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`;

        if (stringValue.length >= min) {
          return null;
        } else {
          return { minCharacters: min };
        }
      },
  //* maxCharacters
  maxCharacters:
    (max: number) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`;

        if (stringValue.length <= max) {
          return null;
        } else {
          return { maxCharacters: location };
        }
      },

  //* minValue
  minValue:
    (min: number) =>
      ({ value }: { value: string }) => {
        if (typeof value !== 'number' && value !== '')
          throw new Error(
            `Validation minValue can be applied only to a number value, value: "${JSON.stringify(
              value
            )}"`
          );
        const auxValue = Number(value)
        if (auxValue >= min) {
          return null;
        } else {
          return { minValue: min };
        }
      },
  //* maxValue
  maxValue:
    (max: number) =>
      ({ value }: { value: string }) => {
        if (typeof value !== 'number' && value !== '')
          throw new Error(
            `Validation maxValue can be applied only to a number value, value: "${JSON.stringify(
              value
            )}"`
          );
        const auxValue = Number(value)
        if (auxValue <= max) {
          return null;
        } else {
          return { maxValue: max };
        }
      },
  //* isEmail
  isEmail: ({ value }: { value: string }) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailPattern.test(value)) return null;
    else return { isNotEmail: `${value}` };
  },
  //* isGoodPassword
  isGoodPassword: ({ value }: { value: string }) => {
    const goodPassword =
      /^(?=.*[0-9])(?=.*[-[\]_=+!@#$%^'"/,.?:;)(}{&*<>])(?=.*[A-Z]).*$/;

    if (goodPassword.test(value)) return null;
    else return { isNotGoodPassword: `${value}` };
  },
  //* match with the pattern
  pattern:
    (patter: RegExp) =>
      ({ value }: { value: string }) => {
        if (!(patter instanceof RegExp))
          throw new Error(
            `Validation pattern can be applied only with a RegExp, patter: "${JSON.stringify(
              patter
            )}"`
          );

        if (patter.test(value)) return null;
        else return { notMatchPattern: `${patter}` };
      },
  //* match with the includes
  includes:
    (include: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`;

        if (stringValue.includes(`${include}`)) return null;
        else return { notIncludes: include };
      },
  //* not match with the includes
  notIncludes:
    (include: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`;

        if (!stringValue.includes(`${include}`)) return null;
        else return { includes: include };
      },
  //* match with the includes ignore Cap
  includesIgnoreCap:
    (include: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`.toLowerCase();

        if (stringValue.includes(`${include.toLowerCase()}`)) return null;
        else return { notIncludesIgnoreCase: include };
      },
  //* not match with the includes ignore Cap
  notIncludesIgnoreCap:
    (include: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`.toLowerCase();

        if (!stringValue.includes(`${include.toLowerCase()}`)) return null;
        else return { includesIgnoreCase: include };
      },
  //* equal
  equal:
    (equal: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`;

        if (stringValue === `${equal}`) return null;
        else return { notEqual: equal };
      },
  //* equal ignore Cap
  equalIgnoreCap:
    (equal: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`.toLowerCase();

        if (stringValue === `${equal}`.toLowerCase()) return null;
        else return { notEqualIgnoreCase: equal };
      },
  //* not equal ignore Cap
  notEqualIgnoreCap:
    (equal: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`.toLowerCase();

        if (stringValue !== `${equal}`.toLowerCase()) return null;
        else return { isEqualIgnoreCase: equal };
      },
  //* startWith
  startWith:
    (start: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`[0];

        if (stringValue === start[0]) return null;
        else return { notStarWith: start };
      },
  //* startWith ignore Cap
  startWithIgnoreCase:
    (start: string) =>
      ({ value }: { value: string }) => {
        const stringValue = `${value}`.toLowerCase()[0];

        if (stringValue === start.toLowerCase()[0]) return null;
        else return { notStarWithIgnoreCase: start };
      },
  //* endWith
  endWith:
    (end: string) =>
      ({ value }: { value: string }) => {
        let stringValue: string | undefined = `${value}`;
        stringValue = stringValue[stringValue.length - 1];

        if (stringValue === end[0]) return null;
        else return { notEndWith: end };
      },
  //* endWith ignore Cap
  endWithIgnoreCase:
    (end: string) =>
      ({ value }: { value: string }) => {
        let stringValue: string | undefined = `${value}`.toLowerCase();
        stringValue = stringValue[stringValue.length - 1];

        if (stringValue === end.toLowerCase()[0]) return null;
        else return { notEndWithIgnoreCase: end };
      },
  //* startWithUpperCase
  startWithUpperCase: ({ value }: { value: string }) => {
    const stringValue = `${value}`.toUpperCase()[0];

    if (stringValue === value[0]) return null;
    else return { notStartWithUpperCase: value };
  },
  //* startWithLowerCase
  startWithLowerCase: ({ value }: { value: string }) => {
    const stringValue = `${value}`.toLowerCase()[0];

    if (stringValue === value[0]) return null;
    else return { notStartWithLowerCase: value };
  },
  //* isLowerCase
  isLowerCase: ({ value }: { value: string }) => {
    const stringValue = `${value}`.toLowerCase();

    if (stringValue === value) return null;
    else return { notLowerCase: value };
  },
  //* isUpperCase
  isUpperCase: ({ value }: { value: string }) => {
    const stringValue = `${value}`.toUpperCase();

    if (stringValue === value) return null;
    else return { notUpperCase: value };
  },
  //* notSpaces
  notSpaces: ({ value }: { value: string }) => {
    const stringValue = `${value}`;

    for (let i = 0; i < stringValue.length; i++) {
      if (stringValue[i] === ' ')
        return {
          isSpaced: value,
        };
    }

    return null;
  },
  //* upperCaseWords
  upperCaseWords: ({ value }: { value: string }) => {
    const stringValue = `${value}`;

    let newWord = true;

    for (let i = 0; i < stringValue.length; i++) {
      if (stringValue[i] !== ' ') {
        if (newWord) {
          if (stringValue.toUpperCase()[i] !== stringValue[i])
            return { notUpperCaseWords: value };
          else newWord = false;
        }
      } else newWord = true;
    }

    return null;
  },
  //* isPhone
  isPhone:
    (code: string) =>
      ({ value }: { value: string }) => {
        console.log(code);

        const auxValue = value ? value : ''
        const numbers = auxValue.match(/\d+/g);
        const result = numbers ? numbers.join('') : null;

        if (result && result.length === 10) return null;
        else return { isNotPhone: result };
      },
  greaterThan:
    (number: number, equal?: boolean) =>
      ({ value }: { value: number }) => {

        let result = false;

        if (equal)
          result = value >= number
        else
          result = value > number

        if (result) return null;
        else return equal ? { isNotGreaterOrEqualThan: number } : { isNotGreaterThan: number };
      },
  lowerThan:
    (number: number, equal?: boolean) =>
      ({ value }: { value: number }) => {

        let result = false;

        if (equal)
          result = value <= number
        else
          result = value < number

        if (result) return null;
        else return equal ? { isNotLowerOrEqualThan: number } : { isNotLowerThan: number };
      },
};
