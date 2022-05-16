import cv, { CV_32FC1 } from 'opencv4nodejs';
import np from 'numjs';
import math, { complex, multiply } from 'mathjs';
import { rangeMatrix3D } from 'utils/range-matrix';
export const createImagePadding = (
  imgGray: number[][],
  M: number,
  N: number
) => {
  const imgPad = new cv.Mat(
    np.zeros([M * 2, N * 2]).tolist(),
    CV_32FC1
  ).getDataAsArray();
  //   Create padding
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      imgPad[i][j] = imgGray[i][j];
    }
  }

  return imgPad;
};

export const convertComplexNumber = (img: number[][], P: number, Q: number) => {
  const matComplex: number[][][] = [];

  for (let i = 0; i < P; i++) {
    matComplex.push([]);
    for (let j = 0; j < Q; j++) {
      matComplex[i].push([img[i][j] * Math.pow(-1, i + j), 0]);
    }
  }
  return matComplex;
};

export const complexMultiplyFilter = (
  filterMat: number[][],
  complexMat: number[][][],
  P: number,
  Q: number
) => {
  const g = rangeMatrix3D(P, Q, 2);
  for (let u = 0; u < P; u++) {
    for (let v = 0; v < Q; v++) {
      const numberR = complexMat[u][v];
      const complexJ = multiply(
        filterMat[u][v],
        complex(numberR[0], numberR[1])
      ) as math.Complex;
      g[u][v] = [complexJ.re, complexJ.im];
    }
  }
  return g;
};

export const getIDFTReal = (g: number[][][]) => {
  const ifftList = np.ifft(g).tolist();
  const iftReal = ifftList.map((child) =>
    child.map((value) => {
      return Math.abs(value[0]);
    })
  );
  return iftReal;
};

export const removeImagePadding = (imgPadding: number[][], M: number, N: number) => {
  const imgConvert = new cv.Mat(
    np.zeros([M, N]).tolist(),
    CV_32FC1
  ).getDataAsArray();
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      imgConvert[i][j] = imgPadding[i][j];
    }
  }
  return imgConvert;
};
