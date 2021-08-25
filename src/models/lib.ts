type Lib = {
	id: number;
	name: string;
	description: string;
	address: string;
	image: {
		title: string;
		url: string;
	};
	contacts: {
		website: string;
		phones: [
			{
				value: string;
				comment: string;
			}
		];
		email: string;
	};
	locale: {
		name: string;
		timezone: string
	};
};

export default Lib;
