import React, {useEffect, useState, useMemo} from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {buildColumns, DetailsHeader, DetailsList} from '@fluentui/react/lib/DetailsList';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { ActionButton, FontIcon, MarqueeSelection, Modal } from '@fluentui/react';
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
    compact,
    renderItemColumn = _defaultRenderItemColumn,
    enableShimmer,
    onSelect,
    className,
    onPageChange,
    layoutMode,
    itemsSelect,
    viewport,
    detailsHeaderProps,
    pagination = {
        currentPage: -1,
        pageSize: -1,
        totalItems: -1,
        totalPages: -1
    }
 }) => {
    const [sortedItems, setSortedItems] = useState([]);
    const [columns, setColumns] = useState()
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
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
                        <p>{firstRegister} - {lastRegister} de {totalItems}</p>
                    </div>
                    <div className="details-list-pagination__subitem">
                        <ul>
                            <li>
                                <button
                                    className="details-list-pagination__subitem--arrow"
                                    disabled={currentPage === 1}
                                    type="button"
                                    onClick={ _ => _handleChangePage(currentPage - 1)}>
                                    &#x3c;
                                </button>
                            </li>
                            <li className="details-list-pagination__pages">
                                <ul>
                                    {
                                        [...Array(totalPages).keys()].map(key => {
                                            const page = key + 1;
                                            return (
                                                <li className={`${page.toString().length>2?'max':'min'}`} id={page} key={page}>
                                                    <button
                                                        className={`${page === currentPage && 'details-list-pagination__pages--selected'}`}
                                                        data-title={page}
                                                        type="button"
                                                        onClick={ _ => _handleChangePage(page)}
                                                    >{page}</button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                            <li>
                                <button
                                    className="details-list-pagination__subitem--arrow"
                                    disabled={currentPage === totalPages}
                                    type="button"
                                    onClick={ _ => _handleChangePage(currentPage + 1)}>
                                    &#x3e;
                                </button>
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
        hideModal()
    }
    return (
        <>
        {isModalOpen && 
            <ModalFluent 
                onClose={title} 
                openModal={isModalOpen}
                title="Nuevo empleado"
                classTitle='clr--dark-I txt-4'
                textAcept="Guardar"
                form={campForm}
            />
        }
        <div className="d--flex flex-fl w10-table">
        <div className="d--flex c--flex-wsb c--flex-hc pdg-1">
                <div className="font-opt pdg-1-h">
                    <ActionButton className='button-trans mrg-r mrg-b-0' onClick={showModal} iconProps={{ iconName: 'Delete' }}>
                        Borrar seleccción
                    </ActionButton>
                    <ActionButton className='button-trans mrg-b-0' onClick={showModal} iconProps={{ iconName: 'DownloadDocument' }}>
                        Borrar seleccción
                    </ActionButton>
                </div>
            <div className="add-button pdg-1">
            <ActionButton className='' onClick={showModal} iconProps={{ iconName: 'AddFriend' }}>
            Agregar
            </ActionButton>
            </div>
        </div>

        <div className="pdg1-w w10">
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
            layoutMode={layoutMode == 0 ? 0 : 1 }
            className={className}
            // {...viewport?{viewport:viewport}:{}}
            style={styles}
            onRenderDetailsFooter={_onRenderDetailsFooter}
        />
        </div>
        </div>
        </>
        
    );
}


export default DetailsListPSA;