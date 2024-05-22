import { ConfigType, registerAs } from '@nestjs/config';

import { getEnvNumber, getEnvString } from '@src/utils/env';

export const securityRegToken = 'security';

export const SecurityConfig = registerAs(securityRegToken, () => ({
  casbinModel: getEnvString(
    'CASBIN_MODEL',
    'src/infra/casbin/config/model.conf',
  ),
  jwtSecret: getEnvString('JWT_SECRET', 'JWT_SECRET-soybean-admin-nest!@#123.'),
  jwtExpiresIn: getEnvNumber('JWT_EXPIRE_IN', 60 * 60 * 2),
  refreshJwtSecret: getEnvString(
    'REFRESH_TOKEN_SECRET',
    'REFRESH_TOKEN_SECRET-soybean-admin-nest!@#123.',
  ),
  refreshJwtExpiresIn: getEnvNumber('REFRESH_TOKEN_EXPIRE_IN', 60 * 60 * 12),
}));

export type ISecurityConfig = ConfigType<typeof SecurityConfig>;
