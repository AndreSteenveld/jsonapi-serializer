import test from "ava";
import { output_equals, context } from "./_helpers";

import defaults from "../../src/defaults";
import { get_type } from "../../src/process-request";

test( "returns the type from unpacking the url", output_equals, defaults :: get_type, [ null, context ], "type" );