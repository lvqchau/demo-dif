export default function ErrorLevelAnalysis(file, quality=0.75, errorScale=10) {
  const img = document.getElementById("originalImage");
  const canvasResult = document.getElementById("imageCanvas");
  const ctxResult = canvasResult.getContext("2d");

  const canvas = document.createElement("CANVAS");
  canvas.id = "canvas";
  //   document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const canvasConverted = document.createElement("CANVAS");
  canvasConverted.id = "canvasConverted";
  //   document.body.appendChild(canvasConverted);
  const ctxConverted = canvasConverted.getContext("2d");

  let nw = canvasResult.width;
  let nh = canvasResult.height;
  canvas.width = nw;
  canvas.height = nh;
  canvasConverted.width = nw;
  canvasConverted.height = nh;

  ctx.drawImage(img, 0, 0, nw, nh);

  const dataURI = canvas.toDataURL(
    "image/jpeg",
    quality /* Thong so jpeg quality 0 ~ 1*/
  );
  let imgObj = new Image();
  imgObj.src = dataURI;

  if (imgObj) {
    ctxConverted.drawImage(imgObj, 0, 0, nw, nh);
    let originalImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let compressedImgData = ctxConverted.getImageData(
      0,
      0,
      canvasConverted.width,
      canvasConverted.height
    );

    let arrSource = originalImgData.data;
    let arrDes = compressedImgData.data;

    for (var i = 0, l = arrSource.length; i < l; i += 4) {
      for (var j = 0; j < 3; j++) {
        var error = Math.abs(arrSource[i + j] - arrDes[i + j]);
        arrSource[i + j] = error * errorScale;
      }
    }
    try {
      // Vi li do gi do cai nay ko asin dc,
      // Click 2 lan moi thay ket qua nha
      //   originalImgData.data = arrSource;
      console.log(originalImgData);
      ctxResult.putImageData(originalImgData, 0, 0);
    } catch (error) {
      console.log(error);
    }
  }
}
