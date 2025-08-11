const getUnderConstructionStatus = () => {
  const underConstruction = process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION || process.env.UNDER_CONSTRUCTION
  return underConstruction === 'true'
}

export { getUnderConstructionStatus }