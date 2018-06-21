// Man, i hate working with Typescript
// References wouldn't compile in typescript so had to use a javascipt minified
let game
// @ts-ignore
window.addEventListener("load", () => window.game = new Game())
// @ts-ignore
let Phaser:any = <any> Phaser

class Game {
	private thomas:Thomas
	private bob:Bob

	private grounds:Array<any> = []

	private isInContact:Boolean = true

	private active:any
	private activeIndex:number = 0
	private activeArr:Array<any> = []

	private instance:any

	constructor() {
		this.instance = new Phaser.Game({
			type: Phaser.AUTO,
			width: 1200,
			height: 900,
			parent: "game",
			disableContextMenu: true,
			transparent: true,
			physics: {
				default: "arcade",
				arcade: {
					gravity: {y: 1600},
					debug: false
					}
				},
			scene: {
				preload: this.preload,
				create: this.create,
				update: this.update
			}
		})

		window.addEventListener("keydown", this.handleKey.bind(this))
		window.addEventListener("keyup", this.handleKey.bind(this))
	}

	private preload(context) :void {
		this.load.image("thomas", "assets/img/thomas.png");
		this.load.image("bob", "assets/img/bob.png");
		this.load.image("ground", "assets/img/ground.png");

	}

	private create(context) :void {
		game.thomas = new Thomas(this, 500, 750)
		game.bob = new Bob(this, 2500, 300)

		game.active = game.thomas
		game.activeArr.push(game.thomas)

		for (let x in level) {
			for (let y in level[x]) {
				if (level[x][y]) {
					let ground = new Ground(game, this, 50 * x, 850 - 50 * y)
					game.grounds.push(ground.sprite)
				}
			}
		}

		const textFormat = {
			fontFamily: "Arial",
			fontSize: 20,
			color: "#4D4D4D"
		}

		this.add.text(445, 405, "Try the A and D keys", textFormat)
		this.add.text(1325, 405, "And maybe W as well", textFormat)
		this.add.text(2320, 405, "Tip: SPACE", textFormat)
		this.add.text(4320, 405, "To be continued..?", textFormat)

		this.cameras.main.startFollow(game.active.sprite)
		this.cameras.main.setBounds(0, 0, Infinity, 900)
	}

	private update(context) :void {
		this.physics.world.collide(game.active.sprite, game.grounds)
		game.isInContact = game.active.sprite.body.touching.down

		this.physics.world.collide(game.thomas.sprite, game.grounds)
		this.physics.world.collide(game.bob.sprite, game.grounds)


		this.physics.world.collide(game.bob.sprite, game.thomas.sprite)

		if (game.active.sprite.body.touching.down) game.isInContact = true

		this.cameras.main.startFollow(game.active.sprite)

		if (game.activeArr.length == 1 && this.cameras.main.scrollX > 1600) {
			game.activeArr.push(game.bob)
			document.getElementById("indicator").children[1].classList.remove("hidden")
		}

		for (let blob of game.activeArr) {
			blob.update()
		}
	}


	private handleKey(event:KeyboardEvent) :void {
		let setTo = event.type == "keydown"

		switch(event.code) {
			case "KeyA": {
				this.active.sprite.body.setVelocity(-200 * (setTo ? 1 : 0), this.active.sprite.body.velocity.y)
				break
			}
			case "KeyD": {
				this.active.sprite.body.setVelocity(200 * (setTo ? 1 : 0), this.active.sprite.body.velocity.y)
				break
			}
			case "KeyW": {
				if (!setTo || !game.isInContact) break

				this.active.sprite.body.setVelocity(this.active.sprite.body.velocity.x, -500)
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
}
