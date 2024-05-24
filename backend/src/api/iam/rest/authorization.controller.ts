import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AssignPermissionDto } from '@src/api/iam/dto/assign-permission.dto';
import { CacheConstant } from '@src/constants/cache.constant';
import { AuthorizationService } from '@src/lib/bounded-contexts/iam/authentication/application/service/authorization.service';
import { RoleAssignPermissionCommand } from '@src/lib/bounded-contexts/iam/authentication/commands/role-assign-permission.command';
import { MenuService } from '@src/lib/bounded-contexts/iam/menu/application/service/menu.service';
import { RedisUtility } from '@src/shared/redis/services/redis.util';

@ApiTags('Authorization - Module')
@Controller('authorization')
export class AuthorizationController {
  constructor(
    private authorizationService: AuthorizationService,
    private menuService: MenuService,
  ) {}

  @Post('assign-permission')
  @ApiOperation({
    summary: 'Assign Permissions to Role',
    description:
      'Assigns a set of permissions to a specified role within a domain.',
  })
  async assignPermission(@Body() dto: AssignPermissionDto) {
    await this.authorizationService.assignPermission(
      new RoleAssignPermissionCommand(dto.domain, dto.roleId, dto.permissions),
    );
  }

  @Get('getUserRoutes')
  @ApiOperation({
    summary: 'Get user routes',
    description:
      'Retrieve user-specific routes based on their roles and domain.',
  })
  async getUserRoutes(@Request() req: any) {
    const user: IAuthentication = req.user;
    const userRoleCode = await RedisUtility.instance.smembers(
      `${CacheConstant.AUTH_TOKEN_PREFIX}${user.uid}`,
    );
    if (!userRoleCode || userRoleCode.length === 0) {
      throw new HttpException(
        'No roles found for the user',
        HttpStatus.NOT_FOUND,
      );
    }
    return this.menuService.getUserRoutes(userRoleCode, user.domain);
  }
}
