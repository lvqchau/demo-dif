import React, {useEffect, useState} from 'react'
import './App.css'
import DIFPage from './pages/DIFPage'
import styled from 'styled-components'
import injectScript from './utils/injectScript'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SideMenu from './components/SideMenu'
import HomePage from './pages/HomePage'

const Loader = styled.div`
  position:   fixed;
  z-index:    9999;
  top:        0;
  left:       0;
  height:     100%;
  width:      100%;
  background: rgba( 255, 255, 255, .8) url('http://i.stack.imgur.com/FhHRx.gif') 50% 50% no-repeat;
`

function App() {
  const [cvState, setCvState] = useState(false)
  function onOpenCvReady() {
    setCvState(true);
  }

  useEffect(()=>{
    const promise = injectScript('opencv-injected-js', "/assets/lib/opencv.js");
    promise
      .then((res) => onOpenCvReady())
      .catch(err => console.log('Error loading dependencies, please refresh'))
  }, [])

  if (!cvState) 
    return <Loader/>
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact to='/dif' component={DIFPage}>
          <DIFPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
