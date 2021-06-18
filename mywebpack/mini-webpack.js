// 搜集依赖

const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const babelCore = require('@babel/core')
const traverse = require('@babel/traverse').default
// import traverse from "@babel/traverse";
// console.log('---traverse', traverse)
const entry = './src/index.js';

const depMap = {
  
}

// const code = fs.readFileSync(entry, 'utf-8')

// babelCore.transform(code, (err, result) => {
//   console.log('--result',result)
// })

// const  ast = babelParser.parse(code, {
//   sourceType: 'module'
// })
// // console.log(ast.program.body)
// traverse(ast, {
//   ImportDeclaration: function(arg){
//     // console.log('-arg',arg.type)
//     // console.log('-arg',arg)
//     // console.log('-arg',arg.container)
//     const deps =  arg.container.filter(item => item.type === 'ImportDeclaration').map(item => item.source.value)
//     console.log('deps', deps)
//     // arg.container.type === 'ImportDeclaration'
//     // arg.container.source.value ===> ./add.js

//   }
// })
// const basePath = __dirname;
const basePath = process.cwd();
// console.log('---basePath',basePath)
const parentPath = path.join('./src')
// console.log('parentPath',parentPath)
function getMapInfo(file){
  const absPath = path.join(basePath, file)
  console.log('absPath', absPath)
  const code = fs.readFileSync(absPath, 'utf-8')

  const  ast = babelParser.parse(code, {
    sourceType: 'module'
  })
  traverse(ast, {
    ImportDeclaration: function(arg){
      const deps =  arg.container.filter(item => item.type === 'ImportDeclaration').map(item => item.source.value)
      // console.log('deps', deps)
      
      depMap[file] = {
        deps,
        content: code
      }
      console.log('---depMap',depMap)
      deps.forEach(dep => getMapInfo(`src/add.js`))

    }
  })

}
const map = getMapInfo(entry)
console.log('map', depMap)