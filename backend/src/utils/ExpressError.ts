class ExpressError extends Error {
	name: string;
	message: string;
	status: number;
	constructor(
		_message: string,
		_status: number = 500,
		_name: string = 'Error'
	) {
		super();
		this.name = _name;
		this.message = _message;
		this.status = _status;
	}
}

export default ExpressError;
