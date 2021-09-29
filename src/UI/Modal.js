export class Modal {
    constructor(contentID, fallbackText) {
        this.fallbackText = fallbackText
        this.contentTemplateElement = document.getElementById(contentID)
        this.modalTemplateElement = document.getElementById('modal-template')
    }

    show() {
        if ('content' in document.createElement('template')) {
            const modalContent = document.importNode(
                this.modalTemplateElement.content,
                true
            )
            this.modalElement = modalContent.querySelector('.modal')
            this.backdropElement = modalContent.querySelector('.backdrop')
            const contentElement = document.importNode(
                this.contentTemplateElement.content,
                true
            )
            this.modalElement.appendChild(contentElement)

            document.body.insertAdjacentElement('afterbegin', this.modalElement)
            document.body.insertAdjacentElement('afterbegin', this.backdropElement)

        } else {
            // TODO FALLBACK
            alert(this.fallbackText)
        }
    }

    hide() {
        if (this.modalElement) {
            document.body.removeChild(this.modalElement) // this.modalElement.remove()
            document.body.removeChild(this.backdropElement) // this.backdropElement.remove()
            this.modalElement = null
            this.backdropElement = null
        }
    }
}