// init variables
let v1 = document.getElementById('v1');
let v2 = document.getElementById('v2');
let inputBox = document.getElementById('answ');
let finalResult = document.getElementById('final');
let submitBtn = document.getElementById('submit');

// init audio resources
let audio = new Audio('Congratulations-sound.mp3');
let sad = new Audio('sad.wav');
let level = new Audio('level.wav');

class Question {

    static operator = "+";
    
    constructor() {
        this.num1 = Math.floor(Math.random() * 11);
        this.num2 = Math.floor(Math.random() * 11);
        this._correctAnswer;
        this.render();
    }

    operation() {
        if(Question.operator === "+") {
            return function(num1, num2) { return num1 + num2 };
        }else if(Question.operator === "*") {
            return function(num1, num2) { return num1 * num2 };
        }else if(Question.operator === "/") {
            return function(num1, num2) { return num1 / num2 };
        }else if(Question.operator === "-") {
            return function(num1, num2) { return num1 - num2 };
        }
    }

    check(input) {
        this._correctAnswer = this.operation()(this.num1, this.num2);
        if (+input === this._correctAnswer) {
            audio.play();
            return true;
        }

        sad.play();
        return false;
    }

    render() {
        inputBox.value = '';
        operator.innerHTML = Question.operator;
        v1.innerHTML = this.num1;
        v2.innerHTML = this.num2;
        v1.value = this.num1;
        v2.value = this.num2;
    }
}

class Quiz {
    score = 0;
    questionCount = 0;
    level = 1; // difficulty level

    enterNextLevel() {
        this.level++;

        // restart from the beginning if reach the max level
        if(this.level > 3) this.level = this.level % 3;
        
        if(this.level === 1) {
            Question.operator = "+";
            Question.operator = "-";
        }else if(this.level === 2) {
            Question.operator = "*";
        }else if(this.level === 3) {
            Question.operator = "/";
        }
    }

    end() {
        this.toggleDisplayResult(true);
        
        if (this.score >= 5) {
            // continue to the next level, or restart the game
		    level.play();
			finalResult.innerHTML = `you win and got ${this.score}/10`;
            restart.innerHTML = this.level === 3 ? "Replay" : "Enter Next Level";
            this.enterNextLevel();
		} else {
            // restart the current level
			sad.play();
			finalResult.innerHTML = `you lose and got ${this.score}/10`;
            restart.innerHTML = "Restart";
		}

        restart.onclick = () => {
            this.score = 0;
            this.questionCount = 0;
            this.toggleDisplayResult(false);
            runGame();
        };
    }

    toggleDisplayResult(on) {
        if(on) {
            v1.style.visibility = 'hidden';
            v2.style.visibility = 'hidden';
            inputBox.style.visibility = 'hidden';
            submitBtn.style.visibility = 'hidden';
            operator.style.visibility = 'hidden';
            restart.style.visibility = 'visible';
        }else {
            v1.style.visibility = 'visible';
            v2.style.visibility = 'visible';
            inputBox.style.visibility = 'visible';
            submitBtn.style.visibility = 'visible';
            operator.style.visibility = 'visible';
            restart.style.visibility = 'hidden';      
            finalResult.innerHTML = "";     
        }
    }
}


let quiz = new Quiz();

function runGame() {
    let q = new Question();

    restart.style.visibility = 'hidden';
    
    submitBtn.onclick = () => {
        if(quiz.questionCount === 5) {
            quiz.end();
            return;
        }
    
        if(q.check(inputBox.value)) {
            quiz.score += 2;
        }
    
        q = new Question();
        quiz.questionCount++;   
    };
}

runGame();
