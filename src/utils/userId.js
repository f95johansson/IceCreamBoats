let userId = null;
let callbacks = [];

export function saveUserId(id) {
  userId = id;
  for (var callback of callbacks) {
    callback(userId);
  }
  callbacks = [];
}

export function getUserId(result) {
  if (userId !== null) {
    result(userId)
  } else {
    callbacks.push(result);
  }
}
