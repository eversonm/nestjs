import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entities/user.entity";

export const userEntityList: UserEntity[] = [
    {
        id: 1,
        birthAt: new Date('2000-01-01'),
        email: 'name@email.com',
        name: 'Some User',
        password: '$2b$10$CEqnFesrGtf.7NUeNGD0eu0AoRfWhGP2vHiacxGyV8/3yrr16yzIG',
        role: Role.User,
    },
    {
        id: 2,
        birthAt: new Date('2000-01-01'),
        email: 'name2@email.com',
        name: 'Some User2',
        password: '$2b$10$CEqnFesrGtf.7NUeNGD0eu0AoRfWhGP2vHiacxGyV8/3yrr16yzIG',
        role: Role.Admin,
    },
    {
        id: 3,
        birthAt: new Date('2000-01-01'),
        email: 'name3@email.com',
        name: 'Some User3',
        password: '$2b$10$CEqnFesrGtf.7NUeNGD0eu0AoRfWhGP2vHiacxGyV8/3yrr16yzIG',
        role: Role.Admin,
    },
]