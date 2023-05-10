import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {useEffect,useState} from 'react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { Unity, useUnityContext } from "react-unity-webgl";

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


  function handleSubmitNewUser(e) {
    console.log("submitting...")
    e.preventDefault();
    const data = {
      
      "username":newusername,
      "password": newpassword,
      "profile_picture":profilePicture,
      "email": email,

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
      
<div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: `../public/logo-no-background.png` }}
    >
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <form onSubmit={handleSubmitlogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            className="input input-bordered w-full max-w-xs"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            className="input input-bordered w-full max-w-xs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <button onClick={handleLogout} className="mt-4 btn btn-secondary">Logout</button>
    </div>
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <form onSubmit={handleSubmitNewUser}>
        <div className="mb-4">
          <label htmlFor="newusername" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="newusername"
            className="input input-bordered w-full max-w-xs"
            type="text"
            value={newusername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            className="input input-bordered w-full max-w-xs"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="newpassword"
            className="input input-bordered w-full max-w-xs"
            type="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input
            id="profilePicture"
            className="input input-bordered w-full max-w-xs"
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
        </div>
      
      
      </>
    )
  }
}
