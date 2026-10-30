# Day 1: Cloud and AWS Basics

## Day 1 PPT

[![AWS for Absolute Beginners](https://img.shields.io/badge/View%20Day%201%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/embed/4x12h6aqhqkch2y)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## Steps to Create an AWS Account

1. **Open the sign-up page.** Go to [AWS Free Tier](https://aws.amazon.com/free) and click **Create an AWS Account**. Log out of any Amazon shopping account first.

2. **Enter your email and account name.** Use an email you check often, because it becomes your root user login. Pick a simple account name, such as `yourname-lab`. Enter the verification code AWS may send to your email.

3. **Create a root password.** Choose a strong password you have not used anywhere else, and save it somewhere safe.

4. **Choose the Free plan.** Select the available free account option rather than upgrading to a paid plan. Check the current Free Tier terms, credits, and usage limits carefully, as eligibility and billing terms may change.

5. **Add contact details.** Choose **Personal** as the account type, then fill in your name, phone number, and address. Use accurate details so verification does not fail.

6. **Add a payment method.** Choose a card, net banking, or UPI.
   - For UPI: choose UPI, enter your UPI ID, click **Verify**, confirm your billing address, then approve the request in your UPI app or scan the QR code if AWS displays one.

7. **Understand and manage UPI AutoPay.**
   - During UPI verification, carefully review the mandate request displayed in your UPI app.
   - Check the maximum permitted amount, validity period, and other terms before approving it.
   - UPI AutoPay may allow AWS to collect eligible charges automatically, depending on the mandate and AWS billing terms.
   - **To cancel the mandate after the course:**
     1. Open the UPI app you used to approve the AWS mandate, such as Google Pay, PhonePe, Paytm, or BHIM.
     2. Go to **Profile / Settings → UPI AutoPay / Mandates / Automatic Payments**. Menu names may vary by app.
     3. Find the active mandate associated with AWS or Amazon Web Services.
     4. Open it and select **Cancel** or **Revoke**.
     5. Complete any authentication required by your UPI app.
     6. Verify that the mandate status shows **Cancelled** or **Revoked**.
   - **Important:** Cancelling a UPI mandate does not close your AWS account or cancel running AWS services. Outstanding charges may still be payable.

8. **Verify your phone.** AWS may send a verification code by text or call. Enter it to continue.

9. **Choose Basic support.** Select the free Basic Support option if available, and finish the sign-up process. Activation can take a few minutes, and you should receive a confirmation email.

10. **Sign in.** Open the AWS Console and check that your account works.

---

## Important Instructions

- **Turn on MFA for the root user** immediately after sign-up. Install an authenticator app on your phone first, such as Google Authenticator or Microsoft Authenticator.
- **Do not use the root account for daily work.** We will learn how to create an IAM user on Day 2.
- **Set a billing alarm or budget** so you can monitor spending. We will do this together in class.
- **Understand Free Tier limits.** Free usage is subject to the current eligibility requirements, service limits, and billing terms. Exceeding applicable limits can result in charges.
- **A payment method may be required for verification.** Prepaid or virtual cards may be rejected.
- **Understand UPI AutoPay before approving it.** Review the mandate amount and terms carefully. Do not assume that choosing a free account automatically prevents all charges.
- **Remove the AWS UPI mandate after the course if you no longer need it.**
  1. After the Day 10 cleanup, open **Billing and Cost Management → Payment preferences**.
  2. If UPI is your default payment method, add and set another valid default payment method first if AWS requires it.
  3. If the AWS console allows it, select the UPI payment method, choose **Delete**, and confirm.
  4. Open your UPI app, find **AutoPay / Mandates**, and verify that the AWS mandate has been cancelled.
  5. If you cannot delete the payment method or cancel the mandate, check AWS billing support and your UPI app's help instructions.
- **Never share your root password, MFA codes, or access keys** with anyone, and never put them in your repository.
- **Turn off or delete resources you do not use.** Day 10 is cleanup day. Verify that no billable resources remain before finishing the course.

---

[Day 2: IAM and EC2 Basics →](./DAY%202.md)
