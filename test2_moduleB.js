
const fs = require('fs');

let students = [];

let prepare = () => {
    return new Promise((res, rej) => {
        fs.readFile('students.json',(err,data)=>{
            if (err) {
                rej("Failure to read file students.json!");
            } else {
                students = JSON.parse(data);
                res();
            }
        });

    });
}

let getCPA = () => {
    return new Promise((res, rej) => {
        prepare()
        .then(() => res(students))
        .catch((err) => { 
            console.log("getCPA: prepare failed")
        });
    });
}

let highGPA = () => {
    return new Promise((res, rej) => {
        prepare()
        .then(() => {
            let largest = students[0];

            for (let s of students) {
                if (s.gpa > largest.gpa) {
                    largest = s
                }
            }

            res(largest)
        })
        .catch((err) => { 
            console.log("highGPA: prepare failed")
        });
    });
}

exports.getCPA = getCPA;
exports.highGPA = highGPA;