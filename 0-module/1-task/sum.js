function sum(a, b) {
  if (typeof(a) === 'number' && typeof(b) === 'number')
  return a+b;
else {
  throw TypeError('Not number');
  }
}
module.exports = sum;
