import { isNullable } from "./isNullable";

export const calculatePerc = (n: number, round=2): number => {
  if(isNullable(n)) {
    console.warn("your value is nullable")
    return 0
  }
  if(n<0 || n > 1) {
    console.warn("your value is out of range")
    return n < 0 ? 0 : 100;
  }

  return Number((n * 100).toFixed(round))
}