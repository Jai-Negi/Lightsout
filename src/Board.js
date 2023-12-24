import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightsStartsOn: 0.25,
  };
  constructor(props) {
    super(props);

   
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

 

  createBoard() {
    const board = [];
    
    for (let y = 0; y < this.props.nrows; y++) {
      const row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightsStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    console.log("FLIPPING!", coord);
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    
    flipCell(y, x); 
    flipCell(y, x - 1); 
    flipCell(y, x + 1); 
    flipCell(y - 1, x); 
    flipCell(y + 1, x); 

    
    let hasWon = board.every((row) => row.every((cell) => !cell));

    this.setState({ board: board, hasWon: hasWon });
  }



  render() {
    if (this.state.hasWon) {
      <div className="Board-title">
        <div className="winner">
          <div className="neon-orange">You Win!!</div>
          <div className="neon-blue">Out</div>
        </div>
      </div>;
    }
   
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(
          <Cell
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAround={() => this.flipCellsAround(coord)}
          />
        );
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    }
    return (
      <div>
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
  }
}

export default Board;
