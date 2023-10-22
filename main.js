// Project for Topvisor

function createApple() {
  return {
    age: Math.floor(Math.random() * 31),
    color: getRandomColor(),
    size: getRandomSize(),
    isSpoiled: 0,
    hasFallen: 0,
  };
}

function createTree() {
  return {
    apples: [],
    growApples: function () {
      for (let i = 0; i < getRandomNumber(5, 11); i++) {
        this.apples.push(createApple());
      }
    },
  };
}

function createGarden(numTrees) {
  const garden = {
    trees: [],
    age: 0,
    passDay: function () {
      this.age++;

      for (const tree of this.trees) {
        for (let i = tree.apples.length - 1; i >= 0; i--) {
          const apple = tree.apples[i];

          apple.age++;
          if (apple.age === 30 && getRandomNumber(0, 2) === 0) {
            apple.hasFallen = 1;
          }

          if (apple.hasFallen && apple.age === 31) {
            apple.spoiled = 1;
            if (!apple.isSpoiled) {
              tree.apples.splice(i, 1);
            } else if (getRandomNumber(0, 2) === 0) {
              tree.apples.splice(i, 1);
              const newTree = createTree();
              newTree.growApples();
              garden.trees.push(newTree);
            }
          }
        }

        if (this.age % 30 === 0) {
          tree.growApples();
        }
      }
    },
    getCountApples: function () {
      const hangingApples = [];
      for (const tree of this.trees) {
        for (const apple of tree.apples) {
          if (!apple.hasFallen) {
            hangingApples.push(apple);
          }
        }
      }
      console.log(`Количество висящих яблок в саду: ${hangingApples.length}`);
      return hangingApples;
    },
    getInfo: function () {
      console.log(`Количество деревьев в саду: ${this.trees.length}`);
      let totalApples = 0;
      for (const tree of this.trees) {
        totalApples += tree.apples.length;
      }
      console.log(`Количество яблок в саду: ${totalApples}`);
    },
  };

  for (let i = 0; i < numTrees; i++) {
    const tree = createTree();
    tree.growApples();
    garden.trees.push(tree);
  }

  return garden;
}

// Helpers

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const colors = ['red', 'green', 'yellow'];
  return colors[getRandomNumber(0, 3)];
}

function getRandomSize() {
  return getRandomNumber(5, 11);
}

// Use

const garden = createGarden(3);
garden.passDay();
garden.passDay();
garden.passDay();
garden.getCountApples();
garden.passDay();
garden.getCountApples();
garden.passDay();
garden.getCountApples();
garden.getInfo(); 
