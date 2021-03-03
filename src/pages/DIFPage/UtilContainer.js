import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonLined from '../../components/ButtonLined'
import ButtonText from '../../components/ButtonText'
import Loader from '../../components/Loader'
import colors from '../../constants/colors'
import CFAArtifacts from '../../utils/CFA'
import CircleDetection from '../../utils/CircleDetection'
import ExifHeader from "../../utils/ExifHeader"
import ErrorLevelAnalysis from "../../utils/ErrorLevelAnalysis"
import MedianNoiseInconsistencies from '../../utils/MedianNoise'
import NoiseInconsistencies from '../../utils/NoiseInconsistencies'

const UtilityContainer = styled.div`
  background: ${colors.neutralblue};
  border-radius: 6px;

  width: 100%;
  // height: fit-content;
  overflow-y: scroll;
  margin-left: 20px;
  padding: 15px 25px;

  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: transparent;
  }
`;

const UtilCarousel = styled.div`
  position: relative;
`;

const CarouselNav = styled.div``;

const CarouselContent = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

const CarouselItem = styled.a`
  cursor: pointer;
  color: ${colors.graypurple};
  font-size: 1rem;
  margin-right: 20px;
  & p {
    display: inline;
    white-space: nowrap;
    transition: all 0.4s;
    color: ${colors.graypurple};
  }
  &.active p,
  &:hover p {
    color: ${colors.orange};
  }
`;

const Input = styled.input`
  width: 100%;
`

const functionNames = [
  {
    name: "Demosaicing Artifacts",
    onClick: CFAArtifacts,
  },
  {
    name: "MetaData Extraction",
    onClick: ExifHeader,
  },
  {
    name: "Error Level Analysis",
    onClick: ErrorLevelAnalysis,
  },
  {
    name: 'Median Noise Inconsistencies',
    onClick: MedianNoiseInconsistencies
  },
  {
    name: 'Noise Inconsistencies',
    onClick: NoiseInconsistencies
  },
  {
    name: 'Lens Disortion',
    onClick: CircleDetection
  }
]

export default function UtilContainer(props) {
  const [curBtn, setBtn] = useState(0)
  const [loader, setLoader] = useState(false)
  const [cfa_w1, setW1] = useState(1)
  const [ela, setELA] = useState({ela_quality: 0.75, ela_scale: 10})

  function setBtnClick(index) {
    props.setMetaView(false);
    switch (index) {
      case 1: props.setMetaView(true);
      default: setBtn(index); break;
    }
  }

  function handleChange(evt) {
    const {name, value} = evt.target
    switch (name) {
      case 'cfa_w1': setW1(value); break;
      case 'ela_quality':
      case 'ela_scale': setELA({...ela, [name]: value}); break;
      default: break;
    }
  }

  async function handleBtnClick(item, index) {
    // await setStateAsync(index);
    let result = null;
    switch (index) {
      case 0: result = await item.onClick(cfa_w1); break;
      case 2: result = await item.onClick(parseFloat(ela.ela_quality), parseFloat(ela.ela_scale)); break;
      case 1: 
        result = await item.onClick(); 
        props.setMetaData(result); 
        break;
      default: result = await item.onClick(); break;
    }
  }

  return (
    <UtilityContainer>
      <UtilCarousel>
        <CarouselNav></CarouselNav>
        <CarouselContent>
          {
            functionNames.map((item, index) =>
              <CarouselItem key={`carousel-functionalities-${index}`} className={index === curBtn ? 'active' : ''} 
                onClick={()=>setBtnClick(index)}
              >
                <p>{item.name}</p>
                <br/>
                
                {curBtn === index ? 
                <>
                  {/* {item.name==='Demosaicing Artifacts' ? <Input placeholder="w1" name="cfa_w1" onChange={handleChange}/> : <></>}
                  {item.name==='Error Level Analysis' ? <>
                    <Input placeholder="quality" name="ela_quality" onChange={handleChange}/>
                    <br/>
                    <Input placeholder="scale" name="ela_scale" onChange={handleChange}/>
                  </> : <></>} */}
                  <ButtonLined onClick={() => handleBtnClick(item, index)}>Go</ButtonLined>
                </>
                 : <></>
                }
              </CarouselItem>
          )}
        </CarouselContent>
        {loader ? <Loader /> : <></>}
      </UtilCarousel>
    </UtilityContainer>
  );
}
