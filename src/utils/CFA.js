/*******************************/
/******* Functionalities *******/
/*******************************/
// input: array 
// output: [rowNum, colNum] of arr
function getDimensions(arr) {
  //[row, col]
  return [
    arr.length, //row
    arr.reduce((x, y) => Math.max(x, y.length), 0), //col
  ]
}

// input: array, divider
// output: array of size[original array], with value = value/divider
function divideByArray(arr, divider) {
  if (typeof arr === "number") return arr/divider;
  return arr.map((outer) => {
    if (typeof outer === "number") return outer/divider
    return outer.map((inner) => {
      if (typeof inner === "number") return inner/divider
      return inner.map((num) => {
        return num/divider
      })
    })
  })
}

// input: array, multiplier
// output: array of size[original array], with value = value/mul
function multiplyByArray(arr, mul) {
  if (typeof arr === "number") return arr*mul;
  return arr.map((outer) => {
    if (typeof outer === "number") return outer*mul
    return outer.map((inner) => {
      if (typeof inner === "number") return inner*mul
      return inner.map((num) => {
        return num*mul
      })
    })
  })
}

// input: array, value to be compared with
// output: array of size[original array], with value = True/False
function checkEqualIn2DArray(arr, val) {
  return arr.map(outer => {
    if (typeof outer === "number") return outer === val
    return outer.map((inner) => {
      if (typeof inner === "number") return inner === val
      return inner.map((num) => {
        return num === val
      })
    })
  })
}

// input: array, number of repeated columns, number of repeated rows
// output: array of size[array.numRow*row, array.numCol*col], with repeats tuples/mini-rrays from original array
function repmat2By2(mat, matShape, repeatColumns, repeatRows) {
  let numberOfColumns = matShape[1] * repeatColumns;
  let numberOfRows = matShape[0] * repeatRows;
  
  let values = Array(numberOfRows).fill(true).map(() => Array.from({length:numberOfColumns}, () => true)) 

  for (let y = 0; y < numberOfRows; y++) {
    for (let x = 0; x < numberOfColumns; x++) {
      values[y][x] = mat[y % matShape[1]][x % matShape[0]]
    }
  }

  return values;
}

// input: array, arrayToBePutIn, position
// output: array[:,:,1] = arrayToBePutIn[:,:] => new array
function assignRepmatAtIndex(arr, mat, pos, isBool) {
  return arr.map((outer, i) => {
    return outer.map((inner, j) => {
      return inner.map((val, k) => {
        if (k === pos) {
          if (isBool) return mat[i][j] ? 1 : 0
          return mat[i][j]
        }
        return val
      })
    })
  })
}

// input: array, position
// output: array[:,:,1]
function getRepmatAtIndex(arr, pos) {
  let tmp = Array(arr.length).fill(0).map(() => Array.from({length:arr[0].length}, () => 0))
  arr.forEach((outer, i) => {
    outer.forEach((inner, j) => {
      tmp[i][j] = arr[i][j][pos]
    })
  })
  return tmp
}

// input: int (type:number)
// output: float (type: string)
function intToFloat(num, decPlaces) { 
  return num + '.' + Array(decPlaces + 1).join('0'); 
}

// input: arrOne, arrTwo, isFloat (is the result interger or float)
// output: array of size[arrOne], with value = arrOne*arrTwo
function mulEqualSizeArray(arrOne, arrTwo, isFloat) {
  return arrOne.map((outer, idxOut) => {
    return outer.map((inner, idxIn) => {
      return inner.map((val, idx) => {
        if (isFloat) return intToFloat(val*arrTwo[idxOut][idxIn][idx], 1)
        return val*arrTwo[idxOut][idxIn][idx]
      })
    })
  })
}

// input: 
// output: 
function diffAxis2By2(arr) {
  let tmp = Array(1).fill(0).map(() => Array.from({length:2}, () => 0))
  return tmp.map((outer, idxOut) => {
    return outer.map((_, idxIn) => {
      return arr[idxOut+1][idxIn] - arr[idxOut][idxIn]
    })
  })
}

// input: arr
// output: transpose of arr
function transpose(arr) {
  return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]))
}

// input: arr, value to find
// output: array of indexes [x,y] of where arr[x][y] = val
function argwhere(arr, val) {
  arr = [[false, false],[false, true]]
  let whereArr = []
  arr.forEach((outer, idxOut) => {
    outer.forEach((inner, idxIn) => {
      if (inner == val)
        whereArr.push([idxOut, idxIn])
    })
  })
  return whereArr
}

function sumByAxisZero(arr) {
  let sumArr = []
  if (typeof arr[0][0] === "number")
    sumArr =  Array(arr[0].length).fill(0).map(() => 0)
  else 
    sumArr =  Array(arr[0].length).fill(0).map(() => Array.from({length:arr[0][0].length}, () => 0))
  return sumArr.map((outer, idxOut) => {
    if (typeof outer === "number") {
      let sum = 0;
      for (let i = 0; i<arr.length; i++) {
        sum += arr[i][idxOut]
      }
      return sum
    }
    return outer.map((_, idxIn) => {
      let sum = 0
      for (let i = 0; i<arr.length; i++) {
        sum += arr[i][idxOut][idxIn]
      }
      return sum
    })
  })
}

function sumArray(arr) {
  let arrSum = 0;
  arr.forEach(outer => {
    if (typeof outer === "number") {
      arrSum += outer
    } else if (typeof outer === "object") {
      outer.forEach(inner => {
        if (typeof inner === "number") {
          arrSum += inner
        } else if (typeof inner === "object") {
          inner.forEach(val => {
            arrSum += val
          })
        }    
      })
    }
  })
  return arrSum
}

