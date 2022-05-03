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
   nextPlayer: Players,
   firstPlayer: Players
 }

 const useGameState = () => {
   const [state, setState] = useState<GameState>({
     currentBoard: Array(9).fill(null),
     stepNumber: 0,
     firstPlayer: Players.CROSS,
     nextPlayer: Players.CROSS
   })

   const restartGame = () => {
    const nextFirstPlayer = state.firstPlayer === Players.CIRCLE ? Players.CROSS : Players.CIRCLE

    setState({
      ...state,
      nextPlayer: nextFirstPlayer,
      firstPlayer: nextFirstPlayer,
      currentBoard: Array(9).fill(null),
      stepNumber: 0
    })
   }
 
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
     computeMove,
     restartGame
   }
 }

 export default useGameState;
