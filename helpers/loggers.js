const chalk = require('chalk');

module.exports.successLog = (state = '', msg = '') =>
    console.log(chalk.bold.green(chalk.bgGreen.black(state), msg, '\n'));

module.exports.errorLog = (state = '', msg = '') =>
    console.log(chalk.bold.red(chalk.bgRed.black(state), msg, '\n'));

module.exports.noticeLog = (state = '', msg = '') =>
    console.log(chalk.bold.magenta(state, msg, '\n'));
