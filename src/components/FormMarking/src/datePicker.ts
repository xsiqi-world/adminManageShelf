import data from './datas/selectComp.json';
import registerConfig from './main';
import DatePicker from './components/DatePicker.vue';

const dateTimePicker = registerConfig.register({
  ...data,
  type: 'datetime',
  componentName: 'DatePicker',
  component: DatePicker
});

const daterangePicker = registerConfig.register({
  ...data,
  type: 'daterange',
  componentName: 'DatePicker',
  component: DatePicker
});

export default {
  'dateTimePicker': dateTimePicker,
  'daterangePicker': daterangePicker,
};