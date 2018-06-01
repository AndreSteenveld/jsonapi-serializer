import Promise from "bluebird";
import oo_patch from "json8-patch";

import { get } from "../utilities";
import defaults from "./defaults";

export function process_response( serializer, context, request, response ){
    
    return Promise.try( ( ) => {

        const 
            name   = context :: get( this.fortune.context_type, "" ),
            source = context :: get( this.fortune.context_result, [ ] ),
            value  = serializer.transformer.transform({ name, source }), 
            patch  = [{ op : "add", path : this.fortune.context_payload, value }];
        
        return oo_patch.apply( context, patch ).doc;
        
    });
    
}

export default defaults :: process_response;