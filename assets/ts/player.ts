class PlayerObject {
	public sprite:any
	public id:string

	private _x:number = 0
	private _y:number = 0

	get x(): number {
		return this._x;
	}

	get y(): number {
		return this._y;
	}

	constructor(context:any, x:number, y:number, id:string) {
		this.sprite = context.physics.add.sprite(x, y, id);

		this._x = x
		this._y = y
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
