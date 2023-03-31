# createIndex

db.Collection.name.createIndex(param1, param2, param3)
param1 =            keys : 1 (or) -1            // 1 is ascending
param2 =            options
param3 =            commitQuorum (minimum number of replicaSets that must report successful index build)

`keys`
- 

`options`
- 


# Create an index on the multiple fields
db.student.createIndex({ name:1,language:-1 });
-------------------------------------------------------------------------------

multikey index
- index a field that holds arrays
- multikey indexes support efficient queries against array fields
    db.coll.createIndex( { <field>: < 1 or -1 > } )
    mongo automatically creates multikey index if any indexed field is an array
-------------------------------------------------------------------------------