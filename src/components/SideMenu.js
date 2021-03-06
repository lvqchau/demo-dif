import React from 'react'
import styled from 'styled-components'
import { ReactComponent as HomeIcon } from '../assets/images/home.svg';
import { ReactComponent as UtilIcon } from '../assets/images/utils.svg';
import { ReactComponent as SettingsIcon } from '../assets/images/settings.svg';
import colors from '../constants/colors';
import { NavLink } from 'react-router-dom';

const MenuButton = styled.button`
  cursor: pointer;
  text-decoration: none;
  color: unset;
  margin-bottom: 15px;
  transition: all 0.4s;
  & svg {
    fill: ${colors.purple};
    transition: all 0.4s;
  }
  &.active svg, &:hover svg {
    fill: ${colors.orange};
  }
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  & a.menu--active ${MenuButton} svg {
    fill: ${colors.orange};
  }
`

export default function SideMenu() {
  return (
    <MenuContainer>
      <NavLink exact to='/' activeClassName='menu--active'>
        <MenuButton>
          <HomeIcon width="24" height="24"/>
        </MenuButton>
      </NavLink>
      <NavLink to='/dif' activeClassName='menu--active'>
        <MenuButton>
          <UtilIcon width="24" height="24"/>
        </MenuButton>
      </NavLink>
      <MenuButton>
        <SettingsIcon width="24" height="24"/>
      </MenuButton>
    </MenuContainer>
  )
}
