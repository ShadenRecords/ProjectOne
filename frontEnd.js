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

    // Event Listeners
    button.addEventListener('click', () => {
        count++;
        updateCounter();
        changeColor();
    });

    // Functions
    function updateCounter() {
        counterDisplay.textContent = `Clicks: ${count}`;
    }

    function changeColor() {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        document.body.style.backgroundColor = randomColor;
    }

    // Simple array of homies
    const homies = ['Xach', 'TBall5', 'Jobiwan', 'Master Caine'];
    
    // Function to randomly shout out a homie
    function shoutOut() {
        const randomHomie = homies[Math.floor(Math.random() * homies.length)];
        return `What's good, ${randomHomie}!`;
    }

    // Add a shoutout button
    const shoutButton = document.createElement('button');
    shoutButton.textContent = "Shout to the Crew";
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

// You can test the class like this:
// const newHomie = new Homie('Chris');
// newHomie.sayHi();