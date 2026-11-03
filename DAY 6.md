# Day 6: Launch Our Computer on EC2

## Day 6 PPT

[![AWS Day 6: Launch Our Computer on EC2](https://img.shields.io/badge/View%20Day%206%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/Day-6-Launch-Our-Computer-on-EC2-ovux6lnnndjurp2)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## What we are building

Last time we created a **private S3 bucket** and put a few images inside it. S3 can store files, but it cannot run a website by itself.

Today we rent a computer in the cloud called **EC2**, start it, and log in. Tomorrow we will put our gallery website on it.

```
Person -> Browser -> EC2 (gallery website) -> S3 (private images)
```

**Today we build the EC2 part:** one small virtual computer that is running and waiting for us.

---

## Before class

- [ ] Sign in with your **IAM user** and **MFA** from Day 2.
- [ ] Keep your **billing alarm or budget** on.
- [ ] Have your **S3 bucket name and Region** from Day 5 written down.
- [ ] Keep a note open for your **key pair** file. You will download it once and need it later.

> EC2 can cost money if you leave it running. Today we start small, stay inside the free tier where possible, and **stop the instance when we finish**.

---

## The big idea: EC2 is a rented computer

**EC2** stands for **Elastic Compute Cloud**. In simple words, it is a computer in an AWS building that you rent by the second.

You do not buy the hardware. You do not plug it in. You click a few buttons and a computer appears. When you are done, you stop it.

![EC2 is a rented computer in the cloud](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3A4Sn4QG0ot4Tqts2lmoQ-f.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=VUrY91Oei4Id3-fjalw7w&layout=canvas)

The thing you launch is called an **instance**. An instance is one virtual computer running in the cloud.

### Buying a server vs renting EC2

![Buying a server vs renting EC2](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AsPiImJnF85zX6KtpmaF3H.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=R0ZkH_esItFT_GMyTA67D&layout=canvas)

| Without EC2 | With EC2 |
|---|---|
| Buy a physical server | Click a few buttons |
| Set it up at home or in an office | The instance is running in minutes |
| Pay for electricity and repairs | AWS looks after the hardware |
| Fix and maintain it yourself | Stop it and stop paying for compute |

---

## Parts of an EC2 instance

An instance is made of a few parts. You choose them in the launch wizard.

![Parts of an EC2 instance](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AFuIZc-5CHhiasRDxY4F-7.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=vae_4Bq4agRAfyznlYbYU&layout=canvas)

| Part | Simple meaning |
|---|---|
| **AMI** | The starting software. Like a USB drive that already has Linux installed. |
| **Instance type** | How powerful the computer is. Like choosing a basic laptop or a gaming laptop. |
| **Security group** | Who is allowed to connect. Like a bouncer at a club. |
| **Key pair** | A safe way to log in. Like the key to your house. |
| **Elastic IP** | A fixed public address. Like a permanent home address. |
| **EBS disk** | The hard drive that saves your files. |

We will use the default **EBS disk**, and we will **not** need an Elastic IP today. The default public address is enough.

---

## The life of an EC2 computer

An instance is not always on. It moves between a few states.

![Life of an EC2 computer](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AjsKoMntHeLJrJrXkeaOqy.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=tDQy3EjnePxFfyXPkXsjj&layout=canvas)

| State | What it means | Do you pay for compute? |
|---|---|---|
| **Launch** | You create the instance. | No, not yet |
| **Running** | The computer is on. | **Yes**, by the second |
| **Stopped** | The computer is off, but its disk is kept. | **No** for compute, but the disk can still cost a little |
| **Terminated** | The instance is deleted for good. | No, and it cannot be started again |

> **Stopped is not the same as terminated.** Stop it when you finish for the day. Terminate only when you are sure you no longer need it.

---

## Instance type families

AWS has many sizes of computer. They are grouped into families.

![EC2 instance type families](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3ATaFfdOpCkeiHz_Hqv7lkU.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=7HPHAf556_2qjB-qr3inI&layout=canvas)

| Family | Good for | Simple meaning |
|---|---|---|
| **General purpose** (t3, m7) | Web servers, small databases | Balanced CPU and memory |
| **Compute optimized** (c7) | Video encoding, batch jobs | Lots of CPU power |
| **Memory optimized** (r7) | Large databases, caches | Lots of RAM |
| **Storage optimized** (i8) | NoSQL, data warehouses | Fast local storage |
| **Accelerated computing** (p, g) | Machine learning, gaming | GPU powered |

For our gallery we only need a **small general purpose** instance.

---

## How EC2 pricing works

You pay for the computer in different ways, depending on how long you need it.

![EC2 pricing models](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AvdQsWxLFjRmE1A4X9-bcf.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=Eo7Cq6fe4Miay0FxGqaw1&layout=canvas)

| Model | Best for | Simple meaning |
|---|---|---|
| **On-Demand** | Testing and unpredictable work | Pay by the second, no commitment |
| **Reserved Instances** | Steady, long-running work | Commit for 1 to 3 years |
| **Spot Instances** | Flexible jobs that can stop | Unused capacity at a lower price |
| **Savings Plans** | A flexible spending commitment | Commit to a spend level |

**For this course, use On-Demand.** Do not buy Reserved or Savings Plans just for a class.

---

## Live steps: launch your first EC2 instance

> AWS console screens and button names change from time to time. If a name looks different, look for the closest match.

![Launch your first EC2 instance](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3ATm-rA3f4CM2zpgdSEQDSc.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=-6rwAhfTKn4iW4KD2UKLY&layout=canvas)

### Step 1: Open EC2

1. Sign in to the AWS console.
2. Type **EC2** in the search bar.
3. Click **EC2**.

### Step 2: Start the launch wizard

1. On the EC2 dashboard, click **Launch instance**.
2. Keep the **Region** the same as your S3 bucket from Day 5.

### Step 3: Name your instance

1. Under **Name and tags**, enter a simple name, such as `gallery-server`.
2. This name is only a label to help you find it later.

### Step 4: Choose an AMI

1. Under **Application and OS Images**, choose **Amazon Linux 2023**.
2. An **AMI** is the starting software, like a USB drive that already has Linux installed.
3. Choose the **64-bit (x86)** version unless your console suggests something else.

### Step 5: Choose an instance type

1. Under **Instance type**, choose a **small general purpose** type.
2. Look for the type marked **Free tier eligible**, often `t3.micro` or `t2.micro`.
3. If you are not sure, accept the default free-tier eligible type the console shows.

> Bigger types cost more. We do not need a big computer for a small gallery.

### Step 6: Create a key pair

1. Under **Key pair (login)**, click **Create new key pair**.
2. Give it a name, such as `gallery-key`.
3. Choose **RSA** and **.pem**.
4. Click **Create key pair**. The file downloads **once**.

> **Save this file somewhere safe.** You cannot download it again. If you lose it, you may need to make a new key pair.

### Step 7: Network settings

1. Click **Edit** next to **Network settings** if it is collapsed.
2. Keep the default **VPC** and **subnet**.
3. For **Security group**, choose **Create security group**.
4. Add a rule that allows **SSH** from **My IP**. This is safer than allowing it from anywhere.
5. For our website, we will add **HTTP** on port 80 later. Keep it closed for now.

> A security group is the bouncer. If port 22 (SSH) is closed, nobody can log in. If port 80 (HTTP) is closed, nobody can open the website.

### Step 8: Storage

1. Keep the default **8 GiB gp3** volume.
2. This is the **EBS disk** where the computer saves files.

### Step 9: Launch

1. Check the **Summary** panel.
2. Click **Launch instance**.
3. Wait until **Instance state** changes to **Running**.
4. Wait until both **Status checks** show **passed**. This usually takes 1 to 2 minutes.

### Step 10: Find it again

1. Open **EC2**, then **Instances**.
2. Select your instance.
3. Copy the **Public IPv4 address** and write it down.

---

## Ways to connect to your instance

You can log in to the instance in a few ways. The easiest is from the AWS console.

![Ways to connect to your instance](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3ABX1Iro2kmPE8XpXgDvqXC.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=SR0djmt-dqQ7_s8V5hP2K&layout=canvas)

| Method | Works on | What you need |
|---|---|---|
| **EC2 Instance Connect** | Any browser | Nothing extra. Easiest option. |
| **SSH in a terminal** | Linux and Mac | The `.pem` key pair |
| **PuTTY** | Windows | The key pair converted to `.ppk` |

### Option A: EC2 Instance Connect (easiest)

1. Select your instance.
2. Click **Connect**.
3. Choose the **EC2 Instance Connect** tab.
4. Keep the default user name, `ec2-user`.
5. Click **Connect**. A terminal opens in your browser.

### Option B: SSH in a terminal (Linux and Mac)

1. Open a terminal where your `.pem` file is saved.
2. Protect the key file:

   ```bash
   chmod 400 gallery-key.pem
   ```

3. Connect using the public address:

   ```bash
   ssh -i gallery-key.pem ec2-user@YOUR_PUBLIC_IP
   ```

4. Type `yes` if the terminal asks about the host fingerprint.

### Option C: PuTTY (Windows)

1. Open **PuTTYgen** and load your `.pem` file.
2. Save the private key as a `.ppk` file.
3. Open **PuTTY**, enter the public IP, and use the `.ppk` file under **Auth**.
4. Log in as `ec2-user`.

> If the connection is refused, check that the security group allows **SSH** from **My IP**, and that the instance is **Running**.

---

## Common mistakes

| Problem | Fix |
|---|---|
| Cannot download the key pair again | Create a new key pair and attach it to the instance, or launch a new instance. |
| Permission denied when using SSH | Run `chmod 400` on the `.pem` file and use the correct user, `ec2-user`. |
| Connection times out | Check the security group allows SSH from **My IP** and the instance is **Running**. |
| Chose a large instance type | Stop it, then launch a small free-tier eligible type instead. |
| Forgot the Region | Your instance lives in the Region shown at the top right. Switch back to it. |
| Left it running overnight | Open **Instances**, select it, then choose **Instance state**, then **Stop instance**. |

---

## Recap

- **EC2** is a rented computer in the cloud.
- An **instance** is one virtual computer you launch.
- The important parts are the **AMI**, **instance type**, **security group**, **key pair**, and **EBS disk**.
- An instance can be **running**, **stopped**, or **terminated**.
- We launched a small instance, downloaded a key pair, and connected to it.
- Tomorrow we put the gallery website on this instance.

---

## Important instructions

- **Stop the instance when you finish.** Do not leave it running all day.
- **Keep your key pair safe.** Never commit the `.pem` file to GitHub or share it.
- **Keep the security group narrow.** Allow SSH from **My IP**, not from anywhere.
- **Stay in the free tier where possible.** Choose the type marked free tier eligible.
- **Keep the same Region** as your S3 bucket from Day 5.
- **Day 10 is cleanup day.** We will terminate the instance and delete the bucket then.

---

[← Day 5: Start Our Image Gallery](<./DAY 5.md>) | [Day 7: Connect EC2 to S3 and Run the Gallery](<./DAY 7.md>)
