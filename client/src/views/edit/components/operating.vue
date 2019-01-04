<!-- operating -->
<template>
    <div class="operating">
        <div class="date-picker-wrap">
            <Date-picker v-model="timeValue" type="date" placeholder="选择日期" style="width: 200px; height:32px;"></Date-picker>
        </div>
        <div class="buttons-wrap">
            <button @click="saveData" class="save">提交</button>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'operating',
    data () {
        return {
            timeValue: new Date()
        };
    },

    props: {
        editData: String,
    },

    components: {},

    methods: {
        saveData() {
            this.$emit("saveData", this.timeValue)
        }
    },
}

</script>

<style scoped lang='less'>
.operating{
    text-align: right;
    .date-picker-wrap{
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
    .buttons-wrap{
        display: inline-block;
        button{
            cursor: pointer;
            height: 32px;
            line-height: 30px;
            width: 80px;
            border: 1px solid #ccc;
            border-radius: 5px;
            color: #fff;
            vertical-align: middle;
            margin-left: 10px;
            box-shadow: 2px 2px 4px #ccc;
            outline: none;
            &.save{
                background-color: #0ba0ef;
            }
            &.submit{
                background-color: #19be6b;
            }
        }
    }
}
</style>