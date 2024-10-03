https://www.digitalocean.com/community/tutorials/how-to-design-a-document-schema-in-mongodb
- embedding documents 
- using child references 
- using parent references 
<!-- -------------------------------------------------------------------------------------------------- -->

Schema is nothing but regular documents
- except they adhere to some standards
- schema = blueprint/interface to a collection

Model
- we use model to perform operations on collections
- add, update, delete documents

5 guidelines for designing schema
- Storing Together What Needs to be Accessed Together
- Modeling One-to-One Relationships with Embedded Documents
- Modeling One-to-Few Relationships with Embedded Documents
- Modeling One-to-Many and Many-to-Many Relationships with Child References
- Modeling Unbounded One-to-Many Relationships with Parent References

<!-- -------------------------------------------------------------------------------------------------- -->
# Storing Together What Needs to be Accessed Together

`normalized data model`
- Storing data this way is called normalized data model
— using multiple separate, concise objects related to each other
- below example is example of <normalized data model>
    students in university
    student scholarship status

relational database
- data is kept in tables
- each table is constructed with a fixed list of columns 
- each column represents various attributes that make up an entity/object/event. 
- for example, students at a a university
    columns ===> first name, last name, DoB, unique identification number.
    these columns ====> identify that student/person

table describing each student’s scholarship status 
- could refer to students by their student ID number
- but it would not store the student’s name or address directly
- thereby avoiding data duplication.

So, to retrieve information about any student with all information
- a query would need to access more than one table at a time 
- and then compile the results from different tables into one
-----------------------------------------------------------------------------------------


modeling data in a document-oriented database
- store together what will be accessed together
- say that most students at this school have more than one email address. 
    - university wants to store multiple email addresses with each student’s contact information.
    - so, the mongoDb document contains an embedded list of email addresses.

`denormalized data model`
- Representing more than a single subject inside a single document
- It allows 
    applications to retrieve & manipulate 
    all the relevant data for a given object (here, a student) 
    in one go 
    without a need to access multiple separate objects & collections.
- Doing so also guarantees the atomicity of operations on such a document

<!-- -------------------------------------------------------------------------------------------- -->

# Modeling One-to-One Relationships with Embedded Documents

`one-to-one`
- association between two distinct objects where one object is connected with exactly one of another kind.
- student & student-id-card
    student is an object                      // _id, name, class, 
    student-id-card is an object              

we use embedded documents
- instead of a single value, student document’s id_card field holds an embedded document
    id_card: 6415                                                   // not embedded
    id_card: { id: 6415, issuedOn: 2022, expiresOn: 2023 }          // embedded
                                                                        // id_card is separate object
                                                                    
- The identity card essentially becomes a part of the document describing the student Sammy, 
    even though it’s a separate object in real life.



<!-- -------------------------------------------------------------------------------------------- -->


# Modeling One-to-Few Relationships with Embedded Documents

`one-to-few`
- A student can have multiple email addresses
- A shopping order can consist of multiple items

`depends on `
- cardinality
- independent access
- one-to-many (only theoritically); but its many-to-many 

student-email-address
- only a few email addresses for each student
- unlikely that a student will have dozens
- embed email addresses directly into the student document and store them together.
- you don’t run any risk that the list of email addresses will grow indefinitely
    which would make the document big and inefficient to use.
- email addresses will likely not be accessed separately from the student.  
    so, there is no clear incentive to store them as separate documents in a separate collection.
    ie related documents (email addresses) do not need to be accessed independently 
    this is another compelling reason to embed them inside the student’s document.
- an email address belongs to a single person... so, its a one-to-few relationship

So, ideal structure is
- embedding students’ various email addresses  within the same documents that describe students themselves
- every time you retrieve a student’s document 
    you will also retrieve the embedded email addresses in the same read operation.

<!-- -------------------------------------------------------------------------------------------- -->


# Modeling One-to-Many and Many-to-Many Relationships with Child References

courses - students

cardinality
- across 4 years, 8 semesters... a student can attend upto 30 courses
- so, courses cant be embedded within student document
    as student document gets wieldy

independent access
- sometimes, we need to access courses independently of students
    like 'Data Structures' course is moved from CSE to ECE dept
    professor teaching the course might change
- had we embedded courses in students document
    each time a course is updated, we need to go through all student records & update the course info everywhere
- so, courses must be stored separately and not embed them fully.

using courses as separate document
- student document still has a courses field which also is an array
- but instead of embedding full course documents like in the earlier example, 
    only the identifiers referencing the <course documents in the separate collection> are embedded. 
- Now, when retrieving a student document
    courses will not be immediately available and will need to be queried separately
- On the other hand, it’s immediately known which courses to retrieve


<!-- -------------------------------------------------------------------------------------------- -->


# Modeling Unbounded One-to-Many Relationships with Parent References

message board 
- where any student can post whatever messages they want
- Unbounded One-to-Many Relationships with Parent References

2 approaches

`embedding & child references`
- But if a student is prolific with writing messages 
    their document will quickly become incredibly long
    could easily exceed the 16MB size limit
- messages might need to be accessed separately from the student (show latest messages by students)
- embedding is not the best choice for this scenario


`using child references instead of embedding full documents`
- message_board_messages field now stores the child references to all messages written by Sammy
- Its possible to access messages separately (as they are stored in separate collection)
    not embedded within student document
- But, in 4 years, a student can post 1000 messages
    and student object can become unwieldy

<parent references>
- thats why we use parent references
- it’s now not the student document referring to individual messages, 
    but rather a reference in the message’s document pointing towards the student that wrote it.
- the student’s document won’t contain any information about the messages they posted
- To retrieve the list of messages written by a student, 
    you would use a query on the messages collection and filter against the posted_by field



<!-- -------------------------------------------------------------------------------------------- -->