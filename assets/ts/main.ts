class Game {
	public x:number = 0

	constructor() {
		console.log("d")
		this.gameLoop()
	}

	private gameLoop(){
		if (down) {
			var current = parseInt(document.getElementById("thomas").style.left)
			document.getElementById("thomas").style.left = current + 1 + "vh"
		}


		requestAnimationFrame(() => this.gameLoop())
	}
}

window.addEventListener("load", () => new Game())

let down = false
window.addEventListener("keydown", (event) => {
	if (event.key == "d") down = true
})
window.addEventListener("keyup", (event) => {
	if (event.key == "d") down = false
})
