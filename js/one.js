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
    constructor() {
        this.num1 = Math.floor(Math.random() * 11);
        this.num2 = Math.floor(Math.random() * 11);
        this.correctAnswer = this.num1 + this.num2;
        this.render();
    }

    check(input) {
        if (+input === this.correctAnswer) {
            audio.play();
            return true;
        } 
        sad.play();
        return false;
    }

    render() {
        inputBox.value = '';
        v1.innerHTML = this.num1;
        v2.innerHTML = this.num2;
        v1.value = this.num1;
        v2.value = this.num2;
    }
}

class Quiz {
    score = 0;
    questionCount = 0;

    end() {
        this.renderEndStyles();
        if (this.score >= 5) {
		    level.play();
			finalResult.innerHTML = `you win and got ${this.score}/10`;
		} else {
			sad.play();
			finalResult.innerHTML = `you lose and got ${this.score}/10`;
		}
    }

    restart() {
        window.location.reload();
    }

    renderEndStyles() {
        v1.style.visibility = 'hidden';
        v2.style.visibility = 'hidden';
        inputBox.style.visibility = 'hidden';
        submitBtn.style.visibility = 'hidden';
        operator.style.visibility = 'hidden';
        restart.style.visibility = 'visible';
    }
}

// main
(() => {
    let q = new Question();
    let quiz = new Quiz();

    restart.style.visibility = 'hidden';
    
    submitBtn.addEventListener('click', () => {
        if(quiz.questionCount === 5) {
            quiz.end();
            return;
        }
    
        if(q.check(inputBox.value)) {
            quiz.score += 2;
        }

        q = new Question();
        quiz.questionCount++;
    });

    restart.addEventListener('click', () => {
        quiz.restart();
    });

})();
