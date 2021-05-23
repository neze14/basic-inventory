import React, { useState } from 'react';
import { ItemType } from '../TypeDefinitions'

//create the type for the anticipated props to be passed from parent component
type Props = {
    handleCreateItem: Function,
    handleCancelCreate: Function
}

const AddItem: React.FC<Props> = (props) => {
    const initialItemState: ItemType = {
        name: '',
        category: 'unclassified',
        price: 0,
        in_stock: 0,
    }

    //declare the state variable for item to be added from form. Notice that we are using an object containing the individual elements
    //We need to interact with them individually as state variable that will change in response to input onChange
    
    // const [item, setItem] = useState<ItemType | any>({...initialItemState}); 
    /** here we are passing an object to use state and passing each element. 
     * This is a deconstruction */
    const [item, setItem] = useState<ItemType | any>(initialItemState);
    /** here we are passing an object as a whole to use state */

    //create a general onChange event handler for form inputs that fire onChange event
    const onChange = (event: any) => {
        const itemState = item; //check out item in state as is
        //modify element in the state which has the same name as the input that fired this event. Pass the new
        itemState[event.target.name] = event.target.value;
        setItem({ ...itemState }); //checkin the modified state
    }

    //function to handle form onSubmit event
    const onSubmit = (event: any) => {
        event.preventDefault(); //do not do the default form submit to the server
        props.handleCreateItem(item); //call the handleAddItem function passed via props.
    }

    //function to handle form onCancel
    const onCancel = () => {
        props.handleCancelCreate(); //call the function handleCancelAdd passed via props
    }

    return (
        <div className="AddItem">
            <form onSubmit={onSubmit}>
                <fieldset>
                    <legend>Add Item:</legend>
                        <ul className="form-wrapper">
                            <li className="form-row">
                                <label htmlFor='category'>Category</label>
                                <select id="category" name="category" value={item.category} onChange={onChange}>
                                    <option value="Unclassified">Unclassified</option>
                                    <option value="Food">Food</option>
                                    <option value="Drink">Drink</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Electronics">Electronics</option>
                                </select>
                            </li>
                            <li className="form-row">
                                <label htmlFor='name'>Name</label>
                                <input type='text' name='name' id='name' placeholder="name of item ..."
                                    value={item.name} onChange={onChange} required/>
                            </li>
                            <li className="form-row">
                                <label htmlFor='price'>Price</label>
                                <input type='number' name='price' id='price' placeholder="price of item in
                                    naira..." value={item.price} onChange={onChange} required/>
                            </li>
                            <li className="form-row">
                                <label htmlFor='in_stock'>In Stock</label>
                                <input type='number' name='in_stock' id='in_stock' placeholder="how many in
                                    stock" value={item.in_stock} onChange={onChange} required/>
                            </li>
                        </ul>
                        <input type='submit' value='Submit' onClick={onSubmit}/><input type='button' value='Cancel' onClick={onCancel}/>
                </fieldset>
            </form>
        </div>
    );

}

export default AddItem;