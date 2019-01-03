const DBUser = require('../model/User');
const bcrypt = require('../middlewares/bcrypt');
const config = require('../app_config');
const jwt = require('jsonwebtoken');

class User {
    static async login (ctx) {
        return await DBUser.findByName('allenyu').then(async res => {
            let data = res.dataValues;
            if(await bcrypt.validate('yupeng', data.password)) {
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
        })
    }
}

module.exports = User;
