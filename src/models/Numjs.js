class Numjs {
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

  arithmeticOp(numOne, numTwo, type="add") {
    switch (type) {
      case "sub": return numOne-numTwo
      case "mul": return numOne*numTwo
      case "div": return numOne/numTwo ? numOne/numTwo : 0
      default: return numOne+numTwo
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

  absolute(arr) {
    return arr.map(outer => {
      if (typeof outer === 'number') return Math.abs(outer)
      return outer.map(inner => {
        if (typeof inner === 'number') return Math.abs(inner)
        return inner.map(val => {
          return Math.abs(val)
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
  
  repmat2By2(mat, matShape, repeatRows, repeatColumns) {
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
    //1d
    //2d
    if (typeof arr[0][0] === 'number') {
      return arr.map((outer, i) => {
        return outer.map((inner, j) => {
            if (j === pos1) {
              if (isBool) return mat[i][pos2] ? 1 : 0
              return mat[i][pos2]
            }
            return inner
        })
      })
    }
    //3d
    if (typeof arr[0][0][0] === 'number') {
      return arr.map((outer, i) => {
        return outer.map((inner, j) => {
          return inner.map((val, k) => {
            if (k === pos1) {
              if (isBool) return mat[i][j][pos2] ? 1 : 0
              return mat[i][j][pos2]
            }
            return val
          })
        })
      })
    }
  }
  
  getRepmatAtIndex(arr, pos) {
    let tmp = this.zeros(arr.length, arr[0].length)
    // let tmp = Array(arr.length).fill(0).map(() => Array.from({length:arr[0].length}, () => 0))
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
  
  arithmeticEqualSizeArray(arrOne, arrTwo, type='add') {
    return arrOne.map((outer, idxOut) => {
      if (typeof outer === 'number') return this.arithmeticOp(arrOne[idxOut], arrTwo[idxOut], type)
      return outer.map((inner, idxIn) => {
        if (typeof inner === 'number') return this.arithmeticOp(arrOne[idxOut][idxIn], arrTwo[idxOut][idxIn], type)
        return inner.map((val, idx) => {
          return this.arithmeticOp(val, arrTwo[idxOut][idxIn][idx], type)
        })
      })
    })
  }

  power(arr, val) {
    if (typeof val !== 'number') {
      return arr.map((outer, idxOut) => {
        if (typeof outer === 'number') return outer**val[idxOut]
        return outer.map((inner, idxIn) => {
          if (typeof inner === 'number') return inner**val[idxOut][idxIn]
          return inner.map((val, idx) => {
            return inner**val[idxOut][idxIn][idx]
          })
        })
      })
    }
    return arr.map(outer => {
      if (typeof outer === 'number') return outer**val
      return outer.map(inner => {
        if (typeof inner === 'number') return inner**val
        return inner.map(val => {
          return inner**val
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
  
  argwhere(arr, val, type='eq') {
    //eq: arr === val
    //lte: arr <= val
    //gte: arr >= val
    //gt: arr > val
    //lt: arr < val
    //val: array or number or boolean
    let whereArr = []
    if (typeof val !== 'object') {
      switch (type) {
        case 'lte':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer <= val)
                whereArr.push([idxOut])
            }
            outer.forEach((inner, idxIn) => {
              if (inner <= val)
                whereArr.push([idxOut, idxIn])
            })
          })
          break;
        case 'gte':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer >= val)
                whereArr.push([idxOut])
            }
            outer.forEach((inner, idxIn) => {
              if (inner >= val)
                whereArr.push([idxOut, idxIn])
            })
          })
          break;
        case 'gt':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer > val)
                whereArr.push([idxOut])
            }
            outer.forEach((inner, idxIn) => {
              if (inner > val)
                whereArr.push([idxOut, idxIn])
            })
          })
          break;
        case 'lt':
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer < val)
                whereArr.push([idxOut])
            }
            outer.forEach((inner, idxIn) => {
              if (inner < val)
                whereArr.push([idxOut, idxIn])
            })
          })
          break;
        default:
          arr.forEach((outer, idxOut) => {
            if (typeof outer === 'number') {
              if (outer === val)
                whereArr.push([idxOut])
            }
            outer.forEach((inner, idxIn) => {
              if (inner === val)
                whereArr.push([idxOut, idxIn])
            })
          })
          break;
      }
    } else {
      console.log("val is array")
    }
    
    return whereArr
  }

  compare(arr, val, type='eq') {
    //eq: arr === val
    //lte: arr <= val
    //gte: arr >= val
    //gt: arr > val
    //lt: arr < val
    //val: array or number or boolean

    if (typeof val !== 'object') {
      switch (type) {
        case 'lte':
          return arr.map(outer => {
            if (typeof outer === 'number') {
              if (outer <= val)
                return true
              return false
            }
            return outer.map(inner => {
              if (typeof inner === 'number') {
                if (inner <= val)
                  return true
                return false
              }
              return inner.map(innerVal => {
                if (innerVal <= val)
                  return true
                return false
              })
            })
          })
        case 'gte':
          return arr.map(outer => {
            if (typeof outer === 'number') {
              if (outer >= val)
                return true
              return false
            }
            return outer.map(inner => {
              if (typeof inner === 'number') {
                if (inner >= val)
                  return true
                return false
              }
              return inner.map(innerVal => {
                if (innerVal >= val)
                  return true
                return false
              })
            })
          })
        case 'gt':
          return arr.map(outer => {
            if (typeof outer === 'number') {
              if (outer > val)
                return true
              return false
            }
            return outer.map(inner => {
              if (typeof inner === 'number') {
                if (inner > val)
                  return true
                return false
              }
              return inner.map(innerVal => {
                if (innerVal > val)
                  return true
                return false
              })
            })
          })
        case 'lt':
          return arr.map(outer => {
            if (typeof outer === 'number') {
              if (outer < val)
                return true
              return false
            }
            return outer.map(inner => {
              if (typeof inner === 'number') {
                if (inner < val)
                  return true
                return false
              }
              return inner.map(innerVal => {
                if (innerVal < val)
                  return true
                return false
              })
            })
          })
        default:
          return arr.map(outer => {
            if (typeof outer === 'number') {
              if (outer === val)
                return true
              return false
            }
            return outer.map(inner => {
              if (typeof inner === 'number') {
                if (inner === val)
                  return true
                return false
              }
              return inner.map(innerVal => {
                if (innerVal === val)
                  return true
                return false
              })
            })
          })
      }
    } else {
      console.log("val is array")
      return []
    }
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

  sumByAxisOne(arr) {
    let sumArr = Array(arr.length).fill(0).map(() => Array.from({length:arr[0][0].length}, () => 0))

    return sumArr.map((outer, idxOut) => {
      return outer.map((_, idxIn) => {
        let sum = 0;
        for (let i=0; i < arr[0].length; i++) {
          sum += arr[idxOut][i][idxIn]
        }
        return sum
      })
    })
  }

  sumByAxisTwo(arr) {
    let sumArr =  Array(arr.length).fill(0).map(() => Array.from({length:arr[0].length}, () => 0))

    return sumArr.map((outer, idxOut) => {
      return outer.map((_, idxIn) => {
        let sum = 0;
        for (let i=0; i < arr[0][0].length; i++) {
          sum += arr[idxOut][idxIn][i]
        }
        return sum
      })
    })
  }

  sumByAxis(arr, axis = 0) {
    if (axis === 0) return this.sumByAxisZero(arr)
    if (axis === 1) return this.sumByAxisOne(arr)
    if (axis === 2) return this.sumByAxisTwo(arr)
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
    let interpolatedLayer = this.zeros(dim[0],dim[1])

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

  slice(arr, rangeRow, rangeCol=null, rangeInner=null) {
    let tmp = []
    let rowStart, rowEnd, colStart, colEnd, innerStart, innerEnd
    rowStart = rangeRow[0] ? rangeRow[0] : 0
    rowEnd = rangeRow[1] ? rangeRow[1] : arr.length

    tmp = arr.slice(rowStart, rowEnd)

    if (rangeCol) {
      colStart = rangeCol[0] ? rangeCol[0] : 0
      colEnd = rangeCol[1] ? rangeCol[1] : arr[0].length
      tmp = tmp.map(outer => {
        return outer.slice(colStart, colEnd)
      })
    }

    if (rangeInner) {
      innerStart = rangeInner[0] ? rangeInner[0] : 0
      innerEnd = rangeInner[1] ? rangeInner[1] : arr[0][0].length
      tmp = tmp.map(outer => {
        return outer.map(inner => {
          return inner.slice(innerStart, innerEnd)
        })
     })
    }

    return tmp
  }

  equalOneDArray(arrOne, arrTwo, check) {
    let arr = []
    arrOne.forEach((outer, idxOut) => {
      if (typeof outer === 'number') {
        if (arrTwo[idxOut] === check) arr.push(outer)
      }
      outer.forEach((inner, idxIn) => {
        if (typeof inner === 'number') {
          if (arrTwo[idxOut][idxIn] === check) arr.push(inner)
        }
        inner.forEach((val, idx) => {
          if (arrTwo[idxOut][idxIn][idx] === check) arr.push(val)
        })
      })
    })
    return arr
  }

  arithmeticOnArray(arr, num, type="add") {
    //add, sub, mul, div
    return arr.map(outer => {
      if (typeof outer === 'number') return this.arithmeticOp(outer, num, type)
      return outer.map(inner => {
        if (typeof inner === 'number') return this.arithmeticOp(inner, num, type)
        return inner.map(val => {
          return this.arithmeticOp(val, num, type)
        })
      })
    })
  }

  arithmeticArrayOnArray(arrOne, arrTwo, type="add") {
    //add, sub, mul, div
    return arrOne.map((outer, idxOut) => {
      if (typeof outer === 'number') return this.arithmeticOp(outer, arrTwo[idxOut], type)
      return outer.map((inner, idxIn) => {
        if (typeof inner === 'number') return this.arithmeticOp(inner, arrTwo[idxOut][idxIn], type)
        return inner.map((val, idx) => {
          return this.arithmeticOp(val, arrTwo[idxOut][idxIn][idx], type)
        })
      })
    })
  }
}

export default Numjs