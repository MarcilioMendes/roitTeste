import { Controller, Param, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { PessoasService } from './shared/pessoas.service';
import { Pessoa } from './shared/pessoa';
import { OkResponse, ErrorResponse } from "@roit/roit-response-handler"

@Controller('pessoas')
export class PessoasController {
    constructor(
        private pessoasService: PessoasService  
    ){}
    
    @Get()  
    async getAll() : Promise<Pessoa[]> {
        return this.pessoasService.getAll();
    }
    
    @Get(':id')  
    async getById(@Param('id') id: number): Promise<Pessoa> {
        return this.pessoasService.getById(id);
    }

    @Post() 
    async create( @Body() pessoa: Pessoa) : Promise<Pessoa> {
        try {
            return this.pessoasService.create(pessoa);
        } catch (error) {
            return error;
        }
    }

    @Put(':id')
    async update( @Param('id') id: number, @Body() pessoa: Pessoa): Promise<Pessoa> {
        pessoa.id = id;
        return this.pessoasService.update(pessoa);
    }

    @Delete(':id')
    async delete( @Param('id') id: number){
        this.pessoasService.delete(id);
    } 
}
