pragma solidity ^0.4.18;

import "./DelegateV1.sol";
import "./StorageState.sol";
import "./Ownable.sol";
import "./StorageLibrary.sol";

contract DelegateV2 is StorageState {
    using StorageLibrary for KeyValueStorage;

    modifier onlyOwner() {
        require(
            msg.sender == _storage.getAddress("owner"),
            "msg.sender is not owner"
        );
        _;
    }

    function setNumberOfOwners(uint num) public onlyOwner {
        _storage.setUint("total", num);
    }
    function getNumberOfOwners() public view returns (uint) {
        return _storage.getUint("total");
    }

    function setProposalsLib(uint _proposals) public {
        _storage.setProposals(_proposals);
    }

    function getProposalsLib() public view returns (uint _libProposals) {
        return _storage.getPropsoals();
    }
}