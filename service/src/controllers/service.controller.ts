import { Request, Response } from 'express';
import { apiSuccess } from '../api/success.api';
import CustomError from '../errors/custom.error';
import { cartController } from './cart.controller';
import { createApiRoot } from '../client/create.client';

/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  // Deserialize the action and resource from the body
  const { cartid } = request.body;

  if (!cartid) {
    throw new CustomError(400, 'Bad request - Missing body parameters.');
  }


  if (cartid) {
   const cart =  await createApiRoot()
      .carts()
      .withId({ ID: cartid })
      .get()
      .execute();

      const skus = cart.body.lineItems.map((item: any) => item.variant.sku);

      // Log the SKUs
      console.log(skus);
  
      // Send the SKUs as the response
      response.json({ skus });
    // Work with the product
  }




  // Identify the type of resource in order to redirect
  // to the correct controller
  // switch (resource.typeId) {
  //   case 'cart':
  //     try {
  //       const data = await cartController(action, resource);

  //       if (data && data.statusCode === 200) {
  //         apiSuccess(200, data.actions, response);
  //         return;
  //       }

  //       throw new CustomError(
  //         data ? data.statusCode : 400,
  //         JSON.stringify(data)
  //       );
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         throw new CustomError(500, error.message);
  //       }
  //     }

  //     break;
  //   case 'payment':
  //     break;

  //   case 'order':
  //     break;

  //   default:
  //     throw new CustomError(
  //       500,
  //       `Internal Server Error - Resource not recognized. Allowed values are 'cart', 'payments' or 'orders'.`
  //     );
 // }
};
