/**
 * @file Test
 *
 * @author yupeng(yupeng12@baidu.com)
 * @created: 2018/12/27
 */

class Test {
    static async testPost(ctx) {
        let req = ctx.request.body;
        ctx.body = {
            "success": 'ok',
            req
        }
    }
}

module.exports = Test;