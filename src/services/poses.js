import poses from '../data/poses.json'

export function getAllPoses () {
  return poses
}

export function getPosesByStyle (style) {
  if (style === undefined || style === 'all') return poses
  return poses.filter(p => p.style === style)
}

export function getAllStyles () {
  const styles = new Set()

  poses.forEach(pose => {
    styles.add(pose.style)
  })

  return Array.from(styles)
}
