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

Make a new branch the new feature you are building in the ugliest/fastes way possible writing stuff in the main scene without adding files
Check if what you are seeing is good
Abandon your branch, check out master
Rewrite everything in small file <100 lines, functional, typed, and tested
Make small commits of every change.

```
yarn dev
```
