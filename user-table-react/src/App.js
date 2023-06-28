import './App.css';
import { useEffect, useState } from "react";
import { DataList } from "./dataList/DataList";
import { AddUser } from "./addUser/AddUser";

function App() {

  const [data, setData] = useState([]);
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      const users = await fetch("https://jsonplaceholder.typicode.com/users")
          .then(async (data) => {
            data = await data.json();
            return  data.map((elem) => {
              return {
                id: elem.id,
                name: elem.name,
                email: elem.email,
                phone: elem.phone,
                isNew : false
              }
            })
          })
      setData(users);
    }
    fetchingData();
  }, [])

  return (
    <section>
        <div id="box">
            <AddUser setData={setData} isClicked={isClicked} setClicked={setClicked}/>
            <table>
                <thead>
                    <tr id="main-nav" className="list">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => <DataList key={user.id} user={user} setData={setData} isClicked={isClicked} setClicked={setClicked}/>)}
                </tbody>
            </table>

        </div>
    </section>
  );
}

export default App;
