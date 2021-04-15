import React, { useEffect } from 'react'
import styled from 'styled-components'
import data from '../data'

import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { ReactComponent as YoutubeIcon } from '../../../assets/icons/youtube.svg'
import colors from '../../../constants/colors'

const Container = styled.div`
  padding: 20px;
  & h4 {
    font-weight: 500;
    font-size: 1.3rem;
    margin-bottom: 10px;
  }
  & p {
    color: white;
    // line-height: 1.5rem;
  }
`

const IntroContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-bottom: 10px;
  & h4 {
    color: ${colors.neongreen};
  }
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ParamsContainer = styled.div`
  margin-bottom: 10px;
`

const DescriptionContainer = styled.div`
  margin-bottom: 30px;
`

const VideoContainer = styled.div`
  margin-bottom: 30px;
`

const VideoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  & h4 {
    margin-right: 10px;
    margin-bottom: 0px;
  }
`

const InstructionContainer = styled.div``

const InstructionTitle = styled.div`
  margin-bottom: 20px;
`

const InstructionDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px 0;
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const InstructionDetail = styled.div`
  margin-bottom: 10px;
  & h4 {
    color: ${colors.neongreen}
  }
`

export default function TutorialContent(props) {
  const { methodIndex } = props
  const { height, width } = useWindowDimensions()
  const {id, name} = data[methodIndex]
  useEffect(() => {
    Object.keys(data[0]).map(key => {
      // console.log(key, data[0][key])
    })
  }, [])

  useEffect(() => {
    console.log(width)
    document.getElementById('tutorial__container').scrollIntoView(
      width <= 768 ? true : {behavior: 'smooth'}
    )
  }, [methodIndex])

  return (
    <Container id="tutorial__container">
      
      <IntroContainer>
        <ParamsContainer>BoxParam</ParamsContainer>
        <DescriptionContainer>
          <h4>{name}</h4>
          <p>{data[0].desc}</p>
        </DescriptionContainer>
      </IntroContainer>

      <VideoContainer>
        <VideoTitleContainer>
          <h4>Demo Video</h4>
          <YoutubeIcon width={18} height={18} />
        </VideoTitleContainer>
        <iframe width="auto" height="auto" src={data[0].url} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </VideoContainer>

      <InstructionContainer>
        <InstructionTitle>
          <h4>Instructions</h4>
          <p>{data[0].instructions.desc}</p>
        </InstructionTitle>

        <InstructionDetails>
          {data[0].instructions.details.map((instruc, index) => {
            return (
              <InstructionDetail key={`${id}-instruc-${index}`}>
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
