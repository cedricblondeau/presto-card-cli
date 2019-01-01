const { CannotLoginError, getBalance } = require('../balance.js');

describe('getBalance', () => {
  const mockBalanceData = {
    balance: '$30',
    lastUpdatedOn: new Date(),
  };
  const mockPrestoCardJs = {
    login: (username, password) => {
      if (password === 'goodpassword') return { success: true };
      return { success: false };
    },
    getBalance: () => mockBalanceData,
  };

  it('Raises CannotLoginError if invalid credentials', () => {
    expect.assertions(1);
    expect(
      getBalance(mockPrestoCardJs, 'cedric', 'badpassword'),
    ).rejects.toBeInstanceOf(CannotLoginError);
  });

  it('Returns balance data if valid credentials', () => {
    expect.assertions(1);
    expect(
      getBalance(mockPrestoCardJs, 'cedric', 'goodpassword'),
    ).resolves.toBe(mockBalanceData);
  });
});
