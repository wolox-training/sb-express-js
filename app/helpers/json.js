const isJSON = object => {
  try {
    return typeof object === 'object' && object.constructor === Object;
  } catch (e) {
    return false;
  }
};

module.exports = {
  isJSON
};
