import './App.css';
import axios from 'axios';
import React, {useState} from "react"
// import { v4 as uuid } from 'uuid';


let ran = true
let ran2 = true
let logged = false
let currentUser


const adress = "http://localhost:8000"
const client = axios.create({
	baseURL: adress
});

function updateList(setUsers){
	client.get("/users").then((res) => {setUsers(res.data)})
}

function updateMsgList(setMsg){
	client.get("/users").then((res) => {setMsg(res.data)})
}

export default App;

function App() {
	const [users, setUsers] = useState([])

	if(ran){client.get("/users").then((res) => {setUsers(res.data);ran=false})}

	return (
		<div className="App">
			{!logged && <Loginn users={users} setUsers={setUsers}/>}
		</div>
	);
}

function Loginn(props) {
	
	const [hmmm, sethmmm] = useState("")
	const [fuser, setUser] = useState({
		name: "",
		passwd: "",
		id: 0,
	})

	function setShit(shit){
		setUser(shit)
	}

	function unloggin(){
		sethmmm("")
		logged = false
	}

	return (
		<div>
			{logged ? null : <form  className='Form' onSubmit={(e) => {e.preventDefault()}} >
				<label className='login' >
					<h4>log in</h4>
					<input placeholder='name' type={"text"} name="name" value={fuser.name} onChange={(e) => {setUser({...fuser, [e.target.name]: e.target.value})}} />
					<br/>
					<input  placeholder='passwd' type={"password"} name="passwd" value={fuser.passwd} onChange={(e) => {setUser({...fuser, [e.target.name]: e.target.value})}} />
					<br/>
					<button onClick={(e) => {checkLogin(fuser, props.users,sethmmm,setUser);logged = true;checkLogin(fuser, props.users,sethmmm,setUser)}} >login</button>
					<br/>
				</label>
				<label className='signin' >
					<h4>sign in</h4>
					<input placeholder='name' type={"text"} name="name" value={fuser.name} onChange={(e) => {setUser({...fuser, [e.target.name]: e.target.value})}} />
					<br/>
					<input  placeholder='passwd' type={"password"} name="passwd" value={fuser.passwd} onChange={(e) => {setUser({...fuser, [e.target.name]: e.target.value})}} />
					<br/>
					<button onClick={(e) => {signIn(fuser, props.setUsers, props.users, sethmmm);logged = true;checkLogin(fuser, props.users,sethmmm,setShit)}}> sign in </button>
				</label>
			</form>
			}
			{logged ? <MainApp unloggin={unloggin} /> : <br/>}
			{/* {!logged ? null : <button onClick={(e) => {unloggin()}} >log out</button>} */}
			{/* {!logged ? null : <button onClick={(e) => {removeAcount(fuser, setUser); unloggin()}} >remove account</button>} */}
			{/* {!logged ? null : <h2>{hmmm} <br/> you are logged in as {fuser.name} with id {fuser.id}</h2>} */}
		</div>
	)
}

function checkLogin(user, users, sethmmm, setUser){
	users.forEach(element => {
		console.log(logged)
		if(user.name === element.name && user.passwd === element.passwd && logged ){
			setUser({...user, ["id"]: element.id})
			sethmmm("success")
			currentUser = element
		}
	});
}

function signIn(user, setUsers, users, sethmmm){
	client.get("/adduser/" + user.name + "/" + user.passwd).then((res) => {checkLogin(user, users, sethmmm); setUsers(res.data);checkLogin(user, users, sethmmm)})
	
}

function removeAcount(user,setUser){
	client.get("/deleteuser/" + user.id).then((e) => updateList(setUser))
	
}


function MainApp(props){

	const [msg, setMsg] = useState([])
	
	if(ran2){client.get("/msg").then((res) => {setMsg(res.data);ran2=false;console.log(res.data)})}

	return (
		<div className='center' >
			<p>currently logged in as {currentUser.name}</p>
			<button onClick={(e) => {props.unloggin()}} >log out</button>
			{msg.map((e) => 
				// console.log(e)
				<p>{e.name}: {e.content}</p>
			)}
			<input placeholder='type your message' /><button>send</button>
		</div>
	)
}


