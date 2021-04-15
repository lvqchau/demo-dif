import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import DIFPage from './pages/DIFPage'
import injectScript from './utils/injectScript'
import Loader from './components/Loader'
import HomePage from './pages/HomePage'
import Home from './pages/Home'
import TutorialPage from './pages/Tutorial'
// import SideMenu from './components/SideMenu'
// import HomePage from './pages/HomePage'


function App() {
  const [cvState, setCvState] = useState(false)
  const [npState, setNpState] = useState(false)
  function onOpenCvReady() {
    setCvState(true);
  }
  
  function onNumpyReady() {
    setNpState(true);
  }

  useEffect(() => {
    async function fetchLib() {
      await injectScript('opencv-injected-js', "/assets/lib/opencv.js")
        .then((res) => onOpenCvReady())
        .catch(err => console.log('Error loading dependencies, please refresh'))
      await injectScript('numpy-injected-js', "/assets/lib/numjs.min.js")
        .then((res) => onNumpyReady())
        .catch(err => console.log('Error loading dependencies, please refresh'))
    }
    fetchLib();
  }, [])
    

  if (!cvState || !npState) 
    return <Loader/>
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <DIFPage/>
        </Route>
        <Route path='/dif'>
          <DIFPage/>
        </Route>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/tutorial/:methodId?' component={TutorialPage}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
