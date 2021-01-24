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
  background: ${colors.purple};
  color: ${colors.white};
  
  transition: all .4s;
  & svg {
    fill: ${colors.white};
    
    margin-right: 5px;
    position: relative;
    top: 50%;
    transform: translateY(-25%);

    transition: all .4s;
  }
  &.active, &:hover {
    background: ${colors.orange};
  }
`

export default function ButtonFilled(props) {
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
