# AWS for Beginners

A 10-day beginner-friendly AWS course with one-hour lessons.

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
| Day 2 | IAM and EC2 Basics | Coming soon |
| Day 3 | S3 Storage | Coming soon |
| Day 4 | Other Services, Billing, and Review | Coming soon |
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

Lambda, CloudWatch, and CloudFront are introduced by name only on Day 4.

## Important warnings

- Turn on MFA for the root user.
- Do not use the root account for daily work.
