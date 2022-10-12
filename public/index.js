async function main() {
  const countContainer = document.querySelector("#count-container");
  const incrementButton = document.querySelector("#increment-button");
  const decrementButton = document.querySelector("#decrement-button");

  const response = await fetch("http://localhost:9001/counter");

  const result = await response.json();

  let counterObject = result;

  function increment() {
    counterObject.value++;
    countContainer.textContent = counterObject.value;
    updateCounter();
  }

  function decrement() {
    counterObject.value--;
    countContainer.textContent = counterObject.value;
    updateCounter();
  }

  async function updateCounter() {
    //Refresh the page & See the same incremented/decremented count from before you refreshed
    await fetch("http://localhost:9001/counter", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(counterObject),
    });
  }

  incrementButton.addEventListener("click", increment); //Click the Increment button
  decrementButton.addEventListener("click", decrement); //Click the Decrement button
  countContainer.textContent = counterObject.value; //See the count increase on-screen
}
main();
