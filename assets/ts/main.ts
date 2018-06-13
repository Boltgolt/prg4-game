window.addEventListener("load", () => new Game())

class Game {
	private thomas:Thomas
	private bob:Bob


	private buttonLeft:Boolean = false
	private buttonRight:Boolean = false

	private jumpHeight:number = heightToPixel(7.5)
	private jumpIndex:number = -1

	private active:any
	private activeIndex:number = 0
	private activeArr:Array<any> = []

	constructor() {
		this.thomas = new Thomas(widthToPixel(25) - heightToPixel(2.5))
		this.bob = new Bob(widthToPixel(60) - heightToPixel(5))

		this.active = this.thomas
		this.activeArr.push(this.thomas)

		window.addEventListener("keydown", this.handleKey.bind(this))
		window.addEventListener("keyup", this.handleKey.bind(this))

		this.update()
	}

	private handleKey(event:KeyboardEvent) :void {
		let setTo = event.type == "keydown"

		switch(event.code) {
			case "KeyA": {
				this.buttonLeft = setTo
				break
			}
			case "KeyD": {
				this.buttonRight = setTo
				break
			}
			case "KeyW": {
				if (!setTo) break
				if (this.jumpIndex < 0) this.jumpIndex = 0
				break
			}
			case "Space": {
				if (setTo) break

				if (this.activeIndex + 1 == this.activeArr.length) {
					this.activeIndex = 0
				}
				else {
					this.activeIndex++
				}

				this.active = this.activeArr[this.activeIndex]
				document.getElementById("indicator").className = this.active.id
				break
			}
		}
	}

	private update() :void {
		if (this.buttonLeft)  this.active.x -= this.active.speed
		if (this.buttonRight) this.active.x += this.active.speed

		if (this.activeArr.length == 1 && this.active.x > widthToPixel(10)) {
			this.activeArr.push(this.bob)
			document.getElementById("indicator").children[1].classList.remove("hidden")
		}

		if (this.jumpIndex > -1) {
			this.active.y = Math.pow(this.jumpIndex / 2 - Math.sqrt(this.jumpHeight), 2) * -1 + this.jumpHeight

			this.jumpIndex++

			if (this.active.y <= 0 && this.jumpIndex != 1) {
				this.jumpIndex = -1
				this.active.y = 0
			}
		}

		this.active.update(this.activeArr)

		this.focusCamera()

		requestAnimationFrame(() => this.update())
	}

	private focusCamera() :void {
		window.scrollTo(this.active.x - widthToPixel(50) + heightToPixel(2.5 * this.active.width), 0)
	}
}

function widthToPixel(width:number) :number {
	return window.innerWidth * (width / 100)
}

function heightToPixel(height:number) :number {
	return window.innerHeight * (height / 100)
}
