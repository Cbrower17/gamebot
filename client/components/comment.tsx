import React from 'react';


export default function Comment({comment}) 
  {
    console.log(comment);
  return (
    <article className="p-6 mb-6 text-base bg-orange-100 rounded-lg dark:bg-gray-900 shadow">
      <footer className="flex justify-between items-center mb-2">
        {/* Comment metadata */}
        {comment.user.username}
        <img src={comment.user.profile_picture} className="w-10 h-10 rounded-full"/>
      </footer>
      <p className="text-black dark:text-gray-400 ">
        {comment.content}
      </p>
      <p className="text-gray-500 dark:text-gray-400">
        {comment.created_at}
      </p>
      <div className="flex items-center mt-4 space-x-4">
        <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
          like
        </button>
      </div>
    </article>
  );
};

