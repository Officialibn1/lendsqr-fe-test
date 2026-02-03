export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	orgName: string;
	sector: string;
	phoneNumber: string;
	email: string;
	status: "Active" | "Inactive" | "Pending" | "Blacklisted";
	accountBalance: number;
	accountNumber: string;
	createdAt: string;
	lastActiveDate: string;
	profile: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		avatar: string;
		gender: string;
		bvn: string;
		address: string;
		currency: string;
		maritalStatus: string;
		children: string;
		typeOfResidence: string;
	};
	education: {
		level: string;
		employmentStatus: string;
		sector: string;
		duration: string;
		officeEmail: string;
		monthlyIncome: number[];
		loanRepayment: number;
	};
	socials: {
		facebook: string;
		instagram: string;
		twitter: string;
	};
	guarantor: {
		firstName: string;
		lastName: string;
		phoneNumber: string;
		gender: string;
		address: string;
		relationship: string;
	};
}
