import cv from 'opencv4nodejs';
import { join } from 'path';
import np from 'numjs';
import {
  complexMultiplyFilter,
  convertComplexNumber,
  createImagePadding,
  getIDFTReal,
  removeImagePadding
} from 'utils/utils';
const { uuid } = require('uuidv4');
interface idealFilter {
  imgName: string;
  array: {
    D0: number;
    order: number;
  };
}
export const butterworthLowPassFilter = async (
  imgName: string,
  array: idealFilter['array']
): Promise<string> => {
  const [fileName, fileType] = imgName.split('.');
  const filePath = join('./public/images', imgName);
  const img = await cv.imreadAsync(filePath);

  const { D0, order } = array;

  //   Convert to 2d dimension only
  const [M, N] = img.sizes;
  const imgGray = img.bgrToGray().getDataAsArray();
  const P = M * 2,
    Q = N * 2;
  // Create adding
  const imgPad = createImagePadding(imgGray, M, N);
  // Convert complex for DFT
  const matForDft: number[][][] = convertComplexNumber(imgPad, P, Q);

  //   DFT Convert
  const DFT = np.fft(np.array(matForDft));

  //   Calucate the center
  const center = [M, N];
  //   Fillter H
  let filterNP = np.zeros([P, Q], 'float32');
  for (let i = 0; i < M * 2; i++)
    for (let j = 0; j < N * 2; j++) {
      const radius = Math.sqrt(
        Math.pow(i - center[0], 2.0) + Math.pow(j - center[1], 2.0)
      );

      filterNP.set(i, j, 1 / (1 + Math.pow(radius / D0, 2 * order)));
    }
  const filterNPConverter: any = filterNP.tolist();
  const hFilter = filterNPConverter as number[][];

  //   Convert DFT to matrix
  const DFTMatrix = DFT.tolist();
  //   Multiply with filter
  const g = complexMultiplyFilter(hFilter, DFTMatrix, P, Q);

  //   Inverter DFT
  const iftReal = getIDFTReal(g);

  const fillterImage = removeImagePadding(iftReal, M, N);
  const newFileName = fileName + uuid();
  //* Export
  await cv.imwriteAsync(
    join(global?.__basedir, 'public/dist', `${newFileName}_bw.${fileType}`),
    new cv.Mat(fillterImage, cv.CV_32FC1)
  );
  return `${newFileName}_bw.${fileType}`;
};
