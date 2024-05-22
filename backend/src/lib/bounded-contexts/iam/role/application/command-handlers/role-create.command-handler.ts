import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Status } from '@prisma/client';

import { ROOT_PID } from '@src/shared/prisma/db.constant';
import { UlidGenerator } from '@src/utils/id.util';

import { RoleCreateCommand } from '../../commands/role-create.command';
import { RoleWriteRepoPortToken, RoleReadRepoPortToken } from '../../constants';
import { Role } from '../../domain/role.model';
import { RoleProperties } from '../../domain/role.read-model';
import { RoleReadRepoPort } from '../../ports/role.read.repo-port';
import { RoleWriteRepoPort } from '../../ports/role.write.repo-port';

@CommandHandler(RoleCreateCommand)
export class RoleCreateHandler
  implements ICommandHandler<RoleCreateCommand, void>
{
  @Inject(RoleWriteRepoPortToken)
  private readonly roleWriteRepository: RoleWriteRepoPort;
  @Inject(RoleReadRepoPortToken)
  private readonly roleReadRepoPort: RoleReadRepoPort;

  async execute(command: RoleCreateCommand) {
    const existingRole = await this.roleReadRepoPort.getRoleByCode(
      command.code,
    );

    if (existingRole) {
      throw new BadRequestException(
        `A role with code ${command.code} already exists.`,
      );
    }

    if (command.pid !== ROOT_PID) {
      const parentRole = await this.roleReadRepoPort.getRoleById(command.pid);

      if (!parentRole) {
        throw new BadRequestException(
          `Parent role with code ${command.pid} does not exist.`,
        );
      }
    }

    const newRoleProperties: RoleProperties = {
      id: UlidGenerator.generate(),
      code: command.code,
      name: command.name,
      pid: command.pid,
      status: Status.ENABLED,
      description: command.description,
      createdAt: new Date(),
      createdBy: command.createdBy,
    };

    const role = new Role(newRoleProperties);
    await this.roleWriteRepository.save(role);
  }
}
