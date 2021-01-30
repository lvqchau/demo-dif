import Numjs from '../models/Numjs'
import Image from '../models/Image'
import { reshape, median } from 'mathjs'
import wt from 'discrete-wavelets'
/******************************/
/******* Main Functions *******/
/******************************/
const njs = new Numjs()
const image = new Image()

export default function NoiseInconsistencies(block_size = 8) {
  console.time('Execution Time');
  Noise(block_size)
  console.timeEnd('Execution Time');  
  return;
}

function Noise(block_size) {
  console.log("Initializing...")
  const { cv } = window  

  let src = cv.imread("originalImage");
  let srcYCC = new cv.Mat();
  let rgbaPlanes = new cv.MatVector();
  cv.cvtColor(src, srcYCC, cv.COLOR_RGB2YCrCb);

  let imgPxArray = image.arrayFromMat(src)
  let imgYCCArray = image.arrayFromMat(srcYCC)
  cv.split(srcYCC, rgbaPlanes);
  let R = rgbaPlanes.get(0);
  
  let y = image.arrayFromMatVector(R)

  let coeffs = wt.dwt([1, 2, 3, 4], 'haar');
  console.log(coeffs)

  // cA, (cH, cV, cD) = coeffs
  // cD = cD[0:(len(cD)//block_size)*block_size, 0:(len(cD[0])//block_size)*block_size]

  /*
  let block = njs.zeros(Math.floor(cD.length)/block_size), Math.floor(cD[0].length/block_size), block_size**2)
  for (let i = 0; i < cD.length; i+=block_size) {
    for (let j = 0; j < cD[0].length; j+=block_size) {
      let blockElement = njs.slice(cD, [i, i+block_size], [j, j+block_size])
      let temp = reshape(blockElement, [1, 1, block_size**2])
      block[parseInt((i-1)/(block_size+1))][parseInt(int((j-1)/(block_size+1)))] = temp
    }
  }

  let abs_map = njs.absolute(block)
  let med_map = median(abs_map, axis=2)
  let noise_map = njs.arithmeticOnImgArray(med_map, 0.6745, 'div')
  
  cv.imshow('imageCanvas', image.matFromArray(noise_map))
  */
  
  
  
  src.delete()
  return;
}