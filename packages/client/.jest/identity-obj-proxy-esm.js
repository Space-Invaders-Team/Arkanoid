// Modified identity-obj-proxy.

// This works around the fact we use CSS-modules.
// https://github.com/keyz/identity-obj-proxy/issues/8
const proxy = new Proxy(
  {},
  {
    get: function getter(target, key) {
      switch (key) {
        case "__esModule":
          return true;
        case "default":
          return proxy;
        default:
          return key;
      }
    }
  }
);
module.exports = proxy;
