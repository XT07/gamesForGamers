const sequelize = require("sequelize");
const connection = require("../database/database");

const users = connection.define("users", {
    name: {
        type: sequelize.STRING,
        allowNull: false,
        defaultValue: false
    },
    email: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false,
        defaultValue: false
    },
    company: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    admin: {
        type: sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

users.sync({ force: false }).then(() => {
    console.log("Tabela usuários atualizada");
})

module.exports = users;