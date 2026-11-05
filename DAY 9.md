# Day 9: Test and Polish Your Project

## Day 9 PPT

[![AWS Day 9: Test and Polish Your Project](https://img.shields.io/badge/View%20Day%209%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/Day-9-Test-and-Polish-Your-Project-9rvf1agletknazf)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## Where we are

Our gallery works.

- The **website runs on EC2**.
- The **images are stored in a private S3 bucket**.
- EC2 uses an **IAM role** to reach the bucket.

```
Person -> Browser -> EC2 (gallery website with Upload button) -> S3 (private images)
```

**Today** we check that everything works, and we explain what we built.

---

## Before class

- [ ] Your EC2 instance is **Running**.
- [ ] The gallery is open at `http://YOUR-PUBLIC-IP` (use **http**, not https).
- [ ] You have the **new public address** if the instance was stopped and started.
- [ ] Keep your **billing alarm or budget** on.
- [ ] Get ready: a **phone**, a **GIF or text file**, and an **image bigger than 2 MB**, for the tests.

Check that the service is running:

```bash
sudo systemctl status gallery
```

You should see `active (running)`. If it is not running, start it again:

```bash
cd ~/gallery-app
./deploy.sh YOUR-BUCKET-NAME YOUR-REGION
```

---

## Testing checklist

Tick each one when it works.

- [ ] The gallery page opens.
- [ ] The images from S3 are shown.
- [ ] A new **JPG** uploads and appears.
- [ ] A new **PNG** uploads and appears.
- [ ] The **trash icon** deletes an image from the grid and from S3.
- [ ] The page looks good on a **phone**.
- [ ] The link opens in a **private browser window**.

### Check the IAM role

Connect to the instance and run:

```bash
aws sts get-caller-identity
```

You should see `assumed-role/gallery-ec2-role` in the output. That proves EC2 is using the role, not a saved key.

---

## Test the safety checks

These tests try to break the gallery on purpose. **The results below are good, not errors.** They show the gallery is protecting itself.

| Test | What you do | You should see |
|---|---|---|
| **Wrong file type** | Try to upload a GIF or a text file. | "Only JPG and PNG images can be uploaded." |
| **Fake image** | Rename a text file to `fake.png` and upload it. | "That file is not a real JPG or PNG image." |
| **Too big** | Try to upload an image over 2 MB. | "That image is larger than 2 MB. Choose a smaller one." |
| **Private bucket** | In the S3 console, open an image and open its **Object URL** in a new tab. | **Access Denied** |
| **Delete permission** | Click the trash icon on a card. | The image disappears from the grid and from S3. |

> **Tip for the wrong file type test:** the file picker may only show JPG and PNG files. In the picker, change the file type filter to **All files**.

### Why the bucket says Access Denied

The bucket is **private**. Opening an image's plain S3 link is like knocking on a locked door, so S3 says no. This is correct.

So how does the gallery show the images? EC2 uses its role to ask S3 for a **temporary link** for each image. That link works for one hour, and then it stops. The bucket stays private the whole time.

---

## Fixing problems

| Problem | Fix |
|---|---|
| The page does not open | Use `http://`, not `https://`. Check the instance is **Running**. Check the security group allows **HTTP (port 80)**. If the instance was stopped and started, use the **new public address**. |
| The page shows "Access denied" | The IAM role is not attached to the instance. Attach it, then run `./deploy.sh YOUR-BUCKET-NAME YOUR-REGION` again. |
| The images are missing | Check the **bucket name** and **Region** you deployed with. |
| The app stopped | Connect again and run `sudo systemctl restart gallery`. If that fails, run `./deploy.sh YOUR-BUCKET-NAME YOUR-REGION`. |
| Delete says "Access denied" | Add `s3:DeleteObject` to the IAM role policy. |
| The page shows an old design | The build did not run. Run `./deploy.sh ...` again, then press **Ctrl+Shift+R** in the browser. |

If something fails, check the steps **in order**. For details, read the log:

```bash
sudo journalctl -u gallery -n 40 --no-pager
```

---

## Draw your architecture

An **architecture diagram** shows which parts you used and how they connect. Anyone who sees it can understand your project in one minute.

Your diagram should show:

- **Person** and **Browser**
- **EC2**, with the **gallery website and Upload button**
- The **IAM role** attached to EC2
- A **private S3 bucket**
- Your **Region**

```
Person -> Browser -> EC2 -> S3
                      ^
                  IAM role
```

![Our image gallery architecture](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AYYSe1dpoOZb549xUOpJtF.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=n7WzRqTFpm1OG-Dm_bANH&layout=canvas)

Two free tools you can use: **[draw.io](https://app.diagrams.net/)** and **[Eraser](https://www.eraser.io/)**.

### Step by step: draw it

1. Open draw.io or Eraser.
2. Add boxes for **Person**, **Browser**, **EC2**, **IAM role**, and **S3 bucket**.
3. Connect them with arrows.
4. Label each arrow in a few words, such as "opens the page" and "reads and saves images".
5. Write your **Region** on the diagram.
6. Save the diagram as a **picture**.

<details>
<summary>Example Eraser code (Cloud architecture diagram)</summary>

```
title Our Image Gallery

Person [icon: user, color: green]
Browser [icon: globe]

AWS Region [icon: aws, color: orange] {
  EC2 Gallery Website [icon: aws-ec2, color: orange]
  IAM Role [icon: aws-iam, color: pink]
  Private S3 Bucket [icon: aws-s3, color: green]
}

Person > Browser: opens the gallery
Browser > EC2 Gallery Website: asks for the page and uploads images
IAM Role > EC2 Gallery Website: gives a key card
EC2 Gallery Website > Private S3 Bucket: reads and saves images
```

If an icon does not show, choose another one from Eraser's icon picker.

</details>

> **Before you share the picture:** hide your AWS account ID, email address, public IP address, and your name.

---

## Write a short README

A **README** is a short note about your project that a stranger can read in one minute.

**Include:**

- The **project name**
- **What it does**
- The **services used** (EC2, S3, and IAM)
- **How it works**, in two or three sentences
- Your **architecture picture**
- **How to run it**

**Be careful:**

- **Do not put** your AWS account ID, passwords, or access keys in the README.
- **Do not promise a permanent link.** The public address changes whenever the computer is stopped and started.
- **Do not commit the `.pem` key file.**

### README example

````markdown
# My Image Gallery

A one-page website where you can see and upload images.

## Services used

- Amazon EC2 runs the website.
- Amazon S3 stores the images in a private bucket.
- AWS IAM gives EC2 a role, so it can reach the bucket safely.

## How it works

A visitor opens the website, which runs on an EC2 computer. EC2 uses its IAM role
to get the images from a private S3 bucket and shows them in a grid. When someone
uploads a JPG or PNG image, EC2 checks it and saves it to the bucket.

## Architecture

![Architecture diagram](./architecture.png)

## How to run it

1. Connect to the EC2 instance.
2. Go to the app folder and run `./deploy.sh YOUR-BUCKET-NAME YOUR-REGION`.
3. Open the instance's public address, starting with `http://`.
````

---

## Prepare a two-minute demo

Tomorrow you will show your project. Answer these four things in order:

1. **What it is:** "This is a private image gallery on AWS."
2. **What it uses:** "EC2 runs the website, S3 stores the images, and IAM gives EC2 a role."
3. **Show it working:** open the page, upload one image, delete one image.
4. **What you learned:** one thing that surprised you.

Keep it short. Do not read your README out loud.

---

## Important instructions

- **Stop your EC2 instance tonight.** Choose **Instance state**, then **Stop instance**. **Do not terminate it yet,** because we need it for the demo.
- **When you start it again,** the **public address changes**. Systemd starts the app automatically, but you must use the new address.
- **Keep the bucket private.**
- **Never put passwords, access keys, or your account ID** in your README, diagram, or screenshots.
- **Keep your billing alarm or budget on.**

---

## Recap

- We **tested** the gallery, including the safety checks.
- We **drew** the architecture.
- We **wrote** the README.
- We prepared a short demo.
- **Tomorrow is the last day:** demos, cleanup, and next steps.

---

[← Day 8: Upload Your First Image](<./DAY 8.md>) | Day 10: Demo, Cleanup, and Next Steps (coming soon)
