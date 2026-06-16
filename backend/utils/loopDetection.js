export const detectLoops = (users) => {
  const loops = []
  const graph = {}
  const seen = new Set()

  users.forEach(u => {
    graph[u._id] = []
    users.forEach(v => {
      if (u._id.toString() === v._id.toString()) return
      const canTeach = u.skillsOffered.some(s => v.skillsWanted.includes(s))
      if (canTeach) graph[u._id].push({ id: v._id.toString(), user: v })
    })
  })

  const dfs = (startId, currentId, path, visited) => {
    if (path.length > 1 && currentId === startId) {
      if (path.length < 3) return
      const ids = path.map(u => u._id.toString())
      let minIdx = 0
      for (let i = 1; i < ids.length; i++) if (ids[i] < ids[minIdx]) minIdx = i
      const sig = [...ids.slice(minIdx), ...ids.slice(0, minIdx)].join('->')
      if (!seen.has(sig)) { seen.add(sig); loops.push([...path]) }
      return
    }
    if (path.length > 5) return
    for (const neighbor of (graph[currentId] || [])) {
      if (!visited.has(neighbor.id) || neighbor.id === startId) {
        visited.add(neighbor.id)
        path.push(neighbor.user)
        dfs(startId, neighbor.id, path, visited)
        path.pop()
        visited.delete(neighbor.id)
      }
    }
  }

  users.forEach(u => {
    const visited = new Set([u._id.toString()])
    dfs(u._id.toString(), u._id.toString(), [u], visited)
  })

  return loops
}