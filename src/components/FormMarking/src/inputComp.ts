import data from './datas/inputComp.json';
import registerConfig from './main';
import inputComp from './components/inputComp.vue';

const textInput = registerConfig.register({
  ...data,
  type: 'text',
  componentName: 'inputComp',
  component: inputComp
});

const passwordInput = registerConfig.register({
  ...data,
  type: 'password',
  componentName: 'inputComp',
  component: inputComp
});


// export default registerConfig;
export default {
  'textInput': textInput,
  'passwordInput': passwordInput,
};