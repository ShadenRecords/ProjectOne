document.addEventListener('DOMContentLoaded', () => {
    // Basic console greeting
    console.log("Yo! The page is loaded and ready for action!");

    // DOM Elements
    const title = document.querySelector('h1');
    const button = document.createElement('button');
    button.textContent = "Click Me, Homie!";
    document.body.appendChild(button);

    // Simple counter
    let count = 0;
    const counterDisplay = document.createElement('p');
    document.body.appendChild(counterDisplay);
    updateCounter();

    // Fetch the initial click count from the server
    fetch('/click-count')
        .then(response => response.json())
        .then(data => {
            count = data.count;
            updateCounter();
        });

    // Event Listeners
    button.addEventListener('click', () => {
        count++;
        updateCounter();
        changeColor();
        updateClickCountOnServer(count);
    });

    // Functions
    function updateCounter() {
        counterDisplay.textContent = `Clicks: ${count}`;
    }

    function changeColor() {
        const greyShade = Math.floor(Math.random() * 256);
        const greyColor = `rgb(${greyShade}, ${greyShade}, ${greyShade})`;
        document.body.style.backgroundColor = greyColor;
    }

    // Function to update the click count on the server
    function updateClickCountOnServer(newCount) {
        fetch('/click-count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ count: newCount })
        });
    }

    // Simple array of homies
    const homies = ['Xach', 'TBall5', 'Jobiwan', 'Master Caine', 'Young Temple', 'Brother Britt'];
    
    // Function to randomly shout out a homie
    function shoutOut() {
        const randomHomie = homies[Math.floor(Math.random() * homies.length)];
        return `What's good, ${randomHomie}!`;
    }

    // Add a shoutout button
    const shoutButton = document.createElement('button');
    shoutButton.textContent = "What's Good";
    document.body.appendChild(shoutButton);

    shoutButton.addEventListener('click', () => {
        alert(shoutOut());
    });
});

// Simple utility function you can use later
function greet(name) {
    return `Sup ${name}, welcome to the squad!`;
}

// Example of a basic class (if you want to get fancy)
class Homie {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log(`${this.name} says what's good!`);
    }
}

// You can test the class like Testies this:
// const newHomie = new Homie('Chris');
// newHomie.sayHi();