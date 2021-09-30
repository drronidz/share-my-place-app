import { Modal } from './UI/Modal'
import { Map } from './UI/Map'

// TODO NO API KEY SINCE WE DON'T HAVE A CREDIT CARD !!
class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form')
        const locateUserButton = document.getElementById('locate-btn')

        locateUserButton.addEventListener('click', this.locateUserHandler.bind(this))
        addressForm.addEventListener('submit', this.findAddressHandler.bind(this))
    }

    selectPlace(coordinates) {
        if(this.map) {
            this.map.render(coordinates)
        }
        this.map = new Map(coordinates)
    }

    locateUserHandler() {
          if(!navigator.geolocation) {
              alert('Location feature is not available in your browser - ' +
                  'please update your browser or enter an address manually')
          } else {
              const modal =
                  new Modal(
                      'loading-modal-content',
                      'Loading location - please wait!')

              modal.show()

              navigator.geolocation.getCurrentPosition(
                  successResult => {
                      modal.hide()
                      console.log(successResult)
                      // TODO coordinates object must converted into a Coordinate Class ...
                      const coordinates = {
                          latitude: successResult.coords.latitude,
                          longitude: successResult.coords.longitude
                      }
                      this.selectPlace(coordinates)
              },
                  error => {
                      modal.hide()
                      console.log(error)
                      alert('Could not locate you unfortunately. Please enter an address manually!')
              })
          }
    }

    findAddressHandler(event) {
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
        }
    }
}

new PlaceFinder()