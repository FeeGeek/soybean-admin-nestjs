import { ConfigType, registerAs } from '@nestjs/config';

import { getEnvBoolean, getEnvNumber, getEnvString } from '@src/utils/env';

export const appConfigToken = 'app';

export const AppConfig = registerAs(appConfigToken, () => ({
  port: getEnvNumber('APP_PORT', 9528),
  docSwaggerEnable: getEnvBoolean('DOC_SWAGGER_ENABLE', true),
  docSwaggerPath: getEnvString('DOC_SWAGGER_PATH', 'doc'),
}));

export type IAppConfig = ConfigType<typeof AppConfig>;
