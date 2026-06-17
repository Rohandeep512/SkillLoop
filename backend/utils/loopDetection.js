export const detectLoops = (users) => {
  const loops = []
  const graph = {}
  const seen = new Set()

  // Build adjacency graph: uid -> [{id, user}] where u can teach v
  users.forEach(u => {
    const uid = u._id.toString()
    graph[uid] = []
    users.forEach(v => {
      const vid = v._id.toString()
      if (uid === vid) return
      const canTeach = u.skillsOffered.some(s => v.skillsWanted.includes(s))
      if (canTeach) graph[uid].push({ id: vid, user: v })
    })
  })

  // DFS to find cycles.
  // `visited` tracks nodes in the CURRENT path to prevent revisiting.
  // startId is NEVER added to visited so the cycle can close back to it.
  const dfs = (startId, currentId, path, visited) => {
    for (const neighbor of (graph[currentId] || [])) {
      if (neighbor.id === startId) {
        // We've come back to the start — only record if length >= 3
        if (path.length >= 3) {
          const ids = path.map(u => u._id.toString())

          // Canonical signature: rotate so smallest ID is first
          let minIdx = 0
          for (let i = 1; i < ids.length; i++) {
            if (ids[i] < ids[minIdx]) minIdx = i
          }
          const sig = [...ids.slice(minIdx), ...ids.slice(0, minIdx)].join('->')

          if (!seen.has(sig)) {
            seen.add(sig)
            loops.push([...path])
          }
        }
        // Whether length >= 3 or not, do NOT continue through startId
      } else if (!visited.has(neighbor.id) && path.length < 5) {
        // Explore deeper (cap at 5 to keep loops manageable)
        visited.add(neighbor.id)
        path.push(neighbor.user)
        dfs(startId, neighbor.id, path, visited)
        path.pop()
        visited.delete(neighbor.id)
      }
    }
  }

  users.forEach(u => {
    const uid = u._id.toString()
    // visited starts empty — startId is never in it so cycle can close
    dfs(uid, uid, [u], new Set())
  })

  return loops
}