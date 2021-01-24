import Numjs from '../models/Numjs'
/******************************/
/******* Main Functions *******/
/******************************/
const njs = new Numjs()

export default async function CFAArtifacts() {
  console.time('Execution Time');
  await CFATamperDetection()
  console.timeEnd('Execution Time');  
  return;
}

async function CFATamperDetection() {
  console.log("Initializing...")
  const { cv } = window  

  let src = cv.imread("originalImage");
  let imgPxArray = njs.zeros(src.rows, src.cols)
  let std_thresh = 5;
  let depth = 4;

  /* Init array (w, h, 3) - RGB */ 
  for (let i = 0; i < src.rows; i++) {
    for (let j = 0; j < src.cols; j++) {
      let pixel = src.ucharPtr(i, j);
      let R = pixel[0];
      let G = pixel[1];
      let B = pixel[2];
      imgPxArray[i][j] = [R, G, B];
    }
  }
  let dimOne = njs.getDimensions([...imgPxArray])
  let limitCol = Number(Math.round(Math.floor(dimOne[1]/(2**depth)))*(2**depth))
  let limitRow = Number(Math.round(Math.floor(dimOne[0]/(2**depth)))*(2**depth))
  imgPxArray = imgPxArray.slice(0, limitRow)
  let dimTwo = njs.getDimensions([...imgPxArray])
  
  for (let i=0; i < dimTwo[0]; i++) {
    imgPxArray[i] = [...imgPxArray][i].slice(0, limitCol)
  }

  let small_cfa_list = new Array([[[2, 1], [3, 2]], [[2, 3], [1, 2]], [[3, 2], [2, 1]], [[1, 2], [2, 3]]]);
  let small_cfa_list_shape = njs.getDimensions([...small_cfa_list]); //[row, col]
  let cfa_list = small_cfa_list
  let cfa_list_shape = small_cfa_list_shape

  let w1 = 16
  let dimThree = njs.getDimensions([...imgPxArray])
  let f1_map = null
  let cfa_detected = null

  if (dimThree[0] < w1 | dimThree[1] < w1) {
    f1_map = njs.zeros(dimThree[0], dimThree[1])
    cfa_detected = [0,0,0,0]
    return;
  }

  let mean_error = njs.ones(small_cfa_list_shape[0], 1)
  let diffs = []
  let f1_maps = []

  for (let i = 0; i < cfa_list_shape[0]; i++) {
    let bin_filter = njs.zeros(dimThree[0], dimThree[1], 3)
    let proc_im = njs.zeros(dimThree[0], dimThree[1], 6)
    let cfa = cfa_list[i];

    let r = njs.checkEqualIn2DArray(cfa, 1)
    let g = njs.checkEqualIn2DArray(cfa, 2)
    let b = njs.checkEqualIn2DArray(cfa, 3)
    
    let repMatR = njs.repmat2By2(r, njs.getDimensions(r), Math.floor(dimThree[1]/2), Math.floor(dimThree[0]/2))
    let repMatG = njs.repmat2By2(g, njs.getDimensions(r), Math.floor(dimThree[1]/2), Math.floor(dimThree[0]/2))
    let repMatB = njs.repmat2By2(b, njs.getDimensions(r), Math.floor(dimThree[1]/2), Math.floor(dimThree[0]/2))

    bin_filter = njs.assignRowAtColIndex([...bin_filter], repMatR, 0, true)
    bin_filter = njs.assignRowAtColIndex([...bin_filter], repMatG, 1, true)
    bin_filter = njs.assignRowAtColIndex([...bin_filter], repMatB, 2, true)

    let cfa_im = njs.mulEqualSizeArray([...imgPxArray], bin_filter);
    let bilin_im  = bilinInterolation([...cfa_im], bin_filter, [...cfa]);

    proc_im = njs.assignColumnAtColIndex([...proc_im], imgPxArray, 0, 0)
    proc_im = njs.assignColumnAtColIndex([...proc_im], imgPxArray, 1, 1)
    proc_im = njs.assignColumnAtColIndex([...proc_im], imgPxArray, 2, 2)
    proc_im = njs.assignColumnAtColIndex([...proc_im], bilin_im, 3, 0)
    proc_im = njs.assignColumnAtColIndex([...proc_im], bilin_im, 4, 1)
    proc_im = njs.assignColumnAtColIndex([...proc_im], bilin_im, 5, 2)
    const proc_im_shape = njs.getDimensions([...proc_im])
    let block_result = njs.zeros(Math.floor(proc_im_shape[0]/w1), Math.floor(proc_im_shape[1]/w1), 6)

    /* After eval_block
    for (let h=0; h < proc_im_shape[0]; h+=w1) {
      if (h + w1 >= proc_im_shape[0]) break;
      for (let k = 0; k < proc_im_shape[1]; k+=w1) {
        if (k + w1 >= proc_im_shape[0]) break;
        //notyet: let out = eval_block(proc_im[h:h+w1, k:k+w1, :])
        //notyet: block_result[h//w1, k//w1, :] = out
      }
    }

    const block_result_shape = njs.getDimensions([...block_result])
    let stds = njs.zeros(block_result_shape[0], block_result_shape[1], 3)
    stds = njs.assignColumnAtColIndex([...stds], block_result, 0, 3)
    stds = njs.assignColumnAtColIndex([...stds], block_result, 1, 4)
    stds = njs.assignColumnAtColIndex([...stds], block_result, 2, 5)
    
    let block_diffs = njs.zeros(block_result_shape[0], block_result_shape[1], 3)
    block_diffs = njs.assignColumnAtColIndex([...block_diffs], block_result, 0, 0)
    block_diffs = njs.assignColumnAtColIndex([...block_diffs], block_result, 1, 1)
    block_diffs = njs.assignColumnAtColIndex([...block_diffs], block_result, 2, 2)

    let non_smooth = njs.zeros(block_result_shape[0], block_result_shape[1], 3)
    //notyet: non_smooth = njs.argwhere(stds, 'smaller', std_thresh)

    let bdnm = block_diffs[non_smooth]
    let bdnm_shape = njs.getDimensions([...bdnm])
    //notyet: mean_error[i] = njs.average(njs.reshape(bdnm, (1, bdnm_shape[0])))

    //notyet: let temp = njs.sumByAxis(block_diffs, 2)
    let rep_mat = njs.zeros(temp.shape[0], temp.shape[1], 3)
    rep_mat = njs.assignRowAtColIndex([...rep_mat], temp, 0)
    rep_mat = njs.assignRowAtColIndex([...rep_mat], temp, 1)
    rep_mat = njs.assignRowAtColIndex([...rep_mat], temp, 2)

    block_diffs = njs.divideByArray(block_diffs, rep_mat)
    //notyet: diffs.append(np.reshape(block_diffs[:, :, 1], (1, block_diffs[:, :, 1].size)))
    //notyet: f1_maps.append(block_diffs[:, :, 1])
    */
  }
  /* After eval_block
  diffs = diffs
  //notyet: diffs = np.reshape(diffs, (diffs.shape[0], diffs.shape[2]))
  const diffs_shape = njs.getDimensions([...diffs])
  for (let h = 0; h < diffs_shape[0]; h++) {
    for (let k = 0; k < diffs_shape[1]; k++) {
      if (Number.isNan(diffs[h, k]))
        diffs[h][k] = 0
    }
  }

  //notyet: let val = np.argmin(mean_error)
  //notyet: let U = njs.sumByAxisZero(njs.absolute(diffs - 0.25))
  const U_shape = njs.getDimensions([...U])
  //notyet: U = njs.reshape(U, (1, U_shape[0]))
  //notyet: let F1 = njs.median(U)

  //notyet: CFADetected = cfa_list[va, :, :] == 2
  //notyet: let F1Map = f1_maps[val, :, :]
  
  console.log('Done!')
  //imshow F1Map
  //cv.imshow('imageCanvas', desMat)
  */
  
  return;
}

