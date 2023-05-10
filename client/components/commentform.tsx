import {useEffect,useState} from 'react'
export default function CommentForm({activeUser}){
    const [comment,setComment] = useState('');

    useEffect(()=>{
        
    },[handleSubmitComment])
    console.log("currUser",activeUser)
    function handleSubmitComment(e){
        e.preventDefault()
        let data = {
            "content" : comment,
            "user_id" : activeUser.id,

        }
        fetch("/comments",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
        .then(r => r.json())
        .then(comment=>{
          if(comment['errors']){
            console.log('something went wrong', comment['errors'])
          }else{
            
            console.log("Pushing")
            console.log(comment)
          
          }})
    }
    return (
        <form className="mb-6" onSubmit={(e)=>handleSubmitComment(e)}>
            {/* Comment form */}
            <div className="flex flex-col">
              <label htmlFor="comment" className="block text-gray-700 dark:text-gray-300">
                
                <textarea  value = {comment} onChange={(e)=> setComment(e.target.value)} id="comment" placeholder="Comment" className="border-gray-300 dark:border-gray-700 px-4 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-full" />
              </label>
              <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-blue-500 focus:outline-none">
                Post Comment
              </button>
            </div>
          </form>
    )

}