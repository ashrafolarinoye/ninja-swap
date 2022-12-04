document.getElementById("swap_btn_container").style.display = "none";
document.getElementById("logout_btn_container").style.display = "none";

// Check for Wallet Instance
const { ethereum } = window;

// Create Moralis Server Instance
const serverUrl = "https://z7wbisl2bgwe.usemoralis.com:2053/server";
const appId = "SogpZMxcif3vsPilu93oM5jb7QuniWvKJ4eMvCtY";
Moralis.start({ serverUrl, appId });
let currentUser = Moralis.User.current();
let dex;

// Start Up Moralis & 1InchDex
(async function () {
  await Moralis.initPlugins();
  dex = Moralis.Plugins.oneInch;
  console.log(await dex.getSupportedTokens({ chain: "bsc" }));
  checkAuthStatus();
})();

// Change UI based on logged in status
const swap_btn = document.getElementById("swap");
const connect_btn = document.getElementById("connect_btn");
const logOut_btn = document.getElementById("logout_btn");

if (currentUser) {
  connect_btn.innerHTML = "Connected";
  // Swap & LogOut Button
  document.getElementById("swap_btn_container").style.display = "block";
  document.getElementById("logout_btn_container").style.display = "block";
  console.log(currentUser);
} else {
  document.getElementById("swap_btn_container").style.display = "none";
  document.getElementById("logout_btn_container").style.display = "none";
}

// Authentication
connect_btn.addEventListener("click", () => {
  login();
});

logOut_btn.addEventListener("click", () => {
  logOut();
});

