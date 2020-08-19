

export function insertAtArray(item, array, pos) {
  return [
    ...array.slice(0, pos),
    item,
    ...array.slice(pos, array.length)
  ]
}

export function deleteAtArray(pos, array) {
  return [
    ...array.slice(array, pos -1 ),
    ...array.slice(pos, array.length)
  ]
}