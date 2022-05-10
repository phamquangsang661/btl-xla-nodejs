import cv from 'opencv4nodejs';
import { join } from 'path';
import np from 'numjs';
const { uuid } = require('uuidv4');
interface idealFilter {
  imgName: string;
  array: {
    row: number;
    col: number;
    data: number[][];
    D0: number;
    order: number;
  };
}
export const butterworthHighPassFilter = async (
  imgName: string,
  array: idealFilter['array']
): Promise<string> => {
  const [fileName, fileType] = imgName.split('.');
  const filePath = join('./public/images', imgName);
  const img = await cv.imreadAsync(filePath);

  const { D0, order, row, col, data } = array;

  let arrayNP = np.array(data, 'float32');
  const center = [Math.floor(row / 2), Math.floor(col / 2)];

  for (let i = 0; i < row; i++)
    for (let j = 0; j < col; j++) {
      const radius = Math.sqrt(
        Math.pow(i - center[0], 2.0) + Math.pow(j - center[1], 2.0)
      );

      arrayNP.set(i, j, 1 / (1 + Math.pow(D0 / radius, 2 * order)));
    }
  let kernel = new cv.Mat(arrayNP.tolist(), cv.CV_32FC1);

  //* Function filter
  const imgFilter = await img.filter2DAsync(-1, kernel);
  const newFileName = fileName + uuid();
  //* Export
  await cv.imwriteAsync(
    join(global?.__basedir, 'public/dist', `${newFileName}_lb.${fileType}`),
    imgFilter
  );
  return `${newFileName}_lb.${fileType}`;
};
