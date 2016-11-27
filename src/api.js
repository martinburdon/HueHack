import axios from 'axios';

export default class api {
  constructor(url) {
    this.url = 'https://www.meethue.com/api/';
  }

  setup() {
    this.getBridges()
      .then(data => {
        this.bridge = data[0];
        this.createUser()
        .then(data => {
          console.log('User ID: ', data);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
      });
  }

  getBridges() {
    // return new Promise((resolve, reject) => {
    return axios
      .get('https://www.meethue.com/api/nupnp')
      .then(res => {
        return res.data;
      });
    // });
  }

  createUser() {
    return new Promise((resolve, reject) => {
      axios
        .post(`http://${this.bridge.internalipaddress}/api`, {
          devicetype: 'testDevice'
        })
        .then(res => {
          const data = res.data[0];

          if (data.success) {
            resolve(data.success);
          } else if (data.error) {
            reject(data.error);
          }
        });
      });
  }
};
