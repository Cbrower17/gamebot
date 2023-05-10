import Comment from "./comment"
import CommentForm from "./commentform";

export default function CommentSection({comments, activeUser})
{
    
    let allComments = comments.map((comment) => (
        <Comment key={comment.id} comment = {comment} />
      ))
    return (
        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion ({comments.length})</h2>
          </div>
          <CommentForm activeUser = {activeUser} />
          {/* Comments */}
          {allComments}
        </div>
      </section>
       );
    };
    
    