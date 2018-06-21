class Ground {
	public sprite:any

	// X/Y requested by the game
	public x:number = 0
	public y:number = 0

	constructor(game:any, context:any, x:number, y:number) {
		this.x = x
		this.y = y

		// Create an empty sprite as a container
		this.sprite = context.physics.add.staticSprite(x, y, "ground")

		this.sprite.body.allowGravity = false
		this.sprite.setOrigin(0, 0)
	}
}
