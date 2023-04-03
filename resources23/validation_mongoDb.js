// this is validation for mongoDb driver... not mongoose
   // within jsonSchema, we cant ensure uniqueness of "email12"
   // what we can do is ---> create an index on email12 field (with unique:true)
   // so, while insertion of duplicate email it fails
// Document validation failed
   // at this moment, there is nothing more info... 
   // only error message you get is validation failed... err msg wont say on what field validation failed
// bsonType: [ "null", "string" ]         
   // if a field is not provided in payload, it'll be a missing field in document
   // but if null is allowed ---> it will be <null field>, not <missing field>
db.createCollection("students23", {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         title: "Students23 Validation12",
         required: [ "address12", "major12", "name12", "year12", "email12" ],
         properties: {
            name12: { 
               bsonType: "string", maxLength: 15, minLength:4,
               description: "'name' must be a string and is required" 
            },            
            year12: {
               bsonType: "int", minimum: 2017, maximum: 3017,
               description: "'year' must be an integer in [ 2017, 3017 ] and is required"
            },
            gpa12: {
               bsonType: [ "double" ],
               description: "'gpa' must be a double if the field exists"
            },
            religion: {
               enum: [ "Hindu", "Muslim", "Christian", "Others" ]
            },
            hobbies: {               
               bsonType: "array",
               description: "must be an array and is required",
               minItems: 1,
               maxItems: 25,
               items: { bsonType: "string" }
            }
         },
         additionalProperties: true,
      }
   }
});