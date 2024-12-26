document.getElementById("startBtn").addEventListener("click", () => {
    const input = document.getElementById("arrayInput").value.trim();
    const algorithm = document.getElementById("algorithmSelect").value;
    const array = input.split(",").map(Number);
  
    // Validate input
    if (array.some(isNaN) || array.length === 0) {
      alert("Please enter a valid array of numbers separated by commas.");
      return;
    }
  
    startSorting(array, algorithm);
  });
  
  async function startSorting(array, algorithm) {
    const arrayContainer = document.getElementById("arrayContainer");
    const currentStep = document.getElementById("currentStep");
    const allStepsList = document.getElementById("allStepsList");
  
    arrayContainer.innerHTML = "";
    currentStep.textContent = "Sorting in progress...";
    allStepsList.innerHTML = "";
  
    // Create array items
    const arrayItems = array.map((value) => {
      const item = document.createElement("div");
      item.textContent = value;
      item.className = "array-item";
      arrayContainer.appendChild(item);
      return item;
    });
  
    if (algorithm === "bubbleSort") await bubbleSort(array, arrayItems, currentStep, allStepsList);
    if (algorithm === "selectionSort") await selectionSort(array, arrayItems, currentStep, allStepsList);
    if (algorithm === "insertionSort") await insertionSort(array, arrayItems, currentStep, allStepsList);
  
    currentStep.textContent = "Sorting complete!";
  }
  
  // Bubble Sort Algorithm
  async function bubbleSort(array, items, currentStep, allStepsList) {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        updateStep(currentStep, allStepsList, `Comparing ${array[j]} and ${array[j + 1]}`);
        highlightItems(items, j, j + 1, "comparing");
  
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapItems(items, j, j + 1);
          updateStep(currentStep, allStepsList, `Swapped ${array[j]} and ${array[j + 1]}`);
        }
  
        await delay(500);
        unhighlightItems(items, j, j + 1, "comparing");
      }
      items[array.length - 1 - i].classList.add("sorted");
    }
    items[0].classList.add("sorted");
  }
  
  // Selection Sort Algorithm
  async function selectionSort(array, items, currentStep, allStepsList) {
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
  
      // Find the minimum element in the remaining unsorted part
      for (let j = i + 1; j < array.length; j++) {
        updateStep(currentStep, allStepsList, `Comparing ${array[j]} and ${array[minIndex]}`);
        highlightItems(items, j, minIndex, "comparing");
  
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
  
        await delay(500);
        unhighlightItems(items, j, minIndex, "comparing");
      }
  
      // Swap the minimum element with the first unsorted element
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        swapItems(items, i, minIndex);
        updateStep(currentStep, allStepsList, `Swapped ${array[i]} and ${array[minIndex]}`);
      }
  
      items[i].classList.add("sorted");
    }
  }
  
  // Insertion Sort Algorithm
  async function insertionSort(array, items, currentStep, allStepsList) {
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
  
      // Move elements of array[0..i-1] that are greater than key
      while (j >= 0 && array[j] > key) {
        updateStep(currentStep, allStepsList, `Comparing ${array[j]} and ${key}`);
        highlightItems(items, j, j + 1, "comparing");
  
        array[j + 1] = array[j];
        items[j + 1].textContent = array[j];
        updateStep(currentStep, allStepsList, `Moved ${array[j]} to position ${j + 2}`);
        await delay(500);
  
        unhighlightItems(items, j, j + 1, "comparing");
        j--;
      }
  
      array[j + 1] = key;
      items[j + 1].textContent = key;
      updateStep(currentStep, allStepsList, `Inserted ${key} at position ${j + 2}`);
    }
  
    for (let i = 0; i < items.length; i++) {
      items[i].classList.add("sorted");
    }
  }
  
  // Utility Functions
  function updateStep(currentStep, allStepsList, step) {
    currentStep.textContent = step;
    const stepItem = document.createElement("li");
    stepItem.textContent = step;
    allStepsList.appendChild(stepItem);
  }
  
  function highlightItems(items, index1, index2, className) {
    items[index1]?.classList.add(className);
    items[index2]?.classList.add(className);
  }
  
  function unhighlightItems(items, index1, index2, className) {
    items[index1]?.classList.remove(className);
    items[index2]?.classList.remove(className);
  }
  
  function swapItems(items, index1, index2) {
    const tempText = items[index1].textContent;
    items[index1].textContent = items[index2].textContent;
    items[index2].textContent = tempText;
  }
  
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  