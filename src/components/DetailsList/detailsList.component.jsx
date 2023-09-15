import React, {useEffect, useState, useMemo} from 'react';

import {buildColumns, DetailsHeader, DetailsList} from '@fluentui/react/lib/DetailsList';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { ActionButton, FontIcon, MarqueeSelection } from '@fluentui/react';
import { Selection } from '@fluentui/react/lib/Selection';


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
    return (
        <>
        <div className="d--flex flex-fl w10-table">
        <div className="d--flex c--flex-wsb c--flex-hc pdg-1">
                <div className="">
                <span className='pdg-1'>
                <FontIcon aria-label="ChevronLeftSmall"
                    className='mg20-h icon-waffle c-pointer'
                    iconName={'Delete'}
                    onClick={()=>{}}
                />
                    Borrar seleccción
                </span>
                <span className='pdg-1'>
                <FontIcon aria-label="ChevronLeftSmall"
                    className='mg20-h icon-waffle c-pointer'
                    iconName={'DownloadDocument'}
                    onClick={()=>{}}
                />
                    Descargar datos
                </span>
                </div>
            <div className="add-button pdg-1">
            <ActionButton className='' iconProps={{ iconName: 'AddFriend' }} allowDisabledFocus>
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