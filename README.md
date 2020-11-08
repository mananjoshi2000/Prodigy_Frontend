
# Smart-Doc
#### A Collaborative text editor with video chat functionality
This is a Simple yet effective Text collaboration platform where people can type and discuss at the same time - developed by using `React , Node , Express and mongoDB`

You can find the repo for the Text Editor [here](https://github.com/hemang11/Smart-Doc-Editor)

![](https://github.com/hemang11/Smart-Doc/blob/main/smart-doc.png?raw=true)

#### Development
- You need Node & Yarn to start the development environment. Download them here - [Node](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/).


- Clone the repository and run the following commands

> To Start the server run the following commands once you have cloned the repository
> 
```bash
npm install
node server.js
```

> Now open another terminal and run the following commands
> 
```bash
cd client
npm install 
yarn start
```
## Collaborative text Editor

- For ***collaborative*** feature of text editing we have used the [YJS](https://github.com/yjs/yjs/blob/master/README.md) framework. Yjs is a [CRDT implementation](https://github.com/yjs/yjs/blob/master/README.md#Yjs-CRDT-Algorithm) that exposes its internal data structure as _shared types_. 
- YJS establishes a P2P connection in which users visiting the website can communicate with each other 
- It supports many existing **rich text editors**, **offline editing**, **version snapshots**, **undo/redo** and **shared cursors**. 

For the **Text editor** we have used `Quill	`
- [Quill](https://quilljs.com/) is a modern rich text editor built for compatibility and extensibility
- It has very useful built in function that makes it very easy to built a text editor
- For the cursor part  we have used `Quill Cursors` so that user sees a different name when collaborating. You can check [here](https://github.com/reedsy/quill-cursors)


