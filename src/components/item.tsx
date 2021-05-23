/** This component is for displaying each item in the record,
passed to it from ItemList */
import React from 'react';
import { ItemType } from '../TypeDefinitions';

type Props = {
    item: ItemType
    handleDeleteItem: Function
    handleEditItem: Function
}

const Item: React.FC<Props> = (props) => {
    // callback function for delete button onClick event We could have also embedded this function definition rather that define it first here
    const onDelete = () => {
        props.handleDeleteItem(props.item.id); // notice here that we are calling invoking the handleDeleteItem() passed down through props
    }; 

    const onEdit = () => {
        props.handleEditItem(props.item.id); // notice here that we are calling invoking the handleEditItem() passed down through props
    }; 


    return (
        <tr>
            <td>{props.item.name}</td>
            <td>{props.item.category}</td>
            <td>{props.item.price}</td>
            <td>{props.item.in_stock}</td>
            <td><button onClick={() => alert('Yet  to be implemented. Try it yourself')}>View Detail</button></td>
            <td><button onClick={onEdit}>Edit</button></td>
            <td><button onClick={onDelete}>Delete</button></td>
        </tr>
    );
}

export default Item;