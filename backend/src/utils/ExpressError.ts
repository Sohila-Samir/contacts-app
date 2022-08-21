class ExpressError extends Error {
	message: string;
	status: number;
	name: string;
	constructor(_message: string, _status: number = 500, _name: string = "Error") {
		super();
		this.message = _message;
		this.status = _status;
		this.name = _name;
	}
}

export default ExpressError;
