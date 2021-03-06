function createComparisonFunction(propertyName) {
    return function(object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    };
}

// 比较函数

// 阶乘函数
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        // return num*factorial(num-1)
        return num * arguments.callee(num - 1);
    }
}

var num = 10.005;
console.log('num-->', num.toFixed(2));
var num = 99;

var stringValue = 'hello world';
console.log(stringValue.slice(-5, -2));
console.log(stringValue.slice(-5, -6));

console.log('-----------------------------------');

// 从下标 3 开始到最后结束
console.log(stringValue.substr(3)); // lo world
// 从下标3开始到下标7结束，不包含
console.log(stringValue.substr(3, 7)); // lo w
// 截取最后三位
console.log(stringValue.substr(-3)); // rld
// 从下标3开始到（11-4）结束
console.log(stringValue.substr(3, -4)); // lo w
// 从（11-5）开始， 到（11-2）结束
console.log(stringValue.substr(-5, -2)); // wor
// 输出空字符串
console.log(stringValue.substr(-5, -6)); // ""

console.log('-----------------------------------');

var text = 'cat, bat, sat, fat';
var result = text.replace(/(.at)/g, 'word ($1)');

var values = [1, 2, 3, 4, 5, 6, 7, 8];
var max = Math.max.apply(Math, values);
console.log('max---->', max);

var person = {
    name: 'Nnicholas',
    age: 29,
    job: 'Software Engineer',
    sayName: function() {
        console.log(this.name);
    }
};

console.log(person);
console.log('-----------------------------------');

function Person(name, age, obj) {
    this.name = name;
    this.age = age;
    this.obj = obj;
    this.sayName = function() {
        console.log(this.name);
    };
}

var person1 = new Person('Greg', 27, 'Doctor');
console.log(person1);
console.log(person1.constructor === Person); // true
console.log(Person.prototype.constructor === Person); // true
console.log(person1 instanceof Person); // true

// 返回的是person1的原型
console.log(Object.getPrototypeOf(person1) === Person.prototype); // true

// 判断一个属性是否存在于实例中还是存在于原型中
console.log(person1.hasOwnProperty('name')); // true

console.log('---------------inherit--------------------');
// 继承
/* function SuperType() {
			this.property = true;
		}
		SuperType.prototype.getSuperValue = function () {
			return this.property;
		}

		function SubType() {
			this.subproperty = false;
		}
		SubType.prototype = new SuperType();
		SubType.prototype.getSubValue = function () {
			return this.subproperty;
		}

		var instance = new SubType();
		console.log(instance)
		console.log(instance.getSuperValue()); */
// isPrototypeOf()

// 继承 借用构造函数
function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function() {
    console.log('Hello World!_>', this.name);
};
function SubType(name, age) {
    // 继承了 SuperType
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
    console.log(this.age);
};

var instance1 = new SubType('Nicholas', 26);
instance1.colors.push('black');
console.log('instance1-->', instance1.colors);
instance1.sayName();
instance1.sayAge();

var instance2 = new SubType('Greg', 27);
console.log('instance2-->', instance2.colors);
instance2.sayName(); // error
instance2.sayAge();

// Object.create() 可接受两个参数， 第一个为创建新对象的原型的对象，第二个可选。为新对象定义额外属性的对象
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

// Object.create() 第二个参数格式 类似于 Object.defineProperties()
var anotherPerson = Object.create(person, {
    name: {
        value: 'Greg'
    }
});

console.log('---------------closure--------------------');
// 闭包
function createFunctions() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        result[i] = function() {
            return i;
        };
    }
    return result;
}

var funArr = createFunctions();
console.log(funArr[0]());
console.log(funArr[1]());
console.log(funArr[2]());
console.log(funArr[3]());

function createNewFunctions() {
    var result = [];
    for (var i = 0; i < 10; i++) {
        result[i] = (function(num) {
            return function() {
                return num;
            };
        })(i);
    }
    return result;
}
var funNewArr = createNewFunctions();
console.log(funNewArr[0]());
console.log(funNewArr[1]());
console.log(funNewArr[2]());
console.log(funNewArr[3]());
console.log('----------------this-------------------');
var name11 = 'This Window';
var object11 = {
    name11: 'My Object',
    getNameFunc: function() {
        return function() {
            return this.name11;
        };
    }
};
console.log('this--->', object11.getNameFunc()());
console.log('this--->', object11.getNameFunc().call(object11));
