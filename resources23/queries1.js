// The order in which you call - doesnt matter... bcoz, the driver reorders the calls 
myColl.find(query).sort().limit();
myColl.find(query).limit().sort();

// you can chain (or) pass them as options object
myColl.find(query).sort().limit();
var options = { sort: { length: -1 }, limit: 3, skip: 5 }
myColl.find(query, options);

/**********************************************************************/