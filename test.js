// let arr = [3, 2, 4, 1]
// while(arr = readline()) {
//   // 排序好的直接输出
//   if (!arr.some((r, index) => index && r < arr[index - 1])) return console.log([])

//   let result = []
//   while(arr.some((r, index) => index && r < arr[index - 1])) {
//     let max = Math.max(...arr)
//     let index = arr.findIndex(r => r === max)
//     if (index) {
//       result.push(index + 1)
//       arr = arr.slice(0, index + 1).reverse().concat(arr.slice(index + 1))
//     }
//     result.push(arr.length)
//     arr = arr.reverse().slice(0, arr.length - 1)
//   }
//   console.log(result)
// }
let s = "abcabcbb"
let arr = s.split('')
let n = arr.length
let result = !n ? 0 : 1
for (let i = 0; i < n - 1; i++) {
    let value = arr[i].charCodeAt()
    let map = {}
    map[value] = i + ''
    for (let r = i + 1; r < n; r++) {
        let v = arr[r].charCodeAt()
        if (map[v]) {
            let len = r - i
            result = result > len ? result : len
            break
        }
        if (r === n - 1) {
            let len = r - i + 1
            return result = result > len ? result : len
        }
        map[v] = r
        
    }
}
console.log(result)
return result