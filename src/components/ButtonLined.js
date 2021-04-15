import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 10px 0 10px;
  height: fit-content;
  width: fit-content;

  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${colors.purple};
  color: ${colors.purple};
  
  transition: color .4s ease, border .4s ease;
  & svg {
    fill: ${colors.purple};
    
    position: relative;
    
    transition: all .4s;
  }
  &.active, &:hover {
    color: ${colors.orange};
    border-color: ${colors.orange};
  }
  &.active svg, &:hover svg {
    fill: ${colors.orange};
  }
`

export default function ButtonLined(props) {
  const { className, icon, size, children, onClick, style } = props
  let Icon
  if (icon) Icon = icon

  return (
    <Button className={className} onClick={onClick} style={{...style}}>
      {
        icon ? <Icon width={size} height={size} /> : <></>
      }
      { children ? <span style={{verticalAlign: 'middle', marginLeft: 5}}>{children}</span> : <></>}
    </Button>
  )
}
