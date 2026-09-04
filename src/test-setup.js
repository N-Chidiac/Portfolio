// jsdom does not implement window.scrollTo; the router's scrollBehavior calls it
// on every navigation, which otherwise logs a "Not implemented" warning per test.
window.scrollTo = () => {};
