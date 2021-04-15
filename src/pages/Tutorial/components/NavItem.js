import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

import colors from '../../../constants/colors'
import { ReactComponent as AngleIcon } from '../../../assets/icons/angle-down.svg'

const activeClassName = 'tutorial-item-active'

const NavItemContainer = styled.div`
  margin-bottom: 15px;
`

const ItemTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  padding: 0 20px;
  line-height: 2rem;
  font-weight: 500;
`

const ItemTitle = styled.p`
  color: ${props => props.isOpenItem ? colors.neongreen : colors.grayjean};
  transition: all .4s ease;
  word-break: break-word;
  flex: 1;
`

const ParamsContainer = styled.div`
  max-height: ${props => props.isOpenItem ? "600px" : "0"};
  overflow: hidden;
  transition: max-height 1.2s ease;
`

const ParamsBox = styled.div`
  padding: 0px 15px 0px 30px;
`

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;

  &.${activeClassName}:hover,
  &.${activeClassName}:hover button {
    color: ${colors.darkgreen};
  }

  &.${activeClassName} button {
    color: ${colors.neongreen};
  }
  
  &.${activeClassName} svg, &:hover svg {
    fill: ${colors.neongreen};
  }

  &.${activeClassName}:hover svg {
    fill: ${colors.darkgreen};
  }

`;

export default function NavItem(props) {
  const { method, params, index, methodIndex, onChangeMethod } = props

  const handleOpenItem = () => {
    onChangeMethod(index)
  }

  return (
    <NavItemContainer>
      <StyledLink exact to={`/tutorial/${method.id}`}>
        <ItemTitleContainer onClick={handleOpenItem}>
          <ItemTitle isOpenItem={index===methodIndex}>{method.name}</ItemTitle>
        </ItemTitleContainer>
      </StyledLink>
    </NavItemContainer>
  )
}
