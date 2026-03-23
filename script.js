// ✅ CREATE POLL
function createPoll() {
    let question = document.getElementById("question").value;
    let opt1 = document.getElementById("option1").value;
    let opt2 = document.getElementById("option2").value;

    if (!question || !opt1 || !opt2) {
        alert("Please fill all fields!");
        return;
    }

    let poll = {
        question: question,
        options: [
            { text: opt1, votes: 0 },
            { text: opt2, votes: 0 }
        ]
    };

    localStorage.setItem("poll", JSON.stringify(poll));

    alert("Poll Created Successfully ✅");

    window.location.replace("admin.html");
}


// ✅ LOAD POLL IN VOTE PAGE
window.onload = function () {

    // 🔹 Vote Page
    if (window.location.href.includes("vote.html")) {

        let poll = JSON.parse(localStorage.getItem("poll"));

        if (!poll) {
            document.body.innerHTML = "<h3>No poll available</h3>";
            return;
        }

        document.getElementById("question").innerText = poll.question;

        let optionsDiv = document.getElementById("options");
        optionsDiv.innerHTML = "";

        poll.options.forEach((opt, index) => {
            optionsDiv.innerHTML += `
                <input type="radio" name="vote" value="${index}">
                ${opt.text}<br><br>
            `;
        });
    }

    // 🔹 Result Page
    if (window.location.href.includes("result.html")) {
        loadResults();
    }
};


// ✅ SUBMIT VOTE
function submitVote() {
    let selected = document.querySelector('input[name="vote"]:checked');

    if (!selected) {
        alert("Please select an option!");
        return;
    }

    let poll = JSON.parse(localStorage.getItem("poll"));

    poll.options[selected.value].votes++;

    localStorage.setItem("poll", JSON.stringify(poll));

    alert("Vote submitted successfully ✅");

    window.location.href = "user.html";
}


// ✅ LOAD RESULTS
function loadResults() {
    let poll = JSON.parse(localStorage.getItem("poll"));

    if (!poll) {
        document.getElementById("results").innerHTML = "<p>No poll data found</p>";
        return;
    }

    document.getElementById("question").innerText = poll.question;

    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    poll.options.forEach(opt => {
        resultsDiv.innerHTML += `
            <p>${opt.text} : ${opt.votes} votes</p>
        `;
    });
}
