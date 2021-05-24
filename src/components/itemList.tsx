import React from 'react';
import ItemListHeader from './itemListHeader';
import Item from './item';
import { ItemType } from '../TypeDefinitions';

//declare type for Props passed to this
type Props = {
    items: Array<ItemType>
    handleDeleteItem: Function,
    handleEditItem: Function
}

const ItemList: React.FC<Props> = (props) => {

    //prepare items for display in a table
    let itemListRows = null;
    itemListRows = props.items.map((item) => {
        return <Item item={item} handleDeleteItem={props.handleDeleteItem} handleEditItem={props.handleEditItem}/> //pass item to Item component each time
    })

    return (
        <div>
            <table  className="table is-fullwidth">
                <caption className="title is-3">Inventory Items</caption>
                <ItemListHeader />
                {itemListRows}
            </table>
        </div>
    );
}
export default ItemList;