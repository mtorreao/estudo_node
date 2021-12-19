const starWarsService = require('./service')

function exFor(arr) {
    const newArr = []
    for (let i = 0; i < arr.length; i++) {
        const el = arr[i]
        newArr.push(el.name)
    }
    console.log('for', newArr);
}

function exForIn(arr) {
    const newArr = []
    for (let i in arr) {
        const el = arr[i]
        newArr.push(el.name)
    }
    console.log('forin', newArr);
}

function exForOf(arr) {
    const newArr = []
    for (let el of arr) {
        newArr.push(el.name)
    }
    console.log('forof', newArr);
}

function exMap(arr) {
    const newArr = []
    arr.map((el) => newArr.push(el.name))
    console.log('map', newArr);
}

function exForEach(arr) {
    const newArr = []
    arr.forEach((el) => newArr.push(el.name))
    console.log('forEach', newArr);
}

function exMeuMap(arr) {
    const newArr = arr.meuMap((el, idx) => el.name)
    console.log('meuMap', newArr);
}

Array.prototype.meuMap = function (callback) {
    const newArr = []
    for (const index in this) {
        const element = this[index]
        newArr.push(callback(element, index))
    }
    return newArr
}

async function main() {
    var peoples = await starWarsService.people()

    console.time('for')
    exFor(peoples)
    console.timeEnd('for')

    console.time('forin')
    exForIn(peoples)
    console.timeEnd('forin')

    console.time('forof')
    exForOf(peoples)
    console.timeEnd('forof')

    console.time('map')
    exMap(peoples)
    console.timeEnd('map')

    console.time('forEach')
    exForEach(peoples)
    console.timeEnd('forEach')

    console.time('meuMap')
    exMeuMap(peoples)
    console.timeEnd('meuMap')
}

main()