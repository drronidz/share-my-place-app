const GOOGLE_API_KEY = 'AIzSyCueuEMBmaAK6XUl6pfsL0J5NTF6HwpjtY'

export async function getAddressFromCoordinates(coordinates) {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?
        latlan=${coordinates.lat},${coordinates.lng}
        &
        key=${GOOGLE_API_KEY}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch address (${coordinates}). Please try again!`)
    }

    const data = await response.json()
    if (data.error_message) {
        throw new Error(data.error_message)
    }

    return data.result[0].formatted_address
}
export async function getCoordinatesFromAddress(address) {
    const urlAddress = encodeURI(address)
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?
        address=${urlAddress}
        &
        key=${GOOGLE_API_KEY}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch coordinates (${address}). Please try again!`)
    }

    const data = await response.json()
    if (data.error_message) {
        throw new Error(data.error_message)
    }

    return data.results[0].geometry.location
}