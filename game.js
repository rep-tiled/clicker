        /*remove weirdness*/
        document.getElementById('mainButton').setAttribute('draggable', false); //anti drag

        /*setup player*/
        var score = 0;
        var scorePerSecond = 0;
        var factoryName = "Get Real";
        var clickingPower = 1;

        /*setup items*/
        macros = 0;
        joycons = 0;
        aimbots = 0;

        /*setup prices*/
        macroCost = 15;
        joyconCost = 100;
        aimbotCost = 1100;

        /*save game*/
        function saveGame(){
            var gameSave = {
                /*player*/
                score: score,
                factoryName: factoryName,
                clickingPower: clickingPower,
                /*items*/
                macros: macros,
                joycons: joycons,
                aimbots: aimbots,
                /*costs*/
                macroCost: macroCost,
                joyconCost: joyconCost,
                aimbotCost: aimbotCost
            }
            localStorage.setItem("clickerSave", JSON.stringify(gameSave));
        }

        /*load game*/
        function loadGame(){
            var savedGame = JSON.parse(localStorage.getItem("gameSave"));
            if (typeof saveGame.score != "undefined") score = saveGame.score;
        }

        /*buy*/
        function buyMacro(){
            if (score >= macroCost){
                score = score - macroCost;
                macros = macros + 1;
                macroCost = Math.round(macroCost * 1.15);
                /*visual updates*/
                document.getElementById("score").innerHTML = formatCash(score);
                document.getElementById("macros").innerHTML = macros;
                document.getElementById("macroCost").innerHTML = macroCost;
                /*update score per second*/
                updateScorePerSecond();
            }
        }

        function buyJoycon(){
            if (score >= joyconCost){
                score = score - joyconCost;
                joycons = joycons + 1;
                joyconCost = Math.round(joyconCost * 1.15);
                /*visual updates*/
                document.getElementById("score").innerHTML = formatCash(score);
                document.getElementById("joycons").innerHTML = joycons;
                document.getElementById("joyconCost").innerHTML = joyconCost;
                /*update score per second*/
                updateScorePerSecond();
            }
        }

        function buyAimbot(){
            if (score >= aimbotCost){
                score = score - aimbotCost;
                aimbots = aimbots + 1;
                aimbotCost = Math.round(aimbotCost * 1.15);
                /*visual updates*/
                document.getElementById("score").innerHTML = formatCash(score);
                document.getElementById("aimbots").innerHTML = aimbots;
                document.getElementById("aimbotCost").innerHTML = aimbotCost;
                /*update score per second*/
                updateScorePerSecond();
            }
        }

        /*progress score function*/
        function addToScore(amount){
            score = score + amount;   
            document.getElementById("score").innerHTML = formatCash(score);
        }

        /*MPS*/
        function updateScorePerSecond(){
            scorePerSecond = macros + (joycons * 5);
            document.getElementById("scorePerSecond").innerHTML = scorePerSecond;
        }

        /*K formater*/
        const formatCash = n => {
        if (n < 1e3) return n;
        if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
        };


        /*money cheat*/
        function cheatMoney(){
            score = 1562;
        }

        /*income from items*/
        setInterval(function(){
            /*macro payload*/
            score = score + macros;
            /*joycon payload*/
            score = score + (joycons * 5);
            /*aimbot payload*/
            score = score + (aimbots * 10)
            /*update score*/
            document.getElementById("score").innerHTML = formatCash(score);
            /*update the title of page*/
            document.title = score + " score - Lizard's Clicker"
        },1000); //1000ms is 1 second

        /*save loop*/
        setInterval(function(){
            saveGame();
        },3000);