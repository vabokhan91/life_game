window.onload = function () {
    class Predator {
        constructor(image, x, y) {
            this.image = image;
            this.x = x;
            this.y = y;
        }

        draw(ctx){
           ctx.drawImage(this.image, this.x, this.y, ctx.cellWidth, ctx.cellHeight);
        }

        move(entities){
            var entitiesLength = entities.length;
            var newCoordinates = chooseNextStep(this.x, this.y);
            var isCellClosed = true;
            while (isCellClosed) {
                for (var i = 0; i < entitiesLength; ) {
                    if (entities[i].x === newCoordinates.x && entities[i].y === newCoordinates.y) {
                        newCoordinates = chooseNextStep(this.x, this.y);
                        i = 0;
                    }else {
                        i++;
                    }
                }
                this.x = newCoordinates.x;
                this.y = newCoordinates.y;
                isCellClosed = false;
            }
        }
    }

    class Victim {
        constructor(image, x, y) {
            this.image = image;
            this.x = x;
            this.y = y;
        }

        draw(ctx){
            ctx.drawImage(this.image, this.x, this.y, ctx.cellWidth, ctx.cellHeight);
        }

        move(entities){
            var entitiesLength = entities.length;
            var newCoordinates = chooseNextStep(this.x, this.y);
            var isCellClosed = true;
            while (isCellClosed) {
                for (var i = 0; i < entitiesLength; ) {
                    if (entities[i].x === newCoordinates.x && entities[i].y === newCoordinates.y) {
                        newCoordinates = chooseNextStep(this.x, this.y);
                        i = 0;
                    }else {
                        i++;
                    }
                }
                this.x = newCoordinates.x;
                this.y = newCoordinates.y;
                isCellClosed = false;
            }

        }


    }

    var c = document.getElementById('game_grid');
    var ctx = c.getContext('2d');

    function game(width, height, density, times) {
        var entities = [];
        drawGrid(width, height);
        initEntities(density, entities);
        let counter = 0,
            interval;

        interval = window.setInterval(function () {
            var entLength = entities.length;
            for(var p = 0; p < entLength; p++) {
                ctx.clearRect(entities[p].x, entities[p].y, 25, 25);
            }
            for (var j = 0; j < entLength; j++) {
                entities[j].move(entities);
            }
            for (var i = 0; i < entLength; i++) {
                entities[i].draw(ctx);
            }

            counter++;
            if (counter === times) {
                clearInterval(interval);
            }
        }, 5000)
    }

    function makeMove(entities) {
        var entityLength = entities.length;


    }

    function chooseNextStep(x, y) {
        var nextX = getRandomArbitrary(x - 30, x + 30);
        if(nextX < 0 || nextX > 270) {
            nextX = x;
        } else if(nextX > x){
            while (nextX > 0 && !(Math.floor(nextX % 30) === 0)) {
                nextX += 1;
            }
            nextX = Math.floor(nextX) + 1;
        }else if(nextX < x){
            while (nextX > 0 && !(Math.floor(nextX % 30) === 0)) {
                nextX -= 1;
            }
            nextX = Math.floor(nextX) + 1;
        }
        var nextY = getRandomArbitrary(y - 30, y + 30);
        if(nextY < 0 || nextY > 270) {
            nextY = y;
        } else if(nextY < y){
            while (nextY > 0 && !(Math.floor(nextY % 30) === 0)) {
                nextY -= 1;
            }
            nextY = Math.floor(nextY) + 1;
        }else if(nextY > y){
            while (nextY > 0 && !(Math.floor(nextY % 30) === 0)) {
                nextY += 1;
            }
            nextY = Math.floor(nextY) + 1;
        }

        var coordinate = {
            x: nextX,
            y: nextY
        };
        return coordinate;
    }


    function drawGrid(width, height) {
        c.width = width;
        c.height = height;
        ctx.cellWidth = 25;
        ctx.cellHeight = 25;
        ctx.width = width;
        ctx.height = height;
        ctx.lineWidth = 1;
        d = 30;
        for (i = 0; i <= 300; i = i + d) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 300);
            ctx.stroke();
        }
        for (j = 0; j <= 300; j = j + d) {
            ctx.moveTo(0, j);
            ctx.lineTo(300, j);
            ctx.stroke();
        }

    }

    function initEntities(density, entities) {
        var numberOfEntities = 100 - density * 100;

        for (var i = 0; i < numberOfEntities; i++) {
            addEntity(entities, ctx);
        }

    }

    function addEntity(entities, ctx) {
        var isCellClosed = true;
        var coordinates = choosePosition(ctx);
        var entitiesLength = entities.length;
        if (entitiesLength > 0) {
            while (isCellClosed) {
                for (var i = 0; i < entitiesLength; i++) {
                    if (entities[i].x === coordinates.x || entities[i].y === coordinates.y) {
                        coordinates = choosePosition(ctx);
                        i = 0;
                    }
                }
                isCellClosed = false;
            }
        }
        if (Math.random() >= 0.5) {
            var pred = addPredator(coordinates.x, coordinates.y);
            entities[entitiesLength] = pred;
        } else {
            var victim = addVictim(coordinates.x, coordinates.y);
            entities[entitiesLength] = victim;
        }

    }

    function addVictim(x, y) {
        var victim = new Victim(document.getElementById('victim'), x, y, ctx);
        return victim;
    }

    function addPredator(x, y) {
        var predator = new Predator(document.getElementById('predator'), x, y);
        return predator;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function choosePosition(ctx) {
        var x = getRandomArbitrary(0, ctx.width - 30);
        while (x > 0 && !(Math.floor(x % 30) === 0)) {
            x += 1;
        }
        x = Math.floor(x) + 1;
        var y = getRandomArbitrary(0, ctx.height - 30);
        while (y > 0 && !(Math.floor(y % 30) === 0)) {
            y += 1;
        }
        y = Math.floor(y) + 1;
        var coordinate = {
            x: x,
            y: y
        };
        return coordinate;
    }

    game(300, 300, 0.9, 10);
};