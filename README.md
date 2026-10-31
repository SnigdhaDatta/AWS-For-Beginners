<p align="center">
  <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer">
    <img src="./assets/aws-logo.svg" alt="Amazon Web Services" width="220">
  </a>
</p>

<h1 align="center">AWS for Beginners</h1>

<p align="center">A 10-day beginner-friendly AWS course with one-hour lessons.</p>

## Who this course is for

- Absolute beginners with no cloud experience.
- People who want to learn AWS through short lessons and small demos.
- People who want to build a simple AWS project.

## What you will learn

- Cloud and AWS basics.
- IAM and EC2 basics.
- S3 storage.
- Other AWS services, billing, and review.
- How to build a one-page image gallery.
- How EC2, IAM roles, and a private S3 bucket work together.

## Prerequisites

- A free AWS account.
- A computer with a browser.
- A card, UPI, or net banking is needed for account verification.

See [Day 1](./DAY%201.md) for the AWS account setup steps.

## Course outline

| Day | Topic | Link |
|---|---|---|
| Day 1 | Cloud and AWS Basics | [Open lesson](./DAY%201.md) |
| Day 2 | IAM and EC2 Basics | [Open lesson](./DAY%202.md) |
| Day 3 | S3 Storage | [Open lesson](./DAY%203.md) |
| Day 4 | Other Services, Billing, and Review | [Open lesson](./DAY%204.md) |
| Day 5 | Project, create an S3 bucket and upload images | Coming soon |
| Day 6 | Project, launch an EC2 instance | Coming soon |
| Day 7 | Project, IAM role and run the gallery app on EC2 | Coming soon |
| Day 8 | Project, view images from S3 and add the Upload button | Coming soon |
| Day 9 | Test, polish, architecture diagram, and README | Coming soon |
| Day 10 | Demo, cleanup, and next steps | Coming soon |

## Final project

You will build a modern one-page image gallery. The gallery website runs on EC2. It has an Upload button. The images are stored in a private S3 bucket. EC2 reads and writes the bucket using an IAM role.

```text
Person -> Browser -> EC2 (gallery website with Upload button) -> S3 (images)
```

## Services used

- AWS account and IAM
- EC2
- S3
- Billing tools

Lambda, CloudWatch, and CloudFront are introduced by name only on Day 4. The diagrams below show the idea of each service in plain language.

---

## AWS Lambda: run code only when needed

Lambda is **serverless** compute. You upload a small function, and AWS runs it only when something calls it. When it is idle, it costs nothing.

![Lambda runs only when needed](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3A3x3C7GFN_-WHzXQ1F7PCm.png)

> [Edit this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=BlFiC9tM1U0VgX0T6Z-_F&layout=canvas)

## Serverful vs Serverless

**Serverful** is like renting a flat: you rent a server (EC2) and look after it. It runs all day and you pay while it runs. **Serverless** is like a hotel room: AWS looks after the servers, you use it only when you need it, and you pay per run.

![Serverful vs Serverless](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3Anv9w-7twzLfvNHRMzByrx.png)

> [Edit this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=2S7hPsppk6yRj7atj67Ij&layout=canvas)

## CloudWatch: the AWS dashboard

CloudWatch collects numbers and logs from your AWS services (such as EC2, S3, and Lambda). You can watch them on a dashboard and set an **alarm** that sends you an email when something goes wrong.

![CloudWatch is the AWS dashboard](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AJgakK0FBqnD7aktMsEsnV.png)

> [Edit this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=CS5zStmyZWdAl2nLSTl5z&layout=canvas)

## CloudFront: content closer to the visitor

CloudFront is AWS's **content delivery network (CDN)**. It keeps a copy of your content at an edge location near the visitor, so the page loads faster. If it has no copy yet, it fetches the content from the original bucket once and then serves the copy.

![CloudFront brings content closer](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3Ap6f12JTSxpk8XZfoUeNVV.png)

> [Edit this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=kxkDEND8xor453HFRlQXc&layout=canvas)

## CDN: how it works

A **CDN (Content Delivery Network)** is a global network of edge servers. A request first checks the nearest edge cache. A **cache hit** is answered quickly; a **cache miss** goes to the origin server, which sends the content back and caches it. Without a CDN, every request goes straight to the origin server.

![CDN: Content Delivery Network](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AdNQmWba7aH2W8snFbyNy_.png)

> [Edit this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=ZHqnXy-2z48A3EmMJ7si5&layout=canvas)

## Important warnings

- Turn on MFA for the root user.
- Do not use the root account for daily work.

## Contributing

- [Contribution and commit rules](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
