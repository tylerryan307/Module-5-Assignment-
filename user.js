import mongoose from 'mongoose'; // This is my import from my mongoose package

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema // My Mongoose Schema

// Here are my constants for necessary information
const mongoDBUrl = 'localhost';
const mongoDBPort = '27017'
const mongoDBDatabase = 'CAdatabase'

//Here is my User Schema for the project
const userShema = new Schema({
    firstName: { type: "String", required: true}, // name is required
    lastName: { type: "String", required: true},
    email: { type: "String", required: true},
    policeId: { type: "String", },
    providerDirector: { type: "String", },
    admin: { type: "String", },
    searchServices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    searchShelters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Shelter" }]
})

//Here is the Services Schema for the project
const serviceSchema = new Schema({
    serviceName: { type: "String", },
    serviceDescription: { type: "String", },
    userLoggedIn: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

//Here is the Shelter Schema for the project
const shelterschema = new Schema({
    shelterName: { type: "String", },
    shelterInfo: { type: "String", },
    shelterBedAmount: { type: "Number", },
    userLoggedIn: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

const User = mongoose.model("User", userShema, "Users");
const Service = mongoose.model("Service", serviceSchema, "Services");
const Shelter = mongoose.model("Shelter", shelterschema, "Shelters");

// This is our code to connect to the Database
const connectToDB = async()=> {
    try {
        const connectionInfo = `mongodb://${mongoDBUrl}:${mongoDBPort}/${mongoDBDatabase}`;
        const mongoDBConfigObject = {
            useNewUrlParser: true,
            useUnifiedTypology: true
        };

    await mongoose.connect(connectionInfo, mongoDBConfigObject);


    }
    catch (err) {
        console.log(err);
    }
}

// Add a User Area
const addUser = async(firstName, lastName, email, policeId, providerDirector, admin) => {
    let theUser = new User();
    theUser.firstName = firstName;
    theUser.lastName = lastName;
    theUser.email = email;
    theUser.policeId = policeId;
    theUser.providerDirector = providerDirector;
    theUser.admin = admin;
    // try{
    //     theUser.save().then((newUserDoc) => {
    //         console.log(`New User added with id of ${newUserDoc}`);
    //     });
    // } catch(err) {
    //     console.log(err);
    // }
    try {
        return theUser.save();
    } catch (err) {
        console.log(err)
    }
}

// Update a User information
const updatedUser = async(id) => {   // the id parameter is the exact _id value of the User document we want to modify
    try {
        let updatePromise = foundUserDoc.save(); 
        
        updatePromise.then((theUpdatedUser) => {
            console.log(`Updated Student doc with id of ${theUpdatedUser.id}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

// Delete a User
const deleteUser = async(deleteUserDocObj) => {  
    try {
        let deletePromise = deleteUserDocObj.deleteOne();
        deletePromise.then(() => {
            console.log(`The User doc with id of ${deleteUserDocObj.id} is deleted.`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

// Add a Service Area
const addService = async(serviceName, serviceDescription) => {
    let theService = new Service();
    theService.serviceName = serviceName;
    theService.serviceDescription = serviceDescription;
    // try{
    //     theService.save().then((newServiceDoc) => {
    //         console.log(`New User added with id of ${newServiceDoc}`);
    //     });
    // } catch(err) {
    //     console.log(err);
    // }
    try {
        return theService.save();
    } catch (err) {
        console.log(err)
    }
}

//Update Services infomation
const updatedService = async(id) => {   // the id parameter is the exact _id value of the User document we want to modify
    try {
        let updatePromise = foundServiceDoc.save(); 
        
        updatePromise.then((theUpdatedService) => {
            console.log(`Updated Services doc with id of ${theUpdatedService.id}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

// Delete a Service
const deleteService = async(deleteServiceDocObj) => { 
    
    try {
        let deletePromise = deleteServiceDocObj.deleteOne(); 
        deletePromise.then(() => {
            console.log(`The Service doc with id of ${deleteServiceDocObj.id} is deleted.`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

// Add a Shelter Area
const addSheler = async(shelterName, shelterInfo, shelterBedAmount) => {
    let theShelter = new Shelter();
    theShelter.shelterName = shelterName;
    theShelter.shelterInfo = shelterInfo;
    theShelter.shelterBedAmount = shelterBedAmount;
    // try{
    //     theShelter.save().then((newShelterDoc) => {
    //         console.log(`New User added with id of ${newShelterDoc}`);
    //     });
    // } catch(err) {
    //     console.log(err);
    // }
    try {
        return theShelter.save();
    } catch (err) {
        console.log(err)
    }
}

//Update Shelter infomation
const updatedShelter = async(id) => {   // the id parameter is the exact _id value of the User document we want to modify
    try {
        let updatePromise = foundShelterDoc.save(); 
        
        updatePromise.then((theUpdatedShelter) => {
            console.log(`Updated Shelter doc with id of ${theUpdatedShelter.id}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

// Delete a Shelter
const deleteShelter = async(deleteShelterDocObj) => { 
    
    try {
        let deletePromise = deleteShelterDocObj.deleteOne(); 
        deletePromise.then(() => {
            console.log(`The Shelter doc with id of ${deleteShelterDocObj.id} is deleted.`);
        });
    }
    catch (err) {
        console.log(err);
    }
}

// function added to allow users to add shelters and services
const listingServices = (theUser, theServices) => {
    let serviceIds = [];
    let userId = theUser.id;
    for (let i = 0; i < theServices.length; i++ ) {
        serviceIds.push(theServices[1].id);
    }
    userId = theUser.id;

    theUser.listingServices = serviceIds;
    for (let l = 0; l < theServices.length; l++) {
         theServices[i].registeredUsers.push(userId);
    }
    let updatedUser = await theUser.save();
    let updatedServices = [];
    for (let i = 0; i < theServices.length; i++) {
        updatedServices.push(await theServices.save());
    }

}

const listingShelters = (theUser, theShelters) => {
    let sheltherIds = [];
    let userId = theUser.id;
    for (let i = 0; i < theShelters.length; i++ ) {
        sheltherIds.push(theShelters[1].id);
    }
    userId = theUser.id;

    theUser.listingShelters = sheltherIds;
    for (let l = 0; l < theShelters.length; 1++) {
        theShelters[i].registeredUsers.push(userId);
    }
}

const main = async() => {
    try {
        await connectToDB();
        let someUser = { firstName: 'Ryan', lastName: 'Ivy', email: 'r0446151@amarillocollege.com', policeId: 'none', providerDirector: 'none', admin: 'Yes'};
        let someService = { serviceName: 'Female Beds', serviceDescription: 'This service is only offered to Females.'};
        let someShelter = { shelterName: 'New Hope Home', shelterInfo: 'We have large facility to help women and children who need a safe place', shelterBedAmount: '50'}
        let userDoc = await addUser(someUser.firstName, someUser.lastName, someUser.email, someUser.policeId, someUser.providerDirector, someUser.admin);
        let serviceDoc = await addService(someService.serviceName, someService.serviceDescription);
        let shelterDoc = await addSheler(someShelter.shelterName, someShelter.shelterInfo, someShelter.shelterBedAmount);
        await listingServices(userDoc, [serviceDoc])
        await listingShelters(userDoc, [shelterDoc])
        await updatedUser(id)
        await updatedService(id)
        await updatedShelter(id)
        await deleteUser(id)
        await deleteService(id)
        await deleteShelter(id)
    } catch (err) {
        console.log(err)
    }
}

main()