import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

import SideNav from '../../components/SideNav'
import MethodContainer from './components/MethodContainer'
import HomeContent from './components/HomeContent'

const HomeContainer = styled.div`
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
  height: calc(100vh - 50px);
  padding: 10px 20px;
  @media (min-width: 768px) {
  }
`

export default function Home(props) {
  const [methodIndex, setMethod] = useState(0)

  return (
    <HomeContainer>
      <SideNav {...props}>
        <MethodContainer methodIndex={methodIndex} onChangeMethod={setMethod}/>
      </SideNav>
      <BodyContent>
        <HomeContent/>
      </BodyContent>
    </HomeContainer>
  )
}
