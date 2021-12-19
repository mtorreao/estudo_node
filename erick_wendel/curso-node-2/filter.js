const service = require('./service')

Array.prototype.meuFilter = function (callback) {
    const newArray = []
    for (const index in this) {
        const element = this[index]
        const valid = callback(element, index)
        if (valid) {
            newArray.push(`${index} ${element}`)
        }
    }

    return newArray
}

function meuFilter(arr) {
    arr = arr.map(el => el.name)
    const newArr = arr.meuFilter((el, idx) => {
        return idx % 5 == 0
    })
    console.log('meuFilter', newArr);
}

async function main() {
    const peoples = await service.people()

    console.time('meuFilter')
    meuFilter(peoples)
    console.timeEnd('meuFilter')
}

main()