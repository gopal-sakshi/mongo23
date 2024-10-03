const productSchema = new Schema({
    name: 'String',
    version: { type: 'Number', default: 0 }
});


// pre('save') middleware =======> increase the version field with every save of that document
productSchema.pre('save', function(next) { 
    this.version = this.version + 1;  next(); 
});

// Now pre('save') hook will not be called
// So, we will write a hook for findOneAndUpdate too
// But wont work ====> findOneAndUpdate() hook is query hook, meaning it does not have access to the actual document, 
//                      but only to the query itself.
// 
productSchema.pre('findOneAndUpdate', function(next) {    
    this.version = this.version + 1;            
    next();
});

// SO, WE USE THIS
productSchema.pre('findOneAndUpdate', function(next) {
    this.$inc =  { version: 1 };
    next();
});