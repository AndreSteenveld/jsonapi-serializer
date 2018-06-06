import Data from "./data";

export class Schema {

    data = null;
    
    name         = "";
    schema       = null;
    hyper_schema = null;
    
    transformer  = null;

    constructor( transformer, name, schema, hyper_schema ){ 

        Object.assign( this, { transformer, name, schema, hyper_schema });

        this.data = new Data( this, name, schema, hyper_schema );

    }
    
    links({ source, options, data, included }) {

        return Object.assign( empty( ), { self : "#" } );
    
    }
    
    meta({ source, options, data, included }) {

        return { /* top level meta */ };
    
    }

}

export default Schema;