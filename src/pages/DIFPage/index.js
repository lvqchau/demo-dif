import React from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

import UtilContainer from './UtilContainer'
import FileContainer from './FileContainer'
import SideMenu from '../../components/SideMenu'

const DIFContainer = styled.div`
  background: ${colors.darkblue};
  padding: 25px;
  color: ${colors.white};
`

const TopDIFContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  
  flex-grow: 1;
  height: calc(30% - 20px);
  min-height: 170px;
`

export default function DIFPage() {
  const { cv, nj } = window

  return (
    <DIFContainer>
      <TopDIFContainer>
        <SideMenu/>
        <UtilContainer/>
      </TopDIFContainer>
      <FileContainer cv={cv} nj={nj}/>
    </DIFContainer>
  )
}
