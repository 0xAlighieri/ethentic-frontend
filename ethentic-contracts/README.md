## Install

```
yarn install

# install algo (you need to have minified/inlined version in algo dir)
cp ../algo/mini_inline.scad ./test/models/causeways.scad

# make a.env file with infura key in it
echo "INFURAKEY={KEYHERE}" > .env
```

## Use

```
yarn run devchain # in separate terminal

yarn run compile
yarn run deploy
yarn run test
```

## Deploying to a network

```
yarn run deploy:rinkeby
# manually update ABI and address in distribute.json
# bump package version
```

## Poke script

`npx hardhat run --network rinkeby scripts/poke.js`

## Connecting with frontend (old way)

In this dir: `yarn link`

In the `frontend` dir: `yarn link ethentic`

Import a funded account into metamask:

```
# private key:
0x55c98b97dd1081e87683634eb540514a80d455230c25a73434cedad4f0ffa58a
```

## Consuming this package

The distributions file contains the ABI and deployment addresses (indexed by network ID).
It's generated after the `deploy` script.

Do `require('ethentic')`, and you get this:

```js
{
  ethentic: {
    abi: [
      // blah
    ],
    deployments: { '1338': '0xD5c2225ae4259c1a1117e299CD9EB60C92325836' }
  }
}
```
