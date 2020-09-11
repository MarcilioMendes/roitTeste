import { Injectable } from '@nestjs/common';
import { Pessoa } from './pessoa';
import { Environment, Env } from 'roit-environment';

//const axios = require('axios');
//import { AxiosResponse } from 'axios';
//import axios, { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

@Injectable()
export class PessoasService {

    pessoas: Pessoa[] =[ 
        {id: 1, nome: 'Pessoa 1', idade: 41, githubuser: 'MarcilioMendes', endereco: 'AAA', cep: 40230000, idgit: 111},
        {id: 2, nome: 'Pessoa 2', idade: 30, githubuser: 'JeremiasSilva', endereco: 'BBB', cep: 90130050, idgit: 222},
    ];

    getAll() {
        return this.pessoas;
    }

    getById(id: number){
        return this.pessoas.find( (value) => value.id == id );
    }
    
    async create(pessoa: Pessoa){
        //const retEndereco = await this.retornarEndereco(pessoa.cep)
        //const retIdGit = await this.retornarIdGit(pessoa.githubuser)
        
        let ultimoId = 0;
        if (this.pessoas.length > 0){
            ultimoId = this.pessoas[this.pessoas.length -1].id;
            //throw new Error('erro forcado');
        }
        pessoa.id = ultimoId + 1;
        pessoa.endereco = await this.retornarEndereco(pessoa.cep);
        pessoa.idgit = await this.retornarIdGit(pessoa.githubuser);
        this.pessoas.push(pessoa);
        return pessoa;
    }
    
    async update(pessoa: Pessoa){
        const pessoaArray = this.getById(pessoa.id);
        if (pessoaArray) {
            pessoaArray.nome = pessoa.nome;
            pessoaArray.idade = pessoa.idade;
            pessoaArray.githubuser = pessoa.githubuser;
            pessoaArray.cep = pessoa.cep;

            pessoaArray.endereco = await this.retornarEndereco(pessoa.cep);
            pessoaArray.idgit = await this.retornarIdGit(pessoa.githubuser);
        }

        return pessoaArray;
    }
    
    delete(id: number){
        const index = this.pessoas.findIndex( (value) => value.id == id )
        this.pessoas.splice(index, 1);
    }

    async retornarEndereco(cep) {
        const wscep = Environment.getProperty("wscep");
        const formato = Environment.getProperty("formatoWsCEP");
        const ws = wscep + cep + formato;
        const endereco = await axios.get(ws)
          .then(function (response) {
            return response.data.logradouro + ', ' + response.data.bairro;
          })
          .catch(function (error) {
            return error;
          });
          return endereco;
    }

    async retornarIdGit(githubuser) {
        const wsgit = Environment.getProperty("wsgit")+githubuser;
        const idGit = await axios.get(wsgit)
          .then(function (response) {
            return response.data.items[0].id;
          })
          .catch(function (error) {
            return error;
          });
          return idGit;
    }
}
