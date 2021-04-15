import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../constants/colors'

import SideNav from '../../components/SideNav'
import MethodContainer from './components/MethodContainer'
import TutorialContent from './components/TutorialContent'


const TutorialContainer = styled.div`
  background-color: ${colors.midpurple};
  display: flex;
  flex-direction: column;
  color: ${colors.grayjean};
  @media (min-width: 768px) {
    flex-direction: row !important;
  }
`

const BodyContent = styled.div`
  width: 100%;
  padding: 10px 20px;
  @media (min-width: 768px) {
  }
`

export default function TutorialPage(props) {
  const [methodIndex, setMethod] = useState(0)
  const { methods, params } = useSelector(state => state.methods)
  
  const checkMethodId = (methodId) => {
    const available = methods.filter(method => method.id === methodId)
    if (available.length === 0) props.history.push('/tutorial')
    else {
      const index = methods.findIndex(method => method.id === methodId)
      if (index !== -1) setMethod(index)
    }
  }

  useEffect(() => {
    checkMethodId(props.match.params.methodId)
  }, [])

  return (
    <TutorialContainer>
      <SideNav {...props}>
        <MethodContainer methodIndex={methodIndex} onChangeMethod={setMethod}/>
      </SideNav>
      <BodyContent>
        <TutorialContent methodIndex={methodIndex}/>
      </BodyContent>
    </TutorialContainer>
  )
}
