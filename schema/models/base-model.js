module.exports = function (bookshelf) {
    const Model = bookshelf.Model.extend({
        getAll(options) {
            return this.query(qb => {
                qb.select('*')
                this.setJoins(qb)
            })
        },
        getSingle(options) {
            return this.query(qb => {
                qb.select('*')
                qb.where(`${this.tableName}.id`, '=', options.id)
                this.setJoins(qb)
            })
        },
        setJoins(qb){
            return;
        }
    })
    bookshelf.Model = Model;
};