// Connect Wallet Function
async function login() {
  if (!ethereum) {
    alert("Install MetaMask");
  } else {
    if (!currentUser) {
      await Moralis.authenticate({ signingMessage: "Ninja Swap App" })
        .then((currentUser) => {
          console.log(currentUser);
          connect_btn.innerHTML = "Connected";
          // Swap & LogOut Button
          document.getElementById("swap_btn_container").style.display = "block";
          document.getElementById("logout_btn_container").style.display =
            "block";
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  }
}

// Check Authentication Status
function checkAuthStatus() {
  if (currentUser) {
    console.log("logged in user:", currentUser);
    console.log(currentUser.get("ethAddress"));
    connect_btn.innerHTML = "Connected";
    // Swap & LogOut Button
    document.getElementById("swap_btn_container").style.display = "block";
    document.getElementById("logout_btn_container").style.display = "block";
  } else {
    connect_btn.innerHTML = "Connect Wallet";
  }
}

// Log Out Function
async function logOut() {
  await Moralis.User.logOut().then(() => {
    const currentUser = Moralis.User.current();
    console.log(currentUser);
    if (currentUser === null) {
      connect_btn.innerHTML = "Connect Wallet";
      document.getElementById("swap_btn_container").style.display = "none";
      document.getElementById("logout_btn_container").style.display = "none";
    }
  });
  console.log("logged out");
}

// Get Swap Supported Tokens
async function getTokens() {
  const tokenList = await dex.getSupportedTokens({ chain: "bsc" });
  return tokenList;
}

// Token Filter Search
async function tokenSearch(searchParameter) {
  return await lookUpContract(searchParameter);
}

// Contract Search
async function lookUpContract(contractAddress) {
  const list = await getTokens();
  if (list.tokens[contractAddress] !== undefined) {
    return list.tokens[contractAddress];
  } else {
    return "Token Not Found";
  }
}

// Token Selection : UI
const tokenSelect = document.getElementById("firstSelect");
const coinSearchForm = document.getElementById("coinSearch");

tokenSelect.addEventListener("onchange", (e) => {
  const selectedToken = e.target.value;
  console.log(selectedToken);
});

const contractAddress = {
  bnb: { address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" },
  alpaca: { address: "0x8f0528ce5ef7b51152a59745befdd91d97091d2f" },
  wbnb: { address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" },
  belt: { address: "0xe0e514c71282b6f4e823703a39374cf58dc3ea4f" },
  btcb: { address: "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c" },
  bunny: { address: "0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51" },
  busd: { address: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
  cake: { address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82" },
  eps: { address: "0xa7f552078dcc247c2684336020c03648500c6d9f" },
  burger: { address: "0xae9269f27437f0fcbc232d39ec814844a51d6b8f" },
  bux: { address: "0x211ffbe424b90e25a15531ca322adf1559779e45" },
  alpha: { address: "0xa1faa113cbe53436df28ff0aee54275c13b40975" },
  cream: { address: "0xd4cb328a82bdf5f03eb737f37fa6b370aef3e888" },
  safemoon: { address: "0x42981d0bfbAf196529376EE702F2a9Eb9092fcB5" },
  bake: { address: "0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5" },
  twt: { address: "0x4b0f1812e5df2a09796481ff14017e6005508003" },
  bnx: { address: "0x8c851d1a123ff703bd1f9dabe631b69902df5f97" },
  sxp: { address: "0x47bead2563dcbf3bf2c9407fea4dc236faba485a" },
  bnbn: { address: "0xa9BCc3F55FB920eb50878d4E15A820c5634Ba2A7" },
};

document.getElementById("swap").addEventListener("click", () => {
  swap();
});

// Swap
async function swap() {
  function addressLookUp(selectedToken) {
    const hasAddress = `${selectedToken}` in contractAddress;
    if (hasAddress === undefined) {
      return "Token Not Found";
    } else {
      return contractAddress[selectedToken].address.toLowerCase();
    }
  }

  const swapFrom = document.getElementById("firstSelect").value;
  const swapTo = document.getElementById("secondSelect").value;
  const swapAmount = document.getElementById("swapFrom").value;
  const swapAmountRecieved = document.getElementById("swapTo").value;

  $("#swap").text("Swapping...");
  addressLookUp(swapFrom);
  addressLookUp(swapTo);

  if (swapAmount === "0.0" || swapAmount === "") {
    $("#swap").text("Swap");
    alert("Please enter an amount to swap");
    return "Please enter a valid amount";
  }

  if (swapFrom === swapTo) {
    $("#swap").text("Swap");

    alert("You can't swap the same tokens");
    return "You can't swap the same tokens";
  }

  // async function calculateAmountReceived(swapFrom, swapTo) {
  //   const swapFromTokenPriceOption = {
  //     address: addressLookUp(swapFrom),
  //     chain: "bsc",
  //     exchange: "PancakeSwapv2"
  //   };
  //   const swapToTokenPriceOption = {
  //     address: addressLookUp(swapTo),
  //     chain: "bsc",
  //     exchange: "PancakeSwapv2"
  //   };

  //   const swapFromPrice = await Moralis.Web3API.token.getTokenPrice(
  //     swapFromTokenPriceOption
  //   );
  //   const swapToPrice = await Moralis.Web3API.token.getTokenPrice(
  //     swapToTokenPriceOption
  //   );

  //   let swapFromValue = swapFrom * swapFromPrice;
  //   let swapToValue = swapFromValue / swapToPrice;

  //   return swapToValue;
  // }

  // const tokenReceived = await calculateAmountReceived(swapFrom, swapTo);
  
  // console.log(swapFrom, swapTo, swapAmount, tokenReceived);

  const options = {
    chain: "bsc",
    fromTokenAddress: addressLookUp(swapFrom),
    toTokenAddress: addressLookUp(swapTo),
    amount: Number(Moralis.Units.ETH(`${swapAmount}`)),
    fromAddress: Moralis.User.current().get("ethAddress"),
    slippage: 2,
  };
  await dex
    .swap(options)
    .then((receipt) => {
      const parsedReceipt = JSON.parse(JSON.stringify(receipt));
      successHandler(parsedReceipt);
      $("#swap").text("Swap");
      document.getElementById("swapTo").value = tokenReceived;
    })
    .catch((err) => {
      const error = JSON.parse(JSON.stringify(err));
      errorHandler(error);
      $("#swap").text("Swap Failed");
      setTimeout($("#swap").text("Swap"), 3000);
    });
}

// Find Token With Symbol
async function findToken(symbols) {
  const options = { chain: "bsc", symbols: `${symbols}` };
  const tokenMetadata = await Moralis.Web3API.token.getTokenMetadataBySymbol(
    options
  );
  return tokenMetadata;
}

// Error Handling
function errorHandler(error) {
  if ((error = {})) {
    $("#failed_modal_container").html(`
    <div class="modal" tabindex="-1" id="errorModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Transaction Failed</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Server Error</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `);
  } else {
    console.log(error);
    $("#failed_modal_container").html(`
    <div class="modal" tabindex="-1" id="errorModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Transaction Failed</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>${error.message.data.data.description}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `);
  }

  $("#errorModal").modal("show");
}

// Transaction Success
function successHandler(receipt) {
  $("#success_modal_container").html(`
  <div class="modal" tabindex="-1" id="success_modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Transaction Success</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>${receipt}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>)
  `);

  $("#success_modal").modal("show");
}
