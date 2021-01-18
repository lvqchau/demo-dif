import React, { Fragment, useState } from 'react'
import styled from 'styled-components'

import { ReactComponent as PointIcon } from '../../assets/images/aim.svg';
import { ReactComponent as AreaIcon } from '../../assets/images/crop (1).svg';

import { ReactComponent as DownloadIcon } from '../../assets/images/download.svg';
import { ReactComponent as InfoIcon } from '../../assets/images/info.svg';
import colors from '../../constants/colors'
import ButtonText from '../../components/ButtonText'
import ImageContainer from './ImageContainer'
import FileUploader from '../../components/FileUploader';


const OutputContainer = styled.div`
  background: ${colors.neutralblue};
  border-radius: 6px;
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 70%;

  min-height: 400px;
  max-height: 480px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`

export default function FileContainer() {
  const [activeBtn, setActiveBtn] = useState(null)

  const onActiveBtn = (idx) => {
    activeBtn === idx ? setActiveBtn(null) : setActiveBtn(idx)
  }

  return (
    <OutputContainer>
      <ButtonGroup style={{position: 'relative'}}>
        <ButtonGroup>
          <ButtonText className={activeBtn === 0 ? 'active' : ''} onClick={() => onActiveBtn(0)} style={{marginRight: 10}} icon={PointIcon} size={18}>Select point</ButtonText>
          <ButtonText className={activeBtn === 1 ? 'active' : ''} onClick={() => onActiveBtn(1)} icon={AreaIcon} size={18}>Select area</ButtonText>
        </ButtonGroup>
        <Fragment style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <FileUploader/>
        </Fragment>
        <ButtonGroup>
          <ButtonText style={{marginRight: 10}} icon={DownloadIcon} size={18}/>
          <ButtonText icon={InfoIcon} size={16}/>
        </ButtonGroup>
      </ButtonGroup>

      <ImageContainer/>
    </OutputContainer>
  )
}
