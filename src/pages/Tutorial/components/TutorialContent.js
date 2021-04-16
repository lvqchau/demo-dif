import React, { useEffect } from 'react'
import styled from 'styled-components'
import data from '../data'

import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { ReactComponent as YoutubeIcon } from '../../../assets/icons/youtube.svg'
import colors from '../../../constants/colors'
import DemoParamBox from '../../../assets/images/demo-box@2x.png'

const Container = styled.div`
  padding: 20px;
  & h4 {
    font-weight: 500;
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: ${colors.neongreen};
  }
  & p {
    color: white;
  }
`

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const ParamsContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;

  @media (min-width: 576px) {
    width: 30%;
    padding-right: 20px;
    min-width: 285px;
  }
`

const DescriptionContainer = styled.div`
  margin-bottom: 30px;
  flex: 1;
`

const VideoContainer = styled.div`
  margin-bottom: 30px;
  
  & iframe {
    width: 100%;
  }

  @media (min-width: 576px) {
    & iframe {
      width: auto;
    }
  }
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

const InstructionContainer = styled.div`
  margin-bottom: 30px;
`

const InstructionTitle = styled.div`
  margin-bottom: 20px;
`

const InstructionDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const InstructionDetail = styled.div`
  margin-bottom: 10px;
  & h4 {
    color: ${colors.grayjean}
  }
  & h4 > span {
    font-size: 0.7em;
    margin-left: 10px;
  }
`

const PitfallDetails = styled.ul`
  margin-left: 40px;
  color: white;
`

const PitfallDetail = styled.li`
  margin-bottom: 5px;
`

export default function TutorialContent(props) {
  const { methodIndex } = props
  const { height, width } = useWindowDimensions()
  const {id, name, desc, url, instructions, pitfalls} = data[methodIndex]
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

  const getNewLine = (str) => {
    if (str.includes('\n')) {
      return str.split('\n').map(item => {
        console.log(item)
        return getItalics(item)
      }) 
    }
    return <p>{str}</p>
  }

  const getItalics = (str) => {
    if (str.includes('/italic')) {
      return <p><em>{str.split('/italic')[1]}</em> </p>
    }
    return <p>{str}</p>
  }

  return (
    <Container id="tutorial__container">
      
      <IntroContainer>
        <ParamsContainer>
          <img src={DemoParamBox} style={{width: '100%'}}/>
        </ParamsContainer>
        <DescriptionContainer>
          <h4>I. {name}</h4>
          <div>{getNewLine(desc)}</div>
        </DescriptionContainer>
      </IntroContainer>

      <VideoContainer>
        <VideoTitleContainer>
          <h4>II. Demo Video</h4>
          <YoutubeIcon width={18} height={18} />
        </VideoTitleContainer>
        <iframe height="auto" src={url} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      </VideoContainer>

      <InstructionContainer>
        <InstructionTitle>
          <h4>III. Instructions</h4>
          <p>{instructions.desc}</p>
        </InstructionTitle>

        <InstructionDetails>
          {instructions.details.map((instruc, index) => {
            return (
              <InstructionDetail key={`${id}-instruc-${index}`}>
                <h4>{instruc.name}{
                 instruc.range ?  <span>{instruc.range}</span> : <></>
                }</h4>
                {getNewLine(instruc.desc)}
              </InstructionDetail>
            )
          })}
        </InstructionDetails>
      </InstructionContainer>

      <InstructionContainer>
        <InstructionTitle>
          <h4>IV. Pitfalls</h4>
          <p>{pitfalls.desc}</p>
        </InstructionTitle>
        <PitfallDetails>
          {pitfalls.details.map((pitfall, index) => {
              return (
                <PitfallDetail key={`${id}-instruc-${index}`}>
                  {pitfall}
                </PitfallDetail>
              )
            })}
        </PitfallDetails>
      </InstructionContainer>
    </Container>
  )
}
