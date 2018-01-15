export function formatCurrency (value) {
  return '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

export function any (arr, fn) {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i)) {
      return true
    }
  }

  return false
}

export function precisionRound (number, precision) {
  const factor = Math.pow(10, precision)
  return Math.round(number * factor) / factor
}
