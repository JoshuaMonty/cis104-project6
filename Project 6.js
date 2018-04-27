"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');

let masterFile = [], transactionFile = [], errorReport = [];

function main(){
    populateMasterFile();
    populateTransactionFile();
    calculateTotals();
    printMasterFile();
    printErrorReport();
    printCouponReceivers();
    writeMasterFile();
}

main();

function populateMasterFile(){
    let fileContents = IO.readFileSync(`masterfile.csv` , 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++){
        masterFile.push(lines[i].toString().split(/,/));
    }
}

function populateTransactionFile(){
    let fileContents = IO.readFileSync(`transactionfile.csv` , 'utf8');
    let lines = fileContents.toString().split(/\r?\n/);
    for (let i = 0; i < lines.length; i++){
        transactionFile.push(lines[i].toString().split(/,/));
    }
}

function calculateTotals(){
    for (let i = 0; i < transactionFile.length; i++){
        for (let j = 0; j < masterFile.length; j++){
            if (transactionFile[i][0] == masterFile[j][0]) {
                masterFile[j][3] = parseFloat(masterFile[j][3]) + parseFloat(transactionFile[i][2]);
                errorReport[i] = transactionFile[i][0];
            }
        }
    }
}

function printMasterFile(){
    console.log(`MasterFile:\n`);
    for (let i = 0; i < masterFile.length; i++) {
        for (let j = 0; j < 4; j++){
            console.log(`\t` + masterFile[i][j]);
        }
        console.log(`\n`);
    }
}

function printErrorReport() {
    console.log(`Missing IDs:`);
    for (let i = 0; i < transactionFile.length; i++) {
        if (errorReport[i] == null) {
            console.log(`\n\t${transactionFile[i][0]}`);
        }
    }
}

function printCouponReceivers() {
    console.log(`\nCoupon Receivers:`);
    for (let i = 0; i < masterFile.length; i++) {
        if (masterFile[i][3] >= 750){
            console.log(`\n\tCongratulations, ${masterFile[i][1]} ${masterFile[i][2]}! You spent way too much at this place. Here's a coupon.`);
        }
    }
}

function writeMasterFile() {
    const COLUMNS = 4;
    for (let i = 0; i < masterFile.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (j < COLUMNS - 1) {
                IO.appendFileSync(`updatedMasterFile.csv`, `${masterFile[i][j]},`, 'utf8');
            } else {
                IO.appendFileSync(`updatedMasterFile.csv`, masterFile[i][j], 'utf8');
            }
        }
        IO.appendFileSync(`updatedMasterFile.csv`, "\n", 'utf8');
    }
}
