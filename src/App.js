import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch(error => console.error(error))
    event.target.reset();
  }

  return (
    <div className="App">

      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' />
        <br />
        <input type="email" name="email" id="" placeholder='email' />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h1>Hello {users.length}</h1>
      <div>
        {
          users.map(user => <p key={user._id}> name: {user.name} <br /> {user.email}  </p>)
        }
      </div>
    </div>
  );
}

export default App;
