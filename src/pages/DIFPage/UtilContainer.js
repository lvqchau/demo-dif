import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonLined from '../../components/ButtonLined'
import ButtonText from '../../components/ButtonText'
import Loader from '../../components/Loader'
import colors from '../../constants/colors'
import CFAArtifacts from '../../utils/CFA'
import CircleDetection from '../../utils/CircleDetection'

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
`

const UtilCarousel = styled.div`
  position: relative
`

const CarouselNav = styled.div`

`

const CarouselContent = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
`

const CarouselItem = styled.a`
  cursor: pointer;
  color: ${colors.graypurple};
  font-size: 1rem;
  margin-right: 20px;
  & p {
    display: inline;
    white-space: nowrap;
    transition: all .4s;
    color: ${colors.graypurple};
  }
  &.active p, &:hover p {
    color: ${colors.orange};
  }
`

const functionNames = [
  {
    name: 'Demosaicing Artifacts',
    onClick: CFAArtifacts
  },
  {
    name: 'Chromatic Abbreation',
    onClick: CircleDetection
  },
  {
    name: 'Error Level Analysis',
    onClick: CircleDetection
  },
  {
    name: 'Error Level Analysis',
    onClick: CircleDetection
  },
  {
    name: 'Noise Inconsistencies',
    onClick: CircleDetection
  },
  {
    name: 'Noise residues',
    onClick: CircleDetection
  },
  {
    name: 'Lens Disortion',
    onClick: CircleDetection
  }
]

export default function UtilContainer() {
  const [curBtn, setBtn] = useState(0)
  const [loader, setLoader] = useState(false)
  const [w1, setW1] = useState(5)

  function setStateAsync(state) {
    return new Promise((resolve) => {
      setBtn(state, resolve)
    });
  }

  function handleChange(evt) {
    const {value} = evt.target
    setW1(value)
  }

  async function handleBtnClick(item, index) {
    // await setStateAsync(index);
    let result = await item.onClick(w1)
  }

  return (
    <UtilityContainer>
      <UtilCarousel>
        <CarouselNav></CarouselNav>
        <CarouselContent>
          {
            functionNames.map((item, index) =>
              <CarouselItem key={`carousel-functionalities-${index}`} className={index === curBtn ? 'active' : ''} 
                onClick={()=>setBtn(index)}
              >
                <p>{item.name}</p>
                <br/>
                
                {curBtn === index ? 
                <>
                  {item.name==='Demosaicing Artifacts' ? <input placeholder="w1" name="w1" onChange={handleChange}/> : <></>}
                  <ButtonLined onClick={() => handleBtnClick(item, index)}>Go</ButtonLined>
                </>
                 : <></>
                }
              </CarouselItem>
          )}
        </CarouselContent>

        {
          loader ? <Loader/> : <></>
        }
      </UtilCarousel>
    </UtilityContainer>
  )
}