function bilinInterolation(cfa_im, bin_filter, cfa) {
  let mask_min = njs.divideByArray(new Array([1, 2, 1], [2, 4, 2], [1, 2, 1]), 4.0);
  let mask_max = njs.divideByArray(new Array([0, 1, 0], [1, 4, 1], [0, 1, 0]), 4.0);
  if (njs.argwhere(njs.diffAxis2By2(cfa), 0).size !== 0 | njs.argwhere(njs.diffAxis2By2(njs.transpose(cfa)), 0).size !== 0) {
    mask_max = njs.multiplyByArray(mask_max, 2.0)
  }
  let mask = njs.zeros(mask_min.length, mask_min[0].length, 3)
  
  mask = njs.assignRowAtColIndex([...mask], mask_min, 0)  
  mask = njs.assignRowAtColIndex([...mask], mask_min, 1)  
  mask = njs.assignRowAtColIndex([...mask], mask_min, 2)  
  
  let sum_bin_filter = njs.sumByAxisZero(njs.sumByAxisZero([...bin_filter]))
  let a = Math.max(...sum_bin_filter)
  let maj = sum_bin_filter.indexOf(a)

  mask = njs.assignRowAtColIndex([...mask], mask_max, maj) 
  
  let cfa_im_shape = njs.getDimensions([...cfa_im])
  let out_im = njs.zeros(cfa_im_shape[0], cfa_im_shape[1], 3)

  const bin_filter_dim = njs.getDimensions([...bin_filter])
  for (let i = 0; i < 3; i++) {
    let mixed_im = njs.zeros(cfa_im_shape[0], cfa_im_shape[1])
    let orig_layer = njs.getRepmatAtIndex([...cfa_im], i) //cfa_im: float => orig_layer: float
    let interp_layer = njs.correlate(orig_layer, njs.getRepmatAtIndex(mask, i));

    for (let k = 0; k < bin_filter_dim[0]; k++) {
      for (let h = 0; h < bin_filter_dim[1]; h++) {
        bin_filter[k][h][i] === 0 ? 
          mixed_im[k][h] = interp_layer[k][h] :
          mixed_im[k][h] = parseFloat(orig_layer[k][h])
      }
    }
    out_im = njs.assignRowAtColIndex(out_im, mixed_im, i)
    out_im = njs.round(out_im, 'round')
  }
  return out_im
}

