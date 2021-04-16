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

const SelectionContainer = styled.div`
  padding: 0 20px 25px 20px;
  & p {
    margin-bottom: 10px;
  }
  & select {
    width: 80%;
    max-width: 130px;
    padding: 10px 5px;
    border-radius: 7px;
    outline: none;
  }
`

const MethodTypeContainer = styled.div`
  margin-bottom: 50px;
  & h3 {
    padding-left: 20px;
    font-weight: 300;
    color: #D76AFF;
    margin-bottom: 15px;
  }
`

export default function MethodContainer(props) {
  const { methodIndex, onChangeMethod } = props
  const { methods, params } = useSelector(state => state.methods)

  return (
    <MethodsBox>
      <SelectionContainer>
        <p>Select your purpose</p>
        <select>
          <option>General</option>
          <option>Blog</option>
          <option>News</option>
        </select>
      </SelectionContainer>
      <h1>METHODS</h1>
      <MethodTypeContainer>
        <h3>Recommended</h3>
        {
          methods.map((method, index) => {
            return (
              <NavItem key={`method-${index}`} method={method} params={params[method.id]}/>
            )
          })
        }
      </MethodTypeContainer>
      <MethodTypeContainer>
        <h3>Others</h3>
        {
          methods.map((method, index) => {
            return (
              <NavItem key={`method-${index}`} method={method} params={params[method.id]}/>
            )
          })
        }
      </MethodTypeContainer>
    </MethodsBox>
  )
}
