const isCi = process.env.CI !== undefined;

console.log('Is CI: ', process.env.CI);

if (isCi) {
  console.log('Skip husky installation.');
}

if (!isCi) {
  try {
    require('husky').install();
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') throw e;
  }
}
