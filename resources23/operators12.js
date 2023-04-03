db.supplies23.insertMany([
    { "_id" : 101, "item" : "binder", "qty" : NumberInt("100"), "price" : NumberDecimal("12"), "budget": 400, "spent": 450 },
    { "_id" : 102, "item" : "notebook", "qty" : NumberInt("200"), "price" : NumberDecimal("8"), "budget": 100, "spent": 150 },
    { "_id" : 103, "item" : "pencil", "qty" : NumberInt("50"), "price" : NumberDecimal("6"), "budget": 100, "spent": 50 },
    { "_id" : 104, "item" : "eraser", "qty" : NumberInt("150"), "price" : NumberDecimal("3"), "budget": 500, "spent": 300 },
    { "_id" : 105, "item" : "legal pad", "qty" : NumberInt("42"), "price" : NumberDecimal("10"), "budget": 200, "spent": 650 }
]);

db.supplies24.insertMany([
    {"item" : "binder", "manufacturer" : "ram steels", "material": "steel", "freeShipping": false },
    {"item" : "notebook", "manufacturer" : "heritage fresh", "material": "paper", "freeShipping": true },
    {"item" : "pencil", "manufacturer" : "apsara", "material": "lead", "freeShipping": false },
    {"item" : "eraser", "manufacturer" : "ram steels", "material": "steel", "freeShipping": false },
    {"item" : "kettle", "manufacturer" : "lakshmi steels", "material": ["steel", "plastic"], "freeShipping": false },
]);
    

db.inventory.find({ qty: { $exists: true, $nin: [5,15 ]} })
// select all documents where the qty field exists and its value does not equal 5 or 15.

db.addressBook.find({ "zipCode" : { $type : "string" }});
// return all documents where zipCode is the BSON type string


