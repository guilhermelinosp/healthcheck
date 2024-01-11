import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AppService } from './app.service';

class HealthCheckResponse {
  @ApiProperty({ type: String })
  status: string;
}

@Controller()
@ApiTags('Health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check' })
  @ApiResponse({
    status: 200,
    description: 'Health check successful',
    type: HealthCheckResponse,
  })
  getHealth(): { status: string } {
    return this.appService.getHealth();
  }
}
