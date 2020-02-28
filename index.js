const fs = require('fs');

module.exports = class ip2cc {
  constructor(options) {
    if (typeof options === 'string') {
      options = {file: options};
    }
    this.database = fs.readFileSync(options.file).toString().split('\r\n').map(line => {
      let [start, end, code, country] = line.split('","');
      start = parseInt(String(start).substr(1), 10);
      end = parseInt(end, 10);
      country = String(country).slice(0, -1);
      return {start, end, code, country};
    });
  }
  static convertAddress(strAddress) {
    const bytes = String(strAddress).split('.');
    let address = 0;
    for (let i = 0; i < 4; i++) {
      address += (Math.pow(256, i) * bytes[3 - i]);
    }
    return address;
  }
  bisectCountry(address, start, end, recursion = 0) {
    if (typeof start === 'undefined') {
      start = 0;
    }
    if (typeof end === 'undefined') {
      end = this.database.length - 1;
    }
    let pos = start + Math.floor((end - start) / 2);
    if (address >= this.database[pos].start && address <= this.database[pos].end) {
      return this.database[pos];
    }
    if ((end - start) < 3) {
      return {code: '-', country: '-'};
    }
    if (address < this.database[pos].start) {
      return this.bisectCountry(address, start, pos, ++recursion);
    }
    if (address > this.database[pos].end) {
      return this.bisectCountry(address, pos, end, ++recursion);
    }
  }
  lookup(address) {
    return Object.assign({address}, this.bisectCountry(ip2cc.convertAddress(address)));
  }
};0