const getUnderConstructionStatus = () => {
  const underConstruction = process.env.UNDER_CONSTRUCTION
  return underConstruction === 'true'
}

export { getUnderConstructionStatus };