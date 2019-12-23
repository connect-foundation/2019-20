/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
global.matchMedia =
  global.matchMedia ||
  function foo() {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
