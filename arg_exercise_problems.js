function sum1() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    };
    return total;
};

function sum2(...args) {
    let total = 0;
    args.forEach(function(ele) {
        total += ele;
    })
    return total;
};

// console.log(sum1(1, 2, 3, 4) === 10);
// console.log(sum2(1, 2, 3, 4, 5) === 15);

Function.prototype.myBind1 = function (ctx) {
    const func = this; 
    const bindTimeArgs = Array.from(arguments).slice(1);
    return function() {
        const callTimeArgs = Array.from(arguments);
        return func.apply(ctx, bindTimeArgs.concat(callTimeArgs));
    };
};

Function.prototype.myBind2 = function (ctx, ...bindTimeArgs) {
    const func = this; // always call bind on a function
    return function(...callTimArgs) {
        func.call(ctx, ...bindTimeArgs, ...callTimArgs); // Order matters
    };
};

class Cat {
    constructor(name) {
        this.name = name;
    };

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    };
};

class Dog {
    constructor(name) {
        this.name = name;
    };
};

// const markov = new Cat("Markov");
// console.log(typeof markov);
// const pavlov = new Dog("Pavlov");


// markov.says("meow", "Ned"); // normal args (no bind)
// // Markov says meow to Ned!
// // true

// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind1(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true

// // CALL TIME
// markov.says.myBind1(pavlov)("meow", "a tree");

// // no bind time args (other than context), call time args are "meow" and "a tree"
// let bounded = markov.says.myBind1(pavlov);
// bounded("meow", "a tree"); // This is call time args -- args passed when we call the bounded func
// // Pavlov says meow to a tree!
// // true

// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind1(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true

// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind1(pavlov);
// notMarkovSays("meow", "me");
// // Pavlov says meow to me!
// // true



/*----------------------------------
          Currying
-----------------------------------*/

function curriedSum(numArgs){
  let numbers = [];
    return function _curriedSum(num1){
      numbers.push(num1);
      if(numbers.length === numArgs){
        return numbers.reduce((a,b) => a + b , 0);
      }else{
        return _curriedSum;
      }
    }
}


// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1));// => 56

// Version rest Operator
// ... can trun args into arr
Function.prototype.curry1 = function(numArgs){
  let that = this; //=>that : function when call curry on!(in this case sumThree);
  console.log(that);
  let collect = []; 
  return function _curried(num){
    collect.push(num);
    if(collect.length === numArgs){
      return that(...collect);
    }else{
      return _curried;
    }
  }
}


// Version using apply
// const sum = curry(4);
// console.log(sum[5,30,20,1]);// => 56

Function.prototype.curry2 = function(numArgs){
  let that = this;
  let collect = []; 

  return function _curried(num){
    collect.push(num);
    if(collect.length === numArgs){
      return that.apply(undefined, collect);
    }else{
      return _curried;
    }
  }
}


function sumThree(num1, num2, num3) {
  // console.log(`this is : ${this}`);
  
  return num1 + num2 + num3;
}

// sumThree(4, 20, 6); // == 30

// // you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry1(3)(4)(20)(6));// == 30

// ...=>any num of args
