const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.str = '';
  }
  
  _transform(chunk, encoding, cb) {
    this.str += chunk.toString();
    const line = this.str.split(os.EOL);
    
    if (line.length > 1) { line.forEach((val) => {
          this.push(val);
        });
        }

cb();
  }
  
 
}

module.exports = LineSplitStream;
