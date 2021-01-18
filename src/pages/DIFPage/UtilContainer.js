import React, { useState } from 'react'
import styled from 'styled-components'
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

const CarouselItem = styled.button`
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
    onClick: CircleDetection
  },
  {
    name: 'Chromatic Abbreation',
    onClick: CFAArtifacts
  },
  {
    name: 'Error Level Analysis',
    onClick: CFAArtifacts
  },
  {
    name: 'Error Level Analysis',
    onClick: CFAArtifacts
  },
  {
    name: 'Noise Inconsistencies',
    onClick: CFAArtifacts
  },
  {
    name: 'Noise residues',
    onClick: CFAArtifacts
  },
  {
    name: 'Lens Disortion',
    onClick: CFAArtifacts
  }
]

export default function UtilContainer() {
  const [curBtn, setBtn] = useState(0);

  return (
    <UtilityContainer>
      <UtilCarousel>
        <CarouselNav></CarouselNav>
        <CarouselContent>
          {
            functionNames.map((item, index) => 
              <CarouselItem key={`carousel-functionalities-${index}`} className={index === curBtn ? 'active' : ''} onClick={() => {
                setBtn(index)
                item.onClick()
              }}>
                <p>{item.name}</p>
              </CarouselItem>
          )}
        </CarouselContent>
      </UtilCarousel>
    </UtilityContainer>
  )
}
