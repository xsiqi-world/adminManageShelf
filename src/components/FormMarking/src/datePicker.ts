import data from './datas/datePicker.json';
import registerConfig from './main';
import DatePicker from './components/DatePicker.vue';

const dateTimePicker = registerConfig.register({
  ...data,
  type: 'datetime',
  label: '时间选择',
  component: DatePicker
});

const daterangePicker = registerConfig.register({
  ...data,
  type: 'daterange',
  label: '日期选择',
  component: DatePicker
});

export default {
  'dateTimePicker': dateTimePicker,
  'daterangePicker': daterangePicker,
};