const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.log("------------Logger Error HIT--------");
  console.error(...params);
};

module.exports = {
  info,
  error,
};
