import React from 'react';
import components from '../components';
import '../styles/dashboard.css';

const { PostsContainer, DashboardContainer } = components.Containers.Posts;
const { Dashboard, PostGrid } = components.Display.Posts;

const dashboard = () => (
  <PostsContainer>
    {
      (props) => (
        <DashboardContainer {...props}>
          {
            (props) => (
              <Dashboard {...props}>
                {
                  (props) => (
                    <PostGrid {...props} />
                  )
                }
              </Dashboard>
            )
          }
        </DashboardContainer>
      )
    }
  </PostsContainer>
);

export default dashboard;
