export default async function JPEGGhost(quality = 0.6) {
  const { cv } = window;

  // Init
  const img = document.getElementById("originalImage");
  const canvasResult = document.getElementById("imageCanvas");
  // create 1st canvas
  const canvas = document.createElement("CANVAS");
  canvas.id = "canvas";
  const ctx = canvas.getContext("2d");
  // create 2nd canvas
  const canvasConverted = document.createElement("CANVAS");
  canvasConverted.id = "canvasConverted";
  const ctxConverted = canvasConverted.getContext("2d");

  // Resize: image->canvasResult
  // let nw = img.naturalWidth;
  // let nh = img.naturalHeight;
  let nw = canvasResult.width;
  let nh = canvasResult.height;
  canvas.width = nw;
  canvas.height = nh;
  canvasConverted.width = nw;
  canvasConverted.height = nh;

  ctx.drawImage(img, 0, 0, nw, nh);

  // Save image with new JPEG quality
  const dataURI = canvas.toDataURL(
    "image/jpeg",
    0.5 /* Thong so jpeg quality 0 ~ 1*/
  );
  let imgObj = new Image();
  imgObj.src = dataURI;

  if (imgObj) {
    await new Promise((r) => setTimeout(r, 100));
    ctxConverted.drawImage(imgObj, 0, 0, nw, nh);
  }

  // Get the ImageData from 2 canvases
  let originalImgData = ctx.getImageData(0, 0, nw, nh);
  let compressedImgData = ctxConverted.getImageData(0, 0, nw, nh);

  // JPEG-Ghost
  let src = cv.matFromImageData(originalImgData);
  let dst = cv.matFromImageData(compressedImgData);
  let mask = new cv.Mat();
  let dtype = -1;
  let tmp = new cv.Mat();

  // Compute the square different between original image and the resaved image
  cv.subtract(dst, src, tmp, mask, dtype);
  cv.multiply(tmp, tmp, tmp);

  let smoothing_b = 17;
  // let offset = (smoothing_b - 1) / 2;

  // Take the average by kernel size b
  let kernel = new cv.Mat(
    smoothing_b,
    smoothing_b,
    cv.CV_32F,
    new cv.Scalar(1.0 / Math.pow(smoothing_b, 2))
  );
  cv.filter2D(tmp, tmp, -1, kernel);

  // Take the average of 3 channels
  let rgbaPlanes = new cv.MatVector();
  cv.split(tmp, rgbaPlanes);
  let R = rgbaPlanes.get(0);
  let G = rgbaPlanes.get(1);
  let B = rgbaPlanes.get(2);
  let result = cv.Mat.zeros(tmp.rows, tmp.cols, cv.CV_8U);
  let constThree = new cv.Mat(tmp.rows, tmp.cols, cv.CV_8U, new cv.Scalar(3));
  cv.add(R, G, result);
  cv.add(result, B, result);
  cv.divide(result, constThree, result);

  // Compute the nomalized component
  let minMax = cv.minMaxLoc(result);
  let normalizedVal = minMax.minVal / (minMax.maxVal - minMax.minVal);

  // Nomalization
  let constNomalizedVal = new cv.Mat(
    tmp.rows,
    tmp.cols,
    cv.CV_8U,
    new cv.Scalar(normalizedVal)
  );
  cv.subtract(result, constNomalizedVal, result, mask, dtype);

  cv.imshow("imageCanvas", result);

  // Release Mem
  rgbaPlanes.delete();
  R.delete();
  G.delete();
  B.delete();
  src.delete();
  dst.delete();
  mask.delete();
  tmp.delete();
  kernel.delete();
  constNomalizedVal.delete();
  result.delete();
}
