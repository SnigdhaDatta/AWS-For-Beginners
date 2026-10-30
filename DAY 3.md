# Day 3: S3 Storage

## Day 3 PPT

[![AWS Day 3: Storing Files with S3](https://img.shields.io/badge/View%20Day%203%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/AWS-Day-3-Storing-Files-with-S3-o6spie32wa3np0o)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## What we learn today

1. **What S3 is:** storage in the cloud for files.
2. **What a bucket is:** the container that holds your files.
3. **What an object and a key are:** the file and its name.
4. **Why private buckets matter:** keep your files away from the public.
5. **How EC2 will use S3 later:** through an IAM role, not hardcoded keys.

---

## Before class

- [ ] Make sure you can sign in to your AWS account with your IAM user from Day 2.
- [ ] Have one small image file ready on your computer, such as `cat.jpg`.
- [ ] Keep your billing alarm or budget on from Day 1.

---

## Key ideas

| Idea | Simple meaning |
|---|---|
| **S3** (Simple Storage Service) | Storage in the cloud for files. Think of it as a giant, safe online folder. |
| **Bucket** | A container that holds your objects. Its name must be **globally unique** across all AWS accounts. |
| **Object** | A file you store in a bucket, plus its metadata. |
| **Key** | The full name/path of an object inside a bucket, such as `photos/cat.jpg`. You find an object by **Bucket + Key**. |
| **Region** | The physical location where your bucket is stored, such as `ap-south-1` (Mumbai). |
| **Private bucket** | A bucket where objects are **not** public by default. This is what we use in this course. |
| **Storage class** | The tier you choose for an object, such as Standard, Intelligent-Tiering, or Glacier. Different tiers have different cost and speed. |

## S3 in Detail

![S3 in Detail](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3A_RaFmjLE9FblanxYWMG0D.png)

> [Edit this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=AX33Svgmmb1E1F1jSnEM6&layout=canvas)

### Bucket + Key = your file

What the diagram shows:

- **S3 Storage:** the top-level storage service.
- **Buckets:** separate containers such as `my-gallery`, `my-notes`, and `my-backup`. Each has a globally unique name and lives in one Region.
- **Objects:** the files inside each bucket, such as `cat.jpg` or `todo.pdf`. You find an object by **Bucket + Key**.
- **Private by default:** every new bucket starts private, so nobody on the internet can read it until you allow access.

A bucket name and a key together point to exactly one object:

```text
my-gallery-images / photos/cat.jpg
└── bucket name   └── key (object name)
```

### Bucket, objects, settings, and access

![S3 buckets, objects, settings, and access](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AWMh5LWYRAWF0Fl8j0MdpS.png)

> [Edit this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=SedElyJ44x-LxTWbfnca&layout=canvas)

This second diagram zooms in on one private bucket: its objects are found by **Bucket + Key**, it has settings (Block Public Access, SSE-S3 encryption, Versioning, Lifecycle rules), each object uses a **storage class**, and **EC2 reaches it through an IAM role** without hardcoded keys.

### Settings, storage classes, and access

**Bucket settings**

| Setting | What it does | Course choice |
|---|---|---|
| **Block Public Access** | Stops anyone on the internet from reading objects. | Keep **on**. |
| **Encryption** | Encrypts objects at rest. **SSE-S3** is the default and free. | Keep the default. |
| **Versioning** | Keeps older copies when a file is overwritten or deleted. | Optional. Useful if you edit files often. |
| **Lifecycle rules** | Automatically move or delete objects after a set time. | Not needed for the project. |

**Storage classes**

| Class | Good for | Cost |
|---|---|---|
| **Standard** | Files you open often. | Highest, fastest. |
| **Intelligent-Tiering** | Unknown or changing access patterns. | Automatic. |
| **Glacier** | Backups you rarely open. | Cheapest, slowest. |

**How EC2 will read a private bucket**

You do **not** make the bucket public and you do **not** put access keys in your code. Instead:

1. EC2 gets an **IAM role** attached to it.
2. The role has a policy that allows `s3:GetObject` and `s3:PutObject` on your bucket.
3. The app calls S3, and AWS hands temporary credentials to the EC2 instance automatically.

We set this up on Day 7.

---

## Live demo steps

> AWS console screens and button names change from time to time. If a name looks different, look for the closest match.

### Part 1: Create a private S3 bucket

1. Sign in to the AWS console as your IAM user.
2. Search for **S3** and open it.
3. Choose **Create bucket**.
4. Enter a **globally unique** bucket name, such as `yourname-gallery-2026`. Bucket names must be lowercase and cannot contain spaces.
5. Choose a **Region** close to you, such as `ap-south-1`.
6. Leave **Block all public access** turned **on**.
7. Leave the other default settings as they are.
8. Choose **Create bucket**.

### Part 2: Upload an object

1. Open your new bucket.
2. Choose **Upload**.
3. Choose **Add files** and select your image, such as `cat.jpg`.
4. Choose **Upload**.
5. Click the uploaded file and look at its **Key**. It matches the file name you uploaded.

### Part 3: Try to open the object (it should fail)

1. Select the uploaded object.
2. Copy its **Object URL**.
3. Open the URL in a new browser tab.
4. You should see an **Access Denied** message. This is correct, because the bucket is private. We will let EC2 read it later using an IAM role.

### Part 4: Look at storage classes (read only)

1. Select the object and open the **Properties** tab.
2. Look at the **Storage class**. It is **Standard** by default.
3. You do not need to change it today. Just know that cheaper, slower classes such as **Glacier** exist for files you rarely open.

---

## Important instructions

- **Keep buckets private.** Do not turn off "Block all public access" in this course.
- **Bucket names are global.** If a name is taken, choose another one.
- **S3 charges for storage and requests.** Small course files cost very little, but do not upload large files you do not need.
- **Do not store secrets in S3.** Never upload passwords, keys, or personal documents.
- **Delete test objects you do not need.** Day 10 is cleanup day.
- **Keep your billing alarm or budget on** from Day 1.

---

[← Day 2: IAM and EC2 Basics](./DAY%202.md) | Day 4: Other Services, Billing, and Review (Coming soon)
