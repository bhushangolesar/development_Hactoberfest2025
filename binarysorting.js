function binarySearch(arr, val, start, end) {
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);

        if (arr[mid] === val) {
            return mid + 1;
        } else if (arr[mid] < val) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return start;
}

function binaryInsertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        // Find index where key should be inserted
        let insertIndex = binarySearch(arr, key, 0, j);

        // Shift elements to make space
        while (j >= insertIndex) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[insertIndex] = key;
    }
    return arr;
}
