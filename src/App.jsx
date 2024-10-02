import { useEffect, useState } from "react";
import { getComments } from "./data/getComments";

function App() {
  const [commentList, setCommentList] = useState();
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: commentList?.length + 1,
      body: comment,
      postId: 242,
      likes: 0,
      user: {
        id: 105,
        username: "lilyy",
        fullName: "Gelila Hamid",
      },
    };

    const newCommentList = [...commentList, newComment];
    updateCommentList(newCommentList);
  };

  const handleDelete = (id) => {
    const updatedComments = commentList.filter((comment) => comment.id !== id);
    updateCommentList(updatedComments);
  };

  const handleInputText = (e) => {
    setComment(e.target.value);
    localStorage.setItem("inputText", e.target.value);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments();
        updateCommentList(res);
      } catch (e) {}
    };

    const comments = JSON.parse(localStorage.getItem("savedComment"));

    if (!comments || comments.length == 0) {
      fetchComments();
    } else {
      setCommentList(comments);
    }

    const savedText = localStorage.getItem("inputText");
    if (savedText) {
      setComment(savedText);
    }
  }, []);

  const updateCommentList = (comments) => {
    setCommentList(comments);
    localStorage.setItem("savedComment", JSON.stringify(comments));
  };

  return (
    <>
      <main className="py-4 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Comments ({commentList?.length})
            </h2>
          </div>
          <form className="mb-6" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                onChange={handleInputText}
                value={comment}
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800 transition-all"
            >
              Post comment
            </button>
          </form>
          {commentList
            ?.sort((a, b) => b.id - a.id)
            .map(({ id, body, likes, user }) => {
              return (
                <article
                  key={id}
                  className="p-4 mb-2 text-base bg-white/60 rounded-lg border-t border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                          alt="Michael Gough"
                        />
                        {user?.username}
                      </p>
                      <div className="flex gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          className="w-3 h-3 m-auto stroke-gray-400"
                        >
                          <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">{likes}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="w-3 h-3 fill-gray-600"
                      >
                        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-500">{body}</p>
                </article>
              );
            })}
        </div>
      </main>
    </>
  );
}

export default App;
