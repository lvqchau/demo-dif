import React, { useEffect } from 'react'
import styled from 'styled-components'
import data from '../data'

const IntroContainer = styled.div``

const ParamsContainer = styled.div``

const DescriptionContainer = styled.div``

const VideoContainer = styled.div``

const InstructionContainer = styled.div``

const IntructionTitle = styled.div``

const IntructionDetails = styled.div``

export default function TutorialContent(props) {
  const { methodIndex } = props
  useEffect(() => {
    Object.keys(data[0]).map(key => {
      console.log(key, data[0][key])
    })
  }, [])

  return (
    <div>
      <IntroContainer>
        <ParamsContainer></ParamsContainer>
        <DescriptionContainer></DescriptionContainer>
      </IntroContainer>
      <VideoContainer></VideoContainer>
      <InstructionContainer>
        <IntructionTitle></IntructionTitle>
        <IntructionDetails>
        {data[methodIndex].name}
        </IntructionDetails>
      </InstructionContainer>
    </div>
  )
}
