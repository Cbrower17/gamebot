import React, { useState } from "react";
export default function Comment({ comment}) {
  const [count, setCount] = useState(comment.commentVotes);
  function handleCLickUp() {
    const newCount = count + 1;
    setCount(() => newCount);
  }
  function handleCLickDown() {
    const newCount = count - 1;
    setCount(() => newCount);
    
  }
  function handleRemove(){
    

  }
  return (
    <tr >
        <td>{comment.user}:</td>
        <td >{comment.content}</td>
        <td><button className="btn sm w-15 rounded-full" onClick={()=>handleRemove()}>
          remove
        </button>
        </td>
        <td className= "">
            <button className="inline-grid" onClick={()=>handleCLickUp()}><img src="./src/assets/up.png" className="w-4"/></button>
            <p className="inline-grid">{count}</p>
            <button className="inline-grid" onClick={()=>handleCLickDown()}><img src="./src/assets/down.png" className="w-4"/></button>
        </td>
    </tr>
  );
}