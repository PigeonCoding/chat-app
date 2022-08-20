const sqlite3 = require('sqlite3');
const uuid = require('uuid');
const express = require("express")
const cors = require("cors")

var app = express()

let users = []

const hmdb = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
    } else if (err) {
        console.log("Getting error " + err);
        exit(1);
    }
    
});

const db = new sqlite3.Database('mcu.db')

function createDatabase() {
    var newdb = new sqlite3.Database('mcu.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
       
    });
}

const writethings = (content, file) => {
    fs.writeFileSync(file, content, (err) => {
            if (err) {
                console.log(err)
            }
            else{
                console.log()
            }
        }
    )
}
app.use(cors())

function querryUsers(req){
    db.all("SELECT id, name, passwd FROM accounts", (err, rows) => {
    if (err){
        console.log(err)
    }
    else{
        users = rows
        //rows.forEach((row) => {
        // users.push(row)
    // })
    req.send(users)
}
});}

function addTable(newdb, tbname){
    var query = `
    create table `+ tbname +`(
        id integer primary key AUTOINCREMENT,
        name text not null,
        passwd text not null
    );`
    newdb.run(query, (err) => {
        if (err){
            console.log(err)
        }else{
            console.log("table created")
        }
    })      
}

function dropTable(newdb, tbname){
    var query = `drop table ` + tbname
    newdb.run(query, (err) => {
        if(err){
            console.log(err)
        }
        else{
            console.log("deleted table")
        }
    })
}

function addUser(newdb, tbname, name, passwd){
    var query = `
    insert into accounts (name, passwd) 
        values ('` + name + `', '` + passwd + `')`
    
    newdb.run(query, (err) => {
        if (err){
            console.log(err)
        }else{
            console.log("user created")
        }
    })      
}

function deleteUser(newdb, tbname, id){
    var query = `
        delete from ` + tbname + `
        where id = ` + id +`;
    `
    console.log(query)
    newdb.run(query, (err) => {
        if (err) {
            console.log(err)
        }else{
            console.log("removed user with id: " + id)
        }
    })
}



app.get("/users", (res, req) => {
    querryUsers(req)
})

app.get("*", (res, req) => {
    let aa = (res.url).split("/")
    if(aa[1] == "adduser"){
        addUser(db, "accounts", aa[2], aa[3])
        querryUsers(req)
    }
    else if(aa[1] == "deleteuser"){
        deleteUser(db, "accounts", aa[2])
        querryUsers(req)
    }
    else{
        req.send("<h1>not found<h1/>")
    }

    
})

// addTable(db, "accounts")
// dropTable(db, "accounts")
// addUser(db, "accounts", "wassim", 'anis')

app.listen(8000, function() {
    console.log("listening to port 8000")
})
