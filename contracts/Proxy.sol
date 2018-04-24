pragma solidity ^0.4.18;

import "./Ownable.sol";
import "./StorageState.sol";

contract Proxy is StorageState , Ownable {
   
  function Proxy(KeyValueStorage storage_ , address _owner) public {
    _storage = storage_;
    _storage.setAddress("owner",_owner)
    
  }

  event Upgraded(address indexed implementation);

  address public _implementation;

  function implementation() public view returns (address) {
    return _implementation;
  }

  function upgradeTo(address impl) public onlyOwner {
    require(_implementation != impl);
    _implementation = impl;
    Upgraded(impl);
  }
 
  function () payable public {
    address _impl = implementation();
    require(_impl != address(0));
    bytes memory data = msg.data;

    assembly {
      let result := delegatecall(gas, _impl, add(data, 0x20), mload(data), 0, 0)
      let size := returndatasize
      let ptr := mload(0x40)
      returndatacopy(ptr, 0, size)
      switch result
      case 0 { revert(ptr, size) }
      default { return(ptr, size) }
    }
  }

}