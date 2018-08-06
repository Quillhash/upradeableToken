/* global describe it artifacts */
const StorageLibrary = artifacts.require('StorageLibrary')
const DelegateV1 = artifacts.require('DelegateV1')
const DelegateV2 = artifacts.require('DelegateV2')

module.exports = async function(deployer, network, accounts) {
  deployer.deploy(StorageLibrary).then(function() {
    return deployer.link(StorageLibrary, DelegateV2);
  }).then(function() {
    return deployer.deploy(DelegateV2);
  }).then(function() {
    return deployer.deploy(DelegateV1);
  });

  
};
