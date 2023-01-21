import path from 'path';
import sharp from 'sharp';

// The Function that takes the Query parameters and Resize the Image
const cloneImage = async (
  filename: string,
  width: string,
  height: string
): Promise<boolean> => {
  const inputPath = path.join(
    __dirname,
    '../../images/full',
    filename + '.jpg'
  );
  const outputPath = path.join(
    __dirname,
    '../../images/thumb',
    filename + width + height + '.jpg'
  );

  const status = await sharp(inputPath)
    .resize({
      width: parseInt(width),
      height: parseInt(height),
    })
    .jpeg({ mozjpeg: true })
    .toFile(outputPath)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return status;
};

export default cloneImage;
