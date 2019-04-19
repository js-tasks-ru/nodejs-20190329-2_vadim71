const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.str = '';
  }
  
  _transform(chunk, encoding, cb) {
    this.str += chunk.toString();
    this.str.split(os.EOL)
        .forEach((val) => {
          this.push(val);
});

cb();
  }
  
 
}

module.exports = LineSplitStream;
