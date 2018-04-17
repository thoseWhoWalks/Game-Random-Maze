// managing DOMElements
var field = document.getElementById("field");
var player = field.querySelector("#player");

//Moduls
class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

//variables declaration
var wallCoords = [new Coords(0, 0)];
var wallFrequencyCofficent = 6;

//constant variables
const WALL_CELL_HIGHT = 20;
const WALL_CELL_WIDTH = 20;
const PLAYER_HORIZONTAL_STEP = WALL_CELL_HIGHT / 2;
const PLAYER_VERTTICAL_STEP = WALL_CELL_WIDTH / 2;
var FINAL_DESTANATION;
var FIELD_WIDTH;
var FIELD_HEIGHT;

//controls keys enumeraion
var controlsEnum = {
    up: 87,
    down: 83,
    left: 68,
    right: 65
}

//events subscription

document.onkeyup = function (e) {

    let playerLeft = parseInt(player.style.left);
    let playerTop = parseInt(player.style.top);

    if (!moveCapabilityCheck(e.keyCode, playerLeft, playerTop))
        return;

    moveCharacter(e, playerTop, playerLeft);

    winCheck();

}

document.onload = generateField();

//functions
function setResponsiveFieldSizes() {
    field.width = document.documentElement.clientWidth + 'px';
    FIELD_WIDTH = document.documentElement.clientWidth;
    field.style.height = document.documentElement.clientHeight + 'px';
    FIELD_HEIGHT = document.documentElement.clientHeight;
}

function generateField() {

    setResponsiveFieldSizes();

    var finalDestinationId = getRandom((FIELD_HEIGHT / WALL_CELL_HIGHT) - 2, 2);
    let widthCofficient = Math.round(FIELD_WIDTH / WALL_CELL_WIDTH);
    let heightCofficient = Math.round(FIELD_HEIGHT / WALL_CELL_HIGHT);

    playerStartPositionSet();

    for (var i = 0; i < widthCofficient; i++) {
        for (var j = 0; j < heightCofficient; j++) {
            if (finalDestinationId == j && i == widthCofficient - 1) {
                addDestPoint(i, j);
                continue;
            }
            let randNumber = getRandom(10, -1);
            if ((randNumber > wallFrequencyCofficent || i == 0 || i == widthCofficient - 1 || j == 0 || j == heightCofficient - 1)) {
                if ((i == 1 && j == 1) || (j == finalDestinationId && i == widthCofficient - 1) || (j == finalDestinationId && i == widthCofficient - 2)) continue;
                addWall(i, j);
            }
        }
    }
}

function playerStartPositionSet() {
    player.style.left = WALL_CELL_WIDTH + 'px';
    player.style.top = WALL_CELL_HIGHT + 'px';
}

function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function addWall(i, j) {
    var wall = document.createElement("div");
    wall.id = "wall";
    wall.style.left = i * WALL_CELL_WIDTH + 'px';
    wall.style.top = j * WALL_CELL_HIGHT + 'px';
    wallCoords.push(new Coords((i * WALL_CELL_WIDTH), (j * WALL_CELL_HIGHT)));
    field.appendChild(wall);
}

function addDestPoint(i, j) {
    FINAL_DESTANATION = document.createElement("div");
    FINAL_DESTANATION.id = "destPoint";
    FINAL_DESTANATION.style.left = i * WALL_CELL_WIDTH + 'px';
    FINAL_DESTANATION.style.top = j * WALL_CELL_HIGHT + 'px';
    field.appendChild(FINAL_DESTANATION);
}

//move functions

function moveCapabilityCheck(direction, playerLeft, playerTop) {

    switch (direction) {
        case controlsEnum.up:
            {
                for (var i = 0; i < wallCoords.length; i++)
                    if ((playerLeft == wallCoords[i].x || playerLeft - PLAYER_HORIZONTAL_STEP == wallCoords[i].x) && (playerTop - WALL_CELL_HIGHT == wallCoords[i].y))
                        return false;
                return true;
                break;
            }
        case controlsEnum.down:
            {
                for (var i = 0; i < wallCoords.length; i++)
                    if ((playerLeft == wallCoords[i].x || playerLeft - PLAYER_HORIZONTAL_STEP == wallCoords[i].x) && (playerTop + PLAYER_VERTTICAL_STEP == wallCoords[i].y))
                        return false;
                return true;
                break;
            }
        case controlsEnum.right:
            {
                for (var i = 0; i < wallCoords.length; i++)
                    if (playerLeft - PLAYER_HORIZONTAL_STEP == wallCoords[i].x + PLAYER_HORIZONTAL_STEP && (playerTop == wallCoords[i].y || playerTop == wallCoords[i].y + 10))
                        return false;
                return true;
                break;
            }
        case controlsEnum.left:
            {
                for (var i = 0; i < wallCoords.length; i++)
                    if (playerLeft + PLAYER_HORIZONTAL_STEP == wallCoords[i].x && (playerTop == wallCoords[i].y || playerTop == wallCoords[i].y + 10))
                        return false;
                return true;
                break;
            }
        default:
            return true;
    }

}

function moveCharacterUp(playerTop) {
    if (playerTop)
        player.style.top = -PLAYER_VERTTICAL_STEP + playerTop + 'px';
    else
        player.style.top = -PLAYER_VERTTICAL_STEP + 'px';
}

function moveCharacterDown(playerTop) {
    if (playerTop)
        player.style.top = PLAYER_VERTTICAL_STEP + playerTop + 'px';
    else
        player.style.top = PLAYER_VERTTICAL_STEP + 'px';
}

function moveCharacterRight(playerLeft) {
    if (playerLeft)
        player.style.left = -PLAYER_HORIZONTAL_STEP + playerLeft + 'px';
    else
        player.style.availLeft = -PLAYER_HORIZONTAL_STEP + 'px';
}

function moveCharacterLeft(playerLeft) {
    if (playerLeft)
        player.style.left = PLAYER_HORIZONTAL_STEP + playerLeft + 'px';
    else
        player.style.left = PLAYER_HORIZONTAL_STEP + 'px';
}

function moveCharacter(direction, playerTop, playerLeft) {
    switch (direction.keyCode) {
        case controlsEnum.up:
            {
                moveCharacterUp(playerTop);

                break;
            }
        case controlsEnum.down:
            {
                moveCharacterDown(playerTop);

                break;
            }
        case controlsEnum.right:
            {
                moveCharacterRight(playerLeft);

                break;
            }
        case controlsEnum.left:
            {
                moveCharacterLeft(playerLeft);

                break;
            }
    }
}

//end move functions

function winCheck() {

    let playerLeft = parseInt(player.style.left);
    let playerTop = parseInt(player.style.top);

    if (playerLeft == parseInt(FINAL_DESTANATION.style.left) && (playerTop == parseInt(FINAL_DESTANATION.style.top) || (playerTop == parseInt(FINAL_DESTANATION.style.top) + PLAYER_VERTTICAL_STEP))) onWin();
}

function onWin() {
    setTimeout(function () {
        alert('You won!');
        location.reload();
    }, 10);
}
