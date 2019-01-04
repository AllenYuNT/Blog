const Sequelize = require('sequelize');
const sequelize = require('../lib/db');

const Blog = sequelize.define('blog', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    postId: {
        type: Sequelize.STRING,
    },
    author: {
        type: Sequelize.STRING // 指定值的类型
    },
    date: {
        type: Sequelize.DATE
    },
    title: {
        type: Sequelize.STRING
    },
    md: {
        type: Sequelize.TEXT
    },
    pv: {
        type: Sequelize.INTEGER
    },
    comments: {
        type: Sequelize.STRING
    },
    mddata: {
        type: Sequelize.TEXT
    }
}, {
    // 如果为 true 则表的名称和 model 相同，即 user
    // 为 false MySQL创建的表名称会是复数 users
    // 如果指定的表名称本就是复数形式则不变
    tableName: 'blogs',
    freezeTableName: false,
    timestamps: false
});

exports.saveBlog = function(blogData) {
    return Blog.create({
        postId: blogData.postId,
        author: blogData.author,
        date: blogData.date,
        title: blogData.title,
        md: blogData.md,
        pv: blogData.pv || 0,
        comments: blogData.comments || '',
        mddata: blogData.mddata || ''
    })
}

exports.getBlogs = function( page, pageSize ) {
    pageSize = pageSize || 10;
    page = page || 1;
    return Blog.findAndCountAll({
        where: '',
        offset:(page - 1) * pageSize,
        limit: pageSize,
        order: [['date', 'DESC']]
    })
}

exports.getBlogById = function (id) {
    return Blog.findOne({
        where: {
            id: id
        }
    })
}
exports.updateBlog = function(data) {
    return Blog.update({
        date: data.date,
        title: data.title,
        md: data.md,
        mddata: data.mddata
    }, {
        where: {
            id: data.id
        }
    })
}

exports.addPv = function (id, pv) {
    return Blog.update({
        pv: pv
    }, {
        where: {
            id: id
        }
    })
}