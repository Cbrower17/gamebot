import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Unity, useUnityContext } from "react-unity-webgl";
import Game from "@/components/game";
import { Navbar, TextInput } from "flowbite-react";
import NavigationBar from "@/components/navigationBar";


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
     <NavigationBar />

      
    </>
  );
}
