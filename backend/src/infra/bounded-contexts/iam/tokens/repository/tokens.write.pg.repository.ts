import { Injectable } from '@nestjs/common';

import { TokensEntity } from '@src/lib/bounded-contexts/iam/tokens/domain/tokens.entity';
import { TokensWriteRepoPort } from '@src/lib/bounded-contexts/iam/tokens/ports/tokens.write.repo-port';
import { PrismaService } from '@src/shared/prisma/prisma.service';

@Injectable()
export class TokensWriteRepository implements TokensWriteRepoPort {
  constructor(private prisma: PrismaService) {}

  async save(tokens: TokensEntity): Promise<void> {
    await this.prisma.sysTokens.create({
      data: tokens,
    });
  }

  async updateTokensStatus(
    refreshToken: string,
    status: string,
  ): Promise<void> {
    await this.prisma.sysTokens.update({
      where: {
        refreshToken: refreshToken,
      },
      data: {
        status: status,
      },
    });
  }
}