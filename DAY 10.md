# Day 10: Show, Clean Up, and Celebrate

## Day 10 PPT

[![AWS Day 10: Show, Clean Up, and Celebrate](https://img.shields.io/badge/View%20Day%2010%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/Day-10-Show-Clean-Up-and-Celebrate-8dy3klexad9sncw)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## Today's plan

1. **Show** your project.
2. **Clean up** so nothing costs money.
3. **Look back** at 10 days.
4. **What to learn next.**

---

## Get ready for the demo

Our EC2 computer was stopped last night:

1. Open **EC2**, then **Instances**.
2. Select your instance.
3. Choose **Instance state**, then **Start instance**.
4. Wait until it says **Running**.
5. Connect with **EC2 Instance Connect**.
6. Go to the `gallery-app` folder and run the command your teacher gives you.

> **Teacher commands go here**
>
> ```bash
> cd ~/gallery-app
> ./deploy.sh YOUR-BUCKET-NAME YOUR-REGION
> ```

**Important:** the public address has changed. Copy the **new** address. Open it with **`http://`**, not `https://`.

> If the page already opens, you do not need to run the command. The app starts with the instance.

---

## Your project demo

Each learner shows **three things** in **3 minutes**:

1. The **live gallery** — view an image and upload a new one.
2. The **architecture diagram**.
3. **One thing** you learned.

> It is fine if something goes wrong. Fixing it is part of learning.

---

## Why we clean up

Things left **running** or **stored** can keep costing money. It is like leaving the lights on at home.

**Stop** only pauses a computer. You still pay for its disk.

**Terminate** deletes the computer for good. Today we terminate.

![Life of an EC2 computer](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AjsKoMntHeLJrJrXkeaOqy.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=tDQy3EjnePxFfyXPkXsjj&layout=canvas)

**Save your work first:**

- Download your **images**.
- Download your **architecture diagram**.
- Download your **README**.

---

## The cleanup map

1. **Terminate** EC2.
2. **Empty and delete** the S3 bucket.
3. **Delete** the IAM role.
4. **Delete** any extra demos.
5. **Check** the bill.
6. **Remove** the UPI mandate (only if you used UPI).

**Order matters.** Start with the computer, because it is the one with the running meter.

---

## Cleanup step 1: Terminate EC2

1. Open **EC2**, then **Instances**.
2. Select your instance.
3. Choose **Instance state**, then **Terminate (delete) instance**.
4. Confirm.
5. Wait until the state says **Terminated**.

**Note:** the computer and its disk are deleted.

> **Screenshot goes here**
>
> Add a picture of the EC2 **Terminate instance** screen.

---

## Cleanup step 2: Empty and delete the S3 bucket

1. Open **S3** and select your bucket.
2. Choose **Empty**, type the confirmation text, and confirm.
3. Then choose **Delete**, type the bucket name, and confirm.

**Note:** a bucket must be empty before it can be deleted. This cannot be undone.

> **Screenshot goes here**
>
> Add a picture of the S3 **Empty bucket** or **Delete bucket** screen.

---

## Cleanup step 3 and 4: Delete the role and extra demos

1. Open **IAM**, then **Roles**.
2. Select **gallery-ec2-role** and delete it.

Then delete anything extra you made, if you made it:

- A **Lambda function** and its **log group**.
- A **CloudFront distribution** (disable it, wait, then delete it).
- A **demo S3 bucket**.
- Extra **IAM policies**.
- The old **key pair** and **security group**, if you no longer need them.

> **Screenshot goes here**
>
> Add a picture of the IAM **Delete role** screen.

---

## Cleanup step 5 and 6: Check the bill and remove UPI

1. Open **Billing and Cost Management**.
2. Check that there are no unexpected charges.
3. Charges can take a day or more to appear, so check again in a few days.

If you used **UPI AutoPay**:

1. Open **Billing**, then **Payment preferences**.
2. Delete the **UPI payment method**. AWS may ask you to add another default method first.
3. Open your **UPI app**, find **AutoPay** or **Mandates**, and confirm the AWS mandate is cancelled.

**Keep your billing alarm on** until you have checked the bill.

---

## 10 days in one look

| Day | One line |
|---|---|
| Day 1 | Cloud basics and the billing alarm |
| Day 2 | IAM, MFA, and EC2 |
| Day 3 | S3 |
| Day 4 | More services and billing |
| Day 5 | The bucket and images |
| Day 6 | Launch EC2 |
| Day 7 | IAM role and the app |
| Day 8 | The Upload button |
| Day 9 | Testing, diagram, and README |
| Day 10 | Demo and cleanup |

---

## What next?

Keep learning:

- Add **HTTPS** and speed with **CloudFront**.
- Try **Lambda**.
- Store information in a **database**.
- Learn how to use AWS **safely** and **cheaply**.

Then prepare for the **AWS Certified Cloud Practitioner** exam. Later, try the **Solutions Architect Associate** exam.

**Well done.** You built a real project on AWS. 🎉

---

[← Day 9: Test and Polish Your Project](<./DAY 9.md>) | [Back to the course home](./README.md)
