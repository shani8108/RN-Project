import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase("Persons.db");

export function Init() {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((tx => {
            //create one time table

            tx.executeSql('CREATE TABLE IF NOT EXISTS Persons (ID INTEGER PRIMARY KEY NOT NULL,Name TEXT NOT NULL,Address TEXT NOT NULL,Age INTEGER NOT NULL,Border INTEGER NOT NULL,Color TEXT NOT NULL)'
                , [], () => {
                    console.log("Sucsess from create table Persons")
                    resolve();
                }, (_, err) => {
                    console.log("error from create table Persons")
                    console.log(err);
                    reject();
                })
        }));
    });
    return prom;
}

export function AlterTable() {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((tx => {
            //create one time table

            tx.executeSql('ALTER TABLE Persons ADD COLUMN Color TEXT NOT NULL DEFAULT "black"'
                , [], () => {
                    console.log("Sucsess from ALTER table Persons")
                    resolve();
                }, (_, err) => {
                    console.log("error from ALTER table Persons")
                    console.log(err);
                    reject();
                })
        }));
    });
    return prom;
}

export function AddNewPersons(name, address, age) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table

            conn.executeSql('INSERT INTO Persons (Name,Address,Age,Border,Color) VALUES (?,?,?,1,"black")'
                , [name, address, age], (_, result) => {
                    console.log("Sucsess from insert to table Persons")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from insert to table Persons")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}

export function SelectAllPersons() {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table

            conn.executeSql('SELECT * FROM Persons'
                , [], (_, result) => {
                    console.log("Sucsess from select all Persons")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from select all Persons")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}

export function SearchPerson(searchPrm) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table
            let str = 'SELECT * FROM Persons WHERE Name Like "%' + searchPrm + '%"';
            console.log(str);
            conn.executeSql(str
                , [], (_, result) => {
                    console.log("Sucsess from search all Persons")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from search all Persons")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}

export function DeletePerson(id) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table
            conn.executeSql('DELETE FROM Persons WHERE ID = ?'
                , [id], (_, result) => {
                    console.log("Sucsess from delete Person" + id)
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from delete Person" + id)
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}
export function UpdatePerson(id, name, address, age) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table
            conn.executeSql('UPDATE Persons SET Name=?,Address=?,Age=? WHERE ID = ?'
                , [name, address, age, id], (_, result) => {
                    console.log("Sucsess from update Person" + id)
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from update Person" + id)
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}

export function UpdateStyle(id, border, color) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table
            conn.executeSql('UPDATE Persons SET Border=?,Color=? WHERE ID = ?'
                , [border, color, id], (_, result) => {
                    console.log("Sucsess from update style person" + id)
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from update style Person" + id)
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}