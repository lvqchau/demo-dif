const data = [
  {
    id: 'ELA',
    name: 'Error Level Analysis',
    desc: 'Error level analysis (ELA) is the analysis of compression artifacts in digital data with lossy compression such as JPEG. By subtracting the original image to the new resaved image with a new JPEG quality. Only similar regions between the original and the ELA result should be compared together. Edges with edges, uniform color regions with uniform color regions, etc.',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: '',
      details: [
        {
          name: 'JPEG Quality',
          desc: '1-100, Specify the resave JPEG qulality'
        },
        {
          name: 'Error Scale',
          desc: '1-20, The multiplier of the difference image between the original and the resaved image.'
        },
        {
          name: 'Opacity',
          desc: '0-1, To compare with the inputted image below'
        }
      ]
    }
  },
  { id: 'JGhost', 
    name: 'JPEG Ghost', 
    desc: 'JPEG-Ghost is the analysis of compression artifacts in digital data with lossy compression such as JPEG. By subtracting the original image to the new resaved image with a new JPEG quality. Then, the error image is normalized and filtered to enhance local effects.', 
    url: 'https://www.youtube.com/embed/m384NEQZwfA', 
    instructions: {
    desc: '',
    details: [
      {
        name: 'JPEG Quality',
        desc: ''
      },
      {
        name: 'Opacity',
        desc: ''
      }
    ]
  } },
  { id: 'demosaicing', name: 'Demosaicing Artifacts', desc: '', url: 'https://www.youtube.com/embed/m384NEQZwfA', instructions: {
    desc: '',
    details: [
      {
        name: 'JPEG Quality',
        desc: ''
      },
      {
        name: 'Error Scale',
        desc: ''
      },
      {
        name: 'Opacity',
        desc: ''
      }
    ]
  } },
  { id: 'noiseMedian', name: 'Noise Analysis', desc: '', url: 'https://www.youtube.com/embed/m384NEQZwfA', instructions: {
    desc: '',
    details: [
      {
        name: 'JPEG Quality',
        desc: ''
      },
      {
        name: 'Error Scale',
        desc: ''
      },
      {
        name: 'Opacity',
        desc: ''
      }
    ]
  } },
  { id: 'geometric', name: 'Geometric Analysis', desc: '', url: 'https://www.youtube.com/embed/m384NEQZwfA', instructions: {
    desc: '',
    details: [
      {
        name: 'JPEG Quality',
        desc: ''
      },
      {
        name: 'Error Scale',
        desc: ''
      },
      {
        name: 'Opacity',
        desc: ''
      }
    ]
  } },
  { id: 'metadata', name: 'Metadata Extraction', desc: '', url: 'https://www.youtube.com/embed/m384NEQZwfA', instructions: {
    desc: '',
    details: [
      {
        name: 'JPEG Quality',
        desc: ''
      },
      {
        name: 'Error Scale',
        desc: ''
      },
      {
        name: 'Opacity',
        desc: ''
      }
    ]
  } },
  { id: 'histogram', name: 'Histogram Test', desc: '', url: 'https://www.youtube.com/embed/m384NEQZwfA', instructions: {
    desc: '',
    details: [
      {
        name: 'JPEG Quality',
        desc: ''
      },
      {
        name: 'Error Scale',
        desc: ''
      },
      {
        name: 'Opacity',
        desc: ''
      }
    ]
  } }
]

export default data