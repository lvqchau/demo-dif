import React, { useEffect } from 'react'
import styled from 'styled-components'
import data from '../data'

import { ReactComponent as YoutubeIcon } from '../../../assets/icons/youtube.svg'
import colors from '../../../constants/colors'

const Container = styled.div`
  & h4 {
    font-weight: 500;
  }
  & p {
    color: white;
    line-height: 1.5rem;
  }
`

const IntroContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 10px;
  & h4 {
    font-size: 1.5rem;
    color: ${colors.neongreen};
  }
`

const ParamsContainer = styled.div`
  margin-bottom: 10px;
`

const DescriptionContainer = styled.div`
  margin-bottom: 10px;
`

const VideoContainer = styled.div`
  margin-bottom: 10px;
`

const VideoTitleContainer = styled.div`
  display: flex;
  // align-items: center;
  & h4 {
    margin-right: 10px;
  }
  & svg {
    margin-top: 4px;
  }
`

const InstructionContainer = styled.div``

const InstructionTitle = styled.div`
  margin-bottom: 10px;
  & h4 {
    font-size: 1.5rem;
  }
`

const InstructionDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

const InstructionDetail = styled.div`
  margin-bottom: 10px;
  & h4 {
    font-size: 1.3rem;
    color: ${colors.neongreen}
  }
`

export default function TutorialContent(props) {
  const { methodIndex } = props
  useEffect(() => {
    Object.keys(data[0]).map(key => {
      console.log(key, data[0][key])
    })
  }, [])

  return (
    <Container>
      <IntroContainer>
        <ParamsContainer>BoxParam</ParamsContainer>
        <DescriptionContainer>
          <h4>{data[methodIndex].name}</h4>
          <p>{data[0].desc}</p>
        </DescriptionContainer>
      </IntroContainer>

      <VideoContainer>
        <VideoTitleContainer>
          <h4>Demo Video</h4>
          <YoutubeIcon width={18} height={18} />
        </VideoTitleContainer>
        <iframe width="auto" height="auto" src={data[0].url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </VideoContainer>

      <InstructionContainer>
        <InstructionTitle>
          <h4>Instructions</h4>
          <p>{data[0].instructions.desc}</p>
        </InstructionTitle>

        <InstructionDetails>
          {data[0].instructions.details.map(instruc => {
            return (
              <InstructionDetail>
                <h4>{instruc.name}</h4>
                <p>{instruc.desc}</p>
              </InstructionDetail>
            )
          })}
        </InstructionDetails>
      </InstructionContainer>
    </Container>
  )
}
