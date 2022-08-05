import data from './datas/inputComp.json';
import registerConfig from './main';
import InputComp from './components/InputComp.vue';

const textInput = registerConfig.register({
  ...data,
  type: 'text',
  label: '单行文本',
  component: InputComp
});

const passwordInput = registerConfig.register({
  ...data,
  type: 'password',
  label: '密码输入',
  component: InputComp
});


// export default registerConfig;
export default {
  'textInput': textInput,
  'passwordInput': passwordInput,
};