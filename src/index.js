import process_request from "./process-request";
import process_response from "./process-response";
import parse_payload from "./parse-payload";

import transform from "./schema-to-transformer";


export { default as defaults } from "./defaults";

export process_request, process_response, parse_payload;

export default ( Serializer ) => class extends Serializer {
    
    static mediaType = "application/vnd.api+json";
   
    tranformer = null;

    constructor( ...$args ){
        
        super( ...$args );  
        
        this.tranformer = this.schema :: transform({ });
        
    }
    
    processRequest( ...$args ){ return process_request( this, ...$args ); }
    processResponse( ...$args ){ return process_response( this, ...$args ); }
    
    parsePayload( ...$args ){ return parse_payload( this, ...$args ); }
    
}