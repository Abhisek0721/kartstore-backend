export class SignupDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
}


export class LoginDto {
    readonly email: string;
    readonly password: string;
}
