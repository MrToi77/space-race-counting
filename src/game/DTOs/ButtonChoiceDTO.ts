export default class ButtonChoiceDTO {
    public _positionX: number;
    public _positionY: number;
    public _texture: string;
    public _value: number;


	constructor(positionX: number, positionY: number, texture: string, value: number) {
        this._positionX = positionX;
        this._positionY = positionY;
        this._texture = texture;
        this._value = value;
	}

    /**
     * Getter positionX
     * @return {number}
     */
	public get positionX(): number {
		return this._positionX;
	}

    /**
     * Setter positionX
     * @param {number} value
     */
	public set positionX(value: number) {
		this._positionX = value;
	}


    /**
     * Getter positionY
     * @return {number}
     */
	public get positionY(): number {
		return this._positionY;
	}

    /**
     * Setter positionY
     * @param {number} value
     */
	public set positionY(value: number) {
		this._positionY = value;
	}

    /**
     * Getter texture
     * @return {string}
     */
	public get texture(): string {
		return this._texture;
	}

    /**
     * Setter texture
     * @param {string} value
     */
	public set texture(value: string) {
		this._texture = value;
	}

    /**
     * Getter value
     * @return {number}
     */
	public get value(): number {
		return this._value;
	}

    /**
     * Setter value
     * @param {number} value
     */
	public set value(value: number) {
		this._value = value;
	}

}