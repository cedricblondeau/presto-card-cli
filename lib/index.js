const axios = require('axios');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const chalk = require('chalk');
const inquirer = require('inquirer');
const { getAPIWrapperWithAxiosInstance } = require('presto-card-js');
const program = require('commander');
const validate = require('validate.js');

const { CannotLoginError, getBalance } = require('./balance.js');
const credentials = require('./credentials.js');

async function displayBalance(username) {
  const password = await credentials.getPassword(username);
  if (!password) {
    console.error('Cannot find password for given username.'); // eslint-disable-line no-console
    return;
  }

  const axiosInstance = axiosCookieJarSupport(axios);
  axiosInstance.defaults.jar = true;
  const prestoCard = getAPIWrapperWithAxiosInstance(axiosInstance);
  try {
    const balanceData = await getBalance(prestoCard, username, password);
    const message = chalk`Balance for card #{red ${
      balanceData.cardNumber
    }} is {blue ${balanceData.balance}}.`;
    console.log(message); // eslint-disable-line no-console
  } catch (e) {
    if (e instanceof CannotLoginError) {
      console.error('Cannot login. Please check provided credentials.'); // eslint-disable-line no-console
    } else {
      console.error('Something wrong happened. Please try again.'); // eslint-disable-line no-console
    }
  }
}

async function setCredentials() {
  const questions = [
    {
      message: 'Enter a Presto account username:',
      name: 'username',
      type: 'input',
      validate: username =>
        validate.isString(username) && !validate.isEmpty(username),
    },
    {
      message: 'Enter the password for this Presto account:',
      name: 'password',
      type: 'password',
      validate: username =>
        validate.isString(username) && !validate.isEmpty(username),
    },
  ];
  const answers = await inquirer.prompt(questions);
  await credentials.setPassword(answers.username, answers.password);
}

program.version('2.0.0');

program
  .command('balance <username>')
  .description('Display balance info for a given account')
  .action(displayBalance);

program
  .command('set-credentials')
  .description('Set credentials')
  .action(setCredentials);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);
