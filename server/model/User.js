const Sequelize = require('sequelize');
const sequelize = require('../lib/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING, // 指定值的类型
    },
    password: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    avator: {
        type: Sequelize.STRING
    }
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    tableName: 'users',
    freezeTableName: false,
    timestamps: false
});

// 通过用户名查找用户
exports.findByName = function (username) {
    return User.findOne({
        where: {
            username: username
        }
    });
}