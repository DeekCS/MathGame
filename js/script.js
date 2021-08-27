var n1 , n2;
var score = 0;
var count = 0;
var wrong = 0;

    function check() {
        var sum = n1 + n2;
        var result = document.getElementById("result").value;

        if (sum == result) {
            wrong = 0;
            var myMusic = new sound("happy.mp3");
            myMusic.play();
            score++; 
            count++; 

            document.getElementById("result").value = "";
            t = 0;
            GenerateQ();

            if (score == 10) {
                document.getElementById("sub").style.visibility = "hidden";
                document.getElementById("restart").style.display = "block";
                document.getElementById("result").style.visibility = "hidden";
                document.getElementById("Q").style.visibility = "hidden";

                var s  = 10 - wrong;
                if (s >= 0) {
                    document.getElementById("p1").style.display = "block";
                    var fMusic = new sound("final.mp3");
                    fMusic.play();
                    document.getElementById("Q2").innerHTML=`you win and got ${s}/10`
                }else {
                    document.getElementById("p2").style.display= "block";
                    var fMusic = new sound ("SAD.mp3");
                    fMusic.play();
                    document.getElementById("Q2").innerHTML = `Sorry you lose :( ... And you got ${s}/10`;
                }



            }

        }else {
            wrong = wrong+1;
            alert("wrong ... try again");
        }
    }

        function GenerateQ() {
            n1 = Math.floor(Math.random() * (10)) + 1;
            n2 = Math.floor(Math.random() * (10)) + 1;

            document.getElementById("Q").innerHTML = `Whats ${n1} + ${n2}`;

        }

        window.onload = GenerateQ;
