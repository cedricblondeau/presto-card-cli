function CannotLoginError() {}

async function getBalance(prestoCard, username, password) {
  const loginResponse = await prestoCard.login(username, password);
  if (!loginResponse.success) {
    throw new CannotLoginError();
  }

  return prestoCard.getBalance();
}

module.exports = { CannotLoginError, getBalance };
