import React, { useEffect, useState } from 'react'
import DetailsList from '../components/DetailsList/detailsList.component'
import { useBoolean } from "@fluentui/react-hooks";
import { Checkbox, FontIcon } from '@fluentui/react';
import DetailsListPSA from '../components/DetailsList/detailsList.component';
import InputFile from '../controls/inputFile/inputFile.component'
import ModalFluent from '../components/modalFluent/ModalFluent';

const Empleados = () => {
  const [isLoadingData, {
    setTrue: handleLoadingData,
    setFalse: handleLoadedData
  }] = useBoolean(false);

  const [itemsSelect, setItemsSelect] = useState([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [dataModal, setDataModal] = useState({})
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 10,
    totalPages: 5
  });

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

  const [filter, setFilter] = useState({
    pageSize: 5,
    pageNumber: "0",
    idDomain: ""
  });

  const COLUMN_TITLES = [{
    name: {
      name: <InputFile onChange={()=>{}} className="no-min form-input" label='Nombre' iconBo="search"/> ,
      maxWidth: 130,
      isResizable: true, // Hace que la columna sea redimensionable
      minWidth: 100,  
    },
    identity: {
      name:<InputFile onChange={()=>{}} className="no-min form-input" label="Identificación" iconBo="search"/>,
      maxWidth: 110,
      isMultiline: true,
      isResizable: true, // Hace que la columna sea redimensionable
      minWidth: 100,  
    },
    direction:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Dirección" iconBo="search"/>,
      maxWidth: 140,
      isResizable: true, // Hace que la columna sea redimensionable
      minWidth: 100,  
    },
    telefono:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Teléfono" iconBo="search"/>,
      maxWidth: 120,
      isResizable: true, // Hace que la columna sea redimensionable
      minWidth: 100,  
    },
    ciudad:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Ciudad" iconBo="search"/>,
      maxWidth: 100,
      isResizable: true, // Hace que la columna sea redimensionable
      minWidth: 100,  
    },
    departamento:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Departamento" iconBo="search"/>,
      maxWidth: 130,
      isResizable: true, // Hace que la columna sea redimensionable
      minWidth: 100,  
    },
    actions: {
      name: "Acciones",
      maxWidth: 60,
      className:'centro',
      isResizable: true, // Hace que la columna sea redimensionable
      minWidth: 100,  
    }
  }];

  const [columnTitles, setColumnTitles] = useState(COLUMN_TITLES)
  const [numero, setNumero] = useState(0)
  const defaultRenderItemColumn = (item, index, column) => {
  
    const fieldContent = item[column.fieldName];
    switch (column.key) {
        case 'actions':
            return (
              <div className="d--flex c--flex-wse">
                <FontIcon aria-label="ChevronLeftSmall"
                    className='txt--prymary c-pointer'
                    iconName={'Edit'}
                    onClick={()=>{showModal(
                      {
                        title:"Editar empleado",
                        classTitle:'clr--light-III txt-4',
                        textAcept:"Guardar",
                        classHeader:"bkgn--primary",
                        form:campForm
                      }
                    )}}
                />
                <FontIcon aria-label="ChevronLeftSmall"
                    className='txt--prymary c-pointer'
                    iconName={'Delete'}
                    onClick={()=>{showModal(
                      {
                        title:"Editar empleado",
                        classTitle:'clr--light-III txt-4',
                        textAcept:"Aceptar",
                        classHeader:"bkgn--primary",
                        form:[],
                        confirmDelete:true,
                        revert:true
                      }
                    )}}
                />
              </div>
            );
        default:
            return <span>{fieldContent}</span>;
    }
}
const hideModal = ()=>{
  setIsOpenModal(false)
}
const showModal = (data)=>{
  setDataModal(data)
  setIsOpenModal(true)
}
const renderModal = (page) =>{
  return(
      <ModalFluent
          onClose={hideModal} 
          openModal={isOpenModal}
          {...page}
      />
  )
}

  const registros = [
    {
      departamento: 'Caldas',
      ciudad: 'Manizales',
      cargo: 'Director',
      direction: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      telefono: '3128293847',
      name: 'Juanita Gonzáles Uribe',
    },
    {
      departamento: 'Caldas',
      ciudad: 'Manizales',
      cargo: 'Director',
      direction: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      telefono: '3128293847',
      name: 'Juanita Gonzáles Uribe',
    },
    {
      departamento: 'Caldas',
      ciudad: 'Manizales',
      cargo: 'Director',
      direction: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      telefono: '3128293847',
      name: 'Juanita Gonzáles Uribe',
    },
    {
      departamento: 'Caldas',
      ciudad: 'Manizales',
      cargo: 'Director',
      direction: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      telefono: '3128293847',
      name: 'Juanita Gonzáles Uribe',
    },
    {
      departamento: 'Caldas',
      ciudad: 'Manizales',
      cargo: 'Director',
      direction: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      telefono: '3128293847',
      name: 'Juanita Gonzáles Uribe',
    }
  ]
  const getDataItem = (e) =>{
    setItemsSelect(e)
  }
  return (
    <>
    {isOpenModal && 
      renderModal(dataModal)
    }
    <div className='w8 components-list pg2-wrem'>
      <div className="d--flex c--flex-hc">
      <FontIcon 
        aria-label="ChevronLeftSmall"
        className='txt--tertiary c-pointer mrg-r10 clr--primary'
        iconName={'ChromeBack'}/>
      <h1 style={{fontFamily:'sans-serif'}}>Empleados</h1>
      </div>
        <DetailsListPSA
        enableShimmer={isLoadingData}
        listKey="listSelect"
        selectionMode={2}
        items={registros}
        itemsSelect={itemsSelect}
        renderItemColumn={defaultRenderItemColumn}
        //renderItemColumn={_defaultRenderItemColumn}
        columnTitles={columnTitles}
        onSelect={getDataItem}
        pagination={pagination}
        formConstants={campForm}
        iconBoton={'AddFriend'}
        />
    </div>
    </>
  )
}

export default Empleados