export class Toast {
    constructor(type, text, container) {
        this.type = type
        this.text = text
        this.container = container
    }
    toast() {
        const toast = document.createElement('div');
        let toastClassName = 'toast-'.concat(this.type, " toast");
        console.log(toastClassName)
        toast.className = toastClassName;
        const toastText = document.createElement('div');
        toastText.className = 'toast-text';
        toastText.textContent = this.text;
        toast.appendChild(toastText);

        this.container.appendChild(toast);
        console.log('Child appended')
        console.log(toast)

        setTimeout(() => {
            toast.remove();
        }, 3000)
    }
}