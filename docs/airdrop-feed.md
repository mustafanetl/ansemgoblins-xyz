# Airdrop Feed Format

Update `public/data/airdrops.json` to publish real drops to the website.

## File shape

```json
{
  "updatedAt": "2026-07-04T12:00:00Z",
  "entries": [
    {
      "id": "drop-001",
      "timestamp": "2026-07-04T10:20:00Z",
      "wallets": 1250,
      "amount": 482000,
      "tx": "3k3C8BQ7Q9cH8a66Y9Jj5yQb5BxYzg6QHr4fY2w9SGxMh7fVCuR4zc2nD1Lyhnk6bw5YZ7A2RCR21p7CV7xHe3QB"
    }
  ]
}
```

## Notes

- Keep `entries` as an empty array until the first real drop.
- `tx` should be a real Solana signature.
- The site does not generate rows itself; only this JSON controls what appears.
