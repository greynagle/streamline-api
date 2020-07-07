const LoginService = {
    findByUsername(knex, user) {
        return knex.from("users").select("*").where({ user }).first();
    },
};
