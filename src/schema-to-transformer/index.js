import $ from "core-js/library";
import create_transformer from "transformalizer";

import Schema from "./schema";

export const path = Object.freeze({

    id : Symbol.for( "/id" )

});

export function schema_to_transformer( options, fortune_schema = this ){

    const transformer = create_transformer( );

    for( const [ name, schema ] of $.Object.entries( fortune_schema ) ){

        transformer.register({
            
            name,
            schema : new Schema( transformer, name, schema, fortune_schema )

        });

    }
     
    return transformer;

}

export default schema_to_transformer;