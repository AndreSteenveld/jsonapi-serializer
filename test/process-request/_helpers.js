import URI from "urijs";

export function output_equals( assert, value_func, $args, expected ){

    return assert.deepEqual( value_func( ...$args ), expected );

}

export const url = ( new URI( ) )
    .escapeQuerySpace( false )
    .protocol( "http" )
    .host( "example.localhost" )
    .directory( "type" )
    .query({
        
        "sort" : "+accending,neutral,-decending",
        
        "page[limit]"  : 10,
        "page[offset]" : 5,

        "fields": "first,second,third",
        "fields[/nested]": "forth,fith,sixth",

        "filter": "$.value < 10",
        "filter[/nested]": "$.thing == 'string'",
        "filter[/nested/property]" : "$ == ( 10 + 1 )"

    })
    .toString( );

export const context = {
    meta : { 
        
        request : { url } 
    
    }
};