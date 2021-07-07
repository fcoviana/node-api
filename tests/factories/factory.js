module.exports = (tableName, primaryKey = 'id', defaultValues = () => ({})) => ({
  create: async (knex, value) => {
    const data = { ...(await defaultValues(value)), ...value };
    await knex(tableName).insert(data);
    const [row] = await knex(tableName)
      .where({ [primaryKey]: data[primaryKey] })
      .select('*');
    return row;
  },
  data: async (value = {}) => ({ ...(await defaultValues(value)), ...value }),
});
