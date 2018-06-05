import URI from "urijs";
import test from "ava";
import defaults from "../../src/defaults";
import { build_sort, build_fields, build_match, build_limit_and_offset } from "../../src/process-request/get-query";

function output_equals( assert, value_func, $args, expected ){

    return assert.deepEqual( value_func( ...$args ), expected );

}

const url = ( new URI( ) )
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

const context = {
    meta : { 
        
        request : { url } 
    
    }
};

test( `build_sort( ... )`, output_equals, defaults :: build_sort, [ context ], {

    neutral   : true,
    accending : true,
    decending : false 

});

test( `build_fields( ... )`, output_equals, defaults :: build_fields, [ context ], {

    "/first"  : true,
    "/second" : true,
    "/third"  : true,
    
    "/nested/forth" : true,
    "/nested/fith"  : true,
    "/nested/sixth" : true,

});

test( `build_matches( ... )`, output_equals, defaults :: build_match, [ context ], {

    "/"       : "$.value < 10",
    "/nested" : "$.thing == 'string'",
    "/nested/property" : "$ == ( 10 + 1 )" 

});

test( `build_limit_and_offset( ... )`, output_equals, defaults :: build_limit_and_offset, [ context ], {

    limit : 10,
    offset : 5

});


