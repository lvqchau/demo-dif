import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import NavItem from './NavItem'

const MethodsBox =styled.div`
  padding: 15px 0;
`

export default function MethodContainer(props) {
  const { methodIndex, onChangeMethod } = props
  const { methods, params } = useSelector(state => state.methods)

  return (
    <MethodsBox>
      {
        methods.map((method, index) => {
          return (
            <NavItem key={`method-${index}`} method={method} params={params[method.id]}/>
          )
        })
      }
    </MethodsBox>
  )
}
