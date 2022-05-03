/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

 import { useState } from "react";

 enum Players {
  SQUARE = "❌",
  CIRCLE = "⭕"
 }
 
 let emptyBoard = Array(9).fill(null);
 const useGameState = () => {
   const [currentBoard, setCurrentBoard] = useState(emptyBoard)
   const [stepNumber, setStepNumber] = useState(0);
   const [nextPlayer, setNextPlayer] = useState<Players>(Players.SQUARE)
 
   const computeMove = (squareId: number) => {
     if(currentBoard[squareId] == null){
       currentBoard[squareId] = nextPlayer
     }
 
     if (nextPlayer === Players.SQUARE) {
       setNextPlayer(Players.CIRCLE)
     } else {      
       setNextPlayer(Players.SQUARE)
     }
     setStepNumber((currentStepNumber) => currentStepNumber + 1);
   }
 
   return {
     nextPlayer,
     stepNumber,
     currentBoard,
     computeMove
   }
 }
 
 export default useGameState;
