// 搜集依赖

const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const babelCore = require('@babel/core')

const traverse = require('@babel/traverse').default

const entry = 'index.js';

const depMap = {
  
}


// 获取单个模块依赖
function getModuleInfo(file){

  const absPath = path.join(process.cwd()+'/src/',file)

  // console.log('00absPath', absPath)

  const content = fs.readFileSync(absPath, 'utf-8')
  // 
  const ast  = babelParser.parse(content, {
    sourceType: 'module'
  })
  // 
  const {code} = babelCore.transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })
  let deps = []
  traverse(ast, {
    ImportDeclaration({node}){
      deps.push(node.source.value)
    }
  })
  depMap[file] = {
    content: code,
  }
  
  return {
    file,
    deps,
  }
} 
// 
function getInfo(entry){

  //获取全部依赖
  const { deps } = getModuleInfo(entry)
  deps.map((item) => getInfo(item))
  // return {
  //   'inex.js': 'xxx',
  //   'sdf.js': 'xxx'
  // }
}
getInfo(entry)

console.log(depMap)



if( !fs.existsSync('./dist')){
  fs.mkdirSync('./dist')
}else {
  fs.unlinkSync('./dist/index.js')
}

fs.writeFileSync('./dist/index.js', `
    (function(list){
      function require(file){
        var exports = {}
        eval(list[file]['content'])
        return exports
      }
      require('${entry}')
    })(${JSON.stringify(depMap)})

`)




