class Numjs {
  constructor() {}
  getDimensions(arr) {
    //[row, col]
    return [
      arr.length, //row
      arr.reduce((x, y) => Math.max(x, y.length), 0), //col
    ]
  }

  zeros(row, col, inner=null) {
    if (!inner)
      return Array(row).fill(0).map(() => Array.from({length:col}, () => 0))
    return Array(row).fill(0).map(() => Array.from({length:col}, () => Array(inner).fill(0)))
  }

  ones(row, col, inner=null) {
    if (!inner)
      return Array(row).fill(1).map(() => Array.from({length:col}, () => 1))
    return Array(row).fill(1).map(() => Array.from({length:col}, () => Array(inner).fill(1)))
  }

  roundValue(val, type="normal") {
    switch (type) {
      case 'up': return Math.ceil(val)
      case 'down': return Math.floor(val)
      case 'round': 
        let integer = Math.floor(val)
        let decimal = val - integer
        if (integer % 2 === 0 && decimal === .5)
          return integer
        else if (integer % 2 !== 0 && decimal === .5)
          return integer+1
      default: return Math.round(val)
    }
  }

  round(arr, type="normal") {
    //normal, up, down, round
    //normal: to the closest number, if .5 round up
    //round: to the closest number, if .5 and odd round up, if .5 and even round down

    return arr.map(outer => {
      if (typeof outer === 'number') return this.roundValue(outer, type)
      return outer.map(inner => {
        if (typeof inner === 'number') return this.roundValue(inner, type)
        return inner.map(val => {
          return this.roundValue(val, type)
        })
      })
    })
  }

  divideByArray(arr, divider) {
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
  
  multiplyByArray(arr, mul) {
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
  
  checkEqualIn2DArray(arr, val) {
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
  
  repmat2By2(mat, matShape, repeatColumns, repeatRows) {
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
  
  assignRowAtColIndex(arr, mat, pos, isBool=false) {
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

  assignColumnAtColIndex(arr, mat, pos1, pos2, isBool=false) {
    return arr.map((outer, i) => {
      return outer.map((inner, j) => {
        if (typeof inner === 'number') {
          if (j === pos1) {
            if (isBool) return mat[i][pos2] ? 1 : 0
            return mat[i][pos2]
          }
          return inner
        }
        return inner.map((val, k) => {
          // console.log(inner)
          if (k === pos1) {
            if (isBool) return mat[i][j][pos2] ? 1 : 0
            return mat[i][j][pos2]
          }
          return val
        })
      })
    })
  }
  
  getRepmatAtIndex(arr, pos) {
    let tmp = Array(arr.length).fill(0).map(() => Array.from({length:arr[0].length}, () => 0))
    arr.forEach((outer, i) => {
      outer.forEach((inner, j) => {
        tmp[i][j] = arr[i][j][pos]
      })
    })
    return tmp
  }
  
  intToFloat(num, decPlaces) { 
    return num + '.' + Array(decPlaces + 1).join('0'); 
  }
  
  mulEqualSizeArray(arrOne, arrTwo) {
    return arrOne.map((outer, idxOut) => {
      return outer.map((inner, idxIn) => {
        return inner.map((val, idx) => {
          return this.intToFloat(val*arrTwo[idxOut][idxIn][idx], 1)
        })
      })
    })
  }
  
  diffAxis2By2(arr) {
    let tmp = Array(1).fill(0).map(() => Array.from({length:2}, () => 0))
    return tmp.map((outer, idxOut) => {
      return outer.map((_, idxIn) => {
        return arr[idxOut+1][idxIn] - arr[idxOut][idxIn]
      })
    })
  }
  
  transpose(arr) {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]))
  }
  
  argwhere(arr, val) {
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
  
  sumByAxisZero(arr) {
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
  
  sumArray(arr) {
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

  correlate(originalLayer, kernel) {
    const dim = this.getDimensions([...originalLayer])
    let interpolatedLayer = Array(dim[0]).fill(0).map(() => Array.from({length:dim[1]}, () => 0))

    for (let x = 0; x < dim[0]; ++x) {
      for (let y = 0; y < dim[1]; ++y) {
        let sum = 0;
        for (let i = 0; i < 3; ++i) {
          for (let j = 0; j < 3; ++j) {
            if (!originalLayer[x-1+i] || !originalLayer[x-1+i][y-1+j]) 
              sum += 0
            else 
              sum += kernel[i][j]*parseFloat([...originalLayer][x-1+i][y-1+j])
          }
        }
        interpolatedLayer[x][y] = sum
      }
    }

    return interpolatedLayer
  }
}

export default Numjs