module.exports = {
  findFromArray: function(arr, key, val) {
    for(var i=0; i<arr.length; i++) {
      if (arr[i][key] == val) {
        return arr[i];
      }
    }
    return false;
  },
  response: function(ctx, status, data) {
    ctx.response.status = status;
    ctx.response.body = data;
  }
}
