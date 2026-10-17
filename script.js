
const students = [
    { name: "Aarav Sharma", age: 19, course: "BSc Computer Science" },
    { name: "Meera Kapoor", age: 18, course: "BBA FIA" },
    { name: "Rohan Verma", age: 20, course: "BMS" }
];

const studentContainer = document.getElementById("studentContainer");
const message = document.getElementById("message");

const showBtn = document.getElementById("showBtn");
const addBtn = document.getElementById("addBtn");
const themeBtn = document.getElementById("themeBtn");

function showStudents() {
    studentContainer.replaceChildren();

    if (students.length === 0) {
        const emptyText = document.createElement("p");
        emptyText.className = "empty-message";
        emptyText.textContent = "No students have been added yet.";
        studentContainer.appendChild(emptyText);
        return;
    }

    for (const student of students) {
        const card = document.createElement("div");
        card.className = "student-card";

        const name = document.createElement("h3");
        name.textContent = student.name;

        const age = document.createElement("p");
        age.textContent = `Age: ${student.age}`;

        const course = document.createElement("p");
        course.textContent = `Course: ${student.course}`;

        card.append(name, age, course);
        studentContainer.appendChild(card);
    }
}

function addStudentWithCallback(student, callback) {
    setTimeout(function () {
        students.push(student);
        callback();
    }, 2000);
}

function addStudentWithPromise(student) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (
                !student.name.trim() ||
                !student.course.trim() ||
                !Number.isFinite(student.age) ||
                student.age <= 0
            ) {
                reject(new Error("Please enter valid student details."));
                return;
            }

            students.push(student);
            resolve(student);
        }, 2000);
    });
}

async function handleAddStudent() {
    const name = prompt("Enter the student's name:");

    if (name === null || !name.trim()) {
        message.textContent = "Student name is required.";
        return;
    }

    const ageInput = prompt("Enter the student's age:");

    if (ageInput === null || !ageInput.trim()) {
        message.textContent = "Student age is required.";
        return;
    }

    const course = prompt("Enter the student's course:");

    if (course === null || !course.trim()) {
        message.textContent = "Student course is required.";
        return;
    }

    const student = {
        name: name.trim(),
        age: Number(ageInput),
        course: course.trim()
    };

    message.textContent = "Adding student...";

    addBtn.disabled = true;

    try {
        await addStudentWithPromise(student);

        showStudents();
        message.textContent = `${student.name} added successfully!`;
    } catch (error) {
        message.textContent = error.message;
    } finally {
        addBtn.disabled = false;
    }
}


function changeTheme() {
    document.body.classList.toggle("dark-theme");
}

showBtn.addEventListener("click", function () {
    showStudents();
    message.textContent = `${students.length} students displayed.`;
});

addBtn.addEventListener("click", handleAddStudent);

themeBtn.addEventListener("click", changeTheme);
