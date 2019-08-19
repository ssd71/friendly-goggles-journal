import React from 'react';
import components from '../components';
import '../styles/postform.css';

const { PostForm } = components.Containers.Posts;

const Post = () => (
  <PostForm purpose="New post" submitAction="/api/post">
    {
          ({ postdata, setPostdata }) => (
            <>
              <input
                type="text"
                className="input__title"
                value={postdata.title}
                onChange={(event) => setPostdata({
                  ...postdata,
                  title: event.target.value,
                })}
                placeholder="Enter post title"
              />
              <br />
              <textarea
                className="input__content"
                value={postdata.content}
                onChange={(event) => setPostdata({
                  ...postdata,
                  content: event.target.value,
                })}
                placeholder="Enter post content"
              />
            </>
          )
        }
  </PostForm>
);

export default Post;
