import PostsContainer from './Containers/Posts/PostsContainer';
import FormContainer from './Containers/User/FormContainer';
import DashboardContainer from './Containers/Posts/DashboardContainer';
import Dashboard from './Display/Posts/Dashboard';
import PostGrid from './Display/Posts/PostGrid';
import PostForm from './Containers/Posts/PostForm';

export default {
  Containers: {
    Posts: {
      PostsContainer,
      DashboardContainer,
      PostForm,
    },
    User: {
      FormContainer,
    },
  },
  Display: {
    Posts: {
      Dashboard,
      PostGrid,
    },
  },
};
