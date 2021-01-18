import React, { Fragment, useState, useEffect, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'

import { ReactComponent as PointIcon } from '../../assets/images/aim.svg';
import { ReactComponent as AreaIcon } from '../../assets/images/crop.svg';

import { ReactComponent as DownloadIcon } from '../../assets/images/download.svg';
import { ReactComponent as InfoIcon } from '../../assets/images/info.svg';
import colors from '../../constants/colors'
import ButtonText from '../../components/ButtonText'
import FileUploader from '../../components/FileUploader';
import DemoImage from '../../assets/images/demo.jpg'

const OutputContainer = styled.div`
  background: ${colors.neutralblue};
  border-radius: 6px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 70%;

  min-height: 400px;
  // max-height: 480px;
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
  padding: 10px 10px 5px 10px;
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
  // box-shadow: 0 0 5px 0 rgba(0, 0, 0, .25) inset, 0 5px 10px 5px rgba(0, 0, 0, .25);

  & canvas {
    display: flex;
  }
`

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`

export default function FileContainer(props) {
  const [activeBtn, setActiveBtn] = useState(null)
  const { cv, nj } = props
  const canvasTmp = useRef(null);
  const [{alt, src}, setImg] = useState({
    src: DemoImage,
    alt: 'Upload an Image'
  });
  const [{width, height}, setSize] = useState({
    height: 200,
    width: 200,
  });

  const onActiveBtn = (idx) => {
    activeBtn === idx ? setActiveBtn(null) : setActiveBtn(idx)
  }

  const handleImage = (event) => {
    // if (event.target.files[0]) {
    //   // setImg({
    //   //   src: URL.createObjectURL(event.target.files[0]),
    //   //   alt: event.target.files[0].name
    //   // }); 

    //   // const fileUploaded = event.target.files[0];
    
    //   let img = document.getElementById("originalImage")
    //   let canvas = document.getElementById("imageCanvas")
    //   setSize({
    //     width: img.width,
    //     height: img.height
    //   })
    //   // img.src = URL.createObjectURL(fileUploaded)
    // }
  }

  const getCurrentImage = () => {
    let img = document.getElementById("originalImage")
    let canvas = document.getElementById("imageCanvas")
    // const context = canvasTmp.current.getContext('2d');

    // let srcMat = cv.imread(img);
    // let desMat = srcMat.clone();
    // cv.cvtColor(desMat, desMat, cv.COLOR_RGBA2GRAY);
    // // cv.imshow(context, desMat)

    if (img.src) {
      setSize({
        width: img.naturalWidth,
        height: img.naturalHeight
      })
      canvas.width = width
      canvas.height = height
      let srcMat = cv.imread('originalImage');
      let desMat = srcMat.clone();
      cv.cvtColor(desMat, desMat, cv.COLOR_RGBA2GRAY);
      cv.imshow('imageCanvas', desMat)
      
      
      let ctx = canvas.getContext("2d");
      let imgWidth = img.naturalWidth;
      let imgHeight = img.naturalHeight;
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
      
      // URL.revokeObjectURL(img.src);
      srcMat.delete();
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
            <Image src={DemoImage} onLoad={getCurrentImage} alt={alt} id="originalImage"/>
          </Frame>
          <Frame>
            <canvas 
            ref={canvasTmp}
            style={{maxWidth: '100%', maxHeight: '100%'}}
            id="imageCanvas"></canvas>
          </Frame>
      </FrameHolder>
    </OutputContainer>
  )
}
