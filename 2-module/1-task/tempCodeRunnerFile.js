const limitStream = new LimitSizeStream({limit: 3});
function onData(line) {
  console.log(line);
}

limitStream.on('data', onData);

limitStream.write('a');
limitStream.write('фg');
limitStream.end();