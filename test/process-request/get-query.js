import test from "ava";

import { output_equals, context } from "./_helpers";

import defaults from "../../src/defaults";
import { build_sort, build_fields, build_match, build_limit_and_offset } from "../../src/process-request/get-query";


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


