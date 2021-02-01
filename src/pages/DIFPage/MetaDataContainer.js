import React, { useEffect } from 'react'
import colors from '../../constants/colors'
import styled from 'styled-components'

const DataContainer = styled.div`
  color: ${colors.black};
  border: 1px solid gray;
  width: 20%;
  min-width: 250px;
  min-height: 250px;
  max-width: ${props => props.width-20+'px'};
  max-height: ${props => props.height+'px'};
  overflow: scroll;
  padding: 10px 15px;
`

const data = [
  'ExposureBias',
  'ExposureMode',
  'FileSource',
  'Flash',
  'FlashpixVersion',
  'FocalLength',
  'FocalPlaneXResolution',
  'FocalPlaneYResolution',
  'CompressedBitsPerPixel',
  'ColorSpace',

  'DateTimeOriginal',
  'ExifVersion',
  'Make',
  'MeteringMode',
  'Model',
  'Orientation',
  'PixelXDimension',
  'PixelYDimension',
  'ResolutionUnit',
  'SceneCaptureType',
  'SensingMethod',
  'ShutterSpeedValue',
  'WhiteBalance',

  'ApertureValue',
  'DigitalZoomRation'
]

export default function MetaDataContainer(props) {
  const {width, height, metaData} = props

  return (
    <DataContainer height={height} width={width}>
      <h6>--METADATA INFO--</h6>
      {
        !metaData ? <h5><i>Click GO to view metadata</i></h5>
        : Object.keys(metaData).length === 0 ? <p>No metadata is found</p>
        : <> {
          data.map((item, index) => {
            if (metaData[item])
              return <p key={'metadata_'+index}>
                <span style={{color: colors.purple}}>
                  {data[index]}
                </span>
                <span>: {JSON.stringify(metaData[item])}</span>
              </p>
          })
        } </>
      }
    </DataContainer>
  )
}
