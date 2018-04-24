module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
      //from: '0xcc42b083231d36976a1e018ee219fd37f0079741'
    }
  },
  solc: {
		optimizer: {
			enabled: true,
			runs: 200
		}
	},

};
