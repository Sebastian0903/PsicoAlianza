import React, { useEffect, useState } from 'react'
import DetailsList from '../components/DetailsList/detailsList.component'
import { useBoolean } from "@fluentui/react-hooks";
import { Checkbox, FontIcon } from '@fluentui/react';
import DetailsListPSA from '../components/DetailsList/detailsList.component';
import InputFile from '../controls/inputFile/inputFile.component'
import ModalFluent from '../components/modalFluent/ModalFluent';

const Cargos = () => {
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
        label:'Nombre',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Buscar empleado'
    },
    {
        label:'Identificación',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Buscar número de identificación '
    },
    {
        label:'Área',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Escribe un área'
    },
    {
        label:'Cargo',
        className:'no-min h-input',
        type:'text',
        style:'mrg-4-0',
        placeholder:'Escribe un cargo'
    },
    {
        label:'Rol',
        className:'no-min h-input',
        type:'select',
        options:[
            {
                text:'Selecciona el rol del trabajador',
                id:1
            }
        ],
        placeholder:'Selecciona una ciudad'
    },
    {
        label:'Jefe',
        className:'no-min h-input',
        type:'text',
        placeholder:'Escribe un nombre'
    }
])

  const [filter, setFilter] = useState({
    pageSize: 5,
    pageNumber: "0",
    idDomain: ""
  });

  const COLUMN_TITLES = [{
    name: {
      name: <InputFile onChange={()=>{}} className="no-min form-input" label='Nombre' /> ,
      maxWidth: 130
    },
    identity: {
      name:<InputFile onChange={()=>{}} className="no-min form-input" label="Identificación" />,
      maxWidth: 110,
      isMultiline: true
    },
    area:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Área" />,
      maxWidth: 140
    },
    cargo:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Cargo" />,
      maxWidth: 120
    },
    rol:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Rol" />,
      maxWidth: 100
    },
    jefe:{
      name: <InputFile onChange={()=>{}} className="no-min form-input" label="Jefe" />,
      maxWidth: 130
    },
    actions: {
      name: "Acciones",
      maxWidth: 60,
      className:'centro'
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
                        title:"Editar cargo",
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
                        title:"Editar cargo",
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
      rol: 'Director Creativo',
      area: 'Marketing y estrategias',
      jefe: 'Elisa Gomez',
      cargo: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      name: 'Jhon Pérez',
    },
    {
      rol: 'Director Creativo',
      area: 'Marketing y estrategias',
      jefe: 'Elisa Gomez',
      cargo: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      name: 'Jhon Pérez',
    },
    {
      rol: 'Director Creativo',
      area: 'Marketing y estrategias',
      jefe: 'Elisa Gomez',
      cargo: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      name: 'Jhon Pérez',
    },
    {
      rol: 'Director Creativo',
      area: 'Marketing y estrategias',
      jefe: 'Elisa Gomez',
      cargo: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      name: 'Jhon Pérez',
    },
    {
      rol: 'Director Creativo',
      area: 'Marketing y estrategias',
      jefe: 'Elisa Gomez',
      cargo: 'Cra 23 #7-29 Provenza',
      identity: '10184478545',
      name: 'Jhon Pérez',
    },
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
      <h1 style={{fontFamily:'sans-serif'}}>Cargos</h1>
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
        iconBoton={'Work'}
        />
    </div>
    </>
  )
}

export default Cargos