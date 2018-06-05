import Promise from "bluebird";
import uri_template from "urijs";

import defaults from "../defaults";
import get_query from "./get-query";

export { get_query } from "./get-query";

export function get_type( serializer, context ){

    const { type = null } = uri_template( this.fortune.uri_template ).fromUri( context.meta.request.url );
    
    return type;
    
}

export function get_ids( serializer, context ){
    
    return null;
    
}

export function get_meta( serializer, context ){
    
    return Object.create( null );
    
}

export function process_request( serializer, context, request, response ){

    // validate the request

    // parse the request (convert to, relevant arguments )
    Promise
        .all([
        
            /* type  */ get_type.call( this, serializer, context ),
            /* ids   */ get_ids.call( this, serializer, context ),
            /* query */ get_query.call( this, serializer, context ),
            /* meta  */ get_meta.call( this, serializer, context ),
            
        ])
        .then( ( $args ) => serializer.adapter.find( ...$args ) )
        .then( ( records ) => {
            
            return oo_patch.apply( context, [{ op: "add", path: this.fortune.context_result_path, value }] ).doc;
            
        });
    
}

export default defaults :: process_request;