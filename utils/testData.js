export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  glitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
};

export const MESSAGES = {
  loginError: 'Epic sadface: Username and password do not match any user in this service',
  lockedError: 'Epic sadface: Sorry, this user has been locked out.',
};

export const SORT = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLH: 'lohi',
  priceHL: 'hilo',
};
