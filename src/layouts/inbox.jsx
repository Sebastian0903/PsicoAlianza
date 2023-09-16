import { CommandBarButton, DirectionalHint, FontIcon, Nav, OverflowSet, TooltipHost } from '@fluentui/react';
import React, { useState } from 'react'
import PanelFloat from '../components/panelFloat/panelFloat';
import logo from '../assets/img/logo.webp'
import profile from '../assets/img/img-perfil.png'
import fondo from '../assets/img/png-fondo.png'
import Cookies from 'js-cookie';
import Empleados from './empleados';
import Cargos from './cargos';
import {BrowserRouter as Router, Switch, Redirect, Route, Routes, Outlet} from 'react-router-dom'

const Inbox = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [optRender, setOptRender] = useState(null)
    const [showImg, setShowImg] = useState(true)
    const nameUser = Cookies.get('user')
   const noOp = () =>{}
   const onRenderOverflowButtonStyles = {
    root: { padding: '10px' },
    menuIcon: { fontSize: '16px' },
  };
  const onRenderItemStyles = {
    root: { padding: '10px' },
  };


  const onRenderItem = (item) => {
    return (
      <TooltipHost content={item.title} directionalHint={DirectionalHint.rightCenter}>
        <CommandBarButton
          aria-label={item.name}
          styles={onRenderItemStyles}
          iconProps={{ iconName: item.icon }}
          onClick={item.onClick}
        />
      </TooltipHost>
    );
  };
  
  const onRenderOverflowButton = (overflowItems) => {
    return (
      <TooltipHost content="More items" directionalHint={DirectionalHint.rightCenter}>
        <CommandBarButton
          aria-label="More items"
          styles={onRenderOverflowButtonStyles}
          menuIconProps={{ iconName: 'More' }}
          menuProps={{ items: overflowItems }}
        />
      </TooltipHost>
    );
  };
      
  return (
    <>
      <div id="modal"></div>

    <div className="container-inbox w10">
        <div className="header-list w10">
            <img src={logo} alt="" className='mg10-w logo-header'/>
            <div className="profile d--flex mg2-wrem c--flex-hc">
                <img src={profile} alt="" className='mg15-w' />
                <div className="d--flex flex-fl">
                    <span>{nameUser}</span>
                    <label style={{fontSize:'12px'}} >Administración</label>
                </div>
            </div>
        </div>
        <div className="panel">
        {!isOpen && 
        <>
        <FontIcon aria-label="ChevronLeftSmall"
            className='mg20-h icon-waffle c-pointer'
            iconName={'Waffle'}
            onClick={()=>setIsOpen(true)}
        />
        <OverflowSet
            aria-label="Vertical Example"
            vertical
            items={[
            {
                key: 'item1',
                icon: 'Home',
                name: 'Home',
                title: 'Add',
                ariaLabel: 'New. Use left and right arrow keys to navigate',
                onClick: noOp,
            },
            {
                key: 'item2',
                icon: 'ChevronUpMed',
                name: 'ChevronUpMedIcon',
                title: 'Upload',
                onClick: noOp,
            }
            ]}
            onRenderOverflowButton={onRenderOverflowButton}
            onRenderItem={onRenderItem}
        />
        </>
        }

        {isOpen && <PanelFloat closeMenu={()=>setIsOpen(false)} onChange={(e)=>{}}/>}
        

        </div>
        <Empleados />
        
        {showImg?<img src={fondo} alt="" className='deep-image'/>:''}
    </div>
    
    </>
  )
}

export default Inbox