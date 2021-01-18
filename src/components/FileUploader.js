import React from 'react'
import styled from 'styled-components'
import { ReactComponent as UploadIcon } from '../assets/images/upload.svg';
import ButtonText from './ButtonText';
import breakpoints from '../constants/breakpoints'

const Button = styled(ButtonText)`
  @media (min-width: ${breakpoints.m}) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  } 
`;

function FileUploader(props) {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    
  };

  return (
    <>
      <Button icon={UploadIcon} onClick={handleClick} size={18}>Upload Image</Button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
    </>
  );
};

export default FileUploader;