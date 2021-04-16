import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import NavItem from './NavItem'

const MethodsBox =styled.div`
  padding: 15px 0;
  & h1 {
    margin: 20px 0 30px;
    text-align: center;
    font-size: 3rem;
    color: rgb(48 38 110);
    display: none;
  }
  @media (min-width: 768px) {
    & h1 {
      display: block;
    }
  }
`

export default function MethodContainer(props) {
  const { methodIndex, onChangeMethod } = props
  const { methods, params } = useSelector(state => state.methods)

  return (
    <MethodsBox>
      <h1 style={{}}>TUTORIAL</h1>
      {
        methods.map((method, index) => {
          return (
            <NavItem index={index} methodIndex={methodIndex} onChangeMethod={onChangeMethod} key={`method-${index}`} method={method} params={params[method.id]}/>
          )
        })
      }
    </MethodsBox>
  )
}
