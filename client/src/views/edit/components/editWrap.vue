<!-- editWrap -->
<template>
    <div class="editWrap">
        <textarea v-model="editData" @input="changeValue" @keydown.tab="tab" />
    </div>
</template>

<script>
    export default {
        name: 'editWrap',
        data() {
            return {
                editData: ''
            };
        },

        props: {
            savedData: String
        },

        components: {},

        mounted() {
            this.editData = this.savedData;
        },

        methods: {
            changeValue() {
                this.$emit("returnEditValue", this.editData)
            },

            tab(e) { // 屏蔽teatarea tab默认事件
                this.editData = this.editData + "    ";
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            },
            savedDataSuccess() {
                this.editData = '';
            }
        }

    }
</script>

<style scoped lang='less'>
    .editWrap {
        textarea {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            line-height: 25px;
        }
    }
</style>