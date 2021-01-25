import { EXIF } from "exif-js";

export default function ExifHeader(file) {
  var img2 = document.getElementById("originalImage");
  EXIF.getData(img2, function () {
    var allMetaData = EXIF.getAllTags(this);
    console.log(JSON.stringify(allMetaData, null, "\t"));
  });
}
