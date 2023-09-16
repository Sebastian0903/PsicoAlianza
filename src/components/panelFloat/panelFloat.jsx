import React from 'react'
import { FontIcon, Nav } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';

const PanelFloat = (props) => {
    const navigate = useNavigate();
    const navStyles = {
        root: {
          width: 208,
          height: 350,
          boxSizing: 'border-box',
          overflowY: 'auto'
        }
      };
      const navLinkGroups = [
        {
            links: [
                {
                    key: 'Soporte BSR',
                    name: 'Home',
                    // url: `/${client}/administration/support`,
                    onClick:()=>{props.home(`inbox`);}
                    
                },
                {
                    key: 'license',
                    name: 'Listas',
                    links:[
                        {
                            key: 'commercialLicense',
                            name: 'Empleados',
                            // url: `/${client}/administration/commercial-license`
                            onClick:()=>{props.empleado(true);}
                        },
                        {
                            key: 'userLicenses',
                            name: 'Cargos',
                            // url: `/${client}/administration/user-licences`
                            onClick:()=>{props.cargo(`cargos`);}
                        }
                    ]
                }
            ]
        }
        
      ];

    const closePanel = () =>{
        props.closeMenu()
    }
  return (
    <>
    <FontIcon aria-label="ChevronLeftSmall"
            className='mg20-h icon-waffle c-pointer'
            iconName={'Waffle'}
            onClick={()=>closePanel()}
        />
    <Nav groups={navLinkGroups} styles={navStyles}/>
    </>
  )
}

export default PanelFloat