
let students = [
    { id: 1, name: "Алина", score: 95 },
    { id: 2, name: "Бекзат", score: 72 },
    { id: 3, name: "Даниэль", score: 48 }
];


function createIdGenerator() {
    let id = 3;

    return function() {
        id++;
        return id;
    };
}

const generateId = createIdGenerator();


const minScore = min => student => student.score >= min;


function sumScores(arr, index = 0) {
    if (index === arr.length) {
        return 0;
    }

    return arr[index].score + sumScores(arr, index + 1);
}


const form = document.querySelector("#studentForm");
const nameInput = document.querySelector("#name");
const scoreInput = document.querySelector("#score");
const list = document.querySelector("#studentList");
const search = document.querySelector("#search");
const average = document.querySelector("#average");
const message = document.querySelector("#message");


function showStudents() {
    list.innerHTML = "";

    let filtered = students.filter(student =>
        student.name.toLowerCase().includes(search.value.toLowerCase())
    );

    filtered.forEach(student => {
        const div = document.createElement("div");
        div.className = "student";

        div.innerHTML = `
            <b>${student.name}</b>
            <p>Баллы: ${student.score}</p>
            <button class="delete">Удалить</button>
        `;

        div.querySelector("button").addEventListener("click", function() {
            students = students.filter(s => s.id !== student.id);
            showStudents();
        });

        list.append(div);
    });

    let avg = students.length
        ? (sumScores(students) / students.length).toFixed(1)
        : 0;

    average.textContent = "Средний балл: " + avg;
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = nameInput.value.trim();
    let score = Number(scoreInput.value);

    if (name === "" || scoreInput.value === "" || score < 0 || score > 100) {
        message.textContent = "Введите правильные данные!";
        return;
    }

    students.push({
        id: generateId(),
        name: name,
        score: score
    });

    nameInput.value = "";
    scoreInput.value = "";

    message.textContent = "Студент успешно добавлен!";

    setTimeout(function() {
        message.textContent = "";
    }, 3000);

    showStudents();
});


search.addEventListener("input", showStudents);


document.querySelector("#sort").addEventListener("click", function() {
    students.sort((a, b) => b.score - a.score);
    showStudents();
});


function updateClock() {
    let now = new Date();

    document.querySelector("#clock").textContent =
        now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();


const passed = students.filter(minScore(50));

console.log("Сдавшие:", passed);


showStudents();
