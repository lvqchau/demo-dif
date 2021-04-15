const data = [
  {
    id: 'ELA',
    name: 'Error Level Analysis',
    desc: 'Error level analysis (ELA) is the analysis of compression artifacts in digital data with lossy compression such as JPEG. By subtracting the original image to the new resaved image with a new JPEG quality.',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: 'Only similar regions between the original and the ELA result should be compared together. Edges with edges, uniform color regions with uniform color regions, etc',
      details: [
        {
          name: 'JPEG Quality',
          range: '- range [1, 100]',
          desc: 'The quality at which an image is compressed using the lossy compressed method. 100% quality means no loss. This value should match the JPEG quality of the original image'
        },
        {
          name: 'Error Scale',
          range: '- range [1, 20]',
          desc: "The multiplier of the difference image between the original and the resaved image.\n/italic**Alert: Pixel value is from [0, 255], a big value of error scale will make all the errors (except the 0 value) go to 255 which is white"
        },
        {
          name: 'Opacity',
          range: '- range [0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image'
        }
      ]
    },
    pitfalls: {
      desc: 'The disadvantages of this method are:',
      details: [
        'The method is subjective, it is up to the user to interpret the result',
        'Difficulty in comparing the output of different regions',
        'Edges usually have high noise, interpreting the result much harder'
      ]
    }
  },
  { 
    id: 'JGhost', 
    name: 'JPEG Ghost',
    desc: 'JPEG-Ghost is the analysis of compression artifacts in digital data with lossy compression such as JPEG. By subtracting the original image to the new resaved image with a new JPEG quality. Then, the error image is normalized and filtered to enhance local effects.',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: 'The output image will produce a GHOST which is regions that suggest tampering',
      details: [
        {
          name: 'JPEG Quality',
          range: '- range [1, 100]',
          desc: 'The quality at which an image is compressed using the lossy compressed method. 100% quality means no loss. This value should match the JPEG quality of the original image'
        },
        {
          name: 'Opacity',
          range: '- range [0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image'
        }
      ]
    },
    pitfalls: {
      desc: 'The disadvantages of this method are:',
      details: [
        'The method is subjective, it is up to the user to interpret the result',
        'Edges usually have high noise, interpreting the result much harder'
      ]
    }  
  },
  { 
    id: 'demosaicing', 
    name: 'Demosaicing Artifacts',
    desc: 'Exposing tampered regions with demosaicing artifacts is a technique that is based on artifacts created during the process of light going through the Color Filter Array (CFA) in most digital cameras\n/italic** artifacts: features that appear in the resulting image but not in the original one\n/italic** color filter: a thin film that allows a certain component of light to pass through\n/italic*** CFA: mosaic of tiny color filters to capture color information.',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: 'The tampered regions will be of brighter color to the other sections in the image, due to the calculated ratio being in the range of [0, 1]. If closer to 1 the output will be brighter',
      details: [
        {
          name: 'Opacity',
          range: '- range [0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image'
        }
      ]
    },
    pitfalls: {
      desc: 'The disadvantages of this method are:',
      details: [
        'The method is subjective since the users have to interpret the result',
        'The method is ineffective against images with strong JPEG re-compression and resizing',
        'The method is ineffective if the tampered region is too small'
      ]
    }  
  },
  { 
    id: 'noiseMedian', 
    name: 'Noise Analysis',
    desc: 'Images contain noises in them, so when a region is tampered with, there will be noise inconsistencies. These inconsistencies might be hard to view with normal eyes. To expose the forgeries, a Median-filter noise residue inconsistency is used.\nThis technique is based on noise inconsistencies left when an image has been tampered with. By applying a noise reduction filter (Median filter), and reversing the results, we will get the output image.',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: 'The output image will have the tampered region of different noise inconsistencies and color range',
      details: [
        {
          name: 'Noise Amplitude',
          range: '- range [1, 100]',
          desc: 'Make the noise brighter'
        },
        {
          name: 'Opacity',
          range: '- range [0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image'
        }
      ]
    },
    pitfalls: {
      desc: 'The disadvantages of this method are:',
      details: [
        'The method is subjective since the users have to interpret the result',
        'The method only works on forgeries done on the original image since the noise inconsistencies will be more visible that way (not the screen-capturing of the new tampered image)'
      ]
    }  
  },
  { 
    id: 'geometric', 
    name: 'Geometric Analysis',
    desc: 'By using the nature of how reflection, lighting, and shadows works, Geometric Analysis will be checking for Reflection and Shadow inconsistency',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: 'User has to manually check for Reflection and Shadow inconsistencies by drawing lines, and determining if the reflections or shadows are plausible',
      details: [
        {
          name: 'JPEG Quality',
          range: '- range [1, 100]',
          desc: 'The quality at which an image is compressed using the lossy compressed method. 100% quality means no loss. This value should match the JPEG quality of the original image'
        },
        {
          name: 'Opacity',
          range: '- range [0, 1]',
          desc: 'Reduce the opacity of the result, to compare it with the original image'
        }
      ]
    },
    pitfalls: {
      desc: 'The disadvantages of this method are:',
      details: [
        'User has to manually check for Reflection and Shadow inconsistencies',
        'The methods are sensitive since one pixel error can lead to a huge direction change, so it must be done with care'
      ]
    }  
  },
  { 
    id: 'metadata', 
    name: 'Metadata Extraction',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis placeat repellendus possimus ipsam doloribus officia voluptatem, commodi molestiae magnam dolorum temporibus aliquam maxime reiciendis aut ipsum expedita itaque? Consequuntur, animi? ',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: 'Below are some parameters that the user can use to interpret the metadata extraction result',
      details: [
        {
          name: 'Modified Date',
          desc: 'If the modified date is not the same as the original date: The image has been modified'
        },
        {
          name: 'Header',
          desc: 'The header may contain the tag of some image editing software like Adobe Photoshop, etc. This indicates that the image has been modified by a software'
        },
        {
          name: 'Thumbnail',
          desc: 'The thumbnail and the image are not the same'
        },
        {
          name: 'Resolution',
          desc: 'The image has a strange resolution that does not match with any type of camera. This suggests that the image may have undergone some procedures such as resizing or cropping'
        }
      ]
    },
    pitfalls: {
      desc: 'The disadvantages of this method are:',
      details: [
        'Metadata can be easily replaced by programs, editing software',
        'Most social media strips Metadata when images get uploaded on their sites',
      ]
    }  
  },
  { 
    id: 'histogram', 
    name: 'Histogram Test',
    desc: 'Detect Double JPEG Compression by looking at the Histogram of an Image.',
    url: 'https://www.youtube.com/embed/m384NEQZwfA',
    instructions: {
      desc: 'High-quality JPEG compression of an image then doing it again with Lower quality will produce a Histogram looking like the one below. With up and down bars consecutively next to each other',
      details: [
        
      ]
    },
    pitfalls: {
      desc: 'The disadvantages of this method are:',
      details: [
        'Only detect JPEG image with different Double JPEG compression qualities'
      ]
    }
  }
]

export default data