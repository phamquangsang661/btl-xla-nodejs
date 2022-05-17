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
}
export const laplacianFilter = async (imgName: string): Promise<string> => {
  const [fileName, fileType] = imgName.split('.');
  const filePath = join('./public/images', imgName);
  const img = await cv.imreadAsync(filePath);

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

  //   Fillter H
  let filterNP = np.zeros([P, Q], 'float32');
  for (let i = 0; i < P; i++)
    for (let j = 0; j < Q; j++) {
      filterNP.set(i, j, -(Math.pow(i, 2.0), Math.pow(j, 2.0)));
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
    join(global?.__basedir, 'public/dist', `${newFileName}_lp.${fileType}`),
    new cv.Mat(fillterImage, cv.CV_32FC1)
  );
  return `${newFileName}_lp.${fileType}`;
};
