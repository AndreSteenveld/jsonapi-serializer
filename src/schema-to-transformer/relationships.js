import { to_object, empty } from "../utilities";
import { relations } from "./helpers";

export class Relationships {

    static relation = function({ source, options, data, type, id, attributes, state }){

        return this.parent.transformer.transform({ 

            name   : type,
            source : [ data ] 

        })

    };

    // [key]({ source, options, data, type, id, attributes, state }) {
    //     return {
    //         data: {
    //             name: 'related-schema',
    //             data: { /* relationship data to be passed to other schema */ },
    //             included: true,
    //         },
    //         links: { /* relationship links if available */ },
    //         meta: { /* relationship meta if available */ }
    //     }
    // }

    constructor( data, name, schema, hyper_schema ){

        const relationships = schema :: relations( )
            .map( ([ key, value ]) => [ key, Relationships.relation.bind( data ) ] )
            .reduce( to_object, empty( ) );

        Object.assign( this, relationships );

    }

}

export default Relationships;