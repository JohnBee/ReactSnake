import React, { useState, useEffect } from 'react';
import { GridWorld, checkCoordinate } from "./GridWorld";

export function Snake(props){

    const [worldHeight, worldWidth] = [20, 20];


    const [snakeBody, setSnakeBody] = useState(getInitSnakeBody());
    const [snakeDirection, setSnakeDirection] = useState(0);
    const [foodPos, setFoodPos] = useState(placeFood());
    const [score, setScore] = useState(0);
    const [hiscore, setHiscore] = useState(0);
    const [play, setPlay] = useState(false);

    function getInitSnakeBody(){
        let out = [[worldWidth/2-2,worldHeight/2],[worldWidth/2-1,worldHeight/2],[worldWidth/2, worldHeight/2]];
        return out;
    }

    function gameOver(){
        if(score > hiscore){
            setHiscore(score);
        }
        setPlay(false);
        setScore(0);
        setSnakeBody([[],...getInitSnakeBody()]);
        setSnakeDirection(0);
        setFoodPos(placeFood());

    }
    function isGameOver(){
        let head = snakeBody[snakeBody.length - 1];
        for(let i = 0; i < snakeBody.length - 1; i++){
            if(snakeBody[i][0] === head[0] && snakeBody[i][1] === head[1]){
                return true;
            }
        }
        if(head[0] >= worldWidth || head[1] >= worldHeight){
            return true;
        }
        if(head[0] < 0 || head[1] < 0){
            return true;
        }
        return false;
    }
    function placeFood(){
        let allPossible = [];
        for(let y = 0; y < worldHeight; y++){
            for(let x = 0; x < worldWidth; x++){
                allPossible.push([x, y]);
            }
        }
        let onlyPossible = allPossible.filter( coord => (checkCoordinate(coord, snakeBody) === -1) );
        let x = onlyPossible[Math.round(Math.random()*onlyPossible.length)]
        //console.log(Math.random(onlyPossible.length));
        return x;
    }

    function moveSnake(){
        let head = snakeBody[snakeBody.length - 1];
        let next = [0, 0];
        switch(snakeDirection){
            case(0): next = [head[0]+1, head[1]];
            break;
            case(1): next = [head[0], head[1]+1];
            break;
            case(2): next = [head[0]-1, head[1]];
            break;
            case(3): next = [head[0], head[1]-1];
            break;
            default: break;
        }
        setSnakeBody((prev) => [...prev, next]);
        if(next[0]===foodPos[0] && next[1]===foodPos[1]){
            setFoodPos(placeFood());
            setScore(prev => prev + 1);
        }
        else {
            setSnakeBody((prev) => prev.slice(1));
        }

    }
    function onKeyPress(key){
        let k = key.key.toUpperCase();

        if(k === "W" && snakeDirection !== 1){
            setSnakeDirection(3);
        }
        if(k === "A"  && snakeDirection !== 0){
            setSnakeDirection(2);
        }
        if(k === "S" && snakeDirection !== 3){
            setSnakeDirection(1);
        }
        if(k === "D"  && snakeDirection !== 2){
            setSnakeDirection(0);
        }
        if(k===" "){
            setPlay(true);
        }
    }

    if(isGameOver()){
        gameOver();
    }

    useEffect(
        () => {
            if(play){
                const intervalId = setInterval(moveSnake, 60);
                return () => clearInterval(intervalId);
            }
        }
    ,[snakeBody, play]);



    return(
        <div className="Snake" onKeyDown={onKeyPress} tabIndex={-1}>
            <h2>Hiscore: {hiscore}</h2>
            <h1>Score: {score}</h1>
            <GridWorld snakeBody={snakeBody} foodPos={foodPos} worldHeight={worldHeight} worldWidth={worldWidth}/>
        </div>
    );
}
