module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'Roles',
      [
        {
          name: 'Admin',
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Roles', [
      {
        name: 'Admin'
      }
    ]);
  }
};
