import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'

const Button = styled.button`
  display: flex;
  align-items: center;  
  height: fit-content;
  width: fit-content;
  
  font-size: 1rem;
  color: ${colors.graypurple};
  
  transition: color .4s ease;
  & svg {
    fill: ${colors.graypurple};

    margin-right: 5px;
    position: relative;
    top: 50%;
    transform: translateY(-25%);

    transition: all .4s;
  }
  &.active, &:hover {
    color: ${colors.orange};
  }
  &.active svg, &:hover svg {
    fill: ${colors.orange};
  }
`

export default function ButtonText(props) {
  const { className, icon, size, children, onClick, style } = props
  let Icon
  if (icon) Icon = icon

  return (
    <Button className={className} onClick={onClick} style={{...style}}>
      {
        icon ?  <Icon width={size} height={size} /> : <></>
      }
      { children ? <span style={{verticalAlign: 'middle'}}>{children}</span> : <></>}
    </Button>
  )
}
