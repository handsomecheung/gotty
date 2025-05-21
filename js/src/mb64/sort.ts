const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const genCharMap = (chars: string): { [key: string]: number } => {
  const map: { [key: string]: number } = {};
  for (let i = 0; i < chars.length; i++) {
    map[chars[i]] = i;
  }
  return map;
};

const sum = (numbers: number[]): number => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
};

const reverse = (str: string): string => {
  return str.split("").reverse().join("");
};

const baseCharsMap = genCharMap(baseChars);

const charsToNumbers = (chars: string): number[] => {
  const numbers: number[] = [];
  for (const c of chars) {
    if (c === "=") {
      numbers.push(sum(numbers) % 64);
    } else {
      numbers.push(baseCharsMap[c]);
    }
  }
  return numbers;
};

const sort = (str: string, numbers: number[]): string => {
  let res = str;
  for (const number of numbers) {
    let _res = "";
    let _str = res;
    while (_str.length > 0) {
      const p = (number + _str.length) * Math.abs(number - _str.length);
      const index = p % _str.length;
      _res += _str[index];
      _str = _str.slice(0, index) + _str.slice(index + 1);
    }
    _res = reverse(_res);
    res = _res;
  }
  return res;
};

const genNewBaseChars = (password: string): string => {
  const b64 = btoa(password);
  const numbers = charsToNumbers(b64);
  return sort(baseChars, numbers);
};

export { genNewBaseChars };
