import React from 'react'
import styled from 'styled-components'
import { ReactComponent as UploadIcon } from '../assets/images/upload.svg';
import ButtonText from './ButtonText';

const Button = styled(ButtonText)`
  font-size: 0.8rem;
`;

function FileUploader(props) {
  const hiddenFileInput = React.useRef(null);
  const { handleImage } = props
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

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