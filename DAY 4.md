# Day 4: More Services, Billing, and Review

## Day 4 PPT

<!-- Replace YOUR_GAMMA_ID with your Day 4 Gamma link. -->

[![AWS Day 4: More Services, Billing, and Review](https://img.shields.io/badge/View%20Day%204%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/AWS-Day-4-More-Services-Billing-and-Review-42owdpic6blg68a)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

<!--
DIAGRAMS TO ADD
Export each diagram from Eraser as a PNG and save it in an "images" folder next to this file:
  images/day-04-lambda.png
  images/day-04-cloudwatch.png
  images/day-04-cloudfront.png
  images/day-04-serverful-vs-serverless.png
  images/day-04-project.png
-->

---

## What we learn today

1. **A few more AWS services:** Lambda, CloudWatch, and CloudFront.
2. **How billing works:** use what you need, and watch the cost.
3. **A quick quiz:** review Days 1 to 3.
4. **Our project:** build a one-page image gallery.

---

## Before class

- [ ] Make sure you can sign in with your **IAM user** and **MFA** from Day 2.
- [ ] Make sure your **billing alarm or budget** from Day 1 is still on.
- [ ] Revise Days 1 to 3 for the quiz.

---

## More AWS services

AWS has more than 200 services, but you only need a few. Today we learn three names and one idea each. Do not try to memorize them.

### Lambda: run code only when needed

Like a hotel room: use it while you need it, then leave. There is no computer to manage.

1. **Use it.** The code runs when an event asks for it.
2. **Then leave.** Lambda stops when the work is done.

> We will **not** use Lambda in our project.

![Diagram placeholder: Lambda runs only when needed](./images/day-04-lambda.png)

*Diagram to add: a photo is uploaded, Lambda runs the code, then Lambda stops and sits idle.*

### CloudWatch: the AWS dashboard

Like a car dashboard. It shows how your things are doing and can send alerts.

1. **See.** Watch your AWS things.
2. **Notice.** Find a problem early.
3. **Alert.** Get a message when something needs attention. A billing alarm can be built with CloudWatch. On Day 1 we also used AWS Budgets to get warned about cost.

![Diagram placeholder: CloudWatch is the AWS dashboard](./images/day-04-cloudwatch.png)

*Diagram to add: EC2, S3, and Lambda send numbers to CloudWatch, which raises an alarm and emails you.*

### CloudFront: bring content closer

Popular content can stay near the people who want it.

| Idea | Simple meaning |
|---|---|
| **Local shop** | A nearby place keeps popular items ready. |
| **Shorter trip** | Your browser gets the content faster. |
| **Faraway factory** | The original content can stay far away. |

![Diagram placeholder: CloudFront brings content closer](./images/day-04-cloudfront.png)

*Diagram to add: a visitor asks a nearby CloudFront copy, which fetches from the faraway bucket only when it has no copy.*

### CDN: how CloudFront delivers content

A **CDN (Content Delivery Network)** is a network of edge servers placed around the world. CloudFront is AWS's CDN. When someone asks for a file, the nearest edge server answers from its cache. If it does not have the file yet, it fetches it from the origin once and keeps a copy.

![CDN: Content Delivery Network](./images/day-04-cdn.png)

*Diagram: with a CDN, the request goes to a nearby edge server. A cache hit is fast; a cache miss goes to the origin server, which sends the content back and caches it. Without a CDN, every request goes straight to the origin.*

---

## Extra: serverful and serverless

This is not on the slides. It is a short explanation if students ask what "serverless" means.

| | **Serverful** (EC2) | **Serverless** (Lambda) |
|---|---|---|
| **Everyday idea** | Renting a flat | A hotel room |
| **Who looks after the server?** | You | AWS |
| **When does it run?** | All the time, while it is on | Only when something calls it |
| **Cost** | You pay while it runs, even when idle | You pay per run |
| **Good for** | Websites and apps that run all day | Small tasks that run now and then |
| **In our course** | The gallery website | Name only |

"Serverless" does not mean there is no server. There is a server, but AWS looks after it, so you do not have to.

![Diagram placeholder: serverful and serverless side by side](./images/day-04-serverful-vs-serverless.png)

---

## How AWS billing works

1. **Pay for what you use,** like electricity.
2. **The Free Tier gives some free use, with limits.**
3. **See your costs on the Billing page.** Open **Billing and Cost Management** in the console.

Use creates cost. Check the bill often.

### 5 tips to avoid surprise bills

1. Keep your billing alarm on.
2. Turn off EC2 when you are not using it.
3. Delete things you do not need.
4. Check the Billing page often.
5. Stay within the Free Tier.

---

## Quick quiz: review Days 1 to 3

Choose A, B, or C. Talk with a partner before checking the answers.

**Q1. What is cloud computing?**
- A) Renting computers over the internet
- B) A type of weather
- C) A free phone app

**Q2. What is an AWS Region?**
- A) A password
- B) A big campus of AWS computers in one part of the world
- C) A type of file

**Q3. Why use an IAM user instead of the root account?**
- A) The root account is the master key and too risky for daily use
- B) IAM users are faster
- C) The root account costs more

**Q4. What does MFA add?**
- A) A second lock, like a code from your phone
- B) More storage
- C) A faster internet

**Q5. What is S3 used for?**
- A) Renting a computer
- B) Storing files in buckets
- C) Sending emails

**Q6. What does a billing alarm do?**
- A) Stops all services
- B) Warns you before your bill gets big
- C) Deletes your account

<details>
<summary>Show answers</summary>

| Question | Answer | Why |
|---|---|---|
| Q1 | **A** | Cloud computing means renting computers over the internet. |
| Q2 | **B** | A Region is a big campus of AWS computers in one part of the world. |
| Q3 | **A** | The root account is the master key and too risky for daily use. |
| Q4 | **A** | MFA adds a second lock. |
| Q5 | **B** | S3 stores files in buckets. |
| Q6 | **B** | A billing alarm warns you before your bill gets big. |

Ask students to say why each answer is correct.

</details>

---

## Review, then build our project

The pieces now have clear jobs.

- **Lambda** runs code only when needed.
- **CloudWatch** is the dashboard.
- **CloudFront** makes websites faster.
- **Billing** = pay for what you use. Keep your alarm on.

**Next:** build a modern one-page image gallery. The website runs on EC2. The images are stored in S3. Users can upload new images with a button.

```
Person -> Browser -> EC2 (gallery website with Upload button) -> S3 (images)
```

![Diagram placeholder: our image gallery project with an IAM role](./images/day-04-project.png)

*Diagram to add: a visitor opens the gallery on EC2. An IAM role gives EC2 a key card to read and save images in a private S3 bucket.*

| Day | What we do |
|---|---|
| **5** | Create an S3 bucket and upload images |
| **6** | Launch an EC2 instance |
| **7** | Give EC2 permission to use S3 (IAM role) and run the gallery app |
| **8** | View images from S3 and use the Upload button |
| **9** | Test, polish, draw a diagram, and write a README |
| **10** | Demo, cleanup, and next steps |

---

## Important instructions

- **Keep your billing alarm or budget on** for the whole course.
- **Turn off or stop EC2** when you are not using it. A running computer costs money.
- **Do not use the root account** for daily work. Sign in with your IAM user.
- **Never share** your passwords, MFA codes, or access keys, and never put them in your repository.
- **Day 10 is cleanup day.** Delete what you created so nothing keeps costing money.

---

[← Day 3: S3 Storage](./DAY%203.md) | Day 5: Create a Bucket and Upload Images (Coming soon)