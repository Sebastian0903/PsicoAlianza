import { CommandBar, CommandBarButton, ContextualMenu, DefaultButton, DirectionalHint, FontIcon, Nav, OverflowSet, Persona, PersonaPresence, PersonaSize, TooltipHost } from '@fluentui/react';
import React, { useEffect, useId, useRef, useState } from 'react'
import PanelFloat from '../components/panelFloat/panelFloat';
import logo from '../assets/img/logo.webp'
import profile from '../assets/img/img-perfil.png'
import fondo from '../assets/img/png-fondo.png'
import Cookies from 'js-cookie';
import Empleados from './empleados';
import Cargos from './cargos';
import { useNavigate } from 'react-router-dom';
import ModalFluent from '../components/modalFluent/ModalFluent';

const Inbox = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [optRender, setOptRender] = useState(null)
    const [renderEmp, setRenderEmp] = useState()
    const [renderCar, setRenderCar] = useState()
    const [showImg, setShowImg] = useState(false)
    const buttonId = useId('persona_button');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const personaRef = useRef(null);
    const nameUser = Cookies.get('user')
    const navigate = useNavigate();
   const noOp = () =>{}
   const onRenderOverflowButtonStyles = {
    root: { padding: '10px' },
    menuIcon: { fontSize: '16px' },
  };
  const onRenderItemStyles = {
    root: { padding: '10px' },
  };
  const cleanButtonId = buttonId.replace(/:/g, '');
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
  const [campForm, setCampForm] = useState([
    {
        label:'Nombres',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Escribe el nombre de tu empleado'
    },
    {
        label:'Apellidos',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Escribe '
    },
    {
        label:'Identificación',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Escribe un número de identificación'
    },
    {
        label:'Teléfono',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Escribe un número de teléfono'
    },
    {
        label:'Ciudad',
        className:'no-min h-input',
        type:'select',
        options:[
            {
                text:'Selecciona una ciudad',
                id:1
            }
        ],
        placeholder:'Selecciona una ciudad'
    },
    {
        label:'Departamento',
        className:'no-min h-input',
        type:'select',
        options:[
            {
                text:'Selecciona un departamento',
                id:2
            }
        ],
        placeholder:'Selecciona un departamento'
    }
])
const title = ()=>{
  setIsOpenModal(false)
}
const showModal = (data)=>{
  setDataModal(data)
  setIsOpenModal(true)
}

  const renderHome = () =>{
    return(
      <>
        <div className="d--flex flex-fl c--flex-hc w10 padding-resp">
          <div className="d--flex flex-fl c--flex-hc mg20-h">
            <span style={{fontSize:'40px'}} className=''>Bienvenida!</span>
            <span style={{fontSize:'40px'}} className=''>Elisa Gómez</span>
          </div>
          <span className='mg20-h txt-center'>Añade los datos personales de tus empleados y después agrega su cargo en tu empresa</span>
          <div className="buton-efect mrg-top3">
          <FontIcon aria-label="ChevronLeftSmall"
            className='txt--prymary c-pointer clr--primary  '
            iconName={'AddFriend'}
            style={{fontSize:'40px'}}
            onClick={()=>{showModal(
              {
                title:"Nuevo empleado",
                classTitle:'clr--dark-I txt-4',
                textAcept:"Guardar",
                classHeader:"bkgn--light-II",
                form:campForm
              }
            )}}
          />
          </div>
          <span className='txt--pentanary'>Empieza aquí</span>
        </div>
      </>
    )
  }
  const renderModal = (page) =>{
    return(
        <ModalFluent
            onClose={title} 
            openModal={isOpenModal}
            {...page}
        />
    )
}

  const renderEmpleados = () =>{
    return(
      <Empleados />
    )
  }

  const renderCargos = () =>{
    return(
      <Cargos />
    )
  }
const _items = [
  {
    key: 'newItem',
    text: <Persona
    imageUrl={profile}
    hidePersonaDetails={false}
    imageAlt="Annie Lindqvist, status is busy"
    imageInitials= 'AL'
    text= 'Elisa Gómez'
    secondaryText= 'Administradora'
    className='color-txt'
    componentRef={personaRef}
    id={buttonId}
  />,
    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Perfil',
          ['data-automation-id']: 'newEmailButton'
        },
        {
          key: 'calendarEvent',
          text: 'Configuraciones',
        },
        {
          key: 'emailMessagez',
          text: 'Soporte',
        },
        {
          key: 'calendarEventz',
          text: 'Salir',
          onClick: ()=>{navigate('/home')}
        }
      ],
    },
  }
  // Agrega más opciones según sea necesario
];
      useEffect(() => {
        setShowImg(true)
      }, [])
      
  return (
    <>
      <div id="modal"></div>
      {isOpenModal && 
            renderModal(dataModal)
        }
    <div className="d--flex flex-fl w10">
        <div style={{position:'fixed',zIndex:'3'}} className="header-list w10">
            <img src={logo} alt="" className='mg10-w logo-header'/>
            <div className="profile d--flex mg2-wrem c--flex-hc">
            
            
            <CommandBar
                items={_items}
                ariaLabel="Inbox actions"
                primaryGroupAriaLabel="Email actions"
                farItemsGroupAriaLabel="More actions"
                className='menu-perfil'
              />
            </div>
        </div>
        <div className="container-inbox w10">
          <div style={{paddingTop:'90px'}} className="panel">
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

          {isOpen && 
          <PanelFloat 
            closeMenu={()=>setIsOpen(false)} 
            empleado={(e)=>{setRenderEmp(e);setRenderCar(false);setShowImg(false);setIsOpen(false)}}
            cargo={(e)=>{setRenderCar(e);setRenderEmp(false);setShowImg(false);setIsOpen(false)}}
            home={(e)=>{setShowImg(e);setRenderCar(false);setRenderEmp(false);setIsOpen(false)}}
          />}
          

          </div>
          <div style={{paddingTop:'90px'}} className="d--flex c--flex-we">
          {renderEmp?renderEmpleados():''}
          {renderCar?renderCargos():''}
          {showImg?renderHome():''}
          </div>
            
            {showImg?<img src={fondo} alt="" className='deep-image'/>:''}
        </div>
        </div>
    </>
  )
}

export default Inbox