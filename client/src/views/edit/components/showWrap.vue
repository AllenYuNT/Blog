<!-- showWrap -->
<template>
    <div class="showWrap markdown" v-html="editData">
    </div>
</template>

<script>
    export default {
        name: 'showWrap',
        data() {
            return {};
        },
        props: {
            editData: String
        },

        components: {},

    }
</script>

<style scoped lang='less'>
    .showWrap {
        white-space: pre-wrap;
        overflow-y: auto;
    }
</style>