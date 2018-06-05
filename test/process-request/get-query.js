import URI from "urijs";
import test from "ava";
import defaults from "../../src/defaults";
import { build_sort, build_fields, build_matches, build_limit_and_offset } from "../../src/process-request/get-query";

function output_equals( assert, value_func, $args, expected ){

    return assert.deepEqual( value_func( ...$args ), expected );

}

const context = {
    meta : { 
        
        request : { 
            
            url : ( new URI( ) )
                .protocol( "http" )
                .host( "example.localhost" )
                .directory( "type" )
                .query({
                    sort : "+accending,neutral,-decending"


                })
                .toString( )
        } 
    
    }
};

test( "build_sort", output_equals, defaults :: build_sort, [ context ], {

    neutral   : true,
    accending : true,
    decending : false 

});
