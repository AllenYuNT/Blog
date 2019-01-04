const DBUser = require('../model/User');
const bcrypt = require('../middlewares/bcrypt');
const config = require('../app_config');
const jwt = require('jsonwebtoken');

class User {
    static async login (ctx) {
        let {username, password} = ctx.request.body;
        return await DBUser.findByName(username).then(async res => {
            if(res) {
                let data = res.dataValues;
                if(await bcrypt.validate(password, data.password)) {
                    delete data.password;
                    return ctx.body = {
                        user: data,
                        code: 200,
                        msg: 'login success',
                        token: jwt.sign({
                            data: data,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60)
                        }, config.secret)
                    }
                }else {
                    throw [4001, '密码错误'];
                }
            }else {
                throw [4002, '用户不存在']
            }
            
        })
    }
}

module.exports = User;
