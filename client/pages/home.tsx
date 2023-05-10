import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Unity, useUnityContext } from "react-unity-webgl";
import Game from "@/components/game";
import { Navbar, TextInput } from "flowbite-react";


export async function getServerSideProps() {
  const raw_comments = await fetch("http://127.0.0.1:5555/comments");
  const comment_data = await raw_comments.text();

  const comments = JSON.parse(comment_data);

  return {
    props: {
      comments,
    },
  };
}

export default function index({ comments, setcurrUser, currUser }) {
  const router = useRouter();
  console.log(currUser);

  function handleLogout(e) {
    e.preventDefault();
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setcurrUser(null);
    router.push("/");
  }
  if (router.isFallback) {
    return <div>loading</div>;
  }
  return (
    <>
      <Navbar
  fluid={true}
  rounded={true}
>
  <Navbar.Brand href="https://flowbite.com/">
    <img
      src="gamespot-website-favicon-color.png"
      className="mr-6 h-10 sm:h-20"
      alt="Flowbite Logo"
    />
    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      GameSpot
    </span>
  </Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse>
    <Navbar.Link
      href="/navbars"
      active={true}
    >
      Home
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      About
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Services
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Pricing
    </Navbar.Link>
    <Navbar.Link href="/navbars">
      Contact
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>
<div className="flex items-center justify-center h-screen">
  <div className="container mx-auto">
  <div>Welcome home, </div>
      <button onClick={handleLogout}>logout </button>
      <TextInput className=""/>
      <div>{comments[0].content}</div>
      <Game />
  </div>
</div>

      
    </>
  );
}
