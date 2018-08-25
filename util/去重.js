let newArr = []
[1].forEach((v, i, arr) => {
    if (newArr.indexOf(arr[i]) == -1) newArr.push(v)
});