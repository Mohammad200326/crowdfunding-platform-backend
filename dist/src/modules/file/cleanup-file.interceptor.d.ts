import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { FileService } from './file.service';
export declare class FileCleanupInterceptor implements NestInterceptor {
    private fileService;
    constructor(fileService: FileService);
    intercept(ctx: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
