class PlayerObject {
	public DOMNode:HTMLElement
	public id:string

	// X/Y requested by the game, no collision done
	public x:number = 0
	public y:number = 0
	// X/Y we're currently at
	public curX:number = 0
	public curY:number = 0
	// The speed at wich we move
	public speed:number = 5

	constructor(x:number, id:string) {
		this.x = x
		this.curX = x
		this.id = id
		this.DOMNode = document.getElementById(id)

		document.getElementById(id).style.left = x + "px"
	}

	update(activeArr:Array<any>) {
		// Get our own bounds
		// Should be type any because of linter error
		let thisRect:any = this.DOMNode.getBoundingClientRect()
		thisRect.x += window.scrollX
		thisRect.y = window.innerHeight - thisRect.y

		for (let frgn of activeArr) {
			if (frgn.id == this.id) continue
			let frgnRect:any = frgn.DOMNode.getBoundingClientRect()
			frgnRect.x += window.scrollX
			frgnRect.y = window.innerHeight - frgnRect.y

			// Right side
			if (thisRect.x < frgnRect.x + frgnRect.width &&
				thisRect.x > frgnRect.x + frgnRect.width / 2 &&
				thisRect.y < frgnRect.y + frgnRect.height) {

				this.x = frgnRect.x + frgnRect.width
			}

			// Left side
			if (frgnRect.x < thisRect.x + thisRect.width &&
				frgnRect.x > thisRect.x + thisRect.width / 2 &&
				thisRect.y < frgnRect.y + frgnRect.height) {

				this.x = frgnRect.x - thisRect.width
			}

			console.log(thisRect.y, frgnRect.y, frgnRect.height)
			console.log(thisRect.y - frgnRect.height> frgnRect.y + frgnRect.height)

			if (thisRect.y - frgnRect.height > frgnRect.y + frgnRect.height &&
				frgnRect.x < thisRect.x + thisRect.width &&
				thisRect.x < frgnRect.x + frgnRect.width) {

				this.y = frgnRect.y
			}
		}


		// console.log(myRect)
		this.DOMNode.style.left = this.x + "px"
		// console.log(this.y + "px")
		this.DOMNode.style.bottom = this.y + "px"

	}
}

class Thomas extends PlayerObject {
	public height:number = 1
	public width:number = 1

	constructor(x:number) {
		super(x, "thomas")
	}
}

class Bob extends PlayerObject {
	public height:number = 2
	public width:number = 2

	constructor(x:number) {
		super(x, "bob")
	}
}
