import './App.css';
import { useState } from "react";
import { ListItem } from "./listItem/ListItem";
import { HeaderBar } from "./headerBar/HeaderBar";

function App() {
  const mainList = [
    {id: Math.floor(Math.random() * Date.now()), value: 0},
    {id: Math.floor(Math.random() * Date.now()), value: 0},
    {id: Math.floor(Math.random() * Date.now()), value: 0},
    {id: Math.floor(Math.random() * Date.now()), value: 0},
    {id: Math.floor(Math.random() * Date.now()), value: 0},
  ];
  const [list, setList] = useState([...mainList]);

  console.log("list", list)

  return (
    <section>
      <div id="box">
        <HeaderBar mainList={mainList} list={list} setList={setList} />
        {list.map((elem) => <ListItem key={elem.id} elem={elem} setList={setList} />)}
      </div>
    </section>
  );
}

export default App;
