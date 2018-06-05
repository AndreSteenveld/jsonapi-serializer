import test from "ava";
import { default as default_export, parse_payload } from "../src/parse-payload";

test( "default export is a function", ( assert ) => {

    assert.true( "function" === typeof default_export );

});
