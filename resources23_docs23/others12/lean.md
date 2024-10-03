# Lean
- By default, Mongoose queries return an <instance of the Mongoose Document> class. 
- Documents are much heavier than vanilla JavaScript objects, 
    because they have a lot of internal state for change tracking. 
- Enabling the lean option tells Mongoose 
    to skip instantiating a full Mongoose document and 
    just return the <Plain Old Javascript Object>
-------------------------------------------------------------------------------

enabling lean means, docs don't have ===>
    Change tracking
    Casting and validation
    Getters and setters
    Virtuals
    save()
-------------------------------------------------------------------------------
const normalDoc = await Person.findOne();
normalDoc.fullName;                                             // 'Benjamin Sisko' 

const leanDoc = await Person.findOne().lean();
leanDoc.fullName;                                               // undefined 
-------------------------------------------------------------------------------