'use strict';

//Selecionando elementos
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const dadoEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Começando as condições

// //definindo o nome dos jogadores
// name0El.textContent = prompt('Digite o nome do jogador 1');
// name1El.textContent = prompt('Digite o nome do jogador 2');
let playing, currentScore, activePlayer, scores;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  dadoEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolando a função do dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gerando uma rolagem randômica do dado
    const dado = Math.trunc(Math.random() * 6) + 1;
    console.log(dado);

    // 2. Mostrando dado
    dadoEl.classList.remove('hidden');
    dadoEl.src = `dice-${dado}.png`;

    // 3. Check para giro 1
    if (dado !== 1) {
      // Adiciona o dado para a pontuação atual
      currentScore += dado;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Selecionando para o próximo jogador
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Adicionar atual pontuação para pontuação do jogador ativo
    scores[activePlayer] += currentScore;
    //sccores[0 ou 1] + scores[0 ou 1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Checar se a pontuação do jogador é => 100
    if (scores[activePlayer] >= 5) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
