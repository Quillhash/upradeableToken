/* global describe it artifacts */
const KeyValueStorage = artifacts.require("KeyValueStorage")
const Proxy = artifacts.require("Proxy")

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(KeyValueStorage).then(function() {
    return deployer.deploy(Proxy, KeyValueStorage.address, accounts[0]);
  });
};
