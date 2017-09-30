(function () {

    var tank = document.getElementById('tank');

    var hwall = document.querySelectorAll("[hwallno]");
    var vwall = document.querySelectorAll(".wall");
    var playgd = document.getElementById('playground');
    var turret = document.querySelector('#turret');
    var trophy = document.querySelector('#trophy');

    var spanscore = document.getElementById('spanscore');
    var value = 1000;
    spanscore.innerHTML = 1000;

    if (tank.style.top === '') {
        tank.style.top = '0px';
        tank.style.left = '80%';
        tank.direction = 'south';
    }

    function F2RunOnKeyPress() {
        var deltaX = 0, deltaY = 0;
        var dx = 1, dy = 2;

        switch (window.event.which) {

            case 97:
                if (tank.direction === 'south')
                    tank.direction = 'east';

                else if (tank.direction === 'east')
                    tank.direction = 'north';

                else if (tank.direction === 'north')
                    tank.direction = 'west';

                else if (tank.direction === 'west')
                    tank.direction = 'south';

                tank.className = tank.direction;
                break;


            case 100:
                if (tank.direction === 'south') {
                    tank.direction = 'west';
                }
                else if (tank.direction === 'east') {
                    tank.direction = 'south';
                }
                else if (tank.direction === 'north') {
                    tank.direction = 'east';
                }
                else if (tank.direction === 'west') {
                    tank.direction = 'north';
                }
                tank.className = tank.direction;
                break;


            case 115:

                if (tank.direction === 'south') {
                    deltaY = -2 * dy;
                }
                else if (tank.direction === 'east') {
                    deltaX = -1 * dx;
                }
                else if (tank.direction === 'north') {
                    deltaY = +2 * dy;
                }
                else if (tank.direction === 'west') {
                    deltaX = +1 * dx;
                }
                tank.className = tank.direction;
                break;


            case 119:
                if (tank.direction === 'south') {
                    deltaY = +2 * dy;
                }
                else if (tank.direction === 'east') {
                    deltaX = +1 * dx;
                }
                else if (tank.direction === 'north') {
                    deltaY = -2 * dy;
                }
                else if (tank.direction === 'west') {
                    deltaX = -1 * dx;
                }
                tank.className = tank.direction;
                break;
            default:
                break;
        }

        var orgT = window.parseInt(tank.style.top, 10);
        var orgL = window.parseInt(tank.style.left, 10);
        tank.style.top = orgT + deltaY + 'px';

        tank.style.left = orgL + deltaX + '%';

        window.scrollBy(0, deltaY);
        window.setTimeout(timer, 0);
    }


    function timer() {
        for (i = 0; i < hwall.length; i++) {
            if (isColliding(hwall[i], tank) === true || isColliding(hwall[i], turret) === true)
                alert("Game Over,lose");
        }

        for (i = 0; i < vwall.length; i++) {
            if (isColliding(vwall[i], tank) === true || isColliding(vwall[i], turret) === true)
                alert("Game Over,lose");

        }

        if (isColliding(playgd, tank) === false || isColliding(playgd, turret) === false)
            alert("Game Over,lose");



        if (isColliding(trophy, tank) || isColliding(trophy, turret))
            alert("Game Over,you win with a score of " + value);
    }


    function score() {
        value--;
        spanscore.innerHTML = value;
    }

    function isColliding(box1, box2) {
        box1 = box1.getBoundingClientRect(); box2 = box2.getBoundingClientRect();
        var x1 = box1.left, y1 = box1.top;
        var w1 = box1.width, h1 = box1.height;

        var x2 = box2.left, y2 = box2.top;
        var w2 = box2.width, h2 = box2.height;
        if (x2 >= x1 && x2 <= (x1 + w1)) {

            if (y2 >= y1 && y2 <= (y1 + h1)) {
                return true;
            }
            else if (y1 >= y2 && y1 <= (y2 + h2)) {
                return true;
            }

        }

        else if (x1 >= x2 && x1 <= (x2 + w2)) {

            if (y2 >= y1 && y2 <= (y1 + h1)) {
                return true;
            }
            else if (y1 >= y2 && y1 <= (y2 + h2)) {
                return true;
            }


        }
        return false;
    }
    window.setInterval(score, 1000);
    window.addEventListener('keypress', F2RunOnKeyPress);
})();