/******************************/
/******* Main Functions *******/
/******************************/
export default function CFAArtifacts() {
  // const { cv, nj } = window
  CFATamperDetection()
}

function CFATamperDetection() {
  const { cv, nj } = window
  
  let src = cv.imread("originalImage");
  let imgPxArray = Array(src.rows).fill(0).map(() => Array.from({length:src.cols}, () => 0)) //Initial Coefficients
  let std_thresh = 5
  let depth = 4

  /* Init array (w, h, 3) - RGB */ 
  for (let i = 0; i < src.rows; i++) {
    for (let j = 0; j < src.cols; j++) {
      let pixel = src.ucharPtr(i, j)
      let R = pixel[0]
      let G = pixel[1]
      let B = pixel[2]
      imgPxArray[i][j] = [R, G, B]
    }
  }

  let dimOne = getDimensions([...imgPxArray])
  let limitCol = Number(Math.round(Math.floor(dimOne[1]/(2**depth)))*(2**depth))
  let limitRow = Number(Math.round(Math.floor(dimOne[0]/(2**depth)))*(2**depth))
  imgPxArray = imgPxArray.slice(0, limitRow)
  let dimTwo = getDimensions([...imgPxArray])
  
  for (let i=0; i < dimTwo[0]; i++) {
    imgPxArray[i] = imgPxArray[i].slice(0, limitCol)
  }

  let small_cfa_list = nj.ndarray([[[2, 1], [3, 2]], [[2, 3], [1, 2]], [[3, 2], [2, 1]], [[1, 2], [2, 3]]]).data
  let small_cfa_list_shape = nj.array(small_cfa_list).shape; //[row, col]
  let cfa_list = small_cfa_list
  let cfa_list_shape = small_cfa_list_shape

  let w1 = 16
  let dimThree = getDimensions([...imgPxArray])
  let f1_map = null
  let cfa_detected = null

  if (dimThree[0] < w1 | dimThree[1] < w1) {
    f1_map = Array(dimThree[0]).fill(0).map(() => Array.from({length:dimThree[1]}, () => 0))
    cfa_detected = [0,0,0,0]
    return
  }

  let mean_error = Array(small_cfa_list_shape[0]).fill(1).map(() => Array.from({length:1}, () => 1))
  let diffs = []
  let f1_maps = []

  for (let i = 0; i < cfa_list_shape[0]; i++) {
    let bin_filter = Array(dimThree[0]).fill(0).map(() => Array.from({length:dimThree[1]}, () => [0, 0, 0]))
    let proc_im = Array(dimThree[0]).fill(0).map(() => Array.from({length:dimThree[1]}, () => [0, 0, 0, 0, 0, 0]))
    let cfa = cfa_list[i]

    let r = checkEqualIn2DArray(cfa, 1)
    let g = checkEqualIn2DArray(cfa, 2)
    let b = checkEqualIn2DArray(cfa, 3)
    
    let repMatR = repmat2By2(r, getDimensions(r), Math.floor(dimThree[1]/2), Math.floor(dimThree[0]/2))
    let repMatG = repmat2By2(g, getDimensions(r), Math.floor(dimThree[1]/2), Math.floor(dimThree[0]/2))
    let repMatB = repmat2By2(b, getDimensions(r), Math.floor(dimThree[1]/2), Math.floor(dimThree[0]/2))

    bin_filter = assignRepmatAtIndex([...bin_filter], repMatR, 0, true)
    bin_filter = assignRepmatAtIndex([...bin_filter], repMatG, 1, true)
    bin_filter = assignRepmatAtIndex([...bin_filter], repMatB, 2, true)

    let cfa_im = mulEqualSizeArray(imgPxArray, bin_filter, true)
    let bilin_im  = bilinInterolation(cfa_im, bin_filter, cfa)
  }
  
}

function bilinInterolation(cfa_im, bin_filter, cfa) {
  let mask_min = divideByArray(new Array([1, 2, 1], [2, 4, 2], [1, 2, 1]), 4.0)
  let mask_max = divideByArray(new Array([0, 1, 0], [1, 4, 1], [0, 1, 0]), 4.0)
  if (argwhere(diffAxis2By2(cfa), 0).size !== 0 | argwhere(diffAxis2By2(transpose(cfa)), 0).size !== 0) {
    mask_max = multiplyByArray(mask_max, 2.0)
  }
  let mask =  Array(mask_min.length).fill(0).map(() => Array.from({length:mask_min[0].length}, () => Array(3).fill(0)))
  
  mask = assignRepmatAtIndex([...mask], mask_min, 0, false)  
  mask = assignRepmatAtIndex([...mask], mask_min, 1, false)  
  mask = assignRepmatAtIndex([...mask], mask_min, 2, false)  
  
  let sum_bin_filter = sumByAxisZero(sumByAxisZero([...bin_filter]))
  let a = Math.max(...sum_bin_filter)
  let maj = sum_bin_filter.indexOf(a)

  mask = assignRepmatAtIndex([...mask], mask_max, maj, false) 
  
  let cfa_im_shape = getDimensions([...cfa_im])
  let out_im =  Array(cfa_im_shape[0]).fill(0).map(() => Array.from({length:cfa_im_shape[1]}, () => Array(3).fill(0)))

  for (let i = 0; i < 3; i++) {
    let mixed_im = Array(cfa_im_shape[0]).fill(0).map(() => Array.from({length:cfa_im_shape[1]}, () => 0))
    let orig_layer = getRepmatAtIndex([...cfa_im], i) //cfa_im: float => orig_layer: float
    let interp_layer = ''
  }
}