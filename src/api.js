import axios from 'axios';

export default class api {
  constructor(url) {
    this.url = 'https://www.meethue.com/api/';
    this.bridge = null;
    this.bridgeIp = null;
  }

  setup() {
    if (sessionStorage.getItem('username')) {
      console.log(sessionStorage.getItem('username'));
      this.getBridges()
        .then(data => {
          this.bridge = data[0];
          this.bridgeIp = this.bridge.internalipaddress;
          this.groups(sessionStorage.getItem('username'));
        });
    } else {
      this.getBridges()
        .then(data => {
          this.bridge = data[0];
          this.bridgeIp = this.bridge.internalipaddress;
          this.prompForBridgePress();
        });
    }
  }

  getBridges() {
    return axios
      .get('https://www.meethue.com/api/nupnp')
      .then(res => {
        return res.data;
      });
  }

  prompForBridgePress() {
    const result = window.confirm('Press the button on your Hue Bridge then click OK');

    if (result) {
      this.createUser()
      .then(data => {
        // TODO: Store in localStorage "hue_username"
        // K4wVpeukrCX76j-k1qe5ezRmMadPVafc2wzqWXTW
        console.log('User ID: ', data);
        sessionStorage.setItem('username', data.username);
        this.groups(data.username);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
    }
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

  groups(username) {
    axios
      .get(`http://${this.bridgeIp}/${username}/groups`)
      .then(data => {
        console.log(data);
      });
      // .then(res => filter(res.data, { type: 'Room' }));
  }
};
