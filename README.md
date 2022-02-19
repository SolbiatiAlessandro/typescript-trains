## Architecture

**src/objects**
- not initialised with scene
- if they have some painting methods the method accept scene as an argument
- generally core game logic, not to do with user interactions

- **src/objects/edge** is a edge that connect two nodes (stations)

**src/builders**
- **src/objects/railwayBuilder** builds railways, that are edge + rail images
- accept scene in the constructor

**src/interfaces**

**src/scenes**



## Dev Workflow

1. Make a new branch the new feature you are building in the ugliest/fastes way possible writing stuff in the main scene without adding files
2. Check if what you are seeing is good
3. Abandon your branch, check out master
4. Rewrite everything in small file <100 lines, functional, typed, and tested
5. Make small commits of every change.

```
yarn dev
```

Stretch: listen to bach while coding

Protip: use empty github comments to keep track of new features
```
git commit --allow-empty  (feature ideas descriptions)
git log --graph --decorate --oneline
```
