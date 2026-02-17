import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationQueryType, PaginationResponseMeta } from 'src/types/util.types';
export declare class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor();
    onModuleInit(): Promise<void>;
    handleQueryPagination(query: PaginationQueryType): {
        skip: number;
        take: number;
        page: number;
    };
    formatPaginationResponse(args: {
        page: number;
        count: number;
        limit: number;
    }): PaginationResponseMeta;
}
