const uuid = require('uuid').v4;

module.exports = class Repository {
  constructor({
    db,
    table,
    entity,
    dataToPersist = (data) => data,
    formatDataForConstructor = (data) => data,
  }) {
    this.db = db;
    this.table = table;
    this.entity = entity;
    this.dataToPersist = dataToPersist;
    this.formatDataForConstructor = formatDataForConstructor;
  }

  async findWhere(where) {
    const foundItem = this.db
      .transaction((trx) => trx(this.table).where(where).andWhere({ deletedAt: null }))
      .then((data) => new this.entity(this.formatDataForConstructor(data[0])))
      .catch(() => false);

    return foundItem;
  }

  async fetchAll(pagination) {
    const items = this.db
      .transaction((trx) =>
        trx(this.table)
          .where({ deletedAt: null })
          .paginate({
            perPage: pagination.perPage || 10,
            currentPage: pagination.currentPage || 1,
          })
      )
      .then((datas) => {
        const { data, pagination } = datas;

        return {
          pagination: {
            currentPage: pagination.currentPage,
            perPage: pagination.perPage,
          },
          data,
        };
      });

    return items;
  }

  async create(object) {
    const data = this.dataToPersist({
      ...object,
      id: uuid(),
    });

    const createdItem = this.db
      .transaction((trx) => trx(this.table).insert(data))
      .then(() => data)
      .catch(() => false);

    return createdItem;
  }

  async update(object) {
    const query = {
      id: object.id,
    };

    const data = this.dataToPersist(object);

    const updatedItem = this.db
      .transaction((trx) => trx(this.table).where(query).update(data))
      .then(() => object)
      .catch(() => false);

    return updatedItem;
  }

  async hardDelete(id) {
    const isDeletedItem = this.db
      .transaction((trx) => trx(this.table).where({ id }).del())
      .then(() => true)
      .catch(() => false);

    return isDeletedItem;
  }

  async delete(object) {
    const data = this.dataToPersist({
      ...object,
      deletedAt: new Date().toLocaleString(),
    });

    const deletedItem = this.db
      .transaction((trx) => trx(this.table).where({ id: object.id }).update(data))
      .then(() => object)
      .catch(() => false);

    return deletedItem;
  }
};
