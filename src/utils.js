export function parseId($chbox) {
    const parsed = $chbox.dataset.id.split(':')
    return {
        questionId: +parsed[0],
        answerId: +parsed[1]
    }
}

export function disable($buttons, state) {
    if (Array.isArray($buttons)) {
    $buttons.forEach($btn => $btn.disabled = state)
    return
    }
    $buttons.disabled = state
}

export function isValid(data) {
    const regExp = /^(?:\s*[1-4]\s*\,){0,3}\s*[1-4]\s*$/
    if (regExp.test(data)) {
        let correctedData = data
            .split(',')
            .map(el => el.trim())
        
        const uniqueValues = [...new Set(correctedData)]
        return uniqueValues.length === correctedData.length
    }
    return false
}