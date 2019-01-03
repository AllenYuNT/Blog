/**
 * @file blog.js
 *
 * @author yupeng(yupeng12@baidu.com)
 * @created: 2018/12/30
 */
const DBBlog = require('../model/Blog');
const lib = require('../middlewares/lib');


class Blog {
    static async saveBlog(ctx) {
        let req = ctx.request.body;
        let data = {
            postId: lib.GenNonDuplicateID(),
            author: req.author,
            date: req.date,
            title: req.title,
            md: req.md
        }
        await DBBlog.saveBlog(data).then(res => {
            if(res) {
                ctx.body = {
                    success: 'ok',
                    code: 200,
                    postId: res.postId
                };
            }else{
                throw [4100, '保存失败']
            }
            
        })
    }
    static async getBlog(ctx) {
        let data = ctx.request.body;
        await DBBlog.getBlogs(data.page, data.pageSize).then(res => {
            ctx.body = {
                success: 'ok',
                code: 200,
                data: res
            }
        })
    }
    static async getBlogById(ctx) {
        let id = ctx.request.query.id;
        await DBBlog.getBlogById(id).then(res => {
            ctx.body = {
                success: 'ok',
                code: 200,
                data: res
            };

            let pv = res.pv;
            DBBlog.addPv(res.id, ++pv);
        })
    }
}

module.exports = Blog;