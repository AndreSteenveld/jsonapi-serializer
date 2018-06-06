import { to_object, get, property } from "../utilities";

import { path } from ".";
import { attributes, relations } from "./helpers";

import Relationships from "./relationships";

export class Data { 

    relationships = null;
    parent        = null;

    constructor( parent, name, schema, hyper_schema ){ 

        this.parent = parent;
        this.relationships = new Relationships( this, name, schema, hyper_schema );

    }

    dataSchema({ source, options, data }) {
        
        return this.parent.name;

    }

    type({ source, options, data, state }) {
        
        return this.parent.name;

    }

    id({ source, options, data, type, state }) {

        const path = this.parent.schema :: property( path.id, "/id" );

        return data :: get( path, null );

    }

    attributes({ source, options, data, type, id, state }) {

        return this.parent.schema :: attributes( ) 
            .map( ([ key ]) => [ key, data :: property( key ) ] )
            .reduce( to_object, empty( ) );

    }

    links({ source, options, data, type, id, attributes, relationships, state }) {
    
        // Generate self url

        // Generate relation urls

        return Object.assign( empty( ), { self : "#" }, relations );
    
    }
    
    meta({ source, options, data, type, id, attributes, relationships, state }) {
    
        return empty( );

        return { /* resource meta if available */ }
    
    }

    untransformDataSchema({ type, resource, document, options }) {
        
        throw new Error( "Data#untransforDataSchema - not supported" );

    }

    untransformId({ id, type, options }) {
        
        throw new Error( "Data#untransformId - not supported" );

    }

    untransformAttributes({ id, type, attributes, resource, options }) {
       
        throw new Error( "Data#untransformAttributes - not supported" );
       
    }

}

export default Data;