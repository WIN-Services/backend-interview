/*
  crud Message Generator to generate messages
  'c' -> 'Entity' could not be created, entity created successfully,
  'r' -> 'Entity' could not be fetched, entity fetched successfully,
  'u' -> 'Entity' could not be updated, entity updated successfully,
  'd' -> 'Entity' could not be deleted, entity deleted successfully,
  's' -> 'Task' performed successfully,
  'f' -> 'Task' failed,
 */
const crud = (entity, action = 'r', actionStatus = true) => {
  action = action.toLowerCase();
  let mid = '';
  let end = '';
  if (!actionStatus) {
    mid = ' could not be';
  } else {
    end = ' successfully.';
  }

  if (action === 'c') {
    if (actionStatus) {
      mid = ' created';
    } else {
      end = ' created.';
    }
  } else if (action === 'r') {
    if (actionStatus) {
      mid = ' fetched';
    } else {
      end = ' fetched.';
    }
  } else if (action === 'u') {
    if (actionStatus) {
      mid = ' updated';
    } else {
      end = ' updated.';
    }
  } else if (action === 'd') {
    if (actionStatus) {
      mid = ' deleted';
    } else {
      end = ' deleted.';
    }
  } else if (action === 's') {
    mid = '';
    end = ' successfully.';
  } else if (action === 'f') {
    mid = '';
    end = ' failed.';
  }
  return entity + mid + end;
};

/*
  negate Message Generator to generate messages
  'nf' -> 'Entity' not found.
  'na' -> Not able to perform 'task'.
  'iv' -> 'Entity' is invalid.
  'ia' -> 'Entity' is inactive.
  'nv' -> 'Entity' is not verified,
 */
const negate = (entityStr, action, actionStatus = true) => {
  action = action.toLowerCase();
  let message = '';
  if (action === 'nf') {
    message = entityStr + ' not found.';
    if (actionStatus === false) {
      message = entityStr + ' already exists.'
    }
  } else if (action === 'na') {
    message = 'Not able to ' + entityStr + '.';
  } else if (action === 'iv') {
    message = entityStr + ' is invalid.';
  } else if (action === 'ia') {
    message = entityStr + ' is inactive.';
  } else if (action === 'nv') {
    message = entityStr + ' is not verified.';
    if (actionStatus === false) {
      message = entityStr + ' is verified.';
    }
  } 
  return message;
};

module.exports = {
  crud,
  negate
};
