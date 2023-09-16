import React, {useEffect, useState, useMemo} from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {buildColumns, DetailsHeader, DetailsList, DetailsListLayoutMode} from '@fluentui/react/lib/DetailsList';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { ActionButton, CommandBar, FontIcon, FontWeights, IconButton, MarqueeSelection, Modal } from '@fluentui/react';
import { Selection } from '@fluentui/react/lib/Selection';
import ModalFluent from '../modalFluent/ModalFluent';


const _defaultRenderItemColumn = (item, index, column) => {
    return <>{item[column.fieldName]}</>;
}

const DetailsListPSA = ({
    listKey,
    items,
    columnTitles,
    selectionMode = 0,
    iconBoton,
    compact,
    renderItemColumn = _defaultRenderItemColumn,
    enableShimmer,
    onSelect,
    className,
    onPageChange,
    layoutMode,
    itemsSelect,
    formConstants,
    viewport,
    pagination = {
        currentPage: -1,
        pageSize: -1,
        totalItems: -1,
        totalPages: -1
    }
 }) => {
    const [sortedItems, setSortedItems] = useState([]);
    const [columns, setColumns] = useState()
    // const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [numeroBot, setNumeroBot] = useState(0)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [campForm, setCampForm] = useState(formConstants)

    useEffect(() => {
        setColumns(_buildColumns(columnTitles));
    }, [itemsSelect])

    useEffect(() => {
        setSortedItems(items);
    }, [items])

    const selection = useMemo(
        () =>
            new Selection({
                onSelectionChanged: () => {
                    if(onSelect)
                        onSelect(selection.getSelection())
                },
                selectionMode: selectionMode,
            }),
    [itemsSelect]);

    const _onColumnClick = (event, column) => {
        // TODO: implement some order by column here
    };

    const _buildColumns = (titles) => {
        return buildColumns(titles, false, _onColumnClick)
            .map(
                column => ({
                    ...column,
                    ...titles[0][column.key]
                })
            );
    }

    const _renderDetailsHeader = (detailsHeaderProps) => {
        return (
            <DetailsHeader
                    className="details-list-header"
                    {...detailsHeaderProps}
                />
        );
    }

    
    const onRenderDetailsHeader = (props, defaultRender) => {
        return (
          <div style={{ height: "50px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {defaultRender(props)}
          </div>
        );
      };

    const _handleChangePage = (nextPage) => (onPageChange && pagination) && onPageChange(nextPage);

    const renderModal = (page) =>{
        return(
            <ModalFluent 
                onClose={title} 
                openModal={isOpenModal}
                {...page}
            />
        )
    }

    const _paginationRow = () => {
        const {
            currentPage,
            pageSize,
            totalItems,
            totalPages
        } = pagination;
        const firstRegister = ((currentPage * pageSize) + 1) - pageSize;
        const lastRegister = currentPage * pageSize > totalItems ? totalItems : currentPage * pageSize;
        return (
            <>
                <div className="details-list-pagination">
                    <div className="details-list-pagination__subitem">
                        {/* <p>{firstRegister} - {lastRegister} de {totalItems}</p> */}
                        <CommandBar
                            items={[
                                {
                                    key: 'newItem',
                                    text: 'Mostrar de a',
                                    cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
                                    subMenuProps: {
                                      items: [
                                        {
                                          key: 'emailMessage',
                                          text: '10 resultados',
                                          ['data-automation-id']: 'newEmailButton'
                                        },
                                        {
                                          key: 'calendarEvent',
                                          text: '30 resultados',
                                        },
                                        {
                                          key: 'emailMessagez',
                                          text: '50 resultados',
                                        }
                                      ],
                                    },
                                  }
                            ]}
                            ariaLabel="Inbox actions"
                            primaryGroupAriaLabel="Email actions"
                            farItemsGroupAriaLabel="More actions"
                            className='menu-perfil'
                        />
                    </div>
                    <div className="details-list-pagination__subitem">
                        <ul>
                            <li>
                                <IconButton 
                                    iconProps={{ iconName: 'ChromeBack', className:'clr--primary txt--tertiary act', style:{fontWeight:'700'}}} 
                                    onClick={ _ => {_handleChangePage(currentPage - 1);setNumeroBot(current=>current-1)}} 
                                    aria-label="Emoji" 
                                    disabled={numeroBot === 1}
                                />
                            </li>
                            <li className="details-list-pagination__pages">
                                <ul>
                                    {
                                        [...Array(totalPages).keys()].map(key => {
                                            const page = key + 1;
                                            return (
                                                <li className={`${page.toString().length>2?'max':'min'} hover-select ${page === numeroBot? 'details-list-selected':''}`} id={page} key={page}>
                                                    <button
                                                        className={``}
                                                        data-title={page}
                                                        type="button"
                                                        onClick={ _ => {_handleChangePage(page);setNumeroBot(page);}}
                                                    >{page}</button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                            <li>
                                <IconButton 
                                    iconProps={{ iconName: 'ChromeBackMirrored', className:'clr--primary txt--tertiary act', style:{fontWeight:'700'}}} 
                                    onClick={ _ => {_handleChangePage(currentPage + 1);setNumeroBot(current=>current+1)}} 
                                    aria-label="Emoji" 
                                    disabled={numeroBot === totalPages}
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
    const styles = {
        headerWrapper: {
          display: 'none', // Oculta los encabezados
        },
      };

    const _onRenderDetailsFooter = () => {
        return (
            <>
                { (pagination && pagination.currentPage > 0) && _paginationRow()}
            </>
        );
    }
    const titleId = useId('title');
    const title = ()=>{
        setIsOpenModal(false)
    }
    const showModal = (data)=>{
        setDataModal(data)
        setIsOpenModal(true)
    }
    return (
        <>
        {isOpenModal && 
            renderModal(dataModal)
        }
        <div className="d--flex flex-fl w10-table">
        <div className="d--flex c--flex-wsb c--flex-hc pdg-1">
                <div className="font-opt pdg-1-h">
                    <ActionButton className='button-trans mrg-r mrg-b-0' 
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
                    iconProps={{ iconName: 'Delete' }}>
                        Borrar seleccción
                    </ActionButton>
                    <ActionButton className='button-trans mrg-b-0' onClick={()=>{}} iconProps={{ iconName: 'DownloadDocument' }}>
                        Descargar archivos
                    </ActionButton>
                </div>
            <div className="add-button pdg-1">
            <ActionButton 
                className='' 
                onClick={()=>showModal(
                    {
                        title:"Nuevo empleado",
                        classTitle:'clr--dark-I txt-4',
                        textAcept:"Guardar",
                        classHeader:"bkgn--light-II",
                        form:campForm
                    }
                )} 
                iconProps={{ iconName: iconBoton }}
            >
            Agregar
            </ActionButton>
            </div>
        </div>

        <div className="pdg1-w">
        <ShimmeredDetailsList
            items={sortedItems}
            setKey={listKey}
            columns={columns}
            onRenderItemColumn={renderItemColumn}
            onRenderDetailsHeader={_renderDetailsHeader}
            selection={selection}
            compact={compact}
            selectionMode={selectionMode}
            enableShimmer={enableShimmer}
            layoutMode={DetailsListLayoutMode.fixedColumns}
            className={className}
            // {...viewport?{viewport:1000}:{}}
            style={styles}
            onRenderDetailsFooter={_onRenderDetailsFooter}
        />
        </div>
        </div>
        </>
        
    );
}


export default DetailsListPSA;