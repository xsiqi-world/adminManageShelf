<template>
  <div class="checkbox" :class="[props.checkedKeys.indexOf(String(props.id)) >= 0 ? 'is-checked' : '']"
    @click="emit('change', props)">
    <span>{{ props.title }}</span>
  </div>
</template>

<script setup lang="ts">
import { PropType, getCurrentInstance, inject } from 'vue';

// const checkedChange: any = inject('checkedChange');
// const checkedKeys: any = inject('checkedKeys');
// const { emit }: any = getCurrentInstance();

export interface Props {
  id?: string | number,
  title?: string,
  checkedKeys: Array<string | number>,
}

const emit = defineEmits(['change']);

const props = withDefaults(defineProps<Props>(), {
  id: 1,
  title: 'title',
  checkedKeys: Array
});

</script>

<style lang="scss" scoped>
.checkbox {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // width: 81px;
  height: 32px;
  line-height: 1;
  padding: 6px 18px;
  // height: 93px;
  // line-height: 93px;
  // margin: 0 auto;
  // padding: 6px 18px;
  text-align: center;
  color: #4abe84;
  background-color: #fff;
  border-radius: 7px;
  // box-shadow: 0px 2px 7px 0px rgba(85, 110, 97, 0.35);
  // border: 1px solid rgba(74, 190, 132, 1);
  border: 1px solid #dcdfe6;
  cursor: pointer;
  transition: all 0.2s linear;
  overflow: hidden;
}

.checkbox>span {
  display: inline-flex;
  align-items: center;
}

.checkbox.is-checked {
  border: 1px solid rgba(74, 190, 132, 1);
  box-shadow: 0px 2px 7px 0px rgba(85, 110, 97, 0.35);
}

.checkbox.is-checked:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border: 10px solid #4abe84;
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.checkbox.is-checked:after {
  content: '';
  position: absolute;
  width: 3px;
  height: 7px;
  right: 1px;
  top: -2px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
}
</style>