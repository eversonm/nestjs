import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({ example: 'John Smith' })
  name: string;

  @ApiProperty({ example: 'johnsmith@email.com' })
  email: string;

  @ApiProperty({
    example: '123456abc',
    description: 'At least 6 characters',
  })
  password: string;

  @ApiProperty({
    example: '2023-03-03',
    description: 'Birth date',
  })
  birthAt?: Date;

  @ApiProperty({
    example: '2023-03-03',
    description: 'Date creation',
  })
  createdAt?: Date;

  @ApiProperty({
    example: '2023-03-03',
    description: 'A date for the updated version',
  })
  updatedAt?: Date;
}
