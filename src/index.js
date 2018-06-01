import transformalizer from "transformalizer";

import process_request from "./process-request";
import process_response from "./process-response";
import parse_payload from "./parse-payload";

export { default as defaults } from "./defaults";

export process_request, process_response, parse_payload;

export default ( Serializer ) => class extends Serializer {
    
    static mediaType = "application/vnd.api+json";
    
    constructor( ...$args ){
        
        super( ...$args );  
        
        
        
    }
    
    processRequest( ...$args ){ return process_request( this, ...$args ); }
    processResponse( ...$args ){ return process_response( this, ...$args ); }
    
    parsePayload( ...$args ){ return parse_payload( this, ...$args ); }
    
}