import React, { useState, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

import colors from '../../../constants/colors'
import { ReactComponent as AngleIcon } from '../../../assets/icons/angle-down.svg'

const activeClassName = 'tutorial-item-active'

const NavItemContainer = styled.div`
  // margin-bottom: 5px;
`

const ItemTitleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
  padding: 10px 20px;
  font-weight: 500;

  &::before {
    content: "";
    position: absolute;
    height: 0;
    width: 2px;
    background: ${colors.neongreen};
    border-radius: 20px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all .3s ease;
  }
`

const ItemTitle = styled.p`
  color: ${props => props.isOpenItem ? colors.neongreen : colors.grayjean};
  transition: all .4s ease;
  word-break: break-word;
  flex: 1;
`

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;

  &.${activeClassName}:hover,
  &.${activeClassName}:hover button {
    color: ${colors.darkgreen};
  }

  &.${activeClassName} button,
  &:hover p {
    color: ${colors.neongreen};
  }
  
  &.${activeClassName} svg, &:hover svg {
    fill: ${colors.neongreen};
  }

  &.${activeClassName}:hover svg {
    fill: ${colors.darkgreen};
  }

  &.${activeClassName} ${ItemTitleContainer}::before,
  &:hover ${ItemTitleContainer}::before {
    height: 100%;
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
