

function getValidBoolean(value: any): boolean | undefined {
  if (typeof value !== 'boolean') {
    return undefined;
  }

  return value as boolean;
}

function getValidNumber(value: any): number | undefined {
  if ((typeof value === 'number') && !isNaN(value) && isFinite(value)) {
    return value;
  }

  return undefined;
}

function getValidPositiveNumber(value: any): number | undefined {
  const n: number | undefined = getValidNumber(value);

  if (!n || (n <= 0)) {
    return undefined;
  }

  return n;
}

function getValidInteger(value: any): number | undefined {
  const n: number | undefined = getValidNumber(value);

  if (!n || !Number.isInteger(n)) {
    return undefined;
  }

  return n;
}

function getValidPositiveInteger(value: any): number | undefined {
  const n: number | undefined = getValidInteger(value);

  if (!n || (n <= 0)) {
    return undefined;
  }

  return n;
}

function getValidString(value: any): string | undefined {
  if ((typeof value !== 'string') || value.trim() === '') {
    return undefined;
  }

  return value as string;
}

function getValidDate(value: any): Date | undefined {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

function getValidBooleanOrDefault(value: any, defaultValue: boolean): boolean {
  const f: boolean | undefined = getValidBoolean(value);

  if (!f) {
    return defaultValue;
  }

  return f;
}

function getValidNumberOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidNumber(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidPositiveNumberOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidPositiveNumber(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidIntegerOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidInteger(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidPositiveIntegerOrDefault(value: any, defaultValue: number): number {
  const n: number | undefined = getValidPositiveInteger(value);

  if (!n) {
    return defaultValue;
  }

  return value;
}

function getValidStringOrDefault(value: any, defaultValue: string): string {
  const str: string | undefined = getValidString(value);

  if (!str) {
    return defaultValue;
  }

  return str;
}

function getValidDateOrDefault(value: any, defaultValue: Date): Date {
  const date = getValidDate(value);

  if (!date) {
    return defaultValue;
  }

  return date;
}

export {
  getValidBoolean,
  getValidNumber, getValidPositiveNumber,
  getValidInteger, getValidPositiveInteger,
  getValidString,
  getValidDate,
  getValidBooleanOrDefault,
  getValidNumberOrDefault, getValidPositiveNumberOrDefault,
  getValidIntegerOrDefault, getValidPositiveIntegerOrDefault,
  getValidStringOrDefault,
  getValidDateOrDefault,
};