/**
    @apiDefine NotFoundError

    @apiError NotFound The id of the order was not found.
 
    @apiErrorExample Error-Response:
    HTTP/1.1 404 Not Found
    [
      {
        "message": "Order details not found"
      }
    ]
* */


/**
    @apiDefine InternalServerError

    @apiError InternalServerError server error or validation error.
 
    @apiErrorExample Error-Response:
    HTTP/1.1 500 InternalServerError
    [
      {
        "message": "Something went wrong, please try again"
        "body":""
      }
    ]
* */

/**
    @api {post} /order create order
    @apiVersion 1.0.0
    @apiName createOrder
    @apiGroup orderManagement
    @apiPermission no permission
       
    @apiHeader {String} authorization Bearer + User unique access-key.(ie "Bearer 12345678909876543")
    @apiHeader {String} refreshtoken User refreshtoken.

    @apiParam {String{1...255}} [description]
    @apiParam {String{1...99999}} totalFee
    @apiParam {String{1...255}} userId
    @apiParam {String{1...10}} services[]

    @apiSuccessExample Response
    HTTP/1.1 201 created
    {}
     
    @apiUse InternalServerError
*/

/**
    @api {get} /order/:orderId get order details
    @apiVersion 1.0.0
    @apiName getOrder
    @apiGroup orderManagement
    @apiPermission no permission

    @apiHeader {String} authorization Bearer + User unique access-key.(ie "Bearer 12345678909876543")
    @apiHeader {String} refreshtoken User refreshtoken.

    @apiSuccessExample Response
    HTTP/1.1 200
    {
      description?: string;
      totalFee: number;
      userId: string;
      createdAt: date;
      updatedAt: date;
      services: [
        {
          id: string;
          fee: number;
          name: string;
        }
      ];
    }
     
    @apiUse InternalServerError
    @apiUse NotFoundError
*/

/**
    @api {get} /order get orders details
    @apiVersion 1.0.0
    @apiName getOrders
    @apiGroup orderManagement
    @apiPermission no permission

    @apiHeader {String} authorization Bearer + User unique access-key.(ie "Bearer 12345678909876543")
    @apiHeader {String} refreshtoken User refreshtoken.

    @apiParam {String{1...10000}} [page]
    @apiParam {String{1...10000}} [limit]

    @apiSuccessExample Response
    HTTP/1.1 200
    {
      page:number,
      totalRecords:number,
      order:[
        {
          description?: string;
          totalFee: number;
          userId: string;
          createdAt: date;
          updatedAt: date;
          services: [
            {
              id: string;
              fee: number;
              name: string;
            }
          ];
        }
      ]
    }
     
    @apiUse InternalServerError
    @apiUse NotFoundError
*/

/**
    @api {put} /order update order
    @apiVersion 1.0.0
    @apiName updateOrder
    @apiGroup orderManagement
    @apiPermission no permission
       
    @apiHeader {String} authorization Bearer + User unique access-key.(ie "Bearer 12345678909876543")
    @apiHeader {String} refreshtoken User refreshtoken.

    @apiParam {String{1...255}} id
    @apiParam {String{1...255}} [description]
    @apiParam {String{1...99999}} totalFee
    @apiParam {String{1...255}} userId
    @apiParam {String{1...10}} services[]

    @apiSuccessExample Response
    HTTP/1.1 204 no content
     
    @apiUse InternalServerError
    @apiUse NotFoundError
*/

/**
    @api {delete} /order/:orderId delete order
    @apiVersion 1.0.0
    @apiName updateOrder
    @apiGroup orderManagement
    @apiPermission no permission
       
    @apiHeader {String} authorization Bearer + User unique access-key.(ie "Bearer 12345678909876543")
    @apiHeader {String} refreshtoken User refreshtoken.

    @apiSuccessExample Response
    HTTP/1.1 204 no content
     
    @apiUse InternalServerError
    @apiUse NotFoundError
*/