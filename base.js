/*****************************************String**********************************/
/**
 * 输入：占位符中需要替换成的字符串序列
 * 输出：替换完成的结果
 */
String.prototype.format = function() {
    let length = arguments.length
    let str = this + ''
    for(let i = 0; i < length; i++) {
        str = str.replace(eval('/\\{' + i + '\\}/g'), arguments[i])
    }
    return str
}
/*****************************************Number***********************************/
/**
 * 
 * @param {*} length 需要约成小数点后面length位
 * @returns 返回的是四舍五入的结果，该方法可以弥补javaScript自带的toFixed方法中对于四舍五入处理不精确的问题（js中的toFixed基本遵循四舍六入五成双的原则）
 */
Number.prototype.toFixed = function(length)
{
    var carry = 0; //存放进位标志
    var num,multiple; //num为原浮点数放大multiple倍后的数，multiple为10的length次方
    var str = this + ''; //将调用该方法的数字转为字符串
    var dot = str.indexOf("."); //找到小数点的位置
    if(str.substr(dot+length+1,1)>=5) carry=1; //找到要进行舍入的数的位置，手动判断是否大于等于5，满足条件进位标志置为1
    multiple = Math.pow(10,length); //设置浮点数要扩大的倍数
    num = Math.floor(this * multiple) + carry; //去掉舍入位后的所有数，然后加上我们的手动进位数
    var result = num/multiple + ''; //将进位后的整数再缩小为原浮点数
    /*
    * 处理进位后无小数
    */
    dot = result.indexOf(".");
    if(dot < 0){
        result += '.';
        dot = result.indexOf(".");
    }
    /*
    * 处理多次进位
    */
    var len = result.length - (dot+1);
    if(len < length){
        for(var i = 0; i < length - len; i++){
            result += 0;
        }
    }
    return result;
}

/******************************************Object********************************/
/**
 *
 *
 * @param {*} rows，表示对象组成的数组, keys表示需要对象的属性组成的数组
 * @returns 返回的也是对象组成的数组，但是获取的是对象的一部分属性keys
 */
function getHashData1(rows, keys) {
    let arr = rows.map((row, index) => {
        let hash = {}
        for(let key of keys) {
            hash[key] = row[key]
        }
        return hash
    })
    return arr
}

/**
 *
 *
 * @param {*} rows，表示对象组成的数组
 * @param {*} keys,表示需要对象的属性组成的数组
 * @returns 返回的是对象，对象的属性为keys中的值
 */
function getHashData2(rows, keys) {
    let hash = {}
    for(let key of keys) {
        let arr = rows.map((row, index) => {
            return row[key]
        })
        hash[key] = arr
    }
    return hash 
}

function equals(x, y) {
    var f1 = x instanceof Object
    var f2 = y instanceof Object
    if(!f1 || !f2) {
        return x === y
    }
    if(Object.keys(x).length !== Object.keys(y).length) {
        return false
    }
    var indexofX = Object.keys(x)
    for(var index of indexofX) {
        count++
        var f3 = x[index] instanceof Object
        var f4 = y[index] instanceof Object
        if(f3 && f4) {
            equals(x[index], y[index])
        }else if(x[index] !== y[index]) {
            return false
        }
    }
    return true
}

/************************************Array*****************************/
//ES5写法
/**
 *
 * @param {*} array, 待去重的数组
 * @returns 输出去重后的数组·
 */
function unique(array) {
    var res = array.filter(function (item, index, array) {
        return array.indexOf(item) === index;
    })
    return res;
}
//ES6写法, a是待去重的数组，b是去重后的数组
var b = [...new Set(a)]

/************************************Date*****************************/
/**
 * 
 * @param {日期} strDate, 格式：2018-01-01
 * @returns 返回的是输入日期是星期几，string, 如：'星期一' 
 */
var getDay = function(strDate) {
    let days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let str = strDate.replace(/-/g, '/');
    let i = new Date(str).getDay();
    return days[i]
}

//用javascript取得某一年的第一个星期一的日期 
/**
 *
 * @param {年份} year, Number类型，如：2018
 * @returns 返回的是日期，GMT格式：Mon Feb 05 2018 00:00:00 GMT+0800 (中国标准时间)
 */
function get(year) {
    var d = new Date(year, 1, 1);
    var day = d.getDay(); //获取1月1号是星期几
    d.setDate((8 - day) % 7 + 1);
    return d;
}

//求前 n 天或者后 n 天的日期
/**
 * 
 * @param {前n天或者后n天，如果是后n天，n是正数；如果是前n天，n是负数。}} n 
 * @returns 返回的是前n天或者后n天的日期，日期格式是2018/11/16
 */
var showdate = function(n){
    var d = new Date();
    d.setDate(d.getDate()+n);
    //或者 d = d.getFullYear() + "-" +  (d.getMonth()+1) + "-" + d.getDate();
    d = d.toLocaleDateString().replace(/[\u4e00-\u9fa5]/g,'-').replace(/-$/,'')    
    return d;
}


// Date.prototype.getDayOfWeek = function(strDate) {
//     let days = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
//     let str = strDate.replace(/-/g, '/');
//     let i = new Date(str).getDay();
//     return days[i]
// }


/***********************************tools****************************/
/**
 * 
 * @param {需要格式化的金额字符串} cashStr 
 * @returns 输出格式化后的金额
 */
let formatCash = function(cashStr) {
    return cashStr.split('').reverse().reduce((prev, cur, index) => {
        return ((index%3) ? cur : (cur+',')) + prev
    })
}

function promiseJSON({url, data = '', type = 'GET', contentType, async = true}) {
    // let {url, data = '', type, contentType = 'text/html', async = true} = options
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, async);
        contentType && xhr.setRequestHeader('content-type', contentType)
        xhr.onreadystatechange = function(res) {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    // console.log('xhr', xhr)                    
                    resolve.call(undefined,JSON.parse(xhr.responseText))
                }else {
                    reject.call(undefined, xhr)
                }
            }
        };
        xhr.send(data);
    })
}
