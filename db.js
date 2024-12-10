const produto = [
    { 
        id: 1,
        nome:"Notebook",
        ref:10
    },
    {
        id: 2,
        nome:"CPU",
        ref:20
    }
];

const mysql = require("mysql2/promise");

const conexao = mysql.createPool(process.env.CONNECTION_STRING);

function listaProduto(){
        return produto;
}


function listaProduto(id){
return produto.find(c => c.id == id);

function insereProduto(produto){
    produto.push(produto);
}

function alteraProduto(id,dadosproduto){
    const produtonovo =  produto.find(c => c.id == id);
   if (produtonovo){
    produtonovo.nome =  dadosproduto.nome;
    produtonovo.ref = dadosproduto.ref;
   } else {
        return("Algo deu errado!");
   }    
}
}

function removeProduto(id){
    const indice = produto.findIndex(c => c.id == id);
    produto.splice(indice,1);
}

module.exports = {
    listaProduto,
    listaProduto,
    insereProduto,
    alteraProduto,
    removeProduto,
}
