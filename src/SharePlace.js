import { Modal } from './UI/Modal'

class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form')
        const locateUserButton = document.getElementById('locate-btn')

        locateUserButton.addEventListener('click', this.locateUserHandler)
        addressForm.addEventListener('submit', this.findAddressHandler)
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
                      console.log(coordinates)
              },
                  error => {
                      modal.hide()
                      console.log(error)
                      alert('Could not locate you unfortunately. Please enter an address manually!')
              })
          }
    }

    findAddressHandler() {

    }
}

new PlaceFinder()