import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import DemoImage from '../../../assets/images/cat-drink.jpg'
import MetaDataContainer from '../../DIFPage/MetaDataContainer'
import FileUploader from "../../../components/FileUploader";

const FrameHolder = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  

  flex-grow: 1;
  justify-content: center;
  align-items: center;

  height: 100%;
  overflow: scroll;
`

const Frame = styled.div`
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  pointer-events: none;
  max-width: 95%;
  border: solid 10px ${colors.neutralbeige};
  border-bottom-color: ${colors.neutralbeige};
  border-left-color: ${colors.lightbeige};
  border-right-color:  ${colors.lightbeige};
  border-top-color: ${colors.neutralbeige};

  border-radius: 2px;

  & canvas {
    display: flex;
  }

  @media (min-width: 768px) {
    max-width: 100%;
  }
`

const FrameOpacity = styled(Frame)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;

  border: none;
`

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
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 450px;
  width: auto;
  height: auto;
`

const ButtonGroup = styled.div`
  position: absolute;
  top: 5px;
  color: ${colors.neongreen};
`

const TextAlert = styled.p`
  position: absolute;
  top: 30px;
  width: 65%;
  text-align: center;
  font-size: 0.6rem;
  line-height: 1rem;
  font-style: italic;

  @media (min-width: 600px) {
    display: none;
  }
`


export default function HomeContent(props) {
  const { cv, nj } = window
  const [metaView, setMetaView] = useState(false)
  const [metaData, setMetaData] = useState()
  const [activeBtn, setActiveBtn] = useState(null)
  const canvasTmp = useRef(null)
  const [{alt, src}, setImg] = useState({
    src: DemoImage,
    alt: 'Upload an Image'
  })
  const [{width, height}, setSize] = useState({
    height: 200,
    width: 200,
  })

  const handleImage = (event) => {
    if (event.target.files[0]) {
      var fr = new FileReader()
      fr.onload = function () {
          document.getElementById("originalImage").src = fr.result
      }
      fr.readAsDataURL(event.target.files[0])
    }
  }

  const getCurrentImage = () => {
    // let img = document.getElementById("originalImage");
    // props.getCurrentImage()
    let img = document.getElementById("originalImage")
    let canvas = document.getElementById("imageCanvas")
    
    if (img.src) {
      let srcMat = cv.imread('originalImage')
      let desMat = srcMat.clone()
      cv.cvtColor(desMat, desMat, cv.COLOR_RGBA2GRAY)
      cv.imshow('imageCanvas', desMat)
      srcMat.delete()
    }
    setSize({
      width: img.width,
      height: img.height
    })
  }

  return (
      <FrameHolder>
        <ButtonGroup>
          <FileUploader cv={cv} handleImage={handleImage} active={true}/>
        </ButtonGroup>
        <TextAlert>
          Please use a larger screen for enhance experience with Geometric Analysis
        </TextAlert>
        <Frame>
          <Image src={DemoImage} onLoad={getCurrentImage} alt={alt} id="originalImage"/>
        </Frame>
        <FrameOpacity style={metaView ? {display: 'none'} : {}}>
            <canvas 
              ref={canvasTmp}
              // width={width}
              // height={height}
              style={{width, height}}
              id="imageCanvas"/>
        </FrameOpacity>
        {/* {
          metaView ? <MetaDataContainer width={width} height={height} metaData={props.metaData}/> : <></>
        } */}
      </FrameHolder>
  )
}
