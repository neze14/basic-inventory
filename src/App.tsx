import React, {useState} from 'react';
import './App.css';

import ItemList from './components/itemList';
import {ItemType} from './TypeDefinitions';
import AddItem from './components/addItem';
import EditItem from './components/editItem';

//for component hierarchy visual testing, we are creating fake inventory items for our App here.
//in reality, such data may come from a remote source
const testItems: Array<ItemType> = [ //notice the use of array of ItemType as our type for testItems
  {id: 1, category:'Food', name:'Bread', price: 40, in_stock: 40},
  {id: 2, category:'Food', name:'Whole Chicken', price: 1000, in_stock: 10},
  {id: 3, category:'Drink', name:'Coke', price: 50, in_stock: 20},
  {id: 4, category:'Toiletries', name:'Dettol Soap', price: 150, in_stock: 35},
  {id: 5, category:'Clothing', name:'Jeans trouser', price: 3000, in_stock: 15},
  {id: 6, category:'Clothing', name:'Jacket', price: 4000, in_stock: 100},
  {id: 7, category:'Electronics', name:'Sony Xperia XL', price: 40000, in_stock: 3}
 
]

//Below is an object type for holding state variable elements.
//We have created a type so that we can have flexibility for itemToEdit 
type CombinedStateType = {
  items: ItemType[],
  onAddItem: boolean,
  onEditItem: boolean,
  itemToEdit: null | ItemType //safe in this way so as to be able to set it to null
}

const App: React.FC = () => {
  
  //Let's combine onAddItem flag and items in an object as they will likely be set together from handleCreateItem
  const [combinedState, setCombinedState] = useState<CombinedStateType>({items: testItems, onAddItem: false, onEditItem: false, itemToEdit: null})

  //function that handles AddItem
  const handleCreateItem = (itemToAdd: ItemType) => {
    const currentItems = combinedState.items;

    // Below is makeshift for adding an id to the itemToAdd. This should be generated automatically by the backend when creating
    //For now I am just using the length of items so far to determine the next id. It will not work well with concurrent usage.
    itemToAdd.id = currentItems.length + 1;

    currentItems.push(itemToAdd);
    setCombinedState({...combinedState, onAddItem: false, items: currentItems});; // "false" closes the AddItem form. 
  } 

  
  const handleCancelCreate = () => {
    setCombinedState({...combinedState, onAddItem: false}); // retain the combinedState as is and then overide onAddItem, setting it to false
  }

  const handleDeleteItem = (id: number) => {
    // remove item from state
    const currentItems = combinedState.items;
    // find the index corresponding to the item with the passed id
    const index = currentItems.findIndex((item) => item.id === id);
    currentItems.splice(index,1); //remove one element starting from the index position. This is removing the element itself
    // update state with the spliced currentItems
    setCombinedState({...combinedState, items: currentItems});

  }

  //Edit Item has been flagged
  const handleEditItem = (id: number) => {
    //get the item to edit
    const currentItems = combinedState.items;
    const index = currentItems.findIndex((item) => item.id === id);
    const item = currentItems[index];
    setCombinedState({...combinedState, onEditItem: true, itemToEdit: item, onAddItem: false}); //set onEditItem to true and itemToEdit
  }

  const handleUpdateItem = (editedItem: ItemType) => {
    //bring down the items in the state for modification.
    const currentItems = combinedState.items;
    //find the item that has the same id as the editedItem's id
    const index = currentItems.findIndex((item) => item.id === editedItem.id);
    //now change the value for that item in items
    currentItems[index] = editedItem;
    //set the state replacing items with the modified one
    //Also set displayUpdateItem flag to false and itemToUpdate to null in stateas pending update is now done.
    setCombinedState({...combinedState, onEditItem: false, itemToEdit: null});//set onEditItem to true and itemToEdit to empty
  }  
  
  const handleCancelUpdate = () => {
    //simply setState to make displayUpdate disappear
    setCombinedState({...combinedState, onEditItem: false, itemToEdit: null});// set onEditItem to true and itemToEdit to empty
  }

  // const [items] = useState(testItems); //declare useState for items state and set initial

  if (combinedState.onEditItem && combinedState.itemToEdit !== null){
    return (
      <div>
        <ul>
          <li>
            <button onClick={()=>{setCombinedState({...combinedState, onAddItem: true, onEditItem: false})}}>+ Add Item</button>
          </li>
        </ul>
        <div>
          <EditItem item={combinedState.itemToEdit} handleUpdateItem={handleUpdateItem} handleCancelUpdate={handleCancelUpdate}/>
        </div>
        <div>
          <ItemList items={combinedState.items} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem}/>
        </div>
      </div>
    )
  }else if (combinedState.onAddItem) { //Display AddItem along with ItemList if onAddItem is true
    return (
      <div className="App">
      <AddItem handleCreateItem = {handleCreateItem} handleCancelCreate = {handleCancelCreate}/>
      <ItemList items={combinedState.items} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem}/>
    </div>
    ) 
  }else { //onAddItem is false
        return (
          <div>
            <ul>
              <li>
                <button onClick = {() => {setCombinedState({...combinedState, onAddItem: true, onEditItem: false})}}>+ Add Item</button>
              </li>
            </ul>
            <ItemList items = {combinedState.items} handleDeleteItem={handleDeleteItem} handleEditItem={handleEditItem}/>
          </div>
        );
    }
}

export default App;


/* This is just a comment inside JSX.
  *      Pass items in state i.e. {items} to ItemList via a
  *      prop with the same name items, for ease of recognition.
  *      Of course, we can check first if the items array has at least one entry before we call
  *      ItemList
  * !!!THAT IS FOR BELOW!!!*/

/** ORIGINAL APP
 *  return (
    <div className="App">
      <ItemList items={items}/>
        </div>
      );
    }
*/


/**
  import React from 'react';
  import logo from './logo.svg';
  import './App.css';

  function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  export default App;
*/