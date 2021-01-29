import Numjs from '../models/Numjs'
import Image from '../models/Image'
/******************************/
/******* Main Functions *******/
/******************************/
const njs = new Numjs()
const image = new Image()

export default function MedianNoise(n_size = 3) {
  console.time('Execution Time');
  MedianNoiseInconsistencies(n_size)
  console.timeEnd('Execution Time');  
  return;
}

function MedianNoiseInconsistencies(n_size) {
  const { cv } = window  
  console.log("Initializing...")
  
  let _flatten = true;
  let multiplier = 3;

  let src = cv.imread("originalImage")
  let dst = new cv.Mat()
  let imgPxArray = image.arrayFromMat(src)
  
  let img_filtered = [...imgPxArray]
  cv.medianBlur(src, dst, n_size)
  img_filtered = image.arrayFromMat(dst)

  let noise_map = njs.arithmeticOnImgArray(njs.absolute(njs.arithmeticImgArrayOnArray(imgPxArray, img_filtered, 'sub')), multiplier, 'mul')

  let noiseMat = new cv.Mat()
  if (_flatten) {
    noise_map = image.matFromArray(noise_map)
    cv.cvtColor(noise_map, noiseMat, cv.COLOR_RGB2GRAY)
  }

  cv.imshow('imageCanvas', noiseMat)
  return;
}