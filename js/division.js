        let n1 = Math.floor(Math.random() * 10 * 1)
        let n2 = Math.floor(Math.random() * 10 * 1)
        document.getElementById('v1').innerHTML = n1;
        document.getElementById('v2').innerHTML = n2;
        var count = 0;
        var wrong = 0;
        var score = 0;
        document.getElementById('v1').value = n1;
        document.getElementById('v2').value = n2;
        document.getElementById('restart').style.visibility = "hidden";

        let ans = (n1 / n2);
        ans.toFixed(3);
   

        const jsGame = () => {
            var usera = document.getElementById('answ').value;

            if (usera == ans) {
                audio.play();
                wrong = 0; //wrong answers
                score++;
                count++; //correct answers
                GenerateRandom();

            }
            else {    
                //sad.play();
                wrong = wrong+1;
                document.getElementById('answ').value = " ";
                alert(`Correct Answer is ${ans} Try Again. `);
            }

            if (score == 15) {
                level.play();
                Visible();
                var s = 10 - wrong;
                if (s >= 5) {
                level.play();
                    document.getElementById("final").innerHTML = `you win and got ${s}/10`
                    document.getElementsById('submit').style.visibility = "hidden";
                    document.getElementById('operator').style.visibility = "hidden";
                }else{
                    sad.play();
                    document.getElementById('answ').value = " ";
                    document.getElementById("final").innerHTML = `you lose and got ${s}/10`

                }
            }  
        
        };

        function GenerateRandom() {
            
                    document.getElementById('answ').value = " ";
                    n1 = Math.floor(Math.random() * 10 + 1)
                    n2 = Math.floor(Math.random() * 10 + 1)

                    document.getElementById('v1').innerHTML = n1;
                    document.getElementById('v2').innerHTML = n2;

                    document.getElementById('v1').value = n1;
                    document.getElementById('v2').value = n2;

                    ans = (n1 / n2);
        }

        function Restart() {
            window. location. reload();
        }

        var audio = new Audio('../Congratulations-sound.mp3');
        var sad = new Audio('../sad.wav');
        var level = new Audio('../level.wav')


    function Visible() {
                document.getElementById('v1').style.visibility = "hidden";
                document.getElementById('v2').style.visibility = "hidden";
                document.getElementById('answ').style.visibility = "hidden";
                document.getElementById('submit').style.visibility = "hidden";
                document.getElementById('operator').style.visibility = "hidden";
                document.getElementById('restart').style.visibility = "visible";
    }