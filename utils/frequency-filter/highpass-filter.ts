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
  };
}
export const idealHighPassFilter = async (
  imgName: string,
  array: idealFilter['array']
): Promise<string> => {
  const [fileName, fileType] = imgName.split('.');
  const filePath = join('./public/images', imgName);
  const img = await cv.imreadAsync(filePath);

  let arrayNP = np.array(array.data);

  const sumA: any = arrayNP.sum();
  const sumConvert: number = sumA as number;
  arrayNP = arrayNP.divide(sumConvert != 0 ? sumConvert : 1);
  let kernel = new cv.Mat(arrayNP.tolist(), cv.CV_32FC1);

  //* Function filter
  const imgFilter = await img.filter2DAsync(-1, kernel);
  const newFileName = fileName + uuid();
  //* Export
  await cv.imwriteAsync(
    join(global?.__basedir, 'public/dist', `${newFileName}_hp.${fileType}`),
    imgFilter
  );
  return `${newFileName}_hp.${fileType}`;
};
