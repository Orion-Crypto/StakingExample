# StakingExample
Basic example of how to implement SaturnNFT.io's staking system into your personal front-end.

Things to note:

1) All example staking project ids, policy ids, and asset names are hard-coded example values, in order to test a working version you will need to replace those with the staking project id, policy ids, and nft asset names of your project

2) For staking, current example of this repo simply reaches the backend and returns the created unsigned transaction. This example-project does not sign and submit the transactions that are returned, as this would require implementing wallet sign-in and wallet transaction signing which is outside the scope of this example repo. The code to submit signed transactions is however added.
