import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),
		PrismaModule,
		UsersModule,
		AuthModule,
		RoleModule,
		IngredientModule,
		CategoryModule,
		ProductsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
