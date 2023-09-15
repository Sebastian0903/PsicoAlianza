import React, { useState } from 'react'
import DetailsList from '../components/DetailsList/detailsList.component'
import { useBoolean } from "@fluentui/react-hooks";
import { Checkbox, FontIcon } from '@fluentui/react';
import DetailsListPSA from '../components/DetailsList/detailsList.component';
import InputFile from '../controls/inputFile/inputFile.component'

const Empleados = () => {
  const [isLoadingData, {
    setTrue: handleLoadingData,
    setFalse: handleLoadedData
  }] = useBoolean(false);

  const [itemsSelect, setItemsSelect] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 10,
    totalPages: 2
  });

  const [filter, setFilter] = useState({
    pageSize: 5,
    pageNumber: "0",
    idDomain: ""
  });

  const prueba = () =>{
    return(
<InputFile label='fgfgfg' />
    )
  }

  const COLUMN_TITLES = [{
    name: {
      name: <InputFile className="no-min form-input" label='Nombre' /> ,
      maxWidth: 130
    },
    identity: {
      name:<InputFile className="no-min form-input" label="Identificación" />,
      maxWidth: 110,
      isMultiline: true
    },
    direction:{
      name: <InputFile className="no-min form-input" label="Dirección" />,
      maxWidth: 140
    },
    telefono:{
      name: <InputFile className="no-min form-input" label="Teléfono" />,
      maxWidth: 120
    },
    ciudad:{
      name: <InputFile className="no-min form-input" label="Ciudad" />,
      maxWidth: 100
    },
    departamento:{
      name: <InputFile className="no-min form-input" label="Departamento" />,
      maxWidth: 130
    },
    actions: {
      name: "Acciones",
      maxWidth: 60,
      className:'centro'
    }
  }];

  const [columnTitles, setColumnTitles] = useState(COLUMN_TITLES)

  const defaultRenderItemColumn = (item, index, column) => {
  
    const fieldContent = item[column.fieldName];
    switch (column.key) {
        case 'actions':
            return (
              <div className="d--flex c--flex-wse">
                <FontIcon aria-label="ChevronLeftSmall"
                    className='txt--prymary c-pointer'
                    iconName={'Edit'}
                    onClick={()=>{}}
                />
                <FontIcon aria-label="ChevronLeftSmall"
                    className='txt--prymary c-pointer'
                    iconName={'Delete'}
                    onClick={()=>{}}
                />
              </div>
            );
        default:
            return <span>{fieldContent}</span>;
    }
}
  const registros = [
    {
      departamento: 'Caldas',
      ciudad: 'Manizales',
      cargo: 'Director',
      direction: 'AV 777 Sur',
      identity: '123456789',
      telefono: '9934934934',
      name: 'Elisa',
    },
    {
      departamento: 'Caldas',
      ciudad: 'Manizales',
      cargo: 'Supervisor',
      direction: 'AV 777 Sur',
      identity: '987654321',
      telefono: '9934934934',
      name: 'Carlos',
    },
  ]
  const getDataItem = (e) =>{
    console.log(e)
    setItemsSelect(e)
  }
  return (
    <div className='w8 components-list pg2-wrem'>
      <h1>Empleados</h1>
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
        />
    </div>
  )
}

export default Empleados