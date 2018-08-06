pragma solidity ^0.4.24;

import "./StorageState.sol";

library StorageLibrary {
    function setProposals(KeyValueStorage _storage, uint _proposals) public {
        _storage.setUint(keccak256("Proposals"), _proposals);
    }

    function getPropsoals(KeyValueStorage _storage) public view returns (uint _proposals) {
        return _storage.getUint(keccak256("Proposals"));
    }
}
