<!-- showWrap -->
<template>
    <div class="showWrap markdown" v-html="markedData">
    </div>
</template>

<script>
    export default {
        name: 'showWrap',
        data() {
            return {};
        },
        props: {
            markedData: String
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