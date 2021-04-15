import {
  SET_METHODS_REQUEST,
  SET_METHODS_SUCCESS,
  SET_METHODS_FAILURE,
} from "../constants/methods.js";

const initialState = {
  methods: [
    { id: 'ELA', name: 'Error Level Analysis' },
    { id: 'JGhost', name: 'JPEG Ghost' },
    { id: 'demosaicing', name: 'Demosaicing Artifacts' },
    { id: 'noiseMedian', name: 'Noise Analysis' },
    { id: 'geometric', name: 'Geometric Analysis' },
    { id: 'metadata', name: 'Metadata Extraction' },
    { id: 'histogram', name: 'Histogram Test' }
  ],
  params: {
    ELA: {
      JQuality: 1,
      errorScale: 1,
      opacity: 1
    },
    JGhost: {
      JQuality: 1,
      opacity: 1
    },
    demosaicing: {
      opacity: 1
    },
    noiseMedian: {
      noiseAmplitude: 1,
      opacity: 1
    },
    geometric: {
      frameSize: {
        type: 'size',
        value: {
          top: 200,
          right: 200,
          bottom: 200,
          left: 200
        }
      },
      lineWidth: 0.75,
      lineColor: {
        type: 'color',
        value: '#FF0000'
      }
    },
    metadata: { },
    histogram: { }
  },
  isLoading: false, 
  error: ""
};

function methodsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default methodsReducer;