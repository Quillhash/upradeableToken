
/* global describe it artifacts */
const KeyValueStorage = artifacts.require('KeyValueStorage')
const DelegateV1 = artifacts.require('DelegateV1')
const DelegateV2 = artifacts.require('DelegateV2')
const ProxyContract = artifacts.require('Proxy')

contract('Storage and upgradability example', async (accounts) => {
  let proxy, delegateV1, delegateV2
  
  it('initalize test', async() => {
    proxy = await ProxyContract.deployed()
    delegateV1 = await DelegateV1.deployed()
    delegateV2 = await DelegateV2.deployed()
  });
  

  it('should create and upgrade idap token', async () => {
    // Initalize the proxy with the first delegate version 1.
    await proxy.upgradeTo(delegateV1.address)
    // Setup the proxy receive function calls as if it were acting as
    //  the delegate.
    proxy = _.extend(proxy,DelegateV1.at(proxy.address));

    await proxy.setNumberOfOwners(10);
    let numOwnerV1 = await proxy.getNumberOfOwners();
    console.log(numOwnerV1.toNumber())
    
    // Upgrade to the latest delegate version 2
    await proxy.upgradeTo(delegateV2.address);
    proxy = DelegateV2.at(proxy.address);

    let previousOwnersState = await proxy.getNumberOfOwners();
    console.log(previousOwnersState.toNumber());

    // Because version two has onlyOwner modifier added, this call will 
    //  only work if we are sending it from the owner address 
    await proxy.setNumberOfOwners(20, {from:accounts[0]});
    let numOfownersV2 = await proxy.getNumberOfOwners();
    console.log(numOfownersV2.toNumber());   
  });
  
  it('Set and Get proposals from KeyValue (Eternal) storage', async () => {
    // Set the imaginary "Proposals" value through the delegate library 
    //  "StorageLibrary"
    let testProps = 10;
    await proxy.setProposalsLib(testProps);
    let storageProps = await proxy.getProposalsLib();

    assert.equal(testProps, storageProps, "The storage props do not equal the test props.");
  });
});
