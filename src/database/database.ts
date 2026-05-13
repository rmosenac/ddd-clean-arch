import { Pool } from "pg";


export const pool = new Pool({
   user: "postgres",
   host: "localhost",
   database: "ddd-clean-arch",
   password: "BemVindo!",
   port: 5432,
});


pool.connect().then( () => {

    console.log('ddd-clean-arch conectado com sucesso!');

}).catch( (error) => {

    console.log('Erro ao conecar o banco ddd-clean-arch');
    console.log(error);
    
});