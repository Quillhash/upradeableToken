
/* global describe it artifacts */





const KeyValueStorage = artifacts.require('KeyValueStorage')
const DelegateV1 = artifacts.require('DelegateV1')
const DelegateV2 = artifacts.require('DelegateV2')
const Proxy = artifacts.require('Proxy')

contract('Storage and upgradability example', async (accounts) => {
  it('should create and upgrade idap token', async () => {
    const keyValueStorage = await KeyValueStorage.new()
    let proxy = await Proxy.new(keyValueStorage.address,accounts[2])
    const delegateV1 = await DelegateV1.new()
    const delegateV2 = await DelegateV2.new()
    
    await proxy.upgradeTo(delegateV1.address)

    proxy = _.extend(proxy,DelegateV1.at(proxy.address));

     
    
   await proxy.setNumberOfOwners(10);
  let numOwnerV1 = await proxy.getNumberOfOwners();
  console.log(numOwnerV1.toNumber())
  
   await proxy.upgradeTo(delegateV2.address);
  
   proxy = DelegateV2.at(proxy.address);
   let previousOwnersState = await proxy.getNumberOfOwners();
   console.log(previousOwnersState.toNumber());
   await proxy.setNumberOfOwners(20,{from:accounts[2]});
  
   let numOfownersV2 = await proxy.getNumberOfOwners();
   console.log(numOfownersV2.toNumber());
    
   



    
  
   
   
});
});
