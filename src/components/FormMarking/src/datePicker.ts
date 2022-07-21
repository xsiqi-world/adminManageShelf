import data from './datas/datePicker.json';
import registerConfig from './main';
import DatePicker from './components/DatePicker.vue';

const dateTimePicker = registerConfig.register({
  ...data,
  type: 'datetime',
  component: DatePicker
});

const daterangePicker = registerConfig.register({
  ...data,
  type: 'daterange',
  component: DatePicker
});

export default {
  'dateTimePicker': dateTimePicker,
  'daterangePicker': daterangePicker,
};