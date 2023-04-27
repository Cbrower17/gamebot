import Comment from './comment';

export default function Comments({comment}) {
  const allComments = <Comment />

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
      <thead>
      <tr>
        <th>User</th>
        <th>Comment</th>
        <th>Remove</th>
        <th>Votes</th>
      </tr>
    </thead>
        <tbody>{allComments}</tbody>
      </table>
    </div>
  );
}