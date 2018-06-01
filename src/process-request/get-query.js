import $ from "core-js/library";
import uri_template from "urijs";

import { get, empty, flatten, to_object } from "../utilities";

function build_sort( serializer, context ){
    
    const { sort = "" } = uri_template( this.fortune.uri_template ).fromUri( context :: get( this.fortune.context_request_url ) );
    
    return sort
        .split( "," )
        .map( ( path ) => {
            
            return "-" === path[ 0 ]
                ? [ path.slice( 1 ), false ]
                : [ path.slice( 0 ), true ];
            
        });
        
}

function build_fields( serializer, context ){
    
    const paramaters = uri_template( this.fortune.uri_template ).fromUri( context :: get( this.fortune.context_request_url ) );
    
    return $.Object
        .entries( paramaters )
        .filter( ([ key ]) => key.startsWith( "fields" ) )
        .map( ([ key, fields ]) => {
            
            const [ , root = "/" ] = ( /^fields\[(.*)\]$/ ).exec( key );
            
            return fields
                .split( "," )
                .map( ( field ) => [ `${ root }/${ field }`, true ] );
                
        })
        .reduce( flatten, [ ] )
        .reduce( to_object, empty( ) );
    
}

function build_match( serializer, context ){
    
    const paramaters = uri_template( this.fortune.uri_template ).fromUri( context :: get( this.fortune.context_request_url ) );
    
    return $.Object
        .entries( paramaters )
        .filter( ([ key ]) => key.startsWith( "filter" ) )
        .map( ([ key, query ]) => {
            
            const [ , root = "/" ] = ( /^filter\[(.*)\]$/ ).exec( key )
            
            return [ root, query ]
            
        })
        .reduce( to_object, empty( ) );
    
}

function build_limit_and_offset( serializer, context ){
    
    const 
        paramaters = uri_template( this.fortune.uri_template ).fromUri( context :: get( this.fortune.context_request_url ) ),
        
        limit  = paramaters :: get( "/page[limit]", this.default.limit ),
        offset = paramaters :: get( "/page[offset]", 0 );
    
    return { limit, offset };
    
}

export function get_query( serializer, context ){
    
    const
        sort   = build_sort.call( this, serializer, context ),
        fields = build_fields.call( this, serializer, context ),
        match  = build_match.call( this, serializer, context ),
        
        { limit, offset } = build_limit_and_offset.call( this, serializer, context );
        
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