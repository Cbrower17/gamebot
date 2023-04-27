import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home({currUser,setcurrUser, loggedIn}) {
  const router = useRouter()
  
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [newusername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [display, setDisplay] = useState("Hello")
  const [num, setNum] = useState(0)
  
  console.log(currUser,loggedIn)
  if(currUser){
    console.log("Pushing")
    router.push('/home')
    }
  
    //boiler login function that checks valid login
  function login(data){
    fetch("/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  .then(r => r.json())
  .then(user=>{
    if(user['errors']){
      console.log('something went wrong', user['errors'])
    }else{
      setcurrUser(user)
      console.log("Pushing")
    router.push('/home')
    }}
  
  )
  }


  function handleSubmitlogin(e) {
    console.log("submitting...")
    e.preventDefault();
    const data = {
      
      "username": username,
      "password": password,
      
      

    }
    login(data)
  }


  function handleSubmitnewuser(e) {
    console.log("submitting...")
    e.preventDefault();
    const data = {
      
      "password": newpassword,
      "email": email,
      "username":newusername,
      "profile_picture":profilePicture,

    }
    
    
    fetch("/users",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    .then(r => r.json())
    .then(user=>setUser(user))
    .then(() => {
      console.log(user, "in handle submit new")
      console.log("new guy on the block")
      login(user)
      
      // handlelogin()

      
    })

    
  }
  
  function handleLogout(e) {
    e.preventDefault();
    fetch("/logout",{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    setcurrUser(null)
    router.push('/')
  }
  
  // function checktype(e) {
  //   e.preventDefault();
  //   fetch("/get_type")
  //   .then(r => r.json())
  //   .then(data => console.log(data))
  // }

  if (currUser) {
    return (
    <>
    <h2>Welcome, {currUser.username}!</h2>
    <h2>Loading site</h2>
      
    </>
    );
  } else {
    
    return (
      <>
      <Link as = {`user/${'test'}`} href="/user/[something]">Link</Link>
      <button onClick={handleLogout}>logout </button>
      <form onSubmit={handleSubmitlogin}>
        <p>Username</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p>password</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <form onSubmit={handleSubmitnewuser}>
        <p>Username</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={newusername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <p>Name</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>email</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>password</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p>Profile Picture URL</p>
        <input
        className="input input-bordered w-full max-w-xs"
          type="text"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      </>
    )
  }
}
