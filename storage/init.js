db = db.getSiblingDB('admin');
db.auth('root', 'eXAVMdGZododxj4wMr9w');
db.createUser(
  {
    user: 'statusweb',
    pwd: 'E8Zrmqg59xTowNgVdZFVTj',
    roles: [ { role: 'readWrite', db: 'advanced-console' } ]
  }
);

db = db.getSiblingDB('advanced-console');

db.getCollection('users').insertOne({
  username:'chrisb128@gmail.com',
  password:'$2a$10$QipVR.N/p8uws9u2YAktM.uKHrT0MkvckqSELnYYmkb8CX7wYhIFW'
});
