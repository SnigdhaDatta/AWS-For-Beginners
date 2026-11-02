# Day 5: Start Our Image Gallery

## Day 5 PPT

[![AWS Day 5: Start Our Image Gallery](https://img.shields.io/badge/View%20Day%205%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/Day-5-Start-Our-Image-Gallery-zct89x2hv1kbzsi)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

<!--
SCREENSHOTS TO ADD
Save each screenshot in an "images" folder next to this file:
  images/day-05-step-1-open-s3.png
  images/day-05-step-2-name-bucket.png
  images/day-05-step-3-block-public-access.png
  images/day-05-step-4-create-bucket.png
  images/day-05-step-5-upload.png
  images/day-05-step-6-check.png
Before you share them, hide your AWS account ID, your email address, and your name.
-->

---

## What we are building

A modern one-page image gallery.

```
Person -> Browser -> EC2 (gallery website with Upload button) -> S3 (images)
```

**Today we build the private S3 part:** the bucket and the first images.

---

## Before class

- [ ] Sign in with your **IAM user** and **MFA** from Day 2.
- [ ] Keep your **billing alarm or budget** on.
- [ ] Get **2 or 3 small JPG or PNG images** ready on your computer. Each one must be **under 2 MB**.

---

## Live steps

> AWS console screens and button names change from time to time. If a name looks different, look for the closest match.

### Step 1: Open S3

1. Sign in to the AWS console.
2. Type **S3** in the search bar.
3. Click **S3**.


### Step 2: Create a bucket and name it

1. Click **Create bucket**.
2. Use **lowercase letters, numbers, and hyphens**.
3. No spaces. The name must be unique in the whole world.

Example: `yourname-gallery-123`

Choose the **Region** closest to you and **write it down**. EC2 must use the same Region.

### Step 3: Keep the bucket private

Leave **Block all public access** turned **on**.

Think of a locked room. Our bucket stays private. Later, EC2 will get permission to use it safely.


### Step 4: Finish creating the bucket

1. Leave the other settings as they are.
2. Scroll down.
3. Click **Create bucket**.


### Step 5: Upload images

1. Open your bucket.
2. Click **Upload**, then **Add files**.
3. Choose 2 or 3 small JPG or PNG images.
4. Keep each image under 2 MB.
5. Click **Upload**.


### Step 6: Check your work

1. See your images listed in the bucket.
2. Click one image to see its details.

It will not open in the browser yet. The bucket is private. **This is correct.**

---

## Common mistakes

| Problem | Fix |
|---|---|
| Name already taken? | Add numbers or your name. |
| Capital letters or spaces? | Remove them. |
| Images too large? | Use images under 2 MB. |
| Forgot the Region? | Check your notes. |

---

## Recap

- We have a private bucket.
- Our images are inside.
- Tomorrow we launch an EC2 computer, and EC2 will run the gallery.
- Keep your billing alarm on.

---

## Important instructions

- **Keep the bucket private.** Do not turn off Block all public access.
- **Write down your bucket name and Region.** We need both on Days 6, 7, and 8.
- **Keep bucket names simple:** lowercase letters, numbers, and hyphens only. Do not use dots, even though S3 allows them.
- **Never upload** private photos, passwords, or access keys.
- **Day 10 is cleanup day.** We will delete the bucket and its images then.

---

## Extra: two optional live demos

These are **not on the slides**. They show the Day 4 services, CloudWatch and CloudFront, on your own account. Do them only if you have time. Each table explains what to do and **what the step means**.

> Try both in your own account before class. Both can cost money if you pick the wrong option, so read the warnings first.

### Extra A: CloudWatch billing alarm

CloudWatch can watch your estimated AWS charges and email you when they pass an amount you choose. On Day 1 we set a budget. This is the CloudWatch way of doing a similar job.

| # | What you do | What it means |
|---|---|---|
| 1 | Open **Billing and Cost Management**, then **Billing preferences**. Tick **Receive CloudWatch Billing Alerts** and choose **Save preferences**. | AWS does not send your cost numbers to CloudWatch until you allow it. This switch turns the numbers on. |
| 2 | Change the Region (top right) to **US East (N. Virginia)**. | Billing numbers for your whole account are kept only in this Region, even if your bucket is somewhere else. |
| 3 | Open **CloudWatch**, then **Alarms**, then **All alarms**, then **Create alarm**. | An alarm is a rule: "tell me when a number gets too high." |
| 4 | Choose **Select metric**, then **Billing**, then **Total Estimated Charge**. Tick **EstimatedCharges** and choose **Select metric**. | A metric is the number being watched. Here it is your estimated bill so far this month. |
| 5 | Set the condition to **Static**, **Greater than**, and a threshold such as `5`. | This is the rule. For example: "alarm when my estimated bill is more than 5 US dollars." The amount is in US dollars. |
| 6 | Choose **Next**. Under notification, create a **new SNS topic** and enter your email address. | SNS is the messenger. The alarm hands the message to SNS, and SNS emails you. |
| 7 | Give the alarm a name, such as `billing-over-5-usd`, then choose **Create alarm**. | The name helps you find the alarm later. |
| 8 | Open the **confirmation email** from AWS and confirm the subscription. | AWS checks that the email address is really yours. Without this, no alerts arrive. |
| 9 | Watch the alarm **state**. | It starts as **Insufficient data**, then changes to **OK** after a while. **OK** means your bill is below the line. **In alarm** means it passed the line. |

**Watch out for:**

- **IAM users cannot see Billing by default.** The root user must first turn on "IAM user and role access to Billing information" in the account settings. If you cannot open the Billing page, this is why.
- **Billing numbers update a few times a day,** so a new alarm can take a while to show data.
- **Keep the alarm on** for the whole course.

### Extra B: CloudFront in front of the bucket

CloudFront keeps copies of your files near your visitors, so they load faster. It can also let people see a file **without making the bucket public**.

> Our gallery app does **not** use CloudFront. It shows images using temporary S3 links. This demo is only to see CloudFront work.

| # | What you do | What it means |
|---|---|---|
| 1 | Open **CloudFront** and choose **Create distribution**. | A distribution is one CloudFront setup. It gets its own web address. |
| 2 | Enter a name, such as `gallery-demo`. Choose **Single website or app**, then **Next**. | The name is only a label. "Single website or app" is the simple setup for one site. |
| 3 | If you are asked to choose a plan, choose the **Free** plan ($0 per month). **Do not choose Pro or higher.** | Plans are fixed monthly prices. Pro and higher cost real money every month. |
| 4 | For **Origin type**, choose **Amazon S3**. For **S3 origin**, choose **Browse S3** and select your gallery bucket. | The origin is where the original files live. CloudFront copies from here. |
| 5 | For **Settings**, choose **Use recommended origin settings**. | CloudFront sets up Origin Access Control for you. This is a key card that lets CloudFront, and only CloudFront, read the private bucket. |
| 6 | If you are asked about AWS WAF or security protections, choose the option that does **not** turn them on. | WAF is an extra firewall. It is not needed for a demo and may add cost. |
| 7 | Choose **Create distribution**. | CloudFront also updates your bucket policy for you, so the bucket stays private but CloudFront can read it. |
| 8 | Wait until **Last modified** changes from **Deploying** to a date and time. | CloudFront is spreading its setup to many places around the world. This takes a few minutes. |
| 9 | Copy the **distribution domain name**. It looks like `d111111abcdef8.cloudfront.net`. | This is the public address of your CloudFront setup. |
| 10 | In a new tab, open `https://` + your domain name + `/` + the name of an image in your bucket. | CloudFront asks S3 for the file the first time, then keeps a copy close to the visitor. The bucket itself is still private. |

**Watch out for:**

- **File names with spaces:** URL-encode the spaces in the address, or rename the file in your bucket to something simple, like `cat.png`.
- **If the console says your account cannot use a plan,** do not upgrade. Skip this demo.
- **Clean up after the demo.** Disable the distribution, wait until it finishes updating, then delete it. Leaving it can keep costing money.

---

[← Day 4: More Services, Billing, and Review](<./DAY 4.md>) | [Day 6: Launch Our Computer on EC2](<./DAY 6.md>)