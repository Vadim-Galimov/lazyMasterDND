class Creature {
  constructor({
    name = "Безымянный",
    hp = "1 (1d4)",
    ac = "10",
    speed = "30 фт.",
    abilities = {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    },
    actions = [],
    type = "гуманоид",
    challenge_rating = "1/8",
    size = "средний",
    alignment = "нейтральный",
    senses = "",
    languages = "Общий",
    special_abilities = [],
  }) {
    this.name = name;
    this.hp = hp;
    this.ac = ac;
    this.speed = speed;
    this.abilities = abilities;
    this.actions = actions;
    this.type = type;
    this.challenge_rating = challenge_rating;
    this.size = size;
    this.alignment = alignment;
    this.senses = senses;
    this.languages = languages;
    this.special_abilities = special_abilities;
  }

  // Метод для генерации модификатора характеристики
  getAbilityModifier(ability) {
    const score = this.abilities[ability];
    return Math.floor((score - 10) / 2);
  }

  // Метод для форматированного вывода модификатора (со знаком +)
  getFormattedModifier(ability) {
    const modifier = this.getAbilityModifier(ability);
    return modifier >= 0 ? `+${modifier}` : modifier;
  }

  // Метод для создания карточки существа
  createCard() {
    const template = document.getElementById("creature-card-template");
    const card = template.content.cloneNode(true);

    // Заполняем основные данные
    card.querySelector(".creature-name").textContent = this.name;
    card.querySelector(".creature-hp").textContent = `HP: ${this.hp}`;
    card.querySelector(".creature-ac").textContent = `AC: ${this.ac}`;
    card.querySelector(".creature-speed").textContent = `Speed: ${this.speed}`;
    card.querySelector(
      ".creature-type"
    ).textContent = `${this.size} ${this.type}, ${this.alignment}`;
    card.querySelector(
      ".creature-cr"
    ).textContent = `CR: ${this.challenge_rating}`;

    // Заполняем характеристики и модификаторы
    card.querySelector(".creature-str").textContent = `${
      this.abilities.str
    } (${this.getFormattedModifier("str")})`;
    card.querySelector(".creature-dex").textContent = `${
      this.abilities.dex
    } (${this.getFormattedModifier("dex")})`;
    card.querySelector(".creature-con").textContent = `${
      this.abilities.con
    } (${this.getFormattedModifier("con")})`;
    card.querySelector(".creature-int").textContent = `${
      this.abilities.int
    } (${this.getFormattedModifier("int")})`;
    card.querySelector(".creature-wis").textContent = `${
      this.abilities.wis
    } (${this.getFormattedModifier("wis")})`;
    card.querySelector(".creature-cha").textContent = `${
      this.abilities.cha
    } (${this.getFormattedModifier("cha")})`;

    // Добавляем особые способности, если они есть
    const abilitiesList = card.querySelector(".abilities-list");
    if (this.special_abilities.length > 0) {
      this.special_abilities.forEach((ability) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${ability.name}:</strong> ${ability.desc}`;
        abilitiesList.appendChild(li);
      });
    } else {
      abilitiesList.parentElement.style.display = "none";
    }

    // Добавляем действия
    const actionsList = card.querySelector(".actions-list");
    if (this.actions.length > 0) {
      this.actions.forEach((action) => {
        const li = document.createElement("li");
        li.textContent = action;
        actionsList.appendChild(li);
      });
    } else {
      actionsList.parentElement.style.display = "none";
    }

    // Добавляем карточку в контейнер
    document.getElementById("creatures-container").appendChild(card);
  }
}

function filterMonsters() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const typeFilter = document.getElementById("type-filter").value;
  const crFilter = document.getElementById("cr-filter").value;

  const filtered = monsters.filter((monster) => {
    const nameMatch = monster.name.toLowerCase().includes(searchTerm);
    const typeMatch = !typeFilter || monster.type.includes(typeFilter);
    const crMatch = !crFilter || monster.challenge_rating === crFilter;

    return nameMatch && typeMatch && crMatch;
  });

  renderMonsters(filtered);
}

document.addEventListener("DOMContentLoaded", function () {
  // Фильтрация и поиск
  document.getElementById("search").addEventListener("input", filterMonsters);
  document
    .getElementById("type-filter")
    .addEventListener("change", filterMonsters);
  document
    .getElementById("cr-filter")
    .addEventListener("change", filterMonsters);

  // Создание гоблина с помощью класса
  const goblin = new Creature({
    name: "Гоблин",
    hp: "7 (2d6)",
    ac: "15 (кожаный доспех)",
    speed: "30 фт.",
    abilities: {
      str: 8,
      dex: 14,
      con: 10,
      int: 10,
      wis: 8,
      cha: 8,
    },
    actions: [
      "Атака: +4 к попаданию, 1d6+2 колющего урона",
      "Лук: +4 к попаданию, 1d6+2 колющего урона, дистанция 80/320 фт.",
    ],
    type: "гуманоид (гоблиноид)",
    challenge_rating: "1/4",
    senses: "тёмное зрение 60 фт.",
    languages: "обычный, гоблинский",
  });

  // Создание волка
  const wolf = new Creature({
    name: "Волк",
    hp: "11 (2d8+2)",
    ac: "13 (естественная броня)",
    speed: "40 фт.",
    abilities: {
      str: 12,
      dex: 15,
      con: 12,
      int: 3,
      wis: 12,
      cha: 6,
    },
    type: "зверь",
    size: "средний",
    alignment: "неистовый",
    senses: "острое обоняние, пассивное восприятие 13",
    special_abilities: [
      {
        name: "Тактика стаи",
        desc: "Волк имеет преимущество на броски атаки против существа, если в пределах 5 футов от него находится хотя бы один союзник волка, не недееспособный.",
      },
      {
        name: "Опрокидывание",
        desc: "Если волк попадает атакой по существу, то цель должна преуспеть в спасброске Силы КС 11 или быть опрокинутой.",
      },
    ],
    actions: [
      "Укус: +4 к попаданию, 2d4+2 колющего урона. Если цель опрокинута, волк может совершить дополнительную атаку укусом как бонусное действие.",
    ],
  });

  const guard = new Creature({
    name: "Стражник",
    hp: "11",
    ac: "16 (кольчужная рубаха, щит)",
    speed: "30 фт.",
    abilities: {
      str: 13,
      dex: 12,
      con: 12,
      int: 10,
      wis: 11,
      cha: 10,
    },
    actions: ["Атака: +3 к попаданию, 1d6+1 колющего урона"],
    type: "гуманоид (Человек)",
    challenge_rating: "1/4",
    senses: "",
    languages: "Общий, гоблинский",
  });

  const oldVampire = new Creature({
    name: "Старый вампир",
    hp: "48",
    ac: "12",
    speed: "30 фт.",
    abilities: {
      str: 12,
      dex: 14,
      con: 10,
      int: 10,
      wis: 11,
      cha: 12,
    },
    actions: [
      "Укус: +4 к попаданию, 1d4+2 некротического урона, хилится за нанесённый урон",
    ],
    type: "гуманоид (Нежить)",
    challenge_rating: "1/4",
    senses: "",
    languages: "Общий",
  });

  const shadow = new Creature({
    name: "Тень",
    hp: "6",
    ac: "12",
    speed: "30 фт.",
    abilities: {
      str: 6,
      dex: 14,
      con: 10,
      int: 6,
      wis: 10,
      cha: 8,
    },
    actions: [
      "Вытягивание силы: +4 к попаданию, 1d4+2 некротического урона. Значение силы жертвы уменьшается на 1к4, если сила будет 0 - смерть. за убийство хилится за похищенную силы последней атаки",
    ],
    type: "гуманоид (Нежить)",
    challenge_rating: "1/4",
    senses: "",
    languages: "Общий",
  });

  const rat = new Creature({
    name: "Крыса",
    hp: "1",
    ac: "10",
    speed: "30 фт.",
    abilities: {
      str: 2,
      dex: 11,
      con: 9,
      int: 2,
      wis: 10,
      cha: 4,
    },
    actions: ["Укус: +0 к попаданию,  1 колющего урона"],
    type: "гуманоид (Нежить)",
    challenge_rating: "1/4",
    senses: "",
    languages: "Общий",
  });

  const werewolf = new Creature({
    name: "Оборотень",
    hp: "28",
    ac: "12",
    speed: "30 фт.",
    abilities: {
      str: 15,
      dex: 13,
      con: 14,
      int: 10,
      wis: 11,
      cha: 10,
    },
    actions: [
      "Мультиатака. Вервольф совершает две атаки одну Укусом и одну Когтями (в гибридном облике).",
      "Укус: +4 к попаданию, 1к8 + 2 колющего урона. Если цель — гуманоид, она должна преуспеть в спасброске Телосложения со Сл 12, иначе станет проклятой ликантропией вервольфа",
      "Когти  +4 к попаданию, Попадание: 2к4 + 2 рубящего урона.",
    ],
    type: "гуманоид (Нежить)",
    challenge_rating: "1/4",
    senses: "",
    languages: "Общий",
  });

  const bigRat = new Creature({
    name: "Большая крыса",
    hp: "20",
    ac: "12",
    speed: "30 фт.",
    abilities: {
      str: 7,
      dex: 15,
      con: 11,
      int: 2,
      wis: 10,
      cha: 4,
    },
    actions: ["Укус: +4 к попаданию,  1к4 + 2 колющего урона"],
    type: "гуманоид (Нежить)",
    challenge_rating: "1/4",
    senses: "",
    languages: "Общий",
  });
  const rustyBarbarian = new Creature({
    name: "Варвар Ржавый",
    hp: "67",
    ac: "14 (шкурный доспех)",
    speed: "30 фт.",
    abilities: {
      str: 16,
      dex: 15,
      con: 17,
      int: 9,
      wis: 11,
      cha: 9,
    },
    actions: [
      "Мультиатака: Рукопашная атака кулаками +5 к попаданию, 1d4+3 дробящего урона",
    ],
    type: "гуманоид (человек)",
    challenge_rating: "2",
    size: "средний",
    alignment: "хаотичный нейтральный",
    senses: "",
    languages: "Общий",
    special_abilities: [
      {
        name: "Безрассудство",
        desc: "В начале своего хода берсерк может решить, что в этом ходу все рукопашные атаки оружием будет совершать с преимуществом, но в этом случае до начала его следующего хода все броски атаки по нему тоже будут совершаться с преимуществом.",
      },
      {
        name: "Навыки",
        desc: "Запугивание +7",
      },
    ],
  });

  const goblinBasher = new Creature({
    name: "Плут гоблин Башка",
    hp: "31",
    ac: "16 (кольчужная рубаха, щит)",
    speed: "30 фт.",
    abilities: {
      str: 10,
      dex: 16,
      con: 10,
      int: 12,
      wis: 12,
      cha: 10,
    },
    actions: [
      "Мультиатака: Совершает две атаки кинжалом",
      "Скимитар: Рукопашная атака +4 к попаданию, 1d4+3 колющего урона",
    ],
    type: "гуманоид (гоблиноид)",
    challenge_rating: "2",
    size: "малый",
    alignment: "нейтрально-злой",
    senses: "тёмное зрение 60 фт.",
    languages: "Общий, гоблинский",
    special_abilities: [
      {
        name: "Навыки",
        desc: "Скрытность +7, Ловкость рук +7, Обман +3",
      },
    ],
  });

  // Создание карточек
  guard.createCard();
  oldVampire.createCard();
  shadow.createCard();
  rat.createCard();
  bigRat.createCard();
  werewolf.createCard();
  goblin.createCard();
  wolf.createCard();
  rustyBarbarian.createCard();
  goblinBasher.createCard();
});
