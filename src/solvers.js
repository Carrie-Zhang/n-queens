/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board ({n:n});
  var solution = 0;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  var solutionCount = 0;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = 0;

  if (n ===2 || n === 3) {
    return 0;
  }

  //Begin Decision Tree with the new board created with n:n
  var findSolution = function (board, row) {
    //if the solution exists it will count up
    if(solution){
      solution++;
      return;
    }
    //if the solution does not exist it will now go through and change each board piece one by one
    for (var i = 0; i < n; i++) {
      //move board piece until there are no Queen conflicts
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts() ) {
        //if the index of row is less than the board length - 1 it will be recursively called until it reaches the end of the board
        if (row < (n - 1) ) {
          findSolution( new Board(board.rows()), rows + 1 );
        } else {
          //otherwise the solution will be the same number of rows (or 'n')
          solution = board.rows();
        }
      }
      //after one solution is found it will continue to move one piece at a time
      board.togglePiece(row, i);
    }
    // findSolution will begin the process from the start of the board
    findSolution(board, 0);

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
  var solver = function (row) {
    //the row will check each index to determine if there is a conflict or not
    if (row === n) {
      //no conflicts, solutionCount will increase by 1
      solutionCount++;
      return;
    }

    //the loop will move a piece to a new position until it does not find a conflict
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      //if the current board has a conflict it will start the function again with a new row
      if (!board.hasAnyQueensConflicts() ) {
        solver(row + 1)
      }
      //after going through the entire loop the next row is checked
      board.togglePiece(row, i);
    }
  }

  solver(0); //starts the process of finding all possible outcomes

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
