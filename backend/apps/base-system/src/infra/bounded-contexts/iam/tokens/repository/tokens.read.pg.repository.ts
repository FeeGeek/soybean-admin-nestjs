import { Injectable } from '@nestjs/common';

import { TokensReadModel } from 'apps/base-system/src/lib/bounded-contexts/iam/tokens/domain/tokens.read.model';
import { TokensReadRepoPort } from 'apps/base-system/src/lib/bounded-contexts/iam/tokens/ports/tokens.read.repo-port';

import { PrismaService } from '@lib/shared/prisma/prisma.service';

@Injectable()
export class TokensReadRepository implements TokensReadRepoPort {
  constructor(private prisma: PrismaService) {}

  async findTokensByRefreshToken(
    refreshToken: string,
  ): Promise<TokensReadModel | null> {
    return this.prisma.sysTokens.findFirst({
      where: { refreshToken },
    });
  }
}