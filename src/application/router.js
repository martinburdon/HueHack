import { Router } from 'orchestra';
import HomeRoute from '../pages/home/route.js';


export default Router.extend({
  routes: {
    '': 'home'
  },

  initialize(options) {
    console.log('Router init');
    this.layout = options.layout;
  },

  home() {
    console.log('home route');
    return new HomeRoute({
      container: this.layout.getRegion('main')
    });
  },

  showLayout() {

  }
});
