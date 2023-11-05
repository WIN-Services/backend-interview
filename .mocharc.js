module.exports = {
    require: ['test/lib.js'],
    file: ['test/setup.js'],
    exit: true,
    recursive: true,
    'full-trace': true,
    timeouts: 0,
    spec: ['unit_test/**/*.spec.js']
};