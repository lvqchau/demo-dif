import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'

import { ReactComponent as AngleIcon } from '../../../assets/icons/angle-down.svg'
import colors from '../../../constants/colors'

const NavItemContainer = styled.div`
  margin-bottom: 5px;
`

const ItemTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  position: relative;
  padding: 0px 20px;
  // line-height: 2rem;
  font-weight: 500;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    // background: ${colors.neongreen};
    background: ${props => props.$isOpenItem ? `${colors.neongreen}` : `${colors.grayjean}`};
    border-radius: 20px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all .3s ease;
  }

  @media (min-width: 768px) {
    padding: 0px 20px;  
  }
`

const ItemTitle = styled.p`
  color: ${props => props.$isOpenItem ? colors.neongreen : colors.grayjean};
  word-break: break-word;
  transition: all .8s ease;
  flex: 1;
`

const ParamsContainer = styled.div`
  max-height: ${props => props.$isOpenItem ? "600px" : "0"};
  overflow: hidden;
  margin-bottom: 15px;
  transition: max-height 1.2s ease;
`

const ParamsBox = styled.div`
  padding: 0px 15px 0px 30px;
`

const StyledAngle = styled(AngleIcon)`
  transform: ${props => props.$isOpenItem ? "rotate(-180deg)" : "rotate(0deg)"};
  transition: all .4s ease;
`

export default function NavItem(props) {
  const { method, params } = props
  const [isOpenItem, setOpenItem] = useState(false)

  const handleOpenItem = () => {
    setOpenItem(!isOpenItem)
  }

  return (
    <NavItemContainer>
      <ItemTitleContainer onClick={handleOpenItem} $isOpenItem={isOpenItem}>
        <ItemTitle $isOpenItem={isOpenItem}>{method.name}</ItemTitle>
        <StyledAngle $isOpenItem={isOpenItem} width={10} height={10}/>
      </ItemTitleContainer>
      <ParamsContainer $isOpenItem={isOpenItem}>
        <ParamsBox>
        {
          Object.keys(params).map(key => {
            return (
              <Fragment key={`${method.id}-${key}`}>
                
                {
                  typeof params[key] === 'object' ?
                  <p style={{margin: '10px 0'}}>{key}</p>
                  :
                  <p style={{margin: '10px 0'}}>{key}-{params[key]}</p> 
                }
                
              </Fragment>
            )
          })
        }
        </ParamsBox>
      </ParamsContainer>
    </NavItemContainer>
  )
}
