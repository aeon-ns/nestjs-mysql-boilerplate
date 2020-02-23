import { Injectable, Scope, BadRequestException, NotFoundException, UnauthorizedException, ForbiddenException, UnprocessableEntityException, InternalServerErrorException, BadGatewayException, NotAcceptableException, RequestTimeoutException, ConflictException, GoneException, PayloadTooLargeException, UnsupportedMediaTypeException, NotImplementedException, ServiceUnavailableException, GatewayTimeoutException } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class ResponseHelper {
    constructor() {}

    sendSuccessResponse(req: Request, res: Response, message: string = 'Success', data: any) {
        
    }

    sendErrorResponse(code: number, message: string = '') {
        switch(code) {
            case 400:
                throw new BadRequestException(message);
            case 401:
                throw new UnauthorizedException(message)
            case 403:
                throw new ForbiddenException(message);
            case 404:
                throw new NotFoundException(message);
            case 406:
                throw new NotAcceptableException(message);
            case 408:
                throw new RequestTimeoutException(message);
            case 409:
                throw new ConflictException(message);
            case 410:
                throw new GoneException(message);
            case 413:
                throw new PayloadTooLargeException(message);
            case 415:
                throw new UnsupportedMediaTypeException(message);
            case 422:
                throw new UnprocessableEntityException(message);
            case 500:
                throw new InternalServerErrorException(message);
            case 501:
                throw new NotImplementedException(message);
            case 502:
                throw new BadGatewayException(message);
            case 503:
                throw new ServiceUnavailableException(message);
            case 504:
                throw new GatewayTimeoutException(message);
        }
    }
}
