import { View } from 'orchestra';
import template from './layout.hbs';

export default View.extend({
  tagName: 'the-site',

  template,

  initialize() {
    console.log('layout init');
  }
});
