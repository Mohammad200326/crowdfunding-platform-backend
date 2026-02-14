import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodType } from 'zod';
export declare class ZodValidationPipe<T> implements PipeTransform {
    private schema;
    constructor(schema: ZodType<T>);
    transform(value: T, metadata: ArgumentMetadata): T;
}
