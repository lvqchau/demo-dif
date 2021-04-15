import React from 'react'
import styled from 'styled-components'
import { ReactComponent as UploadIcon } from '../assets/images/upload.svg';
import ButtonText from './ButtonText';
import breakpoints from '../constants/breakpoints'

const Button = styled(ButtonText)`
  font-size: 0.8rem;
`;

function FileUploader(props) {
  const hiddenFileInput = React.useRef(null);
  const { cv, handleImage, active } = props
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    
    let img = document.getElementById("originalImage")
    // let canvas = document.getElementById("imageCanvas")

    img.src = URL.createObjectURL(fileUploaded)
  };

  const getCurrentImage = () => {
    let img = document.getElementById("originalImage")
    let canvas = document.getElementById("imageCanvas")
    if (img.src) {
      URL.revokeObjectURL(img.src);
      let srcMat = cv.imread(img);
      let desMat = srcMat.clone();
      cv.cvtColor(desMat, desMat, cv.COLOR_RGBA2GRAY);
      cv.imshow(canvas, desMat)
      srcMat.delete();
    }
  }

  return (
    <>
      <Button className='active' icon={UploadIcon} onClick={handleClick} size={16}>Upload Image</Button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleImage}
             style={{display:'none'}} 
      /> 
    </>
  );
};

export default FileUploader;