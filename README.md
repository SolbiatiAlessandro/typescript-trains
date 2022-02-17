## Demo
Chronological order


![](https://github.com/SolbiatiAlessandro/typescript-trains/blob/master/demo1.png?raw=true)


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

```
yarn dev
```
