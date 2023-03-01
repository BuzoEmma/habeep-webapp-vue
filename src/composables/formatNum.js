function formatNumber(number) {
    let arrayNum2 = number.toString().split('')
    let stringValue = ''

    let last = [],
        third = [],
        first = [],
        sec = []

    if (arrayNum2.length > 3) {
        last = arrayNum2.slice(arrayNum2.length - 3, arrayNum2.length)
        if (last.length > 2) last.unshift(',')

        if (arrayNum2.length > 6) {
            third = arrayNum2.slice(arrayNum2.length - 6, arrayNum2.length - 3)
            if (third.length > 2) third.unshift(',')
        } else third = arrayNum2.slice(arrayNum2.length - 5, arrayNum2.length - 3)

        if (arrayNum2.length > 9) {
            sec = arrayNum2.slice(arrayNum2.length - 9, arrayNum2.length - 6)
            if (sec.length > 2) sec.unshift(',')
        }
        // else sec = arrayNum2.slice(arrayNum2.length - 8, arrayNum2.length - 6)

        if (arrayNum2.length > 12) {
            first = arrayNum2.slice(arrayNum2.length - 12, arrayNum2.length - 9)
            if (first.length > 2) first.unshift(',')
        }
        // else first = arrayNum2.slice(arrayNum2.length - 11, arrayNum2.length - 9)

        let joined = first.concat(sec).concat(third).concat(last)
        if (arrayNum2.length % 2 !== 0) {
            joined.unshift(arrayNum2[1])
            joined.unshift(arrayNum2[0])
        } else joined.unshift(arrayNum2[0])

        stringValue = joined.join('').toString()
    } else {
        stringValue = arrayNum2.join('').toString()
    }

    return stringValue

}

export default formatNumber