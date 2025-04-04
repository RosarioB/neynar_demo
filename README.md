# Neynar Demo
This repository demonstrates how to create a REST API that integrates with Farcaster using Neynar. The API can receive mentions and publish new casts.

This is the repository of this [Youtube video](https://www.youtube.com/watch?v=-qiy08YMSwU)

## Setup

1. Create a `.env` file in the root directory of your project with the following variables:
    - `NEYNAR_API_KEY`: Your Neynar API key.
    - `SIGNER_UUID`: The UUID of your signer.

2. To obtain a `SIGNER_UUID`, follow the instructions in the [Generating a Signer](https://github.com/neynarxyz/farcaster-examples/tree/main/gm-bot) section of the Farcaster examples repository.
