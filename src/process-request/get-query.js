import $ from "core-js/library";
import URI from "urijs";
import uri_template from "uri-templates";

import { get, empty, flatten, to_object } from "../utilities";

function expand_url( url, template = this ){

    const uri = new URI( url );

    return uri_template( template ).fromUri( `${ uri.path( ) }/${ uri.search( ) }` );

}

export function build_sort( context ){
    
    const { sort = "" } = this.fortune.uri_template :: expand_url( context :: get( this.fortune.context_request_url ) ); 
    
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
        regex = ( /^fields\[.*\]$/ ), 
        paramaters = this.fortune.uri_template :: expand_url( context :: get( this.fortune.context_request_url ) );
    
    return $.Object
        .entries( paramaters )
        .filter( ([ key ]) => regex.test( key ) )
        .map( ([ key, fields ]) => {
            
            const [ , root = "/" ] = regex.exec( key );
            
            return fields
                .split( "," )
                .map( ( field ) => [ `${ root }/${ field }`, true ] );
                
        })
        .reduce( flatten, [ ] )
        .reduce( to_object, empty( ) );
    
}

export function build_match( context ){
    
    const 
        regex = ( /^filter\[(.*)\]/ ),    
        paramaters = this.fortune.uri_template :: expand_url( context :: get( this.fortune.context_request_url ) );
    
    return $.Object
        .entries( paramaters )
        .filter( ([ key ]) => regex.test( key ) )
        .map( ([ key, query ]) => {
            
            const [ , root = "/" ] = regex.exec( key )
            
            return [ root, query ]
            
        })
        .reduce( to_object, empty( ) );
    
}

export function build_limit_and_offset( context ){
    
    const 
        paramaters = this.fortune.uri_template :: expand_url( context :: get( this.fortune.context_request_url ) ),
        
        limit  = paramaters :: get( "/page[limit]", this.default.limit ),
        offset = paramaters :: get( "/page[offset]", 0 );
    
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