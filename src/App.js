import List from "./components/List";
import listSvg from './assets/img/list.svg';

import './index.scss';

function App() {
  return (
    <div className='todo'>
      <div className="sidebar">
        <List items={[
          {
            icon: <img src={listSvg} alt="List icon" />,
            name: "All tasks",
            active: true
          }, 
        ]} />
          <List items={[  
          {
            color: 'green',
            name: "Покупки",
            active: false
          },
          {
            color: 'blue',
            name: "Фронтенд",
            active: false
          },
          {
            color: 'pink',
            name: "Фильмы и сериалы",
            active: false
          },
        ]} />
      </div>
      <div className="content">

      </div>
    </div>
  );
}

export default App;
