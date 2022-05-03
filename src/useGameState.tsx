/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

 import { useState } from "react";

 enum Players {
  CROSS = "❌",
  CIRCLE = "⭕"
 }

 type GameState = {
   currentBoard: string[],
   stepNumber: number,
   nextPlayer: Players
 }
 
 let emptyBoard = Array(9).fill(null);
 const useGameState = () => {
   let firstPlayer = Players.CROSS
   const [state, setState] = useState<GameState>({
     currentBoard: emptyBoard,
     nextPlayer: Players.CROSS,
     stepNumber: 0
   })
 
   const computeMove = (squareId: number) => {
     if(state.currentBoard[squareId] == null){
       let nextBoardState = state.currentBoard
       nextBoardState[squareId] = state.nextPlayer

       setState({
         ...state,
         currentBoard: nextBoardState,
         nextPlayer: state.nextPlayer === Players.CROSS ? Players.CIRCLE : Players.CROSS,
         stepNumber: state.stepNumber + 1
       })
     }
   }
 
   return {
     ...state,
     computeMove
   }
 }
 
 export default useGameState;
