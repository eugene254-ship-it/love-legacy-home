import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { Resend } from "https://esm.sh/resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Atlas Sanctum <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });
    if (error) {
      logStep("Email send error", error);
      return false;
    }
    logStep("Email sent successfully", { to, subject, id: data?.id });
    return true;
  } catch (err) {
    logStep("Email send exception", err);
    return false;
  }
};

const getSuccessPaymentEmail = (customerEmail: string) => ({
  subject: "Welcome to Atlas Sanctum - Subscription Activated! 🎉",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="color: #1a1a2e; margin-bottom: 24px;">Welcome to Atlas Sanctum!</h1>
      <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
        Your subscription has been successfully activated. You now have full access to all the features of your plan.
      </p>
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 24px; margin: 32px 0;">
        <p style="color: white; font-size: 18px; margin: 0;">
          Start building your family's legacy today!
        </p>
      </div>
      <p style="color: #4a4a68; font-size: 14px;">
        If you have any questions, our support team is here to help.
      </p>
      <p style="color: #888; font-size: 12px; margin-top: 32px;">
        — The Atlas Sanctum Team
      </p>
    </div>
  `,
});

const getCancellationEmail = (customerEmail: string) => ({
  subject: "Your Atlas Sanctum Subscription Has Been Cancelled",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="color: #1a1a2e; margin-bottom: 24px;">We're Sorry to See You Go</h1>
      <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
        Your Atlas Sanctum subscription has been cancelled. You'll continue to have access until the end of your current billing period.
      </p>
      <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
        We'd love to have you back anytime. Your data will be safely stored should you decide to return.
      </p>
      <div style="background: #f5f5f7; border-radius: 12px; padding: 24px; margin: 32px 0;">
        <p style="color: #4a4a68; font-size: 14px; margin: 0;">
          Changed your mind? You can resubscribe at any time from your dashboard.
        </p>
      </div>
      <p style="color: #888; font-size: 12px; margin-top: 32px;">
        — The Atlas Sanctum Team
      </p>
    </div>
  `,
});

const getRenewalEmail = (customerEmail: string, amount: number, currency: string) => ({
  subject: "Your Atlas Sanctum Subscription Has Been Renewed",
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
      <h1 style="color: #1a1a2e; margin-bottom: 24px;">Subscription Renewed Successfully</h1>
      <p style="color: #4a4a68; font-size: 16px; line-height: 1.6;">
        Your Atlas Sanctum subscription has been automatically renewed. Thank you for continuing your journey with us!
      </p>
      <div style="background: #f5f5f7; border-radius: 12px; padding: 24px; margin: 32px 0;">
        <p style="color: #4a4a68; font-size: 14px; margin: 0;">
          Amount charged: <strong>${(amount / 100).toFixed(2)} ${currency.toUpperCase()}</strong>
        </p>
      </div>
      <p style="color: #4a4a68; font-size: 14px;">
        You can manage your subscription anytime from your dashboard.
      </p>
      <p style="color: #888; font-size: 12px; margin-top: 32px;">
        — The Atlas Sanctum Team
      </p>
    </div>
  `,
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    
    if (!signature) {
      logStep("No signature found, processing without verification");
    }

    const event = JSON.parse(body) as Stripe.Event;
    logStep("Event type", { type: event.type });

    let customerEmail: string | null = null;

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        customerEmail = session.customer_email || null;
        
        if (!customerEmail && session.customer) {
          const customer = await stripe.customers.retrieve(session.customer as string);
          if (customer && !customer.deleted) {
            customerEmail = customer.email;
          }
        }
        
        if (customerEmail) {
          const emailContent = getSuccessPaymentEmail(customerEmail);
          await sendEmail(customerEmail, emailContent.subject, emailContent.html);
        }
        logStep("Checkout session completed", { customerEmail });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        
        if (customer && !customer.deleted) {
          customerEmail = customer.email;
          if (customerEmail) {
            const emailContent = getCancellationEmail(customerEmail);
            await sendEmail(customerEmail, emailContent.subject, emailContent.html);
          }
        }
        logStep("Subscription cancelled", { customerEmail });
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        
        // Only send renewal email for recurring payments (not the first payment)
        if (invoice.billing_reason === "subscription_cycle") {
          const customer = await stripe.customers.retrieve(invoice.customer as string);
          
          if (customer && !customer.deleted) {
            customerEmail = customer.email;
            if (customerEmail) {
              const emailContent = getRenewalEmail(
                customerEmail,
                invoice.amount_paid,
                invoice.currency
              );
              await sendEmail(customerEmail, emailContent.subject, emailContent.html);
            }
          }
          logStep("Subscription renewed", { customerEmail, amount: invoice.amount_paid });
        }
        break;
      }

      default:
        logStep("Unhandled event type", { type: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in stripe-webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
