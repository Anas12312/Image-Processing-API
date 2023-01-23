import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cloneImage from './utilities/cloneImage';

// Express Server Configuration to Run on Port 3000
const app = express();
const port = 3000;

// The GET Endpoint for resizing/viewing Images
app.get('/api/images', async (req: Request, res: Response): Promise<void> => {
  // Taking the 3 Parameters from the Query
  const filename = req.query.filename as string;
  const width = req.query.width as string;
  const height = req.query.height as string;
  if (isNaN(Number(width)) || isNaN(Number(height)) || Number(height) < 1 || Number(width) < 1) {
    res.status(400).send('Please Enter a Valid Parameters!');
    return;
  }
  // Checks For any Parameter Missing
  if (!filename || !width || !height) {
    res.status(400).send("Please Select an Image's Name, Width and Height!");
    return;
  }

  // Creating the Path for the Resizied Image
  const thumbPath = path.join(
    __dirname,
    '../images/thumb',
    filename + width + height + '.jpg'
  );

  // Checks if the desired Image with the specified Size already Exists
  if (fs.existsSync(thumbPath)) {
    res.sendFile(thumbPath); // Sending the Image if Exists
  } else {
    // Creating the path for the Original Image
    const fullPath = path.join(__dirname, '../images/full', filename + '.jpg');

    // Checks if the Original Image Exists
    if (fs.existsSync(fullPath)) {
      // Create the Image in the Thumb Directory using Sharp API
      const status = await cloneImage(filename, width, height);

      // Checks wether the operation Succeded or Not
      if (status) {
        // Sending the Resized Image
        res.sendFile(thumbPath);
      } else {
        res.status(400).send('An Error has Occured!');
      }
    } else {
      res.status(404).send("This Image Doesn't Exist!");
    }
  }
});

// Starting the Server
app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});

export default app;
