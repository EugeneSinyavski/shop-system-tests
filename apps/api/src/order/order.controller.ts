import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from 'dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Get()
    @ApiOperation({ summary: "Get all orders (Admin PoC)" })
    @ApiResponse({ status: 200, description: "Returns a list of all orders." })
    findAllOrders() {
        return this.orderService.findAllOrders();
    }

    @Post(':userId')
    @ApiOperation({ summary: 'Create a new order for a user' })
    @ApiParam({ name: 'userId', description: 'The ID of the user placing the order' })
    @ApiResponse({ status: 201, description: 'Order created successfully.' })
    @ApiResponse({ status: 404, description: 'User or one of the products not found.' })
    createOrder(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() createOrderDto: CreateOrderDto,
    ) {
        return this.orderService.createOrder(userId, createOrderDto);
    }

    @Get(':userId')
    @ApiOperation({ summary: "Get all orders for a user" })
    @ApiParam({ name: 'userId', description: 'The ID of the user' })
    @ApiResponse({ status: 200, description: "Returns a list of the user's orders." })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findOrdersByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.orderService.findOrdersByUserId(userId);
    }

    @Patch(':orderId/status')
    @ApiOperation({ summary: 'Update an order status (Admin PoC)' })
    @ApiParam({ name: 'orderId', description: 'The ID of the order to update' })
    @ApiResponse({ status: 200, description: 'Order status updated successfully.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    updateOrderStatus(@Param('orderId', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.updateOrderStatus(id, updateOrderDto);
    }
}