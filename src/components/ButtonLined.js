import React from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 10px 0 10px;
  height: fit-content;

  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid ${colors.purple};
  color: ${colors.purple};
  
  transition: color .4s ease, border .4s ease;
  & svg {
    fill: ${colors.purple};
    
    margin-right: 5px;
    position: relative;
    top: 50%;
    transform: translateY(-25%);
    
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
  const Icon = icon

  return (
    <Button className={className} onClick={onClick} style={{...style}}>
      <Icon width={size} height={size} />
      { children ? <>{children}</> : <></>}
    </Button>
  )
}
