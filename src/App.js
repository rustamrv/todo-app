import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AddList, List, Tasks } from "./components";
import axios from 'axios';
import listSvg from './assets/img/list.svg';

import './index.scss';


function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let navigate = useNavigate();
  const location = useLocation();


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
      axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({ data }) => {
        setLists(data)
      });
    });
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item;
    });
    setLists(newList);
  }

  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt('Текст задачи', taskObj.text);

    if (!newTaskText) {
      return;
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newTaskText
      })
      .catch(() => {
        alert('Не удалось обновить задачу');
      });
  };


  const onRemoveTask = (taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {

      axios.delete(`http://localhost:3001/tasks/${taskId}`)
        .then(() => {
          axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks").then(({ data }) => {
            setLists(data)
          });
        })
        .catch(() => {
          alert('Не удалось обновить название списка');
        })
    }
  }

  useEffect(() => {
    const listId = location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    }
  }, [lists, location.pathname]);


  return (
    <div className='todo'>
      <div className="todo__sidebar">
        <List
          onClickItem={item => {
            navigate(`/`);
          }}
          items={[
            {
              icon: <img src={listSvg} alt="List icon" />,
              name: "Все задачи",
              active: !activeItem
            },
          ]} />
        {
          lists ? (<List
            items={lists}
            isRemovable
            onClickItem={item => {
              navigate(`/lists/${item.id}`)
            }}
            activeItem={activeItem}
            removeList={item => removeList(item.id)}
          />) : (
            'Загрузка...'
          )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route
            element={
              lists && lists.map(list =>
                <Tasks
                  list={list}
                  onAddTask={onAddList}
                  onEditTitle={onEditListTitle}
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                  withoutEmpty
                />
              )
            }
            exact path="/"
          />

          <Route
            path="lists/:id"
            element={
              lists &&
              activeItem &&
              <Tasks
                list={activeItem}
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                onEditTask={onEditTask}
                onRemoveTask={onRemoveTask}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
