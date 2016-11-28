import { Application } from 'orchestra';
import Layout from './layout.js';

export default Application.extend({
  region: 'site',

  initialize() {
    console.log('init');
    this.layout = new Layout();
  }
});
