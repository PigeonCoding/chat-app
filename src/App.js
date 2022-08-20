import './App.css';
import axios from 'axios';
import React, {useState} from "react"
import { v4 as uuid } from 'uuid';


let ran = true
let logged = false
let waslogged = false


const adress = "http://localhost:8000"
const client = axios.create({
  baseURL: adress
});


export default App;

function App() {


  const [users, setUsers] = useState([])

  if(ran){client.get("/users").then((res) => {setUsers(res.data);ran=false})}


  return (
    <div className="App">
      <Loginn users={users} />
    </div>
  );
}

function Loginn(props) {
  const [hmmm, sethmmm] = useState("")
  const [fuser, setUser] = useState({
    name: "",
    passwd: "",
  })

  function unloggin(){
    sethmmm("")
    logged = false
  }

  return (
    <div>
      {logged ? null : <form onSubmit={(e) => {e.preventDefault()}} >
        <label>
          <input placeholder='name' type={"text"} name="name" value={fuser.name} onChange={(e) => {setUser({...fuser, [e.target.name]: e.target.value})}} />
          <br/>
          <input  placeholder='passwd' type={"password"} name="passwd" value={fuser.passwd} onChange={(e) => {setUser({...fuser, [e.target.name]: e.target.value})}} />
        </label>
        <br/>
        <button onClick={(e) => {checkLogin(fuser, props.users,sethmmm);logged = true;checkLogin(fuser, props.users,sethmmm)}} >login</button>
      </form>
      }
      
      {logged ? <br/> : <br/>}
      {!logged ? null : <button onClick={(e) => {unloggin()}} >log out</button>}
      {!logged ? null : <h2>{hmmm} <br/> you are logged in as {fuser.name}</h2>}
    </div>
  )
}

function checkLogin(user, users, sethmmm){
  users.forEach(element => {
    console.log(logged)
    if(user.name === element.name && user.passwd === element.passwd && logged ){
      sethmmm("success")
    }
  });
}

