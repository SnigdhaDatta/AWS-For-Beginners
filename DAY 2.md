# Day 2: Keeping Your Account Safe and Meeting EC2

## Day 2 PPT

[![AWS Day 2: Keeping Your Account Safe and Meeting EC2](https://img.shields.io/badge/View%20Day%202%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/AWS-Day-2-Keeping-Your-Account-Safe-and-Meeting-EC2-8hj2qlzw369om2k)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## What we learn today

1. **Why we protect the account:** the root account is the master key.
2. **What IAM is:** give each person their own key.
3. **What MFA is:** add a second lock (optional, but strongly recommended).
4. **What EC2 is:** a rented computer in the cloud.

---

## Before class

- [ ] (Optional) Install an **authenticator app** on your phone, such as Google Authenticator, Microsoft Authenticator, or Authy. Recommended if you plan to turn on MFA.
- [ ] Make sure you can sign in to your AWS account (root user) from Day 1.
- [ ] Keep your phone with you if you want to set up MFA. It is your second lock.

---

## Key ideas

| Idea | Simple meaning |
|---|---|
| **Root account** | The master key. It can open every door, delete everything, and run up big bills. Keep it locked away. |
| **IAM** (Identity and Access Management) | Gives each person the right key. **Identity** = who is this person? **Access** = which doors can they open? |
| **IAM user** | One person with their own key card, not the master key. |
| **MFA** (Multi-Factor Authentication) | A second lock. First lock: your password. Second lock: a code from your phone. If someone steals your password, they still cannot get in. |
| **EC2** | A computer you rent in the cloud. It is the "compute worker" from Day 1. It runs your app while you use it. |

## Root Account vs IAM User

![Root Account vs IAM User](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AxQ3CLcHMK-iAZVYJRGxSy.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=WYg3JpZ78J4vitGwmcF_O&layout=canvas)

### Renting a computer costs money while it runs

Like electricity, a computer you forget to turn off keeps costing money.

1. **Start it** when you need it.
2. **Use it** to run your app.
3. **Stop it** when you are done. You pay while it runs.

---

## Live demo steps

> AWS console screens and button names change from time to time. If a name looks different, look for the closest match.

### Part 1: Create an IAM user

1. Sign in to the AWS console as the root user.
2. Search for **IAM** and open it.
3. In the left menu, choose **Users**, then **Create user**.
4. Enter a user name, such as `yourname-admin`.
5. Select **Provide user access to the AWS Management Console**. If asked, choose **I want to create an IAM user**.
6. Choose **Custom password** and create a strong password. Save it somewhere safe.
7. Choose **Next**.
8. Under permissions, choose **Attach policies directly**. For this learning account, select **AdministratorAccess** so you can complete the course project. In a real company, give only the permissions a person needs.
9. Choose **Next**, then **Create user**.
10. Save the **sign-in URL** shown on the final screen. Use it to sign in as your IAM user from now on.

### Part 2 (Optional): Turn on MFA for the IAM user

> MFA is optional for this course but strongly recommended, because it adds a second lock to your account. You can skip this part and continue to Part 3.

1. In IAM, open **Users** and select your new user.
2. Open the **Security credentials** tab.
3. Next to **Multi-factor authentication (MFA)**, choose **Assign MFA device**.
4. Enter a device name, choose **Authenticator app**, then choose **Next**.
5. Open your authenticator app on your phone and scan the QR code shown on the screen.
6. Enter two codes from the app, one after the other, then choose **Add MFA**.
7. Sign out, then sign in again with the IAM user. Enter the password, then the code from your phone.

### Part 3: Look at the EC2 launch screen (do not start it)

1. Search for **EC2** in the console and open it.
2. Choose **Launch instance**.
3. Look at the screen. You will see a name, an operating system, and a computer size. We will explain these when we launch one in the project.
4. **Do not click the final launch button.** Close the page or go back to the EC2 dashboard.

---

## Important instructions

- **Do not use the root account for daily work.** Sign in with your IAM user from now on.
- **MFA is optional but strongly recommended** for both the root user and your IAM user. If you skip it, keep your password safe.
- **Back up your MFA if you turn it on.** If you change phones, move your authenticator app accounts first, or you may be locked out.
- **Never share** your passwords, MFA codes, or access keys, and never put them in your repository.
- **Do not launch an EC2 instance today.** A running instance costs money.
- **Turn off or delete what you do not use.** Day 10 is cleanup day.
- **Keep your billing alarm or budget on** from Day 1.

---

[← Day 1: Cloud and AWS Basics](./DAY%201.md) | [Day 3: S3 Storage →](./DAY%203.md)
