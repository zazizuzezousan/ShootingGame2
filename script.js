const $gameDisplay = document.getElementById("gameDisplay");
const $spaceShip = document.getElementById("spaceShip");
const $leftB = document.getElementById("leftB");
const $shootB = document.getElementById("shootB");
const $rightB = document.getElementById("rightB");
const $result = document.getElementById("result");
const $score = document.getElementById("score");
const $startInfo = document.getElementById("startInfo");
const $shotS = document.getElementById("shotS");
const $hitS = document.getElementById("hitS");
const $gameoverS = document.getElementById("gameoverS");

let spaceShipPlace = $gameDisplay.clientWidth * 45 / 100;
let SSmoveInteval;

let NumberofShot = 0;
let createBullet = [];
let BulletBottom = [];
let BshotInteval = [];
let SPossibility = true;
let i = [];

let NumberofEnemy = 0;
let createEnemy = [];
let EnemyTop = [];
let EoccurInterval = [];

let gameover = false;
let hitScore = 0;

window.onload = function(){
    document.addEventListener("keypress",function(e){
        switch (e.keyCode){
            case 97:
                SSmove("left")
                break;
            case 100:
                SSmove("right");
                break;
            case 32:
                Bshot(NumberofShot);
                break;
        }
    });
}

function SSmove(direction){
    if(!gameover){
        $startInfo.style.display = "none";
        clearInterval(SSmoveInteval);
        SSmoveInteval = setInterval(function(){
            if(direction == "left" && spaceShipPlace > 0){
                spaceShipPlace--;
            }
            if(direction == "right" && spaceShipPlace <= $gameDisplay.clientWidth - $spaceShip.clientWidth){
                spaceShipPlace++;
            }
            $spaceShip.style.left = spaceShipPlace + "px";
            if(0 == Math.floor(Math.random() * 201)){
                Eoccur(NumberofEnemy);
            }
            const enemies = document.getElementsByClassName("enemies");
            let j = 0;
            while(j < enemies.length){
                if( $spaceShip.getBoundingClientRect().left < enemies[j].getBoundingClientRect().left + enemies[j].clientWidth &&
                    $spaceShip.getBoundingClientRect().left + $spaceShip.clientWidth > enemies[j].getBoundingClientRect().left &&
                    $spaceShip.getBoundingClientRect().top < enemies[j].getBoundingClientRect().top + enemies[j].clientHeight &&
                    $spaceShip.getBoundingClientRect().top + $spaceShip.clientHeight > enemies[j].getBoundingClientRect().top){
                        clearInterval(SSmoveInteval);
                        gameover = true;
                        $gameoverS.play();
                        $result.style.display = "block";
                        $score.innerText = hitScore;
                        break;
                }
                j++;
            }
        },5);
    }
}

function Bshot(ShotNumber){
    if(!gameover && SPossibility){
        SPossibility = false;
        setTimeout(function(){
            SPossibility = true;
        },250);
        createBullet[ShotNumber] = document.createElement("div");
        createBullet[ShotNumber].classList.add("bullets");
        createBullet[ShotNumber].style.left = spaceShipPlace + $spaceShip.clientWidth / 2 + "px";
        $gameDisplay.appendChild(createBullet[ShotNumber]);
        BulletBottom[ShotNumber] = $spaceShip.clientHeight;
        $shotS.currentTime = 0;
        $shotS.play();
        BshotInteval[ShotNumber] = setInterval(function(){
            BulletBottom[ShotNumber]++;
            createBullet[ShotNumber].style.bottom = BulletBottom[ShotNumber] + "px";
            const enemies = document.getElementsByClassName("enemies");
            i[ShotNumber] = 0;
            while(i[ShotNumber] < enemies.length){
                if( createBullet[ShotNumber].getBoundingClientRect().left < enemies[i[ShotNumber]].getBoundingClientRect().left + enemies[i[ShotNumber]].clientWidth &&
                    createBullet[ShotNumber].getBoundingClientRect().left + createBullet[ShotNumber].clientWidth > enemies[i[ShotNumber]].getBoundingClientRect().left &&
                    createBullet[ShotNumber].getBoundingClientRect().top < enemies[i[ShotNumber]].getBoundingClientRect().top + enemies[i[ShotNumber]].clientHeight &&
                    createBullet[ShotNumber].getBoundingClientRect().top + createBullet[ShotNumber].clientHeight > enemies[i[ShotNumber]].getBoundingClientRect().top){
                        clearInterval(BshotInteval[ShotNumber]);
                        clearInterval(EoccurInterval[enemies[i[ShotNumber]].id]);
                        createBullet[ShotNumber].remove();
                        enemies[i[ShotNumber]].remove();
                        hitScore++;
                        $hitS.currentTime = 0;
                        $hitS.play();
                        break;
                }
                i[ShotNumber]++;
            }
            if(BulletBottom[ShotNumber] > $gameDisplay.clientHeight - createBullet[ShotNumber].clientHeight){
                clearInterval(BshotInteval[ShotNumber]);
                createBullet[ShotNumber].remove();
            }
        },1);
        NumberofShot++;
    }
}

function Eoccur(enemyNumber){
    createEnemy[enemyNumber] = document.createElement("div");
    createEnemy[enemyNumber].classList.add("enemies");
    createEnemy[enemyNumber].id = enemyNumber;
    createEnemy[enemyNumber].style.left = Math.random() * ($gameDisplay.clientWidth * 95 / 100) + "px";
    $gameDisplay.appendChild(createEnemy[enemyNumber]);
    EnemyTop[enemyNumber] = 0;
    EoccurInterval[enemyNumber] = setInterval(function(){
        EnemyTop[enemyNumber]++;
        createEnemy[enemyNumber].style.top = EnemyTop[enemyNumber] + "px";
        if(EnemyTop[enemyNumber] > $gameDisplay.clientHeight - createEnemy[enemyNumber].clientHeight){
            clearInterval(EoccurInterval[enemyNumber]);
            createEnemy[enemyNumber].remove();
        }
    },10);
    NumberofEnemy++;
}