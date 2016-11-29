import { View } from 'orchestra';
import template from './layout.hbs';

export default View.extend({
  tagName: 'the-site',

  template,

  regions: {
    header: 'test-header',
    main: 'test-main',
    footer: 'test-footer'
  },

  initialize() {
    console.log('layout init');
  },

  onAttach() {
    console.log('Layout onAttach');
  }
});
