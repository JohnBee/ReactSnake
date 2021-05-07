import React from 'react';

export function checkCoordinate(coord, list){
    for(let i = 0; i < list.length; i++){
        if(coord[0] === list[i][0] && coord[1] === list[i][1]){
            return i;
        }
    }
    return -1;
}

function displayWorld(snakeBody, foodPos, worldWidth, worldHeight){
    let out = [];
    const blockSizeW = (100/worldWidth);
    const blockSizeH = (100/worldHeight);
    const colourRange = 360/snakeBody.length;
    for(let b = 0; b < snakeBody.length; b++){
        // "rgb(" + (snakeColour[0]/snakeBody.length * b + 10)+ "," + (snakeColour[1]/snakeBody.length * b + 10) + ", "+ (snakeColour[2]/snakeBody.length * b + 10) + ")",
        const style = {
            position: "absolute",
            width: blockSizeW + "%",
            height: blockSizeH +"%",
            left: snakeBody[b][0]*blockSizeW+ '%',
            top: snakeBody[b][1]*blockSizeH+ '%',
            backgroundColor: "hsl(" + ((colourRange * (snakeBody.length - b - 1))) + ", 100%, 50%)",

        }
        if(b !== snakeBody.length -1 ){
            out.push(<div style={style} key={b} className="Tile Snake"></div>);
        }
        else {
            out.push(<div style={style} key={b} className="Tile Head"></div>);
        }
    }
    const foodStyle = {
        position: "absolute",
        width: (100/worldWidth) + "%",
        height: (100/worldWidth) +"%",
        left: foodPos[0]*(100/worldWidth) + '%',
        top: foodPos[1]*(100/worldWidth) + '%',
    }
    out.push(<div style={foodStyle} key="food" className="Tile Food"></div>);
    return out;
}



export function GridWorld(props){
    return(
        <div className="GridWorld">
            { displayWorld(props.snakeBody, props.foodPos, props.worldWidth, props.worldHeight) }
        </div>

    );
}
