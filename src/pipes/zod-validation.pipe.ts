import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodType<T>) {}

  transform(value: T, metadata: ArgumentMetadata) {
    const input = metadata.type === 'body' ? (value ?? {}) : value;
    const parsedValue = this.schema.parse(input);
    return parsedValue;
  }
}
