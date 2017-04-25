toQuery = (obj) => {
    var str = "";
    for (var i in obj) {
        if (obj[i] || obj[i] == 0) {
            str += (i + "=" + obj[i] + "&")
        }
    }
    return str.substr(0, str.length - 1)
}

