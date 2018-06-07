import $ from "core-js/library";
import { truthy, falsey } from "../utilities";

function is_array_or_string( value = this ){

    return $.Array.isArray( value ) || "string" === typeof value

}

export function relations( schema = this ){ 

    return $.Object
        .entries( schema )
        .filter( ([ , value ]) => value :: is_array_or_string( ) :: truthy( ) );

}

export function attributes( schema = this ){ 

    return $.Object
        .entries( schema )
        .filter( ([ , value ]) => value :: is_array_or_string( ) :: falsey( ) );

}