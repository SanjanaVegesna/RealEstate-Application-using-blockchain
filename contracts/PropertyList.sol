pragma solidity ^0.5.0;


contract PropertyList
{

	/*
	modifier onlyOwner(uint propId) {
    	require(propList[propId].owner == msg.sender);
        _;
    }
    */

	uint256 public propCount = 0;
	mapping(uint => Property) public propList;
	mapping(uint => PropertyDeed) private propDeedList;

	struct Property {
		uint propId;
		uint plotSize;
		string location;
		uint price;
		address payable owner;
		bool sell;
		
	}

	struct PropertyDeed {
		uint deedId;
		string deedVal;
	}

	event PropertyAdded(
    uint propId,
    bool sell
  	);
  	event PropertyBought(
    bool sell
  	);
  	
	function getPropertyDeedById(uint propId) view public returns(string memory){

		if (msg.sender == propList[propId].owner)
			
			return propDeedList[propId].deedVal;
		else
			
			return "Not Available";


	}


	function addProperty(uint _plotSize, string memory _location, uint _price, string memory _deedval) public {
		propCount += 1;
		propList[propCount] = Property(propCount,_plotSize, _location, _price, msg.sender, true);
		propDeedList[propCount] = PropertyDeed(propCount, _deedval);
		emit PropertyAdded(propCount, true);
	}


	function buyProperty(uint propId) public payable{

		if (propList[propId].sell == true)
		{

			(propList[propId].owner).transfer(msg.value);

			propList[propId].sell = false;
			propList[propId].owner = msg.sender;
		}
		else
		{
			(msg.sender).transfer(msg.value);

		}
		emit PropertyBought(false);

	}
	function listProperty(uint propId, uint selling_price) public{
		propList[propId].sell = true;
		propList[propId].price = selling_price;
	}

}