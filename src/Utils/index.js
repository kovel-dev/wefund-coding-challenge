export const calcFileSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export const getTotalSize = (item, sum = 0) => {
  if (item.type === "file") {
      return sum + parseInt(item.size);
  }
  return sum + item.children.reduce((s, child) => s + getTotalSize(child), 0);
}

export const getTotalCount = (item, count = 0) => {
  if (item.type === "file") {
      return count + 1;
  }
  return count + item.children.reduce((s, child) => s + getTotalCount(child), 0);
}