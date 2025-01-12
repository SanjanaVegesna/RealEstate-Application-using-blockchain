const PropertyList = artifacts.require('./PropertyList.sol')
contract('PropertyList', (accounts)=>{
	const owner = accounts[0];
  	const buyer = accounts[1];
  	const other = accounts[2];
  	
	before(async () => {
    	this.obj = await PropertyList.deployed()
  	})
	it('Deploys successfully', async()=>{
		//const obj = await PropertyList.deployed();
		const address = await this.obj.address
		assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
        //console.log("here");

	})
	it('Adding a property', async()=>{
		//const obj = await PropertyList.deployed();
		const result = await this.obj.addProperty(1,"hyd", 2, "deed", { from: owner });
		const propCount = await this.obj.propCount();
		
		// check prop count
		assert.equal(propCount, 1)
        
        const event = result.logs[0].args

        //check prop id and sell variable
        assert.equal(event.propId.toNumber() , 1)
        assert.equal(event.sell, true)


	})
	it('Buying a property', async()=>{
		
		// check if buyer is able to see the deed before buying
		const result = await this.obj.getPropertyDeedById(1, { from: buyer });
		assert.equal(result, "Not Available");


		const result1 = await this.obj.buyProperty(1, { from: buyer });
		const event = result1.logs[0].args;

		//check if the recently bought property is by default unlisted
		assert.equal(event.sell, false);

		//check if the owner of the property is the current buyer after the property is bought
		const pl_1 = await this.obj.propList(1);
		assert.equal(pl_1.owner, buyer);

	})
	it('Viewing deed', async()=>{
		
		//the recent buyer should now be able to view the deed
		const result = await this.obj.getPropertyDeedById(1, { from: buyer });
		assert.notEqual(result, "Not Available");

		//other users should not be able to see the deed including previous owner
		const result1 = await this.obj.getPropertyDeedById(1, { from: owner });
		assert.equal(result1, "Not Available");

		const result2 = await this.obj.getPropertyDeedById(1, { from: other });
		assert.equal(result2, "Not Available");

	})
})