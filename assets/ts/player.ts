class PlayerObject {
	public sprite:any
	public id:string

	// X/Y requested by the game, no collision done
	public x:number = 0
	public y:number = 0

	constructor(context:any, x:number, y:number, id:string) {
		this.sprite = context.physics.add.sprite(x, y, id);

		this.x = x
		this.y = y
		this.id = id
	}

	update(activeArr:Array<any>) {
		if (game.active.id != this.id) {
			this.sprite.setVelocity(0, this.sprite.body.velocity.y)
		}
	}
}

class Thomas extends PlayerObject {
	constructor(context:any, x:number, y:number) {
		super(context, x, y, "thomas")
		this.sprite.setOrigin(0, 0)

	}
}

class Bob extends PlayerObject {
	constructor(context:any, x:number, y:number) {
		super(context, x, y, "bob")

		this.sprite.setOrigin(0.25, 0.25)
	}
}
