import bcryptjs from "bcryptjs";
import config from "../../config";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const hashedPass = bcryptjs.hashSync("secret", config.bcryptSalt);
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: "Admin",
          last_name: "Admin",
          email: "admin@nodeadmin.com",
          password: hashedPass,
          status: 1,
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", [
      {
        email: "admin@nodeadmin.com"
      }
    ]);
  }
};
