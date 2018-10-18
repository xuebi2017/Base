/************************************base***************************************/
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

/*****************************************String**********************************/
String.prototype.format = function() {
    let length = arguments.length
    let str = this + ''
    for(let i = 0; i < length; i++) {
        str = str.replace(eval('/\\{' + i + '\\}/g'), arguments[i])
    }
    return str
}


/*****************************************Number***********************************/
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

