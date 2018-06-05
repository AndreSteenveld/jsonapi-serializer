import test from "ava";
import defaults from "../../src/defaults"; 
import { get_query, get_type, get_ids, get_meta, process_request } from "../../src/process-request";

function is_function( assert, v ){ return assert.true( "function" === typeof v ); }

test( "get_query is a function", is_function, get_query );
test( "get_type is a function", is_function, get_type );
test( "get_ids is a function", is_function, get_ids );
test( "get_meta is a function", is_function, get_meta );
test( "process_request is a function", is_function, process_request );

