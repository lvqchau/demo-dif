import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import colors from '../constants/colors'

import { ReactComponent as HomeIcon } from '../assets/icons/home.svg'
import { ReactComponent as DocsIcon } from '../assets/icons/docs.svg'
import { ReactComponent as BarsIcon } from '../assets/icons/menu.svg'
import ButtonText from './ButtonText'
import { NavLink } from 'react-router-dom'

const NavContainer = styled.nav`
  background-color: ${colors.darkpurple};
  color: ${colors.grayjean};
  width: 100%;
  height: 60px;
  position: relative;
  padding: 20px 20px 10px 20px;
  @media (min-width: 768px) {
    width: 24%;
    height: auto;
    min-width: 250px;
    padding: 20px 0 10px 0;
  }
`

const NavHeaderMini = styled.div`
  background-color: ${colors.darkpurple};
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    display: none;
  }
`

const NavHeader = styled.div`
  background-color: ${colors.darkpurple};
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  padding: 0 20px;
  display: none;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const NavContent = styled.div`
  height: ${props => props.isOpenMenu ? "calc(100vh - 60px)" : "0px"};
  overflow: scroll;
  // border: 1px solid red;

  background-color: inherit;
  position: fixed;
  top: 60px;
  right: 0;
  width: 40%;
  min-width: 200px;

  transition: height 0.6s ease;
  @media (min-width: 768px) {
    height: calc(100vh - 75px);
    position: relative;
    top: unset;
    right: unset;
    width: auto;
  }
`

export default function SideNav(props) {
  const {children} = props
  const [isOpenMenu, setOpenMenu] = useState(false)
  useEffect(() => {
    // console.log(children)
    // props.match.path === '/home'
  }, [])

  const openMenu = () => {
    console.log(2)
    setOpenMenu(!isOpenMenu)
  }

  return (
    <NavContainer>
      <NavHeaderMini>
        <ButtonGroup>
          <ButtonText to='/home' onClick={() => console.log('1')} icon={HomeIcon} size={18}/>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonText to='/tutorial' onClick={() => console.log('2')} style={{marginRight: 10}} icon={DocsIcon} size={18}/>
          <ButtonText className="active" onClick={openMenu} icon={BarsIcon} size={18}/>
        </ButtonGroup>
      </NavHeaderMini>
      <NavHeader>
        <ButtonText to='/home' onClick={() => console.log('1')} icon={HomeIcon} size={20}/>
        <ButtonText to='/tutorial' onClick={() => console.log('2')} icon={DocsIcon} size={18}>Tutorial</ButtonText>
      </NavHeader>

      <NavContent isOpenMenu={isOpenMenu}>
        {children}
      </NavContent>
    </NavContainer>
  )
}
