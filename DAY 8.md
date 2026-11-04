# Day 8: Upload Your First Image

## Day 8 PPT

[![AWS Day 8: Upload Your First Image](https://img.shields.io/badge/View%20Day%208%20PPT-Gamma-6C5CE7?style=for-the-badge)](https://gamma.app/docs/Day-8-Upload-Your-First-Image-2plygnkhbsibzcy)

> GitHub README files do not render embedded `iframe` elements. Use the button above to open the presentation in Gamma.

---

## What we are building

On Day 7 the gallery could **read** images from S3. Today we make the upload button work, so a visitor can **save** a new image into the private bucket.

```
Visitor -> Browser -> EC2 upload API -> IAM Role -> Private S3 Bucket
```

The image never touches a public bucket. EC2 writes it with the IAM role, and the page shows it again with a signed link.

![Our image gallery project](https://storage.googleapis.com/second-petal-295822.appspot.com/elements/elements%3AYYSe1dpoOZb549xUOpJtF.png)

> [View this diagram in Eraser](https://app.eraser.io/workspace/WJZRFxZdMkQo03skOUuj?diagram=n7WzRqTFpm1OG-Dm_bANH&layout=canvas)

---

## Before class

- [ ] The gallery is open at `http://YOUR-PUBLIC-IP`.
- [ ] You can see the images already in the bucket.
- [ ] The IAM role `gallery-ec2-role` is attached to the instance.
- [ ] The role allows `s3:PutObject` on your bucket.
- [ ] You have a small **JPG or PNG** file ready (2 MB or less).

---

## How the upload works

When you choose a file and press **Upload image**, this happens:

1. **You pick a file** in the browser. The page checks the size before sending anything.
2. **The browser sends a form** to `POST /api/upload`. The file travels as form data.
3. **The server checks the request.** It rejects very large uploads before reading them.
4. **The server checks the file.** It looks at the extension, the size, and the first few bytes.
5. **The server makes a safe name.** Spaces and strange characters are replaced.
6. **EC2 writes the object to S3** using the IAM role. No access key is used.
7. **The page reloads the list** and the new image appears at the top.

### The name S3 receives

The app puts a number in front of the file name, so two files with the same name do not overwrite each other:

```text
1762300000-sunset.jpg
```

The number is the time in seconds when you uploaded it. The gallery hides that number when it shows the name to you.

### Why the server checks the file

| Check | Why it matters |
|---|---|
| Extension is `.jpg`, `.jpeg`, or `.png` | Other file types are not images we support |
| File is 2 MB or smaller | Keeps the bucket and the page fast |
| First bytes match a real image | Stops someone renaming a virus or text file to `.jpg` |
| Name is cleaned | Stops paths like `../../secret` from causing trouble |

The browser check is for speed. The server check is the real one, because a browser can be bypassed.

---

## Try it

1. Open the gallery: `http://YOUR-PUBLIC-IP`.
2. In the upload card, click the dashed box and choose a JPG or PNG.
3. The file name appears in the box.
4. Click **Upload image**.
5. Wait for the green message: `Uploaded 1762300000-sunset.jpg`.
6. Scroll to **Recent uploads**. The new image is first.
7. Open your bucket in the S3 console and refresh. The object is there.

### Check the object in S3

1. Open the **S3** console.
2. Open your gallery bucket.
3. Find the object that starts with the number.
4. Open it and look at its **properties**. The content type should be `image/jpeg` or `image/png`.

---

## Where the code lives

| File | What it does |
|---|---|
| `app/Gallery.tsx` | The upload card, the file picker, and the message you see |
| `app/api/upload/route.ts` | Receives the file and runs every check |
| `lib/s3.ts` | `saveImage()` sends the object to S3 |
| `app/page.tsx` | Reads the list again after an upload |

You do not need to change any code today. Just use the button.

---

## Common mistakes

| Problem | Fix |
|---|---|
| "Only JPG and PNG images can be uploaded" | Choose a `.jpg`, `.jpeg`, or `.png` file. |
| "That image is larger than 2 MB" | Pick a smaller image. |
| "That file is not a real JPG or PNG" | The file was renamed. Use a real image. |
| "Access denied" after clicking Upload | Add `s3:PutObject` to the role policy, then try again. |
| Upload spins forever | Check the instance is **Running** and the security group still allows HTTP. |
| Green message, but no image in the grid | Refresh the page. The list is rebuilt from S3 each time. |
| Image is in S3 but not on the page | The extension may not be JPG or PNG. Only those are shown. |
| Build stops with `Killed` | Not an upload problem. The instance ran out of memory; reboot and rebuild. |

If you want the exact error, read the log on the instance:

```bash
sudo journalctl -u gallery -n 30 --no-pager
```

---

## Remove an image

Every card in the grid has a small **trash icon** in the top-right corner.

1. Hover the card (on a phone the icon is always visible).
2. Click the trash icon.
3. Confirm the delete.
4. The image disappears from the grid and from S3.

Deleting uses the same IAM role, but it needs the `s3:DeleteObject` permission.

---

## Recap

- The upload button sends a file to our own EC2 server first.
- The server checks the file before saving it.
- EC2 writes to S3 with the IAM role, not with a key.
- Each object gets a time prefix, so names never clash.
- The page reads the bucket again and shows the newest image first.
- The bucket stayed private the whole time.

---

## Important instructions

- **Do not make the bucket public** to fix upload problems.
- **Keep files small.** 2 MB is enough for this class.
- **Use real images**, not renamed files.
- **Check the log first** if something fails.
- **Stop the instance when you finish** so it stops costing money.

---

[← Day 7: Connect EC2 to S3 and Run the Gallery](<./DAY 7.md>) | Day 9: See Your Image Travel from S3 to the Browser (coming soon)
