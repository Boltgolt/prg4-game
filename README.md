## Speelbare game

De game is [hier](https://boltgolt.nl/thomas/) te vinden.

## Toelichting OOP

#### Classes

Bijna alle code in dit spel staat in losse classes om de code zo geordend mogelijk te maken. Classes geven je ook het voordeel dat je code meerdere keer geinitialized kan worden in losse objecten. Zo stamt elk blokje in de vloer uit dezelfde class.

```typescript
// De class
class Ground {
	// Variable van de class
	public x:number = 0
	public y:number = 0

	// Init function
	constructor(game:any, context:any, x:number, y:number) {
		// Constructor code
	}
}
```

Daarnaast is het mogelijk om private en protected variabelen te gebruiken in een class zodat hier van buitenaf niet mee gerommeld kan worden. Dit zorgd er direct ook voor dat je global namespace niet te vol raakt.

#### Encapsulation

Classes geven nog een extra mogelijkheid om te voorkomen dat iemand rommelt om variable, of om je de ruimte te geven variabelen te verwerken voor de bij de aanvragende partij komen. Dit kan door de reference naar de variabele te vervangen door een getter:

```typescript
class PlayerObject {
	private _x:number = 0
	private _y:number = 0

	get x(): number {
		return this._x;
	}

	get y(): number {
		return this._y;
	}

	// ...
}
```

Op deze manier kan een andere functie of class wel bij het attribuut of de variabele, maar heeft de class zelf er nog wel alle controle over.

#### Composition

Compositie geef een “heef-een” relatie aan. Een parent class “car” weet bijvoorbeeld van een child “wheel”, maar de auto *is* geen wiel (dus geen “is-een” relatie”. Dit kan je in de structuur van Game goed zien:

```typescript
class Game {
	private thomas:Thomas
	private bob:Bob

	// ...
}
```

De children Bob en Thomas worden in het object gereferenced, maar het zijn geen extends.

#### Inheritance

Hier gaat het juist *wel* om een “is-een” relatie. Neem bijvoorbeeld PlayerObject en Bob:

```typescript
class PlayerObject {
	public id:string

	private _x:number = 0
	private _y:number = 0

	// ...

	constructor(context:any, x:number, y:number, id:string) {
		// ...
	}
}

class Thomas extends PlayerObject {
	constructor(context:any, x:number, y:number) {
		// ...
	}
}
```

Bob is een PlayerObject, en andersom. Door een centraal PlayerObject te extenden is het makkelijk om code te hergebruiken voor alle spelers, maar kunnen de losse spelers wel hun eigen stukken code hebben.

## Klassendiagram

NIET VERGETEN

## Peer review

De peer review die Perdo mij gegeven heeft is [hier](https://github.com/Pedro-Bronsveld/programmeren-game) te lezen.

## Extra uitdaging

Ik heb de uitdaging “De game werkt met Canvas in plaats van DOM elementen” gedaan.

-----

# Peer review [Pedro](https://github.com/Pedro-Bronsveld/programmeren-game)

Zeer uitgebreide 3D shooter game die in mijn tests bijzonder stabiel draait en nauwelijks bugs bevat. Er zijn kleine issues (kogels bevriezen even als ze iets raken bijvoorbeeld) maar als je kijkt naar de grootte van de codebase zijn dit echt minor problemen.

De code zelf is goed verzorgd en leesbaar. OOP is uitmuntend toegepast met alle code in classes en al die classes in losse bestanden. Er is eigenlijk weinig op aan te merken.

Als verbeterpunt zou ik je aanraden te kijken naar [JSDoc](http://usejsdoc.org/howto-es2015-classes.html), een standaard voor JavaScript documentatie. Ondanks dat de regels code zelf nu goed te lezen zijn kunnen de comment blocken van JSDoc het werken van de verschillende functies _nog_ beter uitleggen. Ook kan je door deze formatting automatisch documentatie pagina's genereren.
