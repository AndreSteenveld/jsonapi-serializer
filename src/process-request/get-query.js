import $ from "core-js/library";
import URI from "urijs";
import uri_template from "uri-templates";

import { unpack } from ".";
import { get, empty, flatten, to_object } from "../utilities";

export function build_sort( context ){
    
    const { sort = "" } = context
        :: get( this.fortune.context_request_url )
        :: unpack( this.fortune.uri_template );
        
    return sort
        .split( "," )
        .map( ( path ) => {
        
            return ( /([-+])/ ).test( path[ 0 ] ) 
                ? `${ path }`
                : `+${ path }`
        
        })
        .map( ( path ) => [ path.slice( 1 ), "+" === path[ 0 ] ] )
        .reduce( to_object, empty( ) );
        
}

export function build_fields( context ){
    
    const
        regex = ( /^fields(\[(.*)\]){0,1}$/ ), 
        paramaters = context
            :: get( this.fortune.context_request_url )
            :: unpack( this.fortune.uri_template ); 
    
    return $.Object
        .entries( paramaters )
        .filter( ([ key ]) => regex.test( key ) )
        .map( ([ key, fields ]) => {
            
            const [ , , root = "/" ] = regex.exec( key );
            
            return fields
                .split( "," )
                .map( ( field ) => [ `${ root }/${ field }`.replace( /\/{2}/g, "/" ), true ] );
                
        })
        .reduce( flatten, [ ] )
        .reduce( to_object, empty( ) );
    
}

export function build_match( context ){
    
    const 
        regex = ( /^filter(\[(.*)\]){0,1}$/ ),
        paramaters = context
            :: get( this.fortune.context_request_url )
            :: unpack( this.fortune.uri_template );  

    return $.Object
        .entries( paramaters )
        .filter( ([ key ]) => regex.test( key ) )
        .map( ([ key, query ]) => {

            const [ , , root = "/" ] = regex.exec( key );
            
            return [ root, query ]
            
        })
        .reduce( to_object, empty( ) );
    
}

export function build_limit_and_offset( context ){
    
    const 
        paramaters = context
            :: get( this.fortune.context_request_url )
            :: unpack( this.fortune.uri_template ),

        limit  = parseInt( paramaters :: get( "/page[limit]", this.default.limit ), 10 ),
        offset = parseInt( paramaters :: get( "/page[offset]", 0 ), 10 );
    
    return { limit, offset };
    
}

export function get_query( serializer, context ){
    
    const
        sort   = build_sort.call( this, context ),
        fields = build_fields.call( this, context ),
        match  = build_match.call( this, context ),
        
        { limit, offset } = build_limit_and_offset.call( this, context );
        
    return Object.assign(
        
        empty( ),
        
        {
            exists : { },
            range  : { },
            
            and : { },
            or  : { },
            
            query : null,
        },
        
        { sort, fields, match, limit, offset }
        
    );
        
}

export default get_query;