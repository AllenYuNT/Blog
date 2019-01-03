<!-- ajax -->
<template>
    <div class="ajax">
        <button @click="login">login</button>
        <button @click="postData">post</button>
    </div>
</template>

<script>
export default {
    name: 'ajax',
    data () {
        return {
        };
    },

    components: {},

    methods: {
        login() {
            this.$api.get('/login').then(res => {
                console.log(res);
                sessionStorage.setItem('token', `Bearer ${res.token}`)
            })
        },
        postData() {
            this.$api.post('/testPost').then(res => {
                console.log(res);
            })
        }
    },
}

</script>

<style scoped lang='less'>
</style>