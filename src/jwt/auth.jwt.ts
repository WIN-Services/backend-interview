/* eslint-disable prettier/prettier */
import { ConfigModule } from '@nestjs/config';
import { Configs } from 'src/config/config';

export const jwtFactory = {
  imports: [ConfigModule],
  useFactory: async () => ({
    secret: Configs().jwt.key,
    signOptions: {
      expiresIn: Configs().jwt.expires_in,
    },
  }),
};
