<!-- nav -->
<template>
    <div class="nav-wrap">
        <h3>Allen Yu's Blog</h3>
        <div class="nav">
            <router-link v-for="(item,i) in links" :key="i" :to="item.link">
                <sicon class="icon" :name="item.icon" scale="2.1" />
                <span>{{item.name}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'navigation',
        data() {
            return {
                links: [
                    {name: '首页', link: '/index', icon: 'index'},
                    // {name: '编辑', link: '/edit', icon: 'blog'},
                    {name: '归档', link: '/pigeonhole', icon:'all'}
                ]
            };
        },

        components: {},

    }
</script>

<style scoped lang='less'>
    .nav-wrap {
        width: 100%;
        height: 190px;
        text-align: center;
        // padding-bottom: 20px;
        border-bottom: 2px solid #eee;
        h3 {
            margin: 0 auto;
            margin-top: 60px;
            padding: 8px 15px;
            font-size: 15px;
            display: inline-block;
            background: #111;
            color: #fff;
            padding: 8px 10px;
            display: inline-block;
            background: #111;
            color: #fff;
        }

        .nav {
            margin-top: 30px;
            font-size: 13px;

            a {
                cursor: pointer;
                display: inline-block;
                text-align: center;
                padding: 5px 10px;
                color: #000;
                text-align: center;
                &.router-link-active{
                    color: rgb(128, 125, 125);
                }
                .icon {
                    display: block;
                    margin: 5px auto;
                }
                span{
                    font-size: 12px;
                }
            }
        }
    }
</style>