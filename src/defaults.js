
export const fortune = {
    
    uri_template : "{*}/{?}",
    
    context_type    : "/type",
    context_result  : "/result",
    context_payload : "/payload",
    
    context_request     : "/meta/request",
    context_request_url : "/meta/request/url" 
    
};

// export const json_api_reserved_words = {
// 
//     // Top-level description.
//     jsonapi: "jsonapi",
// 
//     // Document structure.
//     primary: "data",
//     attributes: "attributes",
//     relationships: "relationships",
//     type: "type",
//     id: "id",
//     meta: "meta",
//     errors: "errors",
//     included: "included",
// 
//     // Hypertext.
//     links: "links",
//     href: "href",
//     related: "related",
//     self: "self",
// 
//     // Reserved query strings.
//     include: "include",
//     fields: "fields",
//     filter: "filter",
//     sort: "sort",
//     page: "page",
// 
//     // Pagination keys.
//     first: "first",
//     last: "last",
//     prev: "prev",
//     next: "next"
// 
// };

export default {
    
    fortune,
    
    limit : 50

    
};