function eval_block(data) {
  let im = data;
  let Out = njs.zeros(1, 1, 6)
  Out = njs.assignRowAtColIndex([...Out], njs.mean(njs.power(njs.mulEqualSizeArray(njs.getRepmatAtIndex(data, 0), njs.getRepmatAtIndex(data, 3)), 2.0)), 0)
  Out = njs.assignRowAtColIndex([...Out], njs.mean(njs.power(njs.mulEqualSizeArray(njs.getRepmatAtIndex(data, 1), njs.getRepmatAtIndex(data, 4)), 2.0)), 1)
  Out = njs.assignRowAtColIndex([...Out], njs.mean(njs.power(njs.mulEqualSizeArray(njs.getRepmatAtIndex(data, 2), njs.getRepmatAtIndex(data, 5)), 2.0)), 2)

  // Out = njs.assignRowAtColIndex([...Out], njs.std(njs.reshape(
  //   njs.getRepmatAtIndex(im, 0),
  //   (1, njs.getDimensions(njs.getRepmatAtIndex(im, 1))[0], njs.getDimensions(njs.getRepmatAtIndex(im, 1))[1])
  // )), 3)

  // Out = njs.assignRowAtColIndex([...Out], njs.std(njs.reshape(
  //   njs.getRepmatAtIndex(im, 1),
  //   (1, njs.getDimensions(njs.getRepmatAtIndex(im, 2))[0], njs.getDimensions(njs.getRepmatAtIndex(im, 1))[1])
  // )), 4)

  // Out = njs.assignRowAtColIndex([...Out], njs.std(njs.reshape(
  //   njs.getRepmatAtIndex(im, 2),
  //   (1, njs.getDimensions(njs.getRepmatAtIndex(im, 3))[0], njs.getDimensions(njs.getRepmatAtIndex(im, 1))[1])
  // )), 5)

  return Out
}