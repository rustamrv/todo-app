import React, { useState } from "react";
import List from "./components/List";
import listSvg from './assets/img/list.svg';
import AddList from "./components/AddList";

import db from './assets/db.json';

import './index.scss';
import Tasks from "./components/Tasks";

function App() {
  const [lists, setLists] = useState(db.lists.map(item => {
    item.color = db.colors.filter(color => color.id === item.colorId)[0].name;
    return item
  }));

  const onAddList = (obj) => {
    setLists([...lists, obj]);
  }

  return (
    <div className='todo'>
      <div className="sidebar">
        <List items={[
          {
            icon: <img src={listSvg} alt="List icon" />,
            name: "Все задачи",
            active: true
          },
        ]} />
        <List 
          items={lists} 
          isRemovable 
          onRemove={list => {
            console.log(list);
          }} 
          />
        <AddList onAdd={onAddList} colors={db.colors} />
      </div>
      <div className="todo__tasks">
          <Tasks />     
      </div>
    </div>
  );
}

export default App;
