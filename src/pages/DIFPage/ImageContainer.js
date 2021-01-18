import React from 'react'
import styled from 'styled-components'
import VerticalImage from '../../assets/images/vertical-img.png'
import HorizontalImage from '../../assets/images/horizontal-img.png'
import colors from '../../constants/colors'


const FrameHolder = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 10px 0 10px;
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

export default function ImageContainer() {
  return (
    <FrameHolder>
      <Frame>
            {/* <canvas id="imageCanvas"></canvas> */}
            <Image src={HorizontalImage} id="originalImage"/>
        </Frame>
        <Frame>
            {/* <Image src={HorizontalImage}/> */}
            {/* <Image src={VerticalImage}/> */}
            <canvas id="imageCanvas"></canvas>
        </Frame>
    </FrameHolder>
  )
}
