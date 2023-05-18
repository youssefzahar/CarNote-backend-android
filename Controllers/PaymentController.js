
import fetch from "cross-fetch";
const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '1';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '2';
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '3';

export async function Pay(req , res){
    // console.log(req.body.first_name);
    const body = {receiverWalletId: "6398f7a008ec811bcda49054",amount : req.body.prix,token : "TND",type : "immediate",
        description: "payment description",
        lifespan: 10,
        feesIncluded: true,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        phoneNumber: "22777777",
        email: req.body.email,
        orderId: "1234657",
        webhook: "http://197.134.249.98:9090/payment/webhook",
        silentWebhook: true,
        successUrl: "https://dev.konnect.network/gateway/payment-success",
        failUrl: "https://dev.konnect.network/gateway/payment-failure",
        checkoutForm: true,
        acceptedPaymentMethods: [
            "wallet",
            "bank_card",
            "e-DINAR"
        ]  };

    const response = await fetch('https://api.preprod.konnect.network/api/v2/payments/init-payment', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json','x-api-key': '6398f7a008ec811bcda49053:9v1o3O7FjyG1KbjfVFw0D'}
    });
    const data = await response.json();
    console.log(data);
    res.status(200).json({message : "payment avec succeés",data});

}

export async function webhook(req, res){
    const { headers, method, url } = req;
    console.log(currentDomain);
    res.status(200).json({message : "payment avec succeés"});
}