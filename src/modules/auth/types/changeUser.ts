export interface IChangeUserPartOne {
    profileImage: string
}

export interface IChangeUserPartTwo {
    name: string
    surname: string
    dateOfBirth: DataView
    email: string
    password: string
}


export type IChangeUser = IChangeUserPartOne & IChangeUserPartTwo