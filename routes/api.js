const { Router } = require('express');

module.exports = ({ User, Post }) => {
  const router = Router();
  router.use('/api', (req, res, next) => {
    console.log('in get api/: ', req.headers.cookie);
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401);
      res.send({ message: 'Umm.. Maybe try logging in?' });
    }
  });
  router.get('/api/posts', async (req, res) => {
    try {
      const user = await User.query().findById(req.user.id);
      const posts = await user.$relatedQuery('posts');
      console.log(JSON.stringify(posts));
      res.send(posts);
    } catch (err) {
      res.status(500);
      const message = process.env.NODE_ENV === 'development' ? err : 'Internal Server Error';
      res.send({ message });
    }
  });

  router.get('/api/post/:postid', async (req, res) => {
    try {
      const post = await Post.query().findById(req.params.postid);
      if (post.user_id === req.user.id) {
        res.send(post);
      } else {
        res.status(403);
        res.send({ message: 'Sorry, you can\'t access this resource :-(' });
      }
    } catch (err) {
      res.status(500);
      const message = process.env.NODE_ENV === 'development' ? err : 'Internal Server Error';
      res.send({ message });
    }
  });

  router.post('/api/post', async (req, res) => {
    try {
      const user = await User.query().findById(req.user.id);
      const post = await Post.createPost(user, req.body);
      res.send({ id: post.id });
    } catch (err) {
      res.status(500);
      const message = process.env.NODE_ENV === 'development' ? err : 'Internal Server Error';
      res.send({ message });
    }
  });

  router.post('/api/post/:postid', async (req, res) => {
    try {
      const n = await Post.query().findById(req.params.postid).patch(req.body);
      res.send({ numUpdated: n });
    } catch (err) {
      res.status(500);
      const message = process.env.NODE_ENV === 'development' ? err : 'Internal Server Error';
      res.send({ message });
    }
  });

  router.get('/api/deletepost/:postid', async (req, res) => {
    const { postid } = req.params;
    const post = await Post.query().findById(postid);
    const user = await User.query().findById(req.user.id);
    if (post.user_id === req.user.id) {
      await Post.deletePost(user, { postid });
      res.redirect('/dashboard');
    } else {
      res.status(403);
      res.send({ message: 'Sorry, you can\'t access this resource :-(' });
    }
  });

  router.get('/api/user', (req, res) => {
    res.send(req.user.username);
  });

  return router;
};
