import { Modal } from './UI/Modal'
import { Map } from './UI/Map'
import { getCoordinatesFromAddress, getAddressFromCoordinates } from './Utility/Location'

// TODO NO API KEY SINCE WE DON'T HAVE A CREDIT CARD !!
class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form')
        const locateUserButton = document.getElementById('locate-btn')
        this.shareButton = document.getElementById('share-btn')

        locateUserButton.addEventListener('click', this.locateUserHandler.bind(this))
        this.shareButton.addEventListener('click', this.sharePlaceHandler)
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this))
    }

    sharePlaceHandler () {
        const sharedLinkInputElement = document.getElementById('share-link')
        if (!navigator.clipboard) {
            sharedLinkInputElement.select()
        }
        else {
            navigator.clipboard.writeText(sharedLinkInputElement.value)
                .then(() => {
                    alert('Copied into clipboard!')
            })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    selectPlace(coordinates, address) {
        if(this.map) {
            this.map.render(coordinates)
        } else {
            this.map = new Map(coordinates)
        }
        this.shareButton.disabled = false
        const sharedLinkInputElement = document.getElementById('share-link')
        sharedLinkInputElement.value = `${location.origin}/my-place?
        address=${encodeURI(address)}
        &
        lat=${coordinates.latitude}
        &
        lng=${coordinates.longitude}`
    }

    locateUserHandler() {
          if(!navigator.geolocation) {
              alert('Location feature is not available in your browser - ' +
                  'please update your browser or enter an address manually')
          }
        const modal =
            new Modal(
                'loading-modal-content',
                'Loading location - please wait!')

        modal.show()

        navigator.geolocation.getCurrentPosition(
            async successResult => {
                modal.hide()
                console.log(successResult)
                // TODO coordinates object must converted into a Coordinate Class ...
                const coordinates = {
                    latitude: successResult.coords.latitude,
                    longitude: successResult.coords.longitude
                }
                const address = await getAddressFromCoordinates(coordinates)
                this.selectPlace(coordinates, address)
            },
            error => {
                modal.hide()
                console.log(error)
                alert('Could not locate you unfortunately. Please enter an address manually!')
            })
    }

    async findAddressHandler(event) {
        event.preventDefault()
        const address = event.target.querySelector('input').value
        if (!address || address.trim().length === 0) {
            alert('Invalid address entered - please try again!')
        }
        else {
            const modal = new Modal(
                'loading-modal-content',
                'Loading location - please wait!'
            )
            modal.show()
            try {
                const coordinates = await getCoordinatesFromAddress(address)
                this.selectPlace(coordinates, address)
            } catch (error) {
                alert(error.message)
            }
            modal.hide()
        }
    }
}

new PlaceFinder()