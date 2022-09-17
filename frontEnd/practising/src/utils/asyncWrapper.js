const asyncWrapper = func => {
	return () => {
		func().catch(err => {
			console.log(err);
			return err;
		});
	};
};

export default asyncWrapper;
