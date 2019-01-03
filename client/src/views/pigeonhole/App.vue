<!-- 归档 -->
<template>
    <div class="pigeonhole">
        <list-view />
    </div>
</template>

<script>
import listView from './components/listView'
export default {
    name: 'App',
    data () {
        return {
        };
    },

    components: {
        listView
    },

}

</script>

<style scoped lang='less'>
.pigeonhole {
    width: auto;
    height: auto;
}
</style>