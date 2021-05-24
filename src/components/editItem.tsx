/** This component is for displaying each item i the record, passed to it from ItemList */
import React, { useState } from 'react';
import { Form } from 'react-bulma-components';
import { ItemType } from '../TypeDefinitions';

// create the type for the anticipated props to be passed from parent component
type Props = {
    item: ItemType
    handleUpdateItem: Function
    handleCancelUpdate: Function
}

const EditItem: React.FC<Props> = (props) => {

    // prepare the data for the state initialization with current data
    const initialItemState: ItemType = {
        id: props.item.id,
        name: props.item.name,
        category: props.item.category,
        price: props.item.price,
        in_stock: props.item.in_stock,
    }

    //declare the state variable for item to be added from form. Notice that we are using an object containing the individual elements
    //We need to interact with them individually as state variable that will change in response to input onChange
    const [item, setItem] = useState<ItemType | any>({ ...initialItemState });
    
    //create a general onChange event handler for form inputs that fire onChange event
    const onChange = (event: any) => {
        const itemState = item;//check out item in state as is
        //modify element in the state which has the same name as the input that fired this event. Pass the new value
        itemState[event.target.name] = event.target.value;
        setItem({ ...itemState });//checkin the modified state
    }

    //function to handle form onSubmit event
    const onSubmit = (event: any) => {
        event.preventDefault();//do not do the default form submit to the server
        props.handleUpdateItem(item);//call the handleAddItem function passed via props.
    }
    
    //function to handle form onCancel
    const onCancel = () => {
        props.handleCancelUpdate();//call the function handleCancelAdd passed via props
    }

    // Note where the above functions are used below wothin the return statement
    return ( 
        <div className="EditItem">
            <form onSubmit={onSubmit}>
                <fieldset>
                <div className="box">
                    <h6 className="title is-6 has-text-centered">Edit Item:</h6>
                        <div className="field">
                            <label className="label">Category</label>
                            <div className="control">
                                <div className="select">
                                    <select id="category" name="category" value={item.category} onChange={onChange}>
                                        <option selected={item.category === "Unclassified" ? true : false} value="Unclassified">Unclassified</option>
                                        <option selected={item.category === "Food" ? true : false} value="Food">Food</option>
                                        <option selected={item.category === "Drink" ? true : false} value="Drink">Drink</option>
                                        <option selected={item.category === "Clothing" ? true : false} value="Clothing">Clothing</option>
                                        <option selected={item.category === "Electronics" ? true : false} value="Eletronics">Eletronics</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <Form.Field>
                            <Form.Label>Name</Form.Label>
                            <Form.Control>
                                <Form.Input type='text' name='name' id='name' placeholder="name of item ..." value={item.name} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Label>Price</Form.Label>
                            <Form.Control>
                                <Form.Input type='number' name='price' id='price' placeholder="price of item in naira..." value={item.price} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field>
                            <Form.Label>In Stock</Form.Label>
                            <Form.Control>
                                <Form.Input type='number' name='in_stock' id='in_stock' placeholder="how many in stock" value={item.in_stock} onChange={onChange} required />
                            </Form.Control>
                        </Form.Field>
                    </div>
                    <button className="button is-small is-success" onClick={onSubmit}>
                        <span>Submi</span>
                        <span className="icon is-small">
                            <i className="fas fa-check"></i>
                        </span>
                    </button>

                    <button className="button is-small is-danger" onClick={onCancel}>
                        <span>Cancel</span>
                        <span className="icon is-small">
                            <i className="fas fa-times"></i>
                        </span>
                    </button>
                </fieldset>
            </form>
        </div>
    )

}

export default EditItem;