
/**
 * 判断某个函数是否是异步的
 * @param {function} fn 需要判断的函数
 * */
export function isAsync(fn)
{
    return fn?.constructor?.name === 'AsyncFunction'
}

/**
 * 对于同步函数, 直接执行这个函数; 对于异步函数, 会在执行完成之后执行 finally 方法, 防止资源泄露
 * @param {function} fn 需要执行的函数
 * */
export function callAnyway(fn)
{
    if(isAsync(fn)) fn().finally(() => {})
    else fn()
}

const mapChannelTimer = {}
/**
 * 防抖函数
 * @param {string} channel 防抖频道名称. 对于每个调用者来说, 这个值应该全局唯一
 * @param {function} fn 需要防抖的函数
 * @param {number} delay 防抖延迟时间
 * */
export function debounce (channel, fn, delay = 300)
{
    return function () {
        if(mapChannelTimer[channel])
        {
            clearTimeout(mapChannelTimer[channel])
            mapChannelTimer[channel] = null
        }
        mapChannelTimer[channel] = setTimeout(() => {
            mapChannelTimer[channel] = null
            callAnyway(fn)
        }, delay);
    }
}

// function replace (array = [], content = null)
// {
//     if(array == null || !(array instanceof Array)) return
//     array.splice(0, array.length)
//
//     if(content == null || content[Symbol.iterator] === undefined) return
//     array.push(...content)
// }

// function padZero(num) {
//     return num < 10 ? '0' + num : num;
// }
//
// function format(date) {
//     const dateObj = new Date(date);
//
//     // 获取UTC时间
//     // const utcYear = dateObj.getUTCFullYear();
//     // const utcMonth = dateObj.getUTCMonth() + 1;
//     const utcDay = dateObj.getUTCDate();
//     const utcHours = dateObj.getUTCHours();
//     // const utcMinutes = dateObj.getUTCMinutes();
//     // const utcSeconds = dateObj.getUTCSeconds();
//
//     // 转为东八区时间
//     const beijingHours = utcHours + 8;
//     if (beijingHours > 24) {
//         dateObj.setDate(utcDay + 1);
//         dateObj.setHours(beijingHours - 24);
//     } else {
//         dateObj.setHours(beijingHours);
//     }
//
//     // 格式化为yyyy-MM-dd HH:mm:ss
//     return dateObj.getFullYear() + '-' +
//         padZero(dateObj.getMonth() + 1) + '-' +
//         padZero(dateObj.getDate()) + ' ' +
//         padZero(dateObj.getHours()) + ':' +
//         padZero(dateObj.getMinutes()) + ':' +
//         padZero(dateObj.getSeconds());
// }

// /**
//  * @template T
//  * @param {T[]} array
//  * @param {(array: T) => boolean} predicate
//  * @return {[[number, number]]}
//  * */
// export function rangesOf(array, predicate)
// {
//     if(array == null || predicate == null) throw 'param is null'
//     if(array.length === 0) return []
//     let status = predicate(array[0])
//     let statusIndex = status ? 0 : -1
//     let ret = []
//
//     for(let step = 0; step < array.length; step++)
//     {
//         const currentStatus = predicate(array[step])
//         if(currentStatus !== status)
//         {
//             if(status)
//                 ret.push([statusIndex, step - 1])
//             else
//                 statusIndex = step
//             status = currentStatus
//         }
//     }
//     if(status)
//     {
//         ret.push([statusIndex, array.length - 1])
//     }
//     return ret
// }
