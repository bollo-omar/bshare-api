import { CreateUserDto } from '../../domain/models/IUser';

export const createUserValidation = (user: CreateUserDto): string[] => {
    let errors: string[] = [];

    if (!user.firstName) {
        errors.push("firstname is required")
        return errors;
    }
    else if (!user.lastName) {
        errors.push("lastname is required")
        return errors;
    }
    else if (!user.email) {
        errors.push("email is required")
        return errors;
    }
    else if (!user.email.match(/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/)) {
        errors.push("invalid email format");
        return errors;
    }
    else if (!user.password) {
        errors.push("password is required")
        return errors;
    }
    else if (!user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])[a-zA-Z\d!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/]{8,}$/)) {
        errors.push("weak password")
        return errors;
    } else {
        return errors;
    }
}

export const loginValidation = (payload: Partial<CreateUserDto>): string[] => {
    let errors: string[] = [];

    if (!payload.email) {
        errors.push("email is required");
        return errors;
    }
    if (!payload.email.match(/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/)) {
        errors.push("invalid email format");
    }
    if (!payload.password) {
        errors.push("password is required");
    }
    return errors;
}