//GENERATES AN ARRAY "mainINPUTS" OF COST AND SQUARE FOOTAGE INPUTS
function mainInputValues() {
	var mainInputs = [];

	var cost = Number($("#cost").val());
	var sf = Number($("#sf").val());

	mainInputs.push(cost, sf);
	return mainInputs;
}

//GENERATES AN ARRAY "materialINVENTORY" OF CURRENT MATERIAL INVENTORIES
function materialInventory() {
	var materialInventory = [];
	
	var lumber = Number($("#lumber").val());
	var brick = Number($("#brick").val());
	var concrete = Number($("#concrete").val());
	var decor = Number($("#decor").val());

	materialInventory.push(lumber, brick, concrete, decor);
	return materialInventory;
}

//GENERATES AN ARRAY "unitCOSTS" CONTAINING MATERIAL UNIT PRICES
function materialUnitCosts() {
	var unitCosts = [];

	var lumberUnitCost = 3.00;
	var brickUnitCost = 4.00;
	var concreteUnitCost = 0.50;
	var decorUnitCost = 5.50;

	unitCosts.push(lumberUnitCost, brickUnitCost, concreteUnitCost, decorUnitCost);
	return unitCosts;
}

//GENERATES AN ARRAY "unitsPER" OF EACH MATERIAL QUANTITY REQUIRED PER SQUARE FOOT
function materialUnitsPerSF() {
	var unitsPer = [];

	var lumberPer = 9;
	var brickPer = 12;
	var concretePer = 1;
	var decorPer = 3;

	unitsPer.push(lumberPer, brickPer, concretePer, decorPer);
	return unitsPer;
}

//CALCULATES COST OF CURRENT INVENTORY
function costOfInventory() {
	var inventory = materialInventory();
	var unitCosts = materialUnitCosts();

	var itemValue = 0;
	for(i = 0; i < inventory.length; i++) {
		itemValue += inventory[i] * unitCosts[i];
	}

	return itemValue;
}

//CALCULATES COST TO BUILD ONE SQUARE FOOT
function costPerSquareFoot() {
	var unitsPer = materialUnitsPerSF();
	var unitCosts = materialUnitCosts();

	var totalCostPerMaterial = []
	for(i = 0; i < unitsPer.length; i++) {
		var total = unitsPer[i] * unitCosts[i];
		totalCostPerMaterial.push(total);
	}

	var total_SF_Cost = 0;
	for(i = 0; i < totalCostPerMaterial.length; i++) {
		total_SF_Cost += totalCostPerMaterial[i];
	}
	return total_SF_Cost
}

//CALCULATES MAX BUILDABLE SQUARE FOOTAGE BASED ON COST ENTRY
function costSF() {
	var money = mainInputValues()[0];
	var sfCost = costPerSquareFoot();

	var costBuildable = Math.floor(money / sfCost);

	return costBuildable
}

//CALCULATES MAX BUILDABLE SQUARE FOOTAGE BASED ON AVAILABLE INVENTORY
function maxSF() {
	var inventory = materialInventory();
	var unitsPer = materialUnitsPerSF();

	var maxSFPerMaterial = [];
	for(i = 0; i < inventory.length; i++) {
		var maxPer = Math.floor(inventory[i] / unitsPer[i]);
		maxSFPerMaterial.push(maxPer);
	}
	
	var maxSF = maxSFPerMaterial[0];
	for(i = 0; i < maxSFPerMaterial.length; i++) {
		if (maxSFPerMaterial[i] < maxSF) {
			maxSF = maxSFPerMaterial[i];
		}
	}
	return maxSF;
}

//**********************************************************************************
//**********************************************************************************

//WHEN MATERIAL INPUT CHANGES ==> CHANGE COST OF INVENTORY AND BUILDABLE SQUARE FEET
$(".material_input").change(function() {
	
	//change cost field to updated cost of inventory
	var c = costOfInventory();
	$("#cost").val(Number(c).toFixed(2));

	//change square feet field to max buildable square feet
	var s = maxSF();
	$("#sf").val(s);	
});

//WHEN COST CHANGES ==> CHANGE MAX SQUARE FOOTAGE AND MATERIALS NEEDED
$("#cost").change(function() {
	
	//change square feet field to max buildable square feet
	var s = costSF();
	$("#sf").val(s);
});

console.log(mainInputValues()[1]);

//WHEN SF CHANGES ==> CHANGE COST TO BUILD AND MATERIALS TO REFLECT NEEDED QUANTITIES
$("#sf").change(function() {
	
	//COST
	//change cost to reflect funds needed
	var c = costPerSquareFoot() * mainInputValues()[1];
	$("#cost").val(c);

	//MATERIALS
	//change quantity of lumber needed
	var l = materialUnitsPerSF()[0] * mainInputValues()[1];
	$("#lumber").val(l);

	//change quantity of brick needed
	var b = materialUnitsPerSF()[1] * mainInputValues()[1];
	$("#brick").val(b);

	//change quantity of concrete needed
	var cn = materialUnitsPerSF()[2] * mainInputValues()[1];
	$("#concrete").val(cn);

	//change quantity of decor needed
	var d = materialUnitsPerSF()[3] * mainInputValues()[1];
	$("#decor").val(d);
});