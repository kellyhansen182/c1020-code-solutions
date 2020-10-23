/* global _ */
/* eslint-disable no-console */
console.log('Lodash is loaded:', typeof _ !== 'undefined');

var pokerStarz = [
  {
    name: 'Daniel Negreanu',
    hand: []
  },
  {
    name: 'Phil Hellmuth',
    hand: []
  },
  {
    name: 'Tom Dwan',
    hand: []
  },
  {
    name: 'Phil Ivey',
    hand: []
  }
];

var deck = [
  {
    rank: 'A',
    suit: 'Clubs'
  },
  {
    rank: 'K',
    suit: 'Clubs'
  },
  {
    rank: 'Q',
    suit: 'Clubs'
  },
  {
    rank: 'J',
    suit: 'Clubs'
  },
  {
    rank: 10,
    suit: 'Clubs'
  },
  {
    rank: 9,
    suit: 'Clubs'
  },
  {
    rank: 8,
    suit: 'Clubs'
  },
  {
    rank: 7,
    suit: 'Clubs'
  },
  {
    rank: 6,
    suit: 'Clubs'
  },
  {
    rank: 5,
    suit: 'Clubs'
  },
  {
    rank: 4,
    suit: 'Clubs'
  },
  {
    rank: 3,
    suit: 'Clubs'
  },
  {
    rank: 2,
    suit: 'Clubs'
  },
  {
    rank: 'A',
    suit: 'Spades'
  },
  {
    rank: 'K',
    suit: 'Spades'
  },
  {
    rank: 'Q',
    suit: 'Spades'
  },
  {
    rank: 'J',
    suit: 'Spades'
  },
  {
    rank: 10,
    suit: 'Spades'
  },
  {
    rank: 9,
    suit: 'Spades'
  },
  {
    rank: 8,
    suit: 'Spades'
  },
  {
    rank: 7,
    suit: 'Spades'
  },
  {
    rank: 6,
    suit: 'Spades'
  },
  {
    rank: 5,
    suit: 'Spades'
  },
  {
    rank: 4,
    suit: 'Spades'
  },
  {
    rank: 3,
    suit: 'Spades'
  },
  {
    rank: 2,
    suit: 'Spades'
  },
  {
    rank: 'A',
    suit: 'Hearts'
  },
  {
    rank: 'K',
    suit: 'Hearts'
  },
  {
    rank: 'Q',
    suit: 'Hearts'
  },
  {
    rank: 'J',
    suit: 'Hearts'
  },
  {
    rank: 10,
    suit: 'Hearts'
  },
  {
    rank: 9,
    suit: 'Hearts'
  },
  {
    rank: 8,
    suit: 'Hearts'
  },
  {
    rank: 7,
    suit: 'Hearts'
  },
  {
    rank: 6,
    suit: 'Hearts'
  },
  {
    rank: 5,
    suit: 'Hearts'
  },
  {
    rank: 4,
    suit: 'Hearts'
  },
  {
    rank: 3,
    suit: 'Hearts'
  },
  {
    rank: 2,
    suit: 'Hearts'
  },
  {
    rank: 'A',
    suit: 'Diamonds'
  },
  {
    rank: 'K',
    suit: 'Diamonds'
  },
  {
    rank: 'Q',
    suit: 'Diamonds'
  },
  {
    rank: 'J',
    suit: 'Diamonds'
  },
  {
    rank: 10,
    suit: 'Diamonds'
  },
  {
    rank: 9,
    suit: 'Diamonds'
  },
  {
    rank: 8,
    suit: 'Diamonds'
  },
  {
    rank: 7,
    suit: 'Diamonds'
  },
  {
    rank: 6,
    suit: 'Diamonds'
  },
  {
    rank: 5,
    suit: 'Diamonds'
  },
  {
    rank: 4,
    suit: 'Diamonds'
  },
  {
    rank: 3,
    suit: 'Diamonds'
  },
  {
    rank: 2,
    suit: 'Diamonds'
  }
];

var faceCards = ['K', 'Q', 'J'];

function dealCards(players, number, shuffledDeck) {
  for (var q = 0; q < number; q++) {
    for (var i = 0; i < players.length; i++) {
      players[i].hand.push(shuffledDeck[(i + 1) * (q + 1)]);
    }
  }
}

function scoreHand(playerObj) {
  var handArr = playerObj.hand;
  var cardValue;
  var score = 0;
  var isFaceCard = false;
  for (var x = 0; x < handArr.length; x++) {
    for (var y = 0; y < faceCards.length; y++) {
      if (handArr[x].rank === faceCards[y]) {
        isFaceCard = true;
      }
    }
    if (isFaceCard) {
      cardValue = 10;
    } else if (handArr[x].rank === 'A') {
      cardValue = 11;
    } else {
      cardValue = handArr[x].rank;
    }
    score += cardValue;
  }
  return score;
}

var winner;
var highScore;

function handleTie(players, number) {
  for (var k = 0; k < players.length; k++) {
    players[k].hand = [];
  }
  var shuffledDeck = _.shuffle(deck);
  dealCards(players, number, shuffledDeck);
  highScore = 0;
  var tiedPlayers = [];
  for (var z = 0; z < players.length; z++) {
    var playerScore = scoreHand(players[z]);
    if (playerScore > highScore) {
      highScore = playerScore;
      winner = players[z];
    } else if (playerScore === highScore) {
      winner = 'tie';
      tiedPlayers.push(players[z]);
    }
  }
  if (winner === 'tie') {
    console.log('TIE BREAKER');
    tiedPlayers = _.uniq(tiedPlayers);
    handleTie(tiedPlayers, number);
  }
}

function logResults(number) {
  console.log(winner.name + ' Won!');
  console.log('Hand:');
  for (var n = 0; n < number; n++) {
    console.log(winner.hand[n].rank + ' of ' + winner.hand[n].suit);
  }
  console.log('Score:');
  console.log(highScore);
}

function playGame(players, number) {
  var shuffledDeck = _.shuffle(deck);
  dealCards(players, number, shuffledDeck);
  highScore = 0;
  var tiedPlayers = [];
  for (var z = 0; z < players.length; z++) {
    var playerScore = scoreHand(players[z]);
    if (playerScore > highScore) {
      highScore = playerScore;
      winner = players[z];
    } else if (playerScore === highScore) {
      winner = 'tie';
      tiedPlayers.push(players[z]);
    }
  }
  if (winner === 'tie') {
    console.log('TIE BREAKER');
    tiedPlayers = _.uniq(tiedPlayers);
    handleTie(tiedPlayers, number);
  }
  logResults(number);
}

playGame(pokerStarz, 5);
