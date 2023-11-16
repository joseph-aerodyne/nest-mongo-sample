import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class EmiDto{

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example:1000000})
    loan_amount:number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example:5})
    tenure:number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({example:10})
    interest:number

}