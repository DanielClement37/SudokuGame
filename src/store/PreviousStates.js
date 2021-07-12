
let previousStates = []

export function StoreStates(currentState) {
    if(previousStates.length > 15) {
        //if more than 15 elements, remove one element at index 0
        previousStates.splice(0, 1)
    }
    previousStates.push(currentState)
}

export function GetPreviousState() {
    //return and remove the last state
    return previousStates.pop()
}