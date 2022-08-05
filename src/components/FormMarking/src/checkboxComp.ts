import data from './datas/checkboxComp.json';
import registerConfig from './main';
import CheckboxComp from './components/CheckboxComp.vue';

const checkboxComp = registerConfig.register({
  ...data,
  label: '多选框',
  component: CheckboxComp
});

export default {
  'checkboxComp': checkboxComp,
};