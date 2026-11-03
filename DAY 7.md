# Day 7: Connect EC2 to S3 and Run the Gallery

## Day 7 PPT

[![AWS Day 7: Connect EC2 to S3 and Run the Gallery](https://img.shields.io/badge/View%20Day%207%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/Day-7-Connect-EC2-to-S3-and-Run-the-Gallery-ul8du7trfv5ehdi)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## What we are building

We have a private S3 bucket with images. We have an EC2 computer that is running. Today we connect the two **safely**, then put the gallery website on the instance.

```
Visitor -> Browser -> EC2 (gallery app) -> IAM Role -> Private S3 Bucket
```

The app never stores a password or an access key. Instead, EC2 is given an **IAM role**, and the AWS library uses that role automatically.

---

## Before class

- [ ] Your EC2 instance from Day 6 is **Running**.
- [ ] You have your **key pair** (`.pem`) file.
- [ ] You know your **bucket name** and **Region** from Day 5.
- [ ] The instance security group allows **SSH** from your IP and **HTTP (port 80)** from anywhere.
- [ ] Your billing alarm is still on.

---

## Quick look back: what your EC2 instance really is

Before we connect it to S3, it helps to see where the instance actually lives.

AWS does not give you a whole physical computer. A big physical host is split into smaller **slices**, and each slice becomes a virtual server.

![From a big computer to your virtual server](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AzafliirL53qd7isKd32ob.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=qw5rjYw1vEDLxZ-xvUW7w&layout=canvas)

- **AWS data center** has the real hardware: CPU, memory, disks, and network.
- **Nitro** is the AWS system that splits the hardware into slices.
- **Your slice** becomes your **EC2 instance**: a few vCPUs and some memory.
- The **AMI** gives it an operating system.
- The **EBS disk** is attached over the network.
- **Your code** runs inside this slice, and it is isolated from other customers.

### Reading the name `t3.micro`

Every instance type name tells you three things.

![Reading the name t3 micro](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AJKCSJzWW9a7svhzW4fCUV.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=U9DrDnwexakJDGrJr-V95&layout=canvas)

| Part | Example | Meaning |
|---|---|---|
| **Family** | `t` | General purpose, good for web servers |
| **Generation** | `3` | The version. A higher number is newer |
| **Size** | `micro` | How big the slice is |

Sizes go up like this: `nano` → `micro` → `small` → `medium` → `large` → `xlarge`. Bigger size means more CPU and memory, and a bigger bill.

---

## Why EC2 needs an IAM role

S3 is **private**. By default, nobody can read it. So when our app on EC2 asks S3 for an image, S3 says "who are you?"

We have two choices:

| Choice | How it works | Safe? |
|---|---|---|
| Put access keys in the code | The app reads a key and secret from a file | **No.** Keys can leak in Git or a screenshot |
| Attach an IAM role to EC2 | AWS gives the instance temporary permission automatically | **Yes.** Nothing secret is stored |

We will use the **IAM role**.

> An IAM **user** is a person. An IAM **role** is a permission set that a service, like EC2, can wear for a while. The instance "wears" the role and gets temporary credentials that rotate by themselves.

### What is an instance profile?

When you attach a role to an EC2 instance, AWS wraps it in an **instance profile**. That is just the container AWS uses to hand the role to the instance. In the console you simply choose the role; the instance profile is created for you.

---

## Step 1: Create the IAM role

1. Open the **IAM** console.
2. Click **Roles**, then **Create role**.
3. **Trusted entity type**: choose **AWS service**.
4. **Use case**: choose **EC2**.
5. Click **Next**.
6. On the permissions page, choose one option:
   - **Easy:** tick **`AmazonS3FullAccess`**. Good for learning only.
   - **Better:** create a small policy for just this bucket (next section).
7. Click **Next**.
8. **Role name**: `ec2-gallery-s3-role`.
9. Click **Create role**.

### Better: allow only your bucket

Instead of full S3 access, create a policy that allows only your bucket. Replace `YOUR-BUCKET-NAME` with your real bucket name.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

This lets EC2 list the bucket and read or write objects, and nothing else.

---

## Step 2: Attach the role to your instance

1. Open the **EC2** console, then **Instances**.
2. Select your gallery instance.
3. Click **Actions**, then **Security**, then **Modify IAM role**.
4. Choose `ec2-gallery-s3-role`.
5. Click **Update IAM role**.

If you were creating the instance, you could also attach the role under **Advanced details**, then **IAM instance profile**.

> You do **not** need to restart the instance. The role is available right away.

---

## Step 3: Check that the instance has the role

Connect to the instance with **EC2 Instance Connect** or SSH, then run:

```bash
aws sts get-caller-identity
```

You should see something like:

```text
"Arn": "arn:aws:sts::123456789012:assumed-role/ec2-gallery-s3-role/i-0123456789abcdef0"
```

If the command fails, the role is not attached, or the AWS CLI is missing. On Amazon Linux 2023 the AWS CLI is usually already installed.

> The word `assumed-role` is the important part. It means the instance is using the role, not a stored key.

---

## Step 4: Put the gallery on the instance

The gallery app lives in the `gallery-app` folder of this repository.

### Option A: copy from your computer

From the repository root on your own computer (WSL, Linux, or macOS):

```bash
chmod +x send-to-ec2.sh
./send-to-ec2.sh ec2-user@YOUR-PUBLIC-IP ~/gallery-key.pem YOUR-BUCKET-NAME YOUR-REGION
```

### Option B: clone on the instance

```bash
sudo dnf install -y git
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO/gallery-app
chmod +x setup.sh start.sh stop.sh deploy.sh
./deploy.sh YOUR-BUCKET-NAME YOUR-REGION
```

`deploy.sh` installs Node.js if needed, installs the app, builds it, and runs it as a **systemd service** called `gallery`. It also prints the address to open.

Example:

```bash
./deploy.sh yourname-gallery-123 ap-south-1
```

---

## Step 5: Open the gallery

1. Open `http://YOUR-PUBLIC-IP` in your browser. Use **http**, not https.
2. You should see the images from your private bucket.
3. Choose an image and click **Upload image**.
4. Refresh the page. The new image should appear at the top.
5. Open S3 and refresh the bucket. The image is there too.

This works because EC2 is using the IAM role to read and write the private bucket. The bucket never became public.

---

## Common mistakes

| Problem | Fix |
|---|---|
| Page says "Access denied" | The role is not attached. Run **Modify IAM role** and attach it. |
| "The app could not find AWS permissions" | Same as above: attach the role, then reload. |
| "Bucket not found" | Check the bucket name for typos. |
| "Region does not match the bucket" | Run `deploy.sh` again with the bucket's real Region. |
| Page does not open | Use `http://`, check the instance is **Running**, and allow **HTTP 80** in the security group. |
| Upload works but image is missing | Refresh the page; links are rebuilt each load. |
| `aws sts get-caller-identity` fails | The role is missing, or the AWS CLI is not installed on the instance. |
| Build stops with `Killed` | The instance ran out of memory. Run `./deploy.sh` again; it adds swap space. |

---

## Recap

- EC2 is a **slice** of a physical host, created by **Nitro**.
- `t3.micro` means family `t`, generation `3`, size `micro`.
- S3 is private, so EC2 needs permission.
- We used an **IAM role**, not access keys.
- The role is attached to the instance and used automatically.
- The gallery is now running on EC2 and talking to S3.
- The bucket stayed private the whole time.

---

## Important instructions

- **Never put access keys in the code.** Use the IAM role.
- **Keep the bucket private.** Block all public access stays on.
- **Use a small policy** when you can, not full S3 access.
- **Stop the instance when you finish** so it stops costing money.
- **Keep your key pair safe.** Do not commit the `.pem` file.
- **Day 10 is cleanup day.** We will remove the role, the instance, and the bucket then.

---

[← Day 6: Launch Our Computer on EC2](<./DAY 6.md>) | Day 8: View Images from S3 and Add the Upload Button (coming soon)
