module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      // port: 8545,
      port: 9545, // Truffle Develop
      network_id: "*" // Match any network id
      //from: '<address>' 
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  } 
};
