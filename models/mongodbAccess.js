const {MongoClient} = require('mongodb');
dbName = "projectDB";

// Get current date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

async function mongodbConnect(){
    const uri = "mongodb+srv://Itayn:itay123@cluster0.okz2l.mongodb.net/projectDB?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        await addUser(client,{
            Fullname: "Itay Nadler",
            Username: "itayn",
            Password: "111222333",
            UserId: "204701668",
            Birthday: new Date("1993-04-13"),
            Maritalstatus: "Married",
            Revision: 1
        });



        //await findUser(client,'204701668');

        // await addNewCost(client,{
        //     UserId: "204701668",
        //     Date: "2021-09-30",
        //     Category: "Food",
        //     Description: "BBB",
        //     Sum: "100"
        // });

        //const data = await getMonthlyReport(client,"204701668",9,2021);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

mongodbConnect().catch(console.error);

// write functions
async function addUser(client, newUser){
   const result = await client.db(dbName).collection("users").insertOne(newUser);
   console.log(`New User Created with id: ${result.insertedId}`);

}

async function addNewCost(client, newCost){
    const result = await client.db(dbName).collection("costs").insertOne(newCost);
    console.log(`New cost created with id: ${result.insertedId}`);

}

async function addUserChanges(client, newUserChanges){
    const result = await client.db(dbName).collection("userschanges").insertOne(newUserChanges);
    console.log(`New userschanges doc created with id: ${result.insertedId}`);

}

// read functions
async function findUser(client,userId){
    const result = await client.db(dbName).collection("users").findOne({Id:userId});
    if(result){
        console.log(`Found user with id: '${userId}'`);
        console.log(result);
    } else {
        console.log(`No user found with id:'${userId}'`);
    }
}

async function getMonthlyReport(client,userId,month,year){
    let firstDayOfMonth;
    let lastDayOfMonth;

    if(month <=9){
         firstDayOfMonth = year + '-0' + month + '-' + '01';
         lastDayOfMonth = year + '-0' + month + '-' + '31';
    } else{
         firstDayOfMonth = year + '-' + month + '-' + '01';
         lastDayOfMonth = year + '-' + month + '-' + '31';
    }

    const cursor = await client.db(dbName).collection("costs").find({Date: {$gte: firstDayOfMonth, $lte: lastDayOfMonth}}).sort({Date: 1});
    const results = await cursor.toArray();
    console.log(results); // need to create and display HTML table on web
    return results;
}