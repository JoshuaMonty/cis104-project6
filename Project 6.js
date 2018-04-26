"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let saveFolder = "curlup";
let programRun = 1;
let weekNumber = 1;
let manager = new curlUpManager(saveFolder);

const MENU_DATA = new Map()
    .set('A', ['Add Client', addPerson])
    .set('B', ['Delete Client', deletePerson])
    .set('C', ['Add Service', addTransaction])
    .set('D', ['Delete Service', deleteTransaction])
    .set('E', ['Print Personnel', printPersonnel])
    .set('F', ['Print Transactions',printTransactions])
    .set('G', ['Print Person Details', printPerson])
    .set('H', ['Change Week', changeWeek])
    .set('I', ['Save Data', saveData])
    .set('J', ['Load Data', loadData])
    .set('K', ['Quit Program', quitProgram]);

function main() {
    console.clear();
    while(programRun) {
        try {
            program();
        }
        catch(err) {
            console.log(err);
        }
    }
}

main();

function doMenu() {
    console.log(`------ ${manager.name} Menu -----`);
    console.log(LIB.renderMenu(MENU_DATA));
    console.log('--------------------------');
    return LIB.getChoice("Please Enter a Choice: ", MENU_DATA.keys(), true);
}

function program() {
    let choice = doMenu();
    MENU_DATA.get(choice)[1]();
}

function addPerson() {
    manager.addPerson();
}

function deletePerson() {
    manager.deletePerson();
}

function addTransaction() {
    manager.addTransaction();
}

function deleteTransaction() {
    manager.deleteTransaction();
}

function printPersonnel() {
    console.log(manager.printPersonnel());
    LIB.pressEnter();
}

function printTransactions() {
    console.log(manager.printTransactions());
    LIB.pressEnter();
}

function printPerson() {
    console.log(manager.printPerson());
    LIB.pressEnter();
}

function saveData() {
    manager.save();
}

function loadData() {
    manager.load();
}

function quitProgram() {
    programRun = 0;
}

function changeWeek() {
    let weekNumber = LIB.getNumber("Please Enter the Current Week #: ", true);
    if(weekNumber < 1) {
        console.log("ERROR: Cute. How about a positive number?");
        changeWeek();
    }
}
