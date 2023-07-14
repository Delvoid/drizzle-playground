import { createUser, listUsers, updateUser, deleteUser } from './actions/userActions';

const createCommand = async () => {
  const name = process.argv[3];

  if (!name) {
    console.log('Please provide a name');
    process.exit(1);
  }

  const id = await createUser({ fullName: name });
  console.log(`Created user with id ${id}`);
};

const listCommand = async () => {
  const usersList = await listUsers();
  console.log(usersList);
};

const updateCommand = async () => {
  const id = process.argv[3];
  const newName = process.argv[4];

  if (!id) {
    console.log('Please provide a user id');
    process.exit(1);
  }

  if (isNaN(Number(id))) {
    console.log('Please provide a valid user id');
    process.exit(1);
  }

  if (!newName) {
    console.log('Please provide a new name');
    process.exit(1);
  }

  const user = await updateUser(Number(id), newName);
  console.log(user);
};

const deleteCommand = async () => {
  const id = process.argv[3];

  if (!id) {
    console.log('Please provide a user id');
    process.exit(1);
  }

  if (isNaN(Number(id))) {
    console.log('Please provide a valid user id');
    process.exit(1);
  }

  const user = await deleteUser(Number(id));
  console.log(user);
};

const commands = {
  create: createCommand,
  list: listCommand,
  update: updateCommand,
  delete: deleteCommand,
};

const main = async () => {
  const command = process.argv[2];

  if (!commands[command]) {
    console.log(
      `Please provide one of the following commands: ${Object.keys(commands).join(', ')}`
    );
    process.exit(1);
  }

  try {
    await commands[command]();
  } catch (error) {
    console.log('An error occurred:', error);
    process.exit(1);
  }

  process.exit(0);
};

void main();
