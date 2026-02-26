import ImageKit from '@imagekit/nodejs';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/types/declartion-mergin';
export declare const imageKitToken = "ImageKitProvider";
export declare const ImageKitProvider: {
    provide: string;
    useFactory: (configService: ConfigService<EnvVariables>) => ImageKit;
    inject: (typeof ConfigService)[];
};
