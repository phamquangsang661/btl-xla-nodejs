import _, { map } from 'lodash';
import math, { complex, Complex } from 'mathjs';
export const rangeMatrix3D = (row: number, col: number, value: number) => {
  return _.range(row).map((_value) => {
    return _.range(col).map((__value) => [value, value, value]);
  });
};

export const rangeMatrix2D = (row: number, col: number, value: number) => {
  return _.range(row).map((_value) => {
    return _.range(col, value);
  });
};

export const rangeMatrixComplex1D = (length: number, value: Complex) => {
  return _.range(length).map((_value) => {
    return value;
  });
};

export const rangeMatrixComplex2D = (
  row: number,
  col: number,
  value: Complex
) => {
  const temp: Complex[][] = [];
  for (let i = 0; i < row; i++) {
    const tempRow: Complex[] = [];
    for (let j = 0; j < col; j++) {
      tempRow.push(value);
    }
    temp.push(tempRow);
  }
  return temp;
};

export const rangeMatrixComplex3D = (
  d1: number,
  d2: number,
  d3: number,
  value: Complex
) => {
  const temp: Complex[][][] = [];
  for (let i = 0; i < d1; i++) {
    const tempd1: Complex[][] = [];
    for (let j = 0; j < d2; j++) {
      const tempd2: Complex[] = [];
      for (let z = 0; z < d3; z++) {
        tempd2.push(value);
      }
      tempd1.push(tempd2);
    }
    temp.push(tempd1);
  }
  return temp;
};
