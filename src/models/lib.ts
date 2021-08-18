type Lib = {
	name: string;
	description: string;
	address: string;
	image: {
		url: string;
	};
	contacts: {
		website: string;
		phones: [
			{
				value: string;
			}
		];
	};
};

export default Lib;
