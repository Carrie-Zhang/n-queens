/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other

//input: dimensions of the board (number)
//output: return an array of arrays (matrix)

window.findNRooksSolution = function(n) {
  var board = new Board ({n:n});
  // var solution = 0;
  var solution = [];
  var colIndex = 0;
  // Original:
  //something to store the solution arrays
  //check the rook conflicts
  //iterate over the rows to check the rook placement
    //if there is a conflict - move to the next square
    //if there is no conflict - add the possibility
  //after looking at each possibility return the found solution
  //hasAnyRooksConflicts


  // New:
  //something to store the solution arrays
  //for each position on the board
    // place a rook (togglePiece)
    // check for conflicts
      // if there is one, remove rook
      // if no conflict, do nothing
  // when at end of board, return solution
  //

  for (var row = 0; row < n; row++) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, col);
      }
    }
  }
  solution = board.rows();


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // should be array of arrays
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0;
  //call findNRooksSolution for solution count

  // assume: we have a empty board
  // for each possibility of the rook placement (n)
    // place a rook
    // check the conflicts
      // if there is conflicts, remove the rook
      // if there no conflicts,
        //Recurse here


  var recurse = (row) => {
    if (row === n) {
      solutionCount++;
      return;
    }

    for ( var col = 0; col < n; col++) {
      board.togglePiece(row, col); //places a new rook on the board

      //will check if the new rook has a conflict and if it does not, it will move onto the next row
      if (!board.hasAnyRooksConflicts() ) {
        recurse(row + 1);
      }
      //if there is a conflict toggle the newest piece back off the board and move on
      board.togglePiece(row, col);
    }
  }
  recurse(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// input: number to create a board size
// output: a 2-D array of all solutions
window.findNQueensSolution = function(n) {
  var solution = [];
  var solutionCheck = false;

      //Start the board check at (0,0)
      var board = new Board({n:n});
      for ( var r = 0; r < n; r++) {
        for (var c = 0; c < n; c++) {
          //begin by placing a piece on the board
          board.togglePiece(r, c);

          //if the board has a conflict it should take it off the board.
          if (board.hasAnyQueensConflicts() ) {
            board.togglePiece(r, c);
          }
        }

        if ( r === n) {
          solution = board.rows();
          break;
        }
      }
      //same thing for each possibility of queens placement as we did for rooks

      //place the queen
      //check the conflict
        // if there is conflict we remove the queen (toggle)
        //if not, do nothing!!!

        //if n is equal to 2 or 3, there are no solutions and should return 0
        if (n === 2 || n === 3) {
          return 0;
        }

        // while (solutionCheck) {
        //   var root = ;
        //   if (solutionCheck === true) {
        //     break;
        //   }
        //   for (var r = 0; r < n; r++) {
        //     for (var c = 0; c < n; c++) {
        //       board.togglePiece(r, c);
        //       if (!board.hasAnyQueensConflicts()) {
        //
        //       }
        //       board.togglePiece(r, c);
        //     }
        //   }
        //   if (r ===n) {
        //     solutionCheck = true;
        //   }
        // }
        //4 is an edge case and cannot start in the corners.
        //while (row !== n)
        //look at every choice of first togglePiece
          //if a toggle choice has no collisions continue to children
            //continue to check each chil node
          //if a toggle choice does not have a viable child, move to next row, col
          //first time a solution is reach at the end of the board- return true and stop

    //return the solution at the end -- get.rows() to get the whole board with found solution


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n}); //create a new board

  //if n of 2 or 3 is passed in, there are immediately no solutions available
  if (n === 2 || n === 3) {
    return 0;
  }

  //recursive function to go through each possibility
  var solver = (row) => {
    //the row will check each index to determine if there is a conflict or not
    if (row === n) {
      //no conflicts, solutionCount will increase by 1 and end the current iteration
      solutionCount++;
      return;
    }

    //the loop will move a piece to a new position until it does not find a conflict
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      //if the current board does not have a conflict it will start the function again with a new row
      if (!board.hasAnyQueensConflicts() ) {
        solver(row + 1)
      }
      //after going through the entire loop the next row is checked by placing the next queen
      board.togglePiece(row, i);
    }
  }

  solver(0); //starts the process of finding all possible outcomes

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
