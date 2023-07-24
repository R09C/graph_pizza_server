import {
	Controller,
	Get,
	Param,
	Body,
	Post,
	Delete,
	ParseIntPipe,
	HttpException,
	HttpStatus,
	Put,
	UseGuards,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR } from '../common/crud.constants';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dtos/create-cart-item.dto';
import { User } from '../decorators/user.decorator';
import { IUserWithRoles } from '../users/interfaces/user-with-roles.interface';
import { RolesAuthGuard } from '../auth/guards/roles.auth.guard';
import { Roles } from '../role/role.decorator';

@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Roles('USER')
	@UseGuards(RolesAuthGuard)
	@Post('create')
	async createCartItem(@User() user: IUserWithRoles, @Body() createDto: CreateCartItemDto) {
		return this.cartService.createCartItem({ ...createDto, userId: user.id });
	}
}
