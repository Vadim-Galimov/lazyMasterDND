// Создаём клетки
class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Room {
  constructor(entry, deadEnd = true) {
    data.roomsCount--;

    this.entry = entry;
    this.deadEnd = deadEnd;

    this.generateSides();

    // Проверяем пересечение с другими комнатами
    if (this.doesRoomIntersect()) {
      // Если комната пересекается, пробуем сгенерировать новые параметры
      let attempts = 10; // Количество попыток
      while (attempts-- > 0 && this.doesRoomIntersect()) {
        this.generateSides();
      }

      // Если после всех попыток комната всё ещё пересекается, пропускаем создание
      if (this.doesRoomIntersect()) {
        data.roomsCount++; // Возвращаем счётчик, так как комната не создана
        return;
      }
    }

    data.rooms.push([this.minX, this.minY, this.width, this.height]);

    for (let y = this.minY; y <= this.maxY; y++) {
      for (let x = this.minX; x <= this.maxX; x++) {
        data.cells.push(new Cell(x, y));
      }
    }

    if (!this.deadEnd) {
      this.createExit();

      if (data.roomsCount > 0) {
        this.nextEntry = this.createEntry(this.exit);
        new Room(this.nextEntry, false);
      }
    }
  }

  newDirections = {
    up: ["down", "left", "right"],
    down: ["up", "left", "right"],
    left: ["up", "down", "right"],
    right: ["up", "down", "left"],
  };
  oppositeSides = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  createEntry(exit) {
    let newX, newY, newDirection;
    switch (exit.direction) {
      case "up":
        newX = exit.x;
        newY = exit.y + 1;
        newDirection = "down";
        break;

      case "down":
        newX = exit.x;
        newY = exit.y - 1;
        newDirection = "up";

        break;

      case "left":
        newX = exit.x - 1;
        newY = exit.y;
        newDirection = "right";

        break;

      case "right":
        newX = exit.x + 1;
        newY = exit.y;
        newDirection = "left";

        break;
    }
    data.entrances.push({ x: newX, y: newY });

    return { x: newX, y: newY, direction: newDirection };
  }
  createExit() {
    let newDirection =
      this.newDirections[this.entry.direction][getRandomNumber(0, 2)];
    let newX, newY;
    switch (newDirection) {
      case "up":
        newX = getRandomNumber(this.minX, this.maxX);
        newY = this.maxY;
        break;

      case "down":
        newX = getRandomNumber(this.minX, this.maxX);
        newY = this.minY;

        break;

      case "left":
        newX = this.minX;
        newY = getRandomNumber(this.minY, this.maxY);

        break;

      case "right":
        newX = this.maxX;
        newY = getRandomNumber(this.minY, this.maxY);

        break;
    }
    this.exit = { direction: newDirection, x: newX, y: newY };
  }

  generateSides() {
    let direction = this.entry.direction;
    let sides = {
      left: getRandomNumber(0, 4),
      right: getRandomNumber(0, 4),
      up: getRandomNumber(0, 4),
      down: getRandomNumber(0, 4),
    };
    sides[this.oppositeSides[direction]] += sides[direction];
    sides[direction] = 0;

    this.sides = sides;

    this.width = this.sides.left + 1 + this.sides.right;
    this.height = this.sides.down + 1 + this.sides.up;
    this.minX = this.entry.x - this.sides.left;
    this.maxX = this.entry.x + this.sides.right;
    this.minY = this.entry.y - this.sides.down;
    this.maxY = this.entry.y + this.sides.up;
  }

  doesRoomIntersect() {
    // Проверяем пересечение с каждой существующей комнатой
    for (const room of data.rooms) {
      const [rMinX, rMinY, rWidth, rHeight] = room;
      const rMaxX = rMinX + rWidth - 1;
      const rMaxY = rMinY + rHeight - 1;

      // Проверка пересечения прямоугольников
      if (
        this.minX <= rMaxX &&
        this.maxX >= rMinX &&
        this.minY <= rMaxY &&
        this.maxY >= rMinY
      ) {
        return true;
      }
    }
    return false;
  }
}

class Draw {
  constructor(cellSize) {
    this.canvas = document.getElementById("canvas").getContext("2d");
    this.cellSize = cellSize;

    let minX = 0,
      minY = 0;
    data.cells.forEach((cell) => {
      minX = Math.min(minX, cell.x);
      minY = Math.min(minY, cell.y);
    });

    // Смещение - чтобы все координаты стали положительными
    this.offsetX = -minX;
    this.offsetY = -minY;

    this.canvas.fillStyle = "#bbada0";
    this.canvas.lineWidth = 1;
    data.cells.forEach((cell) => {
      this.canvas.strokeRect(
        (cell.x + this.offsetX) * this.cellSize,
        (cell.y + this.offsetY) * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    });

    data.entrances.forEach((cell) => {
      this.canvas.fillRect(
        (cell.x + this.offsetX) * this.cellSize,
        (cell.y + this.offsetY) * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    });
    this.canvas.strokeStyle = "#FF0000";

    data.rooms.forEach((room) => {
      this.canvas.strokeRect(
        (room[0] + this.offsetX) * this.cellSize,
        (room[1] + this.offsetY) * this.cellSize,
        room[2] * this.cellSize,
        room[3] * this.cellSize
      );
    });
  }
}

const data = {
  cells: [],
  entrances: [],
  rooms: [],
  roomsCount: 5,
};

data.entrances.push({ x: 0, y: 0 });

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let generateButton;

let saveButton;

function generateDungeon() {
  const firstRoom = new Room(
    {
      direction: "down",
      x: 0,
      y: 0,
    },
    false
  );
  let draw = new Draw(25);
}

function saveDungeon() {
  let dungeons = localStorage.getItem("dungeons");
  console.log(dungeons);
  if (dungeons === null) {
    dungeons = [];
  }
  if (data.cells.length > 0) {
    newJSON = JSON.stringify(data);
    dungeons.push(newJSON);
    localStorage.setItem("dungeons", dungeons);
  }
}

function showDungeonsList() {
  console.log(777);
}

document.addEventListener("DOMContentLoaded", function () {
  generateButton = document.querySelector("#generateDungeon");

  saveButton = document.querySelector("#saveDungeon");

  generateButton.addEventListener("click", generateDungeon);

  saveButton.addEventListener("click", saveDungeon);

  showDungeonsList();
});
