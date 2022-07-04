import data from './datas/selectComp.json';
import registerConfig from './main';
import SelectComp from './components/SelectComp.vue';

const selectComp = registerConfig.register({
  ...data,
  componentName: 'SelectComp',
  component: SelectComp
});

export default {
  'selectComp': selectComp,
};