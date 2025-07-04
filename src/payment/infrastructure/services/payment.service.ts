import { HttpService } from "../../../shared/services/http-common";
import type { IPaymentIntent } from "../../../public/utils/interfaces/payment-intent";

export class PaymentService extends HttpService {
  public async createPaymentIntent(data: IPaymentIntent): Promise<string> {
    try {
      const response = await this.http.post("payment/payment-intent", data);

      return response.data;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw error;
    }
  }

  public async createPayment(req: any): Promise<string> {
    try {
      const response = await this.http.post("payment", req);

      return response.data;
    } catch (error) {
      console.error("Error creating payment:", error);
      throw error;
    }
  }

  public async confirmPaymentIntent(paymentIntentId: string): Promise<string> {
    try {
      const response = await this.http.post("payment/confirm-payment-intent", {
        paymentIntentId,
      });

      return response.data;
    } catch (error) {
      console.error("Error confirming payment intent:", error);
      throw error;
    }
  }

  public async getAllPayments(): Promise<any> {
    try {
      return await this.http.get("payment/all");1
    } catch (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }
  }

  public async getPaymentByUserId(userId: string): Promise<any> {
    try {
      return await this.http.get(`payment/${userId}`);
    } catch (error) {
      console.error("Error fetching payment by user ID:", error);
      throw error;
    }
  }
}
