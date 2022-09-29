import List from "./components/List";
import listSvg from './assets/img/list.svg'; 
import AddList from "./components/AddList";

import db from './assets/db.json';

import './index.scss';

function App() { 

  return (
    <div className='todo'>
      <div className="sidebar">
        <List items={[
          {
            icon: <img src={listSvg} alt="List icon" />,
            name: "Все задачи",
            active: true
          },
        ]}
          isRemovable />
        <List items={
          [
            {
              color: 'green',
              name: "Покупки",
              active: false
            },
            {
              color: 'blue',
              name: "Фронтенд",
              active: true
            },
            {
              color: 'pink',
              name: "Фильмы и сериалы",
              active: false
            },
          ]}
          isRemovable />
        <AddList colors={db.colors} />
      </div>
      <div className="content">

      </div>
    </div>
  );
}

export default App;
