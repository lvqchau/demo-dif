import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../constants/colors'

import UtilContainer from '../DIFPage/UtilContainer'
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

export default function Homepage() {
  const { cv, nj } = window
  const [metaView, setMetaView] = useState(false)
  const [metaData, setMetaData] = useState(null)

  function getCurrentImage() {
    let img = document.getElementById("originalImage")
    let canvas = document.getElementById("imageCanvas")
    
    if (img.src) {
      let srcMat = cv.imread('originalImage')
      let desMat = srcMat.clone()
      cv.cvtColor(desMat, desMat, cv.COLOR_RGBA2GRAY)
      cv.imshow('imageCanvas', desMat)
      srcMat.delete()
    }
  }

  return (
    <DIFContainer>
      <TopDIFContainer>
        <SideMenu/>
        <UtilContainer setMetaData={setMetaData} setMetaView={setMetaView} getCurrentImage={getCurrentImage}/>
      </TopDIFContainer>
      <FileContainer cv={cv} nj={nj} metaData={metaData} metaView={metaView} getCurrentImage={getCurrentImage}/>
    </DIFContainer>
  )
}
