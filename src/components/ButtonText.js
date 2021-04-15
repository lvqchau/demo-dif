import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'
import {NavLink} from 'react-router-dom'

const Button = styled.button`
  display: flex;
  align-items: center;  
  height: fit-content;
  width: fit-content;
  
  font-size: 1rem;
  color: ${colors.grayjean};
  
  transition: color .4s ease;
  & svg {
    fill: ${colors.grayjean};

    position: relative;

    transition: all .4s;
  }
  & span {
    transition: all .4s;
  }
  &.active, &:hover {
    color: ${colors.neongreen};
  }
  &.active svg, &:hover svg {
    fill: ${colors.neongreen};
  }
  &.active:hover svg {
    fill: ${colors.darkgreen};
  }
  &:hover span {
    color: ${colors.darkgreen};
  }
`

const activeClassName = 'nav-item-active'

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

export default function ButtonText(props) {
  const { className, icon, size, children, onClick, style, to } = props
  let Icon
  if (icon) Icon = icon

  return (
    <>
      {
        to ? 
        <StyledLink exact={to === '/tutorial' ? false : true} to={to}>
          <Button className={className} onClick={onClick} style={{...style}}>
          {
            icon ?  <Icon width={size} height={size} /> : <></>
          }
          { children ? <span style={{verticalAlign: 'middle', marginLeft: 5}}>{children}</span> : <></>}
          </Button>
        </StyledLink>
        :
        <Button className={className} onClick={onClick} style={{...style}}>
        {
          icon ?  <Icon width={size} height={size} /> : <></>
        }
        { children ? <span style={{verticalAlign: 'middle', marginLeft: 5}}>{children}</span> : <></>}
        </Button>
      }
    </>
  )
}
