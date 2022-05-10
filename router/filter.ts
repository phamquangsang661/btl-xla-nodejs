import express from 'express';
const router = express.Router();
import {
  idealLowPassFilter,
  idealHighPassFilter,
  butterworthLowPassFilter,
  butterworthHighPassFilter,
  gaussianLowPassFilter,
  gaussianHighPassFilter
} from 'utils/frequency-filter';

router.post('/lowpass', async function (req, res) {
  try {
    const { filename } = req.query;
    const { data, row, col } = req.body;
    const newFileName = await idealLowPassFilter(filename as string, {
      row,
      data,
      col
    });
    return res.status(200).json({ name: newFileName });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err?.message });
    }
    return res.status(400).json({ message: 'Unknown' });
  }
});

router.post('/highpass', async function (req, res) {
  try {
    const { filename } = req.query;
    const { data, row, col } = req.body;
    const newFileName = await idealHighPassFilter(filename as string, {
      row,
      data,
      col
    });
    return res.status(200).json({ name: newFileName });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err?.message });
    }
    return res.status(400).json({ message: 'Unknown' });
  }
});

router.post('/butterlowpass', async function (req, res) {
  try {
    const { filename } = req.query;
    const array: any = req.body;
    const newFileName = await butterworthLowPassFilter(
      filename as string,
      array
    );
    return res.status(200).json({ name: newFileName });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err?.message });
    }
    return res.status(400).json({ message: 'Unknown' });
  }
});

router.post('/butterhighpass', async function (req, res) {
  try {
    const { filename } = req.query;
    const array: any = req.body;
    const newFileName = await butterworthHighPassFilter(
      filename as string,
      array
    );
    return res.status(200).json({ name: newFileName });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err?.message });
    }
    return res.status(400).json({ message: 'Unknown' });
  }
});
router.post('/gaussianLowPassFilter', async function (req, res) {
  try {
    const { filename } = req.query;
    const array: any = req.body;
    const newFileName = await gaussianLowPassFilter(filename as string, array);
    return res.status(200).json({ name: newFileName });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err?.message });
    }
    return res.status(400).json({ message: 'Unknown' });
  }
});

router.post('/gaussianHighPassFilter', async function (req, res) {
  try {
    const { filename } = req.query;
    const array: any = req.body;
    const newFileName = await gaussianHighPassFilter(filename as string, array);
    return res.status(200).json({ name: newFileName });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ message: err?.message });
    }
    return res.status(400).json({ message: 'Unknown' });
  }
});
const upload = router;
export default upload;
