import { ApiProperty } from '@nestjs/swagger';

export const ROOT_PID = '0';

export class CreationAuditInfo {
  @ApiProperty({ description: 'Created by user ID' })
  createdBy: string;

  @ApiProperty({
    description: 'Creation timestamp',
    type: 'string',
    format: 'date-time',
  })
  createdAt: Date;
}

export class UpdateAuditInfo extends CreationAuditInfo {
  @ApiProperty({ description: 'Last updated by user ID' })
  updatedBy: string;

  @ApiProperty({
    description: 'Last update timestamp',
    type: 'string',
    format: 'date-time',
  })
  updatedAt: Date;
}
