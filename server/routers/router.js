const Router = require('koa-router');
const router = new Router();

const Test = require('../controller/Test');
const User = require('../controller/User');
const Blog  = require('../controller/Blog');

router.get('/', ctx => {
    ctx.body = 'Server Is Running';
});

router.post('/testPost', Test.testPost);

router.post('/login', User.login);

router.post("/saveBlog", Blog.saveBlog);
router.post("/getBlog", Blog.getBlog);
router.get('/getBlog', Blog.getBlogById);
router.post("/updateBlog", Blog.updateBlog);

module.exports = router;