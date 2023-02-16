import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../enums/role.enum';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  @ApiProperty({
    example: 1,
  })
  id?: number;

  @Column({
    length: 63,
  })
  @ApiProperty({ example: 'John Smith' })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  @ApiProperty({ example: 'johnsmith@email.com' })
  email: string;

  @Column({
    length: 127,
  })
  @ApiProperty({
    example: '123456abc',
    description: 'At least 6 characters',
  })
  password: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  @ApiProperty({
    example: '2023-03-03',
    description: 'Birth date',
  })
  birthAt?: Date;

  @CreateDateColumn()
  @ApiProperty({
    example: '2023-03-03',
    description: 'Date creation',
  })
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2023-03-03',
    description: 'A date for the updated version',
  })
  updatedAt?: Date;

  @Column({
    default: Role.User,
  })
  @ApiProperty({
    example: 1,
    description: 'RDBC',
  })
  role?: number;
}
