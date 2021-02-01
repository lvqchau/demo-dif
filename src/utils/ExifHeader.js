import { EXIF } from "exif-js"

export default async function ExifHeader() {
  let res = await asyncGetMetaData()
  return {...res}
}

function asyncGetMetaData() {
  return new Promise(function (resolve) {
    let img = document.getElementById("originalImage")
    EXIF.getData(img, function () {
      console.log(EXIF.getAllTags(this))
      resolve(EXIF.getAllTags(this))
    })
  })
}