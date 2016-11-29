import { Route } from 'orchestra';
import View from './view.js';

export default Route.extend({
  initialize(options) {
    console.log('home route init');
    this.container = options.container;
  },

  render() {
    console.log('home render');
    this.container.show(new View());
  }
});
