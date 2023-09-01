const NAME = 'COMMON';

export const userExists = (store) => !!store[NAME].findUser;
export const getFoundUser = (store) => store[NAME].findUser;
