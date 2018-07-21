const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function arenaSweep() {
  console.table(arena)
  let rowCount = 1;
  // O for abaixo faz uma leitura da matriz do jogo cada vez que uma peça chega ao ponto de colisão
  outer: for (let line = arena.length -1; line > 0; --line) {
    
      // O valor de x é alterado quando faz ponto 
      for (let colum = 0; colum < (arena[line].length); ++colum){
        if (arena[line][colum] !== 0 && arena[line][colum] === arena[line][colum+1]){
          console.log("a peça do lado direito tem a mesma cor")
        }
      }
        // if (arena[line][x] === 0) {
        //   continue outer;
        // }
    

    // const row = arena.splice(line, 1)[0].fill(0);
    // arena.unshift(row);
    // ++line;

    player.score += rowCount * 10;
    rowCount *= 2;
  }
}

function collide(arena, player) {
  const m = player.matrix;
  const o = player.pos;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 &&
        (arena[y + o.y] &&
        arena[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

function createPiece(type) {
  if (type === 'I') {
    return [
      [Math.floor(Math.random()* 6)+1 ],
      [Math.floor(Math.random()* 6)+1 ],
      [Math.floor(Math.random()* 6)+1 ],
    ];
  }
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = colors[value];
        context.fillRect(x + offset.x,
                          y + offset.y,
                          1, 1);
      }
    });
  });
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena, {x: 0, y: 0});
  drawMatrix(player.matrix, player.pos);
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function rotate(matrix, dir) {
  // Função que rotaciona as pedras
  for (let y = 0; y < matrix.length; ++y) {
    for (let x = 0; x < y; ++x) {
      for (let z = 0; z < x; ++z) {
        [
          matrix[x],
          matrix[y],
          matrix[z],
        ] = [
          matrix[y],
          matrix[z],
          matrix[x],
        ];
      }
    }
  }

  if (dir > 0) {
    matrix.forEach(row => row.reverse());
  } else {
    matrix.reverse();
  }
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    playerReset();
    arenaSweep();
    updateScore();
  }
  dropCounter = 0;
}

function playerMove(offset) {
  player.pos.x += offset;
  if (collide(arena, player)) {
    player.pos.x -= offset;
  }
}

function playerReset() {
  // Função que reseta o jogo
  const pieces = 'I';
  player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.pos.y = 0;
  player.pos.x = (arena[0].length / 2 | 0) -
                  (player.matrix[0].length / 2 | 0);
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore();
  }
}

function playerRotate(dir) {
  const pos = player.pos.x;
  let offset = 1;
  rotate(player.matrix, dir);
  while (collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      rotate(player.matrix, -dir);
      player.pos.x = pos;
      return;
    }
  }
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0) {
  const deltaTime = time - lastTime;

  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
      playerDrop();
  }

  lastTime = time;

  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
}

document.addEventListener('keydown', event => {
  // Definição de teclas de ação
  if (event.keyCode === 37) {
    playerMove(-1);
  } else if (event.keyCode === 39) {
    playerMove(1);
  } else if (event.keyCode === 40) {
    playerDrop();
  } else if (event.keyCode === 38) {
    playerRotate(1)
  }
});

const colors = [
  // cores
  null,
  '#0000FF', // Azul
  '#FFD700', // Amarelo
  '#008000', // Verde
  '#FF0000', // Vermelho
  '#808080', // Cinza
  '#BA55D3', // Roxo
];

const arena = createMatrix(6, 18);

const player = {
  pos: {x: 0, y: 0},
  matrix: null,
  score: 0,
};

playerReset();
updateScore();
update();

export default tetris