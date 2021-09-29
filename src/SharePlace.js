class PlaceFinder {
    constructor() {
        const addressForm = document.querySelector('form')
        const locateUserButton = document.getElementById('locate-btn')

        locateUserButton.addEventListener('click', this.locateUserHandler())
        addressForm.addEventListener('submit', this.findAddressHandler)
    }

    locateUserHandler() {
          if(!navigator.geolocation) {
              alert('Location feature is not available in your browser - ' +
                  'please update your browser or enter an address manually')
          } else {
              navigator.geolocation.getCurrentPosition(
                  successResult => {
                      console.log(successResult)
                      // TODO coordinates object must converted into a Coordinate Class ...
                      const coordinates = {
                          latitude: successResult.coords.latitude,
                          longitude: successResult.coords.longitude
                      }
                      console.log(coordinates)
              },
                  error => {
                      alert('Could not locate you unfortunately. Please enter an address manually!')
              })
          }
    }

    findAddressHandler() {

    }
}

new PlaceFinder()