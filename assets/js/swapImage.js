async function tokenImageURI(tokenAddress) {
  const address = tokenAddress.toLowerCase();
  const list = await getTokens();
  if (list.tokens[address] !== undefined) {
    return list.tokens[address].logoURI;
  } else {
    return "";
  }
}

async function setImage1(option) {
  const sxpLogo = await tokenImageURI(contractAddress["sxp"].address);
  const burgerLogo = await tokenImageURI(contractAddress["burger"].address);
  const buxLogo = await tokenImageURI(contractAddress["bux"].address);
  const wbnbLogo = await tokenImageURI(contractAddress["wbnb"].address);
  const alphaLogo = await tokenImageURI(contractAddress["alpha"].address);
  const creamLogo = await tokenImageURI(contractAddress["cream"].address);
  const epsLogo = await tokenImageURI(contractAddress["eps"].address);
  const safemoonLogo = await tokenImageURI(contractAddress["safemoon"].address);
  const bakeLogo = await tokenImageURI(contractAddress["bake"].address);
  const twtLogo = await tokenImageURI(contractAddress["twt"].address);
  const bnxLogo = await tokenImageURI(contractAddress["bnx"].address);


  if (option == "bnb") {
    $("#firstImg").attr(
      "src",
      "assets/images/binance-coin-logo-png-transparent.png"
    );
  } else if (option == "alpaca") {
    $("#firstImg").attr("src", "assets/images/alpaca.png");
  } else if (option == "belt") {
    $("#firstImg").attr("src", "assets/images/belt.png");
  } else if (option == "btcb") {
    $("#firstImg").attr("src", "assets/images/btc.png");
  } else if (option == "bunny") {
    $("#firstImg").attr("src", "assets/images/bunny.png");
  } else if (option == "busd") {
    $("#firstImg").attr("src", "assets/images/busd.png");
  } else if (option == "cake") {
    $("#firstImg").attr("src", "assets/images/cake.png");
  } else if (option == "eps") {
    $("#firstImg").attr("src", "assets/images/ellp.png");
  } else if (option === "sxp") {
    $("#firstImg").attr("src", sxpLogo);
  } else if (option === 'burger'){
    $("#firstImg").attr("src", burgerLogo);
  } else if (option === 'bux'){
    $("#firstImg").attr("src", buxLogo);
  } else if (option === 'wbnb'){
    $("#firstImg").attr("src", wbnbLogo);
  } else if (option === 'alpha'){
    $("#firstImg").attr("src", alphaLogo);
  } else if (option === 'cream'){
    $("#firstImg").attr("src", creamLogo);
  } else if (option === 'eps'){
    $("#firstImg").attr("src", epsLogo);
    } else if (option === 'safemoon'){
    $("#firstImg").attr("src", safemoonLogo);
  } else if (option === 'bake'){
    $("#firstImg").attr("src", bakeLogo);
  } else if (option === 'twt'){
    $("#firstImg").attr("src", twtLogo);
  } else if (option === 'bnx'){
    $("#firstImg").attr("src", bnxLogo);
  } else if (option === 'bnbn'){
    $("#firstImg").attr("src",
    "assets/images/binance-coin-logo-png-transparent.png");
  }
}

async function setImage2(option) {
    const sxpLogo = await tokenImageURI(contractAddress["sxp"].address);
    const burgerLogo = await tokenImageURI(contractAddress["burger"].address);
    const buxLogo = await tokenImageURI(contractAddress["bux"].address);
    const wbnbLogo = await tokenImageURI(contractAddress["wbnb"].address);
    const alphaLogo = await tokenImageURI(contractAddress["alpha"].address);
    const creamLogo = await tokenImageURI(contractAddress["cream"].address);
    const epsLogo = await tokenImageURI(contractAddress["eps"].address);
    const safemoonLogo = await tokenImageURI(contractAddress["safemoon"].address);
    const bakeLogo = await tokenImageURI(contractAddress["bake"].address);
    const twtLogo = await tokenImageURI(contractAddress["twt"].address);
    const bnxLogo = await tokenImageURI(contractAddress["bnx"].address);
  
  if (option == "bnb") {
    $("#secondImg").attr(
      "src",
      "assets/images/binance-coin-logo-png-transparent.png"
    );
  } else if (option == "alpaca") {
    $("#secondImg").attr("src", "assets/images/alpaca.png");
  } else if (option == "belt") {
    $("#secondImg").attr("src", "assets/images/belt.png");
  } else if (option == "btcb") {
    $("#secondImg").attr("src", "assets/images/btc.png");
  } else if (option == "bunny") {
    $("#secondImg").attr("src", "assets/images/bunny.png");
  } else if (option == "busd") {
    $("#secondImg").attr("src", "assets/images/busd.png");
  } else if (option == "cake") {
    $("#secondImg").attr("src", "assets/images/cake.png");
  } else if (option == "eps") {
    $("#secondImg").attr("src", "assets/images/ellp.png");
  } else if (option === "sxp") {
    $("#secondImg").attr("src", sxpLogo);
  } else if (option === 'burger'){
    $("#secondImg").attr("src", burgerLogo);
  } else if (option === 'bux'){
    $("#secondImg").attr("src", buxLogo);
  } else if (option === 'wbnb'){
    $("#secondImg").attr("src", wbnbLogo);
  } else if (option === 'alpha'){
    $("#secondImg").attr("src", alphaLogo);
  } else if (option === 'cream'){
    $("#secondImg").attr("src", creamLogo);
  } else if (option === 'eps'){
    $("#secondImg").attr("src", epsLogo);
    } else if (option === 'safemoon'){
    $("#secondImg").attr("src", safemoonLogo);
  } else if (option === 'bake'){
    $("#secondImg").attr("src", bakeLogo);
  } else if (option === 'twt'){
    $("#secondImg").attr("src", twtLogo);
  } else if (option === 'bnx'){
    $("#secondImg").attr("src", bnxLogo);
  } else if (option === 'bnbn'){
    $("#firstImg").attr("src",
    "assets/images/binance-coin-logo-png-transparent.png");
  }
}
