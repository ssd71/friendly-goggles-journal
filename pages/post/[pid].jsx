import React from 'react';
import { useRouter } from 'next/router';
import components from '../../components';
import '../../styles/postform.css';

const { PostForm } = components.Containers.Posts;

const post = () => {
  const Router = useRouter();
  const { pid } = Router.query;
  return (
    <PostForm post={post} pid={parseInt(pid, 10)} purpose="Edit post" submitAction={`/api/post/${pid}`}>
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
};

export default post;
