import React, { useEffect, useState } from "react";
import listSvg from './assets/img/list.svg';
import { AddList, List, Tasks } from "./components";
import axios from 'axios';

import './index.scss';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({ data }) => {
      setLists(data)
    });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data)
    });
  }, [])

  const onAddList = (obj) => {
    setLists([...lists, obj]);
  }

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map(item => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };

  const removeList = (id) => {
    axios.delete(`http://localhost:3001/lists/${id}`).then(() => {
      const newList = lists.filter(item => item.id !== id);
      setLists(newList);
    });
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if(item.id === id) {
        item.name = title
      }
      return item;
    }); 
    setLists(newList);
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
        {
          lists ? (<List
            items={lists}
            isRemovable
            onClickItem={item => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
            removeList={item => removeList(item.id)}
          />) : (
            'Загрузка...'
          )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        {
          lists &&
          activeItem &&
          <Tasks
            list={activeItem}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
          />
        }
      </div>
    </div>
  );
}

export default App;
