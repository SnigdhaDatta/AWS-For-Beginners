# Image Gallery App (Next.js + TypeScript)

A small web app for the AWS beginner course, built with **Next.js**, **TypeScript**, **Tailwind CSS**, and a few **Magic UI** components.

- The **website runs on EC2** and has an **Upload button**.
- The **images are stored in a private S3 bucket**.
- EC2 reaches the bucket through an **IAM role**, so there are no passwords or access keys in the code.

```
Person -> Browser -> EC2 (this app) -> S3 (images)
```

## What the app does

- Shows every JPG and PNG image in your bucket as a grid. Select an image to see it larger.
- Lets you upload a new JPG or PNG image, up to 2 MB.
- Lets you delete an image from the grid. It is removed from S3 too.
- Checks each upload: the file type, the file size, and that it is a real image.
- Keeps the bucket private. The page uses temporary image links that stop working after 1 hour, and the page makes new ones each time it loads.

## Files

| File | What it does |
|---|---|
| `app/page.tsx` | The gallery page. It reads the images from S3 on the server. |
| `app/Gallery.tsx` | The part that runs in the browser: the upload form and the image viewer. |
| `app/api/upload/route.ts` | Receives an uploaded image, checks it, and saves it to S3. |
| `app/api/delete/route.ts` | Deletes an image from S3 when you press the trash icon. |
| `cleanup.sh` | Removes the app and the systemd service from the EC2 instance. |
| `lib/s3.ts` | All the S3 code: list images, make temporary links, save images. |
| `lib/utils.ts` | The `cn` helper used by the UI components. |
| `components/magicui/` | Magic UI components: `BlurFade`, `MagicCard`, `AnimatedGradientText`, `DotPattern`. |
| `app/globals.css` | Tailwind import plus the look of the page. |
| `setup.sh` | Installs Node.js and the app on a new EC2 instance, and builds it. |
| `start.sh` | Starts the app in the background (simple mode). |
| `stop.sh` | Stops the app started by `start.sh`. |
| `deploy.sh` | One command: install, build, and run the app as a systemd service. |
| `../send-to-ec2.sh` | Copies the app from your computer to EC2 and runs `deploy.sh`. |

## Before you start

You need these from earlier days:

- [ ] An S3 bucket with a few images (Day 5). Write down its **name** and **Region**.
- [ ] A running EC2 instance with an **Amazon Linux 2023** image (Day 6). Allow **HTTP** in its security group.
- [ ] An **IAM role** attached to that instance (Day 7), with the permissions below.

### Permissions for the IAM role

For learning, the `AmazonS3FullAccess` policy is the easiest choice. To allow only one bucket, create a policy with this JSON instead. Replace `YOUR-BUCKET-NAME` with your bucket name.

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

## Day 7: install and start the app

### Fast path: copy from your computer

Run this from the repository root on your own computer (Linux, macOS, or WSL). It packs the app, copies it to EC2, and deploys it as a service.

```bash
./send-to-ec2.sh ec2-user@YOUR-PUBLIC-IP ~/gallery-key.pem YOUR-BUCKET-NAME YOUR-REGION
```

Example:

```bash
./send-to-ec2.sh ec2-user@13.232.10.20 ~/gallery-key.pem yourname-gallery-123 ap-south-1
```

### On the instance

Connect with **EC2 Instance Connect**, then run these commands one at a time.

```bash
# 1. Get the code (use your own repository address)
sudo dnf install -y git
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO/gallery-app

# 2. One command: install, build, and run as a service
chmod +x setup.sh start.sh stop.sh deploy.sh
./deploy.sh YOUR-BUCKET-NAME YOUR-REGION
```

Example of the last command:

```bash
./deploy.sh yourname-gallery-123 ap-south-1
```

The script prints a link at the end. Open it in your browser. **Use `http://`, not `https://`.**

> The repository must be public for `git clone` to work without a login.

### While `setup.sh` runs

- It installs Node.js 22, adds swap space if your instance has none, installs the app, and builds it.
- On a small instance (1 GB of memory), the build can take 3 to 6 minutes. Wait for the "Setup finished" message.
- If you see `Killed`, the instance ran out of memory. Run `./setup.sh` again.

## Day 8: use the gallery

1. Open the link from `start.sh`. You should see the images from your bucket.
2. Choose an image, then select **Upload image**.
3. The new image appears at the top of the gallery.
4. Open your bucket in the S3 console and refresh. The new image is there too.

## Remove everything from the EC2 instance

The `cleanup.sh` script stops the service, removes it, kills the app process, and deletes the app folder:

```bash
cd ~/gallery-app
./cleanup.sh
```

It asks before deleting. Other options:

```bash
./cleanup.sh --yes      # no question
./cleanup.sh --swap     # also remove the 2 GB /swapfile
./cleanup.sh --node     # also uninstall Node.js
```

This does **not** delete your S3 bucket, IAM role, or the EC2 instance. Remove those in the AWS console when you are finished.

## If the instance was stopped and started again

The public address changes after a stop and start.

- If you used `deploy.sh`, the service starts by itself when the instance boots. Just open `http://YOUR-NEW-PUBLIC-IP`.
- If you used `start.sh`, the app does not start by itself. Connect again and run:

  ```bash
  cd YOUR-REPO/gallery-app
  ./start.sh YOUR-BUCKET-NAME YOUR-REGION
  ```

You do not need to run `setup.sh` again.

## Commands you may need

```bash
sudo systemctl status gallery    # is the service running?
sudo systemctl restart gallery   # restart the service
sudo journalctl -u gallery -f    # live logs
./stop.sh                        # only for apps started with start.sh
tail -n 30 app.log               # last lines from start.sh mode
```

## Troubleshooting

| Problem | What to check |
|---|---|
| The page does not open | Use `http://`, not `https://`. Check the instance is **Running**. Check the security group allows **HTTP (port 80)**. Check you are using the new address if the instance was restarted. |
| "Access denied" on the page | The IAM role is not attached to the instance, or it does not allow S3. Attach the role, then reload the page. |
| "The app could not find AWS permissions" | The IAM role is not attached to the instance. Attach it, then reload the page. |
| "The bucket was not found" | Check the bucket name for typos. |
| "The Region does not match the bucket" | Start the app again with the Region your bucket is in. |
| "The app does not know your bucket yet" | Start the app with `./start.sh YOUR-BUCKET-NAME YOUR-REGION`. |
| Upload says "Only JPG and PNG images" | Choose a `.jpg`, `.jpeg`, or `.png` file. |
| Upload says the image is too large | Choose an image under 2 MB. |
| Delete says "Access denied" | Add `s3:DeleteObject` to the IAM role policy. |
| `start.sh` says "The app is not built yet" | Run `./setup.sh` first. |
| `start.sh` says the app did not start | Read the lines it prints, or run `cat app.log`. |
| `setup.sh` stops with `Killed` | The instance ran out of memory. Run `./setup.sh` again. |

## Run it on your own computer (optional)

You need Node.js 20.9 or newer, and AWS credentials on your computer (for example from `aws configure`).

```bash
npm install
BUCKET_NAME=your-bucket AWS_REGION=your-region npm run dev
```

Then open <http://localhost:3000>.

## Good to know

- The page uses plain HTTP. Do not upload private pictures.
- Stop or terminate your EC2 instance when you finish, so it stops costing money.
- The package versions are saved in `package-lock.json`, so every student gets the same ones.
