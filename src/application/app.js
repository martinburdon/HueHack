import { Application, history, History } from 'orchestra';
import Layout from './layout.js';
import Router from './router.js';

export default Application.extend({
  region: 'site',

  initialize() {
    console.log('init');
    this.layout = new Layout();
    this.router = new Router({
      layout: this.layout
    });

    if (!History.started) {
      history.start({
        pushState: true
      });
    }
  }
});
