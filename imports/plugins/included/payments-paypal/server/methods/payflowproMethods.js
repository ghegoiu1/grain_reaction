import { PayflowproApi } from "./payflowproApi";
import { Logger } from "/server/api";
import { PaymentMethod } from "/lib/collections/schemas";
import { check } from "meteor/check";
import { PayPal } from "../../lib/api"; // PayPal is the reaction api


/**
 * payflowpro/payment/submit
 * Create and Submit a PayPal PayFlow transaction
 * @param  {Object} transactionType transactionType
 * @param  {Object} cardData cardData object
 * @param  {Object} paymentData paymentData object
 * @return {Object} results from PayPal payment create
 */
export function paymentSubmit(transactionType, cardData, paymentData) {
  check(transactionType, String);
  check(cardData, Object);
  check(paymentData, Object);

  const paymentSubmitDetails = {
    transactionType: transactionType,
    cardData: cardData,
    paymentData: paymentData
  };

  let result;

  try {
    const refundResult = PayflowproApi.apiCall.paymentSubmit(paymentSubmitDetails);
    Logger.debug(refundResult);
    result = refundResult;
  } catch (error) {
    Logger.error(error);
    result = {
      saved: false,
      error: `Cannot Submit Payment: ${error.message}`
    };
    Logger.fatal("PayPal PayFlow call failed, payment was not submitted");
  }

  return result;
}


/**
 * payflowpro/payment/capture
 * Capture an authorized PayPal PayFlow transaction
 * @param  {Object} paymentMethod A PaymentMethod object
 * @return {Object} results from PayPal normalized
 */
export function paymentCapture(paymentMethod) {
  check(paymentMethod, PaymentMethod);

  const paymentCaptureDetails = {
    authorizationId: paymentMethod.metadata.authorizationId,
    amount: paymentMethod.amount
  };

  let result;

  try {
    const refundResult = PayflowproApi.apiCall.captureCharge(paymentCaptureDetails);
    Logger.debug(refundResult);
    result = refundResult;
  } catch (error) {
    Logger.error(error);
    result = {
      saved: false,
      error: `Cannot Capture Payment: ${error.message}`
    };
    Logger.fatal("PayPal PayFlow call failed, payment was not captured");
  }

  return result;
}


/**
 * createRefund
 * Refund PayPal PayFlow payment
 * @param {Object} paymentMethod - Object containing everything aboutUs the transaction to be settled
 * @param {Number} amount - Amount to be refunded if not the entire amount
 * @return {Object} results - Object containing the results of the transaction
 */
export function createRefund(paymentMethod, amount) {
  check(paymentMethod, PaymentMethod);
  check(amount, Number);

  const refundDetails = {
    captureId: paymentMethod.metadata.captureId,
    amount: amount
  };

  let result;

  try {
    const refundResult = PayflowproApi.apiCall.createRefund(refundDetails);
    Logger.debug(refundResult);
    result = refundResult;
  } catch (error) {
    Logger.error(error);
    result = {
      saved: false,
      error: `Cannot issue refund: ${error.message}`
    };
    Logger.fatal("PayPal PayFlow call failed, refund was not issued");
  }

  return result;
}


/**
 * listRefunds
 * List all refunds for a PayPal PayFlow transaction
 * https://developers.braintreepayments.com/reference/request/transaction/find/node
 * @param {Object} paymentMethod - Object containing everything aboutUs the transaction to be settled
 * @return {Array} results - An array of refund objects for display in admin
 */
export function listRefunds(paymentMethod) {
  check(paymentMethod, PaymentMethod);

  const refundListDetails = {
    transactionId: paymentMethod.metadata.transactionId
  };

  let result;

  try {
    const refundResult = PayflowproApi.apiCall.listRefunds(refundListDetails);
    Logger.debug(refundResult);
    result = refundResult;
  } catch (error) {
    Logger.error(error);
    result = {
      saved: false,
      error: `Cannot issue refund: ${error.message}`
    };
    Logger.fatal("PayPal PayFlow call failed, refund was not issued");
  }

  return result;
}


export function getSettings() {
  const settings = PayPal.payflowAccountOptions();
  const payflowSettings = {
    mode: settings.mode,
    enabled: settings.enabled
  };
  return payflowSettings;
}
