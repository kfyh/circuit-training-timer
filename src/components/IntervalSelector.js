export default function selectNextInterval (state, intervals) {
  let currentIntervalIndex = state.currentIntervalIndex
  let currentIntervalRep = state.currentIntervalRep
  let currentStepIndex = state.currentStepIndex
  let currentStepRep = state.currentStepRep
  const currentInterval = intervals[currentIntervalIndex]

  if (currentInterval.type === 'set') {
    const result = selectIntervalFromSet(state, intervals)
    currentIntervalIndex = result.currentIntervalIndex
    currentIntervalRep = result.currentIntervalRep
    currentStepIndex = result.currentStepIndex
    currentStepRep = result.currentStepRep
  } else if (currentIntervalRep < currentInterval.reps) {
    currentIntervalRep++
  } else {
    const nextIntervalIndex = currentIntervalIndex + 1
    if (nextIntervalIndex < intervals.length) {
      currentIntervalIndex = nextIntervalIndex
      currentIntervalRep = 1
    } else {
      currentIntervalIndex = -1
    }
  }

  if (currentIntervalIndex < 0) {
    return {
      currentIntervalIndex: -1,
      timeLeft: 0
    }
  } else {
    let newInterval = intervals[currentIntervalIndex]
    if (newInterval.type === 'set') {
      newInterval = newInterval.steps[currentStepIndex]
    }

    return {
      timeLeft: newInterval.time * 1000,
      endTime: Date.now() + (newInterval.time * 1000),
      currentIntervalIndex: currentIntervalIndex,
      currentIntervalRep: currentIntervalRep,
      currentStepIndex: currentStepIndex,
      currentStepRep: currentStepRep
    }
  }
}

function selectIntervalFromSet (state, intervals) {
  let currentIntervalIndex = state.currentIntervalIndex
  let currentIntervalRep = state.currentIntervalRep
  const currentInterval = intervals[currentIntervalIndex]

  let currentStepIndex = state.currentStepIndex
  let currentStepRep = state.currentStepRep
  const currentStep = currentInterval.steps[currentStepIndex]

  if (currentStepRep < currentStep.reps) {
    currentStepRep++
  } else {
    currentStepRep = 1
    const nextStepIndex = currentStepIndex + 1
    if (nextStepIndex < currentInterval.steps.length) {
      currentStepIndex = nextStepIndex
      currentStepRep = 1
    } else {
      if (currentIntervalRep < currentInterval.reps) {
        currentIntervalRep++
        currentStepIndex = 0
        currentStepRep = 1
      } else {
        const nextIntervalIndex = currentIntervalIndex + 1
        if (nextIntervalIndex < intervals.length) {
          currentIntervalIndex = nextIntervalIndex
          currentIntervalRep = 1
        } else {
          currentIntervalIndex = -1
        }
      }
    }
  }

  return {
    currentIntervalIndex: currentIntervalIndex,
    currentIntervalRep: currentIntervalRep,
    currentStepIndex: currentStepIndex,
    currentStepRep: currentStepRep
  }
}
