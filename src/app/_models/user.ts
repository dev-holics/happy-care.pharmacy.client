export class User {
	id: number = 0;
	username: string = '';
	email: string = '';
}
export class UserToken {
	phoneNumber: string = '';
	accessToken: string = '';
}
export class UserRegister {
	phoneNumber: string = '';
	password: string = '';
	confirmPassword: string = '';
}
export class UserLogin {
	phoneNumber: string = '';
	password: string = '';
	rememberMe: boolean = false;
}

export interface UserSignUp {
	phoneNumber: string;
	password: string;
	fullname: string;
	email: string;
}
