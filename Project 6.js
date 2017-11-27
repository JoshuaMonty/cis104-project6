"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');  // For file I/O

let continueResponse;
let people = [];

function main() {
    setContinueResponse();
    while (continueResponse === 1) {
        populatePeople();
        editPeople();
        writePeople();
        setContinueResponse();
    }
    printPeople();
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

function populatePeople() {
    let fileContents = IO.readFileSync(`data.csv`, 'utf8');
    let lines = fileContents.toString().split(/\r?\n/); // Automatically creates SD array on newlines
    for (let i = 0; i < lines.length; i++) {
        people.push(lines[i].toString().split(/,/));
    }
}

function editPeople() {
    let choice, whichPerson;
    while (typeof choice === 'undefined' || choice !== 0 && choice !== 1) {
        choice = Number(PROMPT.question(`Do you want to edit an existing person or add a new one? [0=edit, 1=new]: `));
    }
    if (choice === 0) {
        for (let i = 0; i < people.length; i++) {
            console.log(`${i} = ${people[i][0]}, ${people[i][1]}`);
        }
        while (typeof whichPerson === 'undefined' || whichPerson < 0 || whichPerson > people.length) {
            whichPerson = Number(PROMPT.question(`Please select person to edit: `));
        }
        insertIntoArray(whichPerson);

    } else {
        let newPersonNum = people.length;
        insertIntoArray(newPersonNum);
    }
}

function insertIntoArray(person) {
    const COLUMNS = 6, LAST_NAME = 0, FIRST_NAME = 1, STREET = 2, CITY = 3, STATE = 4;
    for (let i = 0; i < COLUMNS; i++) {
        let finished = 0;
        if (i === LAST_NAME) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter last name: `));
                if (/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                } else {
                    console.log(`WRONG!  ${people[person][i]}`);
                }
            }
        } else if (i === FIRST_NAME) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter first name: `));
                if (/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                }
            }
        } else if (i === STREET) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter street address: `));
                if (/^[a-zA-Z0-9 ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                }
            }
        } else  if (i === CITY) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[a-zA-Z ]{1,30}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter city: `));
                if (/^[a-zA-Z ]{1,30}$/.test(people[person][i])) {
                    finished = 1;
                }
            }
        } else  if (i === STATE) {
            while (finished !== 1 || typeof people[person][i] === 'undefined' || !/^[A-Z]{2}$/.test(people[person][i])) {
                people[person][i] = (PROMPT.question(`\nPlease enter 2 character state code (uppercase!): `));
                if (/^[A-Z]{2}$/.test(people[person][i])) {
                    finished = 1;
                }
            }
        } else {
            const LOWEST_ZIP = 501, LARGEST_ZIP = 99950;
            while (finished !== 1 || typeof people[person][i] === 'undefined' || isNaN(people[person][i]) || people[person][i] < LOWEST_ZIP || people[person][i] > LARGEST_ZIP) {
                people[person][i] = Number(PROMPT.question(`\nPlease enter zip code: `));
                if (! isNaN(people[person][i]) || people[person][i] < LOWEST_ZIP || people[person][i] > LARGEST_ZIP) {
                    finished = 1;
                }
            }
        }
    }
}

function printPeople() {
    const COLUMNS = 6;
    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            console.log(people[i][j]);
        }
        console.log(`\n`);
    }
}

function writePeople() {
    const COLUMNS = 6;
    for (let i = 0; i < people.length; i++) {
        for (let j = 0; j < COLUMNS; j++) {
            if (j < COLUMNS - 1) {
                IO.appendFileSync(`dataX.csv`, `${people[i][j]},`, 'utf8');
            } else {
                IO.appendFileSync(`dataX.csv`, people[i][j], 'utf8');
            }
        }
        IO.appendFileSync(`dataX.csv`, "\n", 'utf8');
    }
}