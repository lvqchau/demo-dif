import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as PointIcon } from '../../assets/images/aim.svg';
import { ReactComponent as AreaIcon } from '../../assets/images/crop (1).svg';

import { ReactComponent as DownloadIcon } from '../../assets/images/download.svg';
import { ReactComponent as InfoIcon } from '../../assets/images/info.svg';
import colors from '../../constants/colors'
import ButtonText from '../../components/ButtonText'
import FileUploader from '../../components/FileUploader';
import HorizontalImage from '../../assets/images/horizontal-img.png'

const OutputContainer = styled.div`
  background: ${colors.neutralblue};
  border-radius: 6px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 70%;

  min-height: 400px;
  max-height: 480px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`

const FrameHolder = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 5px 0 5px;
  flex-grow: 1;

  justify-content: space-evenly;
  align-items: center;

  height: 100%;
  overflow: hidden;
`

const Frame = styled.div`
  width: fit-content;
  height: fit-content;
  max-width: 45%;
  pointer-events: none;
  border: solid 10px ${colors.neutralbeige};
  border-bottom-color: ${colors.neutralbeige};
  border-left-color: ${colors.lightbeige};
  border-right-color:  ${colors.lightbeige};
  border-top-color: ${colors.neutralbeige};

  border-radius: 2px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .25) inset, 0 5px 10px 5px rgba(0, 0, 0, .25);
`

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 350px;
  width: auto;
  height: auto;
`

export default function FileContainer(props) {
  const [activeBtn, setActiveBtn] = useState(null)
  const [{alt, src}, setImg] = useState({
    src: HorizontalImage,
    alt: 'Upload an Image'
  });
  const [{width, height}, setSize] = useState({
    height: src.height,
    width: src.width,
  });
  const { cv } = props

  const onActiveBtn = (idx) => {
    activeBtn === idx ? setActiveBtn(null) : setActiveBtn(idx)
  }

  const handleImage = (event) => {
    console.log(width, height)
    if (event.target.files[0]) {
      setImg({
        src: URL.createObjectURL(event.target.files[0]),
        alt: event.target.files[0].name
      }); 
      const fileUploaded = event.target.files[0];
    
      let img = document.getElementById("originalImage")
      let canvas = document.getElementById("imageCanvas")
      
      img.src = URL.createObjectURL(fileUploaded)
      
      if (img.src) {
        setSize({
          height: img.naturalHeight,
          width: img.naturalWidth
        })
        console.log(img)
        let tmp = cv.Mat
        let srcMat = cv.imread(img);
        let desMat = srcMat.clone();
        cv.cvtColor(desMat, desMat, cv.COLOR_RGBA2GRAY);
        cv.imshow('imageCanvas', srcMat)

        console.log(srcMat.cols)
        URL.revokeObjectURL(img.src);
        
        
        
        srcMat.delete();
      }
    }
    
  }

  return (
    <OutputContainer>
      <ButtonGroup style={{position: 'relative'}}>
        <ButtonGroup>
          <ButtonText className={activeBtn === 0 ? 'active' : ''} onClick={() => onActiveBtn(0)} style={{marginRight: 10}} icon={PointIcon} size={18}>Select point</ButtonText>
          <ButtonText className={activeBtn === 1 ? 'active' : ''} onClick={() => onActiveBtn(1)} icon={AreaIcon} size={18}>Select area</ButtonText>
        </ButtonGroup>
        <FileUploader cv={cv} handleImage={handleImage}/>
        <ButtonGroup>
          <ButtonText style={{marginRight: 10}} icon={DownloadIcon} size={18}/>
          <ButtonText icon={InfoIcon} size={16}/>
        </ButtonGroup>
      </ButtonGroup>

      <FrameHolder>
        <Frame>
            <Image src={src} alt={alt} id="originalImage"/>
          </Frame>
          <Frame>
            <canvas width="200" height="200" id="imageCanvas"></canvas>
          </Frame>
      </FrameHolder>
    </OutputContainer>
  )
}
