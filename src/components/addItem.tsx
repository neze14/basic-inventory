import React, { useState } from 'react';
import { Form } from 'react-bulma-components';
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
            <div className="field">
                <form onSubmit={onSubmit}>
                    <fieldset>
                    <div className="box">
                        <h6 className="title is-6 has-text-centered">Add Item:</h6>
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
                                    <Form.Input type='text' name='name' id='name' placeholder="name of item ..."
                                        value={item.name} onChange={onChange} required/>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>Price</Form.Label>
                                <Form.Control>
                                    <Form.Input type='number' name='price' id='price' placeholder="price of item in
                                            naira..." value={item.price} onChange={onChange} required/>
                                </Form.Control>
                            </Form.Field>
                            <Form.Field>
                                <Form.Label>In Stock</Form.Label>
                                <Form.Control>
                                    <Form.Input type='number' name='in_stock' id='in_stock' placeholder="how many in
                                        stock" value={item.in_stock} onChange={onChange} required/>
                                </Form.Control>
                            </Form.Field>
                        </div>

                        <button className="button is-small is-success" onClick={onSubmit}>
                            <span>Submit</span>
                            <span className="icon is-small">
                                <i className="fas fa-check"></i>
                            </span>
                        </button>

                        <button className="button is-small is-danger is-outlined" onClick={onCancel}>
                            <span>Cancel</span>
                            <span className="icon is-small">
                                <i className="fas fa-times"></i>
                            </span>
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );

}

export default AddItem;