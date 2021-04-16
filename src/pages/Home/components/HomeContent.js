import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../../constants/colors'
import DemoImage from '../../../assets/images/cat-drink.jpg'
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
  border: solid 10px #fff;
  // border-bottom-color: ${colors.neutralbeige};
  // border-left-color: ${colors.lightbeige};
  // border-right-color:  ${colors.lightbeige};
  // border-top-color: ${colors.neutralbeige};

  border-radius: 4px;

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

const Image = styled.img`
  display: block;
  max-width: 100%;
  width: auto;
  height: auto;

  max-height: calc(100vh - 96px);

  @media (min-height: 550px) {
    max-height: 450px;
  }
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
  const { cv } = window
  const [metaView, setMetaView] = useState(false)
  const canvasTmp = useRef(null)
  const [{width, height}, setSize] = useState({
    height: 200,
    width: 200,
  })

  useEffect(() => {
    function handleResize() {
      let img = document.getElementById("originalImage")

      document.getElementById('imageCanvas').style.height = img.height
      document.getElementById('imageCanvas').style.width = img.width
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  },[])

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
    let img = document.getElementById("originalImage")
    
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
          <Image src={DemoImage} onLoad={getCurrentImage} alt='dif-image' id="originalImage"/>
        </Frame>
        <FrameOpacity style={metaView ? {display: 'none'} : {}}>
            <canvas 
              ref={canvasTmp}
              style={{width, height}}
              id="imageCanvas"/>
        </FrameOpacity>
        {/* {
          metaView ? <MetaDataContainer width={width} height={height} metaData={props.metaData}/> : <></>
        } */}
      </FrameHolder>
  )
}
