const PropertyList = artifacts.require("./PropertyList.sol");

module.exports = function(deployer) {
  deployer.deploy(PropertyList);
};