let fs = require('fs');
let readFile = function (fileName){
  return new Promise(function(resolve, reject){
    fs.readFile(fileName, function(error, data){
      if(error) reject(error);
      resolve(data);
    })
  })
}
let gen = function* (){
  let f1 = yield readFile('./demo1.txt');
  let f2 = yield readFile('./demo2.txt');
  console.log(f1.toString())
  console.log(f2.toString())
}

//手动执行上面的Generator函数
// let g = gen();
// g.next().value.then(data => {
//   g.next(data).value.then(data => {
//     g.next(data);
//   })
// })

// 自动执行
function run(gen){
  let g = gen();

  function next(data){
    let result = g.next(data);
    if(result.done) {
      return result.value;
    }
    result.value.then(function(data){
      next(data);
    })
  }
  next();
}

run(gen)