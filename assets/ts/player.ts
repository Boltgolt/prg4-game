class PlayerObject {
    private DOMNode:HTMLElement

    public x:number
    public y:number
    public speed:number = 5

    constructor(x:number, id:string) {
        this.x = x
        this.DOMNode = document.getElementById(id)

        document.getElementById(id).style.left = x + "px"
	}

    update() {
        this.DOMNode.style.left = this.x + "px"

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
