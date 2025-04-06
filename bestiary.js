// Пример данных (в реальном проекте можно загружать из JSON файла)
const monsters = [
  {
    name: "Гоблин",
    type: "Гуманоид (гоблиноид)",
    size: "Маленький",
    alignment: "нейтрально-злой",
    armor_class: "15 (кожаный доспех, щит)",
    hit_points: "7 (2к6)",
    speed: "30 футов",
    strength: 8,
    dexterity: 14,
    constitution: 10,
    intelligence: 10,
    wisdom: 8,
    charisma: 8,
    skills: "Скрытность +6",
    senses: "Темное зрение 60 футов, пассивное Восприятие 9",
    languages: "Общий, Гоблинский",
    challenge_rating: "1/4",
    abilities: [
      "Военная тактика: Когда гоблин атакует существо, которое находится в пределах 5 футов от его союзника, который не недееспособен, гоблин получает преимущество на броски атаки.",
      "Проворный побег: Гоблин может совершить действие Отступить или Спрятаться в качестве бонусного действия в каждый свой ход.",
    ],
    actions: [
      "Скимитар: +4 к попаданию, досягаемость 5 футов, одна цель. Урон: 5 (1к6 + 2) режущего урона.",
      "Короткий лук: +4 к попаданию, дальность 80/320 футов, одна цель. Урон: 5 (1к6 + 2) колющего урона.",
    ],
  },
  // Добавьте других существ
];

function renderMonsters(monstersToRender) {
  const container = document.getElementById("monsters-container");
  container.innerHTML = "";

  monstersToRender.forEach((monster) => {
    const card = document.createElement("div");
    card.className = "monster-card";

    card.innerHTML = `
                    <h2 class="monster-name">${monster.name}</h2>
                    <p><strong>Тип:</strong> ${
                      monster.type
                    } | <strong>Размер:</strong> ${
      monster.size
    } | <strong>Мировоззрение:</strong> ${monster.alignment}</p>
                    <p><strong>Класс доспеха:</strong> ${
                      monster.armor_class
                    } | <strong>Хиты:</strong> ${
      monster.hit_points
    } | <strong>Скорость:</strong> ${monster.speed}</p>
                    
                    <div class="monster-stats">
                        <div class="stat-item"><span class="stat-label">СИЛ</span> ${
                          monster.strength
                        } (${Math.floor((monster.strength - 10) / 2)})</div>
                        <div class="stat-item"><span class="stat-label">ЛОВ</span> ${
                          monster.dexterity
                        } (${Math.floor((monster.dexterity - 10) / 2)})</div>
                        <div class="stat-item"><span class="stat-label">ТЕЛ</span> ${
                          monster.constitution
                        } (${Math.floor((monster.constitution - 10) / 2)})</div>
                        <div class="stat-item"><span class="stat-label">ИНТ</span> ${
                          monster.intelligence
                        } (${Math.floor((monster.intelligence - 10) / 2)})</div>
                        <div class="stat-item"><span class="stat-label">МУД</span> ${
                          monster.wisdom
                        } (${Math.floor((monster.wisdom - 10) / 2)})</div>
                        <div class="stat-item"><span class="stat-label">ХАР</span> ${
                          monster.charisma
                        } (${Math.floor((monster.charisma - 10) / 2)})</div>
                    </div>
                    
                    <p><strong>Навыки:</strong> ${monster.skills || "-"}</p>
                    <p><strong>Чувства:</strong> ${monster.senses}</p>
                    <p><strong>Языки:</strong> ${monster.languages}</p>
                    <p><strong>Уровень опасности:</strong> ${
                      monster.challenge_rating
                    }</p>
                    
                    ${
                      monster.abilities
                        ? `<h3>Особые способности</h3><ul>${monster.abilities
                            .map((a) => `<li>${a}</li>`)
                            .join("")}</ul>`
                        : ""
                    }
                    
                    ${
                      monster.actions
                        ? `<h3>Действия</h3><ul>${monster.actions
                            .map((a) => `<li>${a}</li>`)
                            .join("")}</ul>`
                        : ""
                    }
                `;

    container.appendChild(card);
  });
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
  // Первоначальная загрузка
  renderMonsters(monsters);
});
