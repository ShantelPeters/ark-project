import { createListing } from "../src/actions/order/index.js";
import { getOrderStatus } from "../src/actions/read/index.js";
import {
  accounts,
  config,
  mintERC721,
  STARKNET_NFT_ADDRESS
} from "./utils/index.js";

describe("createListing", () => {
  it("default", async () => {
    const { seller } = accounts;
    const tokenId = await mintERC721({ account: seller });

    const orderHash = await createListing(config, {
      starknetAccount: seller,
      order: {
        brokerId: accounts.listingBroker.address,
        tokenAddress: STARKNET_NFT_ADDRESS,
        tokenId,
        startAmount: BigInt(1)
      },
      approveInfo: {
        tokenAddress: STARKNET_NFT_ADDRESS,
        tokenId
      }
    });
    const { orderStatus } = await getOrderStatus(config, { orderHash });

    expect(orderStatus).toBe("Open");
  }, 50_000);
});
