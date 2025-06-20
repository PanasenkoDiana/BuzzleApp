export interface IChangeUserPartOne {
    profileImage?: string
    username?: string
}

export interface IChangeUserPartTwo {
    name: string
    surname: string
    dateOfBirth: DataView
    email: string
    password: string
    repeatPassword: string
}


export type IChangeUser = IChangeUserPartOne & IChangeUserPartTwo