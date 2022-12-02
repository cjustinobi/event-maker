export const truncate = input => {
  if (!input) return

  return `${input.substring(0, 5)}...${input.slice(-4)}`
}

export const cleanDate = dirtyDate => {
  if (!dirtyDate) return
  const date = new Date(dirtyDate)
  return date.toUTCString()
}