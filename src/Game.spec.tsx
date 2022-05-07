import { render, fireEvent, screen } from "@testing-library/react";
import Game from "./Game";

describe("Game Test", () => {
  // sequencia de cliques nessesarios para um resultado epecifico
  const sequences = {
    crossWin: [0, 1, 4, 2, 8],
    circleWin: [1, 0, 2, 4, 3, 8],
    tie: [0, 8, 2, 6, 7, 1, 3, 4, 5]
  };

  const aplySequence = (sequence: number[]) => {
    sequence.forEach((index) => {
      screen.getByTestId(`square-${index}`).click();
    });
  };

  beforeEach(() => {
    render(<Game />);
  });

  describe("Initial render state", () => {
    it("should renders game headings", () => {
      screen.getByText("TIC-TAC-LIVEN");
    });

    it("Should renders board and check for step counter update", () => {
      // Expect "Current step: 0" to be found
      screen.getByText("Current step: 0");

      const square0 = screen.getByTestId(`square-0`);
      fireEvent.click(square0);

      // Expect "Current step: 1" to be found
      screen.getByText("Current step: 1");
    });

    it("Should render board clear", () => {
      const board = screen.getByTestId("board");

      expect(board.textContent).not.toContain("❌");
      expect(board.textContent).not.toContain("⭕");
    });
  });

  describe("Updates board", () => {
    it("Should update square on click", () => {
      const square0 = screen.getByTestId(`square-0`);
      fireEvent.click(square0);

      expect(square0.textContent).toContain("❌");
    });

    it("should not update square on second click", () => {
      const square0 = screen.getByTestId(`square-0`);
      fireEvent.click(square0);

      expect(square0.textContent).toContain("❌");
      fireEvent.click(square0);
      expect(square0.textContent).toContain("❌");
    });

    it("should render cross winner", () => {
      aplySequence(sequences.crossWin);
      expect(screen.getByText("Winner: ❌")).toBeTruthy();
    });

    it("should render circle winner", () => {
      aplySequence(sequences.circleWin);
      expect(screen.getByText("Winner: ⭕")).toBeTruthy();
    });

    it("should render tie status", () => {
      aplySequence(sequences.tie);
      expect(screen.getByText("Draw: Game over")).toBeTruthy();
    });
  });

  describe("restart", () => {
    it("should render restart button on game over", () => {
      aplySequence(sequences.tie);
      expect(screen.getByTestId("restart")).toBeTruthy();
    });

    it("should reset board on click restart", () => {
      aplySequence(sequences.tie);
      screen.getByTestId('restart').click()
      
      const board = screen.getByTestId("board");

      expect(board.textContent).not.toContain("❌");
      expect(board.textContent).not.toContain("⭕");
      expect(screen.getByText("Current step: 0")).toBeTruthy()
    })

    it("should change first player on restart", () => {
      aplySequence(sequences.tie);
      screen.getByTestId('restart').click()

      expect(screen.getByText("Next player: ⭕")).toBeTruthy()
    })
  });
});
