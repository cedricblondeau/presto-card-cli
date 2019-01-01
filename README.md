# presto-card-cli ![Build Status](https://api.travis-ci.org/cedricblondeau/presto-card-cli.svg?branch=master)

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/you-didnt-ask-for-this.svg)](http://forthebadge.com)

A CLI tool for checking your Presto card balance.

![demo gif](https://raw.githubusercontent.com/cedricblondeau/presto-card-cli/master/demo.gif)

I wrote about this tool on my blog: https://blog.cedricblondeau.com/2017/12/23/check-your-presto-card-balance-in-a-terminal-using-presto-card-cli/

## Install

```bash
yarn global add presto-card-cli
```

Requires NodeJS 6+.

## Usage

The tool requires the user to set up credentials before accessing the balance.

```bash
# Set credentials
presto-card set-credentials
 ? Enter a Presto account username: <username>
 ? Enter the password for this Presto account: <password>

# Print balance for a given user, username is a required argument
presto-card balance <username>
```

## How does it work?

#### Password management

This tool uses [node-keytar](https://github.com/atom/node-keytar) to store credentials. On macOS the passwords are managed by the Keychain, on Linux they are managed by the Secret Service API/libsecret, and on Windows they are managed by Credential Vault.

#### Get the balance

This tool uses [presto-card-js](https://github.com/bitbearstudio/presto-card-js) as a back end.

## Common issues

#### `SyntaxError: Unexpected token` error

This may happen when using an old version of NodeJS. This tool requires NodeJS 6+.

#### `Error: Module version mismatch. Expected 48, got 59.` or equivalent

This may happen if `presto-card-cli` has been installed with a different version of NodeJS than the current one. Re-installing may help.

## FAQ

#### Q: I have only one card and it's kind of boring to type my username again and again when I want to check my balance. Can't we set up a default account?

Not at this time. But we can create an alias in the meantime.
For example: `alias pb='presto-card balance supercat'`

#### Q: What if I don't have a Presto account? Can I use this tool with a Presto card number?

Not at this time.

## License

GNU Affero General Public License v3.0
