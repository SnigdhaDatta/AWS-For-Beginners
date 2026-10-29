# Contributing

Thank you for helping improve AWS for Beginners. Contributions can include
lesson corrections, clearer explanations, diagrams, examples, and typo fixes.

## Before you start

1. Search existing issues and pull requests before opening a new one.
2. For a large change, open an issue first so the approach can be discussed.
3. Never include AWS passwords, access keys, MFA codes, billing details, or
   other secrets in issues, commits, or pull requests.

## Pull requests

- Keep each pull request focused on one change.
- Explain what changed and why.
- Update related documentation when needed.
- Use clear screenshots or examples for visual or instructional changes.
- Check Markdown links, formatting, and code examples before submitting.
- Be ready to respond to review feedback respectfully.

## Commit rules

Use a short, imperative commit subject:

```text
docs: clarify IAM user setup
fix: correct the S3 example
feat: add the Day 3 lesson
```

Preferred format:

```text
<type>: <short description>
```

Allowed types include:

- `docs` for lessons and documentation
- `fix` for corrections
- `feat` for new learning content or project features
- `chore` for maintenance
- `refactor` for restructuring without changing behavior

Commit guidelines:

- Keep the subject concise, ideally 72 characters or fewer.
- Use the imperative mood: `add`, `fix`, or `update`, not `added`, `fixed`, or
  `updated`.
- Explain the reason in the body when the change is not obvious.
- Do not mix unrelated changes in one commit.
- Do not commit generated files, credentials, or secrets.

## Educational content

Use plain language and explain AWS terms before relying on them. Prefer safe
examples that do not encourage unnecessary spending. Clearly warn learners
before an action can create AWS charges or expose data.

By contributing, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
