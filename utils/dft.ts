import { rangeMatrixComplex2D, rangeMatrix2D } from './range-matrix';
import { complex, Complex, exp, divide, multiply, add } from 'mathjs';

export const DFT = (mat: number[][], M: number, N: number) => {
  const DFT2D: Complex[][] = rangeMatrixComplex2D(M, N, complex(0, 0));
  const pi2 = Math.PI * 2;
  for (let u = 0; u < M; u++) {
    for (let v = 0; v < N; v++) {
      let sumx = complex(0, 0);
      for (let x = 0; x < M; x++) {
        let sumy = complex(0, 0);
        for (let y = 0; y < N; y++) {
          sumy = add(
            sumy,
            multiply(
              mat[x][y],
              exp(complex(0, -pi2 * ((u * x) / M + (v * y) / N)))
            )
          ) as Complex;
        }
        sumx = add(sumx, sumy) as Complex;
      }
      DFT2D[u][v] = sumx;
    }
  }
  return DFT2D;
};

export const IDFT = (mat: Complex[][], M: number, N: number) => {
  const IDFT2D: number[][] = rangeMatrix2D(M, N, 0);
  const pi2 = Math.PI * 2;
  for (let u = 0; u < M; u++) {
    for (let v = 0; v < N; v++) {
      let sumx = complex(0, 0);
      for (let x = 0; x < M; x++) {
        let sumy = complex(0, 0);
        for (let y = 0; y < N; y++) {
          sumy = add(
            sumy,
            multiply(
              mat[x][y],
              exp(complex(0, pi2 * ((u * x) / M + (v * y) / N)))
            )
          ) as Complex;
        }
        sumx = add(sumx, sumy) as Complex;
      }
      IDFT2D[u][v] = Math.floor((divide(sumx, M * N) as Complex).re);
    }
  }
  return IDFT2D;
};
